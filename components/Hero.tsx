"use client";

import { useRef, useEffect } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  /* ── Glitch trigger ────────────────────────────────────── */
  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;

    const trigger = () => {
      el.classList.add("glitching");
      const id = setTimeout(() => el.classList.remove("glitching"), 350);
      return id;
    };

    const t0 = setTimeout(() => {
      trigger();
      const iv = setInterval(trigger, 3800);
      return () => clearInterval(iv);
    }, 1500);

    return () => clearTimeout(t0);
  }, []);

  /* ── GSAP entrance + parallax ──────────────────────────── */
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* Entrance */
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-tag", { y: 20, opacity: 0, duration: 0.8 })
        .from(
          ".hero-title-wrap",
          { clipPath: "inset(100% 0 0 0)", duration: 1.1, ease: "expo.out" },
          "-=0.4"
        )
        .from(".hero-sub", { y: 24, opacity: 0, duration: 0.8 }, "-=0.6")
        .from(".hero-cta", { y: 20, opacity: 0, duration: 0.6, stagger: 0.12 }, "-=0.5")
        .from(".hero-scroll", { opacity: 0, duration: 0.6 }, "-=0.2");

      /* Glow parallax */
      gsap.to(".glow-orb-1", {
        y: -120,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2,
        },
      });
      gsap.to(".glow-orb-2", {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 3,
        },
      });

      /* Content parallax */
      gsap.to(contentRef.current, {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-brand-bg"
    >
      {/* Grid */}
      <div className="absolute inset-0 hero-grid" />

      {/* Glows */}
      <div className="glow-orb-1 absolute top-1/4 left-[15%] w-[600px] h-[600px] rounded-full bg-[#7B2FFF]/18 blur-[140px] pointer-events-none" />
      <div className="glow-orb-2 absolute bottom-1/4 right-[15%] w-[350px] h-[350px] rounded-full bg-[#00F5FF]/10 blur-[120px] pointer-events-none" />

      {/* Content */}
      <div ref={contentRef} className="relative z-10 w-full px-[8vw] pt-32 pb-20">
        {/* Tag */}
        <div className="hero-tag flex items-center gap-3 mb-10">
          <span className="block w-10 h-px bg-[#00F5FF]" />
          <span className="text-[11px] text-[#00F5FF] tracking-[0.35em] uppercase">
            Creative Studio — Est. 2024
          </span>
        </div>

        {/* Title */}
        <div className="overflow-hidden mb-6">
          <div className="hero-title-wrap" style={{ clipPath: "inset(0 0 0 0)" }}>
            <h1
              ref={titleRef}
              data-text="UTOPIK"
              className="glitch-text neon-glow font-display font-black leading-[0.88] tracking-tighter text-white select-none"
              style={{ fontSize: "clamp(80px, 18vw, 220px)" }}
            >
              UTOPIK
            </h1>
          </div>
        </div>

        {/* Sub */}
        <p className="hero-sub font-display font-light tracking-[0.18em] uppercase text-white/25 mb-14"
           style={{ fontSize: "clamp(13px, 2.2vw, 22px)" }}>
          We build digital futures
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-6">
          <MagneticButton className="hero-cta">
            <a
              href="#work"
              className="group relative flex items-center gap-5 border border-[#7B2FFF] px-9 py-4 text-xs tracking-widest uppercase text-white overflow-hidden transition-colors duration-300"
            >
              <span className="relative z-10">View Work</span>
              <span className="relative z-10 w-8 h-px bg-white transform group-hover:translate-x-2 transition-transform duration-300" />
              <span className="absolute inset-0 bg-[#7B2FFF] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
          </MagneticButton>

          <MagneticButton className="hero-cta">
            <a
              href="#contact"
              className="text-xs tracking-widest uppercase text-white/35 hover:text-white transition-colors duration-300"
            >
              Start a Project →
            </a>
          </MagneticButton>
        </div>
      </div>

{/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-10 right-[8vw] flex flex-col items-end gap-3">
        <span
          className="text-[10px] text-white/20 tracking-widest uppercase"
          style={{ writingMode: "vertical-lr" }}
        >
          Scroll
        </span>
        <div className="w-px h-16 bg-gradient-to-b from-[#7B2FFF]/60 to-transparent" />
      </div>

      {/* Index */}
      <span className="absolute bottom-10 left-[8vw] text-[11px] text-white/20 tracking-widest">
        01 / 06
      </span>
    </section>
  );
}
