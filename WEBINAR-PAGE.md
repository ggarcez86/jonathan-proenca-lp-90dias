# WEBINAR-PAGE.md — Página de Entrega do Webinário

## Visão geral

Esta é a página onde o webinário **simulive** acontece. Mesma URL da LP (`/`), com estado controlado por data/hora. O lead acessa via link enviado por e-mail/WhatsApp. Qualquer pessoa com o link acessa (sem autenticação).

**URL:** Mesma da LP, com parâmetro → `/?aula=1` ou rota separada `/aula`

> **Recomendação técnica:** Usar rota `/aula` em vez de parâmetro na query string. Razões: mais limpa pra compartilhar, permite metadata SEO próprio (title diferente da LP), e evita conflito com UTMs do tráfego pago que já usam `?utm_source=...`

**Vídeo:** Gravado, liberado em horário específico (simulive). Player com controle de tempo pro CTA de venda.

**CTA de venda:** Botão aparece no minuto [X] do vídeo (definir com Jonathan — tipicamente nos últimos 15 minutos) e permanece visível até o fim e além.

---

## Os 3 estados da página

A página tem **3 estados temporais**. A troca entre estados é automática, baseada na data/hora configurada via env var.

```
ESTADO 1: PRÉ-EVENTO (antes da hora marcada)
    ↓ [hora do evento chega]
ESTADO 2: AO VIVO (vídeo liberado, CTA aparece no minuto X)
    ↓ [evento termina OU vídeo acaba]
ESTADO 3: PÓS-EVENTO (replay OU página de encerramento)
```

### Lógica de troca de estado

```typescript
// src/lib/webinar-state.ts
type WebinarState = 'pre' | 'live' | 'post';

function getWebinarState(): WebinarState {
  const now = new Date();
  const start = new Date(process.env.NEXT_PUBLIC_WEBINAR_START!);  // ex: 2026-11-18T22:00:00Z (19h BRT)
  const end = new Date(process.env.NEXT_PUBLIC_WEBINAR_END!);      // ex: 2026-11-18T23:30:00Z (20:30 BRT)

  if (now < start) return 'pre';
  if (now >= start && now <= end) return 'live';
  return 'post';
}
```

**Env vars necessárias (adicionar ao `.env.local` e PRD):**
```bash
NEXT_PUBLIC_WEBINAR_START="2026-11-18T22:00:00Z"    # 19h BRT = 22h UTC
NEXT_PUBLIC_WEBINAR_END="2026-11-18T23:30:00Z"      # 20:30 BRT = 23:30 UTC
NEXT_PUBLIC_CTA_APPEAR_SECONDS=4500                   # 75 min = 4500 seg (ajustar com Jonathan)
NEXT_PUBLIC_SALES_URL="https://..."                   # URL da página de vendas da mentoria
```

---

## ESTADO 1 — PRÉ-EVENTO (sala de espera)

> O lead chegou antes da hora. Precisa se sentir no lugar certo e animado pra ficar.

### Layout

```
┌─────────────────────────────────────────────┐
│ Nav minimalista (logo Jonathan à esquerda)   │
├─────────────────────────────────────────────┤
│                                             │
│   [Badge: "Ao vivo em breve"]               │
│                                             │
│   HEADLINE                                  │
│   Subheadline                               │
│                                             │
│   ┌───────────────────────────────────────┐ │
│   │                                       │ │
│   │   PLACEHOLDER DE VÍDEO               │ │
│   │   (thumbnail + countdown)             │ │
│   │                                       │ │
│   └───────────────────────────────────────┘ │
│                                             │
│   "O que você vai descobrir" (3 bullets)    │
│                                             │
│   "Prepare-se" (instrução curta)            │
│                                             │
│   Foto + mini bio do Jonathan               │
│                                             │
└─────────────────────────────────────────────┘
```

### Copy

**Badge:**
```
Começa em breve · Fique nesta página
```

