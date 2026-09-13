/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import heroVideoSrc from './assets/VIDEO_a22b7f24-5e95-49d7-969b-f7b756f1c4bd.mp4';
import React, { useEffect, useRef, useState } from "react";
import TrueFocus from "./components/TrueFocus";
import GradualBlur from "./components/GradualBlur";
import ScrollVelocity from "./components/ScrollVelocity";
import SpecularButton from "./components/SpecularButton";
import BubbleMenu from "./components/BubbleMenu";
import BlurText from "./components/BlurText";
import OptionWheel from "./components/OptionWheel";
import FlowerCTAWrapper from "./components/FlowerClusterPopup";
import ParticleText from "./components/ParticleText";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { 
  Mail, 
  Linkedin, 
  ExternalLink, 
  ChevronUp,
  X,
  Plus,
  Zap,
  Send,
  Calendar,
  ShieldCheck,
  Terminal,
  ArrowRight,
  Copy,
  Check,
  Volume2,
  VolumeX
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const UNPUBLISHED_PROJECTS = [
  {
    id: 1,
    name: "AI Content Generator",
    description: "An experimental full-stack AI content studio providing rapid prompt engineering, real-time generation pipelines, and multi-format document exports.",
    mainImg: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=500",
    gallery: [
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1675271591211-126ad94e495d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: 2,
    name: "Crypto Dashboard",
    description: "A real-time cryptocurrency analytics platform with live market data feeds, interactive portfolio tracking, and automated risk indicators.",
    mainImg: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1000",
    gallery: [
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1621761191319-c6fb62004009?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1622639225985-84f88729ac12?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: 3,
    name: "Health Tracker",
    description: "A privacy-first health metrics dashboard tracking daily activity, biometric analytics, and personalized wellness goals.",
    mainImg: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=500",
    gallery: [
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1505751172107-573957a243b0?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: 4,
    name: "Real Estate App",
    description: "A modern property search platform featuring high-resolution interactive map overlays, filterable listings, and instant virtual tour scheduling.",
    mainImg: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=500",
    gallery: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=800"
    ]
  }
];

interface ProofItem {
  title: string;
  badge: string;
  rawImg: string;
  enhancedImg: string;
  rawText: string;
  enhancedText: string;
}

function ProofFlipCard({ item }: { item: ProofItem; key?: React.Key }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Auto-flip after 4.5 seconds when hovering over the raw front card
    if (isHovered && !isFlipped) {
      const timer = setTimeout(() => {
        setIsFlipped(true);
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [isHovered, isFlipped]);

  return (
    <div 
      onClick={() => setIsFlipped(!isFlipped)} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flip-card-container group h-[430px] w-full select-none cursor-pointer"
    >
      <div className={`flip-card rounded-3xl shadow-2xl ${isFlipped ? 'is-flipped' : ''}`}>
        
        {/* FRONT CARD: RAW AI OUTPUT */}
        <div className="flip-card-front rounded-3xl overflow-hidden border border-rose-900/40 bg-slate-950 flex flex-col justify-between p-6 shadow-2xl relative">
          {/* Background Image: Raw AI Draft - Clean & Visible */}
          <img 
            src={item.rawImg} 
            alt={`${item.title} Raw AI Draft`} 
            className="absolute inset-0 w-full h-full object-cover brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          {/* Subtle Bottom Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-slate-950/10 pointer-events-none" />

          {/* Header Badge */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="inline-flex items-center space-x-1.5 bg-rose-950/80 border border-rose-700/60 text-rose-200 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-lg">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
              <span>Raw AI Output</span>
            </span>
          </div>

          {/* Content Body: Popup Box arrives above title at the bottom */}
          <div className="relative z-10 mt-auto flex flex-col justify-end space-y-2">
            {/* Popup Issue Text Box on Hover - transparent background */}
            <div className="opacity-0 translate-y-4 scale-95 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition-all duration-300 ease-out py-1 px-0.5 text-rose-100 text-xs md:text-sm leading-relaxed drop-shadow-md">
              <span className="font-extrabold uppercase text-[10px] text-rose-300 block mb-0.5 tracking-wider">
                Raw Output Issues:
              </span>
              {item.rawText}
            </div>

            {/* Main Title placed at the bottom */}
            <h4 className="text-2xl font-bold text-white tracking-tight drop-shadow-md">
              {item.title}
            </h4>
          </div>
        </div>

        {/* BACK CARD: ENHANCED UI OUTPUT */}
        <div className="flip-card-back rounded-3xl overflow-hidden border border-emerald-500/50 bg-slate-950 flex flex-col justify-between p-6 shadow-2xl relative">
          {/* Background Image: Enhanced UI - Clean & Visible */}
          <img 
            src={item.enhancedImg} 
            alt={`${item.title} Enhanced Interface`} 
            className="absolute inset-0 w-full h-full object-cover brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          {/* Subtle Bottom Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-slate-950/10 pointer-events-none" />

          {/* Header Badge */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="inline-flex items-center space-x-1.5 bg-emerald-950/80 border border-emerald-600/60 text-emerald-200 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Enhanced UI</span>
            </span>
          </div>

          {/* Content Body: Popup Box arrives above title at the bottom */}
          <div className="relative z-10 mt-auto flex flex-col justify-end space-y-2">
            {/* Popup Refactored Text Box on Hover - transparent background */}
            <div className="opacity-0 translate-y-4 scale-95 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition-all duration-300 ease-out py-1 px-0.5 text-emerald-100 text-xs md:text-sm leading-relaxed drop-shadow-md">
              <span className="font-extrabold uppercase text-[10px] text-emerald-300 block mb-0.5 tracking-wider">
                My Refactored Enhancements:
              </span>
              {item.enhancedText}
            </div>

            {/* Main Title placed at the bottom */}
            <h4 className="text-2xl font-bold text-white tracking-tight drop-shadow-md">
              {item.title}
            </h4>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<typeof UNPUBLISHED_PROJECTS[0] | null>(null);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [interviewSubject, setInterviewSubject] = useState("Technical Interview Request - Full Stack Developer");
  const [interviewMessage, setInterviewMessage] = useState("Hi Sakshi,\n\nI am a Tech Lead looking for someone to ship full-stack features rapidly. Your portfolio caught my attention. Let's schedule a 20-minute intro call.");
  // Hero video controls
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const [videoAudioEnabled, setVideoAudioEnabled] = useState(false);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    video.muted = false;
    void video.play()
      .then(() => setVideoAudioEnabled(true))
      .catch(() => {
        // Audible autoplay is blocked by most browsers without prior interaction.
        video.muted = true;
        setVideoAudioEnabled(false);
        void video.play().catch(() => {
          // Playback remains available through the browser's media controls.
        });
      });
  }, []);

  const toggleHeroAudio = async (): Promise<void> => {
    const video = heroVideoRef.current;
    if (!video) return;

    try {
      video.muted = videoAudioEnabled;
      await video.play();
      setVideoAudioEnabled(!videoAudioEnabled);
    } catch {
      video.muted = true;
      setVideoAudioEnabled(false);
    }
  };

  useGSAP(() => {
    // Scroll progress trigger or subtle visual scroll enhancements if needed
  }, { scope: containerRef });

  // Modal Animation - Separate effect to avoid re-triggering scroll animations
  useGSAP(() => {
    if (selectedProject || showInviteModal) {
      gsap.from(".modal-content", {
        scale: 0.95,
        opacity: 0,
        duration: 0.3,
        ease: "power3.out"
      });
    }
  }, { scope: containerRef, dependencies: [selectedProject, showInviteModal] });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("sakshijangid@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const isMobileDevice = typeof window !== 'undefined' && (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    ('ontouchstart' in window && window.innerWidth <= 768)
  );

  const mailLink = isMobileDevice
    ? `https://mail.google.com/mail/?view=cm&fs=1&to=sakshijangid@gmail.com&su=${encodeURIComponent(interviewSubject)}&body=${encodeURIComponent(interviewMessage)}`
    : `mailto:sakshijangid@gmail.com?subject=${encodeURIComponent(interviewSubject)}&body=${encodeURIComponent(interviewMessage)}`;

  return (
    <div ref={containerRef} className="bg-white text-[#1A1A1A] font-sans antialiased selection:bg-[#966F33] selection:text-white">
      {/* Scroll Progress Bar */}
      <div className="scroll-progress fixed top-0 left-0 w-full h-1 bg-[#966F33] origin-left scale-x-0 z-[100]" />

      {/* Direct Interview Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md" 
            onClick={() => setShowInviteModal(false)}
          />
          <div className="modal-content relative bg-white w-full max-w-2xl overflow-y-auto rounded-3xl p-8 md:p-10 shadow-2xl border border-gray-100">
            <button 
              onClick={() => setShowInviteModal(false)}
              className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
            >
              <X size={28} />
            </button>

            <div className="flex items-center space-x-3 mb-3 text-[#581C24]">
              <Calendar size={22} />
              <span className="text-xs font-bold uppercase tracking-widest">Direct Tech Lead Invite</span>
            </div>

            <h2 className="text-3xl font-bold mb-2">Schedule a Technical Interview</h2>
            <p className="text-gray-600 text-sm mb-6">
              Skip the HR screen. Send a direct interview request straight to my inbox: <span className="font-semibold text-black">sakshijangid@gmail.com</span>.
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                  Email Subject
                </label>
                <input 
                  type="text" 
                  value={interviewSubject}
                  onChange={(e) => setInterviewSubject(e.target.value)}
                  className="w-full px-4 py-3 bg-[#FDFBF7] border border-gray-200 rounded-xl font-medium focus:outline-none focus:border-[#581C24] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                  Invite Message
                </label>
                <textarea 
                  rows={4}
                  value={interviewMessage}
                  onChange={(e) => setInterviewMessage(e.target.value)}
                  className="w-full px-4 py-3 bg-[#FDFBF7] border border-gray-200 rounded-xl font-medium focus:outline-none focus:border-[#8C2D40] text-sm resize-none"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <FlowerCTAWrapper className="flex-1">
                <a 
                  href={mailLink} 
                  target={isMobileDevice ? "_blank" : "_self"}
                  rel={isMobileDevice ? "noopener noreferrer" : undefined}
                  className="w-full bg-[#8C2D40] text-white py-4 px-6 rounded-full font-bold flex items-center justify-center space-x-2 hover:bg-[#6B1D2F] transition-all shadow-lg text-sm"
                >
                  <Send size={18} />
                  <span>Send Interview Invite</span>
                </a>
              </FlowerCTAWrapper>
              <button 
                onClick={handleCopyEmail}
                className="px-6 py-4 border-2 border-[#8C2D40] text-[#8C2D40] rounded-full font-bold hover:bg-[#8C2D40]/10 transition-all flex items-center justify-center space-x-2 text-sm"
              >
                {copiedEmail ? <Check size={18} className="text-emerald-600" /> : <Copy size={18} />}
                <span>{copiedEmail ? "Email Copied!" : "Copy Email"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Project Gallery Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10">
          <div 
            className="absolute inset-0 bg-stone-950/60 backdrop-blur-md transition-opacity" 
            onClick={() => setSelectedProject(null)}
          />
          <div className="modal-content relative bg-white/85 backdrop-blur-xl border border-white/60 w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-3xl p-8 md:p-12 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)]">
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2.5 bg-stone-100/60 hover:bg-stone-200/80 rounded-full transition-colors border border-stone-200/50 text-stone-700"
            >
              <X size={28} />
            </button>
            
            <div className="mb-8">
              <h2 className="text-4xl font-bold mb-2">{selectedProject.name}</h2>
              <p className="text-[#8C2D40] uppercase tracking-widest font-bold text-xs mb-3">Project Blueprint & Rapid Prototype</p>
              <p className="text-stone-600 text-base leading-relaxed max-w-3xl">
                {selectedProject.description || "An in-development prototype exploring high-velocity UI patterns, responsive full-stack architecture, and streamlined user experiences."}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {selectedProject.gallery.map((img, i) => (
                <div key={i} className="aspect-video rounded-2xl overflow-hidden bg-gray-100 group">
                  <img 
                    src={img} 
                    alt={`Gallery ${i}`} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <header className="fixed top-0 left-0 w-full z-50 pointer-events-none">
        <GradualBlur
          target="parent"
          position="top"
          height="6rem"
          strength={3}
          divCount={6}
          curve="ease-out"
          opacity={1}
          zIndex={10}
        />
        {/* Desktop Header Nav */}
        <nav className="hidden md:flex relative z-20 pointer-events-auto px-6 py-5 justify-between items-center text-slate-900 bg-white/75 backdrop-blur-md border-b border-slate-900/10 shadow-sm transition-all">
          <a href="#" className="flex items-center space-x-2.5 group">
            <span className="text-xl font-black tracking-tight text-[#581C24]">SAKSHI</span>
          </a>
          
          {/* Desktop Navigation Links */}
          <div className="flex space-x-8 text-sm font-semibold uppercase tracking-widest text-slate-800">
            <a href="#proof" className="hover:text-[#8C2D40] transition-colors">The Proof</a>
            <a href="#projects" className="hover:text-[#8C2D40] transition-colors">Projects</a>
            <a href="#skills" className="hover:text-[#8C2D40] transition-colors">Skills</a>
            <a href="#education" className="hover:text-[#8C2D40] transition-colors">Certifications</a>
          </div>

          {/* Desktop Header Button */}
          <FlowerCTAWrapper>
            <SpecularButton 
              onClick={() => setShowInviteModal(true)}
              size="sm"
              radius={9999}
              tint="#8C2D40"
              tintOpacity={1}
              textColor="#ffffff"
              lineColor="#ffffff"
              baseColor="#581C24"
              intensity={1.2}
              className="text-xs font-bold uppercase tracking-wider shadow-md hover:scale-105 hover:bg-[#8C2D40] transition-all"
            >
              Send Interview Invite
            </SpecularButton>
          </FlowerCTAWrapper>
        </nav>

        {/* Mobile BubbleMenu */}
        <div className="md:hidden pointer-events-auto">
          <BubbleMenu 
            logo={<span className="font-extrabold text-xs sm:text-sm tracking-tight text-[#581C24] uppercase">SAKSHI</span>}
            items={[
              {
                label: 'The Proof',
                href: '#proof',
                ariaLabel: 'The Proof',
                rotation: -4,
                hoverStyles: { bgColor: '#8C2D40', textColor: '#ffffff' }
              },
              {
                label: 'Projects',
                href: '#projects',
                ariaLabel: 'Projects',
                rotation: 4,
                hoverStyles: { bgColor: '#581C24', textColor: '#ffffff' }
              },
              {
                label: 'Skills',
                href: '#skills',
                ariaLabel: 'Skills',
                rotation: -4,
                hoverStyles: { bgColor: '#8C2D40', textColor: '#ffffff' }
              },
              {
                label: 'Certifications',
                href: '#education',
                ariaLabel: 'Certifications',
                rotation: 4,
                hoverStyles: { bgColor: '#581C24', textColor: '#ffffff' }
              },
              {
                label: 'Invite Me',
                href: '#',
                ariaLabel: 'Send Interview Invite',
                onClick: () => setShowInviteModal(true),
                rotation: -4,
                hoverStyles: { bgColor: '#8C2D40', textColor: '#ffffff' }
              }
            ]}
            menuBg="#ffffff"
            menuContentColor="#1A1A1A"
            useFixedPosition={true}
            animationDuration={0.4}
          />
        </div>
      </header>

      {/* Hero Section */}
  return (
    <section className="relative pt-40 pb-28 px-6 md:px-20 overflow-hidden bg-white">
      {/* Visual background video */}
      <video
        ref={heroVideoRef}
        src={heroVideoSrc}
        autoPlay
        playsInline
        aria-label="Sakshi portfolio background video"
        className="hero-video"
      />

      <button
        type="button"
        onClick={toggleHeroAudio}
        aria-label={videoAudioEnabled ? "Mute hero video" : "Play hero video with sound"}
        title={videoAudioEnabled ? "Mute video" : "Play video with sound"}
        className="absolute right-4 top-24 z-30 inline-flex items-center gap-2 rounded-full border border-white/60 bg-black/45 px-3 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-lg backdrop-blur-md transition hover:bg-black/70 sm:right-6 sm:top-28 sm:px-4"
      >
        {videoAudioEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
        <span className="hidden sm:inline">{videoAudioEnabled ? "Sound on" : "Play with sound"}</span>
      </button>

        {/* Tech Aesthetic Background Layer */}
        <div className="absolute inset-0 z-10 bg-grid-tech opacity-40" />
        <div className="absolute inset-0 z-11 noise" />
        <div className="absolute inset-0 z-12 vignette" />
        
        {/* Screen Corners Decoration */}
        <div className="absolute top-10 left-10 w-4 h-4 border-t-2 border-l-2 border-[#6B1D2F]/30 z-10" />
        <div className="absolute top-10 right-10 w-4 h-4 border-t-2 border-r-2 border-[#6B1D2F]/30 z-10" />
        <div className="absolute bottom-10 left-10 w-4 h-4 border-b-2 border-l-2 border-[#6B1D2F]/30 z-10" />
        <div className="absolute bottom-10 right-10 w-4 h-4 border-b-2 border-r-2 border-[#6B1D2F]/30 z-10" />

        <div className="z-20 max-w-5xl relative">
          <BlurText
            as="h1"
            text={"Hi I'm Sakshi\nAs a creative web developer and artist, I bring thoughtful visual care to reliable code that works for tech leads without breaking things."}
            delay={80}
            animateBy="words"
            direction="top"
            stepDuration={0.35}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-snug sm:leading-tight mb-8 text-[#1C1917]"
            getWordClassName={(_word, index, total) => index >= total - 5 ? 'text-[#8C2D40]' : ''}
          />

          <p className="text-lg md:text-xl text-stone-700 max-w-3xl mb-10 leading-relaxed font-normal">
            I don't just prompt AI - I understand, debug, and refine AI-generated code. Hiring me means getting full-stack feature delivery without the traditional ramp-up delay.        Let's build something good together — reach out anytime.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <FlowerCTAWrapper>
              <a 
                href="#projects" 
                className="bg-transparent text-[#581C24] border-2 border-[#581C24] px-8 py-4 rounded-full font-bold hover:bg-[#581C24] hover:text-white transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Inspect Shipped Work</span>
                <ArrowRight size={18} />
              </a>
            </FlowerCTAWrapper>
          </div>

          {/* Value Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-stone-200">
            <div className="flex items-start space-x-3">
              <Zap className="text-[#E07A5F] shrink-0 mt-1" size={20} />
              <div>
                <h4 className="font-bold text-sm text-[#1C1917]">10x Prototyping Velocity</h4>
                <p className="text-xs text-stone-600">From concept to functional code in hours, not weeks.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <ShieldCheck className="text-[#E07A5F] shrink-0 mt-1" size={20} />
              <div>
                <h4 className="font-bold text-sm text-[#1C1917]">Deep Code Auditing</h4>
                <p className="text-xs text-stone-600">Comprehending & refactoring AI output for production safety.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Terminal className="text-[#E07A5F] shrink-0 mt-1" size={20} />
              <div>
                <h4 className="font-bold text-sm text-[#1C1917]">Full-Stack Autonomy</h4>
                <p className="text-xs text-stone-600">MERN, TypeScript, REST APIs, and UI engineering.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Proof Section: 2 Subsections (UI Enhancements & Code Audit Diff) */}
      <section id="proof" className="pt-36 pb-40 px-6 md:px-20 bg-[#2B0B12] text-white relative overflow-hidden">
        {/* Top Outer Padding Gradient Ambient Overlay */}
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[#8C2D40]/35 via-[#6B1D2F]/20 to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 left-1/3 w-[600px] h-[220px] bg-gradient-to-r from-[#8C2D40]/50 via-[#E07A5F]/35 to-[#6B1D2F]/45 rounded-full blur-3xl pointer-events-none z-10" />

        {/* Bottom Outer Padding Gradient Ambient Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#8C2D40]/35 via-[#6B1D2F]/20 to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[220px] bg-gradient-to-r from-[#6B1D2F]/45 via-[#E07A5F]/35 to-[#8C2D40]/50 rounded-full blur-3xl pointer-events-none z-10" />

        {/* Top Wave Curve Divider */}
        <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none z-20 pointer-events-none -translate-y-[1px]">
          <svg 
            className="relative block w-full h-[80px] sm:h-[120px] md:h-[150px]" 
            viewBox="0 0 1440 130" 
            preserveAspectRatio="none"
          >
            <defs>
              <filter id="topProofBlur" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur stdDeviation="8" />
              </filter>
              <linearGradient id="proofTopGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8C2D40" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#E07A5F" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#6B1D2F" stopOpacity="0.85" />
              </linearGradient>
              <linearGradient id="proofTopGrad2" x1="0%" y1="0%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#E07A5F" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#8C2D40" stopOpacity="0.6" />
              </linearGradient>
              <linearGradient id="proofTopGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6B1D2F" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#3D121B" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Wave Layer Glow Blur */}
            <path 
              d="M0,0 L1440,0 L1440,110 C1200,20 960,130 720,70 C480,10 240,110 0,40 Z" 
              fill="url(#proofTopGrad1)" 
              filter="url(#topProofBlur)"
            />
            {/* Wave Layer 1 (Accent Burgundy Gradient) */}
            <path 
              d="M0,0 L1440,0 L1440,90 C1200,30 960,110 720,60 C480,10 240,90 0,30 Z" 
              fill="url(#proofTopGrad1)" 
            />
            {/* Wave Layer 2 (Warm Terracotta / Rose Gradient) */}
            <path 
              d="M0,0 L1440,0 L1440,65 C1150,120 850,20 550,85 C280,140 120,40 0,75 Z" 
              fill="url(#proofTopGrad2)" 
            />
            {/* Wave Layer 3 (Deep Rose Glow Gradient) */}
            <path 
              d="M0,0 L1440,0 L1440,30 C1100,80 800,10 450,60 C250,90 100,20 0,40 Z" 
              fill="url(#proofTopGrad3)" 
            />
            {/* Main Top Section Background Cutout (#ffffff) */}
            <path 
              d="M0,0 L1440,0 L1440,45 C1100,105 750,15 400,80 C200,115 80,45 0,55 Z" 
              fill="#ffffff"
            />
          </svg>
        </div>

        {/* Bottom Wave Curve Divider */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-20 pointer-events-none translate-y-[1px]">
          <svg 
            className="relative block w-full h-[80px] sm:h-[120px] md:h-[150px]" 
            viewBox="0 0 1440 130" 
            preserveAspectRatio="none"
          >
            <defs>
              <filter id="btmProofBlur" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur stdDeviation="8" />
              </filter>
              <linearGradient id="proofBtmGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8C2D40" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#E07A5F" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#6B1D2F" stopOpacity="0.85" />
              </linearGradient>
              <linearGradient id="proofBtmGrad2" x1="0%" y1="0%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#E07A5F" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#8C2D40" stopOpacity="0.6" />
              </linearGradient>
              <linearGradient id="proofBtmGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6B1D2F" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#3D121B" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Wave Layer Glow Blur */}
            <path 
              d="M0,130 L1440,130 L1440,20 C1200,100 960,-10 720,50 C480,110 240,10 0,70 Z" 
              fill="url(#proofBtmGrad1)" 
              filter="url(#btmProofBlur)"
            />
            {/* Wave Layer 1 (Accent Burgundy Gradient) */}
            <path 
              d="M0,130 L1440,130 L1440,30 C1200,90 960,10 720,60 C480,110 240,30 0,90 Z" 
              fill="url(#proofBtmGrad1)" 
            />
            {/* Wave Layer 2 (Warm Terracotta / Rose Gradient) */}
            <path 
              d="M0,130 L1440,130 L1440,55 C1150,5 850,100 550,35 C280,-20 120,80 0,45 Z" 
              fill="url(#proofBtmGrad2)" 
            />
            {/* Wave Layer 3 (Deep Rose Glow Gradient) */}
            <path 
              d="M0,130 L1440,130 L1440,85 C1100,40 800,110 450,50 C250,20 100,90 0,70 Z" 
              fill="url(#proofBtmGrad3)" 
            />
            {/* Main Bottom Section Background Cutout (#ffffff) */}
            <path 
              d="M0,130 L1440,130 L1440,75 C1100,15 750,105 400,40 C200,5 80,75 0,65 Z" 
              fill="#ffffff"
            />
          </svg>
        </div>

        {/* Background glow effects */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#6B1D2F]/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-rose-950/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Main Proof Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 flex justify-center text-white">
              <TrueFocus 
                sentence="AI Speed + | Human Engineering" 
                separator=" | "
                borderColor="#E07A5F" 
                glowColor="rgba(224, 122, 95, 0.5)" 
                animationDuration={0.5} 
                pauseBetweenAnimations={1} 
              />
            </h2>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed">
              Explore how I leverage AI for initial velocity while taking full control over UI craftsmanship and code safety.
            </p>
          </div>

          {/* 4 Distinct UI Enhancement Showcase 3D Flip Cards (Uiverse loud-frog-61 style) */}
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Analytics & Performance Dashboard",
                  badge: "Data Density & Hierarchy",
                  rawImg: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=1000",
                  enhancedImg: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
                  rawText: "Overcrowded chart dump with raw unformatted numbers, zero visual contrast, and unaligned metric cards.",
                  enhancedText: "Structured grid layout with distinct typographic hierarchy, clear KPI focus cards, and responsive chart containers."
                },
                {
                  title: "SaaS Billing & Pricing Engine",
                  badge: "Conversion & Micro-Interactions",
                  rawImg: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000",
                  enhancedImg: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000",
                  rawText: "Static pricing table with wrapped button labels, uncentered column heights, and raw unstyled forms.",
                  enhancedText: "Interactive billing toggle, highlighted value plan, mathematical border-radius, and seamless checkout state transitions."
                },
                {
                  title: "Mobile-First App Onboarding Flow",
                  badge: "Fluid Touch Targets & UX",
                  rawImg: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=1000",
                  enhancedImg: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1000",
                  rawText: "Desktop-first fixed width layout causing horizontal scrolling and sub-44px touch targets on mobile screens.",
                  enhancedText: "Adaptive mobile viewport layout, 48px+ touch targets, smooth slide transitions, and clear progress steppers."
                },
                {
                  title: "Dark Luxury Portfolio Interface",
                  badge: "Typography & Micro-Contrast",
                  rawImg: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1000",
                  enhancedImg: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000",
                  rawText: "Aggressive neon gradients on pure black (#000000) with poor WCAG contrast ratios and clipped text.",
                  enhancedText: "Sophisticated deep slate palette (#0F172A), balanced warm neutral highlights, and fluid display typography."
                }
              ].map((item, idx) => (
                <ProofFlipCard key={idx} item={item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section - Shipped Proof */}
      <section id="projects" className="py-32 px-6 md:px-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center space-x-4 mb-4">
            <div className="h-[1px] w-12 bg-[#6B1D2F]" />
            <span className="text-[#8C2D40] font-bold uppercase tracking-widest text-lg">Proof of Shipment</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-[#1C1917]">
            Published Projects
          </h2>
          <p className="text-stone-600 text-lg mb-16 max-w-2xl">
            Each project demonstrates functional completeness, clean architecture, and rapid deployment readiness.
          </p>

          {/* Published Projects */}
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            {[
              {
                name: "Inspirova (Artist Discovery)",
                desc: "Pinterest-style social platform for artists to discover drawing and sketching reference art with MERN stack & Masonry feed.",
                img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=1000",
                link: "https://example.com/inspirova",
                stack: ["React", "MongoDB", "Express", "Masonry"]
              },
              {
                name: "Solo Leveling System",
                desc: "Gamified learning system with an AI chatbot powered by Gemini API, dual manual/AI task scheduling, and Firebase Firestore persistence.",
                img: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=1000",
                link: "https://example.com/solo-leveling",
                stack: ["Gemini API", "Firebase", "React", "TailwindCSS"]
              },
              {
                name: "Taskify (Todo Case Study)",
                desc: "Full-stack task management web application with user authentication and persistent cloud storage, built to overcome client-side state wipe on page refresh.",
                img: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?auto=format&fit=crop&q=80&w=1000",
                link: "https://example.com/taskify",
                stack: ["React", "Firebase Firestore", "Firebase Auth", "TailwindCSS"]
              },
              {
                name: "Full-Stack E-Commerce Store",
                desc: "Custom storefront with Supabase database storage, brand identity design in Figma, and integrated UPI online payment gateway.",
                img: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1000",
                link: "https://example.com/ecommerce-store",
                stack: ["React", "Supabase", "UPI Gateway", "Figma"]
              }
            ].map((project, i) => (
              <div key={i} className="section-reveal project-card group bg-[#FDFBF7] p-6 rounded-3xl border border-stone-200/80 shadow-md hover:shadow-xl transition-all flex flex-col justify-between">
                <div>
                  <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 group/img">
                    <img 
                      src={project.img} 
                      alt={project.name} 
                      className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="bg-[#8C2D40] hover:bg-[#6B1D2F] text-white px-5 py-2.5 rounded-full font-semibold text-sm flex items-center gap-2 shadow-lg transform scale-95 group-hover/img:scale-100 transition-all duration-300"
                      >
                        <span>Visit Project</span>
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <h4 className="text-2xl font-bold text-[#1C1917]">
                      {project.name}
                    </h4>
                  </div>

                  <p className="text-stone-600 mb-6 text-sm leading-relaxed">{project.desc}</p>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-stone-200">
                  {project.stack.map((item, idx) => (
                    <span key={idx} className="text-xs font-bold uppercase tracking-wider bg-white border border-stone-200 px-3 py-1 rounded-full text-stone-800">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* In Development Prototypes */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-[#1C1917]">Prototypes & Concepts in Development</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-2 pb-4">
              {UNPUBLISHED_PROJECTS.map((project) => (
                <div 
                  key={project.id} 
                  className="relative aspect-square rounded-2xl bg-stone-100/50 border border-stone-200/80 p-1 flex items-center justify-center cursor-pointer group shadow-sm hover:shadow-md transition-all duration-300"
                  onClick={() => setSelectedProject(project)}
                >
                  <img 
                    src={project.mainImg} 
                    alt={project.name} 
                    className="prototype-hover-img w-full h-full object-cover rounded-xl" 
                    referrerPolicy="no-referrer" 
                  />
                  <div className="absolute inset-1 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center rounded-xl pointer-events-none">
                    <Plus className="text-white mb-1 drop-shadow-md" size={24} />
                    <p className="text-white text-xs font-bold uppercase tracking-widest drop-shadow-md">{project.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills & Capabilities Section */}
      <section id="skills" className="py-24 md:py-32 px-6 md:px-20 bg-white border-t border-stone-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center space-x-4 mb-4">
            <div className="h-[1px] w-12 bg-[#6B1D2F]" />
            <span className="text-[#8C2D40] font-bold uppercase tracking-widest text-lg">Capabilities</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-[#1C1917]">
            Skills & Technical Mastery
          </h2>
          <p className="text-stone-600 text-lg mb-12 max-w-2xl">
            Interactive view of soft skills and full-stack technical competencies.
          </p>

          {/* Interactive Option Wheels for Soft and Technical Skills (No inner boxed container, directly on white canvas) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-20">
            {/* Soft Skills Column (Left Edge) */}
            <div className="flex flex-col">
              <div className="flex items-center space-x-3 mb-4 pb-3 border-b border-stone-100">
                <div>
                  <h3 className="text-2xl font-bold text-[#1C1917]">Soft Skills</h3>
                  <p className="text-xs text-stone-500 font-medium uppercase tracking-wider">Scroll/drag to view</p>
                </div>
              </div>

              {/* Wheel Stage starting directly from left edge */}
              <div className="h-[380px] sm:h-[420px] md:h-[480px] w-full relative bg-transparent overflow-hidden">
                <OptionWheel
                  items={[
                    'Code Ownership',
                    'Rapid Learning',
                    'Technical Leadership',
                    'Effective Communication',
                    'Problem Solving',
                    'Creative Thinking',
                    'System Design Mindset',
                    'Critical Analysis',
                    'Client Alignment',
                    'Adaptability'
                  ]}
                  defaultSelected={2}
                  textColor="#71717a"
                  activeColor="#000000"
                  side="left"
                  fontSize={2.2}
                  spacing={1.6}
                  curve={1.2}
                  tilt={7}
                  blur={2.5}
                  fade={0.35}
                  smoothing={200}
                  inset={24}
                  loop={false}
                  draggable={true}
                />
              </div>
            </div>

            {/* Technical Skills Column (Right Edge) */}
            <div className="flex flex-col">
              <div className="flex items-center space-x-3 mb-4 pb-3 border-b border-stone-100 md:justify-end">
                <div className="md:text-right">
                  <h3 className="text-2xl font-bold text-[#1C1917]">Technical Skills</h3>
                  <p className="text-xs text-stone-500 font-medium uppercase tracking-wider">Scroll/drag to view</p>
                </div>
              </div>

              {/* Wheel Stage starting directly from right edge */}
              <div className="h-[380px] sm:h-[420px] md:h-[480px] w-full relative bg-transparent overflow-hidden">
                <OptionWheel
                  items={[
                    'JavaScript',
                    'TypeScript',
                    'React.js',
                    'Node.js & Express',
                    'TailwindCSS',
                    'System Design',
                    'REST & GraphQL APIs',
                    'Next.js',
                    'Firebase & Supabase',
                    'GSAP & Motion',
                    'Git & Github'
                  ]}
                  defaultSelected={2}
                  textColor="#71717a"
                  activeColor="#000000"
                  side="right"
                  fontSize={2.2}
                  spacing={1.6}
                  curve={1.2}
                  tilt={7}
                  blur={2.5}
                  fade={0.35}
                  smoothing={200}
                  inset={24}
                  loop={false}
                  draggable={true}
                />
              </div>
            </div>
          </div>

          {/* AI-Accelerated Workflow Section (Placed after skills lists) */}
          <div className="pt-12 border-t border-stone-200">
            <div className="flex items-center space-x-4 mb-4">
              <h3 className="text-3xl font-bold text-[#1C1917]">AI-Accelerated Workflow</h3>
            </div>
            <p className="text-stone-600 text-base md:text-lg mb-10 max-w-3xl leading-relaxed">
              How I leverage AI tooling to multiply engineering velocity while maintaining rigorous manual oversight, architectural safety, and production reliability.
            </p>

            <div className="giant-owl-container">
              {[
                { title: "Rapid AI Scaffolding", desc: "Generating boilerplate and UI components in minutes rather than hours with AI prompt engineering." },
                { title: "Code Audit & Refactoring", desc: "Manually checking type definitions, edge cases, and runtime safety across all application routes." },
                { title: "API Integration & Logic", desc: "Wiring backend routes, database models, state machines, and external web APIs cleanly." },
                { title: "Continuous Delivery", desc: "Debugging build errors instantly, verifying performance benchmarks, and deploying builds." }
              ].map((item, idx) => (
                <div key={idx} className="giant-owl-card">
                  <div>
                    <div className="title-1">{item.title}</div>
                    <div className="content">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications & Credentials */}
      <section id="education" className="py-24 bg-white border-t border-stone-100 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 md:px-20 mb-6">
          <div className="flex items-center space-x-4 mb-3">
            <div className="h-[1px] w-12 bg-[#6B1D2F]" />
            <span className="text-[#8C2D40] font-bold uppercase tracking-widest text-lg">Certifications & Credentials</span>
          </div>
          <p className="text-stone-600 text-base md:text-lg font-medium pl-16">
            You can verify these credentials via my{" "}
            <a 
              href="https://www.linkedin.com/in/sakshi-8b17732b4?utm_source=share_via&utm_content=profile&utm_medium=member_android" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#8C2D40] font-semibold underline underline-offset-4 hover:text-[#1C1917] transition-colors inline-flex items-center gap-1"
            >
              LinkedIn Profile <ExternalLink size={15} />
            </a>
          </p>
        </div>

        <div className="w-full">
          <ScrollVelocity
            velocity={35}
            numCopies={4}
            draggable={true}
            texts={[
              <div className="flex items-stretch gap-6 py-4 pr-6" key="cert-cards">
                {[
                  {
                    title: "Full Stack Web Development (MERN)",
                    desc: "Comprehensive mastery of full-stack engineering including React.js, Node.js, Express.js, MongoDB database modeling, RESTful API design, and client-server state management."
                  },
                  {
                    title: "Node.js & Backend Architecture",
                    desc: "Specialized in event loop asynchronous performance, REST API routing, runtime schema validation with Zod, database ORM integration, and server-side security checks."
                  },
                  {
                    title: "Generative AI & AI-Accelerated Development",
                    desc: "Certified in leveraging Gemini AI APIs, prompt optimization, rapid application prototyping, and rigorous line-by-line manual code auditing for production readiness."
                  },
                  {
                    title: "Professional Frontend Developer",
                    desc: "Advanced proficiency in modular React component architecture, custom hooks, TypeScript interfaces, Tailwind CSS design systems, and responsive UX optimization."
                  }
                ].map((cert, i) => (
                  <div 
                    key={i} 
                    className="w-[280px] sm:w-[350px] md:w-[380px] bg-[#FDFBF7] p-6 md:p-8 rounded-3xl border border-stone-200 shadow-sm hover:shadow-xl hover:border-[#6B1D2F]/40 transition-all flex flex-col justify-between shrink-0 group whitespace-normal text-left"
                  >
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-[#1C1917] mb-3 leading-snug">
                        {cert.title}
                      </h3>

                      <p className="text-stone-600 leading-relaxed font-medium text-xs md:text-sm">
                        {cert.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ]}
          />
        </div>
      </section>

      {/* Footer / CTA Section */}
      <footer 
        id="contact" 
        className="bg-[#120E10] text-white pt-40 sm:pt-48 md:pt-56 pb-12 px-6 md:px-20 relative overflow-hidden"
        style={{
          backgroundImage: 'url(/src/assets/Gemini_Generated_Image_uswi6luswi6luswi.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Top Wave Ambient Blur Gradient Glows */}
        <div className="absolute top-0 left-1/4 -translate-y-1/3 w-[500px] h-[180px] bg-gradient-to-r from-[#8C2D40]/60 via-[#E07A5F]/40 to-[#581C24]/60 rounded-full blur-3xl pointer-events-none z-10" />
        <div className="absolute top-10 right-10 w-[400px] h-[160px] bg-gradient-to-r from-[#6B1D2F]/50 via-[#8C2D40]/40 to-[#2B0C12]/60 rounded-full blur-3xl pointer-events-none z-10" />

        {/* Top Wave Layered Divider with Blur Gradient Effect */}
        <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none z-20 pointer-events-none -translate-y-[1px]">
          <svg 
            className="relative block w-full h-[90px] sm:h-[140px] md:h-[200px]" 
            viewBox="0 0 1440 180" 
            preserveAspectRatio="none"
          >
            <defs>
              {/* Blur Filters */}
              <filter id="softWaveBlur" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur stdDeviation="8" />
              </filter>
              <filter id="deepWaveBlur" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="14" />
              </filter>

              {/* Rich Burgundy Gradients */}
              <linearGradient id="burgundyGradGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E07A5F" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#8C2D40" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#581C24" stopOpacity="0.6" />
              </linearGradient>

              <linearGradient id="burgundyGrad1" x1="0%" y1="0%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#B8324E" />
                <stop offset="45%" stopColor="#8C2D40" />
                <stop offset="100%" stopColor="#581C24" />
              </linearGradient>

              <linearGradient id="burgundyGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8C2D40" />
                <stop offset="50%" stopColor="#6B1D2F" />
                <stop offset="100%" stopColor="#2B0C12" />
              </linearGradient>

              <linearGradient id="nearBlackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3D121B" />
                <stop offset="50%" stopColor="#2B0C12" />
                <stop offset="100%" stopColor="#120E10" />
              </linearGradient>

              <linearGradient id="topWhiteGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.95" />
              </linearGradient>
            </defs>

            {/* Ambient Blurred Glow Wave Path (Behind Main Waves) */}
            <path 
              d="M0,0 L1440,0 L1440,165 C1200,20 950,185 700,70 C450,-25 230,175 0,60 Z" 
              fill="url(#burgundyGradGlow)" 
              filter="url(#deepWaveBlur)"
            />

            {/* Soft Glow Layer (Lighter Rose-Burgundy) */}
            <path 
              d="M0,0 L1440,0 L1440,150 C1220,30 980,175 720,80 C480,-15 260,160 0,70 Z" 
              fill="url(#burgundyGrad1)" 
              fillOpacity="0.85"
            />

            {/* Blurred Edge Overlay Layer */}
            <path 
              d="M0,0 L1440,0 L1440,135 C1200,40 930,160 670,100 C410,40 210,145 0,95 Z" 
              fill="url(#burgundyGradGlow)" 
              filter="url(#softWaveBlur)"
              fillOpacity="0.7"
            />

            {/* Rich Burgundy Flow Layer */}
            <path 
              d="M0,0 L1440,0 L1440,120 C1180,170 910,25 640,125 C390,175 180,35 0,115 Z" 
              fill="url(#burgundyGrad2)" 
              fillOpacity="0.95"
            />

            {/* Dark Burgundy Wave Layer */}
            <path 
              d="M0,0 L1440,0 L1440,90 C1210,15 930,140 600,45 C340,-15 140,120 0,80 Z" 
              fill="url(#burgundyGrad3)" 
            />

            {/* Near Black Burgundy Layer */}
            <path 
              d="M0,0 L1440,0 L1440,65 C1120,130 810,10 460,95 C240,135 80,25 0,55 Z" 
              fill="url(#nearBlackGrad)"
            />

            {/* Top Cutout (White #ffffff matching section above) */}
            <path 
              d="M0,0 L1440,0 L1440,42 C1150,98 840,8 480,82 C250,118 90,18 0,32 Z" 
              fill="url(#topWhiteGrad)"
            />
          </svg>
        </div>

        {/* Dark Overlay for Background Image */}
        <div className="absolute inset-0 bg-[#120E10]/60 pointer-events-none z-5" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-16 mb-16">
            <div>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-none text-white">
                Let's work <br />
                <span className="inline-block w-full max-w-[320px] sm:max-w-[420px] h-20 md:h-28 align-middle">
                  <ParticleText
                    text="together."
                    particleSize={2.5}
                    density={3}
                    color="#8C2D40"
                    highlightColor="#E06D85"
                    scatter={140}
                    gatherDuration={1600}
                    stagger={380}
                    pointerRepel={40}
                    repelRadius={110}
                    idleDrift={0.6}
                    trigger="hover"
                    fontSize="clamp(2.8rem, 6.5vw, 4.8rem)"
                    fontWeight={800}
                    fontFamily="inherit"
                    glow
                  />
                </span>
              </h2>
              <p className="text-stone-400 text-lg mb-8 max-w-md">
                Are you a Tech Lead looking for a developer who can pick up feature requests and ship them immediately? Let's connect directly.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <FlowerCTAWrapper>
                  <SpecularButton 
                    onClick={() => setShowInviteModal(true)}
                    size="lg"
                    radius={9999}
                    tint="#581C24"
                    tintOpacity={1}
                    textColor="#ffffff"
                    lineColor="#ffffff"
                    baseColor="#3D1017"
                    intensity={1.2}
                    className="font-bold text-sm shadow-xl hover:scale-105 transition-transform"
                  >
                    <Mail size={18} />
                    <span>Send Interview Invite</span>
                  </SpecularButton>
                </FlowerCTAWrapper>
              </div>
            </div>

            <div className="flex flex-col justify-between items-start md:items-end">
              <div className="flex space-x-4 mb-8">
                <a 
                  href="https://www.linkedin.com/in/sakshi-8b17732b4?utm_source=share_via&utm_content=profile&utm_medium=member_android" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-transparent text-white border-2 border-[#8C2D40] rounded-full hover:bg-[#8C2D40] transition-all"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={24} />
                </a>
              </div>

              <div className="text-left md:text-right space-y-1">
                <p className="text-stone-300 text-sm font-medium">Sakshi</p>
                <p className="text-stone-500 text-xs tracking-widest uppercase">Full-Stack Developer</p>
                <p className="text-stone-500 text-xs tracking-widest uppercase">Faridabad, Haryana, India</p>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-stone-500 text-xs">
            <p>© {new Date().getFullYear()} Sakshi Jangid. Built for high-velocity shipping.</p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 p-4 bg-[#581C24] text-white rounded-full shadow-2xl hover:bg-[#3D1017] hover:scale-110 transition-all z-40"
        aria-label="Back to Top"
      >
        <ChevronUp size={22} />
      </button>
    </div>
  );
}

