# Friction Audit

A scoring framework for measuring conversion friction on a capture page. Use this to audit existing pages or to sanity-check a plan before building.

## The scoring system

Count friction points across these categories:

### Form friction
- Every required field: **1 point**
- Every optional field visible (not hidden behind "show more"): **0.5 point**
- Email confirmation field: **+1 point** (bad — shouldn't be there)
- Captcha visible: **+3 points** (usually not justified)
- Multi-step form: **+1 point per additional step**
- Password creation field: **+2 points** (shouldn't be in a capture page)
- Phone field when WhatsApp is not the channel: **+1 point**
- Date of birth: **+2 points**
- Address fields: **+3 points** (rarely justified for capture)

### Navigation friction
- Sticky top nav with multiple links: **+0.5 point** (competes with form)
- Exit intent popup: **+1 point** (can help or hurt — context dependent)
- Multiple CTAs leading to different destinations: **+2 points per additional destination**
- Form hidden behind modal/button click: **+1 point**
- Form only appears after scrolling past 2+ sections: **+1 point**

### Content friction
- Page length over 8 viewports: **+1 point**
- No clear hero headline within 2 seconds of landing: **+3 points**
- Ambiguous offer description: **+2 points**
- Missing date/time for time-sensitive offers: **+2 points**

### Trust friction
- Any broken image or 404 asset: **+5 points**
- Generic stock photos as hero/expert photo: **+2 points**
- No privacy policy link near form: **+1 point**
- No expert name or credentials on page: **+3 points**
- Missing contact info for questions: **+0.5 point**

### Technical friction
- Page load over 3 seconds on 4G: **+2 points**
- Page load over 5 seconds on 4G: **+5 points**
- Any JavaScript error in console: **+2 points**
- Form submission not working on first try: **+10 points** (obvious but worth stating)
- Mobile layout broken: **+5 points**
- Form fields not tappable on mobile: **+10 points**

### Copy friction
- CTA says "Submit" or "Send": **+2 points**
- CTA says "Get Started" or "Sign up" for a premium offer: **+1 point**
- Generic placeholder text in form fields: **+0.5 point per field**
- No micro-copy below submit button: **+0.5 point**
- Missing success state after submit: **+3 points**

### Process friction
- No confirmation email within 5 minutes: **+3 points**
- Confirmation email from no-reply@: **+1 point**
- No post-submit next-step guidance: **+2 points**
- No add-to-calendar option: **+1 point** (for time-sensitive offers)

## Interpreting the score

| Score | State | Action |
|---|---|---|
| 0–5 | Maybe under-qualifying | Consider adding one qualifier field |
| 6–10 | **Target range for premium workshop capture** | Optimize within this range |
| 11–15 | Acceptable for selective/high-ticket offers | Every friction point must earn its place |
| 16–20 | Over-qualifying — losing leads unnecessarily | Cut the weakest 3–5 friction points |
| 21+ | Broken funnel | Major revision needed |

## How to audit an existing page

1. Open the page on mobile (most audiences are mobile-first)
2. Walk through the flow as a new visitor
3. Check each category — tally friction points
4. Test the form actually submits (shocking how often this is broken)
5. Test the confirmation email arrives
6. Check the success state and post-submit flow
7. Total the score, identify top 3 highest-cost friction points
8. Recommend cuts in priority order

## How to sanity-check a plan

Before building, estimate the score the designed page will have:
- List all form fields
- List all CTAs and destinations
- List sections between top-of-page and form
- Sum estimated friction

If the plan scores above 12, either (a) justify each point as necessary qualification or (b) cut.

## Hidden friction — invisible in the score but real

Some friction doesn't show in the framework but is real:

- **Cognitive friction:** If the offer is hard to understand on first read, the lead bounces. Test with someone unfamiliar: "What's this page offering? In one sentence."
- **Aesthetic friction:** If the page looks dated or low-quality, premium audiences bounce before reading. (This is what `premium-ui-design` solves.)
- **Tonal friction:** If the copy tone doesn't match the audience, the lead feels "this isn't for me". Read the copy aloud as if you were the target audience.
- **Mismatch friction:** If the ad promised X and the page delivers Y, lead bounces immediately. Audit ad-to-page copy consistency.

## Common friction leaks (the top 5)

Across hundreds of capture pages, the top leaks are:

1. **Form buried below too much content** — Lead doesn't see form in first viewport and doesn't scroll
2. **Too many fields for the offer value** — 6-field form for a free workshop = low conversion
3. **Broken confirmation flow** — Lead submits, nothing happens visually, doesn't know if it worked
4. **Generic CTA copy** — "Submit" or "Sign up" instead of the specific offer
5. **Missing post-submit next step** — Lead submits and gets a toast, never engages again

If auditing a page, start by checking these five.

## Output template

When producing an audit:

```
Friction audit for: [page URL or description]

Total score: [X points]
State: [see table above]

Breakdown:
  Form: [X points]
  Navigation: [X points]
  Content: [X points]
  Trust: [X points]
  Technical: [X points]
  Copy: [X points]
  Process: [X points]

Top 3 friction costs to cut first:
  1. [Specific issue] — [X points] — [recommended fix]
  2. [Specific issue] — [X points] — [recommended fix]
  3. [Specific issue] — [X points] — [recommended fix]

Projected score after cuts: [Y points]

Hidden friction observed:
  - [Cognitive/aesthetic/tonal/mismatch observations]
```
