# PLAN.md — [Project Name]

> **Instructions for the agent (Claude / Gemini / Copilot):**
> This is a living document. As you complete tasks, update the corresponding checkbox from `- [ ]` to `- [x]` BEFORE moving to the next task. If a task spawns new sub-tasks not anticipated here, add them under the current milestone with `- [ ]`. At the end of each work session, verify this file reflects the actual state of the project.

---

## Status Atual

**Projeto iniciado:** [date]
**Última atualização:** [date]
**Milestone atual:** M[N] — [name]
**Próxima tarefa:** [copy from next unchecked item]

---

## M0 — Project Setup

- [ ] Criar repositório Git no GitHub
- [ ] Inicializar projeto Next.js 15 com TypeScript e Tailwind (`npx create-next-app@latest`)
- [ ] Configurar ESLint + Prettier com config premium (sem semi, single quotes, 100 char line)
- [ ] Instalar dependências: `react-hook-form`, `zod`, `@hookform/resolvers`, `googleapis`, `framer-motion`
- [ ] Criar `.env.example` com todas as variáveis de ambiente necessárias
- [ ] Criar `.env.local` com valores reais (não commitar)
- [ ] Configurar `next.config.ts` (imagens, fontes, headers de segurança)
- [ ] Criar estrutura de pastas: `src/components`, `src/sections`, `src/lib`, `src/styles`, `public/assets`
- [ ] Commit inicial: "chore: initial project setup"

## M1 — Design Tokens e Estrutura Estática

- [ ] Criar `src/styles/tokens.css` com todas as CSS variables da design family escolhida
- [ ] Configurar `tailwind.config.ts` com cores, fonts e spacing customizados (mapeando os tokens)
- [ ] Configurar fontes via `next/font` no `app/layout.tsx`
- [ ] Criar `src/app/layout.tsx` com metadata básica, fontes, e wrapper global
- [ ] Criar `src/app/page.tsx` renderizando as seções (placeholder content)
- [ ] Criar skeleton de cada componente em `src/sections/` (UrgencyBar, Hero, Learnings, TargetAudience, ExpertBio, WhyFree, FinalCTA, Footer)
- [ ] Validar que o layout estrutural aparece em desktop e mobile (sem design ainda)

## M2 — Copy e Conteúdo Final

- [ ] Colar copy final da barra de urgência em `UrgencyBar.tsx`
- [ ] Colar copy final do Hero (badge, headline, subheadline, corpo) em `Hero.tsx`
- [ ] Colar copy final do Form (headline, disclaimer, microcopy do botão) em `CaptureForm.tsx`
- [ ] Colar copy final de "O que você vai aprender" em `Learnings.tsx`
- [ ] Colar copy final de "Essa aula é para você se..." em `TargetAudience.tsx`
- [ ] Colar copy final da bio do Jonathan em `ExpertBio.tsx`
- [ ] Colar copy final de "Por que é gratuito" em `WhyFree.tsx`
- [ ] Colar copy final do CTA final em `FinalCTA.tsx`
- [ ] Preencher metadata no `layout.tsx` (title, description, OG tags)
- [ ] Revisar: toda copy está idêntica ao documento aprovado (sem paráfrases acidentais)

## M3 — Visual Polish (Design Family)

- [ ] Aplicar tipografia correta (display + body) em todos os componentes
- [ ] Aplicar paleta de cores nos backgrounds, superfícies, textos e bordas
- [ ] Aplicar hierarquia visual no Hero (H1 grande, subheadline média, corpo menor)
- [ ] Estilizar UrgencyBar com tratamento premium (não banner genérico)
- [ ] Estilizar cada card/bloco de seção conforme component-patterns da design family
- [ ] Aplicar spacing scale consistente (sem padding/margin arbitrários)
- [ ] Adicionar divisores/hairlines entre seções conforme a família escolhida
- [ ] Rodar self-audit checklist da `premium-ui-design` skill
- [ ] Ajustar tudo que falhou no audit

## M4 — Assets e Imagens

- [ ] Receber foto tratada do Jonathan (remover background, color grade) — ver ASSETS.md
- [ ] Gerar background do hero (Midjourney/Flux conforme ASSETS.md) — ou receber externamente
- [ ] Integrar foto + background no Hero (Next/Image com priority)
- [ ] Gerar/adicionar OG image 1200x630 em `public/og-image.png`
- [ ] Adicionar favicon + apple-touch-icon em `public/`
- [ ] Instalar e usar ícones da biblioteca escolhida (lucide-react ou custom SVG) nas seções que precisam
- [ ] Otimizar todas as imagens (WebP/AVIF, next/image)

## M5 — Lógica do Formulário

