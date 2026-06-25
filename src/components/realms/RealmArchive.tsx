"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Eye, Palette, Lightbulb, Zap, X } from "lucide-react";

interface ArchiveItem {
  id: number;
  type: string;
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ComponentType<{ className?: string }>;
  content: string;
  detail: string;
  rotation: string;
  accentEmoji: string;
}

const ITEMS: ArchiveItem[] = [
  {
    id: 1,
    type: "POLAROID",
    title: "Fashion Sketches",
    icon: Palette,
    content:
      "Exploring the boundary between structural lines and body movement. I sketch minimal high-fashion silhouettes and drape contours. Design principles are universal — a clean seam pattern in tailoring maps directly to a clean modular pattern in engineering.",
    detail: "Style: Editorial · Avant-garde outlines",
    rotation: "-rotate-2 hover:rotate-0",
    accentEmoji: "✏️",
  },
  {
    id: 2,
    type: "NOTEBOOK",
    title: "Anime Aesthetics",
    icon: Eye,
    content:
      "Deeply inspired by the visual direction, framing, and pacing of animation auteurs (NGE, Cyberpunk: Edgerunners, Akira). Their mastery over color palettes, lighting gradients, and scene composition is a goldmine for web graphics, portal transitions, and layout motion.",
    detail: "Themes: Existentialism · Cyberpunk · Cinematic framing",
    rotation: "rotate-3 hover:rotate-0",
    accentEmoji: "⚡",
  },
  {
    id: 3,
    type: "MIXTAPE",
    title: "Atmospheric Soundscapes",
    icon: Music,
    content:
      "Coding in deep focus requires the right audio texture. My archive spans drone ambient, space synthwave, and industrial lo-fi. This same sonic research powered the Web Audio API synthesizer now humming underneath this very site.",
    detail: "Heavy Rotation: Hammock · Carbon Based Lifeforms",
    rotation: "-rotate-1 hover:rotate-0",
    accentEmoji: "🎵",
  },
  {
    id: 4,
    type: "CURIOSITY",
    title: "Strategic Chess",
    icon: Lightbulb,
    content:
      "A game of complete information, deep patience, and multi-step prediction. Chess puzzles mirror backend refactoring sessions — reduce cognitive complexity, anticipate state variations, and plan twelve moves ahead before touching a single line.",
    detail: "Current Focus: Sicilian Defense · King-side Endgames",
    rotation: "rotate-2 hover:rotate-0",
    accentEmoji: "♟",
  },
  {
    id: 5,
    type: "RANDOM",
    title: "The Curiosity Log",
    icon: Zap,
    content:
      "Things I've been reading lately: thermodynamics of black holes, how neural oscillators produce rhythm perception, and why the Golden Ratio surfaces in both nautilus shells and optimal binary tree balance. Curiosity is the engine.",
    detail: "Recent: Penrose Tiling · Fourier Transforms · Protein Folding",
    rotation: "-rotate-3 hover:rotate-0",
    accentEmoji: "🌀",
  },
];

export default function RealmArchive() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const expanded = ITEMS.find((i) => i.id === expandedId) ?? null;

  return (
    <section 
      id="archive" 
      aria-label="Creative Scrapbook Archive"
      className="py-20 px-6 sm:px-12 md:px-24 max-w-5xl mx-auto relative z-10 flex flex-col justify-center select-none"
    >
      {/* Realm Title — smaller, treated as an interlude */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-10 text-center md:text-left"
      >
        <span className="font-serif italic text-base sm:text-lg text-luxury-gold/70 block mb-1">
          Realm VI
        </span>
        <h2 className="font-display font-medium text-2xl sm:text-3xl text-luxury-white/80 tracking-widest uppercase">
          The Archive
        </h2>
        <div className="w-8 h-[1px] bg-luxury-gold/40 mt-3 mx-auto md:mx-0" />
        <p className="font-sans text-[10px] text-luxury-muted/60 mt-3">
          Personal curiosities &amp; creative sparks that fuel the work.
        </p>
      </motion.div>

      {/* Compact scrapbook grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 max-w-4xl mx-auto w-full">
        {ITEMS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              onClick={() => setExpandedId(item.id)}
              className={`glass-panel p-3 rounded-sm shadow-lg cursor-pointer flex flex-col justify-between group ${item.rotation} transition-all duration-500 hover:shadow-luxury-gold/10 text-left bg-transparent w-full`}
              style={{ minHeight: "130px" }}
              aria-label={`Open details for ${item.title}`}
            >
              {/* Card header */}
              <div className="w-full">
                <div className="flex justify-between items-center mb-2">
                  <Icon className="w-3 h-3 text-luxury-gold/70" aria-hidden="true" />
                  <span className="text-sm leading-none" role="img">{item.accentEmoji}</span>
                </div>
                <h3 className="font-serif italic font-light text-sm text-luxury-white/80 group-hover:text-luxury-gold transition-colors duration-300 leading-tight">
                  {item.title}
                </h3>
              </div>

              {/* Card footer */}
              <div className="mt-2 pt-2 border-t border-luxury-gold/8 w-full">
                <span className="font-mono text-[8px] tracking-[0.05em] text-luxury-muted/50 uppercase group-hover:text-luxury-gold/60 transition-colors duration-300">
                  READ →
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Expanded modal */}
      <AnimatePresence>
        {expanded && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 pointer-events-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setExpandedId(null)}
              className="absolute inset-0 bg-luxury-bg/88 backdrop-blur-lg cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative glass-panel-bright rounded-sm p-8 sm:p-12 max-w-lg w-full z-10 shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-labelledby="archive-modal-title"
            >
              {/* Close */}
              <button
                onClick={() => setExpandedId(null)}
                className="absolute top-4 right-4 text-luxury-muted hover:text-luxury-gold transition-colors border border-luxury-white/5 hover:border-luxury-gold/30 rounded-full p-1.5"
                aria-label="Close archive item details"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Content */}
              <div className="flex items-center gap-3 mb-6">
                <expanded.icon className="w-5 h-5 text-luxury-gold" aria-hidden="true" />
                <span className="font-mono text-[9px] tracking-[0.1em] text-luxury-gold uppercase font-bold">
                  {expanded.type}
                </span>
              </div>

              <h3 id="archive-modal-title" className="font-serif italic font-light text-4xl text-luxury-white mb-4">{expanded.title}</h3>
              <p className="font-sans font-light text-sm leading-relaxed text-luxury-muted mb-8">{expanded.content}</p>

              <div className="border-t border-luxury-gold/10 pt-4">
                <span className="font-mono text-[9px] tracking-[0.05em] text-luxury-gold uppercase font-semibold">
                  {expanded.detail}
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
