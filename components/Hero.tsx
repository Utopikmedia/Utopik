"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const ParticleCanvas = dynamic(() => import("@/components/ParticleCanvas"), {
  ssr: false,
});

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* Grid */}
      <div className="absolute inset-0 hero-grid" />

      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(43,111,212,0.12) 0%, transparent 70%)" }}
      />

      {/* Particle canvas — fills the full section */}
      <div className="absolute inset-0">
        <ParticleCanvas />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-32 pb-20">

        {/* Logo with breathing glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative mb-10"
        >
          {/* Glow halo */}
          <div
            className="logo-glow absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(43,111,212,0.55) 0%, rgba(126,179,245,0.22) 45%, transparent 70%)",
              filter: "blur(32px)",
              transform: "scale(1.6)",
            }}
          />

          <Image
            src="/logo.png"
            alt="Utopik Média"
            width={333}
            height={400}
            priority
            style={{ width: "auto", height: "250px", position: "relative", zIndex: 1 }}
          />
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
          className="font-display font-black tracking-tight text-white leading-tight mb-4"
          style={{ fontSize: "clamp(42px, 7vw, 96px)" }}
        >
          UTOPIK{" "}
          <span className="gradient-text">MÉDIA</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75, ease: "easeOut" }}
          className="text-white/40 tracking-[0.22em] uppercase mb-12"
          style={{ fontSize: "clamp(11px, 1.4vw, 14px)" }}
        >
          La référence pour du contenu qui se démarque au Saguenay–Lac-Saint-Jean
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-5"
        >
          {/* Primary CTA */}
          <a
            href="#packs"
            className="group relative overflow-hidden px-9 py-4 text-xs tracking-widest uppercase text-white transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #1A3F8F 0%, #2B6FD4 100%)",
              border: "1px solid rgba(126,179,245,0.3)",
            }}
          >
            <span className="relative z-10">Nos packs</span>
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "linear-gradient(135deg, #2B6FD4 0%, #7EB3F5 100%)" }}
            />
          </a>

          {/* Secondary CTA */}
          <a
            href="#contact"
            className="px-9 py-4 text-xs tracking-widest uppercase text-white/50 hover:text-white transition-colors duration-300"
            style={{ border: "1px solid rgba(43,111,212,0.3)" }}
          >
            Démarrer un projet →
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-white/20 tracking-widest uppercase">Défiler</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-[#2B6FD4]/60 to-transparent"
        />
      </motion.div>

      {/* Section index */}
      <span className="absolute bottom-10 left-[8vw] text-[11px] text-white/15 tracking-widest">
        01 / 05
      </span>
    </section>
  );
}
