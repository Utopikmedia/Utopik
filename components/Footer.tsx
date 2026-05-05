"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { gsap } from "@/lib/gsap";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-headline span", {
        y: "105%",
        duration: 1.1,
        stagger: 0.08,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          once: true,
        },
      });

      gsap.from(".footer-cta-btn", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".footer-cta-btn",
          start: "top 80%",
          once: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={sectionRef} id="contact" className="bg-brand-bg border-t border-white/5">
      {/* CTA block */}
      <div className="px-[8vw] pt-32 pb-24">
        <div className="flex items-center gap-4 mb-12">
          <span className="block w-8 h-px bg-[#7B2FFF]" />
          <span className="text-[11px] text-[#7B2FFF] tracking-[0.35em] uppercase">
            06 — Contact
          </span>
        </div>

        {/* Headline */}
        <div className="footer-headline mb-14 overflow-hidden">
          {["Ready to", "Build Something", "Extraordinary?"].map((line) => (
            <div key={line} className="overflow-hidden">
              <span
                className="block font-display font-black leading-[0.9] text-white"
                style={{ fontSize: "clamp(44px, 8vw, 110px)" }}
              >
                {line}
              </span>
            </div>
          ))}
        </div>

        {/* CTA button */}
        <MagneticButton className="footer-cta-btn inline-block">
          <a
            href="mailto:hello@utopik.studio"
            className="group relative flex items-center gap-6 border border-white/20 px-10 py-5 text-sm tracking-widest uppercase text-white overflow-hidden hover:border-white/60 transition-colors duration-300"
          >
            <span className="relative z-10">Get in Touch</span>
            <span className="relative z-10 block w-10 h-px bg-current transform group-hover:translate-x-2 transition-transform duration-300" />
            <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="absolute inset-0 flex items-center gap-6 px-10 text-[#080808] translate-y-full group-hover:translate-y-0 transition-transform duration-500 font-semibold">
              Get in Touch
              <span className="block w-10 h-px bg-current" />
            </span>
          </a>
        </MagneticButton>
      </div>

      {/* Bottom bar */}
      <div className="px-[8vw] py-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
        <span className="font-display text-base font-black text-white">
          UTOPIK<span className="text-[#00F5FF]">.</span>
        </span>

        <span className="text-[11px] text-white/20 tracking-widest">
          © {new Date().getFullYear()} Utopik Studio — All rights reserved
        </span>

        <div className="flex gap-8">
          {["Twitter", "Instagram", "GitHub", "Dribbble"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-[11px] tracking-widest uppercase text-white/25 hover:text-white transition-colors duration-300"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
