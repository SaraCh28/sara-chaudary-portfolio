"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, PenTool, Layout, Cpu, RefreshCw } from "lucide-react";

interface Step {
  id: number;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  description: string;
  actions: string[];
}

export default function RealmWorkshop() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps: Step[] = [
    {
      id: 0,
      name: "Research",
      icon: Search,
      title: "Deconstructing the Domain",
      subtitle: "Understanding the problem before writing a line of code.",
      description: "Every project starts by mapping user workflows and technical gaps. I analyze architectural bottle-necks, read RFC specifications, and study competitor layouts to define constraints, data flow requirements, and scale limits.",
      actions: ["User Journey Mapping", "API Rate Limit & Latency Analysis", "Security Threat Modeling", "Schema Planning"],
    },
    {
      id: 1,
      name: "Design",
      icon: PenTool,
      title: "Interactive Architecture",
      subtitle: "Balancing luxury styling with clean design patterns.",
      description: "Visual logic dictates how users navigate data. I draft grid alignments in Figma, outline modular state containers, and plan interaction physics. Here, I ensure that typography hierarchies are balanced and the custom layout flows intuitively.",
      actions: ["Figma Typography & Grids", "Component Interface Design", "State Lifecycle Layout", "Micro-motion Design"],
    },
    {
      id: 2,
      name: "Prototype",
      icon: Layout,
      title: "Validating Assumptions",
      subtitle: "Iterating fast on core engineering mechanisms.",
      description: "I build localized sandboxes to stress-test high-risk integrations, such as low-latency voice engines, third-party pagination adapters, or custom canvas physics. This stage guarantees that our foundational features are viable before expansion.",
      actions: ["Proof of Concept Assemblies", "Isolated API Testing", "Canvas Render Detuning", "User Feedback Sweeps"],
    },
    {
      id: 3,
      name: "Build",
      icon: Cpu,
      title: "Production-Grade Assembly",
      subtitle: "Writing secure, dry, and highly-maintainable code.",
      description: "I construct the application layer using strict TypeScript typing, reusable custom hooks, secure session middlewares, and responsive styling. Code is written following DRY/SOLID design principles to guarantee long-term stability and clean code readouts.",
      actions: ["Strict TypeScript Typing", "Reusable Custom Hooks", "Secure JWT & CORS Pipelines", "Modular Component Partitioning"],
    },
    {
      id: 4,
      name: "Improve",
      icon: RefreshCw,
      title: "Refactoring & Optimizing",
      subtitle: "Securing quality gates and elevating frames per second.",
      description: "Software is never static. I measure frame-rates, run static analyses with SonarQube, analyze build bundle volumes, and write test suites to push code coverage. I refine the code until it runs at a locked 60 FPS and passes quality control.",
      actions: ["SonarQube Quality Inspections", "80%+ Unit Test Coverage", "Webpack/Vite Bundle Shrinking", "FPS & Detuning Profiles"],
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
          Realm IV
        </span>
        <h2 className="font-display font-medium text-4xl sm:text-5xl text-luxury-white tracking-widest uppercase">
          The Workshop
        </h2>
        <div className="w-12 h-[1px] bg-luxury-gold mt-4 mx-auto md:mx-0" />
      </motion.div>

      {/* Workshop Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-4xl mx-auto w-full">
        {/* Left Side: Step Selectors */}
        <div className="lg:col-span-4 flex flex-row lg:flex-col justify-between lg:justify-center gap-2 lg:gap-4 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-none border-b lg:border-b-0 lg:border-r border-luxury-gold/15 pr-0 lg:pr-6">
          {steps.map((step) => {
            const IconComponent = step.icon;
            const isActive = activeStep === step.id;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`flex items-center gap-3 py-2 px-3 sm:px-4 rounded-sm transition-all duration-300 font-display text-[10px] tracking-[0.2em] uppercase text-left whitespace-nowrap lg:whitespace-normal w-full border ${
                  isActive
                    ? "bg-luxury-gold text-luxury-bg border-luxury-gold shadow-lg shadow-luxury-gold/10"
                    : "text-luxury-muted hover:text-luxury-white border-transparent hover:border-luxury-gold/20 bg-luxury-white/5"
                }`}
              >
                <IconComponent className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">{step.name}</span>
              </button>
            );
          })}
        </div>

        {/* Right Side: Step Details */}
        <div className="lg:col-span-8 flex flex-col justify-between min-h-[300px] lg:pl-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col h-full justify-between"
            >
              <div>
                {/* Index Indicator */}
                <span className="font-display text-[9px] tracking-[0.3em] text-luxury-gold font-bold uppercase block mb-1">
                  PHASE 0{activeStep + 1}
                </span>

                <h3 className="font-serif italic font-light text-3xl sm:text-4xl text-luxury-white mb-2">
                  {steps[activeStep].title}
                </h3>
                <p className="font-display text-[9.5px] tracking-[0.15em] text-luxury-gold uppercase mb-6 leading-relaxed">
                  {steps[activeStep].subtitle}
                </p>

                <p className="font-sans font-light text-xs sm:text-sm leading-relaxed text-luxury-muted mb-8">
                  {steps[activeStep].description}
                </p>
              </div>

              {/* Action Bullets */}
              <div>
                <h4 className="font-display font-bold text-[8px] tracking-[0.25em] text-luxury-white uppercase mb-3 border-b border-luxury-gold/10 pb-2">
                  KEY ACTIVITIES
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {steps[activeStep].actions.map((action, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
                      <span className="font-display text-[9px] tracking-[0.1em] text-luxury-muted uppercase">
                        {action}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
