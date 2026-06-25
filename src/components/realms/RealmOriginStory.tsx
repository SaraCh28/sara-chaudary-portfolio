"use client";

import React from "react";
import { motion } from "framer-motion";

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  alignment: "left" | "right";
}

function TimelineItem({ year, title, description, alignment }: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`flex flex-col md:flex-row w-full mb-16 items-start ${
        alignment === "right" ? "md:flex-row-reverse" : ""
      }`}
      role="listitem"
    >
      {/* Year indicator */}
      <div className={`w-full md:w-1/2 flex ${alignment === "left" ? "md:justify-end md:pr-12" : "md:justify-start md:pl-12"} mb-2 md:mb-0`}>
        <span className="font-mono text-xl sm:text-2xl text-luxury-gold tracking-wider uppercase font-semibold">
          {year}
        </span>
      </div>

      {/* Vertical separator */}
      <div className="hidden md:flex flex-col items-center justify-start h-full pt-3 relative z-10" aria-hidden="true">
        <div className="w-2 h-2 rounded-full bg-luxury-gold gold-glow" />
        <div className="w-[1px] h-32 bg-luxury-gold/15 mt-2" />
      </div>

      {/* Story content */}
      <div className={`w-full md:w-1/2 ${alignment === "left" ? "md:pl-12" : "md:pr-12"}`}>
        <h3 className="font-display font-medium text-xs sm:text-sm tracking-[0.2em] text-luxury-white uppercase mb-2">
          {title}
        </h3>
        <p className="font-sans font-light text-xs sm:text-sm leading-relaxed text-luxury-muted max-w-md">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export default function RealmOriginStory() {
  const storyEvents = [
    {
      year: "2023",
      title: "The Awakening",
      description: "First contact with the coding realm. Discovered a passion for architecture and logic, finding structure in algorithms and clean functions.",
      alignment: "left" as const,
    },
    {
      year: "Learning Code",
      title: "Full-Stack Scaffolding",
      description: "Mastered full-stack MERN engineering, relational/non-relational database schemas, secure session management, and robust API endpoints.",
      alignment: "right" as const,
    },
    {
      year: "Learning Design",
      title: "Interactive Aesthetics",
      description: "Studied human-computer interaction, visual spacing systems, high-fashion layouts, and the physical principles of responsive motion. Believed interface is the conduit of emotion.",
      alignment: "left" as const,
    },
    {
      year: "Building Projects",
      title: "Engineering Solutions",
      description: "Shipped core systems: Journally (a voice-dictated secure MERN note-taking app) and Acara (a multi-adapter global event discovery mobile network built in Flutter).",
      alignment: "right" as const,
    },
    {
      year: "Seeking Impact",
      title: "The North Star",
      description: "Committed to creating digital products that run with 60 FPS performance, maintain structural security, and leave memorable emotional signatures.",
      alignment: "left" as const,
    },
  ];

  return (
    <section 
      id="origin" 
      aria-label="Origin Story Timeline"
      className="min-h-screen py-24 px-6 sm:px-12 md:px-24 max-w-5xl mx-auto relative z-10 flex flex-col justify-center select-none"
    >
      {/* Editorial Chapter Header + Biography */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="md:col-span-4 text-center md:text-left"
        >
          <span className="font-serif italic text-2xl sm:text-3xl text-luxury-gold block mb-2">
            Chapter I
          </span>
          <h2 className="font-display font-medium text-4xl sm:text-5xl text-luxury-white tracking-widest uppercase leading-snug">
            About
          </h2>
          <div className="w-12 h-[1px] bg-luxury-gold mt-4 mx-auto md:mx-0" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.25 }}
          className="md:col-span-8 flex flex-col gap-6 text-left border-l border-luxury-gold/20 pl-6 md:pl-8"
        >
          {/* Biography */}
          <div className="font-sans font-light text-sm sm:text-base leading-relaxed text-luxury-white/90 space-y-4 max-w-xl">
            <p>
              Software Engineering student building full-stack web and mobile applications with a strong focus on AI integration, interactive user experiences, and scalable architecture.
            </p>
            <p>
              Experienced in developing production-style applications using React, Flutter, Node.js, PostgreSQL, and Supabase. Built systems ranging from AI-assisted event discovery platforms and intelligent journaling applications to digital identity analysis tools that combine machine learning, embeddings, clustering, and graph-based visualization.
            </p>
            <p>
              Interested in the intersection of software engineering, design, and emerging AI technologies, with a growing focus on creating products that are both technically robust and visually engaging.
            </p>
          </div>

          {/* Education credentials card — visible to recruiters without opening resume */}
          <div className="border border-luxury-gold/20 bg-luxury-white/[0.03] rounded-sm px-5 py-4 max-w-xl">
            <span className="font-mono text-[8px] tracking-[0.15em] text-luxury-gold uppercase font-semibold block mb-3">
              Education
            </span>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
              <div>
                <h3 className="font-sans font-semibold text-sm text-luxury-white leading-snug">
                  BSc Software Engineering
                </h3>
                <p className="font-sans font-light text-xs text-luxury-white/70 mt-0.5">
                  COMSATS University Islamabad
                </p>
              </div>
              <div className="flex flex-col items-start sm:items-end gap-0.5 shrink-0">
                <span className="font-mono text-[9px] tracking-[0.08em] text-luxury-gold">
                  2022 – 2026
                </span>
                <span className="font-mono text-[9px] tracking-[0.05em] text-luxury-muted/70">
                  Lahore, Pakistan
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Timeline List */}
      <div className="relative mt-8" role="list" aria-label="Origin events timeline">
        {/* Central timeline line */}
        <div className="absolute left-0 md:left-1/2 top-4 bottom-0 w-[1px] bg-luxury-gold/10 -translate-x-1/2 hidden md:block" aria-hidden="true" />

        {storyEvents.map((event, idx) => (
          <TimelineItem
            key={idx}
            year={event.year}
            title={event.title}
            description={event.description}
            alignment={event.alignment}
          />
        ))}
      </div>
    </section>
  );
}
