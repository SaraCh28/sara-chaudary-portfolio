"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Briefcase, Cpu, Layers, BookOpen } from "lucide-react";

interface ExperienceItem {
  id: string;
  exhibitNumber: string;
  themeTitle: string;
  company: string;
  role: string;
  period: string;
  tech: string[];
  spotlightColor: string;
  glowColor: string;
  bullets: string[];
  reflection: string;
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: "flyrank",
    exhibitNumber: "EXHIBIT 01",
    themeTitle: "THE LEARNING MACHINE",
    company: "FlyRank",
    role: "Machine Learning Engineer Intern",
    period: "2026",
    tech: ["Python", "TensorFlow", "FastAPI", "Pandas", "Scikit-Learn", "Docker", "ML Pipelines"],
    spotlightColor: "rgba(197, 168, 128, 0.08)", // Gold spotlight
    glowColor: "rgba(239, 68, 68, 0.15)",        // Subtle red hover glow
    bullets: [
      "Recommendation Systems",
      "Machine Learning Pipelines",
      "Data Processing & Feature Engineering",
      "Production AI Workflows & API Inference"
    ],
    reflection: "Learned how machine learning systems behave outside notebooks and inside real products."
  },
  {
    id: "10pearls",
    exhibitNumber: "EXHIBIT 02",
    themeTitle: "THE BUILDER'S WORKSHOP",
    company: "10Pearls",
    role: "MERN Stack Developer Intern",
    period: "2025",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT Auth", "TailwindCSS", "Git"],
    spotlightColor: "rgba(197, 168, 128, 0.08)", // Gold spotlight
    glowColor: "rgba(239, 68, 68, 0.15)",        // Subtle red hover glow
    bullets: [
      "Full-stack Web Applications",
      "REST APIs & Authentication Middleware",
      "Database Modeling & Performance Queries",
      "Collaborative Team Git & Scrum Workflows"
    ],
    reflection: "Learned how engineering teams transform ideas into production software."
  }
];

