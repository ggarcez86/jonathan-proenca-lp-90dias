# ASSETS.md — Landing Page "Como Ser Promovido em 90 Dias"

Lista completa de assets externos necessários para esta página. Cada asset inclui specs, prompts prontos (onde aplicável) e critérios de "pronto".

---

## 1. Foto do Jonathan (Hero)

**Status:** Você vai fornecer a foto — tratar e integrar
**Arquivo final:** `public/assets/jonathan-hero.webp`

### Especificações técnicas
- **Dimensões finais:** 1200x1600px (portrait 3:4)
- **Formato:** WebP (fallback PNG para Safari antigo — Next/Image resolve automaticamente)
- **Tamanho máximo:** 200KB após compressão
- **Background:** Removido (transparente) — será sobreposto ao background gerado via CSS/composição

### Workflow de tratamento (execute fora do código)

**Etapa 1 — Remover background**

**Ferramenta rápida:** remove.bg (gratuito até 50/mês, resultado muito bom em 90% dos casos)
- Upload da foto
- Baixar PNG transparente
- Se bordas ficarem ruins (cabelo especialmente), passar no passo 2

**Ferramenta com controle fino:** Photoshop ou Photopea (gratuito, web)
- Abrir foto
- Select → Subject (seleção automática via IA)
- Refinar bordas com Select and Mask (smart radius 3-5px, decontaminate colors ligado)
- Delete background, manter só sujeito
- Export as PNG transparente

**Etapa 2 — Color grade para Dark AI-forward**

Objetivo: a foto precisa "conversar" com a paleta (warm black + gold accent). Foto clara demais ou com temperatura de cor errada fica destacada demais.

No Photoshop/Photopea ou Lightroom:
- **Curves:** leve S-curve para aumentar contraste, puxar sombras para `#0A0A0B` (warm black)
- **Color Balance (Shadows):** +3 Cyan, -3 Yellow (sombras um pouco mais frias)
- **Color Balance (Highlights):** +5 Yellow, +3 Red (highlights levemente dourados — puxa para o accent)
- **Vibrance:** -10 (dessaturação leve para premium)
- **Sharpen:** Unsharp Mask, Amount 30, Radius 1px (só no sujeito, não no fundo já removido)

### Etapa 3 — Export final
- **Save for Web** (Photoshop) ou equivalente
- Dimensões: 1200x1600px (suficiente para Retina em 600x800 display)
- Formato: PNG transparente primeiro (para composição com background)
- Depois converter para WebP via comando: `cwebp -q 82 jonathan-hero.png -o jonathan-hero.webp`
- Validar: arquivo final < 200KB

### Done when...
- [ ] Background 100% removido, bordas limpas (sem halos, sem restos)
- [ ] Color grade aplicado — foto combina com a paleta Dark AI-forward
- [ ] Arquivo em `public/assets/jonathan-hero.webp` com < 200KB
- [ ] Alt text definido: "Jonathan Proença, idealizador do método de promoção em 90 dias"

---

## 2. Background do Hero

**Status:** A definir abordagem
**Recomendação:** Começar com **Opção A** (CSS puro) e upgradar para **Opção B** (imagem gerada) se o visual ficar pobre.

---

### Opção A — CSS Gradient Mesh (recomendado para start)

**Vantagens:** Zero arquivo, carregamento instantâneo, responsivo por padrão, fácil ajustar.

**Implementação:**

```css
/* src/sections/Hero.module.css ou inline com Tailwind */
.heroBackground {
  background:
    radial-gradient(ellipse 80% 60% at 75% 25%,
      rgba(201, 169, 97, 0.18) 0%,
      rgba(201, 169, 97, 0.05) 40%,
      transparent 70%),
    radial-gradient(ellipse 60% 80% at 15% 85%,
      rgba(201, 169, 97, 0.08) 0%,
      transparent 60%),
    linear-gradient(180deg, #0A0A0B 0%, #0D0D10 100%);
  position: relative;
  overflow: hidden;
}

.heroBackground::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('/assets/noise.png');
  background-repeat: repeat;
  opacity: 0.03;
  pointer-events: none;
  mix-blend-mode: overlay;
}
```

**Noise texture:** Gerar uma vez e reusar. Tamanho 200x200, repetido. Opções:

1. **Gerar via SVG inline** (mais leve):
```tsx
// Criar NoiseBackground component
<svg className="absolute inset-0 w-full h-full opacity-[0.03] mix-blend-overlay" xmlns="http://www.w3.org/2000/svg">
  <filter id="noiseFilter">
    <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch"/>
  </filter>
  <rect width="100%" height="100%" filter="url(#noiseFilter)"/>
</svg>
```

2. **PNG 200x200:** gerar uma vez em `https://www.noisetexturegenerator.com/` ou similar, salvar em `public/assets/noise.png` (~5KB).

---

### Opção B — Imagem abstrata gerada

**Quando upgradar para esta opção:** Se após implementar A, o hero parecer "chato" ou precisar de mais atmosfera. Geralmente começar com A e decidir.

**Prompt Midjourney (principal):**
```
abstract premium dark background, deep warm black tones (#0A0A0B), subtle golden radial glow from upper right corner, cinematic atmosphere, organic gradient mesh, very subtle grain texture, executive sophisticated aesthetic, no text, no subjects, no geometric shapes --ar 16:9 --style raw --v 6
```

**Prompt Midjourney (variação — mais atmosfera):**
```
dark moody abstract background for executive premium website, warm black base with soft golden light leaks, cinematic, editorial, film grain, atmospheric depth, no text, no people, no objects --ar 16:9 --style raw --v 6
```

**Prompt Flux.1 Pro:**
```
A premium abstract landscape background. Deep warm black (#0A0A0B) base with a soft, diffused golden radial glow emerging subtly from the upper-right corner. Organic gradient mesh with atmospheric depth. Fine grain texture overlay. Cinematic and moody. Executive, sophisticated aesthetic. No text, no figures, no geometric patterns or shapes. Wide landscape 16:9.
```

**Pós-geração:**
- Escolher melhor de 3–5 variações
- Redimensionar para 1920x1080 ou 2560x1440 (retina)
- Color grade se necessário (matchar com `--bg: #0A0A0B`)
- Export WebP qualidade 80 → arquivo final < 150KB
- Salvar como `public/assets/hero-bg.webp`

**Done when (Opção B)...**
- [ ] Imagem gerada e escolhida
- [ ] Redimensionada e otimizada em WebP
- [ ] Arquivo < 150KB
- [ ] Transições suaves com o resto da página (sem cortes abruptos entre hero-bg e próxima seção)

---

## 3. Composição Final do Hero

**Status:** A implementar após assets 1 e 2 prontos

### Estratégia de composição (CSS/React, não PSD)

Manter foto e background como camadas separadas no código. Vantagens: mais leve, responsivo, fácil de ajustar.

**Layout desktop (≥1024px):**

```tsx
// src/sections/Hero.tsx
<section className="relative overflow-hidden hero-background min-h-[700px]">
  {/* Noise overlay via SVG inline */}
  <NoiseOverlay />

  <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16
                  grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16">

    {/* Esquerda: Badge + Headline + Subheadline + Corpo */}
    <div className="space-y-6">
      <Badge />
      <Headline />
      <Subheadline />
      <HeroBody />
    </div>

    {/* Direita: Foto + Form sobreposto */}
    <div className="relative">
      <div className="relative aspect-[3/4] w-full max-w-[480px] mx-auto lg:mx-0">
        <Image
          src="/assets/jonathan-hero.webp"
          alt="Jonathan Proença, idealizador do método..."
          fill
          priority
          className="object-cover object-top"
          sizes="(max-width: 1024px) 100vw, 40vw"
        />
        {/* Subtle gradient overlay na foto para garantir legibilidade do form */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />
      </div>

      {/* Form sobreposto à foto, parte inferior */}
      <div className="relative lg:absolute lg:-bottom-4 lg:-left-8 lg:w-[110%]
                      mt-8 lg:mt-0 z-20">
        <CaptureForm variant="hero" />
      </div>
    </div>
  </div>
</section>
```

**Layout mobile (<1024px):**
- Texto primeiro (badge, headline, subheadline, corpo)
- Foto abaixo (menor, max 320px width)
- Form abaixo da foto (full width, não sobreposto)

