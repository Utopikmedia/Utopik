"use client";

import { motion } from "framer-motion";

const features = [
  { icon: "✦", label: "Plan personnalisé" },
  { icon: "✦", label: "Scripts accrocheurs prêts" },
  { icon: "✦", label: "Coaching et soutien devant la caméra" },
  { icon: "✦", label: "Images haute qualité — caméra professionnelle" },
  { icon: "✦", label: "Montage créatif original" },
  { icon: "✦", label: "Mise en réseau" },
];

const packages = [
  {
    name: "Croissance",
    price: "599$",
    badge: "Pour démarrer",
    badgeFeatured: false,
    description: "L'entrée en matière idéale pour bâtir votre présence et tester ce qui résonne avec votre audience.",
    highlight: [
      "3 vidéos Reels verticaux (30s–60s)",
      "Option: +30 photos professionnelles (shooting 30 min)",
      "Durée: 2 à 4 heures",
    ],
    featured: false,
  },
  {
    name: "Omniprésence",
    price: "1 799$",
    badge: "Le plus populaire",
    badgeFeatured: true,
    description: "La formule préférée de nos clients. Un flux constant de contenu qui installe votre autorité partout où vous apparaissez.",
    highlight: [
      "12 vidéos Reels",
    ],
    featured: true,
  },
  {
    name: "Élite",
    price: "3 999$",
    badge: "Pour les leaders",
    badgeFeatured: false,
    description: "Pour les marques qui refusent de passer inaperçues. Un volume de contenu qui domine votre marché.",
    highlight: [
      "30 vidéos Reels",
    ],
    featured: false,
  },
];


