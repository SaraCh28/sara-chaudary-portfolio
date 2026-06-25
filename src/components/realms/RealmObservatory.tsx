"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Sparkles } from "lucide-react";

interface ConstellationStar {
  id: number;
  name: string;
  field: string;
  description: string;
  coordinates: string; // for editorial aesthetics
}

export default function RealmObservatory() {
  const [activeStar, setActiveStar] = useState<number>(0);

  const futureRoadmap: ConstellationStar[] = [
    {
      id: 0,
      name: "Advanced GLSL Shaders & WebGPU",
      field: "Graphics & Interactive Math",
      description: "Moving beyond basic 3D structures. Studying procedural noise vectors, vertex morphing, and fragment shader processing to code custom fluid physics and raymarching directly in the browser.",
      coordinates: "RA 12h 45m / Dec +38°"
    },
    {
      id: 1,
      name: "AI Agents & Semantic Indexing",
      field: "Artificial Intelligence Architecture",
      description: "Exploring context orchestrations, agentic tool invocations, and vector database structures. Designing self-evaluating agents that can parse documentation, categorize notes, and construct workflows autonomously.",
      coordinates: "RA 14h 22m / Dec -15°"
    },
    {
      id: 2,
      name: "WebAssembly (Wasm) & Rust",
      field: "Systems Engineering on Web",
      description: "Compiling CPU-heavy operations (like audio synthesis, cryptography, or live image compressions) into Wasm modules using Rust to achieve true desktop-level processing speeds on mobile and web clients.",
      coordinates: "RA 18h 05m / Dec +42°"
    }
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
          Realm VII
        </span>
        <h2 className="font-display font-medium text-4xl sm:text-5xl text-luxury-white tracking-widest uppercase">
          The Observatory
        </h2>
        <div className="w-12 h-[1px] bg-luxury-gold mt-4 mx-auto md:mx-0" />
      </motion.div>

      {/* Constellation Interface */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch max-w-4xl mx-auto w-full">
        {/* Star Selectors (Roadmap Nodes) */}
        <div className="md:col-span-5 flex flex-col gap-4 justify-center">
          {futureRoadmap.map((star) => {
            const isActive = activeStar === star.id;
            return (
              <div
                key={star.id}
                onClick={() => setActiveStar(star.id)}
                className={`glass-panel p-5 rounded-sm cursor-pointer transition-all duration-300 border flex items-center justify-between group ${
                  isActive ? "border-luxury-gold bg-luxury-white/5" : "border-transparent hover:border-luxury-gold/25"
                }`}
              >
                <div>
                  <span className="font-display text-[8px] tracking-[0.2em] text-luxury-gold block mb-1 uppercase font-bold">
                    Roadmap Star 0{star.id + 1}
                  </span>
                  <h3 className="font-serif italic text-lg text-luxury-white group-hover:text-luxury-gold transition-colors duration-300">
                    {star.name.split(" & ")[0]}
                  </h3>
                </div>
                <div className="relative flex items-center justify-center shrink-0 ml-4">
                  <div 
                    className="w-2.5 h-2.5 rounded-full transition-all duration-500" 
                    style={{
                      backgroundColor: isActive ? "#c5a880" : "rgba(138, 138, 147, 0.3)",
                      transform: isActive ? "scale(1.3)" : "scale(1)",
                      boxShadow: isActive ? "0 0 10px #c5a880" : "none"
                    }}
                  />
                  {isActive && (
                    <div className="absolute w-6 h-6 rounded-full border border-luxury-gold/40 animate-ping pointer-events-none" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Star Details Card */}
        <div className="md:col-span-7 flex flex-col justify-center">
          <div className="glass-panel p-8 rounded-sm relative overflow-hidden min-h-[250px] flex flex-col justify-between">
            {/* Ambient subtle glow background */}
            <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-luxury-gold/5 blur-3xl pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeStar}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <Compass className="w-4 h-4 text-luxury-gold" />
                    <span className="font-display text-[9px] tracking-[0.2em] text-luxury-gold uppercase font-bold">
                      {futureRoadmap[activeStar].field}
                    </span>
                  </div>

                  <h3 className="font-serif italic font-light text-3xl sm:text-4xl text-luxury-white mb-4 leading-tight">
                    {futureRoadmap[activeStar].name}
                  </h3>

                  <p className="font-sans font-light text-xs sm:text-sm leading-relaxed text-luxury-muted mb-6">
                    {futureRoadmap[activeStar].description}
                  </p>
                </div>

                <div className="border-t border-luxury-gold/10 pt-4 flex items-center justify-between">
                  <span className="font-display text-[8px] tracking-[0.15em] text-luxury-gold uppercase">
                    SKY SECTOR: {futureRoadmap[activeStar].coordinates}
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-luxury-gold/40" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
