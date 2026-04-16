---
name: capture-page-inspiration
description: Research and deliver curated visual references for premium lead-capture landing pages in the executive/career mentorship niche (and adjacent premium-positioning niches like high-ticket coaching, AI-powered products, and B2B consulting). Use this skill BEFORE writing any landing page code whenever the user is building, planning, or restructuring a capture page, squeeze page, workshop signup, webinar registration, or lead magnet page — especially for mentorships, courses, or high-ticket infoproducts with a sophisticated/elegant aesthetic. Also trigger when the user mentions "LP de captura", "página de capturas", "landing page para mentoria", "página de inscrição para workshop", "preciso de referências visuais", "inspiração para LP", or describes building a funnel with a capture step. The skill delivers: (1) 8–12 curated URLs with visual prints, (2) element-by-element breakdown of each reference (hero, copy, CTA, form, social proof, visual hierarchy), and (3) a consolidated moodboard synthesizing patterns across references (palette, typography, spacing, form placement patterns). Do NOT use this skill for sales pages, checkout pages, institutional sites, or pure content blogs — only for pages whose primary goal is lead capture via form submission.
---

# Capture Page Inspiration

This skill helps research and synthesize premium visual references for **lead-capture landing pages** — specifically pages whose single goal is capturing a lead through a form (workshop signup, webinar registration, mentorship waitlist, VIP list, free training).

The aesthetic target is **elegant, premium, sophisticated**, with tolerance for AI-forward visual language (gradient meshes, subtle motion, dark premium themes) since the target niches often involve AI-powered methodologies and executive/high-ticket positioning.

## When to run this skill

Run it **before any code is written** for a new capture-page project. The output becomes the creative foundation for the build phase.

Typical trigger scenarios:
- "Vou construir uma LP de captura para [mentoria / workshop / webinar / treinamento]"
- "Preciso de referências antes de começar o projeto"
- "Quero ver como outras páginas premium capturam leads"
- User is planning a funnel and mentions the capture step

## Workflow

Execute these steps in order. Do not skip steps.

### Step 1 — Clarify positioning (only if not already clear from context)

Before searching, confirm these five points. If the conversation already answers them, skip directly to Step 2 and state your understanding.

1. **Niche and expert positioning** — e.g., executive career mentorship, AI-powered methodology, premium vibe
2. **Capture goal** — workshop? webinar? waitlist? free training? (this changes form complexity and urgency signals)
3. **Form complexity** — simple (just email) or qualified (name + email + phone + qualifying questions)
4. **Aesthetic preference** — dark premium / light minimal / editorial / bold gradient / tech-forward
5. **Audience** — C-level executives, mid-career professionals, aspiring managers, etc.

Keep this brief — two or three short questions max. Do not interrogate.

### Step 2 — Search across curated sources

Use `web_search` and `web_fetch` to gather references from these sources (full list in `references/curation-sites.md`). Prioritize:

1. **Curation galleries** — Land-book, Lapa, SaaS Landing Page, One Page Love, Httpster, Godly, Minimal Gallery
2. **Open Google search** — using queries like:
   - `"executive coaching" landing page capture form premium`
   - `"workshop registration" landing page mentorship AI`
   - `site:land-book.com mentorship` / `site:lapa.ninja coaching`
   - `high ticket mentorship landing page inspiration 2026`
3. **Known category winners** — Brazilian and US infoproducers/mentors in the premium tier (look for names surfaced by user's own knowledge or Google)

**Search behavior rules:**
- Aim for 15–20 raw candidates, filter down to 8–12 strongest
- Reject anything that is: a full sales page (with pricing table), a pure institutional site, a blog, or a page without a clear capture form
- Keep the mix diverse: different hero treatments, different form placements (above fold vs. scroll-triggered vs. modal), different social proof patterns
- If a reference is in a language other than PT-BR or EN, that's fine — visual patterns transcend language

### Step 3 — Analyze each reference

For each of the 8–12 finalists, use the template in `references/analysis-template.md` to produce a structured breakdown. Minimum fields:

- **URL** and a note on why this specific page earned its spot
- **Hero section** — headline style, subhead, visual treatment, form position
- **Copy angle** — promise type (outcome / transformation / curiosity / exclusivity)
- **CTA** — button text, color treatment, placement count down the page
- **Form** — fields count, inline vs. modal vs. floating, friction level
- **Social proof** — testimonials / logos / numbers / media mentions / none
- **Visual hierarchy** — what pulls the eye first, second, third
- **Takeaway for our project** — one specific thing worth borrowing

If the reference site cannot be fetched (paywall, bot block, 403), note it and either describe from the gallery preview image or replace the reference.

### Step 4 — Build consolidated moodboard

After the individual analyses, synthesize cross-reference patterns into a moodboard document. Use the structure in `assets/moodboard-template.md`. It must cover:

- **Color palette patterns** — which families dominate in the premium/AI-forward space (pull 3–4 representative palettes as hex swatches)
- **Typography patterns** — serif vs. sans, display choices, pairings observed
- **Layout archetypes** — the 2–3 dominant structural templates you saw (e.g., "centered hero + inline form", "split hero with form right", "full-bleed video bg + floating form")
- **Form placement patterns** — what % of references put the form above the fold, what % use a modal, what % use a sticky CTA that triggers a modal
- **Copy patterns** — recurring headline structures, recurring proof placements
- **Micro-interactions / motion** — subtle animations observed (scroll reveals, gradient shifts, cursor effects)
- **3 layout directions for our project** — concrete structural proposals for the user's LP, each grounded in 2–3 specific references from the set

### Step 5 — Deliver

Present the output as a single markdown document (or save to a file if the project has a workspace) with three clearly labeled sections:

1. **References** — the 8–12 analyzed URLs with thumbnails where possible
2. **Moodboard** — the consolidated synthesis
3. **Recommended directions** — the 3 layout directions, ready to become wireframes

End with a short prompt to the user: "Qual dessas três direções ressoa mais? Posso detalhar a estrutura da que você escolher antes de começarmos a codar."

## What NOT to do

- Do **not** jump straight to search without confirming positioning (Step 1)
- Do **not** include full sales pages, pricing pages, or institutional homepages
- Do **not** recommend generic templates (Wix / Elementor samples) — this is a premium niche
- Do **not** propose to write code or start building the LP within this skill — its output is the creative brief, not the implementation
- Do **not** fabricate URLs — if a reference can't be verified via fetch or gallery, drop it

## Reference files

- `references/curation-sites.md` — full list of curation galleries with search URL patterns
- `references/analysis-template.md` — per-reference breakdown structure
- `references/search-queries.md` — battle-tested Google/site: query templates
- `assets/moodboard-template.md` — moodboard document structure

## Output quality bar

A good run of this skill produces a document that the user could hand to a designer or to Lovable as context and get an on-brief first draft. If the output feels generic or could apply to any niche, it failed — rerun with tighter positioning.
