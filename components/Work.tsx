"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const projects = [
  {
    id: "01",
    name: "Axiom",
    type: "Brand Identity",
    year: "2024",
    accent: "#7B2FFF",
    bg: "linear-gradient(135deg, #1a0a3a 0%, #080808 70%)",
  },
  {
    id: "02",
    name: "Nebula",
    type: "Web Experience",
    year: "2024",
    accent: "#00F5FF",
    bg: "linear-gradient(135deg, #002a3a 0%, #080808 70%)",
  },
  {
    id: "03",
    name: "Prism",
    type: "Motion Design",
    year: "2023",
    accent: "#7B2FFF",
    bg: "linear-gradient(135deg, #120520 0%, #0d0d1a 70%)",
  },
  {
    id: "04",
    name: "Void",
    type: "Interactive Art",
    year: "2023",
    accent: "#00F5FF",
    bg: "linear-gradient(135deg, #001520 0%, #080808 70%)",
  },
  {
    id: "05",
    name: "Echo",
    type: "Digital Campaign",
    year: "2023",
    accent: "#7B2FFF",
    bg: "linear-gradient(135deg, #1a0520 0%, #0a0808 70%)",
  },
];

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const getDistance = () => track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1.2,
          start: "top top",
          end: () => `+=${getDistance()}`,
          invalidateOnRefresh: true,
        },
      });

      /* Section title parallax */
      gsap.to(".work-header", {
        x: -80,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getDistance()}`,
          scrub: 2,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="work" className="bg-brand-bg overflow-hidden">
      {/* Section header — visible while pinned */}
      <div className="work-header absolute top-10 left-[8vw] z-10 flex items-center gap-4 pointer-events-none">
        <span className="block w-8 h-px bg-[#7B2FFF]" />
        <span className="text-[11px] text-[#7B2FFF] tracking-[0.35em] uppercase">
          03 — Selected Work
        </span>
      </div>

      {/* Scrolling track */}
      <div
        ref={trackRef}
        className="work-track flex items-center gap-6 px-[8vw] min-h-screen"
        style={{ width: "max-content", paddingTop: "80px" }}
      >
        {/* Section title card */}
        <div className="flex-shrink-0 w-[min(320px,80vw)] flex flex-col justify-end pb-12 min-h-[68vh]">
          <h2
            className="font-display font-black leading-none text-white"
            style={{ fontSize: "clamp(52px, 6vw, 80px)" }}
          >
            SELECTED<br />
            <span className="gradient-text">WORK</span>
          </h2>
          <p className="mt-6 text-sm text-white/30 max-w-[220px] leading-relaxed">
            A selection of our most ambitious projects from the past two years.
          </p>
          <div className="mt-8 flex items-center gap-3 text-[11px] text-white/20 tracking-widest uppercase">
            <span>Scroll</span>
            <span className="block w-12 h-px bg-white/20" />
          </div>
        </div>

        {/* Project cards */}
        {projects.map((p) => (
          <article
            key={p.id}
            className="relative flex-shrink-0 group cursor-pointer border border-white/5 overflow-hidden hover:border-white/15 transition-colors duration-500"
            style={{
              width: "min(420px, 80vw)",
              height: "68vh",
              background: p.bg,
            }}
          >
            {/* Accent top bar */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px] transition-all duration-500"
              style={{ background: `linear-gradient(90deg, ${p.accent}, transparent)` }}
            />

            {/* BG number */}
            <span
              className="absolute top-6 right-6 font-display font-black leading-none select-none pointer-events-none"
              style={{
                fontSize: "clamp(80px, 10vw, 130px)",
                color: "rgba(255,255,255,0.04)",
              }}
            >
              {p.id}
            </span>

            {/* Hover glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: `radial-gradient(ellipse at 50% 100%, ${p.accent}18, transparent 70%)` }}
            />

            {/* Content */}
            <div className="absolute bottom-10 left-8 right-8">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-[10px] tracking-widest uppercase font-medium"
                  style={{ color: p.accent }}
                >
                  {p.type}
                </span>
                <span className="text-white/15 text-xs">—</span>
                <span className="text-[10px] text-white/30 tracking-widest">{p.year}</span>
              </div>
              <h3
                className="font-display font-black text-white leading-none"
                style={{ fontSize: "clamp(40px, 5vw, 64px)" }}
              >
                {p.name}
              </h3>

              {/* Hover CTA */}
              <div className="mt-6 flex items-center gap-3 text-[11px] tracking-widest uppercase text-white/0 group-hover:text-white/60 transition-colors duration-400">
                <span>View Project</span>
                <span className="block w-8 h-px bg-current" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
