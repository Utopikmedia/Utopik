"use client";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 px-[8vw] py-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <span className="font-display text-base font-black text-white">
          UTOPIK<span className="text-brand-electric">.</span>MÉDIA
        </span>

        <span className="text-[11px] text-white/20 tracking-widest">
          © {new Date().getFullYear()} Utopik Média — Saguenay-Lac-Saint-Jean
        </span>

        <div className="flex gap-8">
          {["Instagram", "Facebook", "LinkedIn"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-[11px] tracking-widest uppercase text-white/25 hover:text-white transition-colors duration-300"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
