"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";

const links = [
  { label: "Accueil",   href: "#" },
  { label: "Services",  href: "#services" },
  { label: "Portfolio", href: "#work" },
  { label: "Contact",   href: "#contact" },
];

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-[5vw] py-4 bg-[#080808]/80 backdrop-blur-md border-b border-white/[0.06]"
    >
      {/* Logo */}
      <motion.a
        href="#"
        whileHover={{ filter: "drop-shadow(0 0 10px rgba(123,47,255,0.8))" }}
        style={{ display: "inline-block" }}
      >
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <Image
            src="/logo.png"
            alt="Utopik"
            width={333}
            height={400}
            priority
            style={{ width: "auto", height: "40px" }}
          />
        </motion.div>
      </motion.a>

      {/* Links */}
      <div className="hidden md:flex items-center gap-10">
        {links.map((l, i) => (
          <motion.a
            key={l.label}
            href={l.href}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease: "easeOut" }}
            className="text-xs tracking-widest uppercase text-white/50 hover:text-white transition-colors duration-300"
          >
            {l.label}
          </motion.a>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.55, ease: "easeOut" }}
      >
        <MagneticButton>
          <a
            href="#contact"
            className="group relative overflow-hidden border border-[#7B2FFF] px-6 py-2.5 text-xs tracking-widest uppercase text-white transition-colors duration-300 hover:border-[#00F5FF]"
          >
            <span className="relative z-10">Démarrer un projet</span>
            <span className="absolute inset-0 bg-[#7B2FFF] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </a>
        </MagneticButton>
      </motion.div>
    </motion.nav>
  );
}
