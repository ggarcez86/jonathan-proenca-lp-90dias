# PLAN.md — Landing Page "Como Ser Promovido em 90 Dias"

> **Instruções para o agente (Claude / Gemini / Copilot):**
> Este é um documento vivo. Ao completar uma tarefa, atualize o checkbox correspondente de `- [ ]` para `- [x]` ANTES de passar para a próxima. Se uma tarefa gerar sub-tarefas imprevistas, adicione-as sob o milestone atual. No final de cada sessão, valide que este arquivo reflete o estado real do projeto.

---

## Status Atual

**Projeto iniciado:** _preencher ao começar_
**Última atualização:** _preencher a cada sessão_
**Milestone atual:** M0 — Project Setup
**Próxima tarefa:** Criar repositório Git no GitHub

---

## Skills a serem usadas neste projeto

Este projeto se apoia em 4 skills instaladas no agente. Cada uma dispara em momentos específicos:

| Skill | Quando disparar | Milestone |
|---|---|---|
| `capture-page-inspiration` | Antes de começar o visual — pra coletar referências | M0.5 |
| `capture-page-ux` | Durante decisões de estrutura/form/objeções (já aplicadas no PRD, mas consulta novamente se houver dúvida) | M2, M5, M6 |
| `premium-ui-design` | Toda vez que for criar/refinar um componente visual — dispara automaticamente pelos triggers | M1, M3 (principalmente) |
| `capture-page-planner` | Já foi usada pra gerar este PLAN.md, PRD.md, COPY.md, ASSETS.md — não precisa disparar de novo | Pré-M0 |

Se o agente parecer estar construindo algo genérico, pare e peça explicitamente: "Use a skill [nome] pra isso."

---

## M0 — Project Setup

- [ ] Criar repositório Git no GitHub (`jonathan-proenca-lp-90dias` ou similar)
- [x] Inicializar projeto Next.js 15 com TypeScript e Tailwind (`npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"`)
- [x] Configurar ESLint + Prettier (prettier-plugin-tailwindcss incluído)
- [x] Instalar dependências: `pnpm add react-hook-form zod @hookform/resolvers googleapis framer-motion lucide-react`
- [x] Criar `.env.example` com todas as variáveis de ambiente (SEM valores reais)
- [x] Criar `.env.local` com valores reais (adicionar ao `.gitignore` — já deve estar por padrão)
- [ ] Configurar `next.config.ts` (imagens, fonts, headers de segurança)
- [x] Criar estrutura de pastas: `src/components`, `src/sections`, `src/lib`, `src/styles`, `src/app/actions`, `public/assets`
- [ ] Commit inicial: "chore: initial project setup"

## M0.5 — Research Visual (skill: capture-page-inspiration)

> **Objetivo:** Antes de escrever qualquer CSS, rodar a skill `capture-page-inspiration` para coletar referências de LPs premium e travar a direção visual em evidências concretas (não em achismo).

- [x] Abrir conversa com o agente pedindo explicitamente: "Use a skill capture-page-inspiration para este projeto. Contexto: LP de captura de webinário gratuito do Jonathan Proença sobre promoção de carreira em 90 dias, tráfego pago, audiência executivos mid-senior, estética Dark AI-forward (já escolhida no PRD)."
- [x] Revisar o output da skill: 8–12 referências analisadas + moodboard consolidado + 3 direções de layout propostas
- [x] Escolher UMA das 3 direções propostas e registrar a decisão em PLAN.md > "Notas e Decisões"
- [x] Salvar output da skill como `INSPIRATION.md` na raiz do projeto (serve de referência visual durante todo o build)
- [ ] Se alguma referência específica será muito espelhada, salvar screenshot em `docs/references/` do projeto

## M1 — Design Tokens e Estrutura Estática

> **Pré-requisito:** Direção visual travada em M0.5. A skill `premium-ui-design` vai disparar automaticamente durante as tarefas visuais deste milestone e dos próximos.

- [x] Criar `src/styles/tokens.css` com as CSS variables Dark AI-forward (cores, fontes, spacing) — ver PRD
- [x] Importar `tokens.css` no `src/app/globals.css`
- [x] Configurar `tailwind.config.ts` (v4) mapeando as CSS variables para classes Tailwind (`bg-bg`, `text-text-high`, `border-border`, etc)
- [x] Configurar fontes via `next/font`: Instrument Serif (display) + Geist (body) no `app/layout.tsx`
- [x] Criar skeleton dos componentes em `src/sections/`: `UrgencyBar.tsx`, `Hero.tsx`, `Learnings.tsx`, `TargetAudience.tsx`, `ExpertBio.tsx`, `WhyFree.tsx`, `FinalCTA.tsx`, `Footer.tsx`
- [x] Criar `src/components/CaptureForm.tsx` (esqueleto, sem lógica ainda)
- [x] Montar `src/app/page.tsx` importando todas as seções na ordem correta
- [x] Validar que página renderiza (estrutura visível, ainda sem design)

