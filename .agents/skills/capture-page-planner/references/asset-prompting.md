# Asset Prompting Guide

Prompts prontos para Midjourney, Flux e DALL-E organizados por design family. Copie, ajuste e execute fora do ambiente de código.

## Regras universais

1. **Nunca pedir texto.** Geradores de imagem falham em texto. Texto vai no HTML/CSS.
2. **Sempre especificar aspect ratio.** `--ar 16:9` (hero), `--ar 3:4` (portrait), `--ar 1:1` (OG alt).
3. **Especificar estilo explícito.** "cinematic", "editorial", "minimalist" — ajuda o modelo.
4. **Negative prompts quando disponíveis.** `--no text, no logos, no people` quando não quer esses elementos.
5. **Iterar.** Primeiro resultado raramente é final. Espere gerar 3–5 variações antes de escolher.

---

## Dark AI-forward — Backgrounds

### Hero background abstrato

**Midjourney:**
```
abstract premium dark background, deep warm black tones, subtle golden radial light from upper right corner, cinematic atmosphere, gradient mesh, soft grain texture, no text, no subjects, executive sophisticated aesthetic --ar 16:9 --style raw --v 6
```

**Flux.1 Pro:**
```
A premium abstract dark background. Deep warm black (#0A0A0B) base tones with a very subtle, diffused golden radial glow emerging from the upper-right corner. Organic gradient mesh with soft atmospheric depth. Fine grain texture overlay. Cinematic and moody. Executive, sophisticated, no text, no figures, no geometric patterns. Landscape composition.
```

**DALL-E 3:**
```
An abstract, premium landscape background image. Dominant color: deep warm black. A soft golden radial glow emerges subtly from the upper right area, fading into darkness. No text, no people, no objects. Cinematic lighting with subtle grain texture. Sophisticated, executive, moody atmosphere. Wide 16:9 orientation.
```

### Variação com azul/cyan

**Midjourney:**
```
abstract dark tech background, deep matte black, subtle cyan glow, gradient mesh, cinematic noir, minimalist, premium executive aesthetic, no text, no figures --ar 16:9 --style raw --v 6
```

### Variação com verde/acid

**Midjourney:**
```
abstract dark premium background, warm black base, subtle acid green accent light, editorial aesthetic, gradient mesh, grain texture, no text, no subjects --ar 16:9 --style raw --v 6
```

---

## Editorial — Backgrounds

### Paper texture background

**Midjourney:**
```
editorial warm off-white paper texture, subtle grain, organic uneven tone variations, magazine aesthetic, minimal, no text, no subjects, top-down view --ar 16:9 --style raw --v 6
```

### Abstract editorial composition

**Midjourney:**
```
editorial magazine layout inspiration, warm cream background, single deep burgundy abstract shape off-center, minimalist, sophisticated, no text --ar 16:9 --style raw --v 6
```

---

## Luxury Clean — Backgrounds

### Warm paper / linen

**Midjourney:**
```
luxury warm cream background, subtle linen texture, vintage magazine aesthetic, soft natural lighting, minimalist, no text, no subjects --ar 16:9 --style raw --v 6
```

### Editorial stone / concrete

**Midjourney:**
```
soft warm stone texture background, neutral tones, museum aesthetic, minimal, luxury quiet, no text, no subjects --ar 16:9 --style raw --v 6
```

---

## Portraits — quando precisa gerar portrait sintético

**Quando usar:** Expert não tem boa foto e não tem tempo/orçamento para sessão.

**AVISO:** Para LP com expert real, SEMPRE preferir foto real. Portrait AI é último recurso e deve ser declarado se o público pode detectar.

**Midjourney (executive portrait):**
```
professional executive portrait of a 45-year-old Brazilian man, short dark hair, confident composed expression, wearing a charcoal blazer, studio lighting, neutral dark background, cinematic, 85mm lens, editorial magazine style --ar 3:4 --style raw --v 6
```

---

## Composite (foto real + background gerado)

Se você tem foto do expert e precisa de background gerado para compor:

**Workflow:**
1. Remover background da foto do expert (remove.bg ou Photoshop)
2. Gerar background separado com Midjourney/Flux
3. Compor em Photoshop/Photopea OU manter como layers no código (CSS)

**Prompt para background que conversa com um portrait:**
```
abstract dark atmospheric background for a premium executive portrait composite, deep warm black tones with subtle golden atmospheric light from one side, cinematic moody lighting, no subjects, no text, soft gradient mesh, photographic depth --ar 3:4 --style raw --v 6
```

Nota: gerar com o mesmo aspect ratio da foto final facilita composição.

---

## OG Images

OG image raramente vale gerar por AI (melhor compor no Figma/código). Mas se quiser um background puro:

**Midjourney:**
```
premium dark background with warm golden glow, minimal, cinematic, no text, leaves space for overlaid text in center, 1200x630 composition --ar 1200:630 --style raw --v 6
```

Depois adicionar texto via Next.js `ImageResponse` ou Figma.

---

## Ícones customizados (SVG)

**Quando precisa:** Uma família de ícones coerente com a design family, que Lucide não oferece.

**Workflow recomendado:**
1. Gerar inspirações com Midjourney/Flux
2. Redesenhar como SVG no Figma ou direto em código
3. NUNCA usar a saída direta do Midjourney como SVG (vai sair rasterizado)

**Prompt inspiracional:**
```
set of 6 minimalist line icons, editorial magazine aesthetic, single continuous stroke, 1px weight, related to career advancement and leadership: arrow up, ladder, crown, handshake, document, target, isolated on white background, no text --v 6
```

Depois: pegar as ideias visuais e desenhar SVGs limpos no Figma.

---

## Video (para pós-launch)

**Ferramentas recomendadas para vídeo explicativo curto:**
- **Synthesia** — avatar AI profissional falando (se o expert não quer aparecer)
- **HeyGen** — similar, com opção de clonar voz do próprio expert
- **Gravação real + edição em CapCut/DaVinci** — sempre a melhor opção

**Gustavo específico:** Para o Jonathan, a autoridade vem da história real (Madureira → Texas). Vídeo REAL dele contando a história é 10x mais poderoso que qualquer AI. Se for investir em vídeo, investir em produção real.

**Brief para vídeo de boas-vindas na /obrigado:**
- Duração: 45-60 segundos
- Roteiro base:
  - "Você se inscreveu no webinário. Antes de dia X, faça uma coisa: [ação específica — ex: escrever suas últimas 3 entregas profissionais em uma folha]."
  - "Por quê? Porque na aula você vai usar esse material. E quem vem preparado sai 10x na frente."
  - "Te vejo dia X às 19h. [Nome]"
- Setup: fundo que converse com a design family da página (preto com luz dourada para Dark AI-forward)

---

## Checklist antes de executar qualquer prompt

- [ ] Aspect ratio correto para o uso final
- [ ] Sem texto sendo pedido (ou sem esperar que apareça legível)
- [ ] Prompt menciona a estética da design family
- [ ] Prompt diz o que NÃO quer (no text, no people, etc)
- [ ] Orçamento mental: quantas gerações você pode fazer antes de escolher
- [ ] Output será otimizado depois (WebP, dimensão correta)

## Workflow recomendado de produção

1. **Definir** exatamente o que precisa (voltar ao ASSETS.md)
2. **Gerar** 3–5 variações do mesmo prompt
3. **Escolher** 1
4. **Tratar** no Photoshop/Photopea (crop, color grade, otimização)
5. **Exportar** em WebP 80% quality
6. **Integrar** no projeto com Next.js Image
7. **Testar** em mobile e desktop
8. **Marcar** o asset como pronto no PLAN.md
