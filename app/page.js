"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // Import motion from framer-motion

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ['home', 'about', 'education', 'projects', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjust this value to control when the section becomes active
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setMenuOpen(false);
    }
  };

  const sections = [
    { id: 'home', name: 'Home' },
    { id: 'about', name: 'About' },
    { id: 'education', name: 'Education' },
    { id: 'projects', name: 'Projects' },
    { id: 'contact', name: 'Contact' }
  ];

  const projects = [
    {
      title: "Tracknest - Inventory Management SaaS",
      description: "A full-featured SaaS platform designed to help businesses track inventory, manage stock levels, and generate bills with ease. Includes real-time search, draft saving, and user roles.",
      tags: ["Next.js", "MongoDB", "Tailwind CSS", "Node.js"],
      images: [
        "./Screenshot 2025-05-10 160948.png",
        "./Screenshot 2025-05-10 161009.png",
        "./Screenshot 2025-05-10 161031.png",
        "./Screenshot 2025-05-10 161051.png",
        "./tracknest-1.png",
        "./tracknest-2.png",
        "./tracknest-3.png",
        "./tracknest-4.png",
        "./tracknest-5.png",
        "./tracknest-6.png",
        "./tracknest-7.png",
        "./tracknest-8.png",
      ],
      live: "https://tracknest-two.vercel.app/"
    },
    {
      title: "Milkmate - Dairy Distribution System",
      description: "A streamlined platform for managing daily milk deliveries, subscriptions, and customer billing. Built for rural and urban vendors to simplify logistics and track transactions.",
      tags: ["React", "MongoDB", "NextAuth", "Tailwind CSS"],
      images: [
        "./MM1.png",
        "./MM2.png",
        "./MM3.png",
        "./MM4.png",
        "./MM5.png",
        "./MM6.png",
        "./MM7.png",
        "./MM8.png",
        "./MM9.png",
        "./MM10.png",
        "./MM11.png",
        "./MM12.png",
      ],
      live: "https://milkmate-tan.vercel.app/"
    },
    {
      title: "7 Min Workout App",
      description: "A fitness app built using Kotlin in Android Studio that guides users through a scientifically-backed 7-minute workout. Features voice prompts, timers, and exercise history tracking.",
      tags: ["Kotlin", "Android Studio", "Room DB"],
      images: [
        "./workout1.png",
        "./workout2.png",
        "./workout3.png",
        "./workout4.png",
        "./workout5.png",
        "./workout6.png",
        "./workout7.png",
      ],
    }
  ];

  const skills = [
    'JavaScript', 'TypeScript', 'React.js', 'Next.js', 'Tailwind CSS',
    'Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'GraphQL',
    'Git', 'RESTful APIs', 'HTML5', 'CSS3', 'Framer Motion'
  ];

  const education = [
    {
      degree: "B.Tech in Computer Science and Engineering",
      university: "SRM University, Sonipat",
      duration: "Aug 2022 – Present",
      details: [
        "Focused on Software Engineering, Artificial Intelligence, and Cloud Computing.",
        "Completed multiple certifications in Cyber Security, web development and many more fields.",
        "Participated in multiple hackathons and open-source contributions."
      ]
    },
    {
      degree: "Senior Secondary (12th Grade)",
      university: "Rishikul Vidyapeeth, Sonipat",
      duration: "Passing Year: 2022",
      details: [
        "Secured 85.6% in CBSE Board Exams (Science Stream with Computer Science).",
        "Developed a secure online voting system as part of final year project.",
        "Led school's tech club and organized coding challenges and seminars.",
      ]
    },
    {
      degree: "Secondary (10th Grade)",
      university: "Rishikul Vidyapeeth, Sonipat",
      duration: "Passing Year: 2020",
      details: [
        "Achieved 82.8% in CBSE Board Exams.",
        "Actively involved in school science exhibitions with tech-based models.",
        "Recognized for strong analytical and problem-solving skills at early stage."
      ]
    }
  ];

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-sans text-gray-800 antialiased">
      {/* Navigation Bar */}
      <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto flex justify-between items-center px-6">
          {/* Logo/Name */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
            className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
          >
            Vaibhav
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={(e) => { e.preventDefault(); scrollToSection(section.id); }}
                className={`relative text-lg font-medium transition-colors duration-300 ${activeSection === section.id ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-500'}`}
              >
                {section.name}
                {activeSection === section.id && (
                  <motion.span
                    layoutId="underline" // For smooth underline animation
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-600 rounded-full"
                  ></motion.span>
                )}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 hover:text-indigo-700 focus:outline-none p-2"
            >
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white shadow-lg rounded-b-lg py-4 px-6"
          >
            <div className="flex flex-col space-y-4">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={(e) => { e.preventDefault(); scrollToSection(section.id); }}
                  className={`text-lg font-medium py-2 px-4 rounded-lg transition-colors ${activeSection === section.id ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  {section.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>

        <div className="container mx-auto px-6 z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="max-w-3xl mx-auto text-center backdrop-blur-sm bg-white/10 p-10 rounded-2xl shadow-2xl border border-white/20 transform transition-all duration-700 hover:scale-[1.02]"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="relative w-32 h-32 mx-auto mb-8 overflow-hidden rounded-full border-4 border-white/30 shadow-xl"
            >
              <img
                src="./image.png"
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/10"></div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold mb-6 text-white"
            >
              Hi, I'm <span className="bg-gradient-to-r from-yellow-300 to-amber-400 bg-clip-text text-transparent">Vaibhav</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed"
            >
              A passionate <span className="font-semibold text-white">Full Stack Developer</span> crafting immersive digital experiences with modern technologies.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="flex flex-wrap justify-center gap-4"
            >
              <motion.a
                variants={fadeIn}
                href="#projects"
                onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}
                className="px-8 py-3 bg-white text-indigo-700 font-semibold rounded-full shadow-lg hover:bg-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                View My Work
              </motion.a>
              <motion.a
                variants={fadeIn}
                href="#contact"
                onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
                className="px-8 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
              >
                Contact Me
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
        >
          <a
            href="#about"
            onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
            className="text-white hover:text-indigo-200 transition-colors duration-300"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </a>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-indigo-600 bg-indigo-100 rounded-full">
              ABOUT ME
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Crafting Digital Experiences
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={slideInLeft}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative bg-white rounded-2xl p-1 h-full">
                <img
                  src="https://placehold.co/600x400/F3F4F6/667EEA?text=About+Me"
                  alt="About Me"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={slideInRight}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Crafting smart digital solutions with precision and purpose.
              </h3>
              <div className="space-y-4 text-gray-600">
                <p>
                  Hi! I'm a full-stack developer and B.Tech CSE student at SRM University, Sonipat. I'm passionate about building efficient, scalable, and user-friendly web applications.
                </p>
                <p>
                  My work blends strong technical skills with clean design thinking. From SaaS tools like Tracknest to platforms like MilkMate, I aim to create impactful solutions that address real-world needs while maintaining code quality and performance.
                </p>
                <p>
                  Beyond the screen, I'm deeply curious about new technologies and constantly learning. Whether it's contributing to open source, refining side projects, or digging into AI trends, I'm always ready to take on a new challenge.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Skills Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="mt-20"
          >
            <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
              My <span className="text-indigo-600">Skills</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className="bg-gray-50 hover:bg-white border border-gray-200 rounded-xl p-4 text-center transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                >
                  <div className="w-12 h-12 mx-auto mb-3 bg-indigo-50 rounded-lg flex items-center justify-center">
                    <span className="text-indigo-600 font-bold">{skill.charAt(0)}</span>
                  </div>
                  <span className="font-medium text-gray-700">{skill}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-indigo-600 bg-indigo-100 rounded-full">
              MY JOURNEY
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Education <span className="text-indigo-600">Background</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto"></div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="space-y-12"
          >
            {education.map((edu, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-white rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-200"
              >
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 bg-indigo-100 p-3 rounded-full">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13.622m0-13.622a4.5 4.5 0 100 0m0 0H5.636c-.117 0-.28.05-.38.163-.1.113-.153.268-.153.437v13.622c0 .169.053.324.153.437.1.113.263.163.38.163h12.728c.117 0 .28-.05.38-.163.1-.113.153-.268.153-.437V6.853c0-.169-.053-.324-.153-.437-.1-.113-.263-.163-.38-.163H12z"></path>
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold text-gray-900">{edu.degree}</h3>
                    <p className="text-indigo-600 text-lg font-medium">{edu.university}</p>
                  </div>
                </div>
                <p className="text-gray-500 mb-4 italic">{edu.duration}</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  {edu.details.map((detail, detailIndex) => (
                    <li key={detailIndex}>{detail}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-indigo-600 bg-indigo-100 rounded-full">
              MY WORK
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Featured <span className="text-indigo-600">Projects</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto"></div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project, index) => {
              const [currentImage, setCurrentImage] = useState(0);

              useEffect(() => {
                const interval = setInterval(() => {
                  setCurrentImage((prev) => (prev + 1) % project.images.length);
                }, 2000);
                return () => clearInterval(interval);
              }, [project.images.length]);

              return (
                <motion.div
                  key={index}
                  variants={fadeIn} // Each project card will fade in
                  className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-2 group"
                >
                  <div className="relative overflow-hidden h-48">
                    <div className="relative overflow-hidden h-48 flex items-center justify-center">
                      <img
                        src={project.images[currentImage]}
                        alt={project.title}
                        className="h-full transition-transform duration-700 group-hover:scale-110 object-contain"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-500/70 to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="text-xs font-medium px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between">
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center transition-colors"
                        >
                          Live Demo
                          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                          </svg>
                        </a>
                      )}
                      {project.code && (
                        <a
                          href={project.code}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-gray-700 font-medium flex items-center transition-colors"
                        >
                          Code
                          <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path
                              fillRule="evenodd"
                              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.417 2.865 8.168 6.839 9.504..."
                              clipRule="evenodd"
                            />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <div className="text-center mt-12">
            <a
              href="#projects"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 hover:-translate-y-1"
            >
              View All Projects
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-indigo-600 bg-indigo-100 rounded-full">
              GET IN TOUCH
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Let's <span className="text-indigo-600">Connect</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={slideInLeft}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h3>
              <p className="text-gray-600 mb-8">
                Have a project in mind or want to discuss potential opportunities? Feel free to reach out—I'd love to hear from you!
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-indigo-100 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-800">Email</h4>
                    <a href="mailto:vaibhavkhapra5@gmail.com" className="text-indigo-600 hover:text-indigo-800 transition-colors">vaibhavkhapra5@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-indigo-100 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-800">Phone</h4>
                    <a href="tel:+91 81685 53292" className="text-indigo-600 hover:text-indigo-800 transition-colors">+91 81685 53292</a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-indigo-100 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-800">Location</h4>
                    <p className="text-gray-600">Sonipat , Haryana , India</p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h4 className="text-xl font-medium text-gray-800 mb-4">Follow Me</h4>
                <div className="flex space-x-4">
                  <a href="https://github.com/vaibhav-khapra" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-indigo-100 hover:text-indigo-600 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.417 2.865 8.168 6.839 9.504.47.087.683-.207.683-.463 0-.229-.008-.838-.013-1.649-2.782.603-3.37-1.34-3.37-1.34-.454-1.151-1.11-1.455-1.11-1.455-.908-.619.069-.607.069-.607 1.004.07 1.532 1.03 1.532 1.03.89 1.528 2.341 1.088 2.91.83.092-.647.348-1.088.633-1.339-2.222-.254-4.555-1.112-4.555-4.945 0-1.09.39-1.986 1.029-2.685-.103-.254-.447-1.272.098-2.65 0 0 .84-.27 2.75 1.024A9.13 9.13 0 0112 5.033c.877 0 1.73.118 2.544.346 1.908-1.294 2.747-1.024 2.747-1.024.546 1.378.202 2.396.099 2.65.64.699 1.029 1.595 1.029 2.685 0 3.841-2.336 4.685-4.567 4.939.356.307.674.918.674 1.854 0 1.339-.012 2.419-.012 2.747 0 .258.21.554.687.457C21.133 20.183 24 16.43 24 12.017 24 6.484 19.522 2 14 2h-2z" clipRule="evenodd"></path>
                    </svg>
                  </a>

                  <a href="https://www.linkedin.com/in/vaibhav-khapra-aa3052288/" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-indigo-100 hover:text-indigo-600 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd"></path>
                    </svg>
                  </a>

                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={slideInRight}
            >
              <form action="https://formspree.io/f/xpwldkvr" method="POST" className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                    placeholder="john.doe@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                    placeholder="Project Inquiry"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 hover:-translate-y-1"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-8 text-center rounded-t-lg shadow-inner">
        <div className="container mx-auto px-4">
          <p className="text-lg">
            &copy; {new Date().getFullYear()} Vaibhav Khapra. All rights reserved.
          </p>
          <p className="text-sm mt-2">
            Developed by Vaibhav Khapra<span className="text-red-500">&hearts;</span> 
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;