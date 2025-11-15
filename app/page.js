"use client"
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// --- CUSTOM STYLES & COMPONENTS ---
// Dark Mode Colors: Deep Navy/Charcoal background, Light Gold/Electric Teal accent
const PRIMARY_COLOR = 'text-amber-400'; // Accent color
const PRIMARY_BG = 'bg-gray-900'; // Main Dark Background
const SECONDARY_BG = 'bg-gray-800'; // Card Background
const TEXT_COLOR = 'text-gray-100'; // Main Text
const SUBTEXT_COLOR = 'text-gray-400'; // Secondary Text
const BORDER_COLOR = 'border-gray-700';
const SHADOW_COLOR = 'shadow-lg shadow-gray-900/50';

// Grid Background for sections
const GridBackground = () => (
  <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
    <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

    <div
      className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2Ij48cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4PSI4IiB5PSI4IiBmaWxsPSIjNGI1NTYzIiBvcGFjaXR5PSIwLjEiIC8+PC9zdmc+')]"
    ></div>
  </div>
);

// --- ANIMATION VARIANTS ---
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12
    }
  }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

// ---------- ProjectCard Component (compact glassmorphic card with auto slider) ----------
const ProjectCard = ({ project }) => {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const imgCount = project.images?.length || 0;
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!imgCount) return;
    if (paused) return;

    intervalRef.current = setInterval(() => {
      setIdx((p) => (p + 1) % imgCount);
    }, 2000);

    return () => clearInterval(intervalRef.current);
  }, [imgCount, paused]);

  // reset index when images change
  useEffect(() => {
    setIdx(0);
  }, [project.images]);

  const currentImage = project.images && project.images.length ? project.images[idx] : '';

  return (
    <motion.div
      variants={fadeIn}
      className={`relative rounded-2xl overflow-hidden backdrop-blur-md bg-white/4 border ${BORDER_COLOR} ${SHADOW_COLOR} transition-transform duration-300 hover:scale-[1.02]`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Image area (compact) */}
      <div className="h-44 md:h-40 lg:h-44 flex items-center justify-center bg-gradient-to-br from-gray-900/60 to-gray-800 p-4 border-b border-gray-700/50">
        {currentImage ? (
          <img
            src={currentImage}
            alt={project.title}
            className="max-h-full object-contain transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span>No image</span>
          </div>
        )}
        {/* subtle overlay */}
        <div className="absolute inset-0 pointer-events-none rounded-2xl bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className={`text-lg md:text-xl font-bold ${TEXT_COLOR} mb-1`}>{project.title}</h3>
            <p className={`${SUBTEXT_COLOR} text-sm md:text-sm max-w-xl`}>{project.description}</p>
          </div>
        </div>

        {/* tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {project.tags?.map((tag, i) => (
            <span key={i} className={`text-xs font-medium px-2 py-1 rounded-full bg-amber-400/10 ${PRIMARY_COLOR}`}>
              {tag}
            </span>
          ))}
        </div>

        {/* actions */}
        <div className="mt-4 flex items-center gap-3">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center text-amber-300 hover:text-amber-200 font-semibold text-sm`}
            >
              Live Demo
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
            </a>
          )}

          {/* APK Download (green accent) */}
          {project.apk && (
            <a
              href={project.apk}
              download
              className="inline-flex items-center bg-green-500 hover:bg-green-400 text-white text-sm font-semibold px-3 py-2 rounded-md shadow-sm transition-all"
            >
              Download APK
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"></path>
              </svg>
            </a>
          )}

          {/* code link if exists */}
          {project.code && (
            <a
              href={project.code}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-gray-200/80 hover:text-gray-100 font-medium"
            >
              View Code
            </a>
          )}

          {/* small slideshow indicator */}
          {imgCount > 1 && (
            <div className="ml-auto flex items-center space-x-2">
              {project.images.map((_, i) => (
                <span
                  key={i}
                  className={`w-2 h-2 rounded-full ${i === idx ? 'bg-amber-400' : 'bg-gray-600/40'}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// ---------- MAIN APP ----------
const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // State for form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ['home', 'about', 'education', 'projects', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.4) {
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
      description:
        "A full-featured SaaS platform designed to help businesses track inventory, manage stock levels, and generate bills with ease. Includes real-time search, draft saving, and user roles.",
      tags: ["Next.js", "MongoDB", "Tailwind CSS", "Node.js"],
      images: [
        "./Screenshot 2025-05-10 160948.png",
        "./Screenshot 2025-05-10 161009.png",
        "./Screenshot 2025-05-10 161031.png",
        "./Screenshot 2025-05-10 161051.png",
      ],
      live: "https://tracknest-two.vercel.app/",
      code: "https://github.com/vaibhav-khapra/tracknest"
    },

    {
      title: "Milkmate - Dairy Distribution System",
      description:
        "A streamlined platform for managing daily milk deliveries, subscriptions, and customer billing. Built for rural and urban vendors to simplify logistics and track transactions.",
      tags: ["React", "MongoDB", "NextAuth", "Tailwind CSS"],
      images: ["./MM1.png", "./MM2.png", "./MM3.png", "./MM4.png"],
      live: "https://milkmate-tan.vercel.app/",
      code: "https://github.com/vaibhav-khapra/milkmate"
    },

    {
      title: "FinTrack – Ledger Management System (Web App)",
      description:
        "A powerful ledger management web app built using Next.js and MongoDB. Users can record daily transactions, manage customer balances, generate PDF reports, track dues, and sync data across devices.",
      tags: ["Next.js", "MongoDB", "Tailwind CSS", "Node.js"],
      images: ["./FT1.png", "./FT2.png", "./FT3.png", "./FT4.png", "./FT6.png", "./FT5.png"],
      live: "https://your-fintrack-livid.vercel.app/",
      code: "https://github.com/vaibhav-khapra/fintrack" // optional
    },

    // Android App
    {
      title: "FinTrack – Android App",
      description:
        "A modern Android app for managing daily expenses, incomes, and customer ledgers on the go. Includes charts, history tracking, reminders, and offline storage.",
      tags: ["Android", "Kotlin", "Room DB", "Material UI"],
      images: ["./FT7.png", "./FT8.png", "./FT9.png", "./FT10.png"],
      icon: "./ft-icon.png",
      apk: "/FinTrack.apk",
    },
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
        "Led school's tech club and organized coding challenges and seminars."
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      email,
      subject,
      message,
    };

    try {
      const response = await fetch("https://formspree.io/f/xpwldkvr", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Message sent successfully! We'll get back to you soon.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        // Clear form fields
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        toast.error("Failed to send message. Please try again later.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred. Please try again later.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    
    <div className={`min-h-screen ${PRIMARY_BG} font-sans ${TEXT_COLOR} antialiased selection:bg-amber-500/30 selection:text-white`}>
      {/* ToastContainer for notifications */}
      <ToastContainer />

      {/* Navigation Bar */}
      <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-gray-900/90 backdrop-blur-lg shadow-2xl py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto flex justify-between items-center px-6 max-w-7xl">
          {/* Logo/Name */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
            className="text-3xl font-extrabold bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent transition-all duration-300 tracking-wider hover:opacity-80"
          >
            VAI<span className="text-gray-100/90">BHAV</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-10">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={(e) => { e.preventDefault(); scrollToSection(section.id); }}
                className={`relative text-lg font-medium transition-colors duration-300 tracking-wider ${activeSection === section.id ? PRIMARY_COLOR : `${SUBTEXT_COLOR} hover:${PRIMARY_COLOR}/80`}`}
              >
                {section.name}
                {activeSection === section.id && (
                  <motion.span
                    layoutId="underline"
                    className={`absolute -bottom-2 left-0 w-full h-0.5 bg-amber-400 rounded-full`}
                  ></motion.span>
                )}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`p-2 focus:outline-none ${TEXT_COLOR} hover:${PRIMARY_COLOR}`}
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className={`md:hidden ${SECONDARY_BG} shadow-xl border-t ${BORDER_COLOR} py-4 px-6 mt-2`}
          >
            <div className="flex flex-col space-y-3">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={(e) => { e.preventDefault(); scrollToSection(section.id); }}
                  className={`text-lg font-medium py-2 px-4 rounded-lg transition-colors ${activeSection === section.id ? `bg-amber-400/20 ${PRIMARY_COLOR}` : `${SUBTEXT_COLOR} hover:bg-gray-700`}`}
                >
                  {section.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className={`relative min-h-screen flex items-center justify-center overflow-hidden pt-20 ${PRIMARY_BG}`}>
        <div className="absolute inset-0 bg-dots-pattern opacity-[0.03]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-gray-900 opacity-80"></div>

        <div className="container mx-auto px-6 z-10 max-w-4xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className={`text-center ${SHADOW_COLOR} p-8 md:p-12 rounded-3xl border ${BORDER_COLOR} bg-gray-900/70 backdrop-blur-sm`}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
              className="relative w-36 h-36 mx-auto mb-6 overflow-hidden rounded-full border-4 border-amber-400/50 shadow-2xl"
            >
              <img
                src="./image.png"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className={`text-5xl md:text-6xl font-extrabold mb-4 ${TEXT_COLOR} leading-tight`}
            >
              Hello, I'm <span className="bg-gradient-to-r from-amber-400 to-yellow-200 bg-clip-text text-transparent">Vaibhav</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className={`text-lg md:text-xl ${SUBTEXT_COLOR} mb-8 leading-relaxed max-w-2xl mx-auto`}
            >
              A passionate <span className="font-semibold">Full Stack Developer</span> crafting immersive digital experiences with modern technologies.
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
                className="px-6 py-2 bg-amber-400 text-gray-900 font-bold rounded-full shadow-md hover:bg-amber-300 transition-all duration-300 hover:scale-[1.03] tracking-wider"
              >
                View My Work
              </motion.a>

              <motion.a
                variants={fadeIn}
                href="#contact"
                onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
                className="px-6 py-2 border-2 border-amber-400 text-gray-100 font-semibold rounded-full hover:bg-amber-400/20 transition-all duration-300 hover:scale-[1.03]"
              >
                Contact Me
              </motion.a>

              <motion.a
                variants={fadeIn}
                href="/resume1.pdf"
                download
                
                className="px-6 py-2 bg-gray-800 border border-amber-400 text-amber-400 font-semibold rounded-full shadow-md hover:bg-gray-700 hover:text-amber-300 transition-all duration-300 hover:scale-[1.03]"
              >
                Download Resume
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.6, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <a
            href="#about"
            onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
            className="text-amber-400 hover:text-amber-200 transition-colors duration-300"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </a>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-24 ${SECONDARY_BG} relative`}>
        <GridBackground />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <span className={`inline-block px-4 py-1 mb-4 text-sm font-semibold ${PRIMARY_COLOR} bg-amber-400/20 rounded-full tracking-widest`}>
              ABOUT ME
            </span>
            <h2 className={`text-4xl md:text-5xl font-extrabold ${TEXT_COLOR} mb-4`}>
              Crafting Digital Experiences
            </h2>
            <div className={`w-20 h-1 bg-amber-400 mx-auto`}></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={slideInLeft}
              className="relative group p-1 bg-gray-700 rounded-2xl shadow-2xl"
            >
              <img
                src="https://placehold.co/600x400/0f172a/facc15?text=About+Me"
                alt="About Me"
                className="w-full h-full object-cover rounded-xl opacity-90 transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="absolute inset-0 rounded-2xl border border-amber-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={slideInRight}
            >
              <h3 className={`text-2xl font-bold ${TEXT_COLOR} mb-4`}>
                Crafting smart digital solutions with precision and purpose.
              </h3>
              <div className={`space-y-4 ${SUBTEXT_COLOR} text-base`}>
                <p>
                  Hi! I'm a full-stack developer and B.Tech CSE student at SRM University, Sonipat. I'm passionate about building efficient, scalable, and user-friendly web applications.
                </p>
                <p>
                  My work blends strong technical skills with clean design thinking. From SaaS tools like <strong>Tracknest</strong> to platforms like <strong>MilkMate</strong> and <strong>FinTrack</strong>, I aim to create impactful solutions that address real-world needs while maintaining code quality and performance.
                </p>
                <p>
                  Beyond the screen, I'm deeply curious about new technologies and constantly learning. Whether it's contributing to open source, refining side projects, or digging into AI trends, I'm always ready to take on a new challenge.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Skills */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="mt-12"
          >
            <h3 className={`text-3xl font-extrabold text-center ${TEXT_COLOR} mb-8`}>
              My <span className={PRIMARY_COLOR}>Expertise</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className={`bg-gray-800 border ${BORDER_COLOR} rounded-xl p-4 text-center transition-all duration-200 ${SHADOW_COLOR} hover:border-amber-400/50 hover:bg-gray-700/40`}
                >
                  <div className={`w-12 h-12 mx-auto mb-2 bg-gray-700/50 rounded-full flex items-center justify-center border border-gray-600/50`}>
                    <span className={`text-lg font-extrabold ${PRIMARY_COLOR}`}>{skill.charAt(0)}</span>
                  </div>
                  <span className={`font-medium ${TEXT_COLOR} text-sm`}>{skill}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className={`py-24 ${PRIMARY_BG} relative`}>
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <span className={`inline-block px-4 py-1 mb-4 text-sm font-semibold ${PRIMARY_COLOR} bg-amber-400/20 rounded-full tracking-widest`}>
              MY JOURNEY
            </span>
            <h2 className={`text-4xl md:text-5xl font-extrabold ${TEXT_COLOR} mb-4`}>
              Education <span className={PRIMARY_COLOR}>Timeline</span>
            </h2>
            <div className={`w-20 h-1 bg-amber-400 mx-auto`}></div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="space-y-8"
          >
            {education.map((edu, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className={`${SECONDARY_BG} rounded-2xl p-6 md:p-8 ${SHADOW_COLOR} transition-all duration-500 hover:shadow-amber-400/10 border ${BORDER_COLOR} hover:border-amber-400/50`}
              >
                <div className="flex flex-col md:flex-row md:items-center mb-4">
                  <div className={`flex-shrink-0 bg-amber-400/20 p-3 rounded-xl`}>
                    <svg className={`w-7 h-7 ${PRIMARY_COLOR}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13.622m0-13.622a4.5 4.5 0 100 0m0 0H5.636c-.117 0-.28.05-.38.163-.1.113-.153.268-.153.437v13.622c0 .169.053.324.153.437.1.113.263.163.38.163h12.728c.117 0 .28-.05.38-.163.1-.113.153-.268.153-.437V6.853c0-.169-.053-.324-.153-.437-.1-.113-.263-.163-.38-.163H12z"></path>
                    </svg>
                  </div>
                  <div className="md:ml-6 mt-3 md:mt-0">
                    <h3 className={`text-xl font-bold ${TEXT_COLOR}`}>{edu.degree}</h3>
                    <p className={`${PRIMARY_COLOR} text-md font-medium`}>{edu.university}</p>
                  </div>
                  <p className={`text-sm md:ml-auto md:text-right italic ${SUBTEXT_COLOR} mt-2 md:mt-0`}>{edu.duration}</p>
                </div>

                <ul className={`list-disc list-inside ${SUBTEXT_COLOR} space-y-2 pl-4`}>
                  {edu.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="text-gray-400">
                      <span className="font-medium">{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section (compact grid with glass cards) */}
      <section id="projects" className={`py-24 ${SECONDARY_BG} relative`}>
        <GridBackground />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <span className={`inline-block px-4 py-1 mb-4 text-sm font-semibold ${PRIMARY_COLOR} bg-amber-400/20 rounded-full tracking-widest`}>
              MY WORK
            </span>
            <h2 className={`text-4xl md:text-5xl font-extrabold ${TEXT_COLOR} mb-4`}>
              Signature <span className={PRIMARY_COLOR}>Projects</span>
            </h2>
            <div className={`w-20 h-1 bg-amber-400 mx-auto`}></div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <a
              href="#projects"
              className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-semibold rounded-full shadow-md ${TEXT_COLOR} ${PRIMARY_BG} border-amber-400/50 hover:bg-gray-800 transition-all duration-300 hover:scale-[1.02]`}
            >
              Explore All Projects
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-24 ${PRIMARY_BG} relative`}>
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <span className={`inline-block px-4 py-1 mb-4 text-sm font-semibold ${PRIMARY_COLOR} bg-amber-400/20 rounded-full tracking-widest`}>
              GET IN TOUCH
            </span>
            <h2 className={`text-4xl md:text-5xl font-extrabold ${TEXT_COLOR} mb-4`}>
              Let's <span className={PRIMARY_COLOR}>Collaborate</span>
            </h2>
            <div className={`w-20 h-1 bg-amber-400 mx-auto`}></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={slideInLeft}
            >
              <h3 className={`text-2xl font-bold ${TEXT_COLOR} mb-4`}>Contact Information</h3>
              <p className={`${SUBTEXT_COLOR} text-lg mb-6`}>
                Have a project in mind or want to discuss potential opportunities? Feel free to reach out—I'd love to hear from you!
              </p>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start">
                  <div className={`flex-shrink-0 bg-amber-400/20 p-3 rounded-xl border border-amber-400/30`}>
                    <svg className={`w-5 h-5 ${PRIMARY_COLOR}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className={`text-lg font-medium ${TEXT_COLOR}`}>Email</h4>
                    <a href="mailto:vaibhavkhapra5@gmail.com" className={`${PRIMARY_COLOR} hover:text-amber-300 transition-colors text-base`}>vaibhavkhapra5@gmail.com</a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start">
                  <div className={`flex-shrink-0 bg-amber-400/20 p-3 rounded-xl border border-amber-400/30`}>
                    <svg className={`w-5 h-5 ${PRIMARY_COLOR}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className={`text-lg font-medium ${TEXT_COLOR}`}>Phone</h4>
                    <a href="tel:+91 81685 53292" className={`${PRIMARY_COLOR} hover:text-amber-300 transition-colors text-base`}>+91 81685 53292</a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start">
                  <div className={`flex-shrink-0 bg-amber-400/20 p-3 rounded-xl border border-amber-400/30`}>
                    <svg className={`w-5 h-5 ${PRIMARY_COLOR}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className={`text-lg font-medium ${TEXT_COLOR}`}>Location</h4>
                    <p className={`${SUBTEXT_COLOR} text-base`}>Sonipat, Haryana, India</p>
                  </div>
                </div>
              </div>

              {/* Socials */}
              <div className="mt-8">
                <h4 className={`text-xl font-medium ${TEXT_COLOR} mb-4`}>Follow My Journey</h4>
                <div className="flex space-x-3">
                  <a href="https://github.com/vaibhav-khapra" className={`w-10 h-10 rounded-full ${SECONDARY_BG} flex items-center justify-center ${SUBTEXT_COLOR} border ${BORDER_COLOR} hover:bg-gray-700 hover:${PRIMARY_COLOR} transition-colors duration-300 shadow`}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.417 2.865 8.168 6.839 9.504.47.087.683-.207.683-.463 0-.229-.008-.838-.013-1.649-2.782.603-3.37-1.34-3.37-1.34-.454-1.151-1.11-1.455-1.11-1.455-.908-.619.069-.607.069-.607 1.004.07 1.532 1.03 1.532 1.03.89 1.528 2.341 1.088 2.91.83.092-.647.348-1.088.633-1.339-2.222-.254-4.555-1.112-4.555-4.945 0-1.09.39-1.986 1.029-2.685-.103-.254-.447-1.272.098-2.65 0 0 .84-.27 2.75 1.024A9.13 9.13 0 0112 5.033c.877 0 1.73.118 2.544.346 1.908-1.294 2.747-1.024 2.747-1.024.546 1.378.202 2.396.099 2.65.64.699 1.029 1.595 1.029 2.685 0 3.841-2.336 4.685-4.567 4.939.356.307.674.918.674 1.854 0 1.339-.012 2.419-.012 2.747 0 .258.21.554.687.457C21.133 20.183 24 16.43 24 12.017 24 6.484 19.522 2 14 2h-2z" clipRule="evenodd"></path>
                    </svg>
                  </a>

                  <a href="https://www.linkedin.com/in/vaibhav-khapra-aa3052288/" className={`w-10 h-10 rounded-full ${SECONDARY_BG} flex items-center justify-center ${SUBTEXT_COLOR} border ${BORDER_COLOR} hover:bg-gray-700 hover:${PRIMARY_COLOR} transition-colors duration-300 shadow`}>
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
              className={`${SECONDARY_BG} p-6 rounded-2xl border ${BORDER_COLOR} ${SHADOW_COLOR}`}
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className={`block text-sm font-medium ${TEXT_COLOR} mb-1`}>Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full px-3 py-2 border ${BORDER_COLOR} rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-300 ${SECONDARY_BG} ${TEXT_COLOR}`}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className={`block text-sm font-medium ${TEXT_COLOR} mb-1`}>Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-3 py-2 border ${BORDER_COLOR} rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-300 ${SECONDARY_BG} ${TEXT_COLOR}`}
                    placeholder="john.doe@example.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="subject" className={`block text-sm font-medium ${TEXT_COLOR} mb-1`}>Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className={`w-full px-3 py-2 border ${BORDER_COLOR} rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-300 ${SECONDARY_BG} ${TEXT_COLOR}`}
                    placeholder="Project Inquiry"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className={`block text-sm font-medium ${TEXT_COLOR} mb-1`}>Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`w-full px-3 py-2 border ${BORDER_COLOR} rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-300 ${SECONDARY_BG} ${TEXT_COLOR}`}
                    placeholder="Tell me about your project..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className={`w-full bg-amber-400 text-gray-900 font-bold py-2 px-4 rounded-lg shadow-md hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 hover:scale-[1.01] tracking-wider`}
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <footer className={`${SECONDARY_BG} ${TEXT_COLOR} py-8 text-center border-t ${BORDER_COLOR} shadow-inner`}>
        <div className="container mx-auto px-4">
          <p className="text-lg font-medium">
            &copy; {new Date().getFullYear()} Vaibhav Khapra. All rights reserved.
          </p>
          <p className="text-sm mt-2 text-gray-400">
            Crafted with <span className="text-red-500">&hearts;</span> by Vaibhav Khapra
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
