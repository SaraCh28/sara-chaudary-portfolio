"use client";

import React, { useEffect, useState } from "react";
import { Github, Linkedin, Mail, Volume2, VolumeX } from "lucide-react";

interface HUDProps {
  activeRealm: number;
  onNavigate: (index: number) => void;
}

const REALM_NAMES = [
  "Home",
  "About",
  "Experience",
  "Projects",
  "Process",
  "Skills",
  "Interests",
  "Contact",
];

export default function HUD({ activeRealm, onNavigate }: HUDProps) {
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [lowPerf, setLowPerf] = useState<boolean>(false);

  // Audio Toggle
  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    window.dispatchEvent(new CustomEvent("audio-toggle-mute", { detail: { isMuted: newMuted } }));
  };

  // Performance Monitor (kept for canvas eco-mode, not shown in UI)
  useEffect(() => {
    let lastTime = performance.now();
    let frames = 0;
    let animationFrameId: number;
    let lowFpsCount = 0;

    const calcFps = () => {
      const now = performance.now();
      frames++;

      if (now >= lastTime + 1000) {
        const currentFps = Math.round((frames * 1000) / (now - lastTime));

        if (currentFps < 40) {
          lowFpsCount++;
          if (lowFpsCount >= 3 && !lowPerf) {
            setLowPerf(true);
            window.dispatchEvent(new CustomEvent("low-performance-mode", { detail: { low: true } }));
          }
        } else {
          lowFpsCount = 0;
        }

        frames = 0;
        lastTime = now;
      }
      animationFrameId = requestAnimationFrame(calcFps);
    };

    animationFrameId = requestAnimationFrame(calcFps);
    return () => cancelAnimationFrame(animationFrameId);
  }, [lowPerf]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex flex-col justify-between p-6 sm:p-10 select-none">
      {/* Top Bar Header */}
      <header className="w-full flex items-center justify-between pointer-events-auto">
        {/* Editorial Logo */}
        <div
          onClick={() => onNavigate(0)}
          className="group cursor-pointer flex flex-col items-start"
          role="button"
          aria-label="Go to home"
        >
          <span className="font-serif italic font-medium text-xl sm:text-2xl tracking-[0.1em] text-luxury-gold group-hover:text-luxury-white transition-colors duration-500">
            Sara Chaudary
          </span>
          <span className="font-display font-medium text-[8px] sm:text-[9px] tracking-[0.3em] text-luxury-muted uppercase">
            Software Engineer · AI &amp;
          </span>
        </div>

        {/* Quick Social & Resume Links */}
        <nav className="flex items-center gap-4 sm:gap-5" aria-label="Social and Resume Channels">
          <a
            href="https://github.com/SaraCh28"
            target="_blank"
            rel="noopener noreferrer"
            className="text-luxury-muted hover:text-luxury-gold transition-colors duration-300 p-1"
            aria-label="Sara Chaudary's GitHub Profile"
          >
            <Github className="w-4 h-4 sm:w-5 sm:h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/sara-chaudary-1337b7363/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-luxury-muted hover:text-luxury-gold transition-colors duration-300 p-1"
            aria-label="Sara Chaudary's LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
          </a>
          <a
            href="mailto:sarachaudary028@gmail.com"
            className="hidden sm:inline text-luxury-muted hover:text-luxury-gold transition-colors duration-300 p-1"
            aria-label="Send Email to Sara Chaudary"
          >
            <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
          </a>
          <a
            href="/Sara_Chaudary_Resume.docx"
            download="Sara_Chaudary_Resume.docx"
            className="hidden sm:inline-block font-mono font-semibold text-[10px] tracking-[0.15em] border border-luxury-gold/30 hover:border-luxury-gold bg-luxury-bg/40 px-3 py-1.5 rounded-sm text-luxury-gold hover:text-luxury-white transition-all duration-300"
            aria-label="Download Sara Chaudary's Resume"
          >
            RESUME
          </a>
          <a
            href="/Sara_Chaudary_Resume.docx"
            download="Sara_Chaudary_Resume.docx"
            className="sm:hidden text-luxury-muted hover:text-luxury-gold transition-colors duration-300 p-1"
            aria-label="Download Resume"
          >
            <span className="font-mono font-bold text-[9px] tracking-[0.1em] border border-luxury-gold/30 px-2 py-1 rounded-sm text-luxury-gold">CV</span>
          </a>
          <button
            onClick={() => onNavigate(7)}
            className="font-mono font-semibold text-[10px] tracking-[0.15em] bg-luxury-gold hover:bg-luxury-gold-glow text-luxury-bg px-3 py-1.5 rounded-sm transition-all duration-300 shadow-lg shadow-luxury-gold/10"
            aria-label="Navigate to contact section"
          >
            HIRE
          </button>
        </nav>
      </header>

      {/* Center Left Sidebar: Navigation Indices */}
      <nav className="absolute left-6 sm:left-10 top-1/2 -translate-y-1/2 flex flex-col gap-4 pointer-events-auto" aria-label="Section Navigation">
        {REALM_NAMES.map((name, idx) => {
          const isActive = activeRealm === idx;
          return (
            <button
              key={idx}
              onClick={() => onNavigate(idx)}
              className="group flex items-center gap-3 cursor-pointer py-1 bg-transparent border-none text-left focus:outline-none"
              aria-label={`Navigate to ${name}`}
              aria-current={isActive ? "page" : undefined}
            >
              {/* Dot */}
              <div
                className="w-1.5 h-1.5 rounded-full transition-all duration-500"
                style={{
                  backgroundColor: isActive ? "#c5a880" : "rgba(200, 200, 210, 0.35)",
                  transform: isActive ? "scale(1.5)" : "scale(1)",
                  boxShadow: isActive ? "0 0 8px #c5a880" : "none"
                }}
              />

              {/* Index & Name — visible on hover */}
              <div className="flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <span className="font-mono text-[8px] text-luxury-gold tracking-[0.1em] font-semibold leading-none">
                  0{idx}
                </span>
                <span className="font-serif italic text-[10px] text-luxury-white whitespace-nowrap leading-none mt-0.5">
                  {name}
                </span>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Bottom Footer */}
      <footer className="w-full flex items-center justify-between pointer-events-auto mt-auto">
        {/* Active Section Label */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] font-bold text-luxury-gold tracking-[0.1em]">
            0{activeRealm}
          </span>
          <div className="w-8 h-[1px] bg-luxury-gold/30" />
          <span className="font-serif italic text-sm text-luxury-white tracking-[0.05em] capitalize animate-fade-in">
            {REALM_NAMES[activeRealm]}
          </span>
        </div>

        {/* Right side: Open to Work badge + audio icon */}
        <div className="flex items-center gap-4">
          {/* Open to Work availability badge */}
          <div className="flex items-center gap-2 border border-luxury-gold/25 bg-luxury-gold/[0.06] px-3 py-1.5 rounded-sm">
            {/* Pulsing green dot */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="font-mono text-[9px] tracking-[0.08em] text-luxury-white/90 whitespace-nowrap">
              Open to work · Full-time
            </span>
          </div>

          {/* Minimal audio toggle */}
          <button
            onClick={toggleMute}
            className="text-luxury-muted hover:text-luxury-gold transition-colors duration-300 p-1.5 border border-luxury-gold/10 hover:border-luxury-gold/30 rounded-sm bg-luxury-bg/30"
            aria-label={isMuted ? "Unmute ambient audio" : "Mute ambient audio"}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-luxury-gold" />
            )}
          </button>
        </div>
      </footer>
    </div>
  );
}
