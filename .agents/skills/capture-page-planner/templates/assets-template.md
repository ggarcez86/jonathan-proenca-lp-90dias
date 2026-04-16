# ASSETS.md — [Project Name]

Este documento lista todos os assets externos (imagens, ícones, vídeos) necessários para a página. Cada asset inclui: especificações técnicas, prompts prontos para ferramentas de geração (quando aplicável), e critérios de "pronto".

---

## 1. Foto do Expert (Hero)

**Status:** [Pronta / A tratar / A capturar]
**Arquivo final:** `public/assets/expert-hero.webp`

### Especificações
- **Dimensões:** 1200x1600px (portrait 3:4)
- **Formato:** WebP (fallback PNG)
- **Tamanho máximo:** 200KB
- **Background:** Removido (transparente) OU integrado ao background gerado (ver abaixo)

### Processo de tratamento

**Etapa 1 — Remover background**
- Ferramenta recomendada: remove.bg (rápido) OU Photoshop/Photopea (controle fino)
- Resultado: PNG com transparência, bordas limpas (especialmente cabelo e ombros)

**Etapa 2 — Color grade**
- Objetivo: ajustar temperatura e contraste para combinar com a paleta da design family escolhida
- Se Dark AI-forward: leve desaturação + sombras mais frias (shadows para `#0A0A0B`)
- Se Editorial: tons quentes levemente aumentados, contraste médio
- Se Luxury Clean: tom quente, leve virado ao sépia, contraste suave
- Ferramenta: Photoshop / Lightroom / Photopea (Curves + Color Balance)

**Etapa 3 — Export**
- Exportar em PNG transparente primeiro (para composição)
- Versão final em WebP 1200x1600, otimizada

### Done when...
- [ ] Background 100% removido sem artefatos nas bordas
- [ ] Color grade coerente com a paleta da página
- [ ] Arquivo WebP em `public/assets/expert-hero.webp` com < 200KB
- [ ] Alt text definido: "Jonathan Proença, idealizador do método 'Como Ser Promovido em 90 Dias'"

---

## 2. Background do Hero

**Status:** A gerar
**Arquivo final:** `public/assets/hero-bg.webp`

### Opção A — Gradient mesh + noise (recomendado para Dark AI-forward)

**Tecnologia:** CSS puro (sem arquivo de imagem)
**Implementação:**
```css
.hero-bg {
  background:
    radial-gradient(ellipse 80% 60% at 70% 20%, rgba(201, 169, 97, 0.15), transparent 70%),
    radial-gradient(ellipse 60% 80% at 20% 80%, rgba(201, 169, 97, 0.08), transparent 70%),
    #0A0A0B;
  position: relative;
}

.hero-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('/assets/noise.png');
  opacity: 0.03;
  pointer-events: none;
  mix-blend-mode: overlay;
}
```

Gerar `noise.png` (200x200px, repetido): usar um gerador online de noise texture ou este SVG inline:
```html
<svg xmlns="http://www.w3.org/2000/svg"><filter id="n"><feTurbulence baseFrequency="0.9" /></filter><rect width="100%" height="100%" filter="url(#n)" opacity="0.4"/></svg>
```

### Opção B — Imagem abstrata gerada (Midjourney/Flux)

**Quando usar:** Se o background CSS puro ficar visualmente pobre ou se quiser algo mais premium/editorial.

**Prompt Midjourney (Dark AI-forward):**
```
abstract dark background with subtle warm golden light, deep matte black, premium executive aesthetic, soft gradient mesh, 8k, cinematic, minimalist, depth and atmosphere, --ar 16:9 --style raw --v 6
```

**Prompt Flux (Dark AI-forward):**
```
A premium abstract dark background composed of warm black (#0A0A0B) tones with a very subtle golden radial glow in the upper-right corner. Soft gradient mesh, organic atmosphere, slight grain texture. Cinematic, moody, editorial. No text, no subjects, no geometric shapes. Aspect ratio 16:9.
```

**Prompt Dall-E 3 (Dark AI-forward):**
```
An abstract premium background with deep warm black tones and a soft golden radial glow emerging from the upper right. No hard edges, no text, no figures. Cinematic lighting, subtle grain, executive and sophisticated aesthetic. Wide landscape orientation.
```

**Specs pós-geração:**
- Redimensionar para 1920x1080 ou 2560x1440
- Exportar WebP com qualidade 80
- Usar como `background-image` com `position: cover`

### Done when...
- [ ] Background aplicado ao Hero no código
- [ ] Transição suave entre background e conteúdo (sem cortes abruptos)
- [ ] Noise texture (se usada) não cria banding ou artefatos visíveis
- [ ] Carrega rápido (< 80KB se for imagem)

---

## 3. Composição Final do Hero (Foto + Background)

**Status:** A compor

### Estratégia recomendada: CSS composition

Manter foto e background como camadas separadas no código (mais controle, mais leve):

```tsx
<section className="relative overflow-hidden bg-hero-gradient">
  {/* Background já aplicado via CSS no bg-hero-gradient */}

  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-16 max-w-7xl mx-auto px-6 pt-24 pb-16">
    {/* Esquerda: texto */}
    <div>
      <Badge />
      <Headline />
      <Subheadline />
      <HeroBody />
    </div>

    {/* Direita: foto + form overlapping */}
    <div className="relative">
      <Image
        src="/assets/expert-hero.webp"
        alt="Jonathan Proença"
        width={600}
        height={800}
        priority
        className="relative z-0 rounded-lg"
      />
      <div className="absolute -bottom-8 -left-8 z-10 w-[95%]">
        <CaptureForm />
      </div>
    </div>
  </div>
</section>
```

