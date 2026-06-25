"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Code, Globe, Cpu, Smartphone } from "lucide-react";

interface Project {
  id: string;
  exhibitLabel: string;
  title: string;
  subtitle: string;
  category: string;
  categoryIcon: React.ComponentType<{ className?: string }>;
  role: string;
  year: string;
  tech: string[];
  highlight: string;
  problem: string;
  idea: string;
  process: string;
  challenges: string;
  outcome: string;
  learned: string;
  github?: string;
  accentColor: string;
}

const PROJECTS: Project[] = [
  {
    id: "identity-atlas",
    exhibitLabel: "Exhibit A",
    title: "Identity Atlas",
    subtitle: "AI-Powered Digital Identity Mapping Platform",
    category: "React · Three.js · FastAPI · ML",
    categoryIcon: Cpu,
    role: "Lead AI & Visualization Engineer",
    year: "2025",
    tech: ["React", "Three.js", "FastAPI", "Python", "Embeddings", "Clustering", "Graph Analysis", "Vector Similarity Search"],
    highlight: "Constructs a data-driven model of digital identity by mapping user interests in a navigable 3D galaxy.",
    problem:
      "Digital identities are scattered across isolated web platforms (Spotify, AniList, Goodreads). Recruiters and services lack a unified, non-questionnaire-based behavioral map to understand a user's true aesthetic and behavioral profile.",
    idea: "A unified data-driven modeling platform that aggregates cross-platform interests, maps users and items into a shared embedding space, clusters taste patterns, and displays them as a navigable 3D galaxy.",
    process:
      "Architected a multi-layer pipeline: a data processing layer fetching Spotify and media logs, a Python-based ML inference system using Sentence Transformers to generate embeddings, and a React front-end utilizing Three.js to render interest clusters as an interactive 3D universe.",
    challenges:
      "Visualizing thousands of interest nodes in WebGL without causing rendering lag or cluster clutter. Solved by implementing Octree spatial indexing, instanced meshes for uniform particles, and drawing spline lines only between high-weight vector similarity edges.",
    outcome:
      "Delivered a fully interactive digital identity dashboard featuring latent-space taste analysis, temporal preference tracking, and vector-similarity search that discovers taste overlaps with 92% structural consistency.",
    learned:
      "Gained expertise in semantic embedding alignment, graph network visualization, Three.js performance tuning (instancing & raw shaders), and deploying Python ML APIs alongside standard web runtimes.",
    github: "https://github.com",
    accentColor: "#c5a880",
  },
  {
    id: "acara",
    exhibitLabel: "Exhibit B",
    title: "Acara",
    subtitle: "Location-Based Premium Event Discovery",
    category: "Flutter Mobile Application",
    categoryIcon: Smartphone,
    role: "Lead Flutter Architect · Independent Project",
    year: "2025 – 2026",
    tech: ["Flutter", "Dart", "Supabase", "PostgreSQL", "Edge Functions", "Ticketmaster API", "Eventbrite API", "Google Maps SDK"],
    highlight: "Unified 3 major ticketing APIs into a single geo-fenced discovery canvas.",
    problem:
      "Event discovery is fragmented across multiple platforms. Users compare prices across Ticketmaster, Eventbrite, and SeatGeek manually, leading to poor experience and missed events.",
    idea: "A high-end, responsive event search and booking system unifying Ticketmaster, Eventbrite, and SeatGeek listings onto a single interactive geo-fenced map canvas with dynamic QR ticket generation.",
    process:
      "Constructed dynamic, fluid mobile layouts in Flutter (Dart), set up Supabase user authentication with Row-Level Security, and deployed serverless Edge Functions to orchestrate and normalize external API feeds. Designed custom QR ticket system with secure token embedding.",
    challenges:
      "Handling nested XML and JSON data schemas from three ticketing platforms simultaneously while normalizing inconsistent coordinate systems and managing rate limits. Resolved by implementing a unified Adapter design pattern inside Supabase Edge Functions.",
    outcome:
      "Delivered a fluid, 60 FPS booking workflow with dynamic QR code tickets, geo-fenced map radius queries, and a beautiful premium event catalog UI.",
    learned:
      "Mastered building serverless microservices for data aggregation, state management patterns in Flutter (Riverpod), PostgreSQL RLS policies, and geo-spatial query optimization.",
    github: "https://github.com",
    accentColor: "#8a7152",
  },
  {
    id: "journally",
    exhibitLabel: "Exhibit C",
    title: "10Pearls Journaling Platform",
    subtitle: "Secure Voice-Dictated Note Platform",
    category: "MERN Stack Web Application",
    categoryIcon: Globe,
    role: "Full-Stack Developer Intern · 10Pearls",
    year: "2024 – 2025",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT Auth", "TailwindCSS", "React Quill", "Multer", "SonarQube"],
    highlight: "Voice-to-text dictation + secure JWT notebook management.",
    problem:
      "Traditional note-taking apps lack hands-free capture and feel visually static. Users struggle to log quick thoughts during hands-busy contexts like commutes or cooking.",
    idea: "A premium note-taking workspace integrating real-time browser-native voice-to-text dictation, customizable notebook folders, search tags, and fully-secured JWT user containment.",
    process:
      "Designed clean dark-themed interfaces in Figma, established JWT session authentication protocols, built an Express.js REST backend with Multer stream upload support, and integrated the browser-native Speech Recognition API. Tracked quality standards via SonarQube and Jest test suites.",
    challenges:
      "State-update conflicts between the real-time rich-text editor (React Quill) and asynchronous speech-recognition inputs caused double-writes. Resolved by building a decoupled input hook that feeds transcribed text incrementally only on detected pause events.",
    outcome:
      "Shipped a secure full-stack journaling environment passing SonarQube quality gate thresholds with 80%+ test coverage. Implemented clean git tracking (excluding node_modules/.env) and followed SOLID architecture guidelines.",
    learned:
      "Learned modular test suite design, async state management in React, database transaction cleanup, and effective use of SonarQube for code quality governance.",
    github: "https://github.com",
    accentColor: "#c5a880",
  },
  {
    id: "rentngo",
    exhibitLabel: "Exhibit D",
    title: "RentNGo",
    subtitle: "On-Demand Vehicle Rental Management System",
    category: "Full-Stack Web Application",
    categoryIcon: Globe,
    role: "Full-Stack Developer",
    year: "2024",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "TailwindCSS", "Mapbox SDK", "Stripe API"],
    highlight: "Full-stack rental platform featuring dynamic vehicle booking and Stripe integration.",
    problem:
      "Car rental platforms often feature rigid scheduling systems, complex checkout flows, and lack real-time geographical vehicle availability tracking.",
    idea: "A streamlined on-demand vehicle booking application with instant rental pricing engines, geo-spatial map searching, and secure split-payment gateways.",
    process:
      "Built a React frontend featuring a map-centered search interface powered by Mapbox SDK. Developed a Node.js/Express backend managing complex rental reservation availability intervals, integrating Stripe for payment processing.",
    challenges:
      "Preventing double-booking of vehicles during concurrent payment sessions. Resolved by establishing atomic database lock sessions in MongoDB and using a cron worker to release pending expired booking holds.",
    outcome:
      "Successfully deployed a fully functional rental portal with automatic invoice generation, real-time map clustering for nearby vehicles, and a checkout completion flow under 3 seconds.",
    learned:
      "Deepened knowledge of state scheduling systems, managing transactional safety in MongoDB, Mapbox API custom map styling, and Stripe checkout webhooks.",
    github: "https://github.com",
    accentColor: "#8a7152",
  },
  {
    id: "devdaily",
    exhibitLabel: "Exhibit E",
    title: "DevDaily Dashboard",
    subtitle: "Developer Productivity and Analytics Workspace",
    category: "React Frontend Application",
    categoryIcon: Code,
    role: "Frontend Developer",
    year: "2024",
    tech: ["React.js", "TypeScript", "TailwindCSS", "Chart.js", "GitHub API", "Jira API"],
    highlight: "Aggregated engineering metrics and workflow tasks into a unified premium dashboard.",
    problem:
      "Developers context-switch constantly between Git repositories, task boards, and communication channels, losing track of personal daily velocity and tasks.",
    idea: "A personal, highly customizable workspace pulling data from GitHub, Jira, and local productivity trackers, visualized through smooth chart interfaces.",
    process:
      "Developed a sleek, modern React application with layout widgets using CSS grid. Utilized React Context for state management and connected to public REST APIs using Axios. Built charts using Chart.js to illustrate code push frequencies.",
    challenges:
      "Managing third-party rate limits from GitHub API during dashboard hot-reloads. Solved by implementing custom browser localStorage caching and an API response polling throttling hook.",
    outcome:
      "Created a premium developer dashboard with real-time issue updates, visual velocity progress bars, and localized task checklist widgets.",
    learned:
      "Mastered working with OAuth integrations, asynchronous API polling structures, custom chart components resizing, and high-performance CSS Grid layouts.",
    github: "https://github.com",
    accentColor: "#c5a880",
  },
  {
    id: "cpu-simulator",
    exhibitLabel: "Exhibit F",
    title: "CPU Scheduler",
    subtitle: "Operating System Algorithms Visualizer",
    category: "Academic Systems Project",
    categoryIcon: Cpu,
    role: "Systems Engineer & Visualizer",
    year: "2023",
    tech: ["HTML5", "CSS Grid", "JavaScript", "Canvas API", "Algorithms"],
    highlight: "Visualized Gantt charts and performance analysis for scheduling algorithms.",
    problem:
      "Operating systems core algorithms like Round Robin, SRTF, and Priority Scheduling are highly abstract and difficult for students to debug and comprehend visually.",
    idea: "An interactive educational simulator that visually represents processes traversing through Ready, Running, and Blocked states with live Gantt chart rendering.",
    process:
      "Implemented the core algorithm engine in vanilla JavaScript, managing process control blocks (PCBs) inside simulated queue lists. Built a custom rendering interface mapping scheduling metrics like wait times and turnaround times.",
    challenges:
      "Animating step-by-step state changes chronologically at variable simulator speeds. Solved by structuring the simulator engine around a controllable generator loop pattern (yield) and state ticks.",
    outcome:
      "Developed an educational tool calculating average turnaround and waiting times instantly, showcasing comparative metrics tables for 5+ core scheduling algorithms.",
    learned:
      "Gained a deep, intuitive understanding of OS process states, priority queues, performance benchmarks calculation, and canvas animation frames.",
    github: "https://github.com",
    accentColor: "#8a7152",
  }
];

