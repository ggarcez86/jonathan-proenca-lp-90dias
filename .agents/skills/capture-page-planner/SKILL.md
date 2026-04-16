---
name: capture-page-planner
description: Generate a complete production plan for a capture landing page from finalized copy — including a PRD.md (product requirements document with technical specs), a PLAN.md (milestone checklist that gets checked off as work progresses), an ASSETS.md (list of all external assets needed with ready-to-use generation prompts for Midjourney/Flux/video tools, plus photo treatment guides), and a COPY.md (the single source of truth for all page copy, with stable anchors for referencing specific sections). Use this skill whenever the user pastes finalized copy for a landing page and asks for a "plano", "planejamento", "PRD", "roadmap", "milestones", "o que precisa ser feito", or mentions tasks that cannot be done inside the IDE (image editing, photo treatment, video production, copy variations). Also trigger when the user is about to start building a landing page and needs a structured production plan before writing code. Also trigger when the user mentions "PLAN.md", "COPY.md", "checklist de produção", "milestones do projeto", or asks how to organize the work across sessions. The skill produces four files: (1) PRD.md with full technical specification, component tree, data flow, and integrations, (2) PLAN.md with milestones broken into checkable tasks (the agent MUST check items off as it completes them during execution), (3) ASSETS.md with every external asset needed, including Midjourney/Flux prompts, photo treatment instructions, icon references, and video briefs, (4) COPY.md with every piece of copy used on the page, organized by section with stable anchors that PLAN.md tasks reference. Do NOT use this skill for copywriting itself — it assumes copy is already finalized. Do NOT use for ongoing project management or sprint planning unrelated to landing page production.
---

# Capture Page Planner

This skill bridges finalized copy and production. It produces the three artifacts every premium landing page project needs before code starts:

1. **PRD.md** — technical spec, component architecture, data contracts, integrations
2. **PLAN.md** — milestone checklist that updates as work progresses
3. **ASSETS.md** — every external asset (images, icons, video) with production prompts

The goal: after this skill runs, the developer (you, Claude Code, or Antigravity) has everything needed to execute without guessing.

## Prerequisites