### Variações a testar visualmente

1. **Foto à direita + form sobreposto** (default acima) — mais "premium funil"
2. **Foto como background full-bleed** + form centralizado → mais dramático, mais difícil de executar bem
3. **Foto pequena em círculo/oval** ao lado do formulário → mais "about me", menos hero dramático

Default: opção 1. Ajustar se não ficar bom.

### Done when...
- [ ] Foto integrada sem parecer "colada" no background
- [ ] Form legível e acessível sobre a composição (contraste adequado)
- [ ] Hierarquia visual: olho vai no headline → subheadline → foto → form
- [ ] Responsivo: layout adapta gracefully entre breakpoints
- [ ] Mobile: form visível acima da dobra OU CTA fixo leva ao form

---

## 4. OG Image (Social Sharing)

**Status:** A gerar (recomendado: usar Next.js ImageResponse)
**Arquivo final:** gerado dinamicamente em `src/app/opengraph-image.tsx`

### Por que Next.js ImageResponse (e não Figma)

- Gera 1200x630 PNG on-demand no deploy
- Versionado junto com o código
- Se mudar o título ou autor, atualiza sem re-exportar
- Mesma tipografia e paleta da página (consistência)

### Implementação

```tsx
// src/app/opengraph-image.tsx
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Como Ser Promovido em 90 Dias · Webinário Gratuito';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #0A0A0B 0%, #141417 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          position: 'relative',
        }}
      >
        {/* Subtle golden glow */}
        <div
          style={{
            position: 'absolute',
            top: '-200px',
            right: '-200px',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(201,169,97,0.25), transparent 70%)',
          }}
        />

        {/* Small label */}
        <div style={{ color: '#C9A961', fontSize: 24, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 24 }}>
          Webinário Gratuito
        </div>

        {/* Headline */}
        <div style={{ color: '#F4F4F5', fontSize: 96, fontFamily: 'serif', lineHeight: 1.05, fontWeight: 400, marginBottom: 32 }}>
          Como Ser Promovido<br />em 90 Dias
        </div>

        {/* Author */}
        <div style={{ color: '#A1A1AA', fontSize: 28 }}>
          com Jonathan Proença
        </div>
      </div>
    ),
    size
  );
}
```

### Alternativa: gerar no Figma

Se quiser ter controle mais fino:
- Criar frame 1200x630
- Background Dark AI-forward com gold glow
- Headline "Como Ser Promovido em 90 Dias" em serif grande
- "Webinário Gratuito · Jonathan Proença" em body
- (Opcional) foto do Jonathan recortada à direita
- Export como PNG, salvar em `public/og-image.png`
- Referenciar em metadata do `layout.tsx`

### Done when...
- [ ] OG image aparece corretamente no preview do opengraph.xyz
- [ ] Legível em thumbnail (teste visualizar a 300x157px)
- [ ] Compartilhamento no WhatsApp renderiza corretamente
- [ ] Arquivo < 300KB (se estático) ou ImageResponse funcionando

---

## 5. Favicon e Ícones do App

**Status:** A gerar
**Arquivos finais:**
- `src/app/favicon.ico` (Next 15 aceita favicon.ico direto em app/)
- `src/app/icon.png` (32x32)
- `src/app/apple-icon.png` (180x180)

### Design sugerido

Monograma "JP" em warm gold sobre warm black. Simples, legível em 16x16.

**Workflow:**
1. Criar arquivo 512x512 no Figma com "JP" em Instrument Serif, cor `#C9A961` sobre `#0A0A0B`
2. Exportar como PNG 512x512
3. Subir em RealFaviconGenerator.net — ele gera todos os formatos
4. Baixar o pacote
5. Colocar `favicon.ico`, `icon.png`, `apple-icon.png` em `src/app/` (Next 15 gera as meta tags automaticamente)

### Done when...
- [ ] Favicon aparece na aba do navegador (não o default do Next)
- [ ] Apple touch icon funciona ao adicionar à tela inicial em iOS
- [ ] Design legível em 16x16 e 32x32

---

## 6. Ícones na Página

**Status:** Definir uso
**Biblioteca recomendada:** Lucide React (já instalada no stack)

### Onde usar (seletivo, não decorativo)

