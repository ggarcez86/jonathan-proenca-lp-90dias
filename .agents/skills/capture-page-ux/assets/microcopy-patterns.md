# Microcopy Patterns

Ready-to-adapt microcopy for every state of a capture form. Provided in PT-BR (primary) and EN (alternative). These are starting points — adapt to the expert's voice.

---

## Labels

Labels identify the field. Keep them clear, no humor.

**PT-BR:**
- "Nome completo"
- "E-mail profissional" (signals audience — use for B2B/executive)
- "E-mail" (generic)
- "WhatsApp" (when actually using WhatsApp as channel)
- "Cargo atual"
- "Empresa" (optional field, only when relevant)
- "Há quanto tempo está no cargo atual"
- "Maior desafio profissional neste momento" (for pre-qualification with selective offers)

**EN:**
- "Full name"
- "Work email"
- "Current role"
- "Years in current role"

**Rules:**
- Title case in PT-BR for professional feel ("Nome completo", not "nome completo")
- Don't use colons at the end of labels
- Don't stack label + sub-label — use helper text instead

---

## Placeholder text

Placeholders show an example of valid input. Never repeat the label.

**PT-BR — Good:**
- Nome: "Maria Silva" or "Como você quer ser chamado(a)"
- E-mail: "voce@empresa.com.br"
- WhatsApp: "(11) 98765-4321"

**PT-BR — Bad:**
- Nome: "Nome completo" ❌ (repeats label)
- E-mail: "Digite seu e-mail" ❌ (tells what to do, not what valid input looks like)
- WhatsApp: "Número de WhatsApp" ❌ (repeats label)

**EN — Good:**
- Name: "Jane Doe"
- Email: "you@company.com"
- Role: "Director, VP, etc."

**Rules:**
- Use a realistic example, not a template
- Keep gray/low-contrast (placeholder is hint, not content)
- Should disappear immediately on focus

---

## Helper text (below field)

Helper text builds trust and reduces anxiety. Use sparingly — only where friction or confusion exists.

**PT-BR:**
- E-mail: "Usaremos apenas para enviar o link do workshop"
- WhatsApp: "Para receber o link da sessão e um lembrete 1 hora antes"
- Cargo atual: "Para personalizarmos a abordagem do workshop"
- Empresa: "Opcional · Usado apenas para estatísticas agregadas"

**EN:**
- Email: "Only for workshop access — no spam"
- WhatsApp: "For session link and a reminder 1 hour before"

**Rules:**
- Don't explain every field
- Do explain fields that might cause hesitation (phone, company, role)
- Keep under 15 words

---

## Error states

Errors must be specific. Generic errors ("Invalid input") frustrate users.

**PT-BR — Email format:**
- "Formato de e-mail inválido. Exemplo: voce@empresa.com"

**PT-BR — Required field empty:**
- "Este campo é obrigatório"
- Better: "Precisamos do seu [nome/e-mail/WhatsApp] para confirmar sua vaga"

**PT-BR — Phone format:**
- "Inclua DDD. Exemplo: (11) 98765-4321"

**PT-BR — Dropdown not selected:**
- "Selecione uma opção para continuar"

**PT-BR — Network error:**
- "Não foi possível enviar sua inscrição. Verifique sua conexão e tente novamente."

**PT-BR — Duplicate email (already registered):**
- "Este e-mail já está inscrito. Verifique sua caixa de entrada ou escreva para contato@expert.com"

**EN — Email format:**
- "Please use a valid email format, like you@company.com"

**Rules:**
- Always tell the user what's wrong AND how to fix it
- Never blame the user ("You entered wrong data" ❌)
- Red color ONLY for the error line, not the entire field background
- Keep error text on one line when possible

---

## Submit button — normal state

Must be specific to the offer. Never "Submit".

**PT-BR for workshop registration:**
- "Garantir minha vaga"
- "Reservar meu lugar"
- "Confirmar minha inscrição"
- "Quero participar"
- "Receber o link do workshop"

**PT-BR for waitlist:**
- "Entrar na lista de espera"
- "Quero ser notificado(a)"
- "Reservar prioridade"

**PT-BR for application-style:**
- "Solicitar minha inscrição"
- "Enviar candidatura"
- "Aplicar para a seleção"

**EN for workshop:**
- "Reserve my seat"
- "Claim my spot"
- "Confirm registration"

**Rules:**
- Use first-person when possible ("my seat", not "your seat") — creates ownership
- Match the offer language (workshop → "vaga", cohort → "inscrição", mentoria → "candidatura")
- 2–4 words ideal
- No punctuation at end (no period, no exclamation)

