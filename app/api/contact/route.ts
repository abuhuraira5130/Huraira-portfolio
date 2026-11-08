import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

// Nodemailer needs the Node.js runtime (not Edge) — this is still a single
// Next.js project deployed on Vercel, there is no separate backend server.
export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function envBool(value: string | undefined, defaultValue: boolean): boolean {
  if (value === undefined) return defaultValue
  return ["true", "1", "yes", "y"].includes(value.toLowerCase())
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }

  const { name, email, message } = (body ?? {}) as {
    name?: unknown
    email?: unknown
    message?: unknown
  }

  // Same fields / limits as the old Django ContactMessage model:
  // name = CharField(max_length=100), email = EmailField, message = TextField
  const cleanName = typeof name === "string" ? name.trim() : ""
  const cleanEmail = typeof email === "string" ? email.trim() : ""
  const cleanMessage = typeof message === "string" ? message.trim() : ""

  if (!cleanName || !cleanEmail || !cleanMessage) {
    return NextResponse.json({ error: "Please fill in all fields." }, { status: 400 })
  }
  if (cleanName.length > 100) {
    return NextResponse.json({ error: "Name is too long." }, { status: 400 })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 })
  }

  // --- Email configuration (mirrors the old Django settings.py exactly) ---
  // SECRET / SENSITIVE VALUES: fill these in .env.local locally, and in
  // Vercel > Project > Settings > Environment Variables when deploying.
  // They are intentionally left blank in .env.example.
  const EMAIL_HOST = process.env.EMAIL_HOST || "smtp.gmail.com"
  const EMAIL_PORT = Number(process.env.EMAIL_PORT || "587")
  const EMAIL_HOST_USER = process.env.EMAIL_HOST_USER || ""
  const EMAIL_HOST_PASSWORD = process.env.EMAIL_HOST_PASSWORD || ""
  const EMAIL_USE_TLS = envBool(process.env.EMAIL_USE_TLS, true)
  const EMAIL_USE_SSL = envBool(process.env.EMAIL_USE_SSL, false)
  // Django: DEFAULT_FROM_EMAIL = EMAIL_HOST_USER or DEFAULT_FROM_EMAIL env or "no-reply@example.com"
  const DEFAULT_FROM_EMAIL =
    EMAIL_HOST_USER || process.env.DEFAULT_FROM_EMAIL || "no-reply@example.com"
  // Django: CONTACT_RECIPIENT_EMAIL = env CONTACT_RECIPIENT_EMAIL, else EMAIL_HOST_USER
  const CONTACT_RECIPIENT_EMAIL = process.env.CONTACT_RECIPIENT_EMAIL || EMAIL_HOST_USER

  if (!EMAIL_HOST_USER || !EMAIL_HOST_PASSWORD || !CONTACT_RECIPIENT_EMAIL) {
    console.error(
      "Contact form: email is not configured. Set EMAIL_HOST_USER, EMAIL_HOST_PASSWORD and CONTACT_RECIPIENT_EMAIL.",
    )
    return NextResponse.json(
      { error: "Email is not configured on the server." },
      { status: 500 },
    )
  }

  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: EMAIL_USE_SSL || EMAIL_PORT === 465, // SSL on 465, otherwise STARTTLS
    requireTLS: EMAIL_USE_TLS && !EMAIL_USE_SSL && EMAIL_PORT !== 465,
    auth: {
      user: EMAIL_HOST_USER,
      pass: EMAIL_HOST_PASSWORD,
    },
  })

  const submittedAt = new Date().toISOString()

  // Same two emails the Django ContactSubmitView sent, in the same wording.
  const adminMail = {
    from: DEFAULT_FROM_EMAIL,
    to: CONTACT_RECIPIENT_EMAIL,
    replyTo: cleanEmail,
    subject: `New Contact Form Submission: ${cleanName}`,
    text: `
New contact form submission:

Name: ${cleanName}
Email: ${cleanEmail}
Message:
${cleanMessage}

Submitted at: ${submittedAt}
`,
  }

  const userMail = {
    from: DEFAULT_FROM_EMAIL,
    to: cleanEmail,
    subject: "Thank you for contacting us!",
    text: `
Hi ${cleanName},

Thank you for reaching out! We have received your message and will get back to you shortly.

Best regards,
Portfolio Team
`,
  }

  // Send both emails with per-email error handling, exactly like Django did.
  let emailsSent = 0

  try {
    await transporter.sendMail(adminMail)
    emailsSent += 1
  } catch (error) {
    console.error("Failed to send admin email:", error)
  }

  try {
    await transporter.sendMail(userMail)
    emailsSent += 1
  } catch (error) {
    console.error("Failed to send user email:", error)
  }

  if (emailsSent === 0) {
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 502 },
    )
  }

  // Django returned HTTP 201 with this payload.
  return NextResponse.json(
    { status: "ok", message: "Form submitted successfully", emails_sent: emailsSent },
    { status: 201 },
  )
}
