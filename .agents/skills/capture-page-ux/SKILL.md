---
name: capture-page-ux
description: Apply conversion-focused UX decisions to lead-capture landing pages — page architecture, form strategy, friction audit, objection handling order, qualification logic, social proof placement, scarcity/urgency tactics, micro-copy for form states, and post-submit flow. Use this skill whenever the user is planning the STRUCTURE of a capture page (which sections, what order), auditing an existing page for conversion leaks, deciding form fields and their sequence, writing functional micro-copy (placeholders, helper text, error states, success messages), designing the post-submit experience, or asking about what to put above the fold. Also trigger when the user says "como estruturar a página", "qual a melhor ordem das seções", "quantos campos no form", "está convertendo mal", "preciso aumentar conversão", "o que colocar antes do CTA", "como tratar a objeção", "ideia pra prova social", "como qualificar lead", "fluxo pós-inscrição", or is reviewing analytics and asking why users drop off. Also trigger when building a capture page from scratch and the user needs to decide architecture before styling. Do NOT use this skill for visual styling (colors, fonts, spacing, components) — that's the premium-ui-design skill. Do NOT use for sales pages with checkout, pricing tables, or long-form copy — this skill is specifically for pages whose sole goal is capturing a lead via form for a subsequent offer (workshop, webinar, mentorship waitlist, VIP list, free training).
---

# Capture Page UX

This skill handles the **functional layer** of capture landing pages — how the page works, converts, qualifies, and guides behavior. The visual layer is handled separately by `premium-ui-design`.

**Core principle:** A beautiful page that converts badly is a failed project. UX is what turns traffic into leads.

## What this skill covers (and what it doesn't)

**Covers:**
- Page architecture (sections + order)
- Form strategy (fields, order, qualification, friction)
- Objection handling sequence
- Social proof placement
- Scarcity/urgency tactics (ethical application)
- Micro-copy for all form states
- Post-submit experience
- Friction audit of existing pages
- Mobile-first flow decisions

**Does NOT cover:**
- Visual styling → `premium-ui-design`
- Design references / moodboard → `capture-page-inspiration`
- Sales copy / VSL writing → separate skill
- Ad creatives / traffic → separate skill

## Workflow

### Step 1 — Understand the capture context

Before any structural decision, get clear on:

1. **What is the offer?** (workshop / webinar / mentorship waitlist / free training / diagnostic)
2. **What does the lead get immediately vs. later?** (confirmation email? access to a group? video unlocks?)
3. **What's the volume vs. quality tradeoff?** (high-volume workshop = fewer fields; selective mentorship = more fields to self-qualify)
4. **What's the traffic source?** (cold ads / warm email list / organic / referrals — changes the amount of pre-selling the page needs to do)
5. **What's the next step after capture?** (workshop delivery → pitch → sale; or: capture → nurture sequence → sale)

The answer to #3 and #5 determine almost everything else.

### Step 2 — Decide page architecture

Use `references/page-architectures.md` to pick an archetype based on the offer type and traffic temperature. Three archetypes covered:

- **A. The Direct Funnel** — short page, form above fold, for warm traffic or simple workshops
- **B. The Objection-Led Page** — longer page that handles 3–5 objections before form, for cold traffic or high-ticket offers
- **C. The Authority-Led Page** — expert-first, builds trust through credentials/results before form, for selective / application-style capture

Most executive-mentorship workshops fit **B** (cold traffic) or **C** (brand-led selective positioning).

### Step 3 — Design the form strategy

Use `references/form-strategy.md`. Decide:

- **Field count and fields:** default to 3; add only if qualification justifies it
- **Field order:** easy → harder → commitment (name → email → qualifier)
- **Qualifier field:** a single field that self-segments leads (role, company size, income range, seniority) — the expert uses this post-capture
- **Required vs. optional:** everything required unless a field is truly nice-to-have
- **Progressive form?:** only if total fields > 5, otherwise single-step

### Step 4 — Map the objection sequence (if using archetype B)

Use `references/objection-sequences.md`. For executive mentorship, the canonical objections are:
- "I don't have time"
- "I've tried coaching/courses before and they didn't work"
- "My situation is different — my industry / company / role"
- "I should be able to figure this out on my own"
- "Is this worth the investment?" (even for free workshops, ROI-of-attention applies)

The page should address 2–4 of these, in order, between hero and the final CTA.

### Step 5 — Place social proof strategically

Use `references/social-proof-strategy.md`. Three placements matter:

- **Above fold:** light proof (number of past participants, one logo strip, or a one-line quote)
- **Mid-page:** heavy proof (video testimonial OR 2–3 outcome-focused quotes with specifics)
- **Near final CTA:** reassurance proof (a name-heavy bar: "CFOs from [Company], [Company], [Company] have attended")

