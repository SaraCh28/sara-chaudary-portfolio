"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function RealmGateway() {
  const nameRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(t);
  }, []);

  const NAME = "SARA CHAUDARY";
  const letters = NAME.split("");

  const titleContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.065, delayChildren: 0.5 },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 60, rotateX: -60, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: { duration: 1.1, ease: [0.215, 0.61, 0.355, 1] },
    },
  };

  return (
    <div className="min-h-screen flex flex-col justify-center relative overflow-hidden select-none">

      {/* Ambient background radial */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
          style={{
            background: "radial-gradient(ellipse at center, rgba(197,168,128,0.055) 0%, transparent 65%)"
          }}
        />
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-32 h-32 border-l border-t border-luxury-gold/10" />
        <div className="absolute top-0 right-0 w-32 h-32 border-r border-t border-luxury-gold/10" />
        <div className="absolute bottom-0 left-0 w-32 h-32 border-l border-b border-luxury-gold/10" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-r border-b border-luxury-gold/10" />
      </div>

      {/* Main content container */}
      <div className="relative z-10 w-full px-6 sm:px-14 md:px-24 max-w-[1600px] mx-auto">

        {/* Overline category */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="flex items-center gap-4 mb-10"
        >
          <div className="w-12 h-[1px] bg-luxury-gold/50" />
          <span className="font-display font-semibold text-[9px] tracking-[0.4em] text-luxury-gold uppercase">
            Digital Portfolio · 2026
          </span>
        </motion.div>

        {/* Giant name typography with staggered letter animation */}
        <div className="overflow-hidden" ref={nameRef}>
          <motion.div
            variants={titleContainerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap"
            style={{ perspective: "800px" }}
          >
            {letters.map((char, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                className="font-serif italic font-light text-[clamp(3.2rem,10vw,9rem)] text-luxury-white leading-none tracking-tight"
                style={{
                  display: "inline-block",
                  marginRight: char === " " ? "clamp(0.3rem, 2vw, 1.2rem)" : "clamp(0.01rem, 0.3vw, 0.08rem)",
                  textShadow: "0 4px 20px rgba(197,168,128,0.08)",
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Two-column bottom section */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          {/* Role tagline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.5, ease: "easeOut" }}
            className="md:col-span-6 flex flex-col gap-3"
          >
            <h2 className="font-display font-medium text-xs sm:text-sm tracking-[0.35em] text-luxury-gold uppercase">
              Software Engineer
            </h2>
            <p className="font-sans font-medium text-lg text-luxury-white leading-relaxed max-w-xl">
              Building AI-Powered Web & Mobile Products
            </p>
            <p className="font-display text-[10px] tracking-[0.2em] text-luxury-muted uppercase">
              React • Flutter • AI Integrations • Interactive Digital Experiences
            </p>
          </motion.div>

          {/* Stat indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 2.0 }}
            className="md:col-span-6 flex flex-wrap items-center gap-6 md:justify-end"
          >
            {[
              { label: "Projects Shipped", value: "06" },
              { label: "Realms to Explore", value: "09" },
              { label: "Technologies", value: "15+" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-start md:items-center">
                <span className="font-serif italic text-3xl text-luxury-gold leading-none">{stat.value}</span>
                <span className="font-display text-[8px] tracking-[0.25em] text-luxury-muted uppercase mt-1">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Horizontal divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 1.9, ease: "easeOut" }}
          className="mt-10 h-[1px] bg-gradient-to-r from-transparent via-luxury-gold/30 to-transparent origin-left"
        />

        {/* Bottom strip: scroll cue + coordinates */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.4 }}
          className="mt-6 flex items-center justify-between"
        >
          <span className="font-display text-[8px] tracking-[0.3em] text-luxury-muted/60 uppercase hidden sm:block">
            THE SARA UNIVERSE · EST. 2026
          </span>
          <span className="font-display text-[8px] tracking-[0.25em] text-luxury-muted/40 uppercase font-mono hidden md:block">
            48.8°N · 2.3°E · ORBITAL LAYER 01
          </span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.5, 1] }}
        transition={{ repeat: Infinity, duration: 3, delay: 2.8, times: [0, 0.3, 0.6, 1] }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-10"
        data-cursor="explore"
      >
        <span className="font-display font-bold text-[8px] tracking-[0.35em] text-luxury-gold uppercase">
          SCROLL TO EXPLORE
        </span>
        <div className="flex flex-col gap-1 items-center">
          <div className="w-[1px] h-6 bg-gradient-to-b from-luxury-gold/60 to-transparent" />
          <ArrowDown className="w-3.5 h-3.5 text-luxury-gold" />
        </div>
      </motion.div>
    </div>
  );
}
