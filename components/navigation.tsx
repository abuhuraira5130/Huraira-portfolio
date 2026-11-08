"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import ThemeToggle from "./theme-toggle"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [scrolled, setScrolled] = useState(false)

  const navItems = [
    { label: "About", href: "#about", icon: "👤" },
    { label: "Skills", href: "#skills", icon: "⚙️" },
    { label: "Roadmap", href: "#roadmap", icon: "🗺️" },
    { label: "Projects", href: "#projects", icon: "💼" },
    { label: "Education", href: "#education", icon: "🎓" },
    { label: "Contact", href: "#contact", icon: "✉️" },
  ]

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout

    const handleScroll = () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        setScrolled(window.scrollY > 10)

        const sections = navItems.map((item) => item.href.slice(1))
        for (const section of sections) {
          const element = document.getElementById(section)
          if (element) {
            const rect = element.getBoundingClientRect()
            if (rect.top <= 100 && rect.bottom >= 100) {
              setActiveSection(section)
              break
            }
          }
        }
      }, 50)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [])

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsOpen(false)
    }
  }, [])

  return (
    <>
      {/* Main Header Navigation */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/70 backdrop-blur-xl border-b border-primary/10 shadow-lg shadow-primary/5"
            : "bg-background/50 backdrop-blur-md border-b border-border/30"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo with enhanced styling */}
            <Link
              href="/"
              className="group flex items-center gap-2 text-2xl font-bold transition-all duration-300"
              aria-label="AI Dev Portfolio Home"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative px-3 py-1 bg-background rounded-lg">
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">AI Dev</span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation - Premium Pill Design */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-2 bg-secondary/20 rounded-full backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all duration-300 shadow-lg shadow-primary/5">
              {navItems.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`group relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 flex items-center gap-2 ${
                    activeSection === item.href.slice(1)
                      ? "bg-gradient-to-r from-primary/30 to-accent/20 text-primary font-semibold shadow-md shadow-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                  aria-current={activeSection === item.href.slice(1) ? "page" : undefined}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>

                  {/* Underline animation for active state */}
                  {activeSection === item.href.slice(1) && (
                    <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full"></div>
                  )}

                  {/* Hover effect underline */}
                  <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </a>
              ))}
            </div>

            {/* Right side controls */}
            <div className="flex items-center gap-4">
              <ThemeToggle />

              {/* Mobile Menu Button with animation */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2.5 hover:bg-secondary/50 rounded-lg transition-all duration-300 group"
                aria-label="Toggle navigation menu"
                aria-expanded={isOpen}
              >
                <div className="relative w-6 h-6">
                  <span
                    className={`absolute h-0.5 w-6 bg-foreground transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2.5" : "translate-y-1"}`}
                  ></span>
                  <span
                    className={`absolute h-0.5 w-6 bg-foreground transition-all duration-300 ${isOpen ? "opacity-0" : "translate-y-3"}`}
                  ></span>
                  <span
                    className={`absolute h-0.5 w-6 bg-foreground transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2.5" : "translate-y-5"}`}
                  ></span>
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Navigation - Premium Dropdown */}
          {isOpen && (
            <div className="lg:hidden pb-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="bg-secondary/30 rounded-xl backdrop-blur-sm border border-primary/20 p-3 space-y-2">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
                      activeSection === item.href.slice(1)
                        ? "bg-gradient-to-r from-primary/30 to-accent/20 text-primary font-semibold"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    }`}
                    aria-current={activeSection === item.href.slice(1) ? "page" : undefined}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Floating Section Navigation - Appears on scroll */}
      {scrolled && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 hidden md:block animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex gap-2 px-4 py-3 bg-background/80 backdrop-blur-xl rounded-full border border-primary/20 shadow-xl shadow-primary/10">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 text-lg ${
                  activeSection === item.href.slice(1)
                    ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg shadow-primary/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
                title={item.label}
                aria-label={`Jump to ${item.label}`}
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