export default function RealmCorridor() {
  const [activeItem, setActiveItem] = useState<ExperienceItem | null>(null);

  // Dispatch lock-scroll event when modal changes
  useEffect(() => {
    const lock = activeItem !== null;
    window.dispatchEvent(new CustomEvent("lock-scroll", { detail: { lock } }));
    return () => {
      window.dispatchEvent(new CustomEvent("lock-scroll", { detail: { lock: false } }));
    };
  }, [activeItem]);

  return (
    <div className="min-h-screen py-24 px-6 sm:px-12 md:px-24 max-w-6xl mx-auto relative z-10 flex flex-col justify-center select-none">
      
      {/* Realm Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="mb-20 text-center md:text-left"
      >
        <span className="font-serif italic text-2xl sm:text-3xl text-luxury-gold block mb-2">
          Realm II
        </span>
        <h2 className="font-display font-medium text-4xl sm:text-5xl text-luxury-white tracking-widest uppercase">
          Hall of Experience
        </h2>
        <div className="w-12 h-[1px] bg-luxury-gold mt-4 mx-auto md:mx-0" />
        <p className="font-sans text-xs sm:text-sm text-luxury-muted mt-4 max-w-sm">
          Rare artifacts of professional apprenticeships, displayed under gallery spotlights.
        </p>
      </motion.div>

      {/* Two Illuminated Exhibits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 max-w-4xl mx-auto w-full items-stretch">
        {EXPERIENCES.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: idx * 0.2 }}
            onClick={() => setActiveItem(item)}
            className="group relative glass-panel rounded-sm cursor-pointer p-8 sm:p-10 flex flex-col justify-between min-h-[380px] overflow-hidden transition-all duration-500"
            style={{
              // Custom inline styles for spotlight and red hover glow custom properties
              backgroundImage: `radial-gradient(circle at 50% 0%, ${item.spotlightColor} 0%, transparent 60%)`,
            }}
            whileHover={{
              borderColor: "rgba(239, 68, 68, 0.25)",
              boxShadow: `0 20px 50px rgba(0, 0, 0, 0.6), 0 0 35px ${item.glowColor}, inset 0 1px 0 rgba(255, 255, 255, 0.05)`,
            }}
          >
            {/* Visual spotlight cone indicator */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-luxury-gold/5 blur-3xl pointer-events-none group-hover:bg-red-500/5 transition-all duration-500" />
            
            {/* Spotlight Accent Dot */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-luxury-gold gold-glow group-hover:bg-red-500 group-hover:shadow-[0_0_12px_#ef4444] transition-all duration-500" />

            {/* Exhibit Metadata */}
            <div>
              <div className="flex justify-between items-center mb-8">
                <span className="font-display text-[9px] tracking-[0.25em] text-luxury-gold uppercase border border-luxury-gold/25 px-2 py-0.5 rounded-sm">
                  {item.exhibitNumber}
                </span>
                <span className="font-serif italic text-xs text-luxury-muted">
                  {item.period}
                </span>
              </div>

              <span className="font-display text-[8px] tracking-[0.2em] text-luxury-muted uppercase block mb-1">
                {item.company}
              </span>
              <h3 className="font-serif italic font-light text-3xl sm:text-4xl text-luxury-white mb-4 group-hover:text-luxury-gold transition-colors duration-300">
                {item.themeTitle}
              </h3>
              
              <div className="flex items-center gap-2 text-luxury-muted text-xs sm:text-sm font-sans font-light border-l border-luxury-gold/30 pl-3 mb-6">
                <Briefcase className="w-3.5 h-3.5 text-luxury-gold" />
                <span>{item.role}</span>
              </div>
            </div>

            {/* Tap to open signifier */}
            <div className="border-t border-luxury-gold/10 pt-5 mt-6 flex items-center justify-between">
              <span className="font-display font-semibold text-[9px] tracking-[0.2em] text-luxury-gold group-hover:text-luxury-white transition-colors duration-300">
                OPEN EXHIBIT CASE →
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold opacity-50 group-hover:opacity-100 group-hover:bg-red-500 transition-all duration-300" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Exhibit Details Modal */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 pointer-events-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setActiveItem(null)}
              className="absolute inset-0 bg-luxury-bg/92 backdrop-blur-xl cursor-pointer"
            />

            {/* Modal Detail Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-xl glass-panel-bright rounded-sm p-8 sm:p-12 overflow-y-auto scrollbar-none flex flex-col z-10 shadow-2xl border border-red-500/20"
              style={{
                backgroundImage: `radial-gradient(circle at 50% 0%, ${activeItem.spotlightColor} 0%, transparent 70%)`
              }}
            >
              {/* Golden/Red Accent top bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />

              {/* Close Button */}
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 text-luxury-muted hover:text-luxury-gold transition-colors duration-300 p-1.5 border border-luxury-white/5 hover:border-red-500/30 rounded-full"
                title="Close"
              >
                <X className="w-4 h-4 text-luxury-muted" />
              </button>

              {/* Header */}
              <div className="flex items-center gap-2.5 text-luxury-gold mb-6">
                <Cpu className="w-4 h-4 text-red-500" />
                <span className="font-display text-[9px] tracking-[0.3em] uppercase font-bold text-luxury-gold">
                  {activeItem.exhibitNumber} · APPRENTICESHIP DETECTOR
                </span>
              </div>

              {/* Content Title */}
              <div className="mb-8">
                <span className="font-display text-[9px] tracking-[0.25em] text-luxury-muted uppercase">
                  {activeItem.company} · {activeItem.period}
                </span>
                <h3 className="font-serif italic font-light text-4xl sm:text-5xl text-luxury-white mt-1 leading-tight">
                  {activeItem.themeTitle}
                </h3>
                <p className="font-display text-[10px] tracking-[0.18em] text-red-500/80 uppercase mt-2">
                  {activeItem.role}
                </p>
              </div>

              {/* Exploration Bullet Points */}
              <div className="mb-8">
                <h4 className="font-display font-bold text-[10px] tracking-[0.22em] text-luxury-gold uppercase mb-4 flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-red-500" />
                  {activeItem.id === "flyrank" ? "WHAT I EXPLORED" : "WHAT I BUILT"}
                </h4>
                <ul className="space-y-3 font-sans font-light text-sm text-luxury-white/95 pl-1.5">
                  {activeItem.bullets.map((bullet, index) => (
                    <li key={index} className="flex items-start gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-1.5 shadow-[0_0_8px_#ef4444]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What Changed / Reflection */}
              <div className="mb-8 p-5 bg-luxury-white/3 border-l-2 border-red-500 rounded-sm">
                <h4 className="font-display font-bold text-[9px] tracking-[0.22em] text-luxury-gold uppercase mb-2 flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-red-500" />
                  WHAT CHANGED
                </h4>
                <p className="font-serif italic text-sm sm:text-base text-luxury-white leading-relaxed">
                  "{activeItem.reflection}"
                </p>
              </div>

              {/* Tech Badges */}
              <div className="border-t border-luxury-gold/10 pt-6 flex flex-wrap gap-1.5">
                {activeItem.tech.map((t) => (
                  <span
                    key={t}
                    className="font-display text-[8.5px] tracking-[0.08em] text-luxury-white bg-luxury-white/5 border border-luxury-white/5 px-2 py-0.5 rounded-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