## M2 — Copy Final em Cada Seção

> **IMPORTANTE:** A fonte de verdade da copy é o arquivo `COPY.md` na raiz do projeto. Para cada tarefa abaixo, abra o COPY.md, localize a seção correspondente e **copie o texto literal**. Não parafraseie, não resuma, não reordene frases. Se houver sugestões marcadas como `<!-- OPCIONAL -->`, use o texto original por padrão (o Gustavo decide se aceita a sugestão).

- [x] Inserir copy em `UrgencyBar.tsx` — fonte: `COPY.md > BARRA DE URGÊNCIA`
- [x] Inserir Badge em `Hero.tsx` — fonte: `COPY.md > HERO > Badge`
- [x] Inserir Headline em `Hero.tsx` — fonte: `COPY.md > HERO > Headline` (atentar ao `<em>` em "nenhum diretor vai te ensinar")
- [x] Inserir Subheadline em `Hero.tsx` — fonte: `COPY.md > HERO > Subheadline`
- [x] Inserir Corpo do Hero (5 parágrafos) em `Hero.tsx` — fonte: `COPY.md > HERO > Corpo do Hero` (Parágrafo 4 com tratamento visual destacado)
- [x] Inserir copy do formulário em `CaptureForm.tsx` — fonte: `COPY.md > FORMULÁRIO DE CAPTURA` (headline, sub-headline, labels, placeholders, helper text, botão, disclaimer, mensagens de erro)
- [x] Inserir copy em `Learnings.tsx` — fonte: `COPY.md > SEÇÃO — O QUE VOCÊ VAI APRENDER` (heading + 5 itens numerados)
- [x] Inserir copy em `TargetAudience.tsx` — fonte: `COPY.md > SEÇÃO — ESSA AULA É PARA VOCÊ SE...` (heading + 5 itens)
- [x] Inserir copy em `ExpertBio.tsx` — fonte: `COPY.md > SEÇÃO — QUEM É JONATHAN PROENÇA` (7 parágrafos, Parágrafo 4 como pull quote)
- [x] Inserir copy em `WhyFree.tsx` — fonte: `COPY.md > SEÇÃO — POR QUE É GRATUITO?` (4 parágrafos)
- [x] Inserir copy em `FinalCTA.tsx` — fonte: `COPY.md > SEÇÃO — CTA FINAL` (headline, subheadline, botão, microcopy)
- [x] Inserir copy da página `/obrigado` — fonte: `COPY.md > PÁGINA /OBRIGADO`
- [x] Preencher metadata em `layout.tsx` — fonte: `COPY.md > METADATA`
- [x] Inserir copy do footer em `Footer.tsx` — fonte: `COPY.md > FOOTER`
- [x] **Validação final:** abrir a página renderizada lado-a-lado com o COPY.md e verificar frase a frase. Qualquer divergência = bug a corrigir antes de M3.

## M3 — Visual Polish (Dark AI-forward)

- [x] **UrgencyBar:** background sutil (warm amber 10% opacity), texto accent, border-bottom fino, padding moderado — não agressivo
- [x] **Hero:** layout split desktop (3:2), background gradient mesh (gold radial top-right), texto em Instrument Serif com H1 em tamanho clamp(3rem, 7vw, 6rem)
- [x] **Hero form:** Surface 1 com border sutil, labels em uppercase letter-spaced, inputs em Surface 2, botão accent
- [x] **Learnings:** numbered list com números em Instrument Serif oversized (não ícones em círculo) — ver component-patterns
- [x] **TargetAudience:** vertical list com separadores hairline, sem cards genéricos
- [x] **ExpertBio:** layout editorial com foto à esquerda e texto prose à direita, pull quote de "mais de 11 promoções" destacada
- [x] **WhyFree:** seção intimista, max-width ~640px, centralizada, tipografia quiet
- [x] **FinalCTA:** tratamento dramático — background full Surface 1, headline em serif grande, form repetido centralizado
- [x] **Footer:** minimalista, só nome do Jonathan + ano + link pra política de privacidade
- [x] Implementar motion: hero reveal orchestrated com Framer Motion (stagger children, blur + y-translate)
- [x] Implementar hover states: CTA com subtle brightness shift, links com underline slide-in
- [x] Rodar self-audit da skill `premium-ui-design` e corrigir qualquer item que falhou

## M4 — Assets Externos (executar em paralelo, ver ASSETS.md)