**Use:**
- Seta `→` no final do botão CTA (já está na copy) — pode ser Unicode direto OU `<ArrowRight />` do Lucide
- Check icon em estados de sucesso do form (`<Check />` minimalista)
- Possivelmente ícone no UrgencyBar (`<AlertCircle />` ou warning triangle — mas o ⚠ da copy já resolve)

**Não use:**
- Ícones Lucide em círculos pastéis acima de features (anti-padrão)
- Ícones decorativos em qualquer seção de conteúdo
- Emojis além dos que já estão na copy

### Recomendação para "O que você vai aprender"

Em vez de ícones, usar **números em Instrument Serif oversized** como marcadores:

```tsx
<div className="grid gap-6">
  {learnings.map((item, i) => (
    <div className="grid grid-cols-[auto_1fr] gap-6 items-start">
      <span className="font-display text-6xl text-accent/70 leading-none">
        0{i + 1}
      </span>
      <p className="text-text-high text-lg leading-relaxed pt-2">
        {item}
      </p>
    </div>
  ))}
</div>
```

Mais editorial, mais premium, zero dependência de biblioteca.

### Done when...
- [ ] Lucide React usado apenas onde agrega significado funcional
- [ ] Nenhum ícone em círculo pastel decorativo
- [ ] Todos ícones decorativos com `aria-hidden="true"`

---

## 7. Vídeo (opcional — backlog pós-launch)

**Status:** Não previsto no launch inicial

### Ideia para depois do go-live

**Vídeo curto do Jonathan na `/obrigado`:**
- 45-60 segundos
- Gravação real (autoridade vem da história dele, não de AI avatar)
- Roteiro base:
  - "Você se inscreveu. Antes do dia [data], faça uma coisa: [ação específica — ex: escreva as 3 últimas entregas profissionais mais relevantes suas]."
  - "Na aula eu vou usar esse material. Quem chegar preparado sai 10x na frente."
  - "Te vejo dia [data] às [hora]. Forte abraço, Jonathan."
- Setup de gravação: background que conversa com a design family (preto profundo com luz dourada lateral), microfone decente, iluminação frontal

**Hospedagem recomendada:**
- **Bunny.net Stream** (CDN rápida, player customizável, ~$1/mês para este volume)
- OU **Mux** (mais caro, mas mais features)
- Evitar YouTube embed (quebra performance e coloca branding estranho)

---

## Resumo dos Assets a Produzir

| # | Asset | Ferramenta | Tempo estimado | Prioridade | Bloqueia |
|---|---|---|---|---|---|
| 1 | Foto do Jonathan tratada | remove.bg + Photoshop/Photopea | 30min | 🔴 Alta | M4 |
| 2 | Background do hero | CSS (instant) OU Midjourney (1h) | 0 / 1h | 🔴 Alta | M4 |
| 3 | Composição Hero | Código (React/Tailwind) | 1h | 🔴 Alta | M4 |
| 4 | OG Image | Next.js ImageResponse | 30min | 🟡 Média | M9 |
| 5 | Favicon | Figma + RealFaviconGenerator | 15min | 🟢 Baixa | M9 |
| 6 | Ícones na página | Lucide + números em serif | — | 🟢 Baixa | M3 |
| 7 | Vídeo Jonathan | Gravação real + edição | Post-launch | — | — |

**Total estimado (pré-launch):** ~2-3 horas de trabalho externo ao código.

---

## Workflow recomendado

1. **Primeiro** (bloqueia tudo): Tratar foto do Jonathan
2. **Em paralelo:** Implementar background CSS (Opção A) e ver se precisa upgradar para B
3. **Depois:** Integrar foto + background no Hero (código)
4. **Antes do deploy:** Implementar OG Image via ImageResponse
5. **Antes do deploy:** Favicon + apple-icon
6. **Pós-launch:** Considerar vídeo como upgrade de qualidade

---

## Para executar agora

Quando me mandar a foto do Jonathan, eu te passo:
- Instruções específicas de tratamento (Photoshop steps ou Photopea steps)
- Color grade matching da foto com a paleta
- Validação do resultado antes da integração

E se optar por gerar background via Midjourney/Flux, eu te mando prompts iterados se os primeiros resultados não forem ideais.
