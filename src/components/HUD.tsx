"use client";

import React, { useEffect, useState } from "react";
import { Github, Linkedin, Mail, Volume2, VolumeX, ShieldAlert } from "lucide-react";

interface HUDProps {
  activeRealm: number;
  onNavigate: (index: number) => void;
}

const REALM_NAMES = [
  "Gateway",
  "Origin Story",
  "Hall of Experience",
  "Museum Exhibits",
  "The Workshop",
  "The Library",
  "The Archive",
  "Observatory",
  "The Portal",
];

export default function HUD({ activeRealm, onNavigate }: HUDProps) {
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [fps, setFps] = useState<number>(60);
  const [lowPerf, setLowPerf] = useState<boolean>(false);

  // Audio Toggle
  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    window.dispatchEvent(new CustomEvent("audio-toggle-mute", { detail: { isMuted: newMuted } }));
  };

  // Performance Monitor
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
        setFps(currentFps);
        
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
        >
          <span className="font-serif italic font-medium text-xl sm:text-2xl tracking-[0.1em] text-luxury-gold group-hover:text-luxury-white transition-colors duration-500">
            Sara Chaudary
          </span>
          <span className="font-display font-medium text-[8px] sm:text-[9px] tracking-[0.3em] text-luxury-muted uppercase">
            Logic & Aesthetics
          </span>
        </div>

        {/* Quick Social & Resume Links (Recruiter Requirements < 10s) */}
        <div className="flex items-center gap-4 sm:gap-6">
          <a
            href="https://github.com/sarachaudary"
            target="_blank"
            rel="noopener noreferrer"
            className="text-luxury-muted hover:text-luxury-gold transition-colors duration-300 p-1"
            title="GitHub"
          >
            <Github className="w-4 h-4 sm:w-5 sm:h-5" />
          </a>
          <a
            href="https://linkedin.com/in/sara-chaudary"
            target="_blank"
            rel="noopener noreferrer"
            className="text-luxury-muted hover:text-luxury-gold transition-colors duration-300 p-1"
            title="LinkedIn"
          >
            <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
          </a>
          <a
            href="mailto:s.chaudary@live.com"
            className="hidden sm:inline text-luxury-muted hover:text-luxury-gold transition-colors duration-300 p-1"
            title="Email"
          >
            <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
          </a>
          <a
            href="/resume.pdf"
            download="Sara_Chaudary_Resume.pdf"
            className="hidden sm:inline-block font-display font-semibold text-[10px] tracking-[0.2em] border border-luxury-gold/30 hover:border-luxury-gold bg-luxury-bg/40 px-3 py-1.5 rounded-sm text-luxury-gold hover:text-luxury-white transition-all duration-300"
            title="Download Resume"
          >
            RESUME.PDF
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="sm:hidden text-luxury-muted hover:text-luxury-gold transition-colors duration-300 p-1"
            title="View Resume"
          >
            <span className="font-display font-bold text-[9px] tracking-[0.1em] border border-luxury-gold/30 px-2 py-1 rounded-sm text-luxury-gold">CV</span>
          </a>
          <button
            onClick={() => onNavigate(8)}
            className="font-display font-semibold text-[10px] tracking-[0.2em] bg-luxury-gold hover:bg-luxury-gold-glow text-luxury-bg px-3 py-1.5 rounded-sm transition-all duration-300 shadow-lg shadow-luxury-gold/10"
          >
            HIRE
          </button>
        </div>
      </header>

      {/* Center Left Sidebar: Navigation Indices (Floating Museum Catalog Index) */}
      <div className="absolute left-6 sm:left-10 top-1/2 -translate-y-1/2 flex flex-col gap-4 pointer-events-auto">
        {REALM_NAMES.map((name, idx) => {
          const isActive = activeRealm === idx;
          return (
            <div
              key={idx}
              onClick={() => onNavigate(idx)}
              className="group flex items-center gap-3 cursor-pointer py-1"
            >
              {/* Dot */}
              <div 
                className="w-1.5 h-1.5 rounded-full transition-all duration-500" 
                style={{
                  backgroundColor: isActive ? "#c5a880" : "rgba(138, 138, 147, 0.3)",
                  transform: isActive ? "scale(1.5)" : "scale(1)",
                  boxShadow: isActive ? "0 0 8px #c5a880" : "none"
                }}
              />
              
              {/* Index & Name */}
              <div className="flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <span className="font-display text-[8px] text-luxury-gold tracking-[0.15em] font-semibold leading-none">
                  0{idx}
                </span>
                <span className="font-serif italic text-[10px] text-luxury-white whitespace-nowrap leading-none mt-0.5">
                  {name}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Footer Controls */}
      <footer className="w-full flex items-center justify-between pointer-events-auto mt-auto">
        {/* Active Section Label indicator */}
        <div className="flex items-center gap-3">
          <span className="font-display text-[11px] font-bold text-luxury-gold tracking-[0.25em]">
            0{activeRealm}
          </span>
          <div className="w-8 h-[1px] bg-luxury-gold/30" />
          <span className="font-serif italic text-sm text-luxury-white tracking-[0.05em] capitalize animate-fade-in">
            {REALM_NAMES[activeRealm]}
          </span>
        </div>

        {/* System Controls */}
        <div className="flex items-center gap-6">
          {/* Performance Warning if active */}
          {lowPerf && (
            <div className="flex items-center gap-2 text-[9px] font-display text-amber-500 tracking-[0.1em] border border-amber-500/20 bg-amber-500/5 px-2 py-1 rounded">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>ECO MODE</span>
            </div>
          )}

          {/* FPS Monitor */}
          <div className="hidden md:flex items-baseline gap-1 text-[9px] font-display text-luxury-muted tracking-[0.15em]">
            <span>ENGINE:</span>
            <span className={lowPerf ? "text-amber-500" : "text-luxury-gold"}>
              {fps} FPS
            </span>
          </div>

          {/* Audio Synthesizer Control */}
          <button
            onClick={toggleMute}
            className="flex items-center gap-3 group text-luxury-muted hover:text-luxury-gold transition-colors duration-300 py-1 px-2 border border-luxury-gold/10 hover:border-luxury-gold/30 rounded-sm bg-luxury-bg/30"
          >
            <span className="font-display font-medium text-[9px] tracking-[0.2em]">
              SOUND: {isMuted ? "OFF" : "ON"}
            </span>
            {isMuted ? (
              <VolumeX className="w-4 h-4 transition-transform group-hover:scale-110" />
            ) : (
              <div className="flex items-end gap-[2px] h-3 w-4">
                <div className="audio-bar w-[2px] bg-luxury-gold animate-[pulse_0.4s_infinite_alternate]" style={{ height: "40%" }} />
                <div className="audio-bar w-[2px] bg-luxury-gold animate-[pulse_0.6s_infinite_alternate_0.1s]" style={{ height: "100%" }} />
                <div className="audio-bar w-[2px] bg-luxury-gold animate-[pulse_0.5s_infinite_alternate_0.2s]" style={{ height: "70%" }} />
                <div className="audio-bar w-[2px] bg-luxury-gold animate-[pulse_0.7s_infinite_alternate_0.05s]" style={{ height: "50%" }} />
              </div>
            )}
          </button>
        </div>
      </footer>
    </div>
  );
}