---

## Submit button — loading state

The lead just clicked. Something must visibly change.

**PT-BR:**
- "Processando..."
- "Confirmando sua inscrição..."
- "Reservando sua vaga..."

**EN:**
- "Processing..."
- "Confirming your registration..."

**Rules:**
- Button must be visually disabled (reduced opacity, no pointer)
- Prevent double-submit (disable onClick after first click)
- Show ANY progress within 500ms of click — users panic if nothing happens

---

## Submit button — success state

Often underrated. This is the commitment moment.

**PT-BR:**
- "✓ Vaga confirmada"
- "✓ Inscrição recebida"
- "✓ Tudo certo"

**EN:**
- "✓ Confirmed"
- "✓ You're in"

**Rules:**
- Single check mark works better than celebration emojis for premium
- Button can be replaced entirely by the success state component
- Don't re-enable the button — the action is done

---

## Success state body copy

The inline success state (Pattern 1 from post-submit-flows.md) needs real content.

**PT-BR example:**

```
Sua vaga está confirmada.

Workshop: [Nome]
Data: [Data] · [Hora] BRT
Duração: 90 minutos

Em até 60 segundos, você receberá um e-mail com:
 • O link da sessão ao vivo
 • Um guia de preparação
 • Convite para o grupo exclusivo

Próximo passo: entre no grupo dos participantes.
[botão → WhatsApp]

Se o e-mail não chegar, verifique a caixa de spam ou escreva para contato@expert.com.
```

**Rules:**
- State what happened (confirmation)
- Restate what they signed up for (commitment reinforcement)
- Explain what happens next (removes uncertainty)
- One primary next action (keeps momentum)
- Fallback contact (handles the 5% who don't receive email)

---

## Below-submit reassurance line

One line beneath the submit button. Pick ONE purpose:

**Privacy:**
- "Seus dados não serão compartilhados. LGPD-compliant."
- "Seu e-mail é seguro. Sem spam."

**Time expectation:**
- "Workshop de 90 minutos · Ao vivo e interativo"
- "Sessão única · Não haverá reprise"

**What happens next:**
- "Você receberá a confirmação em até 60 segundos"
- "Link da sessão enviado imediatamente após a inscrição"

**Social proof reinforcement:**
- "Junte-se a 500+ executivos que já participaram"
- "CFOs de empresas do Ibovespa já passaram por este método"

**Rules:**
- Pick ONE purpose, not all four
- Keep under 15 words
- Text size smaller than labels, but readable

---

## LGPD consent line (when required)

For marketing consent beyond the immediate workshop:

**PT-BR:**
- "Ao me inscrever, autorizo o uso dos meus dados para envio de comunicações relacionadas ao workshop."
- Checkbox (optional, pre-unchecked): "Quero também receber conteúdos e ofertas do [nome do expert]."

**Rules:**
- Separate immediate purpose (workshop = legitimate interest) from marketing (needs explicit opt-in)
- Link to privacy policy must be present
- Language must be clear, not buried in legal speak

---

## Confirmation email subject lines

The confirmation email arrives immediately. Subject line matters.

**PT-BR:**
- "Sua vaga está confirmada · [Nome do workshop]"
- "Confirmado: [Nome do workshop] · [Data]"
- "Bem-vindo(a) ao [Nome do workshop]"
- "[Nome do workshop] · Confirmação + link da sessão"

**EN:**
- "You're in — [Workshop Name]"
- "Confirmed: [Workshop Name] on [Date]"

**Rules:**
- Lead with confirmation, not marketing
- Include workshop name and date for inbox searchability
- From name should be the expert's name, not "noreply" or "marketing@"

---

## Reminder email subject lines

For the sequence leading up to the workshop:

**T-24 hours:**
- "Amanhã, 19h: [Nome do workshop]"
- "Seu workshop é amanhã · Link e preparação"

**T-1 hour:**
- "Começando em 1 hora · [link]"
- "Daqui 1 hora: [Nome do workshop]"

**T-5 minutes:**
- "Começando agora · [link direto]"
- "Estamos te esperando · [link]"

**Rules:**
- Time-based subject lines outperform curiosity subject lines for reminders
- Include the link in T-1h and T-5min subject (so user can click from notification)

---

## Using this file

When the skill produces a capture page spec, include microcopy for:
- All form labels
- All placeholders
- All helper text
- Submit button (normal, loading, success)
- Below-submit line
- Success state full content
- Confirmation email subject + opener
- Reminder sequence subject lines

Deliver these as a consolidated microcopy sheet the developer can implement without further decisions.