- [x] Receber/obter foto do Jonathan em alta qualidade
- [x] Tratar foto: remover background (remove.bg), color grade para combinar com paleta dark, export em WebP 1200x1600
- [x] Decidir: background do hero via CSS puro (gradient mesh) OU gerar em Midjourney/Flux
- [x] Se gerar: executar prompts de `asset-prompting.md` (Dark AI-forward), escolher melhor variação, tratar e exportar
- [x] Integrar foto + background no `HeroImageComposite.tsx` usando Next/Image com `priority`
- [x] Gerar OG Image 1200x630 via Next.js `ImageResponse` (app/opengraph-image.tsx) OU manualmente no Figma
- [x] Gerar favicon e ícones do app via RealFaviconGenerator
- [x] Adicionar todos assets em `public/assets/` com nomes semânticos
- [x] Validar carregamento: todos assets têm alt text e WebP com fallback PNG onde necessário

## M5 — Lógica do Formulário (DB / Backend)

> **Decisão Pendente:** Supabase Oficializado com Bypass RLS.

- [x] Escolher a infraestrutura de Banco de Dados.
- [x] Configurar conexão com o serviço escolhido (`src/lib/db`).
- [x] Criar Server Action `src/app/actions/submitCapture.ts`.
- [x] Adicionar proteção de envios (Honeypot) e tratamentos de erro UI.
- [x] Conectar `CaptureForm.tsx` e validar submissão fluida.

## M6 — Pós-Submit e Thank You Page

- [x] Criar `src/app/obrigado/page.tsx`.
- [x] Inserir copy simples e direta com foco na confirmação do envio de reminder por email/whatsapp.
- [x] Remover dependências engessadas de grupos do WhatsApp.
- [x] Garantir redirect suave de `/` para `/obrigado` após o sucesso do formulário.

## M7 — Auditoria Visual (Sanity Check)

- [x] Validação rápida de responsividade base da UI (celular vs desktop).
- [x] Garantir que o texto na versão mobile nunca "vaze" pra fora da tela (overflow horizontal).
- [x] Conferir legibilidade final dos textos em telas muito pequenas (iPhone SE).

## M8 — Custom Analytics Dashboard (`/dashboard`)

- [x] Criar framework de autenticação leve. (Auth Cookie criptografado Next.js).
- [x] Implementar rota protegida `/dashboard`.
- [x] Registrar Page Views (/) e Conversões (/obrigado) de form orgânica baseada em logs ou contadores no banco de dados escolhido no M5.
- [x] Criar UI do Dashboard puxando os dados (Taxa de Conversão, Volume Absoluto).
- [x] Implementar filtros simples sugeridos (Range de datas, métricas geográficas/fontes básicas se capturáveis via headers da requisição `x-forwarded-for`).
- [x] Nota: _Rastreamento complexo de Meta/Google Ads transferido para o GTM proprietário._

## M10 — Deploy da Aplicação Final

- [ ] Configurar projeto e domínios na Vercel.
- [ ] Injetar Variáveis de Ambiente de DB e Auth na Vercel.
- [ ] Validar rotas de Server Actions em ambiente de produção (CORS, cache headers).
- [ ] Smoke test do preenchimento e log do IP no Analytics.

---

## Tarefas Pós-Launch (backlog — não bloqueiam go-live)

- [ ] Configurar Meta CAPI (Conversions API) para tracking server-side (mais preciso que Pixel client-side)
- [ ] A/B test headline alternativo (Optimizely, Growthbook, ou manual com URL params)
- [ ] A/B test CTA button copy
- [ ] Gravar vídeo curto do Jonathan (45-60s) para embed na `/obrigado`
- [ ] Implementar sequência de reminder via WhatsApp API (T-24h, T-1h, T-5min)
- [ ] Criar landing page de followup pós-webinário
- [ ] Implementar UTM tracking detalhado por campanha Meta/Google
- [ ] Configurar monitoramento de uptime (UptimeRobot ou Vercel Monitoring)
- [ ] Implementar fallback de form para caso Sheets API caia (salvar em Supabase como backup)

---

## Notas e Decisões (registrar durante a execução)

_Registrar aqui decisões importantes tomadas durante a produção que não estavam no PRD, com data._

- [2026-04-16] — [M0.5] Escolhida a "Direção B: O Split Cinematográfico" sugerida pela pesquisa de referências, pois ela alinha perfeitamente as expectativas de layout Desktop do PRD (texto esquerda, foto e form à direita), otimizando a conversão para High-Ticket.
- [2026-04-16] — [M-Extra Visual] Refatoração avançada nas sessões de Learnings (Magic Cards), TargetAudience (Lista Editorial em Cascata) e ExpertBio (Editorial assimétrico fotográfico) espelhando rigorosamente as referências visuais em anexo, alinhadas às skills de premium-ui-design.

---

## Bloqueadores Conhecidos

_Itens que dependem de input externo antes de prosseguir:_

- **Data do webinário** — bloqueia copy de reminder e schema.org
- **URL do grupo de WhatsApp** — bloqueia M6 (pós-submit)
- **GA4 ID e Meta Pixel ID** — bloqueiam M8 (analytics)
- **Foto do Jonathan** — bloqueia M4 (assets)
