"use client";

import { motion } from "framer-motion";

const fadeUp = (delay: number) => ({
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, delay, ease: "easeOut" as const },
  },
});

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[600px] w-[600px] rounded-full bg-violet-600/20 blur-[120px]" />
      </div>

      <motion.p
        initial="hidden"
        animate="visible"
        variants={fadeUp(0.1)}
        className="mb-6 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-violet-300"
      >
        Creative Studio
      </motion.p>

      <motion.h1
        initial="hidden"
        animate="visible"
        variants={fadeUp(0.25)}
        className="font-display text-6xl font-bold leading-none tracking-tight text-white md:text-8xl lg:text-[10rem]"
      >
        Imagine<br />
        <span className="gradient-text">the Future.</span>
      </motion.h1>

      <motion.p
        initial="hidden"
        animate="visible"
        variants={fadeUp(0.4)}
        className="mt-8 max-w-xl text-lg text-white/50"
      >
        We craft bold digital experiences that push the boundaries of design,
        technology, and imagination.
      </motion.p>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp(0.55)}
        className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
      >
        <a
          href="#features"
          className="rounded-full bg-violet-600 px-8 py-3.5 text-sm font-semibold text-white hover:bg-violet-500 transition-colors"
        >
          Explore our work
        </a>
        <a
          href="#about"
          className="rounded-full border border-white/15 px-8 py-3.5 text-sm font-semibold text-white/70 hover:text-white hover:border-white/30 transition-all"
        >
          Learn more
        </a>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 flex flex-col items-center gap-2 text-white/30"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="h-4 w-px bg-white/30"
        />
      </motion.div>
    </section>
  );
}
