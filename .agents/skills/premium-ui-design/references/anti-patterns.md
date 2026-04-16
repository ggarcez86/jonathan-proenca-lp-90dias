# Anti-Patterns — The Lovable/v0/Bolt Default Checklist

Check the plan against this list before writing code. Every match is a failure signal. Revise before executing.

## Color

- ❌ Purple → pink gradient hero background
- ❌ Blue → purple → pink rainbow gradient anywhere
- ❌ Accent color used uniformly throughout (CTAs, icons, links, borders, highlights — all the same)
- ❌ Pure `#FFFFFF` white backgrounds (use warm off-white in light mode)
- ❌ Pure `#000000` black (use warm black `#0A0A0B` or warmer)
- ❌ Neon-saturated accents on dark backgrounds (desaturate for sophistication)
- ❌ Muted pastels as primary palette (feels 2021 SaaS-startup)
- ❌ Gradients on cards, buttons, or small UI elements (gradients are hero-only, at most)

**Replacement:** Dominant neutral + one strategic accent used in ~3 intentional places. See `design-families.md` for palettes.

---

## Typography

- ❌ Inter as display font
- ❌ Inter as body font AND display font (no contrast)
- ❌ Geist everywhere (becoming the new Inter)
- ❌ Roboto, Open Sans, Lato (generic web-safe)
- ❌ Montserrat with uppercase tracking (2018 startup vibe)
- ❌ Poppins (too friendly for premium)
- ❌ All text in medium weight (no hierarchy)
- ❌ H1 only 2x body size (timid scale)
- ❌ Letter-spacing on body text (only labels/uppercase should have tracking)
- ❌ Line-height too loose on display type (display should be tight: 0.95–1.1)

**Replacement:** Distinctive display font paired with a refined body font. Aggressive scale ratio. See family-specific recommendations.

---

## Layout

- ❌ Centered hero: headline → subhead → button → product mockup
- ❌ 3-column feature grid with 6 identical cards
- ❌ "Features" section titled literally "Features"
- ❌ Symmetric testimonial grid: 3 cards, avatar top, quote, name+role bottom
- ❌ Pricing section with 3 tiers in a row, middle one "Popular"
- ❌ FAQ as accordion below the fold with default chevron icon
- ❌ Logo bar: "Trusted by" + 6 grayscale logos in a row
- ❌ Identical spacing between all sections (no rhythm)

**Replacement:** Asymmetry. Varied section densities. One dominant element per viewport. Break the grid deliberately in one place per page.

---

## Components

- ❌ Lucide/Heroicon in a colored circle above every feature title
- ❌ Every card with `rounded-2xl` + `shadow-lg` + hover scale
- ❌ Buttons with gradient backgrounds (purple→pink→blue)
- ❌ "✨ New" or "🚀 Launch" badges with gradient
- ❌ Avatar circles with border ring in accent color
- ❌ Generic "placeholder.svg" or stock Unsplash hero images
- ❌ Floating blur orbs in hero background (the "Vercel template" move, now stale)
- ❌ Feature cards with a single emoji as the icon

**Replacement:** Typography-led components. Icons only when functional. Borders over shadows on dark. Intentional rounding (some elements sharp, some soft — not everything rounded).

---

## Copy (CTAs and microcopy)

- ❌ "Get Started"
- ❌ "Try it free"
- ❌ "Sign up"
- ❌ "Learn more"
- ❌ "Join the waitlist"
- ❌ "Coming soon"
- ❌ "Built for [role]"
- ❌ "The easiest way to [verb]"
- ❌ "AI-powered [noun]" as headline (especially tired)

**Replacement:** Verbs specific to the promise. "Reserve my seat", "Claim the session", "Apply to the cohort", "Get the framework". Language should feel like the expert wrote it, not a template.

---

## Motion

- ❌ `fade-in-up` with staggered delay on every section (the Framer Motion default)
- ❌ Hover scale-105 on every card
- ❌ Animated gradient background in hero
- ❌ Particle/constellation connecting-dots hero animation
- ❌ Typewriter effect on hero headline (overused since ChatGPT's homepage)
- ❌ Rotating text carousel ("build faster", "ship quicker", "scale easier")

**Replacement:** One orchestrated load moment. Scroll-triggered reveals with more than just opacity (blur, scale, clip-path, y-translate combined). Hover states that surprise. Magnetic cursor on primary CTA only.

---

## Forms

- ❌ Form in a `rounded-2xl` card with shadow, floating in the middle of the page
- ❌ All fields required, same visual weight
- ❌ Submit button labeled "Submit"
- ❌ Placeholder text that repeats the label
- ❌ Success state that just says "Thanks!"
- ❌ Email input with no helper text and no validation styling

**Replacement:** Form integrated into the layout (not floating card). Labels above inputs, small and tracked. Submit button styled distinctly per family. Success state is a designed moment (not a toast).

---

## Images and icons

- ❌ Generic SaaS 3D illustrations (purple geometric shapes)
- ❌ Lucide icons as primary visual content
- ❌ AI-generated portrait-with-glasses-looking-at-laptop stock
- ❌ Unsplash search-result photos without treatment
- ❌ Overly symmetric "hands on laptop" hero images

**Replacement:** Real photography of the expert (properly shot, color-graded). Editorial-style typography compositions. Abstract type art as hero. When using icons, use them sparingly and functionally — not decoratively.

---

## Dark-mode specific

- ❌ `bg-black` with `text-white` and a purple accent (v0 default)
- ❌ Shadow-heavy cards on dark (shadows barely work on dark — use border + surface elevation)
- ❌ Neon green / neon pink accents on pure black
- ❌ Gradient text on dark (hero text should be solid and confident)

**Replacement:** Warm black base + multiple surface levels + thin borders. One accent color, desaturated. Text in a contrast ladder (high / mid / low) for hierarchy.

---

## Self-check question

After writing any UI code, ask: **"Could this have been generated by clicking 'build a landing page for [X]' in v0 or Lovable with zero prompt refinement?"**

If yes → revise. The goal is output that looks like someone actually designed it.