**Headline:**
```
O método que nenhum diretor vai te ensinar para ser promovido em 90 dias
```

_(Mesma headline da LP — reforça a mensagem pra quem chegou por link direto sem ter passado pela LP.)_

**Subheadline:**
```
A aula começa às [hora] (horário de Brasília). Fique nesta página — o vídeo será liberado automaticamente.
```

**Placeholder de vídeo:**

Área escura (Surface 1) com aspect ratio 16:9, contendo:

```
[Ícone de play centralizado, grande, em accent color]

A aula começa em:
[COUNTDOWN — HH:MM:SS]
```

O countdown conta regressivamente até `WEBINAR_START`. Quando chega a zero, a página troca automaticamente pro Estado 2 (sem reload — React state update ou polling a cada 10s).

**Seção "O que você vai descobrir" (resumo curto — 3 itens, não 5):**

```
Enquanto espera, veja o que te aguarda:
```

```
01. Por que quem entrega menos é promovido antes — e o que fazer a respeito
```

```
02. A conversa que você nunca teve com seu gestor — e que muda tudo
```

```
03. Como usar IA para criar visibilidade e acelerar sua próxima promoção
```

_(Versão condensada dos 5 itens da LP. Só 3 pra manter a página leve — quem está aqui já se inscreveu, não precisa ser re-vendido.)_

**Seção "Prepare-se":**

```
Dica: pegue papel e caneta. Essa aula tem exercícios práticos — quem anota sai 10x na frente.
```

<!-- OPCIONAL: Adicionar "Se possível, assista num ambiente tranquilo com fone de ouvido." — reforça o compromisso de atenção. -->

**Mini bio do Jonathan (versão curta):**

```
Jonathan Proença · Líder de IA em multinacional no Texas. Ex-técnico de fábrica com mais de 11 promoções e transferências internacionais para 4 países. Ainda na ativa.
```

_(Uma linha. Quem já se inscreveu conhece a história — aqui é só lembrete de autoridade.)_

---

## ESTADO 2 — AO VIVO (vídeo liberado + CTA timed)

> O evento está acontecendo. Foco total no vídeo. Página limpa, sem distrações.

### Layout

```
┌─────────────────────────────────────────────┐
│ Nav minimalista                              │
├─────────────────────────────────────────────┤
│                                             │
│   [Badge: "🔴 Ao vivo agora"]              │
│                                             │
│   ┌───────────────────────────────────────┐ │
│   │                                       │ │
│   │           PLAYER DE VÍDEO             │ │
│   │         (embed, 16:9, grande)         │ │
│   │                                       │ │
│   └───────────────────────────────────────┘ │
│                                             │
│   [Linha de contexto abaixo do player]      │
│                                             │
│   ┌───────────────────────────────────────┐ │
│   │  CTA DE VENDA (aparece no minuto X)   │ │  ← hidden até NEXT_PUBLIC_CTA_APPEAR_SECONDS
│   └───────────────────────────────────────┘ │
│                                             │
└─────────────────────────────────────────────┘
```

### Copy

**Badge:**
```
🔴 Ao vivo agora
```

_(Mesmo sendo simulive, a experiência do lead é de "ao vivo". Sem mentir — o badge sinaliza que está acontecendo agora, não que é uma transmissão live tecnicamente.)_

<!-- OPCIONAL: Se preferir não usar "ao vivo" por questão ética/CONAR, alternativa: "🔴 Acontecendo agora" — mesmo efeito psicológico, tecnicamente preciso. -->

**Player de vídeo:**

Embed do player (Bunny Stream, Mux, Vimeo, ou YouTube unlisted). Aspect ratio 16:9. Player width = 100% do container, max-width ~1100px.

```tsx
<div className="relative w-full max-w-[1100px] mx-auto aspect-video bg-surface-1 rounded-lg overflow-hidden">
  {/* Player embed aqui */}
  <iframe
    src="[URL do player]"
    allow="autoplay; fullscreen"
    className="absolute inset-0 w-full h-full"
  />
</div>
```

