# PRD — [Project Name]

## Resumo do Projeto

**O que é:** [One-sentence description]
**Objetivo primário:** [The single conversion goal]
**Audiência:** [Target audience for the capture]
**Deadline:** [Target launch date]
**Fonte de tráfego:** [How people will arrive — paid ads, email, referral, etc.]

---

## Stack Técnica

**Framework:** [e.g., Next.js 15 App Router]
**Linguagem:** [TypeScript / JavaScript]
**Estilização:** [Tailwind CSS + design tokens]
**Gerenciamento de estado:** [React state / Zustand / none]
**Formulário:** [react-hook-form + zod / nativo]
**Integrações:** [Google Sheets / Supabase / webhook / etc.]
**Hospedagem:** [Vercel / Netlify / etc.]
**Analytics:** [GA4 / Meta Pixel / Plausible / etc.]

### Rationale da escolha
[Why this stack for this project — 2–3 sentences]

---

## Árvore de Componentes

```
<Page>
  ├── <UrgencyBar />
  ├── <Hero>
  │   ├── <Badge />
  │   ├── <Headline />
  │   ├── <Subheadline />
  │   ├── <HeroBody />
  │   └── <CaptureForm />
  ├── <Learnings />
  ├── <TargetAudience />
  ├── <ExpertBio />
  ├── <WhyFree />
  ├── <FinalCTA>
  │   └── <CaptureForm variant="final" />
  └── <Footer />
```

Each component:
- Self-contained file
- Props-typed via TypeScript interface
- Uses design tokens (no hardcoded colors/spacing)

---

## Design System

**Design family escolhida:** [Editorial / Dark AI-forward / Luxury Clean]
**Reference:** See `premium-ui-design` skill notes or the moodboard output

### Tokens principais

```css
:root {
  /* Colors */
  --bg: [hex];
  --surface-1: [hex];
  --text-high: [hex];
  --text-mid: [hex];
  --accent: [hex];
  --accent-fg: [hex];

  /* Typography */
  --font-display: '[font name]';
  --font-body: '[font name]';

  /* Spacing scale */
  [...]
}
```

Full tokens in `src/styles/tokens.css` (to be created in M0).

---

## Contratos de Dados

### Form Payload (client → server)

```typescript
interface CaptureFormPayload {
  name: string;       // required, 2-80 chars
  email: string;      // required, valid email format
  whatsapp: string;   // required, BR format (11) 99999-9999
  // Add additional qualifier fields if needed
}
```

### Integration Response (server → client)

```typescript
interface CaptureFormResponse {
  success: boolean;
  message?: string;
  redirectUrl?: string;  // for post-submit redirect (e.g., WhatsApp group)
}
```

---

## Integrações

### Google Sheets (Lead Storage)

**Method:** Server Action do Next.js chamando Google Sheets API v4 via service account

**Setup:**
1. Criar service account no Google Cloud Console
2. Gerar JSON de credenciais, salvar em `GOOGLE_SERVICE_ACCOUNT_KEY` (env var)
3. Criar planilha, compartilhar com email do service account com permissão de editor
4. ID da planilha em `GOOGLE_SHEET_ID` (env var)

**Fluxo:**
```
Client form → Server Action → Google Sheets API append → return success
```

**Sheet schema:**
| Coluna | Tipo | Exemplo |
|---|---|---|
| A: timestamp | ISO string | 2026-04-16T19:30:00Z |
| B: name | string | Maria Silva |
| C: email | string | maria@empresa.com |
| D: whatsapp | string | (11) 98765-4321 |
| E: source | string | UTM source / "direct" |
| F: user_agent | string | [browser UA] |

**Error handling:**
- Timeout: 8 segundos
- Retry: 1 tentativa em caso de falha de rede
- Fallback: se Sheets indisponível, logar no console do servidor e ainda mostrar sucesso ao usuário (evita perder o lead por falha temporária — recuperar via logs)

---

## Rotas e Estados

### `/` (landing page)
- SSR para SEO e performance
- Fetch nenhum necessário no servidor (página estática + form client-side)

### `/obrigado` (thank-you page)
- Exibida após submit bem-sucedido
- Contém mensagem de confirmação, detalhes do webinário, e link do WhatsApp (se aplicável)

