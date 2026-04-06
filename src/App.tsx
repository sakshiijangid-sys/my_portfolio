/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { 
  Mail, 
  Linkedin, 
  Phone, 
  Github, 
  ExternalLink, 
  GraduationCap, 
  Code2, 
  Award, 
  Briefcase,
  ChevronDown,
  ChevronUp,
  User,
  X,
  Plus
} from "lucide-react";
import { cn } from "@/src/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const MY_IMAGE = "https://storage.googleapis.com/aistudio-build-assets/images/portfolio_user_image.png";

const UNPUBLISHED_PROJECTS = [
  {
    id: 1,
    name: "AI Content Generator",
    mainImg: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=500",
    gallery: [
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1675271591211-126ad94e495d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1673187309250-13f615366931?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: 2,
    name: "Crypto Dashboard",
    mainImg: "https://images.unsplash.com/photo-1504868584819-f8e905263543?auto=format&fit=crop&q=80&w=500",
    gallery: [
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1621761191319-c6fb62004009?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1622639225985-84f88729ac12?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1605792657660-596af9009e82?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: 3,
    name: "Health Tracker",
    mainImg: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=500",
    gallery: [
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1505751172107-573957a243b0?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: 4,
    name: "Real Estate App",
    mainImg: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=500",
    gallery: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: 5,
    name: "Learning Management",
    mainImg: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=500",
    gallery: [
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1523050335456-adaba834597c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800"
    ]
  }
];

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<typeof UNPUBLISHED_PROJECTS[0] | null>(null);

  useGSAP(() => {
    /*
    // Scroll Progress Bar
    gsap.to(".scroll-progress", {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });

    // Hero Animations
    const tl = gsap.timeline();
    tl.from(".hero-text", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power4.out",
    })
    .from(".hero-image", {
      x: 100,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
    }, "-=0.8");

    // Scroll Animations for Sections
    const sections = gsap.utils.toArray<HTMLElement>(".section-reveal-child");
    sections.forEach((section) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: "top bottom-=50",
          toggleActions: "play none none reverse",
        },
        y: 20,
        duration: 0.6,
        ease: "power2.out",
      });
    });

    // Skills Animation
    gsap.from(".skill-tag", {
      scrollTrigger: {
        trigger: ".skills-grid",
        start: "top 95%",
      },
      y: 20,
      duration: 0.4,
      stagger: 0.02,
      ease: "power2.out",
    });

    // Education Timeline Animation
    gsap.from(".edu-card", {
      scrollTrigger: {
        trigger: ".edu-section",
        start: "top 95%",
      },
      y: 30,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
    });

    // Project Cards Hover Animation
    const projectCards = gsap.utils.toArray<HTMLElement>(".project-card");
    projectCards.forEach((card) => {
      const img = card.querySelector("img");
      if (img) {
        card.addEventListener("mouseenter", () => {
          gsap.to(img, { scale: 1.05, duration: 0.4, ease: "power2.out" });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(img, { scale: 1, duration: 0.4, ease: "power2.out" });
        });
      }
    });

    // Refresh ScrollTrigger after all animations are set with a slight delay
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => clearTimeout(refreshTimeout);
    */
  }, { scope: containerRef });

  // Modal Animation - Separate effect to avoid re-triggering scroll animations
  useGSAP(() => {
    if (selectedProject) {
      gsap.from(".modal-content", {
        scale: 0.9,
        opacity: 0,
        duration: 0.4,
        ease: "power3.out"
      });
    }
  }, { scope: containerRef, dependencies: [selectedProject] });

  return (
    <div ref={containerRef} className="bg-[#FDFBF7] text-[#1A1A1A] font-sans selection:bg-[#966F33] selection:text-white">
      {/* Scroll Progress Bar */}
      <div className="scroll-progress fixed top-0 left-0 w-full h-1 bg-[#966F33] origin-left scale-x-0 z-[100]" />

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10">
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-sm" 
            onClick={() => setSelectedProject(null)}
          />
          <div className="modal-content relative bg-white w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-3xl p-8 md:p-12 shadow-2xl">
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={32} />
            </button>
            
            <div className="mb-12">
              <h2 className="text-4xl font-bold mb-4">{selectedProject.name}</h2>
              <p className="text-gray-500 uppercase tracking-widest font-bold text-sm">Project Gallery & Concept</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedProject.gallery.map((img, i) => (
                <div key={i} className="aspect-video rounded-2xl overflow-hidden bg-gray-100 group">
                  <img 
                    src={img} 
                    alt={`Gallery ${i}`} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>

            <div className="mt-12 p-8 bg-[#FDFBF7] rounded-2xl border border-gray-100">
              <h3 className="text-xl font-bold mb-4">Project Overview</h3>
              <p className="text-gray-600 leading-relaxed">
                This project is currently in development. It focuses on providing a seamless user experience using the MERN stack. 
                The gallery above showcases the initial UI/UX designs and early-stage development screenshots. 
                Stay tuned for the full release!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center mix-blend-difference text-white">
        <div className="text-xl font-bold tracking-tighter">SJ.</div>
        <div className="hidden md:flex space-x-8 text-sm font-medium uppercase tracking-widest">
          <a href="#about" className="hover:text-[#966F33] transition-colors">About</a>
          <a href="#education" className="hover:text-[#966F33] transition-colors">Education</a>
          <a href="#skills" className="hover:text-[#966F33] transition-colors">Skills</a>
          <a href="#projects" className="hover:text-[#966F33] transition-colors">Projects</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center px-6 md:px-20 overflow-hidden">
        <div className="z-10 max-w-4xl">
          <h2 className="hero-text text-[#966F33] text-lg font-bold tracking-widest uppercase mb-4">MERN Stack Developer</h2>
          <h1 className="hero-text text-6xl md:text-9xl font-bold tracking-tighter leading-none mb-8">
            Sakshi <br /> Jangid
          </h1>
          <p className="hero-text text-lg md:text-xl text-gray-600 max-w-lg mb-10 leading-relaxed">
            Crafting high-performance web applications with modern technologies and a focus on user experience.
          </p>
          <div className="hero-text flex space-x-4 mb-12">
            <a href="#projects" className="bg-[#1A1A1A] text-white px-8 py-4 rounded-full font-medium hover:bg-[#966F33] transition-all duration-300">
              View Projects
            </a>
            <a href="#contact" className="border border-[#1A1A1A] px-6 md:px-8 py-4 rounded-full font-medium hover:bg-[#1A1A1A] hover:text-white transition-all duration-300">
              Get in Touch
            </a>
          </div>
        </div>

        {/* Hero Illustration - Programming Focused */}
        <div className="hero-image absolute right-0 top-0 w-full md:w-[55%] h-full pointer-events-none">
          <div className="relative w-full h-full">
            <img 
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200" 
              alt="Programming Illustration" 
              className="absolute right-0 bottom-0 h-full w-full object-cover opacity-40 mix-blend-multiply"
              referrerPolicy="no-referrer"
            />
            {/* Gradient Overlay to blend illustration with the background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FDFBF7] via-[#FDFBF7]/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-transparent to-transparent" />
            
            {/* Decorative Technical Elements */}
            <div className="absolute top-1/4 right-1/4 w-64 h-64 border border-[#966F33]/20 rounded-full animate-[spin_20s_linear_infinite]" />
            <div className="absolute top-1/3 right-1/3 w-48 h-48 border border-[#966F33]/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-gray-400" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 md:px-20 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div>
            <div className="flex items-center space-x-4 mb-6">
              <div className="h-[1px] w-12 bg-[#966F33]" />
              <span className="text-[#966F33] font-bold uppercase tracking-widest text-lg">About Me</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">
              Passionate about building <br /> digital experiences.
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              I am a dedicated MERN Stack Developer with a strong foundation in building scalable and efficient web applications. My journey in technology is driven by a curiosity to solve complex problems and a commitment to delivering high-quality code.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              With expertise in MongoDB, Express.js, React, and Node.js, I specialize in creating seamless full-stack solutions that combine robust backend logic with intuitive, responsive front-end designs.
            </p>
          </div>
          <div className="relative">
            <div className="aspect-square bg-[#FDFBF7] rounded-2xl overflow-hidden border border-gray-100 shadow-2xl">
               <img 
                src="https://storage.googleapis.com/aistudio-build-assets/images/portfolio_user_image.png" 
                alt="Sakshi Jangid Profile" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-[#966F33] text-white p-10 rounded-2xl hidden md:block">
              <p className="text-4xl font-bold">2+</p>
              <p className="text-sm uppercase tracking-widest font-medium">Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-32 px-6 md:px-20 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-black mb-16">Education Details</h2>
          <div className="flex items-center space-x-4 mb-12">
            <div className="h-[1px] w-12 bg-[#966F33]" />
            <span className="text-[#966F33] font-bold uppercase tracking-widest text-lg">Academic Background</span>
          </div>
          
          <div className="grid gap-12">
            {[
              {
                title: "Bachelor of Technology (B.Tech)",
                institute: "YMCA University",
                duration: "2020 - 2024",
                grade: "80%",
                desc: "Specialized in Computer Science and Engineering. Focused on Data Structures, Algorithms, and Web Technologies.",
                list: ["Data Structures & Algorithms", "Operating Systems", "Database Management Systems", "Cloud Computing"]
              },
              {
                title: "Higher Secondary Education (12th)",
                institute: "GMSSS School",
                duration: "2018 - 2020",
                grade: "73%",
                desc: "Science Stream (PCM). Developed a strong foundation in Mathematics and Physics.",
                list: ["Physics", "Chemistry", "Mathematics", "Computer Science"]
              },
              {
                title: "Secondary Education (10th)",
                institute: "AMSS School",
                duration: "2017 - 2018",
                grade: "100%",
                desc: "Excelled in all core subjects with a focus on logical reasoning and science.",
                list: ["Mathematics", "Science", "Social Studies", "English"]
              }
            ].map((edu, i) => (
              <div key={i} className="bg-white p-10 rounded-3xl border border-gray-300 shadow-xl transition-all duration-500">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                  <div>
                    <h3 className="text-3xl font-bold text-black mb-2">{edu.title}</h3>
                    <p className="text-xl text-gray-900 font-semibold">{edu.institute}</p>
                  </div>
                  <div className="mt-4 md:mt-0 text-right">
                    <span className="bg-[#966F33] text-white px-6 py-2 rounded-full text-sm font-bold">{edu.duration}</span>
                    <p className="mt-3 font-black text-3xl text-[#966F33]">{edu.grade}</p>
                  </div>
                </div>
                <p className="text-xl text-gray-900 leading-relaxed max-w-4xl mb-8 font-medium">{edu.desc}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {edu.list.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="w-2 h-2 rounded-full bg-[#966F33]" />
                      <span className="text-lg text-gray-900 font-bold">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 px-6 md:px-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center space-x-4 mb-12">
            <div className="h-[1px] w-12 bg-[#966F33]" />
            <span className="text-[#966F33] font-bold uppercase tracking-widest text-lg">Skills</span>
          </div>

          <div className="grid md:grid-cols-2 gap-20">
            {/* Soft Skills */}
            <div>
              <h3 className="text-3xl font-bold mb-10 flex items-center text-black">
                <User className="mr-4 text-[#966F33]" /> Soft Skills
              </h3>
              <div className="flex flex-wrap gap-4">
                {[
                  "Communication", "Leadership", "Problem Solving", 
                  "Time Management", "Adaptability", "Critical Thinking", 
                  "Collaboration", "Emotional Intelligence", "Public Speaking",
                  "Conflict Resolution", "Work Ethic", "Networking"
                ].map((skill) => (
                  <span key={skill} className="px-6 py-3 bg-[#FDFBF7] border border-gray-200 rounded-full text-sm font-medium text-gray-800 hover:bg-[#966F33] hover:text-white transition-all cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Technical Skills */}
            <div>
              <h3 className="text-3xl font-bold mb-10 flex items-center text-black">
                <Code2 className="mr-4 text-[#966F33]" /> Technical Skills
              </h3>
              <div className="flex flex-wrap gap-4">
                {[
                  "HTML5", "CSS3", "TailwindCSS", "JavaScript", 
                  "React.js", "Node.js", "Express.js", "MongoDB", 
                  "TypeScript", "GSAP", "Git", "REST APIs",
                  "Next.js", "Redux", "Firebase", "Docker",
                  "AWS", "GraphQL"
                ].map((skill) => (
                  <span key={skill} className="px-6 py-3 bg-[#1A1A1A] text-white rounded-full text-sm font-medium hover:bg-[#966F33] transition-all cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-32 px-6 md:px-20 bg-[#FDFBF7]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center space-x-4 mb-12">
            <div className="h-[1px] w-12 bg-[#966F33]" />
            <span className="text-[#966F33] font-bold uppercase tracking-widest text-lg">Certifications</span>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Full Stack Web Development", org: "Meta Academy" },
              { name: "Advanced React Patterns", org: "Frontend Masters" },
              { name: "MongoDB Professional", org: "MongoDB University" },
              { name: "UI/UX Design Essentials", org: "Adobe Creative" },
              { name: "Node.js Backend Mastery", org: "Udemy Pro" },
              { name: "Cloud Computing Fundamentals", org: "AWS Training" }
            ].map((cert, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-[#966F33] transition-all group">
                <Award className="text-[#966F33] mb-6 group-hover:scale-110 transition-transform" size={40} />
                <h4 className="text-xl font-bold mb-2">{cert.name}</h4>
                <p className="text-gray-500">{cert.org}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6 md:px-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center space-x-4 mb-12">
            <div className="h-[1px] w-12 bg-[#966F33]" />
            <span className="text-[#966F33] font-bold uppercase tracking-widest text-lg">Projects</span>
          </div>

          {/* Published Projects */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold mb-12">Published Work</h3>
            <div className="grid md:grid-cols-2 gap-12">
              {[
                {
                  name: "Eco-Commerce Platform",
                  desc: "A full-featured MERN stack e-commerce app with Stripe integration and admin dashboard.",
                  img: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1000",
                  link: "/projects/eco-commerce"
                },
                {
                  name: "TaskFlow Pro",
                  desc: "Real-time collaborative project management tool built with React, Socket.io, and Node.js.",
                  img: "https://images.unsplash.com/photo-1454165833767-02a6e30aa46a?auto=format&fit=crop&q=80&w=1000",
                  link: "/projects/taskflow"
                },
                {
                  name: "Nexus Social Media",
                  desc: "A modern social networking platform with real-time chat, post sharing, and user profiles.",
                  img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1000",
                  link: "/projects/nexus"
                },
                {
                  name: "Zenith Portfolio",
                  desc: "A high-performance portfolio template for creative professionals with GSAP animations.",
                  img: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1000",
                  link: "/projects/zenith"
                }
              ].map((project, i) => (
                <div key={i} className="section-reveal project-card group">
                  <div className="relative aspect-video rounded-3xl overflow-hidden mb-6">
                    <img 
                      src={project.img} 
                      alt={project.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <a href={project.link} className="bg-white text-black p-4 rounded-full hover:bg-[#966F33] hover:text-white transition-colors">
                        <ExternalLink size={24} />
                      </a>
                    </div>
                  </div>
                  <h4 className="text-2xl font-bold mb-2">{project.name}</h4>
                  <p className="text-gray-600 mb-4">{project.desc}</p>
                  <div className="flex space-x-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#966F33]">React</span>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#966F33]">Node.js</span>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#966F33]">MongoDB</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Unpublished Projects */}
          <div>
            <h3 className="text-3xl font-bold mb-12">In Development</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {UNPUBLISHED_PROJECTS.map((project) => (
                <div 
                  key={project.id} 
                  className="relative aspect-square rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer group"
                  onClick={() => setSelectedProject(project)}
                >
                  <img 
                    src={project.mainImg} 
                    alt={project.name} 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer" 
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                    <Plus className="text-[#966F33] mb-2" size={32} />
                    <p className="text-white text-xs font-bold uppercase tracking-widest">{project.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-[#1A1A1A] text-white pt-32 pb-10 px-6 md:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 mb-20">
            <div>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-10">
                Let's work <br /> <span className="text-[#966F33]">together.</span>
              </h2>
              <div className="space-y-6">
                <a href="mailto:sakshijangid@gmail.com" className="flex items-center text-xl hover:text-[#966F33] transition-colors">
                  <Mail className="mr-4" /> sakshijangid@gmail.com
                </a>
                <p className="flex items-center text-xl">
                  <Phone className="mr-4" /> +91 98765 43210
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-end items-start md:items-end">
              <div className="flex space-x-6 mb-10">
                <a href="#" className="p-4 bg-white/5 rounded-full hover:bg-[#966F33] transition-all">
                  <Linkedin size={24} />
                </a>
                <a href="#" className="p-4 bg-white/5 rounded-full hover:bg-[#966F33] transition-all">
                  <Github size={24} />
                </a>
              </div>
              <p className="text-gray-500 text-sm tracking-widest uppercase font-medium">Based in Rajasthan, India</p>
            </div>
          </div>
          
          <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
            <p>© 2026 Sakshi Jangid. All rights reserved.</p>
            <div className="flex space-x-8 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-10 right-10 p-4 bg-[#966F33] text-white rounded-full shadow-2xl hover:scale-110 transition-all z-40"
      >
        <ChevronUp size={24} />
      </button>
    </div>
  );
}