**Linha de contexto abaixo do player:**

```
Como Ser Promovido em 90 Dias · com Jonathan Proença
```

_(Só identificação. Quem caiu nessa URL por compartilhamento precisa saber do que se trata.)_

**CTA de venda (aparece no minuto X):**

O CTA é **invisível** até `NEXT_PUBLIC_CTA_APPEAR_SECONDS` do vídeo terem passado. Quando aparece, faz uma entrada suave (slide-up + fade) e fica visível permanentemente.

```
┌──────────────────────────────────────────────────────┐
│                                                      │
│   Inscrições abertas para a Mentoria                 │
│   Método Próxima Cadeira                             │
│                                                      │
│   Condição especial para quem está ao vivo.          │
│   Válida apenas durante esta sessão.                 │
│                                                      │
│   [ Quero conhecer a mentoria → ]                    │
│                                                      │
│   Vagas limitadas · Turma de [mês/ano]               │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**Breakdown do CTA:**

**Label (pequeno, acima):**
```
Inscrições abertas para a Mentoria
```

**Headline do CTA:**
```
Método Próxima Cadeira
```

_(Presumindo que o nome da mentoria seja "Método Próxima Cadeira" — ajustar conforme o nome real que o Jonathan usar. Se ainda não tem nome, usar "Mentoria com Jonathan Proença".)_

**Corpo do CTA:**
```
Condição especial para quem está ao vivo.
Válida apenas durante esta sessão.
```

**Botão:**
```
Quero conhecer a mentoria →
```

_(O botão leva à `NEXT_PUBLIC_SALES_URL` — uma página de vendas separada ou checkout. Não misturar venda no player.)_

**Microcopy abaixo do botão:**
```
Vagas limitadas · Turma de [mês/ano]
```

### Lógica técnica do CTA timed

```tsx
// src/components/TimedSalesCTA.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CTA_APPEAR_SECONDS = Number(process.env.NEXT_PUBLIC_CTA_APPEAR_SECONDS || 4500);

export function TimedSalesCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Approach 1: timer simples baseado no tempo desde que o vídeo começou
    const timer = setTimeout(() => {
      setVisible(true);
    }, CTA_APPEAR_SECONDS * 1000);

    return () => clearTimeout(timer);
  }, []);

  // Approach 2 (mais preciso): escutar eventos do player
  // Se usar Bunny/Mux/Vimeo player API, escutar currentTime do player
  // e mostrar quando currentTime >= CTA_APPEAR_SECONDS

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 bg-surface-1 border border-accent-border rounded-lg p-8 text-center max-w-2xl mx-auto"
        >
          {/* CTA content */}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

**Nota importante:** o timer simples (Approach 1) assume que o lead começou a assistir quando a página carregou. Se o vídeo tiver autoplay, funciona. Se o lead pode dar play manualmente, Approach 2 (escutar o player) é mais preciso. Recomendar Approach 2 se o player suportar.

---

## ESTADO 3 — PÓS-EVENTO

> O webinário terminou. Dois cenários possíveis.

### Cenário A — Replay disponível (recomendado)

Se o Jonathan quer que as pessoas assistam o replay (aumenta conversão — muita gente perde o ao vivo):

**Badge:**
```
Replay disponível por tempo limitado
```

**Headline:**
```
Você perdeu a aula ao vivo? Assista o replay agora.
```

<!-- OPCIONAL: Se o lead ASSISTIU ao vivo e volta depois, a headline "Você perdeu" fica estranha. Alternativa que funciona para ambos: "Assista (ou reassista) a aula completa" — menos dramática, cobre os dois casos. -->

**Subheadline:**
```
O replay fica disponível até [data — ex: 72h após o evento]. Depois será removido.
```

**Player:** Mesmo embed, mesmo CTA timed funcionando.

