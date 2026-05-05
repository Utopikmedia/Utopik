"use client";

const itemsA = ["Design", "✦", "Technology", "✦", "Motion", "✦", "Creative", "✦", "Experience", "✦", "Strategy", "✦"];
const itemsB = ["Brand Identity", "◈", "Web Experience", "◈", "Art Direction", "◈", "Innovation", "◈", "Interaction", "◈"];

function MarqueeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden py-3 border-y border-white/5">
      <div className={reverse ? "marquee-track-reverse" : "marquee-track"}>
        {doubled.map((item, i) => (
          <span
            key={i}
            className={`px-6 font-display text-sm font-semibold uppercase tracking-widest whitespace-nowrap ${
              item === "✦" || item === "◈"
                ? "text-[#7B2FFF]"
                : "text-white/20"
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <section className="bg-brand-bg">
      <MarqueeRow items={itemsA} />
      <MarqueeRow items={itemsB} reverse />
    </section>
  );
}
