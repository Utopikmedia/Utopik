"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { gsap } from "@/lib/gsap";

const services = [
  {
    id: "01",
    name: "Brand Identity",
    description:
      "Visual systems, logos, and brand guidelines that make you impossible to ignore.",
  },
  {
    id: "02",
    name: "Web Experience",
    description:
      "Custom-built sites and apps with obsessive attention to performance and interaction.",
  },
  {
    id: "03",
    name: "Motion Design",
    description:
      "Animated stories, interfaces in motion, and cinematic reels that live in memory.",
  },
  {
    id: "04",
    name: "Creative Direction",
    description:
      "End-to-end vision for campaigns, products, and digital launches that demand attention.",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".service-item", {
        x: -50,
        opacity: 0,
        duration: 0.85,
        stagger: 0.13,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          once: true,
        },
      });

      /* Subtle parallax on section title */
      gsap.to(".services-title", {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="px-[8vw] py-32 bg-brand-bg">
      {/* Header */}
      <div className="services-title mb-20">
        <div className="flex items-center gap-4 mb-8">
          <span className="block w-8 h-px bg-[#00F5FF]" />
          <span className="text-[11px] text-[#00F5FF] tracking-[0.35em] uppercase">
            04 — Services
          </span>
        </div>
        <h2
          className="font-display font-black leading-none text-white"
          style={{ fontSize: "clamp(44px, 6vw, 80px)" }}
        >
          What we<br />
          <span className="gradient-text">create</span>
        </h2>
      </div>

      {/* List */}
      <div>
        {services.map((s, i) => (
          <div
            key={s.id}
            className="service-item group border-t border-white/8 hover:border-[#7B2FFF]/30 transition-colors duration-300"
          >
            <div className="flex items-start gap-8 py-8 cursor-default">
              <span className="font-display text-xs text-white/20 group-hover:text-[#7B2FFF] transition-colors duration-300 mt-1 min-w-[28px]">
                {s.id}
              </span>

              <div className="flex-1">
                <h3
                  className="font-display font-bold text-white group-hover:translate-x-3 transition-transform duration-300"
                  style={{ fontSize: "clamp(26px, 3.5vw, 48px)" }}
                >
                  {s.name}
                </h3>
                <p className="text-sm text-white/0 group-hover:text-white/40 transition-all duration-300 mt-2 max-w-md leading-relaxed overflow-hidden max-h-0 group-hover:max-h-12">
                  {s.description}
                </p>
              </div>

              <span className="text-white/15 group-hover:text-white/70 group-hover:translate-x-2 transition-all duration-300 text-2xl mt-1">
                →
              </span>
            </div>
            {i === services.length - 1 && (
              <div className="border-t border-white/8" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
