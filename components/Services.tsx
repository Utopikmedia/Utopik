"use client";

import { useEffect, useRef } from "react";

const services = [
  {
    number: "01",
    title: "Vidéo",
    description: "Films d'entreprise, capsules sociales, documentaires courts. Chaque image raconte votre histoire avec intention.",
    tags: ["Corporate", "Social Media", "Documentaire"],
  },
  {
    number: "02",
    title: "Photographie",
    description: "Identité visuelle, campagnes publicitaires, portrait de marque. Des visuels qui s'impriment dans la mémoire.",
    tags: ["Portrait", "Produit", "Événement"],
  },
  {
    number: "03",
    title: "Stratégie de contenu",
    description: "Planification éditoriale, calendrier de contenu, analyse de performance. La méthode derrière la créativité.",
    tags: ["Planification", "Analyse", "Croissance"],
  },
  {
    number: "04",
    title: "Réseaux sociaux",
    description: "Gestion de communauté, création de contenus natifs, croissance organique. Votre présence, amplifiée.",
    tags: ["Instagram", "TikTok", "LinkedIn"],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll<HTMLElement>(".service-item");
    if (!items) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="bg-brand-bg py-32 px-[8vw]">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <span className="block w-8 h-px bg-brand-electric" />
        <span className="text-[11px] text-brand-electric tracking-[0.35em] uppercase">
          02 — Services
        </span>
      </div>

      <h2
        className="font-display font-black text-white leading-tight mb-20"
        style={{ fontSize: "clamp(36px, 5.5vw, 72px)" }}
      >
        Ce qu&apos;on<br />
        <span className="gradient-text">crée ensemble</span>
      </h2>

      {/* Service list */}
      <div className="divide-y divide-white/5">
        {services.map((s, i) => (
          <div
            key={s.number}
            className="service-item reveal group flex flex-col md:flex-row md:items-start gap-6 md:gap-12 py-10 cursor-default"
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <span className="font-display text-sm text-brand-electric/50 font-bold w-10 shrink-0 pt-1">
              {s.number}
            </span>

            <div className="flex-1 min-w-0">
              <h3
                className="font-display font-black text-white group-hover:text-brand-light transition-colors duration-300 mb-3"
                style={{ fontSize: "clamp(22px, 2.8vw, 36px)" }}
              >
                {s.title}
              </h3>
              <p className="text-white/35 text-sm leading-relaxed max-w-xl mb-5">
                {s.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] tracking-widest uppercase text-brand-electric/60 px-3 py-1"
                    style={{ border: "1px solid rgba(43,111,212,0.2)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="hidden md:flex items-center self-center">
              <span className="text-[11px] tracking-widest uppercase text-white/15 group-hover:text-brand-light/60 transition-colors duration-300">
                Explorer →
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
