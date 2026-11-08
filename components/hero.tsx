"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function Hero() {
  const [displayedText, setDisplayedText] = useState("")
  const [cycledRole, setCycledRole] = useState(0)
  const roles = ["AI Engineer", "Full Stack Dev", "ML Enthusiast", "Blockchain Developer"]
  const fullText = "Abu Huraira"

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
      }
    }, 100)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const roleInterval = setInterval(() => {
      setCycledRole((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(roleInterval)
  }, [])

  const handleHireMe = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleDownloadResume = () => {
    const link = document.createElement("a")
    link.href = "/resume.pdf"
    link.download = "Abu_Huraira_Resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section
      id="about"
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden min-h-screen flex items-center"
    >
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-20"
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-20"
          animate={{
            y: [0, 30, 0],
            x: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="space-y-2">
              <motion.p
                className="text-primary font-semibold text-sm uppercase tracking-wider"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
              >
                Welcome to my portfolio
              </motion.p>

              <motion.h1
                className="text-5xl md:text-6xl font-bold text-balance bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                {displayedText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                >
                  |
                </motion.span>
              </motion.h1>

              <motion.div
                className="h-8 flex items-center"
                key={cycledRole}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-xl text-primary font-semibold">{roles[cycledRole]}</p>
              </motion.div>
            </div>

            <motion.p
              className="text-lg text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              I'm a BS AI student at Minhaj University Lahore, currently learning Django backend development. My
              interests lie in exploring the intersection of artificial intelligence, blockchain technology, and
              autonomous agents.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.a
                href="#contact"
                onClick={handleHireMe}
                className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 flex items-center justify-center gap-2 group relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="relative z-10">Hire Me</span>
              </motion.a>

              <motion.button
                onClick={handleDownloadResume}
                className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8m0 8l-4-2m4 2l4-2"
                  />
                </svg>
                View Resume
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="relative w-80 h-80 rounded-2xl overflow-hidden border-2 border-primary/40 shadow-2xl hover:shadow-primary/40 transition-all duration-300 group"
              whileHover={{ y: -10 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
              <motion.img
                src="/images/design-mode/Gemini_Generated_Image_80pcx480pcx480pc.png"
                alt="Professional Developer"
                className="w-full h-full object-cover"
                loading="lazy"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.jpg"
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
