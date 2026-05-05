"use client";

import { motion, Variants } from "framer-motion";

const features = [
  {
    icon: "✦",
    title: "Bold Design",
    description:
      "Visuals that stop the scroll. We design with intention, crafting identities and interfaces that are impossible to ignore.",
  },
  {
    icon: "◈",
    title: "Immersive Tech",
    description:
      "From WebGL to real-time 3D, we leverage cutting-edge web technology to create experiences that feel alive.",
  },
  {
    icon: "⬡",
    title: "Creative Strategy",
    description:
      "Great products start with a clear vision. We partner with founders and teams to define strategy that drives growth.",
  },
  {
    icon: "◎",
    title: "Motion & Interaction",
    description:
      "Micro-interactions and fluid animations are the invisible layer that turns good into unforgettable.",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Features() {
  return (
    <section id="features" className="px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <h2 className="font-display text-4xl font-bold text-white md:text-6xl">
            What we <span className="gradient-text">do</span>
          </h2>
          <p className="mt-4 text-white/40">
            A full-spectrum creative studio for the digital age.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={cardVariants}
              className="group rounded-2xl border border-white/8 bg-white/4 p-8 backdrop-blur-sm hover:border-violet-500/40 hover:bg-white/6 transition-all"
            >
              <span className="text-2xl text-violet-400">{f.icon}</span>
              <h3 className="mt-4 font-display text-xl font-semibold text-white">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/50">
                {f.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