Before running, verify:
- Copy is finalized (all sections written — hero, body, form, CTAs, etc.)
- Offer details are clear (what, when, how long, who's presenting)
- If integrations needed: endpoints/services are decided (Sheets, Supabase, webhook, etc.)
- Visual family is chosen (from `premium-ui-design` — Editorial / Dark AI-forward / Luxury Clean)

If any prerequisite is missing, state what's missing and ask — do not proceed with assumptions on these.

## Workflow

### Step 1 — Parse the copy into logical sections

Read the provided copy and map each piece to a component/section. Typical mapping for a capture page:

- Barra de urgência → `<UrgencyBar />`
- Badge + Headline + Subheadline + Corpo do hero → `<Hero />`
- Headline do form + botão + disclaimer → `<CaptureForm />`
- Seção "O que você vai aprender" → `<Learnings />`
- Seção "Essa aula é para você se..." → `<TargetAudience />`
- Seção "Quem é [expert]" → `<ExpertBio />`
- Seção "Por que é gratuito" → `<WhyFree />`
- CTA final → `<FinalCTA />`
- Footer → `<Footer />`

State the section-to-component mapping explicitly before producing artifacts.

### Step 2 — Decide architecture and stack

If user specified a stack, use it. If not, default to **Next.js 15 + Tailwind + TypeScript** for capture pages because:
- SEO-friendly (Server Components) — important for paid traffic
- Server Actions natively handle form submission securely
- Tailwind enables rapid premium styling
- Vercel deploy is free and fast
- Both Claude Code and Antigravity handle Next.js well

Alternative stacks to recommend based on context:
- **Vite + React + Tailwind** — when SEO matters less (private/gated URLs) or when Next.js is overkill
- **Astro + Tailwind** — when page is mostly static and speed is paramount
- **HTML + CSS vanilla** — when the user wants zero dependencies

### Step 3 — Generate PRD.md

Use `templates/prd-template.md` as structure. Fill in:
- Project summary
- Tech stack decisions with rationale
- Component tree (from Step 1 mapping)
- Data contracts (form payload schema, integration response)
- Integrations (email/sheets/webhook specs)
- Routing and states (landing, thank-you, error)
- Analytics events to track
- Performance targets (LCP, CLS, TTI)
- SEO metadata
- Accessibility requirements
- Responsive breakpoints
- Success criteria

### Step 4 — Generate PLAN.md

Use `templates/plan-template.md` as structure. Organize into milestones:

- **M0 — Project Setup** (repo, stack install, env, design tokens)
- **M1 — Static Structure** (all sections rendered with placeholder copy)
- **M2 — Final Copy + Content** (production copy pasted, meta tags filled)
- **M3 — Visual Polish** (typography, colors, spacing per chosen design family)
- **M4 — Assets Integration** (hero image, icons, any video)
- **M5 — Form Logic** (validation, submit, integration with Sheets/endpoint)
- **M6 — Post-Submit Flow** (success state, confirmation email if applicable)
- **M7 — Responsive + Accessibility** (mobile, tablet, a11y audit)
- **M8 — Analytics + Tracking** (GA4, Meta Pixel, custom events)
- **M9 — QA + Pre-launch** (cross-browser, form E2E test, Lighthouse)
- **M10 — Deploy + Smoke Test** (production deploy, final verification)

Each milestone has 3–8 checkable tasks. Format: `- [ ] Task description`.

**CRITICAL BEHAVIOR:** When this skill is used during ongoing work and the agent completes a task, the agent MUST update PLAN.md by changing `- [ ]` to `- [x]` for that specific task. This is a hard requirement — if the agent builds the hero section, the corresponding task in PLAN.md gets checked BEFORE moving to the next task. State this expectation at the top of the generated PLAN.md so any future session respects it.

### Step 5 — Generate COPY.md (source of truth for all page copy)

Use `templates/copy-template.md` as structure. Take the user's finalized copy and organize it into a stable, navigable markdown with:

- **Metadata section** (page title, meta description, OG tags)
- **Every page section as a heading** (UrgencyBar, Hero, Form, Learnings, TargetAudience, ExpertBio, WhyFree, FinalCTA, Thank You page, confirmation email, footer)
- **Every copy block in a code fence** (triple backticks) so the agent copies the exact text without markdown formatting interfering
- **Stable anchors** — section headings should be descriptive enough that PLAN.md can reference them as `COPY.md > SECTION NAME`
- **Visual treatment notes** inline (e.g., "`<em>` on 'nenhum diretor vai te ensinar'")
- **Optional improvements** marked with `<!-- OPCIONAL -->` HTML comments — original copy is default, suggestions are additions the user decides on
- **Applied minor adjustments** (ortography, capitalization) noted when done — original preserved only for major creative decisions

**CRITICAL:** COPY.md includes instructions at the top for the agent to copy text literally (no paraphrasing, no summarizing, no reordering). Without this instruction, agents tend to "improve" copy during implementation, which breaks the approved message.

Also update PLAN.md tasks in M2 (Copy) to reference COPY.md anchors instead of inlining the copy text — this keeps the single source of truth pattern working.

### Step 6 — Generate ASSETS.md

Use `templates/assets-template.md`. List every external asset needed, categorized:

**Images:**
- Hero image / background (with Midjourney/Flux prompts, specs, and composition notes)
- Expert photo (with treatment guide — remove background, color grade, integration)
- Section backgrounds or textures if needed
- OG image for social sharing (1200x630)
- Favicon + app icons

**Icons:**
- Which icon library (lucide, heroicons, custom SVG)
- Specific icons per section
- If custom SVG: describe or provide generation prompt

**Video (if any):**
- Testimonial video specs
- Loom/explainer briefs

**Photo treatment (when user provides real photo):**
- Background removal workflow (tools: remove.bg, Photoshop, Photopea)
- Color grading instructions (match the design family palette)
- Composite background generation (Midjourney/Flux prompt)
- Integration into hero (positioning, overlay, masking)
- Output specs (file size, format, dimensions)

For each asset: include an explicit "Done when..." criterion so it's clear when the asset is ready.

### Step 7 — Save all four files to the project

If the user has specified a project directory, save:
- `[project-root]/PRD.md`
- `[project-root]/PLAN.md`
- `[project-root]/ASSETS.md`
- `[project-root]/COPY.md`

If no directory specified, save to current working directory and tell the user to move them.

Also generate a short summary message showing what was created and the recommended order of execution.

## Using the PLAN.md during the project

**For any future session working on this project:**

1. Read PLAN.md first to see what's done vs pending
2. Pick the next unchecked task (usually the next in the current milestone)
3. Execute the task
4. **Immediately update PLAN.md**: change `- [ ]` to `- [x]` for the completed task
5. If the task spawns sub-tasks that weren't anticipated, add them under the current milestone as new `- [ ]` items
6. Move to the next task

This turns PLAN.md into a living document. By the end, every item is checked and the file becomes a record of everything built.

## Quality bar

A good run produces PRD.md, PLAN.md, and ASSETS.md that together:
- Require zero additional questions to start building
- Break work into pieces small enough to complete in one session each
- Include every external asset needed (nothing "figured out later")
- Specify integrations concretely (endpoints, field names, response shapes)
- Define success in a way that's testable

If the generated files leave any decision ambiguous, rerun with more context from the user.

## What NOT to do

- Do **not** generate copy variations — copy is assumed finalized
- Do **not** design the UI — that's `premium-ui-design`'s job (PRD references the chosen family)
- Do **not** set up hosting or DNS — that's deployment, not planning
- Do **not** bloat the PRD with sections that won't be read (keep it pragmatic)
- Do **not** create a PLAN.md with fewer than 3 tasks per milestone (too coarse) or more than 10 (too granular)

## Reference files

- `references/stack-decision-guide.md` — detailed guidance for stack selection
- `references/integration-patterns.md` — patterns for Google Sheets, Supabase, webhook, email services
- `references/asset-prompting.md` — prompt patterns for Midjourney, Flux, DALL-E per design family
- `templates/prd-template.md` — PRD skeleton
- `templates/plan-template.md` — PLAN.md skeleton with milestone structure
- `templates/assets-template.md` — ASSETS.md skeleton
- `templates/copy-template.md` — COPY.md skeleton with anchor structure