**CTA de venda:** Agora visível o tempo todo (não mais timed, já que quem está no replay provavelmente sabe do pitch).

```
Inscrições abertas para a Mentoria
Método Próxima Cadeira

Condição especial válida até [data limite].

[ Quero conhecer a mentoria → ]

Vagas limitadas · Turma de [mês/ano]
```

**Seção extra abaixo do replay (só no Estado 3):**

**Heading:**
```
O que você viu nessa aula
```

**Itens (resumo pós-aula — reforça valor e recontextualiza o CTA):**

```
01. Por que entregar resultado não é suficiente — e o que realmente faz alguém ser promovido
```

```
02. O mapa de percepção: como seu gestor realmente decide quem sobe
```

```
03. A conversa de carreira que muda o jogo em 90 dias
```

```
04. Como usar IA como aliada silenciosa na sua estratégia de promoção
```

```
05. O caminho para continuar: Mentoria Método Próxima Cadeira
```

_(O item 05 menciona a mentoria naturalmente, como parte do conteúdo. Não é um bullet de vendas — é um resumo do que foi dito na aula.)_

### Cenário B — Evento encerrado, sem replay

Se o Jonathan preferir não liberar replay (mais urgência, mais "você perdeu"):

**Badge:**
```
Evento encerrado
```

**Headline:**
```
Essa sessão já aconteceu.
```

**Subheadline:**
```
A aula ao vivo foi em [data]. Se você participou e quer dar o próximo passo, o link está abaixo.
```

**CTA de venda (sempre visível):**

Mesmo bloco do Estado 2, porém com copy ajustada:

```
Participou da aula?

Se você assistiu e quer aplicar o método com acompanhamento, as inscrições para a mentoria estão abertas.

[ Conhecer a mentoria → ]

Inscrições até [data limite] · Vagas limitadas
```

**Para quem não assistiu:**
```
Se você não conseguiu assistir, entre na lista de espera para a próxima turma:

[ Quero ser avisado da próxima aula → ]
```

_(Esse segundo CTA leva de volta pro form da LP — recaptura o lead que voltou mas perdeu o evento.)_

---

## COMPONENTES COMPARTILHADOS (todos os estados)

### Navbar

Minimalista. Consistente com a LP.

```
Jonathan Proença                              [nenhum link à direita]
```

_(Sem links de navegação. Sem menu. Foco total no vídeo. Se estiver no Estado 1, não oferecer link pra LP — evitar que o lead saia.)_

### Footer

```
© 2026 Jonathan Proença · Todos os direitos reservados
```

_(Versão ultramínima. Sem links de política de privacidade necessários aqui — já foram aceitos na LP de captura.)_

### Background

Mesmo Dark AI-forward da LP. Background `--bg`, sem gradient mesh pesado (foco no player, não na decoração).

---

## ESQUEMA DE COMPONENTES (REACT)

```
<WebinarPage>
  ├── <WebinarNav />                          → logo Jonathan, minimalista
  │
  ├── if state === 'pre':
  │   └── <PreEvent>
  │       ├── <Badge text="Começa em breve" />
  │       ├── <Headline />
  │       ├── <Subheadline />
  │       ├── <VideoPlaceholder>
  │       │   └── <Countdown targetDate={WEBINAR_START} />
  │       ├── <QuickLearnings />              → 3 itens condensados
  │       ├── <PrepTip />                     → "Pegue papel e caneta"
  │       └── <MiniBio />
  │
  ├── if state === 'live':
  │   └── <LiveEvent>
  │       ├── <Badge text="🔴 Ao vivo agora" />
  │       ├── <VideoPlayer embedUrl={...} />
  │       ├── <ContextLine />                → nome do evento + Jonathan
  │       └── <TimedSalesCTA
  │             appearAfterSeconds={CTA_APPEAR_SECONDS}
  │             salesUrl={SALES_URL}
  │           />
  │
  ├── if state === 'post':
  │   └── <PostEvent>
  │       ├── <Badge text="Replay disponível" />
  │       ├── <Headline />
  │       ├── <Subheadline />
  │       ├── <VideoPlayer embedUrl={...} />  → replay
  │       ├── <SalesCTA alwaysVisible={true} />
  │       └── <RecapLearnings />              → 5 itens resumo pós-aula
  │
  └── <WebinarFooter />
```