- [ ] Criar schema Zod para validação em `src/lib/schemas/captureForm.ts`
- [ ] Implementar CaptureForm com react-hook-form + zod resolver
- [ ] Adicionar validação de campos (name, email, whatsapp)
- [ ] Implementar máscara de telefone no campo WhatsApp
- [ ] Criar Server Action em `src/app/actions/submitCapture.ts`
- [ ] Configurar service account do Google e obter JSON de credenciais
- [ ] Criar planilha do Google Sheets e compartilhar com o service account
- [ ] Implementar integração com Google Sheets API (append row) na Server Action
- [ ] Adicionar tratamento de erro (timeout, retry, fallback)
- [ ] Testar submit end-to-end: form → Server Action → planilha recebe linha
- [ ] Implementar estados visuais do botão (idle, loading, success, error)

## M6 — Pós-Submit e Thank You

- [ ] Criar estado de sucesso inline (substitui form após submit)
- [ ] Criar página `/obrigado` com confirmação, detalhes do webinário e link do WhatsApp
- [ ] Implementar redirect para `/obrigado` após submit bem-sucedido
- [ ] Garantir que `/obrigado` dispara evento de conversão no GA4 e Meta Pixel
- [ ] Incluir link "Adicionar ao Google Calendar" com ICS gerado ou URL direta
- [ ] Testar fluxo completo: submit → redirect → página de obrigado correta

## M7 — Responsividade e Acessibilidade

- [ ] Testar em mobile (375px, 414px) — ajustar onde quebrar
- [ ] Testar em tablet (768px, 1024px)
- [ ] Testar em desktop (1280px, 1920px)
- [ ] Garantir que form está acessível acima da dobra no mobile (ou CTA scroll)
- [ ] Adicionar `aria-label`, `aria-live` e `role` onde necessário
- [ ] Testar navegação por teclado (Tab completo pela página)
- [ ] Testar com leitor de tela (VoiceOver ou NVDA) por 5 minutos
- [ ] Validar contraste de texto em todas as combinações (WebAIM Contrast Checker)
- [ ] Respeitar `prefers-reduced-motion` nas animações

## M8 — Analytics e Tracking

- [ ] Configurar GA4 property e obter measurement ID
- [ ] Implementar `GoogleAnalytics` component no layout
- [ ] Configurar Meta Pixel e obter pixel ID
- [ ] Implementar eventos customizados: page_view, form_view, form_start, form_submit, form_success, form_error, cta_click
- [ ] Adicionar rastreamento de scroll depth (50%, 90%)
- [ ] Testar no GA4 DebugView que todos eventos disparam
- [ ] Testar no Meta Pixel Helper que eventos chegam no Facebook

## M9 — QA e Pre-launch

- [ ] Rodar Lighthouse em mobile (target ≥90 em Performance)
- [ ] Rodar Lighthouse em desktop (target ≥95 em Performance)
- [ ] Testar form em Chrome, Safari, Firefox (desktop)
- [ ] Testar form em iOS Safari e Chrome Android
- [ ] Testar form com dados inválidos (email malformado, WhatsApp curto) — deve mostrar erros claros
- [ ] Verificar que não há erros no console em nenhum navegador
- [ ] Verificar que todas as imagens carregam e têm alt text
- [ ] Revisar ortografia e pontuação da copy final
- [ ] Validar metadata OG em opengraph.xyz
- [ ] Validar schema.org no Google Rich Results Test

## M10 — Deploy e Smoke Test

- [ ] Conectar repo na Vercel
- [ ] Configurar todas as env vars em Vercel (production)
- [ ] Fazer primeiro deploy na Vercel
- [ ] Verificar domínio customizado (se aplicável) e certificado SSL
- [ ] Fazer submit de teste em produção — lead chega na planilha
- [ ] Verificar no GA4 e Meta Pixel que eventos estão chegando em produção
- [ ] Configurar monitoramento básico (Vercel Analytics ou uptime robot)
- [ ] Marcar release no Git (tag `v1.0.0`)
- [ ] Comunicar ao Jonathan que a página está pronta com o link

---

## Tarefas Pós-Launch (backlog)

_Itens que podem ser trabalhados após o go-live sem bloquear a entrega:_

- [ ] A/B test headline alternativo
- [ ] A/B test cor do botão CTA
- [ ] Implementar chat de suporte (se relevante)
- [ ] Gravar vídeo curto do Jonathan para embed no hero (alternativa à foto estática)
- [ ] Criar landing page de followup pós-webinário
- [ ] Configurar sequência de email de lembrete (T-24h, T-1h, T-5min)

---

## Notas e Decisões

_Registrar aqui decisões importantes tomadas durante a produção que não estavam no PRD._

- [Date] — [Decision]
- [Date] — [Decision]