export default function RealmMuseum() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Dispatch lock-scroll custom event to prevent page scrolling while sidebar detail is open
  useEffect(() => {
    const lock = activeProject !== null;
    window.dispatchEvent(new CustomEvent("lock-scroll", { detail: { lock } }));
    return () => {
      window.dispatchEvent(new CustomEvent("lock-scroll", { detail: { lock: false } }));
    };
  }, [activeProject]);

  return (
    <div className="min-h-screen py-24 px-6 sm:px-12 md:px-24 max-w-7xl mx-auto relative z-10 flex flex-col justify-center select-none">

      {/* Realm Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="mb-16 text-center md:text-left"
      >
        <span className="font-serif italic text-2xl sm:text-3xl text-luxury-gold block mb-2">
          Realm III
        </span>
        <h2 className="font-display font-medium text-4xl sm:text-5xl text-luxury-white tracking-widest uppercase">
          Museum of Projects
        </h2>
        <div className="w-12 h-[1px] bg-luxury-gold mt-4 mx-auto md:mx-0" />
        <p className="font-sans text-xs sm:text-sm text-luxury-muted mt-4 max-w-sm">
          Click any exhibit to open the full case study.
        </p>
      </motion.div>

      {/* Exhibit Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-5xl mx-auto w-full">
        {PROJECTS.map((project, projectIdx) => {
          const Icon = project.categoryIcon;
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: projectIdx * 0.12 }}
              onClick={() => setActiveProject(project)}
              className="glass-panel glass-panel-hover p-8 rounded-sm cursor-pointer transition-all duration-500 group flex flex-col justify-between min-h-[420px] relative overflow-hidden"
              data-cursor="inspect"
            >
              {/* Subtle corner accent */}
              <div
                className="absolute top-0 right-0 w-20 h-20 pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(ellipse at top right, ${project.accentColor}14 0%, transparent 60%)`,
                }}
              />

              {/* Header row */}
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5 text-luxury-gold" />
                    <span className="font-display text-[10.5px] tracking-[0.25em] text-luxury-gold uppercase border border-luxury-gold/20 px-2.5 py-0.5 rounded-sm">
                      {project.category}
                    </span>
                  </div>
                  <span className="font-serif italic text-xs sm:text-sm text-luxury-muted">
                    {project.exhibitLabel}
                  </span>
                </div>

                {/* Year + title */}
                <span className="font-display text-[10px] tracking-[0.2em] text-luxury-muted/90 uppercase block mb-2">{project.year}</span>
                <h3 className="font-serif italic font-light text-5xl text-luxury-white group-hover:text-luxury-gold transition-colors duration-500 mb-2">
                  {project.title}
                </h3>
                <p className="font-display text-[11px] sm:text-xs tracking-[0.15em] text-luxury-muted uppercase mb-4">
                  {project.subtitle}
                </p>

                {/* Highlight sentence */}
                <p className="font-sans font-light text-sm text-luxury-white/85 leading-relaxed line-clamp-2 mb-6 border-l-2 border-luxury-gold/30 pl-3">
                  {project.highlight}
                </p>
              </div>

              {/* Footer row */}
              <div>
                {/* Tech badges */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tech.slice(0, 5).map((tech) => (
                    <span key={tech} className="font-display text-[9px] sm:text-[10.5px] tracking-[0.1em] text-luxury-muted/90 bg-luxury-white/5 border border-luxury-white/5 px-2 py-0.5 rounded-sm">
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 5 && (
                    <span className="font-display text-[9px] sm:text-[10px] tracking-[0.1em] text-luxury-gold px-1 py-0.5">
                      +{project.tech.length - 5} MORE
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-display font-bold text-[11px] tracking-[0.2em] text-luxury-gold group-hover:text-luxury-white transition-colors duration-300 flex items-center gap-1.5">
                    INSPECT EXHIBIT <span className="text-sm">→</span>
                  </span>
                  <div
                    className="w-1.5 h-1.5 rounded-full opacity-40 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundColor: project.accentColor }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ======================== */}
      {/* Modal Detail Drawer     */}
      {/* ======================== */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-[60] flex items-center justify-end p-4 sm:p-6 md:p-10 pointer-events-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setActiveProject(null)}
              className="absolute inset-0 bg-luxury-bg/88 backdrop-blur-lg cursor-pointer"
            />

            {/* Drawer panel */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 180 }}
              className="relative w-full max-w-2xl h-full glass-panel-bright rounded-sm shadow-2xl p-6 sm:p-10 overflow-y-auto scrollbar-none flex flex-col z-10"
            >
              {/* Accent top bar */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] rounded-t-sm"
                style={{
                  background: `linear-gradient(to right, transparent, ${activeProject.accentColor}80, transparent)`
                }}
              />

              {/* Header */}
              <div className="flex justify-between items-center mb-8 flex-shrink-0">
                <div className="flex items-center gap-2 text-luxury-gold">
                  <Code className="w-4 h-4" />
                  <span className="font-display text-xs tracking-[0.25em] uppercase font-bold text-luxury-gold">
                    {activeProject.category}
                  </span>
                </div>
                <button
                  onClick={() => setActiveProject(null)}
                  className="text-luxury-muted hover:text-luxury-gold transition-colors duration-300 p-2 border border-luxury-white/5 hover:border-luxury-gold/30 rounded-full"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Project meta */}
              <div className="flex-shrink-0">
                <span className="font-display text-[10px] sm:text-xs tracking-[0.25em] text-luxury-muted uppercase">{activeProject.year}</span>
                <h3 className="font-serif italic font-light text-5xl sm:text-6xl text-luxury-white mt-1 mb-2 leading-none">
                  {activeProject.title}
                </h3>
                <p className="font-display text-xs sm:text-sm tracking-[0.2em] text-luxury-gold uppercase mb-6">
                  {activeProject.subtitle}
                </p>

                {/* Highlight */}
                <p className="font-sans font-light text-base text-luxury-white/95 leading-relaxed border-l-2 border-luxury-gold/40 pl-4 mb-6">
                  {activeProject.highlight}
                </p>

                <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm font-sans font-light text-luxury-muted/90 mb-8 pb-6 border-b border-luxury-gold/10">
                  <div>
                    <span className="text-luxury-white font-medium block">Role</span>
                    {activeProject.role}
                  </div>
                  <div>
                    <span className="text-luxury-white font-medium block">Stack</span>
                    {activeProject.tech.slice(0, 3).join(", ")}
                  </div>
                </div>
              </div>

              {/* Case study sections */}
              <div className="flex-1 grid grid-cols-1 gap-6">
                {[
                  { label: "The Problem", content: activeProject.problem, color: "text-luxury-white" },
                  { label: "The Idea", content: activeProject.idea, color: "text-luxury-white/90" },
                  { label: "The Process", content: activeProject.process, color: "text-luxury-white/90" },
                  { label: "The Challenges", content: activeProject.challenges, color: "text-luxury-white", accent: true },
                  { label: "The Outcome", content: activeProject.outcome, color: "text-luxury-white/90" },
                  { label: "What I Learned", content: activeProject.learned, color: "text-luxury-white/90" },
                ].map(({ label, content, color, accent }) => (
                  <div key={label}>
                    <h4 className="font-display font-bold text-[10px] tracking-[0.22em] text-luxury-gold uppercase mb-2">
                      {label}
                    </h4>
                    <p className={`font-sans font-light text-sm sm:text-base leading-relaxed ${color} ${accent ? "border-l-2 border-luxury-gold/30 pl-3" : ""}`}>
                      {content}
                    </p>
                  </div>
                ))}
              </div>

              {/* Footer actions */}
              <div className="flex-shrink-0 flex flex-col sm:flex-row gap-4 items-center border-t border-luxury-gold/10 pt-6 mt-8">
                <div className="flex flex-wrap gap-1.5 flex-1">
                  {activeProject.tech.map((t) => (
                    <span key={t} className="font-display text-[9px] sm:text-xs tracking-[0.08em] text-luxury-white bg-luxury-white/5 border border-luxury-white/5 px-2 py-0.5 rounded-sm">
                      {t}
                    </span>
                  ))}
                </div>
                {activeProject.github && (
                  <a
                    href={activeProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display font-semibold text-xs tracking-[0.2em] text-luxury-bg bg-luxury-gold hover:bg-luxury-gold-glow px-4 py-2.5 rounded-sm transition-all duration-300 flex items-center gap-2 whitespace-nowrap justify-center shadow-lg shadow-luxury-gold/15"
                  >
                    VIEW REPOSITORY <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
