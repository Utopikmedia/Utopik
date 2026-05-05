"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import MagneticButton from "@/components/ui/MagneticButton";

const links = ["Work", "Services", "About", "Contact"];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const st = ScrollTrigger.create({
      start: "top -60",
      end: "max",
      onUpdate: (self) => setScrolled(self.progress > 0),
    });

    gsap.from(navRef.current, {
      y: -30,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.2,
    });

    return () => st.kill();
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-[5vw] py-5 transition-all duration-500 ${
        scrolled
          ? "bg-[#080808]/90 backdrop-blur-md border-b border-white/5"
          : ""
      }`}
    >
      <motion.a
        href="#"
        initial={{ x: -24, opacity: 0, scale: 0.8 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
        whileHover={{ filter: "drop-shadow(0 0 10px rgba(123,47,255,0.75))" }}
        style={{ display: "inline-block" }}
      >
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/logo.png"
            alt="Utopik"
            width={40}
            height={40}
            priority
          />
        </motion.div>
      </motion.a>

      <div className="hidden md:flex items-center gap-10">
        {links.map((l) => (
          <a
            key={l}
            href={`#${l.toLowerCase()}`}
            className="text-xs tracking-widest uppercase text-white/40 hover:text-white transition-colors duration-300"
          >
            {l}
          </a>
        ))}
      </div>

      <MagneticButton>
        <a
          href="#contact"
          className="group relative overflow-hidden border border-[#7B2FFF] px-6 py-2.5 text-xs tracking-widest uppercase text-white transition-all duration-300 hover:border-[#00F5FF]"
        >
          <span className="relative z-10">Start a project</span>
          <span className="absolute inset-0 bg-[#7B2FFF] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </a>
      </MagneticButton>
    </nav>
  );
}
