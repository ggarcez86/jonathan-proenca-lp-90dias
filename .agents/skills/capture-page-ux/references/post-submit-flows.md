# Post-Submit Flows

The moment the lead submits the form is where most capture projects drop the ball. This is actually the highest-leverage UX moment on the entire page — where commitment locks in and attendance rates are determined.

## Why post-submit matters

- 30–50% of workshop registrants don't attend ("no-show rate")
- The post-submit flow is the single biggest lever on that number
- Premium brands turn this moment into a designed experience; amateurs treat it as a toast message

A well-designed post-submit flow can increase workshop attendance from 30% to 60%+. That's the difference between a 300-person live workshop and a 600-person one from the same capture volume.

## The four patterns

Each pattern has clear use cases. Pick ONE and execute it well.

---

### Pattern 1 — Inline confirmation + next-step guide

**Flow:** Form submits, page updates in place (no reload), success state replaces the form. Success state contains the confirmation + explicit next-step instructions.

**Use when:**
- Workshop is the primary offer and you want the lead to understand the full commitment moment
- The delivery channel is email-based (not WhatsApp group)
- The lead needs to do something specific before the workshop (add to calendar, expect email)

**What the success state must include:**
1. Explicit confirmation ("Sua inscrição está confirmada")
2. What they just signed up for (date, time, topic — reinforces commitment)
3. What they should expect next (confirmation email within X minutes)
4. What they should do RIGHT NOW (add to calendar, check spam folder)
5. A single next action ("Baixe o guia de preparação" OR "Junte-se ao grupo do WhatsApp")

**Trade-offs:**
- Highest engineering complexity (inline state management)
- Best for premium positioning — feels designed
- Doesn't capture the engagement spike as directly as a redirect to community

**Example structure:**
```
[Checkmark or subtle animation]

Sua inscrição está confirmada.

Workshop: [Nome do workshop]
Data: 18 de novembro · 19h BRT
Duração: 90 minutos

Nos próximos 60 segundos, você receberá um e-mail com:
 • O link da sessão ao vivo
 • Um guia de preparação de 2 páginas
 • Um convite para o grupo exclusivo dos participantes

Adicione o evento à sua agenda: [Google Calendar] [Outlook] [Apple]

[Se não chegar em 60 segundos, verifique sua caixa de spam ou escreva para contato@expert.com]
```

---

### Pattern 2 — Redirect to thank-you page with video

**Flow:** Form submits, page redirects to a dedicated thank-you page. Thank-you page has a video from the expert and a clear next-step CTA.

**Use when:**
- You want to warm up the lead BEFORE the workshop
- The workshop pitches a paid offer and you want to start the pitch narrative early
- The expert has a strong on-camera presence
- Video content genuinely adds value (teaches something, sets expectations)

**What the thank-you page must include:**
1. Video of the expert (60–180 seconds, autoplay-on-mute with tap-to-unmute)
2. Explicit confirmation above or below video
3. Event details restated
4. Single next action below video

**Video content that works:**
- Personal welcome from the expert
- "Here's what to expect and how to prepare"
- ONE powerful insight or reframe related to the workshop topic
- Invitation to join the community channel (WhatsApp / Telegram)

**Video content that doesn't:**
- Long sales pitch for the paid offer (turns off leads who just signed up for free workshop)
- Generic "thanks for signing up" with no content
- Auto-playing with sound (regulatory issues + annoying)

**Trade-offs:**
- Requires video production (quality matters)
- Can feel "funnel-y" if over-optimized for conversion
- High-leverage when done well — creates pre-workshop relationship

---

### Pattern 3 — Redirect to WhatsApp/Telegram group

**Flow:** Form submits, page briefly shows inline confirmation, then redirects to WhatsApp group invitation link.

**Use when:**
- Brazilian market (this is the standard for BR infoproduct funnels)
- The expert actually maintains the group and it provides value
- The audience is WhatsApp-active (executives and high-income professionals in BR are)
- You want high pre-workshop engagement and reminder capability

**What the redirect flow needs:**
1. Brief inline "Sua inscrição está confirmada. Você será redirecionado para o grupo oficial em 3 segundos" (3-second countdown)
2. Redirect to WhatsApp group invite link
3. Backup: if user doesn't redirect, show manual link

