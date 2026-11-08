"use client"

export default function Roadmap() {
  const roadmapItems = [
    {
      status: "completed",
      title: "Python Fundamentals",
      description: "Mastered core Python programming concepts and best practices",
      icon: "✅",
    },
    {
      status: "in-progress",
      title: "Django Backend Development",
      description: "Currently building robust backend systems with Django and REST APIs",
      icon: "🚧",
    },
    {
      status: "upcoming",
      title: "Agentic AI & LLM Agents",
      description: "Exploring autonomous agents, LLM integration, and intelligent systems",
      icon: "➡️",
    },
    {
      status: "upcoming",
      title: "Blockchain & Smart Contracts",
      description: "Learning Solidity, Web3 development, and decentralized applications",
      icon: "➡️",
    },
  ]

  return (
    <section id="roadmap" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">Learning Roadmap</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            My journey in AI, blockchain, and agentic systems development
          </p>
        </div>

        <div className="space-y-6">
          {roadmapItems.map((item, idx) => (
            <div key={idx} className="relative pl-8 pb-8 border-l-2 border-primary/30 last:pb-0 last:border-l-0">
              <div className="absolute -left-4 top-0 w-6 h-6 bg-primary rounded-full border-4 border-background" />

              <div className="p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-all hover:shadow-lg">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{item.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                    <div className="mt-3">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          item.status === "completed"
                            ? "bg-green-500/20 text-green-700 dark:text-green-400"
                            : item.status === "in-progress"
                              ? "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400"
                              : "bg-blue-500/20 text-blue-700 dark:text-blue-400"
                        }`}
                      >
                        {item.status === "completed"
                          ? "Completed"
                          : item.status === "in-progress"
                            ? "In Progress"
                            : "Upcoming"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
