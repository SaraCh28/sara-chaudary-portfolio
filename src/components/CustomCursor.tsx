"use client";

import React, { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState<string>("default");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Hide native cursor
    document.body.style.cursor = "none";
    
    // Add custom cursor class to elements that usually show pointer to override it
    const style = document.createElement("style");
    style.innerHTML = `
      a, button, select, input, textarea, [role="button"], [data-cursor] {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Event delegation to capture hover state overrides
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const cursorTarget = target.closest("[data-cursor]");
      if (cursorTarget) {
        const type = cursorTarget.getAttribute("data-cursor");
        setCursorType(type || "default");
      } else if (
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest("button") || 
        target.closest("a") ||
        target.getAttribute("role") === "button"
      ) {
        setCursorType("pointer");
      } else {
        setCursorType("default");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseover", handleMouseOver);

    // Animation Loop (Lerp ring for smooth lag effect)
    let animationFrameId: number;
    const render = () => {
      // Direct update for dot (fast response)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x - 4}px, ${mousePos.current.y - 4}px, 0)`;
      }

      // Lerped update for ring (smooth delay)
      const lerp = 0.15;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerp;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerp;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      document.body.style.cursor = "auto";
      style.remove();
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  // Render cursor labels depending on custom type
  const getCursorLabel = () => {
    switch (cursorType) {
      case "inspect":
        return "INSPECT";
      case "portal":
        return "OPEN PORTAL";
      case "continue":
        return "CONTINUE";
      case "explore":
        return "EXPLORE";
      case "contact":
        return "LET'S BUILD";
      default:
        return "";
    }
  };

  const hasLabel = ["inspect", "portal", "continue", "explore", "contact"].includes(cursorType);

  return (
    <>
      {/* Inner Dot */}
      <div
        ref={dotRef}
        className="custom-cursor fixed top-0 left-0 pointer-events-none mix-blend-difference"
        style={{
          backgroundColor: hasLabel ? "transparent" : "#c5a880",
          width: hasLabel ? "0px" : "8px",
          height: hasLabel ? "0px" : "8px",
          zIndex: 9999,
        }}
      />
      
      {/* Outer Ring */}
      <div
        ref={ringRef}
        className="custom-cursor-ring fixed top-0 left-0 pointer-events-none flex items-center justify-center font-display font-bold text-[8px] tracking-[0.15em] select-none"
        style={{
          width: hasLabel ? "80px" : cursorType === "pointer" ? "56px" : "40px",
          height: hasLabel ? "80px" : cursorType === "pointer" ? "56px" : "40px",
          borderColor: hasLabel ? "rgba(197, 168, 128, 0.9)" : "rgba(197, 168, 128, 0.4)",
          backgroundColor: hasLabel ? "rgba(11, 11, 13, 0.75)" : "transparent",
          backdropFilter: hasLabel ? "blur(4px)" : "none",
          color: "#c5a880",
          zIndex: 9998,
        }}
      >
        {hasLabel && (
          <span className="animate-fade-in text-center px-1 leading-tight">
            {getCursorLabel()}
          </span>
        )}
      </div>
    </>
  );
}
