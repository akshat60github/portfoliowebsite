import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, Mail, Linkedin, Github, ExternalLink } from 'lucide-react';

function App() {
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    } else {
      setIsDark(systemPrefersDark);
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 z-50 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AK
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('home')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</button>
              <button onClick={() => scrollToSection('about')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</button>
              <button onClick={() => scrollToSection('projects')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Projects</button>
              <button onClick={() => scrollToSection('experience')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Experience</button>
              <button onClick={() => scrollToSection('skills')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Skills</button>
              <button onClick={() => scrollToSection('contact')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</button>
              
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col space-y-4">
                <button onClick={() => scrollToSection('home')} className="text-left hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</button>
                <button onClick={() => scrollToSection('about')} className="text-left hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</button>
                <button onClick={() => scrollToSection('projects')} className="text-left hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Projects</button>
                <button onClick={() => scrollToSection('experience')} className="text-left hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Experience</button>
                <button onClick={() => scrollToSection('skills')} className="text-left hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Skills</button>
                <button onClick={() => scrollToSection('contact')} className="text-left hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center pt-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <div className="order-2 md:order-1 flex justify-center">
              <div className="relative">
                <img
                  src="./mypic.jpg"
                  alt="Akshat Kumar"
                  className="w-80 h-80 rounded-full object-cover border-4 border-blue-600 shadow-2xl"
                />
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-green-400 to-green-500 rounded-full opacity-20 animate-pulse"></div>
              </div>
            </div>

            {/* Hero Content */}
            <div className="order-1 md:order-2 text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Hi, I'm <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Akshat Kumar</span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-600 dark:text-blue-400 font-semibold mb-6">
                Computer Science & Biosciences Student
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                B.Tech student at IIIT-Delhi (2023–2027) passionate about developing innovative solutions at the intersection of technology and biology. Experienced in full-stack development, systems programming, and bioinformatics research.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button
                  onClick={() => scrollToSection('projects')}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  View Projects
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="px-8 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white rounded-lg font-semibold transition-colors"
                >
                  Get In Touch
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Passionate about technology and biological sciences</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg transition-colors duration-300">
                <h3 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Academic Background</h3>
                <div className="border-l-4 border-blue-600 pl-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-semibold">B.Tech in Computer Science and Biosciences</h4>
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">2023 – 2027</span>
                  </div>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">IIIT-Delhi</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Pursuing an interdisciplinary degree that combines computer science fundamentals with biological sciences, 
                    focusing on computational biology, bioinformatics, and the application of AI/ML in biological research.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg transition-colors duration-300">
                <h3 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Interests & Goals</h3>
                <ul className="space-y-3">
                  {[
                    'Full-stack web development and software engineering',
                    'Systems programming and low-level development',
                    'Bioinformatics and computational biology',
                    'Machine learning applications in healthcare',
                    'Game development and interactive applications',
                    'Open source contributions and collaborative development'
                  ].map((interest, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-600 dark:text-blue-400 mr-3 mt-1">▸</span>
                      <span className="text-gray-600 dark:text-gray-300">{interest}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg transition-colors duration-300">
              <h3 className="text-2xl font-semibold mb-6 text-blue-600 dark:text-blue-400">Skills Preview</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Programming</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Python', 'Java', 'C/C++', 'JavaScript'].map((skill) => (
                      <span key={skill} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Flask', 'MySQL', 'AWS'].map((skill) => (
                      <span key={skill} className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Bioinformatics</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Biopython', 'PyMOL', 'BLAST'].map((skill) => (
                      <span key={skill} className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">A showcase of my technical skills and creativity</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Angry Birds Inspired Game",
                description: "A fully functional Angry Birds game clone built using libGDX framework in Java. Features physics-based gameplay, multiple levels, scoring system, and smooth animations.",
                image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=600",
                tech: ["Java", "libGDX", "Physics Engine", "Game Development"],
                github: "https://github.com/akshat60github/angrybirdscln"
              },
              {
                title: "Custom Unix Shell",
                description: "A custom Unix shell implementation in C featuring command execution, process management, signal handling, and semaphore-based synchronization for robust concurrent operations.",
                image: "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=600",
                tech: ["C", "Unix", "Signals", "Semaphores", "System Programming"],
                github: "https://github.com/akshat60github/simpleshell"
              },
              {
                title: "TradeNexus",
                description: "A comprehensive full-stack trading platform built with Flask and MySQL. Features user authentication, real-time market data, portfolio management, and secure transaction processing.",
                image: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=600",
                tech: ["Flask", "MySQL", "Python", "JavaScript", "Full-Stack"],
                github: "https://github.com/akshat60github/TradeNexus"
              },
              {
                title: "Breast Cancer Research",
                description: "A bioinformatics research project analyzing genetic mutations in breast cancer using machine learning. Implemented mutation analysis algorithms and predictive models for cancer prognosis.",
                image: "https://www.cancer.gov/sites/g/files/xnrzdm211/files/styles/cgov_article/public/cgov_image/media_image/100/500/6/files/hurricane-cell-article.jpg?h=67c003d0&itok=1vnkzors",
                tech: ["Python", "Machine Learning", "Bioinformatics", "Data Analysis", "Research"],
                github: "https://github.com/akshat60github/breastcancerpb"
              }
            ].map((project, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative group">
                  <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                  <div className="absolute inset-0 bg-blue-600/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
                    >
                      View Code <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span key={tech} className="bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Experience</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Building expertise through hands-on experience</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-600"></div>
              
              {[
                {
                  title: "Research Student",
                  company: "CANCOG (Infosys Centre for AI)",
                  period: "Sep 2023 – Nov 2023",
                  description: "Analyzed drug–target interactions across 3,000+ compounds using ChEMBL, DrugBank, and UniProt to identify oncogenic pathways in breast cancer. Experimented with machine learning models using Python (Pandas, scikit-learn) to score and rank 500+ drug–target pairs for anticancer potential.",
                  highlights: [
                    "Implementing ML algorithms for genetic mutation analysis",
                    "Collaborating with interdisciplinary research teams",
                    "Contributing to peer-reviewed research publications",
                    "Developing bioinformatics tools and pipelines"
                  ]
                },
                {
                  title: "Web Developer & Growth Volunteer",
                  company: "Enveave",
                  period: "Oct 2023 – Dec 2023",
                  description: "Engineered and deployed scalable data pipelines for environmental project integration, improving data transparency for 15+ partner organizations. Led growth initiatives through digital campaigns and environmental research, contributing to a 3x increase in platform engagement.",
                  highlights: [
                    "Built responsive web applications using React and JavaScript",
                    "Implemented RESTful APIs and database integration",
                    "Collaborated with design teams to create user-friendly interfaces",
                    "Optimized application performance and user experience"
                  ]
                }
              ].map((exp, index) => (
                <div key={index} className="relative mb-12">
                  <div className="absolute left-6 w-4 h-4 bg-blue-600 rounded-full border-4 border-gray-50 dark:border-gray-800"></div>
                  <div className="ml-20 bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg transition-colors duration-300">
                    <div className="flex flex-wrap justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold">{exp.title}</h3>
                        <p className="text-blue-600 dark:text-blue-400 font-medium">{exp.company}</p>
                      </div>
                      <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">{exp.period}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{exp.description}</p>
                    <ul className="space-y-2">
                      {exp.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-green-600 mr-3 mt-1">✓</span>
                          <span className="text-gray-600 dark:text-gray-300">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Skills</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Proficient in diverse technologies and tools</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "💻",
                title: "Programming Languages",
                skills: [
                  { name: "C/C++", level: 85 },
                  { name: "Python", level: 90 },
                  { name: "Java", level: 80 },
                  { name: "JavaScript", level: 85 },
                  { name: "SQL", level: 75 }
                ]
              },
              {
                icon: "🚀",
                title: "Frameworks & Libraries",
                skills: [
                  { name: "React", level: 85 },
                  { name: "Flask", level: 80 },
                  { name: "Django", level: 75 }
                ]
              },
              {
                icon: "🛠️",
                title: "Tools & Technologies",
                skills: [
                  { name: "Git", level: 90 },
                  { name: "Docker", level: 70 },
                  { name: "AWS", level: 65 },
                  { name: "Firebase", level: 75 },
                  { name: "Linux", level: 85 }
                ]
              },
              {
                icon: "🧬",
                title: "Bioinformatics Tools",
                skills: [
                  { name: "Biopython", level: 80 },
                  { name: "PyMOL", level: 75 },
                  { name: "BLAST", level: 70 }
                ]
              }
            ].map((category, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg text-center transition-colors duration-300">
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-semibold mb-6">{category.title}</h3>
                <div className="space-y-4">
                  {category.skills.map((skill, idx) => (
                    <div key={idx} className="text-left">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-sm text-gray-500">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Connect</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Always open to discussing new opportunities and collaborations</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="grid gap-6">
              {[
                {
                  icon: <Mail className="w-8 h-8" />,
                  title: "Email",
                  description: "Let's discuss opportunities",
                  link: "mailto:akshat23060@iiitd.ac.in",
                  linkText: "akshat23060@iiitd.ac.in"
                },
                {
                  icon: <Linkedin className="w-8 h-8" />,
                  title: "LinkedIn",
                  description: "Professional networking",
                  link: "https://linkedin.com/in/akshatkumar16/",
                  linkText: "Connect with me"
                },
                {
                  icon: <Github className="w-8 h-8" />,
                  title: "GitHub",
                  description: "Check out my code",
                  link: "https://github.com/akshat60github",
                  linkText: "View repositories"
                }
              ].map((contact, index) => (
                <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="text-blue-600 dark:text-blue-400 mb-4 flex justify-center">{contact.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{contact.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{contact.description}</p>
                  <a
                    href={contact.link}
                    target={contact.link.startsWith('mailto:') ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
                  >
                    {contact.linkText}
                  </a>
                </div>
              ))}
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg text-center transition-colors duration-300">
              <h3 className="text-2xl font-semibold mb-4">Ready to collaborate?</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Whether you're looking for a developer, researcher, or just want to chat about technology and science, I'd love to hear from you.
              </p>
              <a
                href="mailto:akshat23060@iiitd.ac.in"
                className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Send Message
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
              &copy; 2025 Akshat Kumar's Portfolio. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="mailto:akshat23060@iiitd.ac.in" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Email</a>
              <a href="https://linkedin.com/in/akshatkumar16/" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">LinkedIn</a>
              <a href="https://github.com/akshat60github" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;