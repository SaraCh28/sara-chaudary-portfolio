"use client";

import React, { useEffect, useRef } from "react";

// Global singleton to hold audio state to avoid multiple instances on re-render
let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let lowOscs: OscillatorNode[] = [];
let chimeInterval: NodeJS.Timeout | null = null;

export function toggleAudioMute(isMuted: boolean) {
  if (!audioCtx) {
    initAudio();
  }
  
  if (masterGain && audioCtx) {
    if (audioCtx.state === "suspended") {
      audioCtx.resume().catch((err) => {
        console.warn("AudioContext resume failed:", err);
      });
    }
    const targetVolume = isMuted ? 0 : 0.08; // Muted vs gentle volume
    masterGain.gain.setTargetAtTime(targetVolume, audioCtx.currentTime, 1.2);
  }
}

function initAudio() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    audioCtx = new AudioContextClass();
    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0, audioCtx.currentTime); // Start fully silent

    // Lowpass filter for warm, dark drone
    const filter = audioCtx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(300, audioCtx.currentTime);
    filter.Q.setValueAtTime(1, audioCtx.currentTime);

    // Delay node for the chimes to create spatial echoes
    const delay = audioCtx.createDelay(2.0);
    delay.delayTime.setValueAtTime(0.6, audioCtx.currentTime);
    const delayFeedback = audioCtx.createGain();
    delayFeedback.gain.setValueAtTime(0.4, audioCtx.currentTime);

    delay.connect(delayFeedback);
    delayFeedback.connect(delay); // feedback loop

    // Connections:
    // Drone -> Filter -> MasterGain -> Destination
    // Chimes -> Delay -> MasterGain -> Destination
    // Chimes -> MasterGain -> Destination
    filter.connect(masterGain);
    delay.connect(masterGain);
    masterGain.connect(audioCtx.destination);

    // Create low synth drone notes (A minor / E minor fifths: A1, E2, A2, E3)
    const frequencies = [55.0, 82.41, 110.0, 164.81];
    frequencies.forEach((freq, i) => {
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const oscGain = audioCtx.createGain();

      osc.type = i % 2 === 0 ? "sawtooth" : "triangle";
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      // Low volume per oscillator to prevent clipping
      oscGain.gain.setValueAtTime(0.08 / frequencies.length, audioCtx.currentTime);

      // Detune slightly for lush chorusing effect
      osc.detune.setValueAtTime((i - 1.5) * 5, audioCtx.currentTime);

      osc.connect(oscGain);
      oscGain.connect(filter);
      osc.start();
      lowOscs.push(osc);
    });

    // Create random atmospheric chimes (A Minor Pentatonic scale)
    const chimeScale = [220.0, 261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25, 783.99, 880.0];
    
    const playChime = () => {
      if (!audioCtx || !masterGain || !delay) return;
      
      // Select random note from scale
      const freq = chimeScale[Math.floor(Math.random() * chimeScale.length)];
      
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      
      gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
      // Fast attack
      gainNode.gain.linearRampToValueAtTime(0.05, audioCtx.currentTime + 0.1);
      // Long exponential decay
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 3.0);
      
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination); // Direct dry sound
      gainNode.connect(delay); // Send to echo
      
      osc.start();
      osc.stop(audioCtx.currentTime + 3.1);
    };

    // Trigger chimes periodically
    const triggerNextChime = () => {
      const delayTime = 4000 + Math.random() * 5000; // 4s to 9s
      chimeInterval = setTimeout(() => {
        playChime();
        triggerNextChime();
      }, delayTime);
    };
    triggerNextChime();

  } catch (error) {
    console.warn("Web Audio API is not supported or was blocked:", error);
  }
}

export default function AudioSystem() {
  useEffect(() => {
    // Listen for custom toggle events
    const handleToggleMute = (e: Event) => {
      const customEvent = e as CustomEvent;
      toggleAudioMute(customEvent.detail.isMuted);
    };

    window.addEventListener("audio-toggle-mute", handleToggleMute);

    // Warm-up on first user interaction to satisfy browser policy
    const warmUp = () => {
      if (audioCtx && audioCtx.state === "suspended") {
        audioCtx.resume().catch(() => {});
      }
      window.removeEventListener("click", warmUp);
      window.removeEventListener("scroll", warmUp);
      window.removeEventListener("touchstart", warmUp);
    };
    window.addEventListener("click", warmUp);
    window.addEventListener("scroll", warmUp);
    window.addEventListener("touchstart", warmUp);

    return () => {
      window.removeEventListener("audio-toggle-mute", handleToggleMute);
      window.removeEventListener("click", warmUp);
      window.removeEventListener("scroll", warmUp);
      window.removeEventListener("touchstart", warmUp);
    };
  }, []);

  return null; // Under the hood system
}
