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
  size: string;
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
    size: "md:col-span-1",
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
    size: "md:col-span-1",
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
    size: "md:col-span-1",
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
    size: "md:col-span-1",
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
    size: "md:col-span-2",
    accentEmoji: "🌀",
  },
];

export default function RealmArchive() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const expanded = ITEMS.find((i) => i.id === expandedId) ?? null;

  return (
    <div className="min-h-screen py-24 px-6 sm:px-12 md:px-24 max-w-6xl mx-auto relative z-10 flex flex-col justify-center select-none">
      {/* Realm Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="mb-16 text-center md:text-left"
      >
        <span className="font-serif italic text-2xl sm:text-3xl text-luxury-gold block mb-2">
          Realm VI
        </span>
        <h2 className="font-display font-medium text-4xl sm:text-5xl text-luxury-white tracking-widest uppercase">
          The Archive
        </h2>
        <div className="w-12 h-[1px] bg-luxury-gold mt-4 mx-auto md:mx-0" />
        <p className="font-sans text-xs text-luxury-muted mt-4">
          Personal curiosities, creative sparks, and inspirations that fuel the work.
        </p>
      </motion.div>

      {/* Scrapbook masonry-ish grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
        {ITEMS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.92, rotate: parseFloat(item.rotation) || 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              onClick={() => setExpandedId(item.id)}
              className={`glass-panel p-6 sm:p-8 rounded-sm shadow-2xl cursor-pointer flex flex-col justify-between min-h-[260px] group ${item.size} ${item.rotation} transition-all duration-500`}
            >
              {/* Card header */}
              <div>
                <div className="flex justify-between items-center mb-5">
                  <div className="flex items-center gap-2 text-luxury-gold">
                    <Icon className="w-4 h-4" />
                    <span className="font-display text-[8.5px] tracking-[0.2em] uppercase font-bold">
                      {item.type}
                    </span>
                  </div>
                  <span className="text-lg leading-none" role="img">{item.accentEmoji}</span>
                </div>

                <h3 className="font-serif italic font-light text-2xl text-luxury-white mb-3 group-hover:text-luxury-gold transition-colors duration-400">
                  {item.title}
                </h3>
                <p className="font-sans font-light text-xs leading-relaxed text-luxury-muted line-clamp-3">
                  {item.content}
                </p>
              </div>

              {/* Card footer */}
              <div className="border-t border-luxury-gold/10 pt-4 mt-5 flex items-center justify-between">
                <span className="font-display text-[7.5px] tracking-[0.15em] text-luxury-gold uppercase font-semibold">
                  {item.detail}
                </span>
                <span className="font-display text-[7px] tracking-[0.15em] text-luxury-muted/50 uppercase group-hover:text-luxury-gold transition-colors duration-300">
                  READ →
                </span>
              </div>
            </motion.div>
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
            >
              {/* Close */}
              <button
                onClick={() => setExpandedId(null)}
                className="absolute top-4 right-4 text-luxury-muted hover:text-luxury-gold transition-colors border border-luxury-white/5 hover:border-luxury-gold/30 rounded-full p-1.5"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Content */}
              <div className="flex items-center gap-3 mb-6">
                <expanded.icon className="w-5 h-5 text-luxury-gold" />
                <span className="font-display text-[9px] tracking-[0.3em] text-luxury-gold uppercase font-bold">
                  {expanded.type}
                </span>
              </div>

              <h3 className="font-serif italic font-light text-4xl text-luxury-white mb-4">{expanded.title}</h3>
              <p className="font-sans font-light text-sm leading-relaxed text-luxury-muted mb-8">{expanded.content}</p>

              <div className="border-t border-luxury-gold/10 pt-4">
                <span className="font-display text-[8px] tracking-[0.2em] text-luxury-gold uppercase font-semibold">
                  {expanded.detail}
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
