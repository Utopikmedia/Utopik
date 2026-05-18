"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useAnimationFrame,
  useAnimation,
} from "framer-motion";

export default function LogoHero() {
  const ref = useRef<HTMLDivElement>(null);
  const hoveredRef = useRef(false);
  const [hovered, setHovered] = useState(false);
  const glowControls = useAnimation();

  // ── Sync hovered ref for use inside animation frame ──
  useEffect(() => {
    hoveredRef.current = hovered;
  }, [hovered]);

  // ── Pulse glow in sync with rotation speed ────────────
  useEffect(() => {
    glowControls.start({
      scale: [1, hovered ? 1.35 : 1.18, 1],
      opacity: [hovered ? 0.75 : 0.45, hovered ? 1 : 0.7, hovered ? 0.75 : 0.45],
      transition: {
        duration: hovered ? 1.1 : 3.6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    });
  }, [hovered, glowControls]);

  // ── Continuous Y-axis spin (frame-by-frame) ───────────
  const spinY = useMotionValue(0);
  useAnimationFrame((_, delta) => {
    // normal ≈ 1 rotation per 7s, hover ≈ 1 per 1.8s
    const speed = hoveredRef.current ? 0.2 : 0.052;
    spinY.set((spinY.get() + delta * speed) % 360);
  });

  // ── Mouse-cursor perspective tilt ─────────────────────
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const tiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [14, -14]), {
    stiffness: 120,
    damping: 20,
  });
  const tiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), {
    stiffness: 120,
    damping: 20,
  });

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.1, delay: 1, ease: "easeOut" }}
      className="relative flex items-center justify-center select-none"
      style={{ perspective: "700px" }}
    >
      {/* ── Glow halo (sits behind, doesn't rotate) ── */}
      <motion.div
        animate={glowControls}
        className="absolute pointer-events-none rounded-full"
        style={{
          width: "200px",
          height: "200px",
          background:
            "radial-gradient(circle, rgba(123,47,255,0.55) 0%, rgba(0,245,255,0.22) 50%, transparent 72%)",
          filter: "blur(28px)",
        }}
      />

      {/* ── Layer 1: cursor tilt (preserve-3d) ── */}
      <motion.div
        ref={ref}
        style={{
          rotateX: tiltX,
          rotateY: tiltY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="relative z-10 cursor-crosshair"
      >
        {/* ── Layer 2: continuous spin (preserve-3d) ── */}
        <motion.div
          style={{
            rotateY: spinY,
            transformStyle: "preserve-3d",
          }}
        >
          <Image
            src="/logo.png"
            alt="Utopik"
            width={333}
            height={400}
            priority
            style={{ width: "auto", height: "120px", display: "block" }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
