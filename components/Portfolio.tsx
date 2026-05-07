"use client";

import { useEffect, useRef } from "react";

const projects = [
  {
    number: "01",
    title: "Campagne de marque",
    category: "Vidéo · Photographie",
    year: "2024",
    color: "#1A3F8F",
  },
  {
    number: "02",
    title: "Identité visuelle",
    category: "Photographie · Direction artistique",
    year: "2024",
    color: "#2B6FD4",
  },
  {
    number: "03",
    title: "Série documentaire",
    category: "Vidéo · Montage",
    year: "2024",
    color: "#1A3F8F",
  },
  {
    number: "04",
    title: "Stratégie réseaux",
    category: "Contenu · Stratégie",
    year: "2023",
    color: "#2B6FD4",
  },
  {
    number: "05",
    title: "Lancement de produit",
    category: "Vidéo · Photographie",
    year: "2023",
    color: "#1A3F8F",
  },
  {
    number: "06",
    title: "Portrait de fondateur",
    category: "Photographie · Portrait",
    year: "2023",
    color: "#2B6FD4",
  },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll<HTMLElement>(".portfolio-card");
    if (!cards) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    cards.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="portfolio" className="bg-brand-bg py-32 px-[8vw]">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <span className="block w-8 h-px bg-brand-electric" />
        <span className="text-[11px] text-brand-electric tracking-[0.35em] uppercase">
          03 — Portfolio
        </span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <h2
          className="font-display font-black text-white leading-tight"
          style={{ fontSize: "clamp(36px, 5.5vw, 72px)" }}
        >
          Nos derniers<br />
          <span className="gradient-text">projets</span>
        </h2>
        <a
          href="#contact"
          className="text-xs tracking-widest uppercase text-white/30 hover:text-white transition-colors duration-300 shrink-0"
        >
          Voir tout →
        </a>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((p, i) => (
          <div
            key={p.number}
            className="portfolio-card reveal group relative overflow-hidden cursor-pointer"
            style={{
              transitionDelay: `${i * 0.07}s`,
              aspectRatio: i === 0 || i === 5 ? "4/5" : "1/1",
            }}
          >
            {/* Background */}
            <div
              className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${p.color}cc 0%, #080808 100%)`,
              }}
            />

            {/* Grid texture */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: "linear-gradient(rgba(126,179,245,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(126,179,245,0.08) 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            />

            {/* Hover glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${p.color}30 0%, transparent 70%)`,
              }}
            />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-between p-7">
              <div className="flex items-start justify-between">
                <span className="font-display text-xs font-bold text-brand-light/40">
                  {p.number}
                </span>
                <span className="text-[10px] tracking-widest uppercase text-white/25">
                  {p.year}
                </span>
              </div>

              <div>
                <span className="text-[10px] tracking-widest uppercase text-brand-light/50 mb-2 block">
                  {p.category}
                </span>
                <h3
                  className="font-display font-black text-white leading-tight"
                  style={{ fontSize: "clamp(18px, 2vw, 26px)" }}
                >
                  {p.title}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