export default function Packages() {
  return (
    <section id="packs" className="bg-brand-bg py-32 px-[8vw] overflow-hidden">

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex items-center gap-4 mb-6">
          <span className="block w-8 h-px bg-brand-electric" />
          <span className="text-[11px] text-brand-electric tracking-[0.35em] uppercase">
            04 — Nos Packs Contenu
          </span>
        </div>

        <h2
          className="font-display font-black text-white leading-tight mb-4"
          style={{ fontSize: "clamp(36px, 5.5vw, 72px)" }}
        >
          Nos Packs{" "}
          <span className="gradient-text">Contenu</span>
        </h2>

        <p className="text-white/35 text-sm tracking-[0.12em] uppercase mb-20">
          Du contenu organique qui convertit — fait à Saguenay
        </p>
      </motion.div>

      {/* ── "Ce que chaque pack inclut" ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-20"
      >
        <p
          className="font-display font-black text-white mb-8"
          style={{ fontSize: "clamp(16px, 1.6vw, 22px)" }}
        >
          Ce que chaque pack inclut
        </p>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-5 max-w-2xl"
        >
          {features.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: "easeOut" }}
              className="flex items-start gap-4"
            >
              <span
                className="mt-0.5 shrink-0 text-[10px] font-bold"
                style={{ color: "#7EB3F5" }}
              >
                {f.icon}
              </span>
              <span className="text-white/60 text-sm leading-snug">{f.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Separator */}
        <div
          className="mt-16 h-px w-full"
          style={{ background: "linear-gradient(90deg, rgba(43,111,212,0.4) 0%, transparent 100%)" }}
        />
      </motion.div>

      {/* ── Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end">
        {packages.map((pkg, i) => (
          <motion.div
            key={pkg.name}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: i * 0.15, ease: "easeOut" }}
            whileHover={{
              y: pkg.featured ? -10 : -6,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
            className="relative group cursor-default"
            style={{ paddingTop: pkg.featured ? "0" : "0" }}
          >
            {/* Featured glow */}
            {pkg.featured && (
              <div
                className="absolute -inset-px rounded-none pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "transparent",
                  boxShadow: "0 0 60px rgba(43,111,212,0.35), 0 0 120px rgba(43,111,212,0.15)",
                }}
              />
            )}

            {/* Always-on featured glow (subtle) */}
            {pkg.featured && (
              <div
                className="absolute -inset-[1px] pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, #2B6FD4 0%, #7EB3F5 50%, #2B6FD4 100%)",
                  padding: "1px",
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              />
            )}

            {/* Card body */}
            <div
              className={`relative flex flex-col h-full ${pkg.featured ? "pt-8 pb-10 px-8" : "pt-7 pb-8 px-7"}`}
              style={{
                background: pkg.featured
                  ? "linear-gradient(160deg, #0a1628 0%, #080808 60%)"
                  : "#0a0a0a",
                border: pkg.featured
                  ? "1px solid rgba(126,179,245,0.35)"
                  : "1px solid rgba(43,111,212,0.15)",
                minHeight: pkg.featured ? "520px" : "460px",
              }}
            >
              {/* Badge */}
              <div className="mb-6">
                <span
                  className="inline-block text-[10px] tracking-widest uppercase px-3 py-1"
                  style={{
                    border: pkg.badgeFeatured
                      ? "1px solid rgba(126,179,245,0.5)"
                      : "1px solid rgba(43,111,212,0.25)",
                    color: pkg.badgeFeatured ? "#7EB3F5" : "rgba(255,255,255,0.3)",
                    background: pkg.badgeFeatured ? "rgba(43,111,212,0.12)" : "transparent",
                    boxShadow: pkg.badgeFeatured ? "0 0 16px rgba(43,111,212,0.2)" : "none",
                  }}
                >
                  {pkg.badge}
                </span>
              </div>

              {/* Name */}
              <h3
                className="font-display font-black text-white mb-5 leading-none"
                style={{ fontSize: "clamp(22px, 2vw, 28px)" }}
              >
                {pkg.name}
              </h3>

              {/* Price */}
              <div className="mb-6">
                <span
                  className="font-display font-black leading-none"
                  style={{
                    fontSize: pkg.featured ? "clamp(42px, 4vw, 58px)" : "clamp(36px, 3.2vw, 48px)",
                    background: pkg.featured
                      ? "linear-gradient(135deg, #ffffff 30%, #7EB3F5 100%)"
                      : "linear-gradient(135deg, #c8d8f0 0%, #7EB3F5 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {pkg.price}
                </span>
                <div
                  className="mt-2 h-px w-10"
                  style={{
                    background: pkg.featured
                      ? "linear-gradient(90deg, #7EB3F5, transparent)"
                      : "linear-gradient(90deg, rgba(43,111,212,0.5), transparent)",
                  }}
                />
              </div>

              {/* Description */}
              <p className="text-white/30 text-sm leading-relaxed mb-8 flex-1">
                {pkg.description}
              </p>

              {/* Differentiator highlight */}
              <div
                className="mb-8 py-5 px-5"
                style={{
                  background: "rgba(43,111,212,0.06)",
                  border: "1px solid rgba(43,111,212,0.12)",
                }}
              >
                {pkg.highlight.map((line) => (
                  <div key={line} className="flex items-start gap-3 mb-2 last:mb-0">
                    <span className="mt-1 text-[8px] text-brand-light shrink-0">◆</span>
                    <span className="text-white/70 text-sm leading-snug">{line}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <a
                href="#contact"
                className="group/btn relative overflow-hidden flex items-center justify-center gap-4 py-4 text-xs tracking-widest uppercase text-white transition-all duration-300"
                style={{
                  background: pkg.featured
                    ? "linear-gradient(135deg, #1A3F8F 0%, #2B6FD4 100%)"
                    : "transparent",
                  border: pkg.featured
                    ? "1px solid rgba(126,179,245,0.25)"
                    : "1px solid rgba(43,111,212,0.3)",
                }}
              >
                <span className="relative z-10">Nous contacter</span>
                <span className="relative z-10 block w-5 h-px bg-current transform group-hover/btn:translate-x-1 transition-transform duration-300" />
                {!pkg.featured && (
                  <span
                    className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(135deg, #1A3F8F 0%, #2B6FD4 100%)" }}
                  />
                )}
                {pkg.featured && (
                  <span
                    className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(135deg, #2B6FD4 0%, #7EB3F5 100%)" }}
                  />
                )}
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fine print */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-10 text-[11px] text-white/15 tracking-wide text-center"
      >
        Chaque pack est personnalisé selon vos besoins. Contactez-nous pour un devis sur mesure.
      </motion.p>
    </section>
  );
}
