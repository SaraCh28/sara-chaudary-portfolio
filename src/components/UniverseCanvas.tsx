"use client";

import React, { useRef, useEffect, useState } from "react";

interface UniverseCanvasProps {
  scrollProgress: number; // 0 to 1
}

interface LightfallStreak {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  width: number;
  glow: number;
  xOffset: number;
  targetXOffset: number;
}

interface EtherWave {
  yPos: number; // Base vertical alignment
  speed: number;
  amplitude: number;
  phase: number;
  frequency: number;
  offsetY: number; // Mouse offset
}

export default function UniverseCanvas({ scrollProgress }: UniverseCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [lowPerf, setLowPerf] = useState(false);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const scrollRef = useRef({ lastProgress: scrollProgress, speed: 0 });

  // Listen to performance events
  useEffect(() => {
    const handle = (e: Event) => {
      if ((e as CustomEvent).detail?.low) setLowPerf(true);
    };
    window.addEventListener("low-performance-mode", handle);
    return () => window.removeEventListener("low-performance-mode", handle);
  }, []);

  // Update scroll speed tracking
  useEffect(() => {
    const diff = Math.abs(scrollProgress - scrollRef.current.lastProgress);
    scrollRef.current.speed = Math.min(15, scrollRef.current.speed + diff * 35);
    scrollRef.current.lastProgress = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let time = 0;

    // Initialize Lightfall Streaks
    const streakCount = lowPerf ? 35 : 110;
    const streaks: LightfallStreak[] = [];

    const createStreak = (initialY = false): LightfallStreak => {
      const len = 30 + Math.random() * 90;
      return {
        x: Math.random() * window.innerWidth,
        y: initialY ? Math.random() * window.innerHeight : -len - 10,
        length: len,
        speed: 1.2 + Math.random() * 3.5,
        opacity: 0.04 + Math.random() * 0.22,
        width: 0.6 + Math.random() * 1.4,
        glow: 0,
        xOffset: 0,
        targetXOffset: 0,
      };
    };

    // Initialize Ether Waves
    const waves: EtherWave[] = [
      { yPos: 0.25, speed: 0.0006, amplitude: 50, phase: 0, frequency: 0.0018, offsetY: 0 },
      { yPos: 0.5, speed: -0.0004, amplitude: 80, phase: Math.PI / 3, frequency: 0.0012, offsetY: 0 },
      { yPos: 0.75, speed: 0.0008, amplitude: 60, phase: Math.PI / 1.5, frequency: 0.002, offsetY: 0 },
    ];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      // Re-populate streaks on resize to match new width
      streaks.length = 0;
      for (let i = 0; i < streakCount; i++) {
        streaks.push(createStreak(true));
      }
    };

    resize();
    window.addEventListener("resize", resize);

    // Mouse Tracking Event Listeners
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Main animation loop
    const render = () => {
      time += 0.01;
      // Decay scroll speed over time
      scrollRef.current.speed *= 0.94;

      // Base scroll factor driven by active scroll speed
      const scrollFactor = 1 + scrollRef.current.speed * 1.5;

      // Clear with dark luxury background
      ctx.fillStyle = "#030303";
      ctx.fillRect(0, 0, width, height);

      // ──────────────────────────────────────────────────────────
      // LAYER 1: Liquid Ether (Ambient Fluid Ribbons)
      // ──────────────────────────────────────────────────────────
      waves.forEach((wave, wIdx) => {
        wave.phase += wave.speed * (1 + scrollRef.current.speed * 0.2);

        // Smoothly interpolate mouse influence
        if (mouseRef.current.active) {
          const targetOffset = (mouseRef.current.y - height * wave.yPos) * 0.08;
          wave.offsetY += (targetOffset - wave.offsetY) * 0.05;
        } else {
          wave.offsetY += (0 - wave.offsetY) * 0.05;
        }

        const centerY = height * wave.yPos + wave.offsetY;

        // Draw multiple parallel strands per ribbon for depth
        const strandCount = lowPerf ? 2 : 5;
        for (let s = 0; s < strandCount; s++) {
          const strandOffset = s * 6;
          const strandOpacity = (0.012 - s * 0.002) * (lowPerf ? 1 : 1.3);

          ctx.beginPath();
          ctx.strokeStyle = `rgba(197, 168, 128, ${strandOpacity})`;
          ctx.lineWidth = 1 + (s * 0.5);

          for (let x = 0; x < width + 10; x += 15) {
            // Complex multi-sine function simulating liquid noise
            const noiseVal =
              Math.sin(x * wave.frequency + wave.phase + strandOffset * 0.05) * wave.amplitude +
              Math.cos(x * 0.003 - wave.phase * 0.7) * (wave.amplitude * 0.35) +
              Math.sin(x * 0.0006 + wave.phase * 1.4) * (wave.amplitude * 0.2);

            const y = centerY + noiseVal;

            if (x === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.stroke();
        }
      });

      // ──────────────────────────────────────────────────────────
      // LAYER 2: Lightfall (Falling Golden Streaks)
      // ──────────────────────────────────────────────────────────
      ctx.lineCap = "round";

      streaks.forEach((streak, idx) => {
        // Falling motion
        streak.y += streak.speed * scrollFactor;

        // X deflection physics around mouse
        let dx = 0;
        let dy = 0;
        let dist = 9999;

        if (mouseRef.current.active) {
          dx = (streak.x + streak.xOffset) - mouseRef.current.x;
          dy = streak.y - mouseRef.current.y;
          dist = Math.sqrt(dx * dx + dy * dy);
        }

        const mouseInfluenceRadius = 180;
        if (dist < mouseInfluenceRadius) {
          const force = (mouseInfluenceRadius - dist) / mouseInfluenceRadius;
          // Deflect horizontally
          streak.targetXOffset += (dx > 0 ? 1 : -1) * force * 4.5;
          // Accelerate downwards
          streak.y += force * 3.5;
          // Increase brightness/glow
          streak.glow = Math.min(1, streak.glow + 0.08);
        } else {
          streak.glow = Math.max(0, streak.glow - 0.02);
        }

        // Apply inertia to offsets
        streak.xOffset += (streak.targetXOffset - streak.xOffset) * 0.08;
        streak.targetXOffset *= 0.94; // Decay target force

        // Draw the falling streak
        const opacity = Math.min(0.85, streak.opacity * (1 + streak.glow * 2.2));
        const startX = streak.x + streak.xOffset;
        const startY = streak.y;
        const endY = streak.y - streak.length;

        const grad = ctx.createLinearGradient(startX, startY, startX, endY);
        // Gold to transparent gradient
        grad.addColorStop(0, `rgba(197, 168, 128, ${opacity})`);
        grad.addColorStop(0.3, `rgba(197, 168, 128, ${opacity * 0.5})`);
        grad.addColorStop(1, "rgba(197, 168, 128, 0)");

        ctx.strokeStyle = grad;
        ctx.lineWidth = streak.width * (1 + streak.glow * 0.5);

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX, endY);
        ctx.stroke();

        // Recycle streak if it exits the bottom boundary
        if (streak.y - streak.length > height) {
          streaks[idx] = createStreak(false);
        }
      });

      // ──────────────────────────────────────────────────────────
      // LAYER 3: Soft Mouse Glow Layer
      // ──────────────────────────────────────────────────────────
      if (mouseRef.current.active && !lowPerf) {
        ctx.beginPath();
        const radGrad = ctx.createRadialGradient(
          mouseRef.current.x,
          mouseRef.current.y,
          0,
          mouseRef.current.x,
          mouseRef.current.y,
          260
        );
        // Subtly illuminate gold elements near cursor
        radGrad.addColorStop(0, "rgba(197, 168, 128, 0.045)");
        radGrad.addColorStop(0.5, "rgba(197, 168, 128, 0.015)");
        radGrad.addColorStop(1, "rgba(197, 168, 128, 0)");

        ctx.fillStyle = radGrad;
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 260, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Cleanups
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [lowPerf]);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-0 block pointer-events-none" />;
}
