# Component Patterns

Per-component guidance. Each component has three treatments — one per design family. Pick the treatment matching the chosen family.

---

## Hero

### Editorial treatment
- Asymmetric: headline left-aligned, spans ~66% of viewport width
- Oversized serif display (clamp 4rem → 8rem)
- Subhead in the SAME font as body, italic, much smaller
- No visual to the right — use whitespace as the visual
- Small label above headline in tracked uppercase (e.g., "A WORKSHOP BY [NAME] · NOVEMBER 18")
- CTA as a text link with underline or a thin-bordered button, never filled

### Dark AI-forward treatment
- Split 60/40: text left, interactive element right (form, animated visual, or gradient mesh)
- Headline in display sans or display serif, tight line-height
- One word in the headline in accent color OR italic (the "earned" emphasis)
- Subhead in body font, `text-mid` color, max-width ~520px
- Form embedded in hero on the right, styled per family
- Small proof strip at bottom of hero (logos OR "300+ C-level executives trust this method")

### Luxury Clean treatment
- Centered, symmetric, narrow content column (max 720px)
- Single oversized serif phrase — short, memorable
- Small tagline below in letter-spaced small caps
- CTA as a bordered button with small-caps label
- Below CTA: a fine hairline divider, then a short elegant proof line

---

## Capture Form

### Editorial treatment
- Inline in the text flow, feels like a sign-up block in a magazine
- Labels in italic serif, above input
- Inputs with bottom border only (no full box), `border-b border-ink/40`
- Submit: text link style with underline, or a small bordered button
- After submit: reveals a quote or editorial note, not a toast

### Dark AI-forward treatment
- Form as a distinct card on Surface 1, thin border, no shadow
- Rounded corners subtle (`rounded-lg`, not `rounded-2xl`)
- Labels above inputs, text-xs, uppercase, letter-spaced, `text-mid` color
- Inputs on Surface 2, border on focus switches to accent color
- Submit button: full width, accent bg, dark text, bold weight
- Include a subtle hint below submit: "You'll receive a confirmation within 60 seconds" or similar — specificity signals premium

### Luxury Clean treatment
- Centered, narrow (~420px), no card container — form elements sit on paper background
- Inputs: bottom border only, thick ink stroke (`border-b-2 border-ink`)
- Labels below inputs (under the line), small caps, letter-spaced
- Submit: bordered button, text in small caps, no fill
- Form feels like an RSVP card

**Universal form rules** (all families):
- 3 fields maximum for a workshop signup (name, email, +1 qualifier)
- Qualifier field should feel like a value-add, not a friction-add ("What's your current role?" lets them self-identify)
- Error states styled — red in light mode, desaturated red in dark
- Loading state on submit (button text changes or subtle spinner in accent color)

---

## CTA Button

### Editorial
- Primary: text link with underline, or thin-bordered button
- Example: `<button className="border border-ink px-8 py-3 text-sm uppercase tracking-widest hover:bg-ink hover:text-paper transition-colors">Reserve a seat</button>`
- No filled backgrounds for primary CTAs
- Hover: swap ink/paper

### Dark AI-forward
- Primary: filled accent color, dark text, medium weight, substantial padding
- Example: `<button className="bg-accent text-bg font-medium px-6 py-3 rounded-md hover:brightness-110 transition-all">Claim my spot</button>`
- Secondary: ghost with border, `border-border text-text-high hover:border-accent`
- Consider a subtle glow on hover (`box-shadow` in accent color with low opacity)

### Luxury Clean
- Primary: bordered, no fill, small-caps label
- Example: `<button className="border-2 border-ink px-10 py-4 uppercase text-xs tracking-[0.2em] hover:bg-ink hover:text-paper transition-colors">Request invitation</button>`
- Understated. Never shouts.

**CTA copy rules:**
- Specific verb + specific noun ("Reserve my seat", not "Get Started")
- First-person works well for capture: "Claim my access", "Save my place"
- Language tied to the actual thing they're getting ("Request the framework", "Join the November cohort")

