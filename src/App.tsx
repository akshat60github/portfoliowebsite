import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, Mail, Linkedin, Github, ExternalLink, Download, Eye, ChevronDown, ArrowRight, Code, Briefcase, GraduationCap, Award } from 'lucide-react';

function App() {
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

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

  // Intersection Observer for active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

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

  const navItems = [
    { id: 'home', label: 'Home', icon: <div className="w-2 h-2 bg-current rounded-full" /> },
    { id: 'about', label: 'About', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'resume', label: 'Resume', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'projects', label: 'Projects', icon: <Code className="w-4 h-4" /> },
    { id: 'experience', label: 'Experience', icon: <Award className="w-4 h-4" /> },
    { id: 'skills', label: 'Skills', icon: <div className="w-2 h-2 bg-current rounded-full" /> },
    { id: 'contact', label: 'Contact', icon: <Mail className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 text-gray-900 dark:text-white transition-all duration-500">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="font-bold text-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-pulse">
              AK
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                    activeSection === item.id
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  {item.icon}
                  <span className="text-sm">{item.label}</span>
                </button>
              ))}
              
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 transform hover:scale-110 hover:rotate-12"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-blue-600" />}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-200 dark:border-gray-700 animate-in slide-in-from-top duration-300">
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="flex items-center gap-3 text-left px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center pt-16 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Profile Image */}
            <div className="order-2 lg:order-1 flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
                <img
                  src="./mypic.jpg"
                  alt="Akshat Kumar"
                  className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-2xl transform group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-20 animate-bounce delay-500"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-30 animate-bounce delay-1000"></div>
              </div>
            </div>

            {/* Hero Content */}
            <div className="order-1 lg:order-2 text-center lg:text-left space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  Hi, I'm{' '}
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient">
                    Akshat Kumar
                  </span>
                </h1>
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                  <p className="text-xl lg:text-3xl text-blue-600 dark:text-blue-400 font-semibold">
                    Computer Science & Biosciences Student
                  </p>
                  <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse delay-500"></div>
                </div>
              </div>
              
              <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
                B.Tech student at IIIT-Delhi (2023–2027) passionate about developing innovative solutions at the intersection of technology and biology. Experienced in full-stack development, systems programming, and bioinformatics research.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => scrollToSection('projects')}
                  className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 flex items-center gap-2"
                >
                  View Projects
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="px-8 py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1"
                >
                  Get In Touch
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                {[
                  { number: '15+', label: 'Projects' },
                  { number: '2+', label: 'Years Learning' },
                  { number: '5+', label: 'Technologies' },
                ].map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className="text-3xl lg:text-4xl font-bold text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              About Me
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Passionate about technology and biological sciences, bridging the gap between computation and life sciences
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="group bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">Academic Background</h3>
                </div>
                <div className="border-l-4 border-gradient-to-b from-blue-600 to-purple-600 pl-6 space-y-4">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-2">
                    <h4 className="text-lg font-semibold">B.Tech in Computer Science and Biosciences</h4>
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                      2023 – 2027
                    </span>
                  </div>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">IIIT-Delhi</p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Pursuing an interdisciplinary degree that combines computer science fundamentals with biological sciences, 
                    focusing on computational biology, bioinformatics, and the application of AI/ML in biological research.
                  </p>
                </div>
              </div>

              <div className="group bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-green-600 dark:text-green-400">Interests & Goals</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    'Full-stack web development and software engineering',
                    'Systems programming and low-level development',
                    'Bioinformatics and computational biology',
                    'Machine learning applications in healthcare',
                    'Game development and interactive applications',
                    'Open source contributions and collaborative development'
                  ].map((interest, index) => (
                    <li key={index} className="flex items-start group/item">
                      <ArrowRight className="w-5 h-5 text-green-600 dark:text-green-400 mr-3 mt-0.5 group-hover/item:translate-x-1 transition-transform duration-300" />
                      <span className="text-gray-600 dark:text-gray-300 group-hover/item:text-gray-900 dark:group-hover/item:text-white transition-colors duration-300">
                        {interest}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-purple-600 dark:text-purple-400">Skills Preview</h3>
              </div>
              <div className="space-y-8">
                {[
                  { category: 'Programming', skills: ['Python', 'Java', 'C/C++', 'JavaScript'], color: 'blue' },
                  { category: 'Technologies', skills: ['React', 'Flask', 'MySQL', 'AWS'], color: 'green' },
                  { category: 'Bioinformatics', skills: ['Biopython', 'PyMOL', 'BLAST'], color: 'purple' }
                ].map((group, index) => (
                  <div key={index} className="space-y-3">
                    <h4 className="font-semibold text-lg">{group.category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${
                            group.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800' :
                            group.color === 'green' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800' :
                            'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 hover:bg-purple-200 dark:hover:bg-purple-800'
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Resume
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A comprehensive overview of my education, experience, and achievements
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
              {/* Resume Header */}
              <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-8 text-white">
                <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                  <div className="text-center lg:text-left">
                    <h3 className="text-3xl font-bold mb-2">Akshat Kumar</h3>
                    <p className="text-blue-100 text-lg">Computer Science & Biosciences Student</p>
                    <p className="text-blue-200 text-sm">IIIT-Delhi • 2023-2027</p>
                  </div>
                  <div className="flex gap-4">
                    <a
                      href="./Resume.pdf"
                      download
                      className="group flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                      <Download className="w-5 h-5 group-hover:animate-bounce" />
                      Download PDF
                    </a>
                    <button
                      onClick={() => window.open('./Resume_page-0001.jpg', '_blank')}
                      className="group flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                      <Eye className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                      View Full Size
                    </button>
                  </div>
                </div>
              </div>

              {/* Resume Image */}
              <div className="p-8">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl transform group-hover:scale-105 transition-transform duration-500"></div>
                  <img
                    src="./Resume_page-0001.jpg"
                    alt="Akshat Kumar Resume"
                    className="relative w-full rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 cursor-pointer transition-all duration-500 hover:shadow-2xl"
                    onClick={() => window.open('./Resume_page-0001.jpg', '_blank')}
                  />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/10 rounded-2xl transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                    <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-6 py-3 rounded-xl font-semibold text-gray-900 dark:text-white">
                      Click to view full size
                    </div>
                  </div>
                </div>
              </div>

              {/* Resume Highlights */}
              <div className="px-8 pb-8">
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      icon: <GraduationCap className="w-6 h-6" />,
                      title: 'Education',
                      description: 'B.Tech in CS & Biosciences at IIIT-Delhi',
                      color: 'blue'
                    },
                    {
                      icon: <Briefcase className="w-6 h-6" />,
                      title: 'Experience',
                      description: 'Research Student & Web Developer',
                      color: 'green'
                    },
                    {
                      icon: <Award className="w-6 h-6" />,
                      title: 'Achievements',
                      description: 'Multiple certifications & contest winner',
                      color: 'purple'
                    }
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${
                        item.color === 'blue' ? 'border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20' :
                        item.color === 'green' ? 'border-green-200 dark:border-green-800 hover:border-green-400 dark:hover:border-green-600 hover:bg-green-50 dark:hover:bg-green-900/20' :
                        'border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20'
                      }`}
                    >
                      <div className={`p-3 rounded-lg mb-4 w-fit ${
                        item.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' :
                        item.color === 'green' ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400' :
                        'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400'
                      }`}>
                        {item.icon}
                      </div>
                      <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A showcase of my technical skills and creativity across different domains
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                title: "Angry Birds Inspired Game",
                description: "A fully functional Angry Birds game clone built using libGDX framework in Java. Features physics-based gameplay, multiple levels, scoring system, and smooth animations.",
                image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=600",
                tech: ["Java", "libGDX", "Physics Engine", "Game Development"],
                github: "https://github.com/akshat60github/angrybirdscln",
                color: "blue"
              },
              {
                title: "Custom Unix Shell",
                description: "A custom Unix shell implementation in C featuring command execution, process management, signal handling, and semaphore-based synchronization for robust concurrent operations.",
                image: "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=600",
                tech: ["C", "Unix", "Signals", "Semaphores", "System Programming"],
                github: "https://github.com/akshat60github/simpleshell",
                color: "green"
              },
              {
                title: "TradeNexus",
                description: "A comprehensive full-stack trading platform built with Flask and MySQL. Features user authentication, real-time market data, portfolio management, and secure transaction processing.",
                image: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=600",
                tech: ["Flask", "MySQL", "Python", "JavaScript", "Full-Stack"],
                github: "https://github.com/akshat60github/TradeNexus",
                color: "purple"
              },
              {
                title: "Breast Cancer Research",
                description: "A bioinformatics research project analyzing genetic mutations in breast cancer using machine learning. Implemented mutation analysis algorithms and predictive models for cancer prognosis.",
                image: "https://www.cancer.gov/sites/g/files/xnrzdm211/files/styles/cgov_article/public/cgov_image/media_image/100/500/6/files/hurricane-cell-article.jpg?h=67c003d0&itok=1vnkzors",
                tech: ["Python", "Machine Learning", "Bioinformatics", "Data Analysis", "Research"],
                github: "https://github.com/akshat60github/breastcancerpb",
                color: "indigo"
              }
            ].map((project, index) => (
              <div key={index} className="group bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-800">
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="absolute inset-0 bg-blue-600/90 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center gap-2 transform scale-90 group-hover:scale-100"
                    >
                      View Code <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-semibold mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                          project.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' :
                          project.color === 'green' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                          project.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200' :
                          'bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200'
                        }`}
                      >
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
      <section id="experience" className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Professional Experience
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Building expertise through hands-on experience in research and development
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 via-purple-600 to-indigo-600 rounded-full"></div>
              
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
                  ],
                  color: "blue"
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
                  ],
                  color: "green"
                }
              ].map((exp, index) => (
                <div key={index} className="relative mb-16 group">
                  <div className="absolute left-6 w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full border-4 border-white dark:border-gray-900 shadow-lg group-hover:scale-125 transition-transform duration-300"></div>
                  <div className="ml-20 bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2 border border-gray-100 dark:border-gray-800">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-6">
                      <div>
                        <h3 className="text-2xl font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                          {exp.title}
                        </h3>
                        <p className="text-blue-600 dark:text-blue-400 font-medium text-lg">{exp.company}</p>
                      </div>
                      <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                        exp.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' :
                        'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                      }`}>
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-lg">
                      {exp.description}
                    </p>
                    <ul className="space-y-3">
                      {exp.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start group/item">
                          <div className="w-2 h-2 bg-green-600 rounded-full mr-4 mt-2 group-hover/item:scale-150 transition-transform duration-300"></div>
                          <span className="text-gray-600 dark:text-gray-300 group-hover/item:text-gray-900 dark:group-hover/item:text-white transition-colors duration-300">
                            {highlight}
                          </span>
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
      <section id="skills" className="py-24 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Technical Skills
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Proficient in diverse technologies and tools across multiple domains
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
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
                ],
                color: "blue"
              },
              {
                icon: "🚀",
                title: "Frameworks & Libraries",
                skills: [
                  { name: "React", level: 85 },
                  { name: "Flask", level: 80 },
                  { name: "Django", level: 75 }
                ],
                color: "green"
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
                ],
                color: "purple"
              },
              {
                icon: "🧬",
                title: "Bioinformatics Tools",
                skills: [
                  { name: "Biopython", level: 80 },
                  { name: "PyMOL", level: 75 },
                  { name: "BLAST", level: 70 }
                ],
                color: "indigo"
              }
            ].map((category, index) => (
              <div key={index} className="group bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl text-center transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl border border-gray-100 dark:border-gray-800">
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold mb-8 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {category.title}
                </h3>
                <div className="space-y-6 text-left">
                  {category.skills.map((skill, idx) => (
                    <div key={idx} className="group/skill">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium group-hover/skill:text-blue-600 dark:group-hover/skill:text-blue-400 transition-colors duration-300">
                          {skill.name}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-3 rounded-full transition-all duration-1000 delay-${idx * 200} ${
                            category.color === 'blue' ? 'bg-gradient-to-r from-blue-600 to-blue-400' :
                            category.color === 'green' ? 'bg-gradient-to-r from-green-600 to-green-400' :
                            category.color === 'purple' ? 'bg-gradient-to-r from-purple-600 to-purple-400' :
                            'bg-gradient-to-r from-indigo-600 to-indigo-400'
                          } group-hover/skill:shadow-lg`}
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
      <section id="contact" className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Let's Connect
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Always open to discussing new opportunities, collaborations, and innovative projects
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            <div className="grid gap-8">
              {[
                {
                  icon: <Mail className="w-8 h-8" />,
                  title: "Email",
                  description: "Let's discuss opportunities",
                  link: "mailto:akshat23060@iiitd.ac.in",
                  linkText: "akshat23060@iiitd.ac.in",
                  color: "blue"
                },
                {
                  icon: <Linkedin className="w-8 h-8" />,
                  title: "LinkedIn",
                  description: "Professional networking",
                  link: "https://linkedin.com/in/akshatkumar16/",
                  linkText: "Connect with me",
                  color: "green"
                },
                {
                  icon: <Github className="w-8 h-8" />,
                  title: "GitHub",
                  description: "Check out my code",
                  link: "https://github.com/akshat60github",
                  linkText: "View repositories",
                  color: "purple"
                }
              ].map((contact, index) => (
                <div key={index} className="group bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-800">
                  <div className={`p-4 rounded-2xl mb-6 w-fit mx-auto group-hover:scale-110 transition-transform duration-300 ${
                    contact.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' :
                    contact.color === 'green' ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400' :
                    'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400'
                  }`}>
                    {contact.icon}
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {contact.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{contact.description}</p>
                  <a
                    href={contact.link}
                    target={contact.link.startsWith('mailto:') ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 font-medium transition-all duration-300 hover:gap-3 ${
                      contact.color === 'blue' ? 'text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300' :
                      contact.color === 'green' ? 'text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300' :
                      'text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300'
                    }`}
                  >
                    {contact.linkText}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>

            <div className="bg-white dark:bg-gray-900 p-10 rounded-2xl shadow-xl text-center border border-gray-100 dark:border-gray-800">
              <div className="mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-semibold mb-4">Ready to collaborate?</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                  Whether you're looking for a developer, researcher, or just want to chat about technology and science, I'd love to hear from you.
                </p>
              </div>
              <a
                href="mailto:akshat23060@iiitd.ac.in"
                className="group inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
              >
                Send Message
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="text-center lg:text-left">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                &copy; 2025 Akshat Kumar's Portfolio. All rights reserved.
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-sm mt-1">
                Built with React, TypeScript, and Tailwind CSS
              </p>
            </div>
            <div className="flex space-x-8">
              {[
                { href: "mailto:akshat23060@iiitd.ac.in", label: "Email", icon: <Mail className="w-5 h-5" /> },
                { href: "https://linkedin.com/in/akshatkumar16/", label: "LinkedIn", icon: <Linkedin className="w-5 h-5" /> },
                { href: "https://github.com/akshat60github", label: "GitHub", icon: <Github className="w-5 h-5" /> }
              ].map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target={link.href.startsWith('mailto:') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 transform hover:scale-110"
                  aria-label={link.label}
                >
                  {link.icon}
                  <span className="hidden sm:inline">{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;