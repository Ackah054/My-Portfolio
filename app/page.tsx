"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Brain,
  Shield,
  Smartphone,
  Menu,
  X,
  ChevronDown,
  Star,
  MapPin,
  Calendar,
} from "lucide-react"
import { sendEmail } from "./actions/send-email"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  useEffect(() => {
    setIsVisible(true)

    const handleScroll = () => {
      const sections = ["home", "about", "projects", "skills", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const projects = [
    {
      title: "AI-Powered Crime Detection System",
      description:
        "Advanced video analysis system that detects violent activities in real-time and sends instant alerts to security personnel.",
      tech: ["Python", "TensorFlow", "OpenCV", "Render"],
      image: "/ai-crime-detection-system-with-video-surveillance.jpg",
      github: "https://github.com/Ackah054",
      demo: "https://voilence.onrender.com/",
      linkedin: "https://www.linkedin.com/in/ackah-godfred-696271235",
      featured: true,
    },
    {
      title: "Stroke and TB Detection System",
      description:
        "AI-powered medical diagnostic system that uses machine learning to detect stroke symptoms and tuberculosis from medical imaging and patient data.",
      tech: ["Python", "TensorFlow", "Medical Imaging", "Flask", "OpenCV"],
      image: "/stroke-tb-detection-medical-ai-system.jpg",
      github: "https://github.com/Ackah054",
      demo: "https://global-18qw.onrender.com/",
      linkedin: "https://www.linkedin.com/in/ackah-godfred-696271235",
      featured: true,
    },
    {
      title: "Task Management System",
      description:
        "Full-featured task management application with real-time collaboration and progress tracking capabilities.",
      tech: ["HTML", "CSS", "JavaScript", "Local Storage"],
      image: "/modern-task-management-dashboard-interface.jpg",
      github: "https://github.com/Ackah054",
      demo: "https://github.com/Ackah054",
      linkedin: "https://www.linkedin.com/in/ackah-godfred-696271235",
      featured: false,
    },
    {
      title: "Job Matching Platform",
      description:
        "Intelligent job matching platform that connects job seekers with employers using AI-powered recommendations.",
      tech: ["React Native", "Node.js", "Express", "PostgreSQL"],
      image: "/job-matching-platform-mobile-app.jpg",
      github: "https://github.com/Ackah054",
      demo: "https://github.com/Ackah054",
      linkedin: "https://www.linkedin.com/in/ackah-godfred-696271235",
      featured: false,
    },
    {
      title: "Sign Language Translator",
      description: "Real-time sign language translation system using computer vision and Arduino hardware integration.",
      tech: ["Python", "OpenCV", "Arduino", "TensorFlow"],
      image: "/sign-language-translator-with-camera-and-arduino.jpg",
      github: "https://github.com/Ackah054",
      demo: "https://github.com/Ackah054",
      linkedin: "https://www.linkedin.com/in/ackah-godfred-696271235",
      featured: false,
    },
  ]

  const skills = [
    { category: "Programming Languages", items: ["Python", "JavaScript", "C#", "TypeScript", "Java"] },
    { category: "Frameworks & Libraries", items: ["React Native", "Node.js", "TensorFlow", "OpenCV", "Express"] },
    { category: "Tools & Platforms", items: ["Git", "Render", "Expo", "MongoDB", "PostgreSQL"] },
    {
      category: "Domains",
      items: ["AI/ML", "Cybersecurity", "Web Development", "Mobile Development", "Computer Vision"],
    },
  ]

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage("")

    const formData = new FormData(event.currentTarget)

    try {
      const result = await sendEmail(formData)

      if (result.success) {
        setSubmitMessage("Thank you! Your message has been sent successfully.")
        // Reset form
        ;(event.target as HTMLFormElement).reset()
      } else {
        setSubmitMessage(result.message || "Failed to send message. Please try again.")
      }
    } catch (error) {
      setSubmitMessage("An error occurred. Please try again or contact me directly via email.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl text-primary">Godfred Ackah</div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {["home", "about", "projects", "skills", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-colors hover:text-primary ${
                    activeSection === section ? "text-primary font-medium" : "text-muted-foreground"
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>

            {/* Mobile Navigation Button */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              {["home", "about", "projects", "skills", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`block w-full text-left py-2 capitalize transition-colors hover:text-primary ${
                    activeSection === section ? "text-primary font-medium" : "text-muted-foreground"
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={`space-y-8 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-muted-foreground text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>Ghana</span>
                  </div>
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>Final Year Student</span>
                  </div>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance leading-tight">
                  Hi, I'm{" "}
                  <span className="text-primary bg-gradient-to-r from-primary to-primary/80 bg-clip-text">
                    Godfred Ackah
                  </span>
                </h1>

                <p className="text-xl md:text-2xl text-muted-foreground text-pretty leading-relaxed">
                  A passionate Computer Science student building{" "}
                  <span className="text-primary font-semibold">AI-powered solutions</span> for security and safety in
                  Ghana.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  onClick={() => scrollToSection("projects")}
                  className="bg-primary hover:bg-primary/90 px-8 py-3 text-base"
                >
                  View My Work
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => scrollToSection("contact")}
                  className="px-8 py-3 text-base"
                >
                  Get In Touch
                </Button>
              </div>

              <div className="flex gap-6 pt-4">
                <a
                  href="https://github.com/Ackah054"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-muted/50 rounded-lg"
                  aria-label="GitHub Profile"
                >
                  <Github size={24} />
                </a>
                <a
                  href="https://www.linkedin.com/in/ackah-godfred-696271235"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-muted/50 rounded-lg"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href="mailto:godfredackah816@gmail.com"
                  className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-muted/50 rounded-lg"
                  aria-label="Email Contact"
                >
                  <Mail size={24} />
                </a>
              </div>
            </div>

            <div className={`${isVisible ? "animate-slide-in-left" : "opacity-0"}`}>
              <div className="relative max-w-lg mx-auto">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl transform rotate-3"></div>
                <div className="absolute inset-0 bg-gradient-to-tl from-primary/10 to-transparent rounded-3xl transform -rotate-2"></div>

                {/* Main image container */}
                <div className="relative bg-background rounded-3xl p-2 shadow-2xl">
                  <img
                    src="/l1.jpg"
                    alt="Godfred Ackah - Computer Science Student"
                    className="w-full h-auto rounded-2xl object-cover aspect-[4/5]"
                  />

                  {/* Professional badge */}
                  <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground p-4 rounded-2xl shadow-lg border-4 border-background">
                    <Brain size={32} />
                  </div>

                  {/* Status indicator */}
                  <div className="absolute top-6 left-6 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                    Available for opportunities
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">About Me</h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto text-pretty leading-relaxed">
              Passionate about leveraging technology to solve real-world problems, particularly in security and safety
              applications.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <div className="space-y-6">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  As a final-year Computer Science student, I'm deeply passionate about artificial intelligence and its
                  potential to transform how we approach security and safety challenges in Ghana and beyond.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  My journey in technology has been driven by a desire to create meaningful solutions that can make a
                  real difference in people's lives. From crime detection systems to medical diagnostics, I focus on
                  building applications that address genuine societal needs.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  I believe in the power of technology to create positive change, and I'm committed to using my skills
                  to build a safer, more secure future for my community.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">5+</div>
                  <div className="text-sm text-muted-foreground">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">3+</div>
                  <div className="text-sm text-muted-foreground">Years Learning</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">AI/ML</div>
                  <div className="text-sm text-muted-foreground">Specialization</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/20">
                <CardContent className="p-0">
                  <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-3">Security Focus</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Specialized in AI-powered security solutions and crime detection systems
                  </p>
                </CardContent>
              </Card>

              <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/20">
                <CardContent className="p-0">
                  <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Code className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-3">Full Stack</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Web and mobile development with modern frameworks and technologies
                  </p>
                </CardContent>
              </Card>

              <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/20">
                <CardContent className="p-0">
                  <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Brain className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-3">AI/ML</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Machine learning, computer vision, and medical diagnostic systems
                  </p>
                </CardContent>
              </Card>

              <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/20">
                <CardContent className="p-0">
                  <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Smartphone className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-3">Data Scientist</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Data analysis, machine learning models, and statistical insights for decision making
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              A showcase of my work in AI, security, and software development
            </p>
          </div>

          {/* Featured Projects */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {projects
              .filter((p) => p.featured)
              .map((project, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow group">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-primary text-primary-foreground">
                        <Star size={12} className="mr-1" />
                        Featured
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <Button size="sm" asChild>
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink size={14} className="mr-2" />
                          Demo
                        </a>
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github size={14} className="mr-2" />
                          Code
                        </a>
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <a href={project.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin size={14} className="mr-2" />
                          Post
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>

          {/* Other Projects */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-center">Other Projects</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {projects
                .filter((p) => !p.featured)
                .map((project, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow group">
                    <div className="relative overflow-hidden">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-bold mb-2">{project.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{project.description}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.tech.slice(0, 3).map((tech, techIndex) => (
                          <Badge key={techIndex} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {project.tech.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{project.tech.length - 3}
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" asChild>
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github size={12} className="mr-1" />
                            Code
                          </a>
                        </Button>
                        <Button size="sm" variant="outline" asChild>
                          <a href={project.demo} target="_blank" rel="noopener noreferrer">
                            <ExternalLink size={12} className="mr-1" />
                            Demo
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Expertise</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Technologies and domains I work with to build innovative solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skillGroup, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <h3 className="font-bold text-lg mb-4 text-primary">{skillGroup.category}</h3>
                  <div className="space-y-2">
                    {skillGroup.items.map((skill, skillIndex) => (
                      <div key={skillIndex} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm">{skill}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-xl text-muted-foreground text-pretty">
              Let's discuss opportunities, collaborations, or just connect!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Let's Connect</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  I'm always interested in discussing new opportunities, innovative projects, or potential
                  collaborations. Whether you're looking for a passionate developer or want to explore AI solutions for
                  your organization, I'd love to hear from you.
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href="mailto:godfredackah816@gmail.com"
                  className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <Mail className="text-primary" size={24} />
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-sm text-muted-foreground">godfredackah816@gmail.com</div>
                  </div>
                </a>

                <a
                  href="https://www.linkedin.com/in/ackah-godfred-696271235"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <Linkedin className="text-primary" size={24} />
                  <div>
                    <div className="font-medium">LinkedIn</div>
                    <div className="text-sm text-muted-foreground">Connect with me</div>
                  </div>
                </a>

                <a
                  href="https://github.com/Ackah054"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <Github className="text-primary" size={24} />
                  <div>
                    <div className="font-medium">GitHub</div>
                    <div className="text-sm text-muted-foreground">View my code</div>
                  </div>
                </a>
              </div>
            </div>

            <Card className="p-6">
              <CardContent className="p-0">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-3 py-2 border border-border rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-3 py-2 border border-border rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      className="w-full px-3 py-2 border border-border rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="w-full px-3 py-2 border border-border rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                      placeholder="Tell me about your project or opportunity..."
                    ></textarea>
                  </div>

                  {submitMessage && (
                    <div
                      className={`p-3 rounded-md text-sm ${
                        submitMessage.includes("successfully")
                          ? "bg-green-50 text-green-800 border border-green-200"
                          : "bg-red-50 text-red-800 border border-red-200"
                      }`}
                    >
                      {submitMessage}
                    </div>
                  )}

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © 2024 Godfred Ackah. Built with passion for innovation.
            </div>
            <div className="flex gap-6">
              <a
                href="https://github.com/Ackah054"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/ackah-godfred-696271235"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:godfredackah816@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
