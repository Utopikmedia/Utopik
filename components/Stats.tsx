"use client";

import { useRef, useState, useEffect } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { gsap } from "@/lib/gsap";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { value: 150, suffix: "+", label: "Projects Delivered" },
  { value: 40,  suffix: "+", label: "Global Clients" },
  { value: 8,   suffix: "",  label: "Years of Craft" },
  { value: 12,  suffix: "",  label: "Industry Awards" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();

        const duration = 1800;
        const startTime = performance.now();
        const tick = (now: number) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * target));
          if (progress < 1) requestAnimationFrame(tick);
          else setCount(target);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".stat-item", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          once: true,
        },
      });

      gsap.to(".stats-line", {
        scaleX: 1,
        duration: 1.2,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="px-[8vw] py-32 bg-brand-bg">
      <div className="mb-16">
        <div className="flex items-center gap-4 mb-6">
          <span className="block w-8 h-px bg-[#7B2FFF]" />
          <span className="text-[11px] text-[#7B2FFF] tracking-[0.35em] uppercase">02 — Numbers</span>
        </div>
        <div
          className="stats-line block h-px bg-white/8"
          style={{ transform: "scaleX(0)", transformOrigin: "left" }}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
        {stats.map((s) => (
          <div key={s.label} className="stat-item">
            <p
              className="font-display font-black leading-none text-white mb-3"
              style={{ fontSize: "clamp(52px, 7vw, 96px)" }}
            >
              <Counter target={s.value} suffix={s.suffix} />
            </p>
            <p className="text-xs tracking-widest uppercase text-white/30">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
