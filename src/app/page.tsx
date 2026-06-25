"use client";

import React, { useEffect, useState, useRef } from "react";
import Lenis from "lenis";
import confetti from "canvas-confetti";

// Components
import HUD from "@/components/HUD";
import UniverseCanvas from "@/components/UniverseCanvas";

// Realms
import RealmGateway from "@/components/realms/RealmGateway";
import RealmOriginStory from "@/components/realms/RealmOriginStory";
import RealmCorridor from "@/components/realms/RealmCorridor";
import RealmMuseum from "@/components/realms/RealmMuseum";
import RealmWorkshop from "@/components/realms/RealmWorkshop";
import RealmLibrary from "@/components/realms/RealmLibrary";
import RealmArchive from "@/components/realms/RealmArchive";
import RealmObservatory from "@/components/realms/RealmObservatory";
import RealmPortal from "@/components/realms/RealmPortal";

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeRealm, setActiveRealm] = useState<number>(0);
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Smooth Scrolling (Lenis) and Scroll bindings
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Track scroll events
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(progress);

      // Determine active realm by measuring which section center is closest
      const sections = document.querySelectorAll('[id^="realm-"]');
      let closestIdx = 0;
      let closestDist = Infinity;
      sections.forEach((section, idx) => {
        const rect = section.getBoundingClientRect();
        const centerOffset = Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2);
        if (centerOffset < closestDist) {
          closestDist = centerOffset;
          closestIdx = idx;
        }
      });
      setActiveRealm(closestIdx);
    };

    window.addEventListener("scroll", handleScroll);

    // Lock counter: multiple components can independently request scroll-lock.
    // Lenis only restarts when ALL locks are cleared (counter reaches 0).
    // This prevents a stale lenis.stop() from blocking scroll permanently.
    let lockCount = 0;
    const handleLockScroll = (e: Event) => {
      const lock = (e as CustomEvent).detail?.lock;
      if (lock) {
        lockCount++;
        lenis.stop();
        document.body.style.overflow = "hidden";
      } else {
        lockCount = Math.max(0, lockCount - 1);
        if (lockCount === 0) {
          lenis.start();
          document.body.style.overflow = "";
        }
      }
    };
    window.addEventListener("lock-scroll", handleLockScroll);
    
    // Initial calculation
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("lock-scroll", handleLockScroll);
      // Always restore scroll state on cleanup
      document.body.style.overflow = "";
      lenis.destroy();
    };
  }, []);

  // Recruiter fast-navigation jump trigger
  const navigateToRealm = (index: number) => {
    const section = document.getElementById(`realm-${index}`);
    if (section && lenisRef.current) {
      lenisRef.current.scrollTo(section, {
        duration: 1.6,
        lock: true,
      });
    }
  };

  // Easter Eggs: Console & Konami Code configuration
  useEffect(() => {
    // 1. Welcome banner inside Console logs
    console.log(
      "%cSARA CHAUDARY | THE SARA UNIVERSE",
      "color: #c5a880; font-family: 'Times New Roman', serif; font-size: 24px; font-weight: bold; font-style: italic; text-shadow: 0 0 10px rgba(197, 168, 128, 0.3);"
    );
    console.log(
      "%cWelcome, Recruiter. The system coordinates have been mapped below.",
      "color: #8a8a93; font-family: sans-serif; font-size: 13px;"
    );
    console.log(
      "%cEaster Egg: Type hireSara() inside this console prompt to unlock immediate transmission protocols.",
      "color: #8a7152; font-family: monospace; font-size: 11px; font-weight: bold; border-left: 2px solid #c5a880; padding-left: 8px;"
    );

    // 2. Global console hire function definition
    (window as any).hireSara = () => {
      console.log(
        "%c[SIGNAL LOCKED] Transmitting credentials packet. Initializing confetti matrix...",
        "color: #c5a880; font-weight: bold; font-family: monospace;"
      );
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#c5a880", "#f3e5ab", "#8a7152"],
      });
      
      // Auto open resume
      window.open("/resume.pdf", "_blank");
      return "SUCCESS: Portal locks cleared. Resume downloaded. Let's make something amazing.";
    };

    // 3. Listening for custom portal form submission success
    const handlePortalConfetti = () => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.7 },
        colors: ["#c5a880", "#f3e5ab", "#8a7152"],
      });
    };
    window.addEventListener("confetti-trigger", handlePortalConfetti);

    // 4. Konami Code tracking keyboard listeners
    const konamiCode = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    let codeIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      const targetKey = konamiCode[codeIndex];
      
      if (e.key === targetKey) {
        codeIndex++;
        if (codeIndex === konamiCode.length) {
          // Trigger epic full-screen confetti
          confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.5 },
            colors: ["#c5a880", "#f3e5ab", "#8a7152", "#ffffff"],
          });
          console.log("%cKONAMI CODE UNLOCKED: Gravity matrix inverted. Keep building!", "color: #c5a880; font-weight: bold;");
          codeIndex = 0;
        }
      } else {
        codeIndex = 0; // Reset
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("confetti-trigger", handlePortalConfetti);
      window.removeEventListener("keydown", handleKeyDown);
      delete (window as any).hireSara;
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-luxury-bg">
      {/* Persistent HUD overlays (logo, controls, anchors) */}
      <HUD activeRealm={activeRealm} onNavigate={navigateToRealm} />

      {/* 3D WebGL Canvas Layer (underneath) */}
      <UniverseCanvas scrollProgress={scrollProgress} />

      {/* 9 Scroll Sections Container (overlayed above) */}
      <div className="relative z-10 w-full flex flex-col">
        <section id="realm-0" className="min-h-screen w-full relative flex items-center justify-center">
          <RealmGateway />
        </section>

        <section id="realm-1" className="min-h-screen w-full relative flex items-center justify-center">
          <RealmOriginStory />
        </section>

        <section id="realm-2" className="min-h-screen w-full relative flex items-center justify-center">
          <RealmCorridor />
        </section>

        <section id="realm-3" className="min-h-screen w-full relative flex items-center justify-center">
          <RealmMuseum />
        </section>

        <section id="realm-4" className="min-h-screen w-full relative flex items-center justify-center">
          <RealmWorkshop />
        </section>

        <section id="realm-5" className="min-h-screen w-full relative flex items-center justify-center">
          <RealmLibrary />
        </section>

        <section id="realm-6" className="min-h-screen w-full relative flex items-center justify-center">
          <RealmArchive />
        </section>

        <section id="realm-7" className="min-h-screen w-full relative flex items-center justify-center">
          <RealmObservatory />
        </section>

        <section id="realm-8" className="min-h-screen w-full relative flex items-center justify-center">
          <RealmPortal />
        </section>
      </div>
    </div>
  );
}
