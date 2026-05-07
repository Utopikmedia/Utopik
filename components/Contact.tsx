"use client";

import { useEffect, useRef } from "react";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll<HTMLElement>(".contact-reveal");
    if (!items) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="bg-brand-bg py-32 px-[8vw] border-t border-white/5">
      {/* Header */}
      <div className="contact-reveal reveal flex items-center gap-4 mb-6">
        <span className="block w-8 h-px bg-brand-electric" />
        <span className="text-[11px] text-brand-electric tracking-[0.35em] uppercase">
          05 — Contact
        </span>
      </div>

      <div className="grid lg:grid-cols-2 gap-16 items-start">
        {/* Left: headline */}
        <div>
          <h2
            className="contact-reveal reveal font-display font-black text-white leading-tight mb-8"
            style={{ fontSize: "clamp(36px, 5.5vw, 72px)", transitionDelay: "0.1s" }}
          >
            Prêt à créer<br />
            quelque chose<br />
            <span className="gradient-text">d&apos;extraordinaire?</span>
          </h2>

          <p
            className="contact-reveal reveal text-white/35 text-sm leading-relaxed max-w-sm mb-10"
            style={{ transitionDelay: "0.2s" }}
          >
            Basés au Saguenay-Lac-Saint-Jean, on travaille avec des entrepreneurs,
            des marques et des créateurs qui veulent une présence visuelle mémorable.
          </p>

          <div className="contact-reveal reveal flex flex-col gap-3" style={{ transitionDelay: "0.3s" }}>
            <a
              href="mailto:hello@utopik.media"
              className="text-brand-light/70 hover:text-white transition-colors duration-300 text-sm tracking-wide"
            >
              hello@utopik.media
            </a>
            <span className="text-white/25 text-sm">Saguenay, Québec</span>
          </div>
        </div>

        {/* Right: form */}
        <form
          className="contact-reveal reveal flex flex-col gap-5"
          style={{ transitionDelay: "0.15s" }}
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[10px] tracking-widest uppercase text-white/30 mb-2">
                Nom
              </label>
              <input
                type="text"
                placeholder="Jean Tremblay"
                className="w-full bg-transparent text-white text-sm px-4 py-3 outline-none placeholder-white/15 focus:border-brand-electric/60 transition-colors duration-300"
                style={{ border: "1px solid rgba(43,111,212,0.2)" }}
              />
            </div>
            <div>
              <label className="block text-[10px] tracking-widest uppercase text-white/30 mb-2">
                Courriel
              </label>
              <input
                type="email"
                placeholder="jean@entreprise.com"
                className="w-full bg-transparent text-white text-sm px-4 py-3 outline-none placeholder-white/15 focus:border-brand-electric/60 transition-colors duration-300"
                style={{ border: "1px solid rgba(43,111,212,0.2)" }}
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] tracking-widest uppercase text-white/30 mb-2">
              Type de projet
            </label>
            <select
              className="w-full bg-[#080808] text-white/60 text-sm px-4 py-3 outline-none appearance-none cursor-pointer transition-colors duration-300"
              style={{ border: "1px solid rgba(43,111,212,0.2)" }}
            >
              <option value="">Sélectionner...</option>
              <option>Vidéo</option>
              <option>Photographie</option>
              <option>Stratégie de contenu</option>
              <option>Réseaux sociaux</option>
              <option>Autre</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] tracking-widest uppercase text-white/30 mb-2">
              Message
            </label>
            <textarea
              rows={5}
              placeholder="Parlez-nous de votre projet..."
              className="w-full bg-transparent text-white text-sm px-4 py-3 outline-none placeholder-white/15 resize-none focus:border-brand-electric/60 transition-colors duration-300"
              style={{ border: "1px solid rgba(43,111,212,0.2)" }}
            />
          </div>

          <button
            type="submit"
            className="group relative overflow-hidden py-4 text-xs tracking-widest uppercase text-white transition-all duration-300 text-left px-8"
            style={{
              background: "linear-gradient(135deg, #1A3F8F 0%, #2B6FD4 100%)",
              border: "1px solid rgba(126,179,245,0.25)",
            }}
          >
            <span className="relative z-10">Envoyer le message</span>
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "linear-gradient(135deg, #2B6FD4 0%, #7EB3F5 100%)" }}
            />
          </button>
        </form>
      </div>
    </section>
  );
}
