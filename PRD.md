# PRD — Landing Page "Como Ser Promovido em 90 Dias"

## Resumo do Projeto

**O que é:** Landing page de captura para o webinário gratuito "Como Ser Promovido em 90 Dias", conduzido por Jonathan Proença.
**Objetivo primário:** Capturar leads qualificados (profissionais estagnados em suas carreiras) via formulário, que serão convertidos durante o webinário.
**Audiência:** Profissionais brasileiros (30-50 anos), corporativos, de nível mid-senior, que se sentem estagnados apesar de entregarem muito. Brasil predominantemente, mas copy funciona para expats também.
**Deadline:** [a definir com Jonathan]
**Fonte de tráfego esperada:** Tráfego pago (Meta Ads e Google Ads), mais tráfego orgânico social.

---

## Stack Técnica

**Framework:** Next.js 15 (App Router)
**Linguagem:** TypeScript
**Estilização:** Tailwind CSS v4 com design tokens customizados
**Gerenciamento de estado:** React state (useState) — sem necessidade de store global
**Formulário:** react-hook-form + zod
**Integração de leads:** Google Sheets API via Server Action
**Hospedagem:** Vercel (plano Hobby ou Pro)
**Analytics:** GA4 + Meta Pixel (server-side via Conversions API recomendado)
**Fontes:** next/font com Instrument Serif (display) + Geist (body) — ou alternativas da design family

### Rationale da escolha

Next.js 15 foi escolhido por três razões: (1) SEO forte importa para reduzir CPC em tráfego pago (Quality Score do Google beneficia LPs bem indexáveis), (2) Server Actions permitem proteger as credenciais do Google Sheets sem precisar de endpoint separado, (3) Image optimization nativa acelera o LCP que é crítico para Quality Score.

---

## Design System

**Design family escolhida:** **Dark AI-forward** (com paleta warm gold)

**Justificativa:** Jonathan lidera um time de IA no Texas e o método tem componente de IA. A estética "dark premium tech" comunica modernidade + autoridade sem cair no visual genérico de infoproduto. A história pessoal dele (Madureira → multinacional) pede um tratamento premium mas não aristocrático — Dark AI-forward hits exactly that.

### Tokens principais

```css
:root {
  /* Colors — Dark AI-forward with warm gold */
  --bg: #0A0A0B;
  --surface-1: #141417;
  --surface-2: #1E1F24;
  --border: #2A2B32;
  --border-strong: #3A3B42;

  --text-high: #F4F4F5;
  --text-mid: #A1A1AA;
  --text-low: #52525B;

  --accent: #C9A961;          /* Warm gold — executive premium */
  --accent-fg: #0A0A0B;
  --accent-subtle: rgba(201, 169, 97, 0.1);
  --accent-border: rgba(201, 169, 97, 0.3);

  /* Typography */
  --font-display: 'Instrument Serif', Georgia, serif;
  --font-body: 'Geist', system-ui, sans-serif;

  /* Spacing scale (intentional, non-uniform) */
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 2rem;
  --space-lg: 4rem;
  --space-xl: 8rem;
  --space-section: 10rem;
  --space-section-tight: 5rem;
}
```

---

## Árvore de Componentes

```
<Page>
  ├── <UrgencyBar />                    → "Vagas limitadas · Webinário gratuito..."
  ├── <Hero>
  │   ├── <Badge />                     → "Aula ao vivo e gratuita"
  │   ├── <Headline />                  → "O Método que nenhum diretor..."
  │   ├── <Subheadline />
  │   ├── <HeroBody />
  │   ├── <HeroImageComposite />        → foto do Jonathan + background
  │   └── <CaptureForm variant="hero" />
  ├── <Learnings />                     → "O que você vai aprender" (5 itens)
  ├── <TargetAudience />                → "Essa aula é para você se..."
  ├── <ExpertBio>                       → Quem é Jonathan Proença
  │   └── <JonathanPortrait />
  ├── <WhyFree />                       → Por que é gratuito
  ├── <FinalCTA>
  │   ├── <FinalHeadline />
  │   ├── <FinalSubheadline />
  │   └── <CaptureForm variant="final" />
  └── <Footer />
```

