# Form Strategy

The form is the conversion event. Every decision matters.

## Field count: the quality-volume tradeoff

| Fields | Typical conversion | Lead quality | Use when |
|---|---|---|---|
| 1 (email only) | Highest | Lowest | Newsletter, content download, low-value magnet |
| 2 (name + email) | High | Low-medium | General workshop with broad audience |
| 3 (name + email + qualifier) | Medium-high | Medium-high | **Default for executive workshops** |
| 4–5 (+ role + company + phone) | Medium | High | Selective offers, high-ticket mentorship |
| 6+ | Low | Highest | Application-style, premium selective |

**Default for Gustavo's executive workshop: 3 fields.** Adjust based on how selective the workshop positioning is.

## The canonical 3-field form for executive workshops

1. **Name** (full name, single field — don't split first/last, adds friction)
2. **E-mail** (label as "E-mail profissional" to subtly signal audience)
3. **Qualifier** — one of:
   - **Current role** (dropdown: Analyst / Coordinator / Manager / Director / C-Level)
   - **Company size** (dropdown: <50 / 50-500 / 500-5000 / 5000+)
   - **Years in current role** (dropdown: <1 / 1-3 / 3-5 / 5+)

The qualifier field:
- Lets the expert segment leads for the workshop and the pitch
- Signals to the lead that this isn't generic
- Adds ~1 friction point but increases lead quality substantially

## Field order logic

Lead fills easy → hard → committal:

1. **Name** (easy — low cognitive load)
2. **Email** (easy — autofilled usually)
3. **Qualifier** (requires a small decision)

Never put email last. Never put a dropdown first.

## Required vs. optional

For a 3-field form: all required.

For a 4–5 field form: make the qualifying fields required (they're the point), and the nice-to-haves optional (clearly marked).

Every optional field visible is ~0.5 friction point. Optional fields that are hidden behind "Show more" add less friction.

## Phone / WhatsApp — use with care

**Don't ask** unless you'll actually use it. Premium audiences resent unused phone fields — they expect a call that never comes (or worse, a cold call they didn't want).

**If the flow is WhatsApp-based** (common in BR infoproducts):
- Label: "WhatsApp (será usado para enviar o link do workshop e lembretes)"
- Helper text: "Você será adicionado ao grupo de participantes"
- This is honest and high-converting in BR market

## Qualifier field options — by offer type

**Executive workshop / career mentorship:**
- Current role (recommended — aligns with expert's segmentation)
- Years in management position

**High-ticket mentorship (6-month+):**
- Current income range
- Investment capacity

**B2B / consulting:**
- Company size
- Industry
- Current role at the company

**Infoproduct / creator offer:**
- Current audience size (if they're creators)
- Primary goal

## Progressive forms — when to use

Only if total fields > 5.

If you need 6–8 fields for qualification, split into 2 steps:
- **Step 1:** Name + Email only (commitment capture)
- **Step 2:** After submit, show 4–6 qualification fields on a second screen

**Why this works:** Once someone submits step 1, they're invested and complete step 2 at 70–85% rate. If you asked all 8 upfront, conversion drops dramatically.

**Trade-off:** More engineering complexity, and if step 2 isn't essential, skip progressive and accept a shorter form.

## Don't use: form patterns that kill conversion

- **Captcha on low-threat pages** — 10–30% conversion drop for minimal spam reduction
- **Email confirmation field** ("confirme seu email") — nobody wants this, autofill breaks it
- **Separate first-name/last-name fields** — unnecessary
- **Date of birth** — unless age-gating matters
- **Country field** with dropdown of 195 countries — use geolocation or skip
- **Password creation on a capture page** — this is capture, not signup; send a magic link later if needed

## Form validation UX

**On blur, not on every keystroke** for:
- Email format
- Required fields

**Immediate:**
- Character limits for text fields
- Dropdown selections

**Error copy must be specific:**
- ❌ "Invalid input"
- ✅ "Formato de e-mail inválido — exemplo: voce@empresa.com"

**Success state per field:**
- Subtle green check or color shift on valid input
- Does NOT replace the field label

## Submit button — functional rules

- **Text is specific to the offer:** "Garantir minha vaga", "Reservar meu lugar", "Receber minha inscrição"
- **Never "Submit" or "Send"**
- **Width:** full width of form on mobile; matches form width on desktop
- **Loading state:** button text changes to "Processando..." OR shows inline spinner; button disabled to prevent double-submit
- **After success:** button is hidden or replaced with success state (don't leave it clickable)

## The "just one more thing" section below submit

Below the submit button, include ONE of:
- **Privacy reassurance** — "Seus dados não serão compartilhados. Você pode descadastrar a qualquer momento." (LGPD-compliant language in BR)
- **Time commitment** — "Workshop de 90 minutos · Ao vivo e interativo"
- **What happens next** — "Você receberá a confirmação em até 60 segundos, com o link da sessão"
- **Social proof micro-line** — "Junte-se a 500+ executivos que já participaram"

Pick ONE. More than one is noise.

## LGPD compliance (Brazil)

If collecting any personal data in Brazil:
- Link to privacy policy must be accessible near the form
- Purpose of data collection must be stated or evident from context
- If using the data for marketing emails beyond the immediate workshop, explicit consent is required (checkbox or equivalent)

For a workshop signup, the workshop itself is the purpose of collection — that's covered by legitimate interest. But if the lead will receive follow-up emails about the pitch/mentorship, that's marketing and needs explicit consent.

**Recommended pattern:**
- Form collects name, email, qualifier for the workshop (legitimate interest — no checkbox needed)
- Single checkbox below form, pre-unchecked: "Quero receber comunicações sobre próximas ofertas e conteúdos do [nome do expert]"
- Workshop confirmation email allows unsubscribe from future marketing

Always verify with a lawyer — this skill provides UX patterns, not legal advice.

## Output specification template

When the skill produces a form spec for the developer, include:

```
Form: [name]
Fields:
  1. Name — required, single field, max 80 chars
  2. E-mail — required, email validation
  3. [Qualifier] — required, [dropdown with options]

Submit button: "[specific CTA copy]"
Loading state: "[copy]"
Success state: [inline confirmation with next step OR redirect to X]
Below submit: "[the one additional line]"
LGPD: [consent requirements]
Post-submit: [redirect URL or inline behavior]
```

This spec hands cleanly to whoever is building.
