"use client";

import { useEffect, useRef } from "react";

interface Particle {
  angle: number;
  radius: number;
  speed: number;
  size: number;
  alpha: number;
  color: string;
  layer: number;
}

const COLORS = ["#2B6FD4", "#7EB3F5", "#1A3F8F", "#5B9AEA", "#9EC8FF"];

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: Particle[] = [];

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function init() {
      if (!canvas) return;
      particles.length = 0;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const maxRadius = Math.min(cx, cy) * 0.95;

      // Three orbit layers: tight, mid, wide
      const layers = [
        { count: 28, rMin: maxRadius * 0.28, rMax: maxRadius * 0.42, speedMul: 1.0 },
        { count: 22, rMin: maxRadius * 0.50, rMax: maxRadius * 0.65, speedMul: 0.65 },
        { count: 16, rMin: maxRadius * 0.72, rMax: maxRadius * 0.90, speedMul: 0.4 },
      ];

      layers.forEach(({ count, rMin, rMax, speedMul }, li) => {
        for (let i = 0; i < count; i++) {
          particles.push({
            angle: Math.random() * Math.PI * 2,
            radius: rMin + Math.random() * (rMax - rMin),
            speed: (0.0003 + Math.random() * 0.0004) * speedMul * (Math.random() > 0.5 ? 1 : -1),
            size: 0.8 + Math.random() * 1.8,
            alpha: 0.3 + Math.random() * 0.6,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            layer: li,
          });
        }
      });
    }

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      particles.forEach((p) => {
        p.angle += p.speed;
        const x = cx + Math.cos(p.angle) * p.radius;
        const y = cy + Math.sin(p.angle) * p.radius * 0.38; // flatten ellipse

        // Depth fade based on y position in ellipse
        const depth = (Math.sin(p.angle) + 1) / 2; // 0 = back, 1 = front
        const layerAlpha = p.layer === 0 ? 1 : p.layer === 1 ? 0.75 : 0.5;
        const finalAlpha = p.alpha * layerAlpha * (0.4 + depth * 0.6);

        ctx.beginPath();
        ctx.arc(x, y, p.size * (0.6 + depth * 0.4), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = finalAlpha;
        ctx.fill();

        // Soft glow on front particles
        if (depth > 0.7 && p.size > 1.5) {
          ctx.beginPath();
          ctx.arc(x, y, p.size * 3, 0, Math.PI * 2);
          const grad = ctx.createRadialGradient(x, y, 0, x, y, p.size * 3);
          grad.addColorStop(0, p.color + "60");
          grad.addColorStop(1, p.color + "00");
          ctx.fillStyle = grad;
          ctx.globalAlpha = finalAlpha * 0.5;
          ctx.fill();
        }
      });

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    }

    resize();
    init();
    draw();

    const ro = new ResizeObserver(() => { resize(); init(); });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
