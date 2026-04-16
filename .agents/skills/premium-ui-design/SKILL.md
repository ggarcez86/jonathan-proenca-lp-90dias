---
name: premium-ui-design
description: Apply premium, elegant, distinctive UI/UX patterns to frontend work — explicitly avoiding the generic "AI default" look (Lovable/v0/Bolt stock aesthetic with purple-pink gradients, rounded cards, Inter typography, symmetric feature grids, and Lucide icons in pastel circles). Use this skill whenever the user is building, refining, reviewing, or restyling ANY frontend UI — landing pages, hero sections, forms, CTAs, cards, navigation, feature grids, testimonials, pricing sections, dashboards, or full pages. Also trigger when the user mentions "Lovable", "deixa mais bonito", "deixa mais premium", "melhora o visual", "fugir do visual padrão", "está com cara de IA", "está genérico", "quero algo mais elegante/sofisticado", or pastes code and asks for a visual upgrade. Also trigger when writing new components from scratch in projects with premium/elegant positioning (mentorship LPs, executive coaching, luxury brands, AI-forward products, high-ticket offers). The skill provides: (1) explicit anti-patterns to avoid, (2) three curated design families (Editorial, Dark AI-forward, Luxury Clean) with the agent selecting based on project context, (3) principles + critical code snippets (typography stacks, spacing scales, motion patterns), (4) component-level guidance for hero/form/CTA/card/nav. Do NOT use this skill for purely functional admin tools or internal dashboards where neutrality is the goal.
---

# Premium UI Design

This skill makes frontend output look **designed**, not **generated**. It fights the single most recognizable tell of AI-built UIs: the Lovable/v0/Bolt default aesthetic.

## The Problem This Skill Solves

AI-built UIs converge on a recognizable stock look. When you see it, you know. The checklist:

- Purple → pink → blue gradient hero
- Inter (or Geist) in every text element, same weight, same size ratio
- `rounded-2xl` + `shadow-lg` on every card
- 3-column or 6-column feature grid with identical card heights
- Lucide icon in pastel-colored circle above each feature title
- "✨ New" badge with gradient background
- Hero pattern: centered headline → subhead → single CTA button → floating product mockup on the right
- `fade-in-up` animation with `animation-delay` staggered by 100ms on scroll
- Generous, uniform spacing (everything breathes the same amount — no hierarchy)
- Accent color used everywhere instead of strategically
- Testimonials as 3 identical cards with avatar circle + name + role + quote
- CTAs that say "Get Started" or "Try it free"

If the output matches 3+ of these, it's the default look. This skill is an explicit antidote.

## Workflow

### Step 1 — Diagnose the context

Before choosing a direction, understand:
- **Project type:** LP de captura? Componente isolado? Restyle de algo existente?
- **Expert positioning / brand tone:** Executive? Luxury? AI-forward? Editorial?
- **Audience:** C-level? Aspirational mid-career? High-net-worth? General?
- **Constraints:** Stack (React/Tailwind/Vanilla?), tempo, Lovable downstream?

If the conversation already answers these, state your reading and move on. Do not interrogate.

### Step 2 — Pick ONE design family (or justify a hybrid)

The skill offers three premium families. Pick one as the dominant direction and commit. See `references/design-families.md` for the full briefs.

**Quick selector:**

| Signal | Family |
|---|---|
| Expert is author/thinker, content-heavy brand, literary feel, words matter more than product | **Editorial** |
| Expert uses AI heavily, methodology is the product, tech-forward, wants "sofisticado + moderno" | **Dark AI-forward** |
| Expert is luxury positioning, HNW audience, old-money feel, quiet confidence | **Luxury Clean** |

For the current Gustavo project (executive career mentorship, AI-powered methodology, elegant + premium): **Dark AI-forward** is the primary fit, with **Luxury Clean** as a credible alternative if the expert's personal brand is more restrained.

Hybrids are allowed but must be intentional — e.g., "Editorial structure with Dark AI-forward palette." Don't mix for safety; mix for expression.

### Step 3 — Apply the anti-pattern filter

Before any code is written, check the plan against `references/anti-patterns.md`. If the plan contains any of the listed defaults, revise the plan first.

### Step 4 — Execute with the critical snippets

Use the code patterns in `assets/critical-snippets.md` for the execution layer where details matter most:
- Typography stacks (distinctive fonts that aren't Inter)
- Spacing scale (non-uniform, intentional hierarchy)
- Motion patterns (beyond `fade-in-up`)
- Color system variables
- Form, hero, CTA, card, nav patterns

The snippets are starting points — adapt, don't paste blindly.

### Step 5 — Self-audit before delivery

Run the checklist in `references/self-audit.md`. If more than one item fails, revise.

## Core Principles (always apply)

1. **Typography is the fastest way to look premium.** Swap Inter for a distinctive display serif or a characterful sans. Body font can stay neutral, but the display font must have personality. Pair — don't match.

2. **Hierarchy > uniformity.** Three tiers of visual weight minimum. The hero headline should feel 10x heavier than body copy. A feature title should feel clearly different from a CTA button.

3. **Restraint beats decoration.** If you're adding a gradient, ask if it's earning its place. If you're adding a shadow, ask if it's earning its place. Most aren't.

4. **Break one rule deliberately.** Every premium design has one move that feels unexpected — asymmetry, an oversized element, a deliberately cramped section next to a spacious one, a single word in an unexpected font. The "rule break" is what makes it memorable.

5. **Motion serves meaning, not novelty.** One choreographed moment (hero reveal, form focus transition) is worth more than five scattered micro-interactions.

6. **Spacing is a design element, not padding.** Use the spacing scale intentionally — some sections should feel dense, others airy. Uniform spacing kills hierarchy.

7. **Dark mode isn't a toggle — it's a decision.** Dark premium means deep, warm blacks (not `#000000`), careful contrast ladder, and accent colors tuned for dark backgrounds (desaturated, never neon).

8. **The form is a design opportunity, not an afterthought.** In a capture page, the form IS the product. Treat the input styling, label typography, and submit button as the highest-craft components on the page.

## What NOT to do

- Do **not** default to Inter, Roboto, Geist, or system font for display type
- Do **not** use the purple → pink gradient hero (or any generic rainbow gradient)
- Do **not** put Lucide icons in colored circles above feature titles
- Do **not** build 3/6-column symmetric feature grids with identical cards
- Do **not** use "Get Started" / "Try it free" / "Sign up" as CTA copy for a premium mentorship
- Do **not** rely on `fade-in-up` as the only animation pattern
- Do **not** add a shadow to everything — shadows should be rare and intentional
- Do **not** use emoji as decoration in premium contexts (✨ 🚀 💡 → out)

## Reference files

- `references/design-families.md` — detailed briefs for Editorial, Dark AI-forward, Luxury Clean
- `references/anti-patterns.md` — the full Lovable/v0 default checklist to avoid
- `references/component-patterns.md` — hero, form, CTA, card, nav patterns per family
- `references/self-audit.md` — pre-delivery quality checklist
- `assets/critical-snippets.md` — code snippets for typography, spacing, motion, color

## Output quality bar

A good run of this skill produces UI that a senior designer would look at and say "this is intentional." If the output could plausibly have come from clicking "Generate" in Lovable with no prompt refinement, the skill failed — rerun with tighter family selection and stricter anti-pattern filtering.
