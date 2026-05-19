"use client";

import { useEffect, useRef } from "react";

interface Particle {
  angle: number;
  radius: number;
  speed: number;
  targetSpeed: number;
  size: number;
  alpha: number;
  color: string;
  layer: number;
}

const COLORS = ["#2B6FD4", "#7EB3F5", "#1A3F8F", "#5B9AEA", "#9EC8FF"];

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animIdRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

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

      // Three orbit layers: 80 total particles
      const layers = [
        { count: 32, rMin: maxRadius * 0.26, rMax: maxRadius * 0.42, speedMul: 1.0 },
        { count: 28, rMin: maxRadius * 0.50, rMax: maxRadius * 0.66, speedMul: 0.65 },
        { count: 20, rMin: maxRadius * 0.72, rMax: maxRadius * 0.92, speedMul: 0.38 },
      ];

      layers.forEach(({ count, rMin, rMax, speedMul }, li) => {
        for (let i = 0; i < count; i++) {
          const baseSpeed = (0.00022 + Math.random() * 0.00028) * speedMul;
          const dir = Math.random() > 0.5 ? 1 : -1;
          particles.push({
            angle: Math.random() * Math.PI * 2,
            radius: rMin + Math.random() * (rMax - rMin),
            speed: baseSpeed * dir,
            targetSpeed: baseSpeed * dir,
            size: 0.7 + Math.random() * 2.0,
            alpha: 0.25 + Math.random() * 0.65,
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
        // Ease current speed toward target (fluid acceleration)
        p.speed += (p.targetSpeed - p.speed) * 0.04;
        p.angle += p.speed;

        const x = cx + Math.cos(p.angle) * p.radius;
        const y = cy + Math.sin(p.angle) * p.radius * 0.36;

        // Depth: 0 = back, 1 = front
        const depth = (Math.sin(p.angle) + 1) / 2;
        const layerAlpha = p.layer === 0 ? 1 : p.layer === 1 ? 0.75 : 0.5;
        const finalAlpha = p.alpha * layerAlpha * (0.35 + depth * 0.65);
        const finalSize = p.size * (0.55 + depth * 0.45);

        // Core dot
        ctx.beginPath();
        ctx.arc(x, y, finalSize, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = finalAlpha;
        ctx.fill();

        // Soft radial glow on larger front particles
        if (depth > 0.65 && p.size > 1.4) {
          const glowR = finalSize * 3.5;
          ctx.beginPath();
          ctx.arc(x, y, glowR, 0, Math.PI * 2);
          const grad = ctx.createRadialGradient(x, y, 0, x, y, glowR);
          grad.addColorStop(0, p.color + "55");
          grad.addColorStop(1, p.color + "00");
          ctx.fillStyle = grad;
          ctx.globalAlpha = finalAlpha * 0.45;
          ctx.fill();
        }
      });

      ctx.globalAlpha = 1;
      animIdRef.current = requestAnimationFrame(draw);
    }

    resize();
    init();
    draw();

    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(animIdRef.current);
      resize();
      init();
      draw();
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animIdRef.current);
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
