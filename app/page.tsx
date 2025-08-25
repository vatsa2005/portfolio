"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { useGsapScrollAnimations } from "@/hooks/use-gsap-scroll";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CometCard } from "@/components/ui/comet-card";
import DraggableCardDemo from "@/components/ui/draggable-card-demo";
import FaultyTerminal from "@/components/ui/FaultyTerminal";
import ExpandableCardDemo from "@/components/ui/expandable-card-demo-grid";
import { Tabs } from "@/components/ui/tabs";
import GooeyNav from "@/components/ui/gooey-nav";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  ExternalLink,
  Download,
  Menu,
  X,
  Code,
  Database,
  Smartphone,
  Globe,
  Blocks,
} from "lucide-react";
import XLogo from "@/components/ui/x-logo";

type ProjectItem = {
  title: string;
  description: string;
  summary?: string;
  tech?: string[];
  image: string;
  githubUrl?: string;
  visitUrl?: string;
  category?: "frontend" | "backend" | "fullstack" | "blockchain";
};

function FeaturedProjectsTabs({ projects }: { projects: ProjectItem[] }) {
  // Filter strictly by declared category
  const byCategory = {
    frontend: projects.filter((p) => p.category === "frontend"),
    fullstack: projects.filter((p) => p.category === "fullstack"),
    blockchain: projects.filter((p) => p.category === "blockchain"),
    backend: projects.filter((p) => p.category === "backend"),
  } as const;

  const toCardItems = (arr: ProjectItem[]) =>
    arr.map((p) => ({
      title: p.title,
      src: p.image,
      description: p.description,
      summary: p.summary,
      githubUrl: p.githubUrl,
      visitUrl: p.visitUrl,
      tech: p.tech,
    }));

  // Define tab order and only include non-empty categories
  const ordered = [
    { title: "Frontend", value: "frontend", items: byCategory.frontend },
    { title: "Fullstack", value: "fullstack", items: byCategory.fullstack },
    { title: "Blockchain", value: "blockchain", items: byCategory.blockchain },
    { title: "Backend", value: "backend", items: byCategory.backend },
  ];

  const tabs = ordered
    .filter((c) => c.items.length > 0)
    .map((c) => ({
      title: c.title,
      value: c.value,
      content: (
        <div className="h-full py-4 z-10">
          <ExpandableCardDemo items={toCardItems(c.items)} />
        </div>
      ),
    }));

  return (
    <div className="h-[28rem] sm:h-[32rem] md:h-[40rem] lg:h-[44rem] relative flex flex-col">
      <Tabs
        tabs={tabs as any}
        containerClassName="w-full overflow-x-auto flex flex-row gap-2 rounded-lg p-1"
        tabClassName="text-slate-300 whitespace-nowrap hover:text-white hover:bg-white/5"
        activeTabClassName="bg-indigo-500/15 ring-1 ring-indigo-500/30"
        contentClassName="h-full mt-4"
      />
    </div>
  );
}

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const isProgrammaticScroll = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    let ticking = false;
    const sections = [
      "home",
      "about",
      "experience",
      "skills",
      "services",
      "interactive",
      "projects",
      "resume",
      "contact",
    ];

    const handleScroll = () => {
      if (isProgrammaticScroll.current) return; // ignore while programmatic scroll in progress
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollPosition = window.scrollY + 120;
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            const offsetTop = window.scrollY + rect.top;
            const offsetHeight = rect.height;

            if (
              scrollPosition >= offsetTop &&
              scrollPosition < offsetTop + offsetHeight
            ) {
              setActiveSection(section);
              break;
            }
          }
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll as any);
  }, []);

  // Use GSAP ScrollTrigger for smooth, replayable animations
  useGsapScrollAnimations();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      isProgrammaticScroll.current = true;
      element.scrollIntoView({ behavior: "smooth" });
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      // Fallback timeout in case 'scrollend' not supported
      scrollTimeoutRef.current = setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 900);
    }
    setIsMenuOpen(false);
  };

  // Use scrollend event when available to re-enable updates precisely
  useEffect(() => {
    const endHandler = () => {
      isProgrammaticScroll.current = false;
    };
    window.addEventListener("scrollend", endHandler as any, { passive: true });
    return () => window.removeEventListener("scrollend", endHandler as any);
  }, []);

  const skills = {
    languages: [
      "JavaScript",
      "TypeScript",
      "C++",
      "Python",
      "Java",
      "Solidity",
    ],
    frameworks: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "TanStack",
      "Node.js",
      "Express.js",
    ],
    tools: [
      "Postman",
      "MySQL",
      "PostgreSQL",
      "Google Cloud Platform",
      "Redis",
      "Blockchain",
      "Machine Learning",
    ],
  };

  const projects: ProjectItem[] = [
    {
      title: "Texus Website",
      description:
        "Designed and developed the frontend for my college fest website with a GTA VI–inspired neon theme, blending modern design with immersive visuals. Implemented smooth animations and transitions to deliver a lively, interactive experience.",
      summary: "A dynamic fest website with immersive UI.",
      tech: [
        "Next.js",
        "Tailwind CSS",
        "TypeScript",
        "Framer Motion",
        "GSAP",
        "Supabase",
      ],
      image: "texus-25-img.png",
      category: "frontend",
      githubUrl: undefined,
      visitUrl: "https://texus.io",
    },
    {
      title: "Adrena",
      description:
        "Built a modern and minimalist landing page for Adrena, a product launch campaign. The page featured a clean, responsive design optimized for all devices, ensuring a strong first impression and effective product pre-launch branding.",
      summary: "Developed a sleek and responsive ‘Coming Soon’ landing page.",
      tech: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn"],
      image: "adrena-img.png",
      category: "frontend",
      githubUrl: undefined,
      visitUrl: "https://adrena-seven.vercel.app",
    },
    {
      title: "CareerForge",
      description:
        "Careerforge is a web platform built for a financial education company to establish a strong digital presence. The site delivers a responsive and modern interface with clean layouts. The result is a lightweight, fast, and engaging platform tailored for financial learning services.",
      summary:
        "A modern web platform for a financial education company with smooth animations and a professional UI.",
      tech: [
        "Next.js",
        "Tailwind CSS",
        "TypeScript",
        "Shadcn",
        "Framer Motion",
      ],
      image: "careerforge-img.png",
      category: "frontend",
      githubUrl: "https://github.com/vatsa2005/career-forge",
    },
    {
      title: "Hackverse25",
      description:
        "Hackverse’25 is the official website for a large-scale hackathon, designed to deliver an engaging and informative experience for participants and sponsors. The site includes sections for event details, schedules, sponsor highlights, and registration, crafted with a focus on usability and modern UI design.",
      summary: "Hackverse’25, a modern and engaging hackathon website",
      tech: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn"],
      image: "hackverse25-img.png",
      category: "frontend",
      githubUrl: undefined,
      visitUrl: "https://hackverse.texus.io",
    },
    {
      title: "Weather Dashboard",
      description: "A Weather Dashboard",
      summary: "Weather Dashboard",
      tech: ["React.js", "CSS", "JavaScript", "WeatherAPI"],
      image: "wd-img.png",
      category: "frontend",
      githubUrl: "https://github.com/vatsa2005/weather-dashboard",
      visitUrl: "https://weather-dashboard-gilt.vercel.app",
    },
    {
      title: "Vintage Vault",
      description:
        "Vintage Vault is a community-driven platform designed for philatelists to connect, showcase, and manage their stamp collections in a modern digital environment. The backend is powered by Firebase. It offers a responsive and intuitive interface, enabling collectors to explore, share, and preserve their passion for stamps seamlessly online. Even adding NFT's were planned.",
      summary:
        "A digital community platform for philatelists to showcase, organize, and trade their stamp collections.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Firebase", "NFT"],
      image: "/vintage-vault-img.png",
      category: "fullstack",
      githubUrl: "https://github.com/vatsa2005/vintage-vault",
      visitUrl: "https://vintage-vault-alpha.vercel.app",
    },
    {
      title: "Dairy Management System",
      description:
        "Designed and developed the frontend for a dairy management system with a user-friendly interface, enabling efficient tracking of milk production, inventory, and sales.",
      summary: "A comprehensive dairy management solution with intuitive UI.",
      tech: [
        "Next.js",
        "Tailwind CSS",
        "TypeScript",
        "Framer Motion",
        "PostgreSQL",
      ],
      image: "dms-img.png",
      category: "fullstack",
      githubUrl: undefined,
      visitUrl: undefined,
    },
    {
      title: "Ledgerbooks",
      description:
        "LedgerBooks is a blockchain-based transaction tracking platform designed for transparent and reliable financial record-keeping. I worked on integrating the frontend with the backend by connecting the MySQL database (migrated from Cassandra) to efficiently store transaction details. Data was fetched periodically from TronScan and EtherScan APIs and updated in the database for accurate, real-time insights.",
      summary:
        "Blockchain transaction tracker for transparent and efficient financial record management.",
      tech: [
        "React.js",
        "Tailwind CSS",
        "JavaScript",
        "Cassandra",
        "MySQL",
        "REST API's",
      ],
      image: "ledgerbooks-img.png",
      category: "fullstack",
      githubUrl: "https://github.com/vatsa2005/ledgerbook",
      visitUrl: undefined,
    },
    {
      title: "Texus Website",
      description:
        "Designed and developed the frontend for my college fest website with a GTA VI–inspired neon theme, blending modern design with immersive visuals. Implemented smooth animations and transitions to deliver a lively, interactive experience.",
      summary: "A dynamic fest website with immersive UI.",
      tech: [
        "Next.js",
        "Tailwind CSS",
        "TypeScript",
        "Framer Motion",
        "GSAP",
        "Supabase",
      ],
      image: "texus-25-img.png",
      category: "fullstack",
      githubUrl: undefined,
      visitUrl: "https://texus.io",
    },
    {
      title: "XO",
      description:
        "Developed an interactive XO game with an added Blitz mode to make gameplay fast-paced and engaging. User authentication was integrated via Firebase Auth to allow secure logins and personalized gameplay. The game was deployed on Firebase Hosting, ensuring scalability and smooth performance. This project demonstrates my ability to combine classic game mechanics with modern web technologies for a fun, real-time multiplayer experience.",
      summary: "XO (Tic-Tac-Toe) game with a unique Blitz twist.",
      tech: ["React", "CSS", "JavaScript", "Firebase"],
      image: "xo-img.png",
      category: "fullstack",
      githubUrl: "https://github.com/vatsa2005/xo",
      visitUrl: "https://xo-game-d49d8.web.app/",
    },
    {
      title: "Petiti-On",
      description:
        "Petiti-On is a decentralized petition platform built on blockchain principles, enabling users to create, sign, and track petitions with full transparency and immutability. The platform leverages DAO mechanisms to give the community a voice in governance while ensuring petitions cannot be tampered with or manipulated.",
      summary: "A Petition Platform.",
      tech: [
        "Next.js",
        "Tailwind CSS",
        "TypeScript",
        "Framer Motion",
        "Hardhat",
        "Ethers.js",
        "Solidity",
      ],
      image: "petition-img.png",
      category: "blockchain",
      githubUrl: "https://github.com/vatsa2005/defy25",
      visitUrl: undefined,
    },
    {
      title: "Metapass",
      description:
        "Metapass is a decentralized identity platform that replaces traditional offline passports with NFT-based digital passports. Each passport is minted as a unique NFT on the blockchain, ensuring authenticity, security, and immutability.",
      summary: "Platform for issuing tamper-proof digital passports as NFTs",
      tech: [
        "Next.js",
        "Tailwind CSS",
        "TypeScript",
        "Framer Motion",
        "Hardhat",
        "Ethers.js",
        "Solidity",
      ],
      image: "metapass-img.png",
      category: "blockchain",
      githubUrl: "https://github.com/vatsa2005/Metapass",
      visitUrl: undefined,
    },
  ];

  const experiences = [
    {
      company: "CareerForge",
      role: "Frontend Developer",
      period: "Feb 2025 - Mar 2025",
      description:
        "Built responsive portfolio site using Next.js, TypeScript, Tailwind CSS, and Framer Motion.",
    },
    {
      company: "LedgerBooks",
      role: "Full Stack Developer",
      period: "Dec 2024 - Feb 2025",
      description:
        "Built blockchain monitoring tool, implemented REST APIs, used MySQL and TanStack Table.",
    },
  ];

  const services = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Full Stack Development",
      description:
        "End-to-end web application development with modern technologies",
    },
    {
      icon: <Blocks className="w-8 h-8" />,
      title: "Blockchain Solutions",
      description:
        "Smart contract development and blockchain integration services",
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Frontend Development",
      description:
        "Responsive and interactive user interfaces with modern frameworks",
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Backend Development",
      description: "API's for web applications with modern technologies",
    },
  ];

  // Featured Projects tabs are now a stable component to prevent remount on scroll

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-white">
      {/* Navigation Bar (Gooey) */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-slate-950/40 backdrop-blur-md border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 h-[72px] md:py-3 md:h-auto flex items-center justify-between gap-4">
          <a
            href="#home"
            className="text-accent text-xl font-semibold tracking-wide whitespace-nowrap"
          >
            Srivatsa S
          </a>
          <div className="hidden md:block">
            <GooeyNav
              items={[
                { label: "Home", href: "#home" },
                { label: "About", href: "#about" },
                { label: "Experience", href: "#experience" },
                { label: "Skills", href: "#skills" },
                { label: "Services", href: "#services" },
                { label: "Interactive", href: "#interactive" },
                { label: "Projects", href: "#projects" },
                { label: "Resume", href: "#resume" },
                { label: "Contact", href: "#contact" },
              ]}
              onNavigate={(href) => {
                const id = href.replace("#", "");
                scrollToSection(id);
              }}
              controlledActiveIndex={[
                "home",
                "about",
                "experience",
                "skills",
                "services",
                "interactive",
                "projects",
                "resume",
                "contact",
              ].indexOf(activeSection)}
            />
          </div>
          {/* Mobile hamburger menu */}
          <div className="md:hidden flex-1 flex justify-end">
            <button
              onClick={() => setIsMenuOpen((o) => !o)}
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
              className="inline-flex items-center justify-center rounded-md p-2 text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 transition"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <div
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm md:hidden"
            />
            {/* Panel */}
            <div className="md:hidden fixed top-[60px] right-4 z-50 w-56 origin-top-right rounded-2xl bg-slate-900/90 backdrop-blur-xl ring-1 ring-white/10 shadow-xl p-4 animate-in fade-in slide-in-from-top-2">
              <ul className="flex flex-col gap-1 text-sm">
                {[
                  { id: "home", label: "Home" },
                  { id: "about", label: "About" },
                  { id: "experience", label: "Experience" },
                  { id: "skills", label: "Skills" },
                  { id: "services", label: "Services" },
                  { id: "interactive", label: "Interactive" },
                  { id: "projects", label: "Projects" },
                  { id: "resume", label: "Resume" },
                  { id: "contact", label: "Contact" },
                ].map((s) => (
                  <li key={s.id}>
                    <button
                      onClick={() => scrollToSection(s.id)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                        activeSection === s.id
                          ? "bg-indigo-500/20 text-indigo-200"
                          : "text-slate-300 hover:text-white hover:bg-white/10"
                      }`}
                      aria-current={activeSection === s.id ? "page" : undefined}
                    >
                      {s.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>

      <main className="flex-1">
        {/* Hero Section */}
        <section
          id="home"
          className="min-h-screen flex items-center justify-center px-4 pt-20 relative"
        >
          <div className="absolute inset-0 z-0">
            <FaultyTerminal
              scale={1.5}
              gridMul={[2, 1]}
              digitSize={1.2}
              timeScale={1}
              pause={false}
              tint="#6366f1"
              mouseStrength={0.5}
              pageLoadAnimation={false}
              brightness={0.7}
              className="w-full h-full"
            />
          </div>
          <div className="max-w-5xl mx-auto relative z-10">
            <div
              className="space-y-6 md:space-y-8 max-w-3xl scroll-animate fade-scale slow-in p-6 md:p-8 rounded-2xl bg-black/45 backdrop-blur-sm ring-1 ring-white/10"
              data-stagger-group="hero"
            >
              <div className="text-accent text-lg font-medium font-serif">
                — INTRODUCTION
              </div>
              <h1
                className="text-5xl md:text-6xl font-bold leading-tight font-serif"
                style={{ textShadow: "0 1px 2px rgba(0,0,0,.6)" }}
              >
                Full Stack Developer and
                <span className="text-accent"> SDE</span> Aspirant.
              </h1>
              <p className="text-gray-200 text-lg leading-relaxed">
                Third-year Computer Science student passionate about building
                scalable software, blockchain solutions, and AI-driven
                applications. Experienced in modern web technologies and
                decentralized systems.
              </p>
              <div className="flex space-x-4">
                <Button
                  onClick={() => scrollToSection("projects")}
                  className="bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-black font-semibold px-9 py-3.5 rounded-lg shadow-lg shadow-indigo-950/30 ring-1 ring-indigo-300/40 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                >
                  My Work →
                </Button>
                <Button
                  variant="outline"
                  onClick={() => scrollToSection("contact")}
                  className="border-white/30 text-white hover:bg-white/10 hover:border-white/40 px-9 py-3.5 rounded-lg font-medium backdrop-blur-sm ring-1 ring-white/10 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                >
                  Get In Touch
                </Button>
              </div>
              <div className="flex space-x-4 pt-4">
                <a
                  href="https://github.com/vatsa2005"
                  className="text-gray-400 hover:text-indigo-400 transition-all duration-300 transform hover:scale-105"
                  target="_blank"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href="https://www.linkedin.com/in/srivatsa-s-84b258297/"
                  className="text-gray-400 hover:text-indigo-400 transition-all duration-300 transform hover:scale-105"
                  target="_blank"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="https://x.com/Vatsa5002"
                  className="text-gray-400 hover:text-indigo-400 transition-all duration-300 transform hover:scale-105"
                  target="_blank"
                >
                  <XLogo className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div
              className="text-center mb-16 scroll-animate fade-scale"
              data-stagger-group="about"
            >
              <div className="text-accent text-lg font-medium mb-4 font-serif">
                — ABOUT ME
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-serif">
                Passionate about building the future with code
              </h2>
              <div className="mx-auto mt-4 h-px divider-gradient scroll-animate reveal-divider" />
              <p className="text-gray-400 text-lg max-w-3xl mx-auto">
                I'm a dedicated Computer Science student with a strong
                foundation in full-stack development, blockchain technology, and
                AI applications. My journey includes hackathon victories,
                leadership roles, and real-world development experience.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="scroll-animate">
                <h3 className="text-2xl font-bold mb-6 text-accent font-serif">
                  Education
                </h3>
                <div className="space-y-6">
                  <Card className="bg-white/10 border border-white/20 backdrop-blur-md shadow-lg rounded-2xl hover:scale-105 transition-all duration-300">
                    <CardContent className="p-6 rounded-2xl">
                      <h4 className="font-bold text-lg">
                        B.Tech in Computer Science Engineering
                      </h4>
                      <p className="text-accent">SRM IST-Ramapuram</p>
                      <p className="text-gray-400">
                        CGPA: 9.57/10 • Expected 2027
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/10 border border-white/20 backdrop-blur-md shadow-lg rounded-2xl hover:scale-105 transition-all duration-300">
                    <CardContent className="p-6 rounded-2xl">
                      <h4 className="font-bold text-lg">Class XII (MPC)</h4>
                      <p className="text-accent">
                        Kendriya Vidyalaya IIT Campus
                      </p>
                      <p className="text-gray-400">83% • 2023</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/10 border border-white/20 backdrop-blur-md shadow-lg rounded-2xl hover:scale-105 transition-all duration-300">
                    <CardContent className="p-6 rounded-2xl">
                      <h4 className="font-bold text-lg">Class X</h4>
                      <p className="text-accent">
                        Kendriya Vidyalaya ASC Centre South
                      </p>
                      <p className="text-gray-400">91.6% • 2021</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="scroll-animate">
                <h3 className="text-2xl font-bold mb-6 text-accent font-serif">
                  Achievements
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 transform hover:translate-x-2 transition-all duration-300">
                    <div className="w-2 h-2 bg-accent rounded-full mt-3"></div>
                    <div>
                      <h4 className="font-semibold">
                        Hackathon Winner - Devshouse'25
                      </h4>
                      <p className="text-gray-400">
                        Secured victory in competitive hackathon environment
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 transform hover:translate-x-2 transition-all duration-300">
                    <div className="w-2 h-2 bg-accent rounded-full mt-3"></div>
                    <div>
                      <h4 className="font-semibold">
                        Development Head - CodeKrafters
                      </h4>
                      <p className="text-gray-400">
                        Leading development initiatives and mentoring team
                        members
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 transform hover:translate-x-2 transition-all duration-300">
                    <div className="w-2 h-2 bg-accent rounded-full mt-3"></div>
                    <div>
                      <h4 className="font-semibold">SIH 2025 Finalist</h4>
                      <p className="text-gray-400">
                        College-level finalist with Vintage Vault project
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 transform hover:translate-x-2 transition-all duration-300">
                    <div className="w-2 h-2 bg-accent rounded-full mt-3"></div>
                    <div>
                      <h4 className="font-semibold">Open Source Contributor</h4>
                      <p className="text-gray-400">
                        Active contributor to various open-source projects
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 transform hover:translate-x-2 transition-all duration-300">
                    <div className="w-2 h-2 bg-accent rounded-full mt-3"></div>
                    <div>
                      <h4 className="font-semibold">Freelance Experience</h4>
                      <p className="text-gray-400">
                        Successfully delivered multiple client projects
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20 px-4 bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <div
              className="text-center mb-16 scroll-animate fade-scale"
              data-stagger-group="experience"
            >
              <div className="text-accent text-lg font-medium mb-4 font-serif">
                — EXPERIENCE
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-serif">
                Work Experience
              </h2>
              <div className="mx-auto mt-4 h-px divider-gradient scroll-animate reveal-divider" />
            </div>

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <Card
                  key={index}
                  className="bg-white/10 border border-white/20 backdrop-blur-md shadow-lg rounded-2xl hover:border-indigo-400/60 transition-all duration-300 scroll-animate fade-scale transform hover:scale-102"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-accent font-serif">
                          {exp.company}
                        </h3>
                        <h4 className="text-xl font-semibold">{exp.role}</h4>
                      </div>
                      <div className="text-gray-400 mt-2 md:mt-0">
                        {exp.period}
                      </div>
                    </div>
                    <p className="text-gray-300">{exp.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div
              className="text-center mb-16 scroll-animate fade-scale"
              data-stagger-group="skills"
            >
              <div className="text-accent text-lg font-medium mb-4 font-serif">
                — SKILLS & EXPERTISE
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-serif">
                Technical Skills
              </h2>
              <div className="mx-auto mt-4 h-px divider-gradient scroll-animate reveal-divider" />
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div style={{ animationDelay: "0.05s" }}>
                <SpotlightCard
                  className="scroll-animate fade-scale"
                  spotlightColor="rgba(29, 78, 216, 0.2)"
                >
                  <div className="p-0">
                    <div className="flex items-center mb-6">
                      <Code className="w-8 h-8 text-accent mr-3" />
                      <h3 className="text-2xl font-bold font-serif">
                        Programming Languages
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skills.languages.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="bg-accent-soft text-accent border-accent-soft transform hover:scale-105 transition-all duration-300"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </div>
              <div style={{ animationDelay: "0.1s" }}>
                <SpotlightCard
                  className="scroll-animate fade-scale"
                  spotlightColor="rgba(29, 78, 216, 0.2)"
                >
                  <div className="p-0">
                    <div className="flex items-center mb-6">
                      <Code className="w-8 h-8 text-accent mr-3" />
                      <h3 className="text-2xl font-bold font-serif">
                        Frameworks & Libraries
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skills.frameworks.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="bg-accent-soft text-accent border-accent-soft transform hover:scale-105 transition-all duration-300"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </div>
              <div style={{ animationDelay: "0.15s" }}>
                <SpotlightCard
                  className="scroll-animate fade-scale"
                  spotlightColor="rgba(29, 78, 216, 0.2)"
                >
                  <div className="p-0">
                    <div className="flex items-center mb-6">
                      <Code className="w-8 h-8 text-accent mr-3" />
                      <h3 className="text-2xl font-bold font-serif">
                        Tools & Platforms
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skills.tools.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="bg-accent-soft text-accent border-accent-soft transform hover:scale-105 transition-all duration-300"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 px-4 bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <div
              className="text-center mb-16 scroll-animate fade-scale"
              data-stagger-group="services"
            >
              <div className="text-accent text-lg font-medium mb-4 font-serif">
                — SERVICES
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-serif">
                What I Offer
              </h2>
              <div className="mx-auto mt-4 h-px divider-gradient scroll-animate reveal-divider" />
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div key={index} style={{ animationDelay: `${index * 0.1}s` }}>
                  <CometCard className="scroll-animate fade-scale">
                    <Card className="bg-slate-800/80 border-slate-700 hover:border-indigo-400 transition-all duration-300 h-full">
                      <CardContent className="p-8 text-center">
                        <div className="text-accent mb-6 flex justify-center transform hover:scale-105 transition-all duration-300">
                          {service.icon}
                        </div>
                        <h3 className="text-2xl font-bold mb-4 font-serif">
                          {service.title}
                        </h3>
                        <p className="text-gray-300">{service.description}</p>
                      </CardContent>
                    </Card>
                  </CometCard>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Draggable Cards Section */}
        <section id="interactive" className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div
              className="text-center mb-16 scroll-animate fade-scale"
              data-stagger-group="interactive"
            >
              <div className="text-accent text-lg font-medium mb-4 font-serif">
                — INTERACTIVE
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-serif">
                Explore My Skills
              </h2>
              <div className="mx-auto mt-4 h-px divider-gradient scroll-animate reveal-divider" />
              <p className="text-gray-300 text-lg mt-4 max-w-2xl mx-auto">
                Drag the cards around to explore different areas of my
                expertise. Each card represents a key skill or technology I work
                with.
              </p>
            </div>
            <div className="scroll-animate fade-scale max-w-screen h-full">
              <DraggableCardDemo />
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="text-accent text-lg font-medium mb-4 font-serif">
                — PORTFOLIO
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-serif">
                Featured Projects
              </h2>
              <div className="mx-auto mt-4 h-px divider-gradient scroll-animate reveal-divider" />
            </div>
            <FeaturedProjectsTabs projects={projects} />
          </div>
        </section>
        {/* Resume Section */}
        <section id="resume" className="py-12 px-4 mt-8 md:mt-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 scroll-animate fade-scale">
              <div className="text-accent text-lg font-medium mb-4 font-serif">
                — RESUME
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-serif">
                Resume for Recruiters
              </h2>
              <div className="mx-auto mt-4 h-px divider-gradient" />
              <p className="text-gray-300 text-lg mt-4 max-w-2xl mx-auto">
                Download my resume as a PDF. For the most up-to-date copy, click
                the button below.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-black font-semibold px-8 py-3 rounded-lg shadow-lg ring-1 ring-indigo-300/40 hover:from-indigo-500 hover:to-indigo-400 transition"
              >
                <Download className="w-5 h-5" />
                Download Resume (PDF)
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 border border-white/20 text-white px-6 py-3 rounded-lg hover:bg-white/5 transition"
              >
                <ExternalLink className="w-5 h-5" />
                View in new tab
              </a>
            </div>

            <p className="text-gray-400 text-sm text-center mt-6">
              If the resume doesn't download, please email me at{" "}
              <a
                href="mailto:svatsa2005@gmail.com"
                className="text-accent underline"
              >
                svatsa2005@gmail.com
              </a>
              .
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="py-20 px-4 bg-slate-900/50 mt-8 md:mt-12"
        >
          <div className="max-w-7xl mx-auto">
            <div
              className="text-center mb-16 scroll-animate fade-scale"
              data-stagger-group="contact"
            >
              <div className="text-accent text-lg font-medium mb-4 font-serif">
                — CONTACT
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-serif">
                Let's Connect
              </h2>
              <div className="mx-auto mt-4 h-px divider-gradient scroll-animate reveal-divider" />
              <p className="text-gray-300 text-lg mt-4 max-w-2xl mx-auto">
                Quick, clear, and collaborative. Choose any channel below to
                reach out.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <a
                href="mailto:svatsa2005@gmail.com"
                className="group relative overflow-hidden rounded-2xl border border-slate-700/70 bg-gradient-to-br from-slate-800/70 to-slate-900/60 p-6 flex flex-col gap-4 hover:border-indigo-400/60 hover:from-slate-800/80 hover:to-slate-900/70 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/15 ring-1 ring-indigo-400/30 text-indigo-400 group-hover:bg-indigo-500/20 group-hover:text-indigo-300 transition-colors">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-sm uppercase tracking-wide text-gray-400">
                      Email
                    </span>
                    <span className="font-medium text-gray-100 group-hover:text-white">
                      svatsa2005@gmail.com
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Primary and fastest response channel.
                </p>
              </a>

              <a
                href="tel:7676589397"
                className="group relative overflow-hidden rounded-2xl border border-slate-700/70 bg-gradient-to-br from-slate-800/70 to-slate-900/60 p-6 flex flex-col gap-4 hover:border-indigo-400/60 hover:from-slate-800/80 hover:to-slate-900/70 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/15 ring-1 ring-indigo-400/30 text-indigo-400 group-hover:bg-indigo-500/20 group-hover:text-indigo-300 transition-colors">
                    <Phone className="h-5 w-5" />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-sm uppercase tracking-wide text-gray-400">
                      Phone
                    </span>
                    <span className="font-medium text-gray-100 group-hover:text-white">
                      +91 7676589397
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Best for urgent conversations.
                </p>
              </a>

              <a
                href="https://www.linkedin.com/in/srivatsa-s-84b258297/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-2xl border border-slate-700/70 bg-gradient-to-br from-slate-800/70 to-slate-900/60 p-6 flex flex-col gap-4 hover:border-indigo-400/60 hover:from-slate-800/80 hover:to-slate-900/70 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/15 ring-1 ring-indigo-400/30 text-indigo-400 group-hover:bg-indigo-500/20 group-hover:text-indigo-300 transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-sm uppercase tracking-wide text-gray-400">
                      LinkedIn
                    </span>
                    <span className="font-medium text-gray-100 group-hover:text-white">
                      Srivatsa S
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Connect professionally & explore collaboration.
                </p>
              </a>

              <a
                href="https://github.com/vatsa2005"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-2xl border border-slate-700/70 bg-gradient-to-br from-slate-800/70 to-slate-900/60 p-6 flex flex-col gap-4 hover:border-indigo-400/60 hover:from-slate-800/80 hover:to-slate-900/70 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/15 ring-1 ring-indigo-400/30 text-indigo-400 group-hover:bg-indigo-500/20 group-hover:text-indigo-300 transition-colors">
                    <Github className="h-5 w-5" />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-sm uppercase tracking-wide text-gray-400">
                      GitHub
                    </span>
                    <span className="font-medium text-gray-100 group-hover:text-white">
                      vatsa2005
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Explore my open-source & side projects.
                </p>
              </a>

              <a
                href="https://x.com/Vatsa5002"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-2xl border border-slate-700/70 bg-gradient-to-br from-slate-800/70 to-slate-900/60 p-6 flex flex-col gap-4 hover:border-indigo-400/60 hover:from-slate-800/80 hover:to-slate-900/70 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/15 ring-1 ring-indigo-400/30 text-indigo-400 group-hover:bg-indigo-500/20 group-hover:text-indigo-300 transition-colors">
                    <XLogo className="h-5 w-5" />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-sm uppercase tracking-wide text-gray-400">
                      X / Twitter
                    </span>
                    <span className="font-medium text-gray-100 group-hover:text-white">
                      @Vatsa5002
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Thoughts on dev, blockchain & innovation.
                </p>
              </a>

              <div className="group relative overflow-hidden rounded-2xl border border-dashed border-slate-700/70 bg-gradient-to-br from-slate-800/60 to-slate-900/50 p-6 flex flex-col gap-4 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 ring-1 ring-indigo-400/20 text-indigo-400 group-hover:bg-indigo-500/15 transition-colors">
                    <ExternalLink className="h-5 w-5" />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-sm uppercase tracking-wide text-gray-400">
                      Portfolio
                    </span>
                    <span className="font-medium text-gray-100">
                      You're already here!
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Thanks for visiting — open to freelance, internships &
                  collaboration opportunities.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-slate-800 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            © 2025 Srivatsa S. All rights reserved. Built with Next.js and
            Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
}
