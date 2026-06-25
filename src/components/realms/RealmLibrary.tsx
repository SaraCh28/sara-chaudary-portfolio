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
  label: string;
  skills: SkillDetail[];
}

export default function RealmLibrary() {
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [activeSkill, setActiveSkill] = useState<SkillDetail | null>(null);

  const libraryData: SkillCategory[] = [
    {
      category: "Product Engineering",
      label: "PRODUCT",
      skills: [
        {
          name: "React & Next.js",
          level: "Advanced",
          projectApplied: "Journally note-taking app & Sara Universe portfolio",
          lessonsLearned:
            "Implemented Server-Side Rendering (SSR), integrated dynamic WYSIWYG editor packages, and designed scroll-driven 3D WebGL canvases using GSAP and React Three Fiber.",
          description:
            "Virtual DOM reconciliation, state selectors, custom React hooks, Next.js app router, and performance optimisation via code splitting and lazy loading.",
        },
        {
          name: "TypeScript",
          level: "Advanced",
          projectApplied: "All full-stack projects",
          lessonsLearned:
            "Enforced strict typing across API boundaries, authored shared type libraries, and eliminated entire classes of runtime errors through discriminated unions and generic constraints.",
          description:
            "Strict type inference, utility types, generic constraints, declaration merging, and type-safe API contract modelling.",
        },
        {
          name: "Flutter & Dart",
          level: "Advanced",
          projectApplied: "Acara Event Booking System",
          lessonsLearned:
            "Designed a clean multi-adapter network layout, solved data structure inconsistencies across Ticketmaster & Eventbrite APIs, and optimised reactive view states with Riverpod/Bloc.",
          description:
            "Declarative UI construction, mobile systems deployment, asynchronous API bindings, custom platform channels, and Dart performance profiling.",
        },
        {
          name: "Node.js & Express.js",
          level: "Advanced",
          projectApplied: "Journally REST Backend",
          lessonsLearned:
            "Architected secure JWT authentication, established CORS access regulations, configured Multer stream upload pipelines, and designed unit test suites for REST routes.",
          description:
            "Event-driven async middleware chains, REST route orchestration, multi-threaded worker pooling, and server diagnostics.",
        },
        {
          name: "PostgreSQL & Supabase",
          level: "Intermediate",
          projectApplied: "Acara database configuration",
          lessonsLearned:
            "Managed PostgreSQL schemas, designed row-level security (RLS) policies, built remote client connection hooks, and configured edge function handlers.",
          description:
            "Relational database constraints, stored procedures, secure row-level policies, REST mapping, and real-time triggers.",
        },
        {
          name: "REST APIs",
          level: "Advanced",
          projectApplied: "Journally & Acara multi-endpoint integrations",
          lessonsLearned:
            "Designed versioned API contracts, handled rate limiting and pagination across third-party sources, and documented endpoints with Postman collections.",
          description:
            "RESTful resource modelling, HTTP semantics, authentication flows, error boundary design, and API documentation.",
        },
      ],
    },
    {
      category: "AI Engineering",
      label: "AI / ML",
      skills: [
        {
          name: "Python",
          level: "Intermediate",
          projectApplied: "ML experiments & data pipeline scripts",
          lessonsLearned:
            "Built data preprocessing pipelines, scripted model evaluation loops, and integrated Python microservices with TypeScript frontends via REST.",
          description:
            "Scripting, data wrangling with Pandas/NumPy, REST microservices with FastAPI/Flask, and ML model lifecycle management.",
        },
        {
          name: "Scikit-Learn",
          level: "Intermediate",
          projectApplied: "Similarity search experiments",
          lessonsLearned:
            "Trained and evaluated classification and regression models, applied feature engineering pipelines, and used cross-validation to prevent overfitting.",
          description:
            "Supervised & unsupervised learning, pipelines, cross-validation, hyperparameter tuning, and model evaluation metrics.",
        },
        {
          name: "Embeddings & Similarity Search",
          level: "Intermediate",
          projectApplied: "Semantic search prototypes",
          lessonsLearned:
            "Generated text embeddings with sentence-transformers, built cosine similarity search indices, and explored approximate nearest-neighbour (ANN) approaches.",
          description:
            "Vector representations, cosine similarity, FAISS/ANN indices, embedding model selection, and semantic retrieval.",
        },
        {
          name: "Prompt Engineering",
          level: "Intermediate",
          projectApplied: "LLM integration experiments",
          lessonsLearned:
            "Designed few-shot and chain-of-thought prompts, iterated on system instruction formats, and benchmarked output quality across multiple models.",
          description:
            "Few-shot prompting, chain-of-thought reasoning, system instruction design, output parsing, and model behaviour evaluation.",
        },
        {
          name: "RAG Systems",
          level: "Beginner / Intermediate",
          projectApplied: "Document Q&A proof-of-concept",
          lessonsLearned:
            "Implemented retrieval-augmented generation pipelines combining vector stores with LLM completions, and evaluated chunk-size tradeoffs for retrieval accuracy.",
          description:
            "Retrieval-augmented generation architecture, document chunking, vector store integration, context injection, and answer grounding.",
        },
        {
          name: "LLM Integrations",
          level: "Intermediate",
          projectApplied: "AI-powered feature prototypes",
          lessonsLearned:
            "Integrated OpenAI and open-source LLM APIs, managed token budgets, and structured streaming responses for real-time UI updates.",
          description:
            "API integration, token management, streaming completions, function calling, and multi-turn conversation state.",
        },
        {
          name: "AI Agents & Semantic Indexing",
          level: "Beginner / Intermediate",
          projectApplied: "Autonomous workflow prototypes",
          lessonsLearned:
            "Explored context orchestrations, agentic tool invocations, and vector database structures for self-evaluating agents.",
          description:
            "Self-evaluating agent pipelines, tool use schemas, vector stores query planning, and document semantic mapping.",
        },
      ],
    },
    {
      category: "Interactive Experiences",
      label: "CREATIVE",
      skills: [
        {
          name: "Three.js & React Three Fiber",
          level: "Intermediate",
          projectApplied: "Sara Universe portfolio — scroll-driven 3D scenes",
          lessonsLearned:
            "Built scroll-bound 3D camera rigs, optimised WebGL draw calls, and blended 3D canvas layers with DOM UI for seamless hybrid experiences.",
          description:
            "WebGL scene graphs, camera controls, lighting models, shader materials, performance profiling, and React Three Fiber declarative bindings.",
        },
        {
          name: "Framer Motion",
          level: "Advanced",
          projectApplied: "Sara Universe portfolio & Journally UI",
          lessonsLearned:
            "Designed orchestrated entrance sequences, built AnimatePresence transition states, and fine-tuned spring physics for natural-feeling micro-interactions.",
          description:
            "Layout animations, AnimatePresence, motion values, scroll-linked animations, and gesture-driven interactions.",
        },
        {
          name: "Figma UI / UX",
          level: "Intermediate / Advanced",
          projectApplied: "Acara & Journally interface design",
          lessonsLearned:
            "Maintained component library symbols, designed detailed dark/light responsive layout prototypes, mapped interactive user journeys, and compiled UI modernisation guides.",
          description:
            "Vector illustration grids, interactive prototyping variables, auto-layout hierarchies, component libraries, and developer handover specifications.",
        },
        {
          name: "UI/UX & Responsive Design",
          level: "Advanced",
          projectApplied: "All product interfaces",
          lessonsLearned:
            "Applied fashion editorial visual principles — neutral dark spaces, champagne gold accents, wide-set typography — to create premium, conversion-focused user experiences.",
          description:
            "Responsive grid systems, accessibility standards, design tokens, dark mode theming, and cross-device layout testing.",
        },
        {
          name: "Animation Systems",
          level: "Advanced",
          projectApplied: "Sara Universe portfolio",
          lessonsLearned:
            "Used custom CSS variable theme models, implemented glassmorphism panels, designed cursor-following ring reactions, and crafted GSAP scroll-bound cameras.",
          description:
            "Flexbox/CSS Grid, hardware-accelerated transforms, GSAP timelines, SVG path animations, and responsive media query systems.",
        },
        {
          name: "Advanced GLSL Shaders & WebGPU",
          level: "Beginner / Intermediate",
          projectApplied: "Interactive WebGL experiments",
          lessonsLearned:
            "Studied procedural noise vectors, vertex morphing, and fragment shader calculations for customized fluid physics rendering.",
          description:
            "Procedural noise, custom fragment & vertex shaders, GPU pipelines, and shader-based physics simulation.",
        },
      ],
    },
    {
      category: "Engineering Practices",
      label: "PRACTICES",
      skills: [
        {
          name: "Git & GitHub",
          level: "Advanced",
          projectApplied: "All repositories",
          lessonsLearned:
            "Resolved git tracking issues, managed feature branching strategies, resolved merge conflicts across teams, and structured semantic commit histories.",
          description:
            "Git rebase, branch merge protocols, repository pruning, SSH key management, and PR review workflows.",
        },
        {
          name: "Testing (Jest & RTL)",
          level: "Intermediate / Advanced",
          projectApplied: "Journally backend & frontend test suites",
          lessonsLearned:
            "Achieved 80%+ unit test coverage, stabilised database leak issues in test environments, and resolved React state update warnings in RTL test suites.",
          description:
            "Unit & integration testing, mocking strategies, React Testing Library queries, coverage reporting, and SonarQube quality gate integration.",
        },
        {
          name: "Postman & API Testing",
          level: "Advanced",
          projectApplied: "Journally & Acara REST endpoints",
          lessonsLearned:
            "Built comprehensive Postman collections with environment variables, designed automated test scripts for endpoint validation, and documented API contracts for team handover.",
          description:
            "Request collections, environment configurations, test scripting, mock servers, and API contract documentation.",
        },
        {
          name: "Docker",
          level: "Beginner / Intermediate",
          projectApplied: "Backend service containerisation",
          lessonsLearned:
            "Containerised Node.js services, managed multi-container setups with Docker Compose, and resolved environment-consistency issues between development and production.",
          description:
            "Docker images, Dockerfile authoring, container orchestration, volume management, and environment parity.",
        },
        {
          name: "Agile & System Design",
          level: "Intermediate",
          projectApplied: "Internship at 10Pearls (Journally)",
          lessonsLearned:
            "Participated in sprint planning, standups, and retrospectives; designed system architecture diagrams to communicate technical decisions to non-engineering stakeholders.",
          description:
            "Sprint ceremonies, backlog refinement, system architecture diagramming, scalability trade-off analysis, and cross-functional collaboration.",
        },
        {
          name: "WebAssembly (Wasm) & Rust",
          level: "Beginner",
          projectApplied: "High-performance processing sandboxes",
          lessonsLearned:
            "Explored compiling CPU-heavy scripts like audio synthesis or encryption into web clients to achieve desktop-level runtime speeds.",
          description:
            "Rust compiling to Wasm targets, linear memory bindings, Web API interop, and off-main-thread processing.",
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
              {cat.label}
            </button>
          ))}
        </div>

        {/* Catalog List / Skills list */}
        <div className="md:col-span-8 grid grid-cols-1 gap-4 md:pl-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-3"
            >
              {/* Category heading */}
              <p className="font-display text-[8px] tracking-[0.3em] text-luxury-gold uppercase mb-1">
                {libraryData[activeCategory].category}
              </p>

              {libraryData[activeCategory].skills.map((skill) => {
                const isSelected = activeSkill?.name === skill.name;
                return (
                  <div
                    key={skill.name}
                    onClick={() => setActiveSkill(isSelected ? null : skill)}
                    className={`glass-panel p-5 rounded-sm cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? "border-luxury-gold bg-luxury-white/5"
                        : "hover:border-luxury-gold/30 hover:bg-luxury-white/5"
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
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
