# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run start    # Start production server
```

## Architecture

**Next.js 14 App Router** — all routes live under `app/`. The root layout (`app/layout.tsx`) loads two Google fonts: Inter (body, `--font-sans`) and Syne (display headings, `--font-syne`).

### Component structure

```
app/page.tsx          — Composes all sections top to bottom
components/
  Navbar.tsx          — Fixed nav, GSAP entrance, scroll-based bg opacity
  Hero.tsx            — Full-screen, GSAP stagger entrance, periodic glitch, parallax
  Marquee.tsx         — Dual infinite CSS marquee bands
  Stats.tsx           — Count-up numbers via IntersectionObserver
  Work.tsx            — Horizontal scroll portfolio, GSAP ScrollTrigger pin
  Services.tsx        — Numbered service list, CSS hover accordion
  Footer.tsx          — Animated CTA headline, bottom bar
  ui/MagneticButton.tsx — Reusable magnetic cursor wrapper (GSAP)
hooks/
  useIsomorphicLayoutEffect.ts — useLayoutEffect safe for SSR
lib/
  gsap.ts             — Registers GSAP + ScrollTrigger once, re-exports both
```

### Animation system

- **GSAP + ScrollTrigger** (`lib/gsap.ts`) — all scroll-driven animations and entrance sequences
- **Pattern**: every animated component uses `useIsomorphicLayoutEffect` + `gsap.context()` with cleanup via `ctx.revert()`
- **Parallax**: `scrub: true` on background layers, `scrub: 2–3` on slower elements
- **Horizontal scroll** (`Work.tsx`): `pin: true`, `scrub: 1.2`, `invalidateOnRefresh: true`
- **Magnetic buttons**: `elastic.out(1, 0.3)` ease on mouse leave for the snap-back
- **Glitch**: CSS `.glitch-text` + `.glitching` class toggled by `setInterval` in `Hero.tsx`; layers use `clip-path` + `steps(1)` keyframes

### Styling

- **Color palette**: `#080808` bg · `#7B2FFF` violet · `#00F5FF` cyan — available as `brand.bg / brand.violet / brand.cyan` in Tailwind and as CSS vars `--violet / --cyan`
- **Typography**: `font-display` (Syne) for all headings; `font-sans` (Inter) for body
- **Fluid sizing**: `clamp()` via inline styles for hero/card headings; `text-[min(Xvw,Ypx)]` in Tailwind for others
- **CSS utilities** in `globals.css`: `.glitch-text`, `.glitching`, `.neon-glow`, `.neon-cyan`, `.gradient-text`, `.hero-grid`, `.marquee-track`, `.marquee-track-reverse`
- **Noise overlay**: `body::after` with SVG feTurbulence at `opacity: 0.025`
- shadcn/ui components go in `components/ui/`; add with `npx shadcn@latest add <component>`
