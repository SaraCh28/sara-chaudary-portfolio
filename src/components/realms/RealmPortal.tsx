"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, FileText, Send, CheckCircle, AlertCircle } from "lucide-react";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const CONTACT_LINKS = [
  {
    icon: Mail,
    label: "Direct Mail",
    value: "s.chaudary@live.com",
    href: "mailto:s.chaudary@live.com",
  },
  {
    icon: Linkedin,
    label: "Professional Channel",
    value: "linkedin.com/in/sara-chaudary",
    href: "https://linkedin.com/in/sara-chaudary",
  },
  {
    icon: Github,
    label: "Source Archives",
    value: "github.com/sarachaudary",
    href: "https://github.com",
  },
  {
    icon: FileText,
    label: "Curriculum Vitae",
    value: "Download Resume PDF",
    href: "/resume.pdf",
    download: "Sara_Chaudary_Resume.pdf",
  },
];

export default function RealmPortal() {
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setError("Please fill in all required fields to open the channel.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    // Simulated transmission (replace with actual endpoint)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setFormState({ name: "", email: "", subject: "", message: "" });
      window.dispatchEvent(new Event("confetti-trigger"));
      setTimeout(() => setIsSent(false), 6000);
    }, 1800);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setError("");
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputClass =
    "w-full bg-luxury-white/[0.03] border border-luxury-gold/12 focus:border-luxury-gold/60 hover:border-luxury-gold/25 rounded-sm px-4 py-3 text-xs text-luxury-white outline-none transition-all duration-300 placeholder-luxury-muted/40 font-sans";

  return (
    <div className="min-h-screen py-24 px-6 sm:px-12 md:px-24 max-w-6xl mx-auto relative z-10 flex flex-col justify-center select-none">

      {/* Ambient portal glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(197,168,128,0.07) 0%, transparent 65%)"
        }}
      />

      {/* Realm Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="mb-16 text-center md:text-left relative z-10"
      >
        <span className="font-serif italic text-2xl sm:text-3xl text-luxury-gold block mb-2">
          Realm VIII
        </span>
        <h2 className="font-display font-medium text-4xl sm:text-5xl text-luxury-white tracking-widest uppercase">
          The Portal
        </h2>
        <div className="w-12 h-[1px] bg-luxury-gold mt-4 mx-auto md:mx-0" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-5xl mx-auto w-full items-stretch relative z-10">

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="lg:col-span-7 flex flex-col justify-center"
        >
          <div className="glass-panel p-6 sm:p-10 rounded-sm relative overflow-hidden">
            {/* Top accent glow */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-luxury-gold/40 to-transparent" />

            <h3 className="font-serif italic font-light text-3xl sm:text-4xl text-luxury-white mb-2">
              Let's Build Something Memorable
            </h3>
            <p className="font-display text-[9px] tracking-[0.28em] text-luxury-gold uppercase mb-8">
              Open a communication channel
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="font-display text-[8px] tracking-[0.25em] text-luxury-gold uppercase font-bold">
                    Your Name <span className="text-luxury-muted">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    placeholder="Full name"
                    className={inputClass}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="font-display text-[8px] tracking-[0.25em] text-luxury-gold uppercase font-bold">
                    Email Address <span className="text-luxury-muted">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="subject" className="font-display text-[8px] tracking-[0.25em] text-luxury-gold uppercase font-bold">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  placeholder="Opportunity, project, or just a hello"
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="font-display text-[8px] tracking-[0.25em] text-luxury-gold uppercase font-bold">
                  Message <span className="text-luxury-muted">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell me about your project, idea, or role..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Error message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-[10px] text-amber-400 font-display tracking-[0.1em]"
                >
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {error}
                </motion.div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="font-display font-semibold text-[10px] tracking-[0.28em] bg-luxury-gold hover:bg-luxury-gold-glow text-luxury-bg py-4 rounded-sm transition-all duration-300 flex items-center justify-center gap-2.5 mt-1 shadow-lg shadow-luxury-gold/15 disabled:opacity-60 disabled:cursor-not-allowed"
                data-cursor="contact"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full border-2 border-luxury-bg border-t-transparent animate-spin" />
                    TRANSMITTING...
                  </span>
                ) : isSent ? (
                  <>
                    SIGNAL TRANSMITTED <CheckCircle className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    TRANSMIT SIGNAL <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>

        {/* Info Panel */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="lg:col-span-5 flex flex-col justify-between glass-panel p-6 sm:p-10 rounded-sm relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-luxury-bronze/40 to-transparent" />

          <div>
            <span className="font-display text-[8.5px] tracking-[0.3em] text-luxury-gold uppercase font-bold block mb-4">
              SIGNAL GATEWAY
            </span>
            <p className="font-sans font-light text-xs leading-relaxed text-luxury-muted mb-10">
              Available for full-time roles, freelance engagements, and interesting collaborations.
              I review messages daily and typically respond within 24 hours.
            </p>

            <div className="flex flex-col gap-5">
              {CONTACT_LINKS.map(({ icon: Icon, label, value, href, download }) => (
                <a
                  key={label}
                  href={href}
                  target={download ? undefined : "_blank"}
                  rel={download ? undefined : "noopener noreferrer"}
                  download={download}
                  className="flex items-center gap-4 group cursor-pointer"
                >
                  <div className="p-3 border border-luxury-gold/15 group-hover:border-luxury-gold/50 rounded-sm bg-luxury-white/5 transition-all duration-300 group-hover:bg-luxury-white/8 shrink-0">
                    <Icon className="w-4 h-4 text-luxury-gold" />
                  </div>
                  <div>
                    <span className="font-display text-[7.5px] tracking-[0.18em] text-luxury-muted block uppercase mb-0.5">
                      {label}
                    </span>
                    <span className="font-sans font-light text-xs text-luxury-white group-hover:text-luxury-gold transition-colors duration-300">
                      {value}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Footer signature */}
          <div className="border-t border-luxury-gold/10 pt-6 mt-8 flex items-center justify-between text-[9px] font-display text-luxury-muted tracking-[0.18em]">
            <span>DESIGNED BY SARA CHAUDARY</span>
            <span>© 2026</span>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
