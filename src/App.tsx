/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState, MouseEvent } from "react";
import TrueFocus from "./components/TrueFocus";
import GradualBlur from "./components/GradualBlur";
import ScrollVelocity from "./components/ScrollVelocity";
import SpecularButton from "./components/SpecularButton";
import BubbleMenu from "./components/BubbleMenu";
import BlurText from "./components/BlurText";
import OptionWheel from "./components/OptionWheel";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { 
  Mail, 
  Linkedin, 
  ExternalLink, 
  Code2, 
  Award, 
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  User,
  X,
  Plus,
  Zap,
  CheckCircle2,
  Send,
  Calendar,
  Sparkles,
  ShieldCheck,
  Terminal,
  ArrowRight,
  Copy,
  Check,
  Bug,
  Lock,
  AlertTriangle,
  Eye
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const MY_IMAGE = "https://storage.googleapis.com/aistudio-build-assets/images/portfolio_user_image.png";

const CODE_SCENARIOS = [
  {
    id: 'auth',
    title: '1. Auth & API Security',
    icon: Lock,
    summary: 'Fixing critical client-side API key leaks and missing input validation.',
    rawAi: `// ❌ Raw AI Output (Vulnerable)
import { GoogleGenAI } from "@google/genai";

// SECURITY RISK: API key exposed to browser network tab!
const ai = new GoogleGenAI({ 
  apiKey: "AIzaSyD-EXPOSED_KEY_IN_CLIENT" 
});

export async function handleUserQuery(input) {
  // Missing error handling & rate limit checks
  const res = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: input
  });
  return res.text;
}`,
    audited: `// ✅ Sakshi's Audited Code (Production Safe)
// /api/gemini/route.ts (Server-Side Proxy)
import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "Server misconfigured" }, { status: 500 });
  }

  try {
    const { prompt } = await req.json();
    if (!prompt || typeof prompt !== 'string') {
      return Response.json({ error: "Invalid prompt payload" }, { status: 400 });
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return Response.json({ result: response.text });
  } catch (err) {
    return Response.json({ error: "Upstream AI service error" }, { status: 502 });
  }
}`,
    fixes: [
      "Moved API secret from client exposure to server-side proxy route.",
      "Added strict runtime payload type validation.",
      "Implemented structured HTTP status codes & error shielding."
    ]
  },
  {
    id: 'state',
    title: '2. React State & Render Loops',
    icon: Bug,
    summary: 'Resolving infinite re-render loops and unhandled memory leaks in React hooks.',
    rawAi: `// ❌ Raw AI Output (Infinite Render Loop)
function UserDashboard({ userId }) {
  const [data, setData] = useState(null);

  // BUG: Infinite loop! Updating state inside triggers re-render,
  // which re-runs useEffect because 'data' is in the dependency array.
  useEffect(() => {
    fetch('/api/user/' + userId)
      .then(res => res.json())
      .then(res => setData(res));
  }, [data]); // Dependencies include 'data' updated inside!

  return <div>{data?.name}</div>;
}`,
    audited: `// ✅ Sakshi's Audited Code (Clean Hooks)
function UserDashboard({ userId }: { userId: string }) {
  const [data, setData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isSubscribed = true;
    const controller = new AbortController();

    async function loadData() {
      try {
        setLoading(true);
        const res = await fetch(\`/api/user/\${userId}\`, { signal: controller.signal });
        const json = await res.json();
        if (isSubscribed) setData(json);
      } catch (err: any) {
        if (err.name !== 'AbortError') console.error("Fetch failed", err);
      } finally {
        if (isSubscribed) setLoading(false);
      }
    }

    loadData();
    return () => {
      isSubscribed = false;
      controller.abort(); // Prevents memory leaks on component unmount
    };
  }, [userId]); // Stabilized dependency array

  if (loading) return <SkeletonLoader />;
  return <div>{data?.name}</div>;
}`,
    fixes: [
      "Fixed cyclic dependency triggering infinite re-render loops.",
      "Added AbortController and cancellation flag to prevent memory leaks.",
      "Integrated type-safe state interfaces and loading state UI."
    ]
  },
  {
    id: 'db',
    title: '3. DB & Query Safety',
    icon: Terminal,
    summary: 'Preventing SQL injection vulnerabilities and unindexed query bottlenecks.',
    rawAi: `// ❌ Raw AI Output (SQL Injection Risk)
app.get('/api/search', async (req, res) => {
  const query = req.query.q;
  
  // VULNERABILITY: Raw string concatenation permits SQL Injection!
  const sql = "SELECT * FROM products WHERE name LIKE '%" + query + "%'";
  const results = await db.query(sql);
  
  res.json(results);
});`,
    audited: `// ✅ Sakshi's Audited Code (Parameterized & Validated)
import { z } from 'zod';

const searchSchema = z.object({
  q: z.string().trim().min(1).max(100),
  limit: z.coerce.number().min(1).max(50).default(20)
});

app.get('/api/search', async (req, res) => {
  const parsed = searchSchema.safeParse(req.query);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.format() });
  }

  // Parameterized query via ORM prevents injection attacks
  const results = await db.products.findMany({
    where: {
      name: { contains: parsed.data.q, mode: 'insensitive' }
    },
    take: parsed.data.limit,
    select: { id: true, name: true, price: true }
  });

  res.json({ data: results });
});`,
    fixes: [
      "Replaced raw SQL string concatenation with parameterized ORM query.",
      "Added Zod schema validation to reject malicious input payloads.",
      "Added result pagination limits & field selection to optimize database load."
    ]
  }
];

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
    mainImg: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1000",
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
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [interviewSubject, setInterviewSubject] = useState("Technical Interview Request - Full Stack Developer");
  const [interviewMessage, setInterviewMessage] = useState("Hi Sakshi,\n\nI am a Tech Lead looking for someone to ship full-stack features rapidly. Your portfolio caught my attention. Let's schedule a 20-minute intro call.");

  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);

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

  const mailtoLink = `mailto:sakshijangid@gmail.com?subject=${encodeURIComponent(interviewSubject)}&body=${encodeURIComponent(interviewMessage)}`;

  return (
    <div ref={containerRef} className="bg-[#FDFBF7] text-[#1A1A1A] font-sans antialiased selection:bg-[#966F33] selection:text-white">
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

            <div className="flex items-center space-x-3 mb-3 text-[#966F33]">
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
                  className="w-full px-4 py-3 bg-[#FDFBF7] border border-gray-200 rounded-xl font-medium focus:outline-none focus:border-[#966F33] text-sm"
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
                  className="w-full px-4 py-3 bg-[#FDFBF7] border border-gray-200 rounded-xl font-medium focus:outline-none focus:border-[#966F33] text-sm resize-none"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a 
                href={mailtoLink} 
                className="flex-1 bg-[#1A1A1A] text-white py-4 px-6 rounded-2xl font-bold flex items-center justify-center space-x-2 hover:bg-[#966F33] transition-all shadow-lg text-sm"
              >
                <Send size={18} />
                <span>Send Interview Invite</span>
              </a>
              <button 
                onClick={handleCopyEmail}
                className="px-6 py-4 border border-gray-300 rounded-2xl font-bold text-gray-700 hover:bg-gray-50 transition-all flex items-center justify-center space-x-2 text-sm"
              >
                {copiedEmail ? <Check size={18} className="text-green-600" /> : <Copy size={18} />}
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
              <p className="text-gray-500 uppercase tracking-widest font-bold text-sm">Project Blueprint & Rapid Prototype</p>
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
              <h3 className="text-xl font-bold mb-4">Architecture & Development Proof</h3>
              <p className="text-gray-600 leading-relaxed">
                Designed for high velocity and production stability. Built with modular TypeScript architecture, clean REST endpoints, and responsive Tailwind UI. Rapidly iterated using AI-assisted tooling with 100% manual code comprehension and line-by-line validation.
              </p>
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
          <div className="text-xl font-extrabold tracking-tighter text-slate-900">SAKSHI JANGID</div>
          
          {/* Desktop Navigation Links */}
          <div className="flex space-x-8 text-sm font-semibold uppercase tracking-widest text-slate-800">
            <a href="#proof" className="hover:text-[#966F33] transition-colors">The Proof</a>
            <a href="#projects" className="hover:text-[#966F33] transition-colors">Projects</a>
            <a href="#skills" className="hover:text-[#966F33] transition-colors">Skills</a>
            <a href="#education" className="hover:text-[#966F33] transition-colors">Certifications</a>
          </div>

          {/* Desktop Header Button */}
          <SpecularButton 
            onClick={() => setShowInviteModal(true)}
            size="sm"
            radius={9999}
            tint="#966F33"
            tintOpacity={1}
            textColor="#ffffff"
            lineColor="#ffffff"
            baseColor="#725324"
            intensity={1.2}
            className="text-xs font-bold uppercase tracking-wider shadow-sm"
          >
            Send Interview Invite
          </SpecularButton>
        </nav>

        {/* Mobile BubbleMenu */}
        <div className="md:hidden pointer-events-auto">
          <BubbleMenu 
            logo={<span className="font-extrabold text-xs sm:text-sm tracking-tighter text-[#966F33] uppercase">SAKSHI JANGID</span>}
            items={[
              {
                label: 'The Proof',
                href: '#proof',
                ariaLabel: 'The Proof',
                rotation: -4,
                hoverStyles: { bgColor: '#966F33', textColor: '#ffffff' }
              },
              {
                label: 'Projects',
                href: '#projects',
                ariaLabel: 'Projects',
                rotation: 4,
                hoverStyles: { bgColor: '#1A1A1A', textColor: '#ffffff' }
              },
              {
                label: 'Skills',
                href: '#skills',
                ariaLabel: 'Skills',
                rotation: -4,
                hoverStyles: { bgColor: '#966F33', textColor: '#ffffff' }
              },
              {
                label: 'Certifications',
                href: '#education',
                ariaLabel: 'Certifications',
                rotation: 4,
                hoverStyles: { bgColor: '#1A1A1A', textColor: '#ffffff' }
              },
              {
                label: 'Invite Me',
                href: '#',
                ariaLabel: 'Send Interview Invite',
                onClick: () => setShowInviteModal(true),
                rotation: -4,
                hoverStyles: { bgColor: '#966F33', textColor: '#ffffff' }
              }
            ]}
            menuBg="#FDFBF7"
            menuContentColor="#1A1A1A"
            useFixedPosition={true}
            animationDuration={0.4}
          />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-40 pb-28 px-6 md:px-20 overflow-hidden bg-[#FDFBF7]">
        {/* Tech Aesthetic Background Layer */}
        <div className="absolute inset-0 z-0 bg-grid-tech opacity-40" />
        <div className="absolute inset-0 z-1 noise" />
        <div className="absolute inset-0 z-2 vignette" />
        
        {/* Screen Corners Decoration */}
        <div className="absolute top-10 left-10 w-4 h-4 border-t-2 border-l-2 border-[#966F33]/20 z-10" />
        <div className="absolute top-10 right-10 w-4 h-4 border-t-2 border-r-2 border-[#966F33]/20 z-10" />
        <div className="absolute bottom-10 left-10 w-4 h-4 border-b-2 border-l-2 border-[#966F33]/20 z-10" />
        <div className="absolute bottom-10 right-10 w-4 h-4 border-b-2 border-r-2 border-[#966F33]/20 z-10" />

        <div className="z-10 max-w-5xl relative">
          <BlurText
            as="h1"
            text="I am a full-stack developer helping Tech Leads who need to move fast without breaking things."
            delay={80}
            animateBy="words"
            direction="top"
            stepDuration={0.35}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-[1.05] mb-8 text-black"
            getWordClassName={(_word, index, total) => index >= total - 5 ? 'text-[#966F33]' : ''}
          />

          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mb-10 leading-relaxed font-normal">
            I don't just prompt AI — I understand, debug, and refine AI-generated code to deliver robust MERN applications at accelerated velocity. Hiring me means getting full-stack feature delivery without the traditional ramp-up delay.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <SpecularButton 
              onClick={() => setShowInviteModal(true)}
              size="lg"
              radius={9999}
              tint="#1A1A1A"
              tintOpacity={1}
              textColor="#ffffff"
              lineColor="#ffffff"
              baseColor="#966F33"
              intensity={1.2}
              className="font-bold shadow-xl"
            >
              <Mail size={20} />
              <span>Send Direct Interview Invite</span>
            </SpecularButton>
            <a 
              href="#projects" 
              className="border border-[#1A1A1A] px-8 py-4 rounded-full font-bold hover:bg-[#1A1A1A] hover:text-white transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Inspect Shipped Work</span>
              <ArrowRight size={18} />
            </a>
          </div>

          {/* Value Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200/60">
            <div className="flex items-start space-x-3">
              <Zap className="text-[#966F33] shrink-0 mt-1" size={20} />
              <div>
                <h4 className="font-bold text-sm text-black">10x Prototyping Velocity</h4>
                <p className="text-xs text-gray-600">From concept to functional code in hours, not weeks.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <ShieldCheck className="text-[#966F33] shrink-0 mt-1" size={20} />
              <div>
                <h4 className="font-bold text-sm text-black">Deep Code Auditing</h4>
                <p className="text-xs text-gray-600">Comprehending & refactoring AI output for production safety.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Terminal className="text-[#966F33] shrink-0 mt-1" size={20} />
              <div>
                <h4 className="font-bold text-sm text-black">Full-Stack Autonomy</h4>
                <p className="text-xs text-gray-600">MERN, TypeScript, REST APIs, and UI engineering.</p>
              </div>
            </div>
          </div>
        </div>


      </section>

      {/* The Proof Section: 2 Subsections (UI Enhancements & Code Audit Diff) */}
      <section id="proof" className="py-24 px-6 md:px-20 bg-[#0F172A] text-white border-y border-gray-800 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#966F33]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Main Proof Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 flex justify-center text-white">
              <TrueFocus 
                sentence="AI Speed + | Human Engineering" 
                separator=" | "
                borderColor="#966F33" 
                glowColor="rgba(150, 111, 51, 0.6)" 
                animationDuration={0.5} 
                pauseBetweenAnimations={1} 
              />
            </h2>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed">
              Explore how I leverage AI for initial velocity while taking full control over UI craftsmanship and code safety.
            </p>
          </div>

          {/* SUBSECTION 1: UI & LAYOUT ENHANCEMENTS */}
          <div className="mb-24 pb-16 border-b border-slate-800">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h3 className="text-2xl md:text-4xl font-bold tracking-tight text-white mb-3">
                UI & Layout Enhancements
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Transforming unaligned raw AI wireframes into polished, responsive, production-ready interfaces.
              </p>
            </div>

            {/* 4 Distinct UI Enhancement Showcase Solo Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Analytics & Performance Dashboard",
                  badge: "Data Density & Clean Hierarchy",
                  img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
                  rawAi: "Overcrowded chart dump with raw unformatted numbers, zero visual contrast, and unaligned metric cards.",
                  sakshiRefactor: "Structured grid layout with distinct typographic hierarchy, clear KPI focus cards, and responsive chart containers."
                },
                {
                  title: "SaaS Billing & Pricing Engine",
                  badge: "Conversion & Micro-Interactions",
                  img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000",
                  rawAi: "Static pricing table with wrapped button labels and rigid uncentered column heights.",
                  sakshiRefactor: "Interactive billing toggle, highlighted value plan, mathematical border-radius, and seamless checkout state transitions."
                },
                {
                  title: "Mobile-First App Onboarding Flow",
                  badge: "Fluid Touch Targets & UX",
                  img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1000",
                  rawAi: "Desktop-first fixed width layout causing horizontal scrolling and sub-44px touch targets on mobile screens.",
                  sakshiRefactor: "Adaptive mobile viewport layout, 48px+ touch targets, smooth slide transitions, and clear progress steppers."
                },
                {
                  title: "Dark Luxury Portfolio Interface",
                  badge: "Typography & Micro-Contrast",
                  img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000",
                  rawAi: "Aggressive neon gradients on pure black (#000000) with poor WCAG contrast ratios and clipped text.",
                  sakshiRefactor: "Sophisticated deep slate palette (#0F172A), balanced warm neutral highlights, and fluid display typography."
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 overflow-hidden hover:border-[#966F33]/60 transition-all duration-300 group shadow-lg">
                  <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 border border-slate-800">
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[#E5C185] px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider">
                      {item.badge}
                    </div>
                  </div>

                  <h4 className="text-xl font-bold text-white mb-4">{item.title}</h4>

                  <div className="space-y-3 font-sans text-xs">
                    <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-900/60 text-rose-200">
                      <span className="font-bold uppercase text-[10px] text-rose-400 block mb-0.5">Raw AI Draft UI:</span>
                      {item.rawAi}
                    </div>
                    <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-900/60 text-emerald-200">
                      <span className="font-bold uppercase text-[10px] text-emerald-400 block mb-0.5">My Enhanced UI:</span>
                      {item.sakshiRefactor}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SUBSECTION 2: RAW CODE VS AUDITED CODE DIFF VIEWER */}
          <div>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h3 className="text-2xl md:text-4xl font-bold tracking-tight text-white mb-3">
                Raw AI Code vs. My Audited Code
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Interactive code diff inspector comparing raw AI drafts against production-safe TypeScript refactors.
              </p>
            </div>

            {/* Scenario Selection Tabs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {CODE_SCENARIOS.map((scenario, idx) => {
                const Icon = scenario.icon;
                const isActive = activeScenarioIdx === idx;
                return (
                  <button
                    key={scenario.id}
                    onClick={() => setActiveScenarioIdx(idx)}
                    className={`p-5 rounded-2xl text-left border transition-all duration-300 flex flex-col justify-between ${
                      isActive
                        ? "bg-slate-800 border-[#966F33] ring-2 ring-[#966F33]/30 shadow-xl"
                        : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50"
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`p-2 rounded-lg ${isActive ? "bg-[#966F33] text-white" : "bg-slate-800 text-gray-400"}`}>
                        <Icon size={18} />
                      </div>
                      <h4 className={`font-bold text-sm ${isActive ? "text-white" : "text-gray-300"}`}>
                        {scenario.title}
                      </h4>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {scenario.summary}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Code Viewer Container */}
            <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl mb-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
                {/* Raw AI Panel */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                      <span className="text-xs font-mono font-bold uppercase text-rose-400 tracking-wider">
                        Unfiltered Raw AI Output
                      </span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-950/80 border border-rose-800 text-rose-300 text-[10px] font-mono uppercase font-semibold">
                      Needs Audit
                    </span>
                  </div>
                  <pre className="font-mono text-xs text-rose-200/90 leading-relaxed overflow-x-auto p-4 bg-slate-900/80 rounded-xl border border-rose-950">
                    <code>{CODE_SCENARIOS[activeScenarioIdx].rawAi}</code>
                  </pre>
                </div>

                {/* Audited Code Panel */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                      <span className="text-xs font-mono font-bold uppercase text-emerald-400 tracking-wider">
                        Sakshi's Audited Production Refactor
                      </span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-[10px] font-mono uppercase font-semibold">
                      Production Ready
                    </span>
                  </div>
                  <pre className="font-mono text-xs text-emerald-200/90 leading-relaxed overflow-x-auto p-4 bg-slate-900/80 rounded-xl border border-emerald-950">
                    <code>{CODE_SCENARIOS[activeScenarioIdx].audited}</code>
                  </pre>
                </div>
              </div>
            </div>

            {/* Key Improvements Breakdown */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8">
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#E5C185] mb-4 flex items-center">
                <Zap size={16} className="mr-2 text-[#966F33]" />
                Architectural Enhancements Applied in Scenario #{activeScenarioIdx + 1}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {CODE_SCENARIOS[activeScenarioIdx].fixes.map((fix, idx) => (
                  <div key={idx} className="flex items-start space-x-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-gray-300 leading-relaxed">{fix}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-left">
                  <p className="text-xs text-gray-400 font-mono">
                    PRODUCING FAST RESULTS + MAINTAINING HIGH STANDARDS = STARTUP SUCCESS
                  </p>
                </div>
                <SpecularButton
                  onClick={() => setShowInviteModal(true)}
                  size="md"
                  radius={9999}
                  tint="#966F33"
                  tintOpacity={1}
                  textColor="#ffffff"
                  lineColor="#ffffff"
                  baseColor="#725324"
                  intensity={1.2}
                  className="text-xs font-bold uppercase tracking-wider shadow-lg shrink-0"
                >
                  <Mail size={16} />
                  <span>Invite to Technical Interview</span>
                </SpecularButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section - Shipped Proof */}
      <section id="projects" className="py-32 px-6 md:px-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center space-x-4 mb-4">
            <div className="h-[1px] w-12 bg-[#966F33]" />
            <span className="text-[#966F33] font-bold uppercase tracking-widest text-lg">Proof of Shipment</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Published Projects
          </h2>
          <p className="text-gray-600 text-lg mb-16 max-w-2xl">
            Each project demonstrates functional completeness, clean architecture, and rapid deployment readiness.
          </p>

          {/* Published Projects */}
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            {[
              {
                name: "Eco-Commerce Platform",
                desc: "A full-featured MERN stack e-commerce application with Stripe payment processing, admin state dashboard, and RESTful product API.",
                img: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1000",
                link: "/projects/eco-commerce",
                velocity: "Shipped in 48 hrs",
                stack: ["React", "Node.js", "Express", "MongoDB", "Stripe"]
              },
              {
                name: "TaskFlow Pro",
                desc: "Real-time collaborative project management workspace built with React, Socket.io, and Node.js for instant team synchronization.",
                img: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?auto=format&fit=crop&q=80&w=1000",
                link: "/projects/taskflow",
                velocity: "Shipped in 36 hrs",
                stack: ["React", "Socket.io", "Node.js", "TailwindCSS"]
              },
              {
                name: "Nexus Social Media",
                desc: "Full-stack social networking application with user authentication, media upload, feed generation, and responsive UI.",
                img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1000",
                link: "/projects/nexus",
                velocity: "Shipped in 3 days",
                stack: ["React", "Express.js", "MongoDB", "JWT Auth"]
              },
              {
                name: "Zenith Portfolio & Workspace",
                desc: "High-performance creative portfolio engine built with GSAP scroll animations, clean layouts, and responsive components.",
                img: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1000",
                link: "/projects/zenith",
                velocity: "Shipped in 24 hrs",
                stack: ["React", "TypeScript", "GSAP", "Tailwind"]
              }
            ].map((project, i) => (
              <div key={i} className="section-reveal project-card group bg-[#FDFBF7] p-6 rounded-3xl border border-gray-200/80 shadow-md hover:shadow-xl transition-all">
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-6">
                  <img 
                    src={project.img} 
                    alt={project.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                    <Zap size={12} className="text-[#966F33]" />
                    <span>{project.velocity}</span>
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <a href={project.link} className="bg-white text-black p-4 rounded-full hover:bg-[#966F33] hover:text-white transition-colors">
                      <ExternalLink size={24} />
                    </a>
                  </div>
                </div>
                <h4 className="text-2xl font-bold mb-2">{project.name}</h4>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">{project.desc}</p>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
                  {project.stack.map((item, idx) => (
                    <span key={idx} className="text-xs font-bold uppercase tracking-wider bg-white border border-gray-200 px-3 py-1 rounded-full text-gray-800">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* In Development Prototypes */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Prototypes & Concepts in Development</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {UNPUBLISHED_PROJECTS.map((project) => (
                <div 
                  key={project.id} 
                  className="relative aspect-square rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer group shadow-sm hover:shadow-lg"
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

      {/* Skills & Capabilities Section */}
      <section id="skills" className="py-24 md:py-32 px-6 md:px-20 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center space-x-4 mb-4">
            <div className="h-[1px] w-12 bg-[#966F33]" />
            <span className="text-[#966F33] font-bold uppercase tracking-widest text-lg">Capabilities</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-black">
            Skills & Technical Mastery
          </h2>
          <p className="text-gray-600 text-lg mb-12 max-w-2xl">
            Interactive view of soft skills and full-stack technical competencies.
          </p>

          {/* Interactive Option Wheels for Soft and Technical Skills (No inner boxed container, directly on white canvas) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-20">
            {/* Soft Skills Column (Left Edge) */}
            <div className="flex flex-col">
              <div className="flex items-center space-x-3 mb-4 pb-3 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-[#966F33]/10 flex items-center justify-center text-[#966F33]">
                  <User size={22} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-black">Soft Skills</h3>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Scroll or drag left wheel</p>
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
                    'Agile Collaboration',
                    'System Design Mindset',
                    'Critical Analysis',
                    'Client Alignment',
                    'Adaptability & Velocity'
                  ]}
                  defaultSelected={2}
                  textColor="#71717a"
                  activeColor="#000000"
                  side="left"
                  fontSize={1.6}
                  spacing={1.8}
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
              <div className="flex items-center space-x-3 mb-4 pb-3 border-b border-gray-100 md:justify-end">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
                  <Code2 size={22} />
                </div>
                <div className="md:text-right">
                  <h3 className="text-2xl font-bold text-black">Technical Skills</h3>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Scroll or drag right wheel</p>
                </div>
              </div>

              {/* Wheel Stage starting directly from right edge */}
              <div className="h-[380px] sm:h-[420px] md:h-[480px] w-full relative bg-transparent overflow-hidden">
                <OptionWheel
                  items={[
                    'JavaScript (ES6+)',
                    'TypeScript',
                    'React.js & Hooks',
                    'Node.js & Express',
                    'MongoDB & Mongoose',
                    'TailwindCSS',
                    'REST & GraphQL APIs',
                    'Next.js',
                    'Firebase & Auth',
                    'GSAP & Motion',
                    'Git & CI/CD Pipelines'
                  ]}
                  defaultSelected={2}
                  textColor="#71717a"
                  activeColor="#000000"
                  side="right"
                  fontSize={1.6}
                  spacing={1.8}
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
          <div className="pt-12 border-t border-gray-200">
            <div className="flex items-center space-x-4 mb-4">
              <Zap className="text-[#966F33]" size={32} />
              <h3 className="text-3xl font-bold text-black">AI-Accelerated Workflow</h3>
            </div>
            <p className="text-gray-600 text-base md:text-lg mb-10 max-w-3xl leading-relaxed">
              How I leverage AI tooling to multiply engineering velocity while maintaining rigorous manual oversight, architectural safety, and production reliability.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Rapid AI Scaffolding", desc: "Generating boilerplate and UI components in minutes rather than hours." },
                { title: "Code Audit & Refactoring", desc: "Manually checking type definitions, edge cases, and runtime safety." },
                { title: "API Integration & Logic", desc: "Wiring backend routes, database models, and external integrations." },
                { title: "Continuous Delivery", desc: "Debugging build errors instantly and deploying production builds." }
              ].map((item, idx) => (
                <div key={idx} className="bg-[#FDFBF7] p-6 rounded-2xl border border-gray-200/80 hover:border-[#966F33]/40 transition-all shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-[#966F33]/10 text-[#966F33] flex items-center justify-center font-bold text-sm mb-4">
                    0{idx + 1}
                  </div>
                  <h4 className="font-bold text-black text-base mb-2">{item.title}</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications & Credentials */}
      <section id="education" className="py-24 bg-white border-t border-gray-100 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 md:px-20 mb-6">
          <div className="flex items-center space-x-4 mb-3">
            <div className="h-[1px] w-12 bg-[#966F33]" />
            <span className="text-[#966F33] font-bold uppercase tracking-widest text-lg">Certifications & Credentials</span>
          </div>
          <p className="text-gray-600 text-base md:text-lg font-medium pl-16">
            You can verify these credentials via my{" "}
            <a 
              href="https://www.linkedin.com/in/sakshi-8b17732b4?utm_source=share_via&utm_content=profile&utm_medium=member_android" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#966F33] font-semibold underline underline-offset-4 hover:text-black transition-colors inline-flex items-center gap-1"
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
                    className="w-[280px] sm:w-[350px] md:w-[380px] bg-[#FDFBF7] p-6 md:p-8 rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-[#966F33]/40 transition-all flex flex-col justify-between shrink-0 group whitespace-normal text-left"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className="p-3 bg-[#966F33]/10 text-[#966F33] rounded-2xl group-hover:bg-[#966F33] group-hover:text-white transition-colors">
                          <Award size={24} />
                        </div>
                      </div>

                      <h3 className="text-lg md:text-xl font-bold text-black mb-3 leading-snug">
                        {cert.title}
                      </h3>

                      <p className="text-gray-600 leading-relaxed font-medium text-xs md:text-sm">
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
      <footer id="contact" className="bg-[#1A1A1A] text-white pt-28 pb-12 px-6 md:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 mb-16">
            <div>
              <div className="inline-flex items-center space-x-2 text-[#966F33] mb-4">
                <Zap size={20} />
                <span className="text-xs font-bold uppercase tracking-widest">Ready to Ship ? </span>
              </div>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-none">
                Let's work <br /> <span className="text-[#966F33]">together.</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-md">
                Are you a Tech Lead looking for a developer who can pick up feature requests and ship them immediately? Let's connect directly.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <SpecularButton 
                  onClick={() => setShowInviteModal(true)}
                  size="lg"
                  radius={9999}
                  tint="#966F33"
                  tintOpacity={1}
                  textColor="#ffffff"
                  lineColor="#ffffff"
                  baseColor="#725324"
                  intensity={1.2}
                  className="font-bold text-sm shadow-xl"
                >
                  <Mail size={18} />
                  <span>Send Interview Invite</span>
                </SpecularButton>
                <a 
                  href="mailto:sakshijangid@gmail.com" 
                  className="border border-white/20 px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all flex items-center justify-center space-x-2 text-sm"
                >
                  <span>sakshijangid@gmail.com</span>
                </a>
              </div>
            </div>

            <div className="flex flex-col justify-between items-start md:items-end">
              <div className="flex space-x-4 mb-8">
                <a 
                  href="https://www.linkedin.com/in/sakshi-8b17732b4?utm_source=share_via&utm_content=profile&utm_medium=member_android" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-white/10 rounded-full hover:bg-[#966F33] transition-all"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={24} />
                </a>
              </div>

              <div className="text-left md:text-right space-y-1">
                <p className="text-gray-400 text-sm font-medium">Sakshi</p>
                <p className="text-gray-500 text-xs tracking-widest uppercase">Full-Stack Developer</p>
                <p className="text-gray-500 text-xs tracking-widest uppercase">Faridabad, Haryana, India</p>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs">
            <p>© {new Date().getFullYear()} Sakshi Jangid. Built for high-velocity shipping.</p>
            <p className="mt-2 md:mt-0">Proving one thing: Full-stack feature delivery at startup speed.</p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 p-4 bg-[#966F33] text-white rounded-full shadow-2xl hover:scale-110 transition-all z-40"
        aria-label="Back to Top"
      >
        <ChevronUp size={22} />
      </button>
    </div>
  );
}

