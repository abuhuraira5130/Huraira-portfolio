"use client"

export default function Education() {
  const education = [
    {
      degree: "BS Artificial Intelligence   ",
      institution: "Minhaj University Lahore",
      year: "2024 - 2028",
      description: "Studying AI fundamentals, machine learning, and advanced AI concepts.",
    },
  ]

  const certifications = [
    {
      title: "Add Certification Title",
      issuer: "Issuing Organization",
      year: "2024",
    },
    {
      title: "Add Another Certification",
      issuer: "Issuing Organization",
      year: "2024",
    },
  ]

  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-16">Education & Certifications</h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">Education</h3>
            {education.map((edu, idx) => (
              <div
                key={idx}
                className="p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-semibold text-foreground">{edu.degree}</h4>
                  <span className="text-sm text-muted-foreground bg-primary/10 px-3 py-1 rounded-full">{edu.year}</span>
                </div>
                <p className="text-primary font-medium mb-2">{edu.institution}</p>
                <p className="text-muted-foreground text-sm">{edu.description}</p>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">Certifications</h3>
            {certifications.map((cert, idx) => (
              <div
                key={idx}
                className="p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-semibold text-foreground">{cert.title}</h4>
                  <span className="text-sm text-muted-foreground bg-primary/10 px-3 py-1 rounded-full">
                    {cert.year}
                  </span>
                </div>
                <p className="text-primary font-medium">{cert.issuer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
