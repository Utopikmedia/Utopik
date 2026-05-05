"use client";

import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-8 py-5"
    >
      <span className="font-display text-xl font-bold tracking-tight text-white">
        utopik<span className="text-violet-400">.</span>
      </span>

      <nav className="hidden md:flex items-center gap-8 text-sm text-white/60">
        <a href="#about" className="hover:text-white transition-colors">About</a>
        <a href="#features" className="hover:text-white transition-colors">Features</a>
        <a href="#work" className="hover:text-white transition-colors">Work</a>
      </nav>

      <a
        href="#contact"
        className="rounded-full border border-white/20 px-5 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white transition-all"
      >
        Get in touch
      </a>
    </motion.header>
  );
}