Never open with heavy proof. Never close without proof.

### Step 6 — Design scarcity ethically

Use `references/scarcity-urgency.md`. Rules:

- **Real scarcity only.** If the workshop has 500 virtual seats, don't say "only 50 left". Say "Workshop on November 18 · Registration closes November 17".
- **Deadline beats quantity** for workshops (date-based urgency is truthful and universal)
- **Countdown timers only if the deadline is real and within 7 days**
- **Never invent "spots remaining" numbers**

The premium audience smells fake urgency from a mile away. It kills trust.

### Step 7 — Write the micro-copy

Use `assets/microcopy-patterns.md`. Cover every form state:

- Placeholder text (NOT a repeat of the label)
- Helper text below each field (builds trust, reduces anxiety)
- Error states (specific, not "Invalid input")
- Loading state on submit
- Success state (the MOST underrated moment — this is where commitment locks in)
- Email confirmation copy (first thing they receive)

### Step 8 — Design the post-submit flow

Use `references/post-submit-flows.md`. Four patterns:

- **Inline confirmation + next step** (best for workshops: "You're in. Here's what happens next: ...")
- **Redirect to thank-you page with video** (upsell the workshop content; common for VSL funnels)
- **Redirect to WhatsApp/Telegram group** (Brazilian infoproduct standard; high engagement)
- **Unlock a content page** (ebook, checklist, video — for lead magnets)

For a workshop: recommend **inline confirmation → redirect to WhatsApp group** as the default for the Brazilian premium market. Group creates community + reminder channel.

### Step 9 — Run the friction audit

Use `references/friction-audit.md`. Count friction points:
- Every required field = 1 point
- Every optional field visible = 0.5 point
- Every section before the form = 0.5 point
- Every ambiguous CTA = 2 points
- Every broken link or missing state = 5 points

Benchmark: a well-designed premium workshop capture page scores **6–10 friction points**. Under 5 = probably not qualifying enough. Over 12 = losing leads to friction.

## Core principles (always apply)

1. **Clarity beats cleverness.** The lead should know, within 5 seconds: what's the offer, when, and what they get. Clever copy that obscures this kills conversion.

2. **One primary CTA per page.** Everything leads to the form. If there's a secondary action, it's far below primary and visually subordinate.

3. **Friction is not always bad.** For high-ticket or selective offers, friction IS qualification. A 5-field form filters out tire-kickers. A 1-field form for a mentorship waitlist is probably too easy.

4. **The post-submit moment is a design surface.** Most teams treat it as "success toast". Premium brands treat it as a designed moment that increases attendance rates.

5. **Mobile flow ≠ desktop flow shrunk.** On mobile, the form often moves to its own full-screen step. The hero may collapse to just headline + CTA that scrolls to form.

6. **Every piece of the page earns its place.** If a section doesn't drive the lead toward conversion OR reduce a specific objection, cut it.

7. **Specificity is the trust signal.** "500+ executives" beats "many executives". "Workshop on November 18 at 7pm BRT" beats "Join our upcoming workshop". "You'll receive a confirmation within 60 seconds" beats "We'll be in touch".

## What NOT to do

- Do **not** ask for phone number unless the team will actually call (if WhatsApp is the channel, ask for WhatsApp number and make that explicit)
- Do **not** use "opt-in" checkboxes for marketing consent in Brazil without clear LGPD language — not just a UX issue, it's a legal one
- Do **not** hide the form behind a modal unless page strategy requires (premium positioning can justify it; most cases don't)
- Do **not** put more than 5 form fields for a free workshop
- Do **not** use captchas unless actively fighting bot spam — they drop conversion 10–30%
- Do **not** forget the post-submit flow — this is where 30%+ of "capture" projects fail

## Reference files

- `references/page-architectures.md` — three page structures with section-by-section order
- `references/form-strategy.md` — field selection, order, qualification logic
- `references/objection-sequences.md` — objection libraries for executive mentorship niche
- `references/social-proof-strategy.md` — what proof type, where, and why
- `references/scarcity-urgency.md` — ethical scarcity applied to premium workshops
- `references/post-submit-flows.md` — four patterns with when to use each
- `references/friction-audit.md` — scoring framework for friction leaks
- `assets/microcopy-patterns.md` — ready-to-use microcopy for all form states (PT-BR + EN)

## Output quality bar

A good run of this skill produces a **structural decision document** — section-by-section plan, form spec, objection sequence, proof placement, post-submit flow — that could be handed to a designer/developer to build from. The output is not pretty; it's functional. Visual polish is `premium-ui-design`'s job.

If the output feels generic (could apply to any niche or any offer), the skill failed — rerun with tighter offer context from Step 1.