Cada componente: arquivo próprio em `src/sections/`, props tipadas, usa tokens (nenhuma cor ou spacing hardcoded).

---

## Contratos de Dados

### Form Payload (client → server)

```typescript
interface CaptureFormPayload {
  name: string;        // required, 2-80 chars
  email: string;       // required, valid email
  whatsapp: string;    // required, BR format
}
```

### Google Sheets — Schema da planilha

| Coluna | Campo | Tipo | Exemplo |
|---|---|---|---|
| A | timestamp | ISO string | 2026-04-16T19:30:00.000Z |
| B | name | string | Maria Silva |
| C | email | string | maria@empresa.com.br |
| D | whatsapp | string | (11) 98765-4321 |
| E | source | string | ?utm_source=meta&utm_campaign=promo90 |
| F | user_agent | string | Mozilla/5.0 ... |

### Integration Response (server → client)

```typescript
interface CaptureFormResponse {
  success: boolean;
  error?: string;
  redirectUrl?: string;  // para /obrigado ou direto pro WhatsApp group
}
```

---

## Integrações

### Google Sheets (via Service Account)

Ver detalhes em `capture-page-planner/references/integration-patterns.md`. Setup resumido:

1. Criar projeto no Google Cloud Console
2. Ativar Google Sheets API
3. Criar Service Account, baixar JSON
4. Criar planilha no Google Sheets, compartilhar com o email do service account (Editor)
5. Configurar env vars no Vercel

**Env vars necessárias:**
```bash
GOOGLE_SERVICE_ACCOUNT_EMAIL=...
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN..."
GOOGLE_SHEET_ID=...
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-...
NEXT_PUBLIC_META_PIXEL_ID=...
NEXT_PUBLIC_WHATSAPP_GROUP_URL=https://chat.whatsapp.com/...
```

**Fluxo de submissão:**
```
Client form → Server Action (validate Zod) → Google Sheets API append
                                           → Return { success, redirectUrl }
                                           → Client redireciona para /obrigado
```

**Error handling:**
- Timeout: 8 segundos
- Se Sheets indisponível: logar no servidor (Vercel logs) + retornar sucesso ao cliente (não perder lead)
- Retry: 1 tentativa em caso de falha de rede

---

## Rotas e Estados

### `/` (landing page)
- Server Component (SSR para SEO)
- Metadata completa (title, description, OG, Twitter)
- Sem data fetching no servidor (página é estática com form client-side)

### `/obrigado` (thank-you page)
- Confirmação da inscrição
- Detalhes do webinário (data, hora, link)
- Botão/link para grupo do WhatsApp
- Evento de conversão dispara no GA4 + Meta Pixel

### Estados do formulário (inline)
- **idle:** form em estado normal, pronto para preenchimento
- **submitting:** botão disabled, texto "Garantindo sua vaga..."
- **success:** form substituído por mensagem + redirect automático em 1.5s
- **error:** mensagem abaixo do botão, dados preservados

---

## Analytics

### Eventos GA4

| Evento | Gatilho | Parâmetros |
|---|---|---|
| `page_view` | Load | page_title, referrer, utm_source, utm_campaign |
| `scroll_50` | Scroll 50% | - |
| `scroll_90` | Scroll 90% | - |
| `form_view` | Form entra no viewport | variant |
| `form_start` | Primeiro foco num campo | variant |
| `form_submit_click` | Clique no botão | variant |
| `form_success` | Submit bem-sucedido | variant |
| `form_error` | Submit com erro | variant, error_code |
| `scroll_to_form_cta_click` | Clique em CTA que leva ao form | position (hero/middle/final) |

### Meta Pixel events
- `PageView` (padrão)
- `ViewContent` (após 3s na página)
- `Lead` (após form_success)

---

## Performance

**Targets (Lighthouse mobile, slow 4G):**
- LCP: < 2.0s
- CLS: < 0.05
- TBT: < 200ms
- Performance score: ≥ 90

**Estratégias:**
- `priority` no Next/Image do hero
- Fontes via next/font com display: swap
- CSS crítico inline (automático no Next)
- Seções abaixo da dobra com `loading="lazy"` em imagens
- Sem JS pesado; Framer Motion só em animações essenciais (hero reveal)

