# Abu Huraira — Portfolio (Frontend-Only, Vercel Ready)

This is the **frontend-only** version of the portfolio. The old Python/Django
backend has been **permanently removed**. Everything now runs in a single
Next.js project that deploys directly to Vercel.

**The UI has not changed.** All pages, components, styles, images and content
are exactly the same as before. The only frontend code change is in
`components/contact.tsx`, where the form now posts to `/api/contact` (in this
same project) instead of the old Django server at `http://127.0.0.1:8000`.

## What changed

| Removed (Django backend) | Replacement (in this Next.js project) |
| --- | --- |
| `backend/` folder (Django, DRF, `store` + `portfolio` apps) | Deleted — not needed |
| `POST /api/v1/contact/` (Django `ContactSubmitView`) | `app/api/contact/route.ts` (Next.js API route, Nodemailer) |
| Django email settings in `settings.py` | Environment variables (see `.env.example`) |
| Projects / Skills / Testimonials / Newsletter API endpoints | Were never called by the frontend — Projects & Skills already load from `lib/dummy-data.ts` |
| Django Resume endpoint | `public/resume.pdf` is already served statically by Next.js |
| `railway.json`, `Procfile`, `requirements.txt` | Not needed on Vercel |

The contact form sends the **same two emails** as the Django code did:

1. To you (the recipient): `New Contact Form Submission: <name>` with the
   visitor's name, email and message (Reply now goes to the visitor).
2. To the visitor: `Thank you for contacting us!` confirmation.

## Run locally

```bash
npm install
cp .env.example .env.local   # then fill in the blank sensitive fields
npm run dev                  # http://localhost:3000
```

## Fill in your sensitive info (only you do this)

In `.env.local` (local) **and** in Vercel (production) set:

- `EMAIL_HOST_USER` — your Gmail address
- `EMAIL_HOST_PASSWORD` — a Gmail **App Password** (not your normal password).
  Google Account → Security → turn on 2-Step Verification → App passwords →
  create one for "Mail" → use the 16-character code.
- `CONTACT_RECIPIENT_EMAIL` — *optional.* Where form submissions are delivered.
  If blank, they go to `EMAIL_HOST_USER` (same as the old Django default).
- `DEFAULT_FROM_EMAIL` — *optional.* If blank, `EMAIL_HOST_USER` is used.

## Deploy to Vercel

1. Push this folder to GitHub (or run `npx vercel` in this folder).
2. Import it in Vercel — Framework Preset: **Next.js**, Root Directory: `./`
   (this folder is already the project root; no settings to change).
3. In Vercel → Project → Settings → Environment Variables, add the variables
   from `.env.example` with your real values.
4. Deploy. Build command is `npm run build` (default).

## Tech

Next.js 15, React 19, Tailwind CSS 4, Framer Motion, Nodemailer (contact form only).