**What the WhatsApp group must have:**
- Pinned message with workshop details + rules
- Admin-only posting (don't let it become a free-for-all)
- Countdown reminders in the days leading up to the workshop
- Workshop link posted at the start of the session

**Trade-offs:**
- Requires ongoing group management
- Brazilian cultural fit — may feel out of place for global premium positioning
- Incredibly effective for reducing no-show rate (reminders work)

**Hybrid option:** Inline confirmation (Pattern 1) with a prominent "Join our WhatsApp group" button as the next action. Best of both worlds — some leads skip the group, the ones who join are hot.

---

### Pattern 4 — Unlock content immediately

**Flow:** Form submits, page redirects to (or inline reveals) the promised content — ebook, checklist, video, template.

**Use when:**
- The capture offer is a lead magnet (not a workshop registration)
- The content itself is the promise ("Baixe o guia dos 7 passos")
- Secondary pitch for the workshop/mentorship happens within the content

**Structure:**
- Content delivery inline OR via download + email with backup link
- Single soft CTA at the end of the content ("Quer ir além? Workshop ao vivo dia 18 de novembro")

**Trade-offs:**
- This pattern is for lead magnets, not workshop registration
- If used for workshop, feels confused ("did I register or just get a pdf?")
- Can stack with Pattern 3 (content + WhatsApp group)

---

## Recommendation for Gustavo's executive workshop

Given:
- Premium positioning (points away from Pattern 4, which feels transactional)
- Executive audience (WhatsApp group is culturally appropriate in BR)
- Workshop → pitch flow (benefits from pre-workshop warm-up)

**Recommended: Hybrid of Pattern 1 + Pattern 3**

1. **Inline confirmation** after form submit (Pattern 1) — feels premium and designed
2. **Primary next-step button:** "Entre no grupo exclusivo dos participantes" → WhatsApp group link (Pattern 3 element)
3. **Secondary next-steps:** Add to calendar buttons, confirmation email expected notice

This combines the designed feel of Pattern 1 with the engagement power of Pattern 3.

**Example implementation:**

```
[Inline success state]

Sua vaga está confirmada.

Workshop "O Método para a Próxima Cadeira"
Terça, 18 de novembro · 19h BRT · 90 minutos

━━━━━━━━━━━━━━━━━━━━━━━━━━━

Próximo passo: entre no grupo dos participantes

No grupo você recebe:
 • Lembrete no dia do workshop
 • Acesso prioritário ao material
 • Canal direto com a equipe

[→ Entrar no grupo do WhatsApp]

━━━━━━━━━━━━━━━━━━━━━━━━━━━

Também enviamos um e-mail de confirmação em até 60 segundos.
Se não chegar, verifique a caixa de spam ou escreva para contato@expert.com.

[Adicionar ao Google Calendar] [Adicionar ao Outlook]
```

---

## The confirmation email

Regardless of inline pattern chosen, the confirmation email is critical:

**Must contain:**
- Confirmation line (no ambiguity)
- Workshop details (date, time, duration)
- Live link or instructions for getting the link (if different)
- Calendar attachment (.ics file) or Add-to-Calendar buttons
- WhatsApp group link (if applicable)
- Support contact (human email, not no-reply)
- Short personal message from the expert (1–2 sentences, signed)

**Send within:**
- Under 60 seconds after submit (premium standard)
- Under 5 minutes (acceptable minimum)
- Over 15 minutes = broken trust

**From whom:**
- Expert's personal email OR a branded email with expert's name
- NEVER no-reply@ — this is the premium tell

## Reminder sequence

For a workshop captured via this page, the reminder sequence matters as much as the capture itself:

- **T-7 days:** "See you on [date]" + what to prepare
- **T-24 hours:** "Tomorrow at [time]" + the direct link
- **T-1 hour:** "Starting in 1 hour" + link + what to have ready
- **T-5 minutes:** "Starting now" + link (this one alone lifts attendance 20%+)

If using a WhatsApp group, these get posted in the group. If email-only, sequence goes by email.

## Output template

When the skill produces a post-submit plan:

```
Post-submit flow:

Pattern: [1 / 2 / 3 / 4 / Hybrid of X+Y]

Immediate flow (within 5 seconds of submit):
  [Inline confirmation / Redirect to X / Reveal Y]

Success state content:
  [Full content spec]

Next-step CTA:
  Primary: [WhatsApp group / Calendar add / Video reveal]
  Secondary: [if any]

Confirmation email:
  Trigger: [Immediate / within X minutes]
  From: [expert-name@domain / expert's personal]
  Contents: [bullet list]

Reminder sequence:
  T-7: [channel + content]
  T-24h: [channel + content]
  T-1h: [channel + content]
  T-5min: [channel + content]

Expected no-show rate improvement: [baseline → projected]
```
