"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function PhoneShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  // 3D entrance: driven by scroll progress as section enters viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 0.15"],
  });

  const scale    = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const rotateY  = useTransform(scrollYProgress, [0, 1], [45, 0]);
  const rotateX  = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const opacity  = useTransform(scrollYProgress, [0, 0.35], [0, 1]);
  const y        = useTransform(scrollYProgress, [0, 1], [60, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-brand-bg overflow-hidden py-24 px-[8vw]"
    >
      {/* Blue ambient glow — right side */}
      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(43,111,212,0.14) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* ── Left: text ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="order-2 lg:order-1"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="block w-8 h-px bg-brand-electric" />
            <span className="text-[11px] text-brand-electric tracking-[0.35em] uppercase">
              En action
            </span>
          </div>

          <h2
            className="font-display font-black text-white leading-tight mb-6"
            style={{ fontSize: "clamp(32px, 4.5vw, 62px)" }}
          >
            Voyez notre travail<br />
            <span className="gradient-text">en action</span>
          </h2>

          <p className="text-white/35 text-sm leading-relaxed max-w-sm mb-10">
            Du contenu vertical optimisé pour capter l&apos;attention dès la
            première seconde — conçu pour performer sur Instagram, TikTok et
            YouTube Shorts.
          </p>

          <a
            href="#contact"
            className="group inline-flex items-center gap-4 text-xs tracking-widest uppercase text-white/50 hover:text-white transition-colors duration-300"
          >
            Démarrer un projet
            <span className="block w-6 h-px bg-current transform group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </motion.div>

        {/* ── Right: phone image with 3D scroll animation ── */}
        <div
          className="order-1 lg:order-2 flex justify-center lg:justify-end"
          style={{ perspective: "1200px" }}
        >
          <motion.div
            style={{ scale, rotateY, rotateX, opacity, y, transformStyle: "preserve-3d" }}
            className="relative"
          >
            {/* Glow behind image */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at 50% 60%, rgba(43,111,212,0.3) 0%, transparent 65%)",
                filter: "blur(35px)",
                transform: "scale(1.15)",
              }}
            />

            {/* TODO: Replace placeholder with YouTube embed when video is ready */}
            <Image
              src="/phone-hand.png"
              alt="Main tenant un téléphone"
              width={612}
              height={792}
              priority
              style={{
                width: "auto",
                height: "700px",
                maxWidth: "100%",
                display: "block",
                position: "relative",
                filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.8)) drop-shadow(0 0 40px rgba(43,111,212,0.25))",
              }}
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
