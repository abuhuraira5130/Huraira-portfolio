"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { dummyProjects } from "@/lib/dummy-data"

export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const animationVariants = {
    slideInLeft: {
      initial: { opacity: 0, x: -50 },
      whileInView: { opacity: 1, x: 0 },
    },
    slideInRight: {
      initial: { opacity: 0, x: 50 },
      whileInView: { opacity: 1, x: 0 },
    },
    slideInBottom: {
      initial: { opacity: 0, y: 50 },
      whileInView: { opacity: 1, y: 0 },
    },
  }

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="space-y-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Showcase of my best work in AI, blockchain, and full-stack development.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyProjects.map((project, idx) => {
            const variant = animationVariants[project.animation as keyof typeof animationVariants]
            return (
              <motion.div
                key={idx}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative bg-card/50 backdrop-blur-md rounded-xl border border-primary/20 overflow-hidden hover:border-primary/60 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/30"
                initial={variant.initial}
                whileInView={variant.whileInView}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <div className="relative h-48 bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    whileHover={{ scale: 1.15, rotate: 3 }}
                    transition={{ duration: 0.7 }}
                    onError={(e) => {
                      e.currentTarget.src = "/project-showcase.jpg"
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  {project.featured && (
                    <motion.div
                      className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs font-bold rounded-full shadow-lg shadow-primary/50"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: idx * 0.1 + 0.3 }}
                    >
                      Featured
                    </motion.div>
                  )}
                </div>

                <div className="p-6 space-y-4 flex flex-col h-full">
                  <motion.h3
                    className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {project.title}
                  </motion.h3>

                  <p className="text-muted-foreground text-sm leading-relaxed flex-grow">{project.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <motion.span
                        key={idx}
                        className="px-3 py-1 bg-gradient-to-r from-primary/30 to-accent/30 text-primary text-xs rounded-full font-medium border border-primary/40 hover:border-primary/80 transition-all duration-300 hover:shadow-md hover:shadow-primary/30"
                        whileHover={{ scale: 1.1, y: -2 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-4 mt-auto">
                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 text-center flex items-center justify-center gap-2 group/btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg
                        className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                      View
                    </motion.a>
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-2 border-2 border-primary/50 text-primary rounded-lg text-sm font-medium hover:bg-primary/10 transition-all duration-300 text-center flex items-center justify-center gap-2 group/btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg
                        className="w-4 h-4 group-hover/btn:rotate-12 transition-transform"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      Code
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
