# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run start    # Start production server
```

## Architecture

**Next.js 14 App Router** — all routes live under `app/`. The root layout (`app/layout.tsx`) loads two Google fonts: Inter (body) and Syne (display headings) and wraps every page.

**Component structure:**
- `components/` — shared UI components used in `app/page.tsx`
  - `Navbar.tsx` — fixed top nav with logo, links, CTA
  - `Hero.tsx` — full-screen hero with ambient glow and framer-motion fade-up animations
  - `Features.tsx` — 2-column grid of feature cards with stagger animation on scroll
  - `Footer.tsx` — minimal footer with brand/social links

**Styling:**
- Tailwind CSS with two custom font families: `font-sans` (Inter) and `font-display` (Syne)
- Dark background (`#07070f`) with violet/fuchsia/pink gradient accents
- Custom utility `.gradient-text` defined in `globals.css` for gradient headlines
- Glass-morphism card style: `bg-white/4 border border-white/8 backdrop-blur-sm`

**Animations:**
- All components are `"use client"` and use `framer-motion`
- Entrance animations use a `fadeUp` variant (y: 30 → 0, opacity: 0 → 1) with custom delay
- Scroll-triggered animations use `whileInView` with `viewport={{ once: true }}`
- Feature cards use `staggerChildren` via a `containerVariants` / `cardVariants` pattern
