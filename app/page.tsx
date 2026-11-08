import Hero from "@/components/hero"
import Skills from "@/components/skills"
import Roadmap from "@/components/roadmap"
import Projects from "@/components/projects"
import Education from "@/components/education"
import Contact from "@/components/contact"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Skills />
      <Roadmap />
      <Projects />
      <Education />
      <Contact />
      <Footer />
    </main>
  )
}