---

## Card

### Editorial
- No card container at all — use typography and dividers to group content
- If a container is necessary: thin border-top only, generous padding, no shadow, no rounding

### Dark AI-forward
- Surface 1 background on Bg base, OR Surface 2 on Surface 1 for elevation
- Thin border (`border border-border`), not shadow
- Subtle rounding (`rounded-lg`)
- On hover: border brightens to `border-accent/40` (not scale, not big shadow)
- Vary card sizes in grids (bento style) — avoid all-identical cards

### Luxury Clean
- Card = paper on paper. Slight tonal shift (`bg-paper-alt`).
- No border, no shadow. Separation through space and color.
- Heading in serif display, body in refined sans.
- Feels like a page from a book.

---

## Navigation

### Editorial
- Minimal. Logo or author name left, 2–3 links right. All text-based.
- No background until scrolled. Thin hairline border-bottom on scroll.
- Links with serif italic hover underline.

### Dark AI-forward
- Sticky with backdrop blur (`backdrop-blur-md bg-bg/70`)
- Logo or wordmark left. Center links optional. CTA button right.
- On scroll: border-bottom appears (`border-b border-border`)
- Active link: underline in accent, or accent color text
- Mobile: hamburger opens full-screen overlay with generous typography

### Luxury Clean
- Centered logo/wordmark above nav links, or minimal horizontal bar
- Small-caps nav labels, letter-spaced
- Never translucent — always solid paper
- No CTA in nav (primary CTA is in hero and reinforced at bottom)

---

## Testimonials / Social Proof

### Editorial
- One prominent quote, styled as a pull quote with oversized italic serif
- Attribution below in smaller sans, with context (role, company, or a descriptor that builds credibility)
- If multiple: stack vertically, each as an editorial pull quote — no grid
- Alternative: a single paragraph of curated names ("Testimonials from CFOs at [Company], [Company], and [Company]")

### Dark AI-forward
- Asymmetric grid — ONE featured card spans 2 columns with video thumbnail, others compact
- Featured card has a play button overlay on thumbnail (real testimonial videos preferred)
- Compact cards: text quote, small photo, role — no border, minimal surface change
- Include company logos as a separate strip, desaturated to `text-low`

### Luxury Clean
- Single testimonial per section, centered, serif italic, with letterpress-styled attribution
- If multiple: vertical chapters, each with generous vertical whitespace between
- Think New Yorker "Letters" section, not a SaaS wall-of-logos

---

## Feature / Method Steps Section

### Editorial
- Numbered list with oversized serif numerals (chapter style)
- Each step: large number, title in display, paragraph in body serif
- No icons. Numbers ARE the visual element.

### Dark AI-forward
- Bento grid with varied card sizes — not uniform 3-col
- Each card has a subtle graphic (small data viz, abstract shape, or glyph) — never a Lucide icon in a pastel circle
- Title in display weight, description in body
- One "hero card" spans 2 columns and is the most visually dense

### Luxury Clean
- Vertical chapters separated by thin hairline dividers
- Chapter label: roman numeral in small caps (I, II, III)
- Title in serif display, body below
- Large, generous vertical rhythm — each chapter feels like a page

---

## Footer

Universal: keep it restrained. Logo, contact, legal links, copyright. No newsletter signup if the page's primary CTA IS a capture form (don't compete with yourself).

For premium mentorship LPs, consider replacing "Contact" with a specific human — "Questions? Write to [email of the expert's assistant]". Feels human, not corporate.

---

## Mobile considerations

- Headlines that are `clamp(3rem, 8vw, 7rem)` on desktop should not shrink to `1.5rem` on mobile — mobile hero should still be striking. Test at 375px width.
- Forms must be touch-comfortable. 44px minimum tap targets. Input font-size 16px minimum (prevents iOS zoom).
- Split heroes collapse to stacked on mobile — reorder so form is above the secondary visual (if workshop signup is the goal).
- Navigation collapses to hamburger below 768px; overlay opens with full-viewport height and oversized tap targets.