---

## SEO

**Title:** `Como Ser Promovido em 90 Dias · Webinário Gratuito com Jonathan Proença`
**Description:** `O método que nenhum diretor vai te ensinar. Aula ao vivo e gratuita para profissionais que entregam tudo e não são promovidos. Vagas limitadas.`
**OG Image:** 1200x630px (ver ASSETS.md)
**Canonical URL:** definir URL final

**Schema.org — Event:**
```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Como Ser Promovido em 90 Dias",
  "description": "Webinário gratuito com Jonathan Proença sobre como acelerar promoções na carreira corporativa.",
  "startDate": "[definir]",
  "location": { "@type": "VirtualLocation", "url": "[link do webinário]" },
  "organizer": { "@type": "Person", "name": "Jonathan Proença" },
  "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
  "isAccessibleForFree": true
}
```

**Robots:** `index, follow` (se for LP pública) OU `noindex, nofollow` (se for só para tráfego pago e não quer indexar)

---

## Acessibilidade

**Nível alvo:** WCAG 2.1 AA

- Form labels associados (for/id)
- `aria-live="polite"` em mensagens de erro
- Contraste mínimo 4.5:1 (validar com WebAIM)
- Foco visível em todos elementos interativos
- Navegação por teclado completa
- Alt text em imagens (`expert-hero.webp` → "Jonathan Proença, idealizador do método 90 dias")
- `prefers-reduced-motion` respeitado

---

## Breakpoints Responsivos

```
mobile:    < 640px     (base, mobile-first)
tablet:    640-1024px
desktop:   1024-1440px
wide:      > 1440px
```

**Layout do Hero por breakpoint:**
- Mobile: texto → foto → form (stacked)
- Tablet: texto → foto → form (stacked, max-width)
- Desktop: texto esquerda, foto + form à direita (split 3:2)
- Wide: mesmo desktop com mais respiro lateral

---

## Variáveis de Ambiente

```bash
# .env.local (NUNCA commitar — criar .env.example sem secrets)
GOOGLE_SERVICE_ACCOUNT_EMAIL="capture-writer@projeto.iam.gserviceaccount.com"
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
GOOGLE_SHEET_ID="1AbC..."

NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXX"
NEXT_PUBLIC_META_PIXEL_ID="xxxxxxxxx"
NEXT_PUBLIC_WHATSAPP_GROUP_URL="https://chat.whatsapp.com/XXXX"
NEXT_PUBLIC_WEBINAR_DATE="2026-MM-DD"
NEXT_PUBLIC_WEBINAR_TIME="19:00"
```

---

## Critérios de Sucesso

**Técnicos:**
- Página carrega em < 2s em 4G mobile
- Form submita para Google Sheets com 100% de sucesso em testes
- Lighthouse mobile ≥ 90 em Performance
- Zero erros no console em produção
- Funciona em Chrome, Safari, Firefox (últimas 2 versões), iOS Safari, Chrome Android

**Produto:**
- Copy 100% idêntica ao documento aprovado (sem paráfrases acidentais)
- Visual aderente à Dark AI-forward
- Foto do Jonathan integrada premium (sem parecer colada)
- Form funciona em mobile e desktop sem friction

**Negócio:**
- Leads chegam na planilha em tempo real
- Eventos disparam corretamente em GA4 e Meta Pixel
- Post-submit redireciona para grupo do WhatsApp
- Taxa de conversão benchmark: a medir — para tráfego pago em nicho executivo BR, 15-25% é bom, 25%+ é excelente

---

## Open Questions

_A resolver antes de M5:_

- [ ] Data e horário exato do webinário (preencher schema.org e copy de reminder)
- [ ] URL do grupo de WhatsApp para redirect pós-submit
- [ ] GA4 Measurement ID (criar property se não existir)
- [ ] Meta Pixel ID (criar pixel se não existir)
- [ ] Domínio final da página (afeta canonical e OG URL)
- [ ] Se vai ter reprise ou é sessão única (afeta copy de urgência)
- [ ] Jonathan vai querer foto específica OU precisamos tratar uma existente?
