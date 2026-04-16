# Self-Audit Checklist

Run this before delivering any UI code from this skill. If more than one item fails, revise before showing the user.

## Typography audit
- [ ] Display font is NOT Inter, Geist, Roboto, or a system font
- [ ] Display font is visibly different from body font (contrast, not match)
- [ ] H1 is at least 3x body font size
- [ ] Body line-height is between 1.5 and 1.7
- [ ] Display line-height is between 0.95 and 1.1 (tight)
- [ ] No letter-spacing on body paragraphs

## Color audit
- [ ] No purple-pink gradient anywhere
- [ ] No pure `#FFF` or `#000` as primary colors
- [ ] Only ONE accent color, used in at most 3–4 places
- [ ] If dark mode: warm black base, not `#000`
- [ ] No gradients on buttons, cards, or small elements

## Layout audit
- [ ] Not a centered hero with product mockup on the right
- [ ] Not a 3-column or 6-column symmetric feature grid
- [ ] Section spacing varies — some sections denser, some airier
- [ ] At least one element deliberately breaks the grid (asymmetry, overlap, oversized)

## Component audit
- [ ] No Lucide icons in colored circles above feature titles
- [ ] Cards (if used) don't all have identical `rounded-2xl` + `shadow-lg` treatment
- [ ] Primary CTA copy is specific, not "Get Started" or "Try it free"
- [ ] Form has 3 or fewer fields
- [ ] Form integrated into layout, not floating card with heavy shadow

## Motion audit
- [ ] No generic `fade-in-up` on every section as the only motion
- [ ] Hover states use more than `scale-105`
- [ ] Page load has one orchestrated moment, not 10 scattered reveals

## Copy audit
- [ ] No "AI-powered [thing]" as a headline
- [ ] CTA copy matches the actual offer (workshop → "Reserve seat", cohort → "Apply to cohort")
- [ ] No placeholder lorem ipsum shipped by accident
- [ ] No emoji as decoration in premium contexts

## Premium feel audit
- [ ] Could the output plausibly have come from a senior designer's portfolio? (If no → revise)
- [ ] Could the output plausibly have come from clicking "Generate" in v0/Lovable with zero refinement? (If yes → revise)
- [ ] Is there ONE specific element that will be remembered? (The "memorable move")

## Execution quality audit
- [ ] Spacing uses the scale consistently
- [ ] Border radius is consistent within similar components (don't mix `rounded-md` and `rounded-xl` on similar elements)
- [ ] Dark mode (if applicable) has proper contrast ladder (high / mid / low)
- [ ] Responsive: hero still striking at 375px width
- [ ] Tap targets minimum 44px on touch devices
- [ ] Form inputs 16px minimum font-size

## Family consistency audit
- [ ] The chosen family (Editorial / Dark AI-forward / Luxury Clean) is visible throughout
- [ ] Not accidentally mixing families (e.g., dark AI hero + luxury clean footer)
- [ ] If hybrid, the hybrid is intentional and stated

---

## Failure recovery

If 2+ items failed:
1. Identify WHICH anti-pattern is strongest in the output
2. Re-read the family brief in `design-families.md`
3. Revise the specific failing parts — don't regenerate from scratch
4. Re-audit

If 5+ items failed, the chosen family may be wrong for the context — reconsider family selection before rebuilding.