---

## ANALYTICS — EVENTOS ADICIONAIS

| Evento | Gatilho | Estado |
|---|---|---|
| `webinar_page_view` | Load | Todos |
| `webinar_countdown_view` | Lead vê countdown | Pre |
| `webinar_video_start` | Play do vídeo (autoplay ou manual) | Live |
| `webinar_video_25` | 25% do vídeo assistido | Live |
| `webinar_video_50` | 50% do vídeo | Live |
| `webinar_video_75` | 75% do vídeo | Live |
| `webinar_video_complete` | 100% do vídeo | Live |
| `webinar_cta_appear` | CTA de venda aparece na tela | Live |
| `webinar_cta_click` | Lead clica no botão de vendas | Live / Post |
| `webinar_replay_start` | Play do replay | Post |

---

## METADATA SEO (rota /aula)

**Title:**
```
Aula ao Vivo · Como Ser Promovido em 90 Dias · Jonathan Proença
```

**Description:**
```
Assista à aula gratuita com Jonathan Proença sobre o método de promoção em 90 dias. Ao vivo, com vagas limitadas.
```

**Robots:** `noindex, nofollow`
_(Página privada de entrega. Não quer que Google indexe — evita que alguém encontre sem ter se inscrito.)_

---

## SPECS TÉCNICOS DO PLAYER

### Hospedagem de vídeo recomendada

**Opção 1 — Bunny Stream (recomendado)**
- CDN global, player customizável, JS API pra eventos
- ~$1/mês pro volume desse projeto
- Player API permite escutar `currentTime` pro CTA timed (Approach 2)

**Opção 2 — YouTube unlisted**
- Grátis, mas sem controle visual do player
- Branding do YouTube aparece (menos premium)
- API do iframe permite escutar eventos básicos

**Opção 3 — Vimeo Pro**
- Player premium customizável, sem branding
- ~$20/mês
- Boa API de eventos

**Opção 4 — Mux**
- Player headless — controle total
- Pricing pay-per-view (~$0.01 por minuto assistido)
- Melhor opção técnica, mas requer mais setup

### Autoplay

- **Estado 2 (live):** Autoplay **muted** + botão grande de unmute. Autoplay com som é bloqueado pelos navegadores.
- **Estado 3 (replay):** NÃO autoplay — lead decide quando dar play.

---

## PRÓXIMOS PASSOS (o que fazer com este documento)

1. **Jonathan define:** nome da mentoria, URL de vendas, minuto do pitch no vídeo, data de deadline do CTA
2. **Gustavo adiciona ao PLAN.md** como um novo milestone (M11 ou similar)
3. **Webinar-page vira parte do mesmo projeto** Next.js — é uma rota `/aula` dentro do mesmo repo
4. **Player embed** definido quando Jonathan gravar o vídeo e hospedar

---

## DECISÕES PENDENTES (bloqueadores)

- [ ] Nome da mentoria (aparece no CTA de venda) — "Método Próxima Cadeira" é placeholder
- [ ] URL da página de vendas da mentoria (destino do botão do CTA)
- [ ] Minuto exato do vídeo em que o CTA deve aparecer
- [ ] Se replay será liberado ou não (Cenário A vs B)
- [ ] Se replay, por quanto tempo fica disponível (24h, 48h, 72h, 7 dias)
- [ ] Plataforma de hospedagem do vídeo (Bunny, YouTube, Vimeo, Mux)
- [ ] Se o "ao vivo" será sinalizado como "🔴 Ao vivo agora" ou "🔴 Acontecendo agora" (questão ética do simulive)
