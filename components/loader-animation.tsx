"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function LoaderAnimation() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      <div className="relative flex flex-col items-center justify-center gap-8">
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full"
              animate={{
                x: Math.cos((i / 12) * Math.PI * 2) * 80,
                y: Math.sin((i / 12) * Math.PI * 2) * 80,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: (i / 12) * 0.4,
              }}
              style={{
                left: "50%",
                top: "50%",
                marginLeft: "-2px",
                marginTop: "-2px",
              }}
            />
          ))}
        </div>

        {/* Central rotating circle */}
        <motion.div
          className="relative w-24 h-24"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary border-r-accent" />
          <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-primary border-l-accent" />
        </motion.div>

        {/* Loading text */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Initializing Portfolio
          </h2>
          <motion.p
            className="text-sm text-muted-foreground mt-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          >
            Abu Huraira's AI Interface
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  )
}
