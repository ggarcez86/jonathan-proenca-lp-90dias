# Stack Decision Guide

Orientação para escolher o stack quando o usuário delegou a decisão.

## Default recomendado: Next.js 15 + Tailwind + TypeScript

**Por quê é o default:**
- SEO: Server Components e SSG por padrão, ótimo para páginas indexáveis
- Form handling: Server Actions escondem a lógica de integração e credenciais do cliente
- Performance: Image optimization automática, font loading otimizado
- Deploy: Vercel grátis e rápido
- Ecossistema: grande biblioteca de exemplos, Claude Code e Antigravity são excelentes com Next.js

**Quando NÃO usar Next.js:**
- Página privada / atrás de login onde SEO não importa
- Projeto micro (uma página simples, sem expectativa de evolução)
- Usuário já tem infra Vite/Astro/outra e quer consistência

## Alternativa 1: Vite + React + Tailwind

**Quando escolher:**
- LP será publicada em subdomínio privado / acesso controlado
- Equipe já é proficiente em Vite
- Sem necessidade de server-side rendering
- Usuário quer setup mais simples

**Trade-offs:**
- Form precisa chamar API externa (não há Server Actions)
- SEO depende de prerendering explícito
- Deploy requer serviço externo para API (Vercel Functions, Cloudflare Workers, etc.)

## Alternativa 2: Astro + Tailwind

**Quando escolher:**
- Página é quase totalmente estática
- Performance é critical (landing de ads com budget alto)
- Zero JS por padrão é uma feature, não um problema

**Trade-offs:**
- Menos exemplos para o agente seguir
- Form ainda precisa de endpoint externo
- Integrações requerem mais trabalho manual

## Alternativa 3: HTML + CSS + JS puro

**Quando escolher:**
- Usuário explicitamente pediu zero dependências
- Projeto terá UM deploy e nunca mais será tocado
- Hospedagem super simples (GitHub Pages, Cloudflare Pages direto)

**Trade-offs:**
- Tudo manual (sem optimizações automáticas)
- Form submit precisa de endpoint externo (geralmente Google Apps Script ou serverless)
- Difícil evoluir

## Fluxograma de decisão rápido

```
Precisa de SEO forte (tráfego pago, orgânico)?
├── Sim → Next.js (default)
└── Não → Vite ou HTML puro

Form precisa de lógica server-side segura (credenciais, service accounts)?
├── Sim → Next.js (Server Actions) ou Vite + função serverless
└── Não → Qualquer stack

Usuário/projeto tem preferência explícita?
└── Usar a preferência — não reinventar

Página vai evoluir nos próximos 6 meses?
├── Sim → Next.js (melhor DX para iteração)
└── Não → Stack mais simples é OK
```

## Dependências recomendadas para capture page em Next.js

```json
{
  "dependencies": {
    "next": "15.x",
    "react": "19.x",
    "react-dom": "19.x",
    "react-hook-form": "^7.x",
    "@hookform/resolvers": "^3.x",
    "zod": "^3.x",
    "googleapis": "^144.x",
    "framer-motion": "^11.x",
    "lucide-react": "^0.3x"
  },
  "devDependencies": {
    "typescript": "^5.x",
    "tailwindcss": "^4.x",
    "@types/node": "^22.x",
    "@types/react": "^19.x",
    "eslint": "^9.x",
    "eslint-config-next": "15.x",
    "prettier": "^3.x",
    "prettier-plugin-tailwindcss": "^0.6.x"
  }
}
```

## Dependências a EVITAR

- **Heavy UI kits** (Material UI, Chakra, Ant Design) — quebram a design family premium
- **Redux / Zustand** para uma landing page — state local é suficiente
- **Moment.js / date-fns** para formatação trivial — Intl API nativa resolve
- **axios** — fetch nativo ou Server Actions são suficientes
- **jQuery** — não há razão em 2026

Princípio: cada dependência adicionada é peso em performance e superfície de manutenção. Adicionar só quando justifica.
