"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      id="contact"
      className="border-t border-white/8 px-8 py-12"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <span className="font-display text-lg font-bold text-white">
          utopik<span className="text-violet-400">.</span>
        </span>

        <p className="text-sm text-white/30">
          © {new Date().getFullYear()} Utopik. All rights reserved.
        </p>

        <div className="flex gap-6 text-sm text-white/40">
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">GitHub</a>
          <a href="#" className="hover:text-white transition-colors">Dribbble</a>
        </div>
      </div>
    </motion.footer>
  );
}
