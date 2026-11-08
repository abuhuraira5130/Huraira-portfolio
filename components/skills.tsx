"use client"

import { motion } from "framer-motion"
import { dummySkills } from "@/lib/dummy-data"

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="space-y-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Technologies and tools I work with to build innovative solutions.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {dummySkills.map((category) => (
            <motion.div
              key={category.category}
              className="group p-6 bg-card/50 backdrop-blur-md rounded-xl border border-primary/20 hover:border-primary/60 transition-all duration-500 hover:shadow-xl hover:shadow-primary/30"
              variants={itemVariants}
              whileHover={{ y: -4 }}
            >
              <motion.h3
                className="text-lg font-semibold text-foreground mt-0 mb-4 opacity-100 text-center rounded-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover:from-accent group-hover:to-primary"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
              >
                {category.category}
              </motion.h3>

              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, idx) =>
                  skill ? (
                    <motion.span
                      key={idx}
                      className="px-4 py-2 bg-gradient-to-r from-primary/20 to-accent/20 text-primary rounded-full text-sm font-medium border border-primary/30 hover:border-primary/80 transition-all duration-300 hover:shadow-lg hover:shadow-primary/40 hover:from-primary/40 hover:to-accent/40 cursor-default"
                      whileHover={{ scale: 1.15, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      {skill}
                    </motion.span>
                  ) : null,
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
