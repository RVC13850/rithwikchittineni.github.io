import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Code, Briefcase, User, Award, Terminal, Sparkles, Rocket } from 'lucide-react';
import * as THREE from 'three';
import utdLogo from './assets/utd-logo.png';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('about');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredProject, setHoveredProject] = useState(null);
  const [typedText, setTypedText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const fullText = "Building the future, one line at a time.";
  const cubeRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [typedText]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(v => !v);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // 3D Cube Setup
  useEffect(() => {
    if (!cubeRef.current) return;
    
    // Clear existing content
    while (cubeRef.current.firstChild) {
      cubeRef.current.removeChild(cubeRef.current.firstChild);
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(300, 300);
    renderer.setClearColor(0x000000, 0);
    cubeRef.current.appendChild(renderer.domElement);

    // Create cube with edges
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshBasicMaterial({ 
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.1,
      wireframe: false
    });
    const cube = new THREE.Mesh(geometry, material);
    
    const edges = new THREE.EdgesGeometry(geometry);
    const line = new THREE.LineSegments(
      edges, 
      new THREE.LineBasicMaterial({ color: 0x3b82f6, linewidth: 2 })
    );
    
    cube.add(line);
    scene.add(cube);
    
    // Add spheres at corners
    const sphereGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x8b5cf6 });
    
    const corners = [
      [1, 1, 1], [1, 1, -1], [1, -1, 1], [1, -1, -1],
      [-1, 1, 1], [-1, 1, -1], [-1, -1, 1], [-1, -1, -1]
    ];
    
    corners.forEach(([x, y, z]) => {
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.position.set(x, y, z);
      cube.add(sphere);
    });

    camera.position.z = 5;
    sceneRef.current = { scene, camera, renderer, cube };

    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      cube.rotation.x += 0.005;
      cube.rotation.y += 0.005;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      geometry.dispose();
      material.dispose();
      edges.dispose();
      sphereGeometry.dispose();
      sphereMaterial.dispose();
      renderer.dispose();
      scene.clear();
      if (cubeRef.current && renderer.domElement && cubeRef.current.contains(renderer.domElement)) {
        cubeRef.current.removeChild(renderer.domElement);
      }
    };
  }, [activeSection]);

  // Update cube rotation based on mouse
  useEffect(() => {
    if (sceneRef.current) {
      const { cube } = sceneRef.current;
      const rotationX = (mousePosition.y / window.innerHeight - 0.5) * 0.5;
      const rotationY = (mousePosition.x / window.innerWidth - 0.5) * 0.5;
      cube.rotation.x += (rotationX - cube.rotation.x) * 0.1;
      cube.rotation.y += (rotationY - cube.rotation.y) * 0.1;
    }
  }, [mousePosition]);

  const projects = [
    {
      title: "DocuVoice",
      description: "Full-stack application for Breaking Barriers GenAI Hackathon helping individuals with poor literacy by scanning documents and verbally conveying information. Users can ask questions and receive spoken responses in multiple languages using AWS AI services.",
      tech: ["Python", "Flask", "React", "AWS Polly", "AWS Textract", "AWS Bedrock"],
      github: "https://github.com/RVC13850/DocuVoice",
      demo: null,
      color: "from-blue-500 to-cyan-500",
      gradient: "linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)"
    },
    {
      title: "Wellness Center Coordination App",
      description: "Web application streamlining communication between staff and volunteers at Wellness Center of Older Adults. Enables staff to arrange transportation for patients and manage interactions with clients, volunteers, and staff members.",
      tech: ["JavaScript", "TypeScript", "React", "Node.js", "Prisma", "Docker"],
      github: "https://github.com/RVC13850/Wellness-Center-Older-Adults",
      demo: null,
      color: "from-purple-500 to-pink-500",
      gradient: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)"
    },
    {
      title: "VaultGuardian",
      description: "Secure Flask-based password manager with end-to-end encryption. Features multi-factor authentication (TOTP & email OTP) and a clean dashboard for managing credentials. Built with security-first approach using industry-standard encryption.",
      tech: ["Python", "Flask", "HTML", "CSS", "SQLite", "Cryptography"],
      github: "https://github.com/RVC13850/VaultGuardian",
      demo: null,
      color: "from-green-500 to-emerald-500",
      gradient: "linear-gradient(135deg, #22c55e 0%, #10b981 100%)"
    },
    {
      title: "UTDTrends",
      description: "Course selection platform helping UTD students make informed decisions about their classes. Features trending courses, professor ratings, and detailed course analytics to help students choose the perfect classes for their academic journey.",
      tech: ["TypeScript", "React", "Next.js", "TailwindCSS", "API Integration"],
      github: "https://github.com/RVC13850/UTDTrends",
      demo: null,
      color: "from-orange-500 to-red-500",
      gradient: "linear-gradient(135deg, #f97316 0%, #ef4444 100%)"
    },
    {
      title: "Financial Assistant (HackUTD 2024)",
      description: "AI-powered financial assistant developed at HackUTD 2024. Helps users manage their finances with intelligent insights, budget tracking, and personalized financial recommendations using machine learning.",
      tech: ["Python", "Machine Learning", "NLP", "Flask", "API Development"],
      github: "https://github.com/RVC13850/HackUTD2024-FinancialAssistant",
      demo: null,
      color: "from-yellow-500 to-orange-500",
      gradient: "linear-gradient(135deg, #eab308 0%, #f97316 100%)"
    },
    {
      title: "BlackHole",
      description: "Collaborative project focused on software engineering best practices. Features comprehensive testing, CI/CD integration, and scalable architecture design patterns for modern web applications.",
      tech: ["JavaScript", "React", "Node.js", "Testing", "CI/CD"],
      github: "https://github.com/RVC13850/BlackHole",
      demo: null,
      color: "from-teal-500 to-blue-500",
      gradient: "linear-gradient(135deg, #14b8a6 0%, #3b82f6 100%)"
    }
  ];

  const skills = {
    languages: ["Java", "JavaScript", "TypeScript", "Python", "C/C++", "SQL"],
    frameworks: ["React", "Node.js", "Flask", "Angular", "SpringBoot"],
    tools: ["Git", "Docker", "Prisma", "AWS", "VS Code", "MongoDB", "Agile"],
    libraries: ["PyTorch", "TensorFlow", "Pandas", "NumPy", "Matplotlib"]
  };

  const experience = [
    {
      title: "Software Engineering Intern",
      company: "American Airlines",
      location: "Fort Worth, TX",
      period: "June 2025 – August 2025",
      description: "Developed and deployed internal automation tools to streamline data validation, reporting, and system monitoring, reducing manual effort by over 50%. Built and maintained backend services using Python, Flask, and PostgreSQL. Integrated CI/CD pipelines with GitHub Actions and Docker, accelerating development cycles and improving code reliability.",
      icon: <Rocket className="w-6 h-6" />
    },
    {
      title: "Software Engineer Intern",
      company: "Veritis Group Inc.",
      location: "Irving, TX",
      period: "June 2024 – August 2024",
      description: "Contributed to the creation of a robust Customer Portal application designed to efficiently track, store, and display project data. Collaborated on the design and implementation of a Java-based backend, ensuring data integrity and seamless functionality. Leveraged AWS services for application hosting, ensuring scalability and high availability.",
      icon: <Code className="w-6 h-6" />
    },
    {
      title: "Artificial Intelligence Mentee",
      company: "AI Club @ UTD",
      location: "Richardson, TX",
      period: "September 2023 – December 2023",
      description: "Developed an app utilizing deep learning models to detect diabetic retinopathy from retinal images, achieving 95% accuracy in early-stage detection. Designed the app's architecture ensuring seamless integration of deep learning algorithms. Collaborated with medical experts to fine-tune models and improve diagnostic reliability.",
      icon: <Sparkles className="w-6 h-6" />
    }
  ];



  const nextProject = () => {
    setCurrentProjectIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProjectIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl transition-all duration-1000"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900/50 backdrop-blur-xl border-b border-gray-800/50 z-50 transform transition-all duration-300">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => setActiveSection('about')}>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center transform group-hover:rotate-180 transition-transform duration-500">
              <Terminal className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Rithwik Chittineni
            </h1>
          </div>
          <div className="flex gap-1 bg-gray-800/50 rounded-full p-1">
            {['about', 'projects', 'experience', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-6 py-2 rounded-full capitalize transition-all duration-300 ${
                  activeSection === section
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/50'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                {section}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 pt-32 pb-12 relative z-10">
        {/* About Section with 3D Cube */}
        {activeSection === 'about' && (
          <div className="space-y-12 animate-slideIn">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm animate-pulse">
                <Sparkles className="w-4 h-4" />
                Available for opportunities
              </div>
              
              {/* 3D Cube Hero */}
              <div className="flex justify-center mb-8">
                <div 
                  ref={cubeRef} 
                  className="w-[300px] h-[300px] cursor-pointer"
                  style={{ perspective: '1000px' }}
                />
              </div>
              
              <h1 className="text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradientMove">
                Software Engineer
              </h1>
              
              <div className="text-2xl text-gray-400 font-mono h-8">
                {typedText}
                <span className={`${cursorVisible ? 'opacity-100' : 'opacity-0'}`}>|</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Technical Skills */}
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 transform hover:-translate-y-2">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Code className="w-6 h-6 text-blue-400" />
                  Technical Skills
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-blue-400 mb-3">Languages</h4>
                    <div className="flex flex-wrap gap-3">
                      {skills.languages.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-lg text-sm hover:bg-blue-500/20 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-purple-400 mb-3">Frameworks</h4>
                    <div className="flex flex-wrap gap-3">
                      {skills.frameworks.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-lg text-sm hover:bg-purple-500/20 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-green-400 mb-3">Tools & Libraries</h4>
                    <div className="flex flex-wrap gap-3">
                      {[...skills.tools, ...skills.libraries].map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-lg text-sm hover:bg-green-500/20 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* About Me & Education */}
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 transform hover:-translate-y-2">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <User className="w-6 h-6 text-purple-400" />
                  About Me
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Computer Science student at The University of Texas at Dallas, passionate about building 
                  impactful software solutions. Experienced in full-stack development, cloud technologies, 
                  and AI/ML applications.
                </p>
                
                <div className="mb-6 p-5 bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-xl border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-14 h-14 bg-white rounded-lg p-1.5 shadow-lg">
                      <img 
                        src={utdLogo} 
                        alt="UTD Logo" 
                        className="w-full h-full rounded object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-blue-400 mb-1">Education</h4>
                      <p className="text-white font-semibold text-base">The University of Texas at Dallas</p>
                      <p className="text-gray-400 text-sm">B.S. in Computer Science</p>
                      <p className="text-gray-500 text-xs mt-0.5">August 2023 – December 2026</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-purple-400 mb-3">Connect</h4>
                  <div className="flex flex-wrap gap-3">
                     <a
                      href="https://linkedin.com/in/rithwikchittineni"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-blue-500 hover:bg-gray-700/50 transition-all duration-300 group"
                    >
                      <Linkedin className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
                      <span className="text-sm">LinkedIn</span>
                    </a>
                    <a
                      href="https://github.com/RVC13850"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-blue-500 hover:bg-gray-700/50 transition-all duration-300 group"
                    >
                      <Github className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
                      <span className="text-sm">GitHub</span>
                    </a>
                    <a
                      href="mailto:rithwikchittineni@gmail.com"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-purple-500 hover:bg-gray-700/50 transition-all duration-300 group"
                    >
                      <Mail className="w-5 h-5 group-hover:text-purple-400 transition-colors" />
                      <span className="text-sm">Email</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3D Projects Carousel */}
        {activeSection === 'projects' && (
          <div className="space-y-8 animate-slideIn">
            <div className="flex items-center gap-4 mb-8">
              <Award className="w-10 h-10 text-blue-400 animate-bounce" />
              <h2 className="text-5xl font-bold">Featured Projects</h2>
            </div>
            
            <div className="relative" style={{ perspective: '2000px' }}>
              <div className="relative h-[600px] flex items-center justify-center">
                {projects.map((project, idx) => {
                  const offset = idx - currentProjectIndex;
                  const isActive = offset === 0;
                  const isPrev = offset === -1 || offset === projects.length - 1;
                  const isNext = offset === 1 || offset === -(projects.length - 1);
                  
                  return (
                    <div
                      key={idx}
                      className="absolute w-full max-w-2xl transition-all duration-700 ease-out"
                      style={{
                        transform: `
                          translateX(${offset * 100}%)
                          translateZ(${isActive ? '0px' : '-400px'})
                          rotateY(${offset * -25}deg)
                          scale(${isActive ? 1 : 0.7})
                        `,
                        opacity: Math.abs(offset) <= 1 ? 1 : 0,
                        pointerEvents: isActive ? 'auto' : 'none',
                        zIndex: isActive ? 10 : Math.abs(offset) === 1 ? 5 : 0,
                      }}
                    >
                      <div
                        className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-2xl p-8 border-2 border-gray-700/50 shadow-2xl"
                        style={{
                          background: isActive ? project.gradient : 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
                          borderColor: isActive ? 'transparent' : '#374151'
                        }}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-3xl font-bold text-white">
                            {project.title}
                          </h3>
                          <Rocket className={`w-8 h-8 ${isActive ? 'text-white animate-bounce' : 'text-gray-500'}`} />
                        </div>
                        
                        <p className="text-gray-200 text-lg mb-6 leading-relaxed">{project.description}</p>
                        
                        <div className="flex flex-wrap gap-3 mb-6">
                          {project.tech.map((tech, i) => (
                            <span
                              key={i}
                              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-sm backdrop-blur-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex gap-4">
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
                          >
                            <Github className="w-5 h-5" />
                            View Code
                          </a>
                          {project.demo && (
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
                            >
                              <ExternalLink className="w-5 h-5" />
                              Live Demo
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Navigation Controls */}
              <div className="flex justify-center gap-4 mt-8">
                <button
                  onClick={prevProject}
                  className="w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-700 flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <span className="text-2xl">←</span>
                </button>
                <div className="flex items-center gap-2">
                  {projects.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentProjectIndex(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === currentProjectIndex 
                          ? 'w-8 bg-gradient-to-r from-blue-500 to-purple-500' 
                          : 'w-2 bg-gray-600 hover:bg-gray-500'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextProject}
                  className="w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-700 flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <span className="text-2xl">→</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Experience Section */}
        {activeSection === 'experience' && (
          <div className="space-y-8 animate-slideIn">
            <div className="flex items-center gap-4 mb-8">
              <Briefcase className="w-10 h-10 text-purple-400 animate-bounce" />
              <h2 className="text-5xl font-bold">Experience</h2>
            </div>
            
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500" />
              
              <div className="space-y-12">
                {experience.map((exp, idx) => (
                  <div
                    key={idx}
                    className="relative pl-20 animate-slideInRight"
                    style={{ animationDelay: `${idx * 0.2}s` }}
                  >
                    <div className="absolute left-5 top-6 w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full border-4 border-gray-950 animate-pulse" />
                    
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 transform hover:-translate-y-2 group">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                          {exp.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold mb-1">{exp.title}</h3>
                          <p className="text-blue-400">{exp.company} • {exp.location}</p>
                        </div>
                        <span className="text-gray-400 bg-gray-800 px-4 py-2 rounded-full">{exp.period}</span>
                      </div>
                      <p className="text-gray-300 text-lg leading-relaxed">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Contact Section */}
        {activeSection === 'contact' && (
          <div className="space-y-8 animate-slideIn">
            <div className="flex items-center gap-4 mb-8">
              <Mail className="w-10 h-10 text-green-400 animate-bounce" />
              <h2 className="text-5xl font-bold">Let's Connect</h2>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl p-12 border border-gray-700/50 hover:border-green-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/20 transform hover:scale-105">
                <p className="text-2xl text-gray-300 mb-8 leading-relaxed text-center">
                  I'm always excited to connect with fellow engineers and explore new opportunities.
                  Let's build something amazing together!
                </p>
                
                <div className="space-y-6">
                  {[
                    { icon: <Linkedin />, label: 'Linkedin', href: 'https://linkedin.com/in/rithwikchittineni' },
                    { icon: <Github />, label: 'Github', href: 'https://github.com/RVC13850' },
                    { icon: <Mail />, label: 'Email', href: 'mailto:rithwikchittineni@gmail.com' }
                  ].map((contact, idx) => (
                    <a
                      key={idx}
                      href={contact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-6 bg-gray-800/50 rounded-xl border border-gray-700 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 hover:border-blue-500 transition-all duration-300 transform hover:scale-105 group"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
                        {React.cloneElement(contact.icon, { className: 'w-6 h-6' })}
                      </div>
                      <span className="text-xl">{contact.label}</span>
                      <ExternalLink className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }
        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-slideIn {
          animation: slideIn 0.6s ease-out;
        }
        .animate-slideInRight {
          animation: slideInRight 0.6s ease-out;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-gradientMove {
          background-size: 200% 200%;
          animation: gradientMove 3s ease infinite;
        }
      `}</style>
    </div>
  );
}
