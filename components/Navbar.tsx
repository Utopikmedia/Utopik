"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const links = [
  { label: "Accueil",   href: "#" },
  { label: "Services",  href: "#services" },
  { label: "Packs",     href: "#packs" },
  { label: "Contact",   href: "#contact" },
];

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-[5vw] py-4 bg-[#080808]/80 backdrop-blur-md border-b border-white/[0.05]"
    >
      {/* Logo */}
      <motion.a
        href="#"
        whileHover={{ filter: "drop-shadow(0 0 12px rgba(43,111,212,0.8))" }}
        style={{ display: "inline-block" }}
      >
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <Image
            src="/logo.png"
            alt="Utopik Média"
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
            className="text-xs tracking-widest uppercase text-white/45 hover:text-white transition-colors duration-300"
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
        <a
          href="#contact"
          className="hidden md:inline-block text-xs tracking-widest uppercase text-white/45 hover:text-white px-6 py-2.5 transition-all duration-300"
          style={{ border: "1px solid rgba(43,111,212,0.35)" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(43,111,212,0.8)";
            (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(43,111,212,0.35)";
            (e.currentTarget as HTMLAnchorElement).style.color = "";
          }}
        >
          Démarrer un projet
        </a>
      </motion.div>
    </motion.nav>
  );
}
