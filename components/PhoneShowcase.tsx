"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function PhoneShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax: phone drifts upward slightly as section scrolls past
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const phoneY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-brand-bg overflow-hidden py-28 px-[8vw]"
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 right-[20%] -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(43,111,212,0.10) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

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

        {/* ── Right: phone mockup ── */}
        <motion.div
          initial={{ opacity: 0, y: 56 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.15 }}
          style={{ y: phoneY }}
          className="order-1 lg:order-2 flex justify-center"
        >
          <div className="relative" style={{ width: "240px", height: "500px" }}>

            {/* Phone frame */}
            <div
              className="absolute inset-0 rounded-[38px] overflow-hidden"
              style={{
                background: "#0d0d0d",
                border: "1px solid rgba(43,111,212,0.25)",
                boxShadow:
                  "0 0 0 8px #0a0a0a, 0 0 0 9px rgba(43,111,212,0.15), 0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(43,111,212,0.12)",
              }}
            >
              {/* Notch */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-[#080808] z-10" />

              {/* Screen content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center px-4">

                {/* TODO: Replace placeholder with YouTube embed when video is ready */}
                <div
                  className="w-full rounded-xl overflow-hidden flex flex-col items-center justify-center gap-4"
                  style={{
                    height: "360px",
                    background:
                      "linear-gradient(160deg, #0a1628 0%, #080808 100%)",
                    border: "1px solid rgba(43,111,212,0.12)",
                  }}
                >
                  {/* Play button */}
                  <div
                    className="flex items-center justify-center rounded-full"
                    style={{
                      width: "52px",
                      height: "52px",
                      background: "rgba(43,111,212,0.15)",
                      border: "1px solid rgba(126,179,245,0.3)",
                    }}
                  >
                    {/* Triangle */}
                    <div
                      style={{
                        width: 0,
                        height: 0,
                        borderTop: "9px solid transparent",
                        borderBottom: "9px solid transparent",
                        borderLeft: "16px solid #7EB3F5",
                        marginLeft: "4px",
                      }}
                    />
                  </div>

                  <p
                    className="text-center text-white/30 leading-snug px-2"
                    style={{ fontSize: "10px" }}
                  >
                    Vidéo de présentation<br />bientôt disponible
                  </p>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-20 h-1 rounded-full bg-white/20" />
            </div>

            {/* Reflection glow under phone */}
            <div
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-32 h-8 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse, rgba(43,111,212,0.3) 0%, transparent 70%)",
                filter: "blur(8px)",
              }}
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