**Variações de layout a considerar:**
- Foto à esquerda, form à direita sobre o texto
- Foto full-bleed no fundo com overlay escuro e form centralizado
- Foto em silhueta + glow (treatment mais artístico)

### Done when...
- [ ] Foto integrada sem parecer "colada"
- [ ] Form visível e legível sobre a composição
- [ ] Composição mantém hierarquia visual (headline → form)
- [ ] Responsivo: no mobile, foto vira menor ou se reposiciona

---

## 4. OG Image (Social Sharing)

**Status:** A gerar
**Arquivo final:** `public/og-image.png`

### Especificações
- **Dimensões:** 1200x630px (padrão OG)
- **Formato:** PNG (melhor compatibilidade cross-platform)
- **Tamanho máximo:** 300KB

### Composição recomendada
- Background: mesmo da design family
- Headline principal: "Como Ser Promovido em 90 Dias" em typography hero
- Sub-texto: "Webinário Gratuito · Jonathan Proença"
- Foto do Jonathan: lado direito, recortada, em tamanho 400x500
- Logo ou marca do Jonathan (se houver) no canto inferior esquerdo

### Ferramentas
- **Rápido:** Canva com template 1200x630 (OG Image)
- **Controle total:** Figma ou Photoshop com export direto
- **Automático no código:** Next.js `ImageResponse` API (gera OG image dinamicamente) — recomendo essa opção

### Exemplo de OG dinâmica no Next.js

```typescript
// app/opengraph-image.tsx
import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    <div style={{ /* layout */ }}>
      <h1>Como Ser Promovido em 90 Dias</h1>
      <p>Webinário Gratuito · Jonathan Proença</p>
    </div>,
    size
  );
}
```

### Done when...
- [ ] OG image aparece corretamente no opengraph.xyz preview
- [ ] Legível em thumbnails pequenos (WhatsApp, Telegram)
- [ ] Usa tipografia consistente com a página
- [ ] Arquivo < 300KB

---

## 5. Favicon e Ícones do App

**Status:** A gerar
**Arquivos finais:**
- `public/favicon.ico` (multi-size: 16x16, 32x32, 48x48)
- `public/apple-touch-icon.png` (180x180)
- `public/icon-192.png`
- `public/icon-512.png`

### Design
- Monograma "JP" (Jonathan Proença) OU símbolo abstrato minimalista
- Fundo: cor primária da paleta (accent) ou preto profundo
- Texto: branco ou tom claro

### Ferramenta
- **Realfavicongenerator.net** — upload de PNG 512x512 → gera todo o conjunto
- Ou criar manualmente no Figma e exportar em cada tamanho

### Done when...
- [ ] Aba do navegador exibe favicon correto (não o default do Next.js)
- [ ] Ícone aparece certo ao adicionar site à tela inicial em iOS/Android
- [ ] PWA manifest (se usado) referencia os ícones

---

## 6. Ícones na Página

**Status:** Definir biblioteca

### Biblioteca recomendada: Lucide React

**Uso:** Apenas onde ícone adiciona significado, nunca como decoração.

**Onde usar ícones nesta página específica:**
- Possivelmente na seção "O que você vai aprender" (mas ver guidance da `premium-ui-design`: preferir números sobre ícones em pastéis)
- Possivelmente no CTA button como seta (→ já está na copy, pode ser SVG ou Unicode)
- Nenhum outro lugar

**Regra:** Nenhum ícone Lucide dentro de círculo colorido pastel (anti-padrão da design family).

### Alternativa: números em display font

Para "O que você vai aprender":
```
01    Por que profissionais que entregam menos...
02    O erro silencioso que transforma...
03    Como decodificar o perfil do seu gestor...
04    A conversa que você nunca teve...
05    Como usar IA para multiplicar resultados...
```

Mais editorial, mais premium, menos "template".

### Done when...
- [ ] Biblioteca de ícones escolhida e instalada
- [ ] Uso de ícones aderente aos padrões da design family
- [ ] Todos ícones têm `aria-hidden="true"` quando decorativos

---

## 7. Vídeo (opcional — não previsto nesta copy)

**Status:** N/A (copy não menciona vídeo)

Se futuramente o Jonathan quiser gravar vídeo de boas-vindas na `/obrigado`:

**Specs:**
- Duração: 60–90 segundos
- Resolução: 1080p mínimo, 4K preferível
- Áudio: microfone de lapela ou condensador (não áudio de câmera)
- Iluminação: frontal ou 3-ponto
- Fundo: limpo, idealmente igual ao design da página
- Formato final: MP4 H.264 + versão WebM para fallback

**Hospedagem:**
- Bunny.net Stream (recomendado — CDN rápida, player customizável)
- Ou Mux
- Evitar YouTube embed (compromete performance)

---

## Resumo dos Assets a Produzir

| Asset | Ferramenta | Tempo estimado | Prioridade |
|---|---|---|---|
| Foto do Jonathan tratada | remove.bg + Photoshop/Photopea | 30min | Alta |
| Background do hero | CSS puro OU Midjourney/Flux | 20min / 1h | Alta |
| OG Image | Next.js ImageResponse | 30min | Média |
| Favicon + ícones do app | RealFaviconGenerator | 15min | Baixa |
| Ícones na página | Lucide React (já instalado) | — | Baixa |

**Total estimado para todos os assets:** 2–3 horas de trabalho externo.

---

## Workflow de Produção Recomendado

1. **Primeiro:** Tratar foto do Jonathan (bloqueador para M4)
2. **Em paralelo:** Decidir entre background CSS vs. gerado
3. **Depois:** Integrar foto + background no Hero
4. **Antes do deploy:** Gerar OG Image e favicon
5. **Se aplicável:** Considerar vídeo na thank-you page como upgrade pós-launch
