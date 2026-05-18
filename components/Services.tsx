"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useAnimation } from "framer-motion";

const services = [
  {
    icon: "🎬",
    title: "Vidéo corporative",
    description:
      "Films d'entreprise, capsules Reels, documentaires courts. Chaque frame raconte votre histoire avec intention.",
    delay: 0,
  },
  {
    icon: "📷",
    title: "Photographie",
    description:
      "Portraits de marque, shooting produit, événements. Des visuels qui s'impriment dans la mémoire.",
    delay: 0.12,
  },
  {
    icon: "📊",
    title: "Stratégie de contenu",
    description:
      "Planification éditoriale, calendrier et analyse de performance. La méthode derrière la créativité.",
    delay: 0.24,
  },
  {
    icon: "📱",
    title: "Gestion des réseaux sociaux",
    description:
      "Gestion de vos réseaux sociaux et de vos campagnes Meta Ads pour maximiser votre portée.",
    delay: 0.36,
  },
];

/* ── Individual 3D card ─────────────────────────────────────── */
function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const iconControls = useAnimation();

  // Mouse-tracking motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 200,
    damping: 28,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 200,
    damping: 28,
  });

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY]
  );

  const onHoverStart = useCallback(() => {
    setHovered(true);
    // Single 360° spin, then instantly reset for next hover
    iconControls.start({
      rotate: 360,
      transition: { duration: 0.55, ease: "easeInOut" },
    });
  }, [iconControls]);

  const onHoverEnd = useCallback(() => {
    setHovered(false);
    mouseX.set(0);
    mouseY.set(0);
    iconControls.set({ rotate: 0 });
  }, [iconControls, mouseX, mouseY]);

  return (
    // Entrance: flip in from Y axis
    <motion.div
      initial={{ rotateY: 90, opacity: 0, scale: 0.9 }}
      whileInView={{ rotateY: 0, opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65, delay: service.delay, ease: "easeOut" }}
      style={{ perspective: "1000px" }}
      className="h-full"
    >
      {/* Tilt + hover lift wrapper */}
      <motion.div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onHoverStart={onHoverStart}
        onHoverEnd={onHoverEnd}
        animate={{
          y: hovered ? -14 : 0,
          boxShadow: hovered
            ? "0 28px 70px rgba(43,111,212,0.38), 0 0 0 1px rgba(126,179,245,0.5)"
            : "0 0 0 1px rgba(43,111,212,0.18)",
        }}
        transition={{
          y: { duration: 0.3, ease: "easeOut" },
          boxShadow: { duration: 0.3 },
        }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          minHeight: "320px",
        }}
        className="relative flex flex-col p-8 h-full cursor-default overflow-hidden"
      >
        {/* ── Rotating border sweep (shown on hover) ── */}
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, rotate: [0, 360] }}
            transition={{
              opacity: { duration: 0.2 },
              rotate: { duration: 2.5, repeat: Infinity, ease: "linear" },
            }}
            className="absolute pointer-events-none"
            style={{
              inset: "-1px",
              background:
                "conic-gradient(from 0deg, transparent 0deg, #2B6FD4 80deg, #7EB3F5 110deg, transparent 160deg)",
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              padding: "1px",
            }}
          />
        )}

        {/* Default border (always visible) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ border: "1px solid rgba(43,111,212,0.18)" }}
        />

        {/* ── Corner accent ── */}
        <div
          className="absolute top-0 right-0 w-16 h-16 pointer-events-none"
          style={{
            background:
              "linear-gradient(225deg, rgba(43,111,212,0.12) 0%, transparent 65%)",
          }}
        />

        {/* ── Number ── */}
        <span
          className="font-display text-xs font-bold mb-5"
          style={{ color: "rgba(43,111,212,0.4)" }}
        >
          0{index + 1}
        </span>

        {/* ── Icon ── */}
        <motion.div
          animate={iconControls}
          className="text-5xl mb-6 select-none"
          style={{ display: "inline-block", transformOrigin: "center" }}
        >
          {service.icon}
        </motion.div>

        {/* ── Title ── */}
        <h3
          className="font-display font-black text-white leading-tight mb-3"
          style={{ fontSize: "clamp(17px, 1.5vw, 21px)" }}
        >
          {service.title}
        </h3>

        {/* ── Description ── */}
        <p className="text-white/30 text-sm leading-relaxed flex-1 mb-6">
          {service.description}
        </p>

        {/* ── Hover CTA ── */}
        <motion.div
          animate={{ x: hovered ? 0 : -8, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="text-[11px] tracking-widest uppercase"
          style={{ color: "#7EB3F5" }}
        >
          En savoir plus →
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ── Section ────────────────────────────────────────────────── */
export default function Services() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Glitch on load: a few rapid x/clip jitters via Framer Motion
  const glitchControls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      for (let i = 0; i < 3; i++) {
        await new Promise((r) => setTimeout(r, 600 + i * 700));
        await glitchControls.start({
          x: [-4, 5, -3, 4, 0],
          skewX: [-2, 2, -1, 1, 0],
          opacity: [1, 0.7, 1, 0.8, 1],
          transition: { duration: 0.25, ease: "easeInOut" },
        });
      }
    };
    sequence();
  }, [glitchControls]);

  return (
    <section id="services" className="relative py-32 px-[8vw] overflow-hidden">

      {/* ── Ambient glow ── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(43,111,212,0.07) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      {/* ── Header ── */}
      <div className="relative z-10 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="block w-8 h-px bg-brand-electric" />
          <span className="text-[11px] text-brand-electric tracking-[0.35em] uppercase">
            02 — Services
          </span>
        </motion.div>

        <motion.h2
          ref={titleRef}
          animate={glitchControls}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="font-display font-black text-white leading-tight mb-4 relative"
          style={{ fontSize: "clamp(36px, 5.5vw, 72px)" }}
        >
          Nos{" "}
          <span className="gradient-text">Services</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-white/35 text-sm tracking-[0.1em]"
        >
          Du contenu qui capte, engage et convertit
        </motion.p>
      </div>

      {/* ── Cards grid ── */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {services.map((s, i) => (
          <ServiceCard key={s.title} service={s} index={i} />
        ))}
      </div>
    </section>
  );
}