### Estados inline (sem mudança de rota)
- Form idle
- Form submitting (botão em loading)
- Form success (substitui o form por mensagem inline)
- Form error (mensagem de erro abaixo do botão, preserva dados digitados)

---

## Analytics

### Eventos a rastrear (GA4 / Meta Pixel / server-side)

| Evento | Gatilho | Parâmetros |
|---|---|---|
| `page_view` | Load da LP | page_title, referrer, utm_* |
| `scroll_50` | Usuário scroll 50% | — |
| `scroll_90` | Usuário scroll 90% | — |
| `form_view` | Form entra no viewport | variant (hero / final) |
| `form_start` | Usuário digita no primeiro campo | variant |
| `form_submit` | Clique no botão submit | variant |
| `form_success` | Submissão bem-sucedida | variant |
| `form_error` | Erro no submit | variant, error_type |
| `cta_click` | Clique em qualquer CTA que scroll pra form | location |

---

## Performance

**Targets (Lighthouse mobile):**
- LCP: < 2.0s
- CLS: < 0.05
- TBT: < 200ms
- Performance score: ≥ 90

**Estratégias:**
- Next.js Image com `priority` no hero
- Fontes via `next/font` com display: swap
- CSS crítico inline
- Lazy load de seções abaixo da dobra (`next/dynamic` ou Intersection Observer)
- Pré-conexão a domínios de terceiros (Google Fonts, Sheets API)

---

## SEO

**Title:** [60 chars max — include primary keyword]
**Description:** [160 chars max]
**OG Image:** 1200x630px (see ASSETS.md)
**Schema.org:** Event schema para o webinário (Event type, startDate, location: "Online")
**Robots:** index, follow (a menos que seja LP de tráfego pago apenas → noindex)

---

## Acessibilidade

**Nível alvo:** WCAG 2.1 AA

**Requisitos específicos:**
- Form labels associados a inputs (for/id)
- Mensagens de erro com `aria-live="polite"`
- Contraste de texto mínimo 4.5:1
- Foco visível em todos os elementos interativos
- Navegação por teclado completa (Tab, Shift+Tab, Enter)
- Alt text em todas as imagens
- Semantic HTML (`<section>`, `<header>`, `<main>`, `<footer>`)
- `prefers-reduced-motion` respeitado em animações

---

## Breakpoints Responsivos

```
mobile:    < 640px   (base, mobile-first)
tablet:    640-1024px
desktop:   1024-1440px
wide:      > 1440px
```

**Regras por breakpoint:**
- Mobile: hero form empilhado abaixo do texto
- Tablet: form ainda empilhado, mas com max-width
- Desktop: hero split (texto esquerda, form direita)
- Wide: mesmo layout desktop com mais respiro lateral

---

## Variáveis de Ambiente

```bash
# .env.local
GOOGLE_SERVICE_ACCOUNT_KEY='{"type":"service_account",...}'
GOOGLE_SHEET_ID='1AbC...'
NEXT_PUBLIC_GA_MEASUREMENT_ID='G-XXXXXX'
NEXT_PUBLIC_META_PIXEL_ID='xxxxxxx'
NEXT_PUBLIC_WHATSAPP_GROUP_URL='https://chat.whatsapp.com/xxx'
```

**IMPORTANT:** Never commit `.env.local`. Include `.env.example` without secrets.

---

## Critérios de Sucesso

**Técnicos:**
- [ ] Página carrega em < 2s em 4G
- [ ] Form submita para Google Sheets com sucesso em 100% dos testes
- [ ] Lighthouse score ≥ 90 mobile
- [ ] Zero erros no console em produção
- [ ] Form funciona em Chrome, Safari, Firefox (últimas 2 versões), iOS Safari, Chrome Android

**Produto:**
- [ ] Copy idêntica ao aprovado (nenhuma reescrita acidental)
- [ ] Visual aderente à design family escolhida
- [ ] Todos os assets externos integrados (nada de placeholder em produção)
- [ ] Taxa de conversão benchmark: [definir baseline esperado]

**Negócio:**
- [ ] Leads chegam na planilha em tempo real
- [ ] Evento de conversão disparando no GA4 e Meta Pixel
- [ ] Post-submit redireciona para o grupo do WhatsApp (se configurado)

---

## Open Questions

[Lista de decisões que ainda precisam ser tomadas durante a produção — a ser resolvida antes de M5]

- [ ] [Question 1]
- [ ] [Question 2]
