"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SkillDetail {
  name: string;
  level: string;
  projectApplied: string;
  lessonsLearned: string;
  description: string;
}

interface SkillCategory {
  category: string;
  skills: SkillDetail[];
}

export default function RealmLibrary() {
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [activeSkill, setActiveSkill] = useState<SkillDetail | null>(null);

  const libraryData: SkillCategory[] = [
    {
      category: "Development",
      skills: [
        {
          name: "Flutter & Dart",
          level: "Advanced",
          projectApplied: "Acara Event Booking System",
          lessonsLearned: "Designed a clean, multi-adapter network layout, solved data structure inconsistencies across multiple remote endpoints (Ticketmaster, Eventbrite), and optimized reactive view states (Riverpod/Bloc).",
          description: "Declarative UI construction, mobile systems deployment, asynchronous API bindings, custom channel platforms, and performance Profiling in Dart.",
        },
        {
          name: "React.js & Next.js",
          level: "Advanced",
          projectApplied: "Journally note taking & Portfolio universe",
          lessonsLearned: "Implemented Server-Side Rendering (SSR), integrated dynamic WYSIWYG editor packages, and designed scroll-driven 3D WebGL canvases using GSAP and React Three Fiber.",
          description: "Virtual DOM reconciliation, state selectors, custom React hooks, Next.js page routers, and under-the-hood performance management.",
        },
        {
          name: "Node.js & Express",
          level: "Advanced",
          projectApplied: "Journally REST Backend",
          lessonsLearned: "Architected secure session tokens (JWT) authentication, established CORS access regulations, configured Multer stream upload pipelines, and designed unit test suites for REST routes.",
          description: "Event-driven asynchronous middleware chains, REST route orchestration, multi-threaded worker pooling, and server diagnostics.",
        },
      ],
    },
    {
      category: "Design",
      skills: [
        {
          name: "Figma UI / UX",
          level: "Intermediate / Advanced",
          projectApplied: "Acara & Journally interfaces design",
          lessonsLearned: "Maintained component library symbols, designed detailed dark/light responsive layout prototypes, mapped interactive user journeys, and compiled UI modernization guides.",
          description: "Vector illustration grids, interactive prototyping variables, auto-layout hierarchies, and developer specifications handover.",
        },
        {
          name: "Aesthetic CSS & Motion",
          level: "Advanced",
          projectApplied: "The Sara Universe portfolio site",
          lessonsLearned: "Used custom CSS variable theme models, implemented glassmorphism panels, designed custom mouse following ring reactions, and crafted GSAP scroll-bound cameras.",
          description: "Flexbox/CSS Grid layouts, hardware-accelerated transforms, Framer Motion properties, SVG path anims, and responsive media query blocks.",
        },
      ],
    },
    {
      category: "Data",
      skills: [
        {
          name: "MongoDB",
          level: "Intermediate / Advanced",
          projectApplied: "Journally MongoDB document store",
          lessonsLearned: "Designed relational note schemas matching tag structures and directory folders, configured indices for high-frequency queries, and wrote test setups.",
          description: "Document model schemas, aggregation pipelines, schema validation, index performance tuning, and backup recovery.",
        },
        {
          name: "PostgreSQL & Supabase",
          level: "Intermediate",
          projectApplied: "Acara database configuration",
          lessonsLearned: "Managed PostgreSQL schemas, designed row-level security (RLS) policies, built remote client connection hooks, and configured edge function handlers.",
          description: "Relational database constraints, stored procedures, secure row-level policies, REST mapping, and real-time triggers.",
        },
      ],
    },
    {
      category: "Tools & DevOps",
      skills: [
        {
          name: "Git & Version Control",
          level: "Advanced",
          projectApplied: "All repositories tracking",
          lessonsLearned: "Resolved git tracking issues (excluding heavy node_modules/env files), managed feature branching, resolved merge conflicts, and structured clean semantic commit histories.",
          description: "Git rebase operations, branch merge protocols, repository pruning, SSH keys validation, and hook scripts.",
        },
        {
          name: "SonarQube & Lints",
          level: "Intermediate / Advanced",
          projectApplied: "Journally backend/frontend static checking",
          lessonsLearned: "Configured LCOV directory exclusions, mapped test coverage reports, resolved code smells, and stabilized database leak issues to pass quality gates.",
          description: "Static code analysis gates, duplication tracking, cognitive complexity reduction, and security vulnerability fixes.",
        },
      ],
    },
    {
      category: "Creative",
      skills: [
        {
          name: "Creative Direction & Fashion Design",
          level: "Intermediate",
          projectApplied: "Scrapbook sketch works & Portfolio aesthetics",
          lessonsLearned: "Applied fashion editorial visual rules (neutral dark spaces, champagne gold borders, wide space typography) to user experience platforms.",
          description: "Editorial layouts, color theory pairing, brand positioning, and fashion sketches.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen py-24 px-6 sm:px-12 md:px-24 max-w-5xl mx-auto relative z-10 flex flex-col justify-center select-none">
      {/* Realm Title */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-16 text-center md:text-left"
      >
        <span className="font-serif italic text-2xl sm:text-3xl text-luxury-gold block mb-2">
          Realm V
        </span>
        <h2 className="font-display font-medium text-4xl sm:text-5xl text-luxury-white tracking-widest uppercase">
          The Library
        </h2>
        <div className="w-12 h-[1px] bg-luxury-gold mt-4 mx-auto md:mx-0" />
      </motion.div>

      {/* Library Interactive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start max-w-4xl mx-auto w-full">
        {/* Book Shelf / Category Selectors */}
        <div className="md:col-span-4 flex flex-row md:flex-col gap-2 md:gap-4 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 scrollbar-none border-b md:border-b-0 md:border-r border-luxury-gold/15 pr-0 md:pr-6">
          {libraryData.map((cat, idx) => (
            <button
              key={cat.category}
              onClick={() => {
                setActiveCategory(idx);
                setActiveSkill(null);
              }}
              className={`font-display text-[9.5px] tracking-[0.25em] uppercase text-left py-2 px-4 border rounded-sm transition-all duration-300 w-full ${
                activeCategory === idx
                  ? "bg-luxury-gold text-luxury-bg border-luxury-gold shadow-md"
                  : "text-luxury-muted hover:text-luxury-white border-transparent hover:border-luxury-gold/20"
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* Catalog List / Skills list */}
        <div className="md:col-span-8 grid grid-cols-1 gap-4 md:pl-6">
          <div className="flex flex-col gap-3">
            {libraryData[activeCategory].skills.map((skill) => {
              const isSelected = activeSkill?.name === skill.name;
              return (
                <div
                  key={skill.name}
                  onClick={() => setActiveSkill(isSelected ? null : skill)}
                  className={`glass-panel p-5 rounded-sm cursor-pointer transition-all duration-300 ${
                    isSelected ? "border-luxury-gold bg-luxury-white/5" : "hover:border-luxury-gold/30 hover:bg-luxury-white/5"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-serif italic font-light text-xl text-luxury-white">
                      {skill.name}
                    </h3>
                    <span className="font-display text-[8px] tracking-[0.15em] text-luxury-gold uppercase border border-luxury-gold/20 px-1.5 py-0.5 rounded-sm">
                      {skill.level}
                    </span>
                  </div>

                  {/* Context Expansion */}
                  <AnimatePresence initial={false}>
                    {isSelected && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden mt-4 pt-4 border-t border-luxury-gold/10"
                      >
                        <p className="font-sans font-light text-xs text-luxury-white leading-relaxed mb-4">
                          {skill.description}
                        </p>
                        
                        <div className="mb-4">
                          <span className="font-display font-bold text-[8px] tracking-[0.2em] text-luxury-gold uppercase block mb-1">
                            Applied in Project:
                          </span>
                          <span className="font-sans font-light text-xs text-luxury-white">
                            {skill.projectApplied}
                          </span>
                        </div>

                        <div>
                          <span className="font-display font-bold text-[8px] tracking-[0.2em] text-luxury-gold uppercase block mb-1">
                            Lessons Learned:
                          </span>
                          <p className="font-sans font-light text-xs text-luxury-muted leading-relaxed">
                            {skill.lessonsLearned}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
