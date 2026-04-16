# COPY.md — [Project Name]

> **Instruções para o agente (Claude / Gemini):**
> Este é o documento de verdade para toda a copy da página. Ao implementar cada seção, copie o texto **literal** deste arquivo. Não parafraseie, não resuma, não reordene frases. Se precisar quebrar uma frase em múltiplos elementos (ex: separar uma palavra para dar ênfase em `<em>`), mantenha o texto exato e apenas estruture o HTML/JSX em torno dele.
>
> Pontos marcados com `<!-- OPCIONAL -->` são sugestões de melhoria. Manter o original é o default; o usuário decide se aceita a sugestão ou não.

---

## METADATA (head tags)

**Page title:**
```
[Title tag text — 60 chars max]
```

**Meta description:**
```
[Description — 160 chars max]
```

**OG title:** `[OG title]`
**OG description:** `[OG description]`

---

## BARRA DE URGÊNCIA (se houver)

```
[exact text]
```

---

## HERO

### Badge (se houver)

```
[exact text]
```

### Headline

```
[exact text]
```

**Tratamento visual sugerido:** [any `<em>`, color accent, or size treatment notes]

### Subheadline

```
[exact text]
```

### Corpo do Hero

**Parágrafo 1:**
```
[exact text]
```

**Parágrafo 2:**
```
[exact text]
```

_(repeat for each paragraph in the original copy)_

---

## FORMULÁRIO DE CAPTURA

### Headline do form

```
[exact text]
```

### Sub-headline do form (se houver)

```
[exact text]
```

### Labels dos campos

- Nome: `[label text]`
- E-mail: `[label text]`
- WhatsApp: `[label text]`

### Placeholders

- Nome: `[placeholder example]`
- E-mail: `[placeholder example]`
- WhatsApp: `[placeholder example]`

### Helper text (abaixo dos campos)

- E-mail: `[helper text]`
- WhatsApp: `[helper text]`

### Botão do form (microcopy)

```
[exact button text]
```

**Estados do botão:**
- Idle: `[text]`
- Loading: `[text]`
- Success: `[text]`

### Disclaimer (abaixo do botão)

```
[exact text]
```

### Mensagens de erro

- Nome inválido: `[message]`
- E-mail inválido: `[message]`
- WhatsApp inválido: `[message]`
- Campo vazio: `[message]`
- Erro de rede: `[message]`

---

## SEÇÃO — [NOME DA SEÇÃO, e.g., "O QUE VOCÊ VAI APRENDER"]

### Section heading (se houver)

```
[exact text]
```

### Itens

**01.**
```
[exact item text]
```

**02.**
```
[exact item text]
```

_(repeat for all items)_

**Tratamento visual:** [notes about numbering style, separators, layout]

---

## SEÇÃO — [próxima seção]

_(repeat the structure above for every section in the original copy)_

---

## PÁGINA /OBRIGADO (se aplicável)

### Headline

```
[exact text]
```

### Subheadline

```
[exact text]
```

### Detalhes do evento (se aplicável)

```
[structured details — date, time, duration, link placeholders]
```

### Bloco "próximo passo"

**Heading:**
```
[exact text]
```

**Corpo:**
```
[exact text]
```

**Botão:**
```
[exact text]
```

---

## E-MAIL DE CONFIRMAÇÃO (se aplicável)

### Subject line

```
[exact subject]
```

### Preview text

```
[exact preview text]
```

### Corpo do e-mail

**Abertura:**
```
[exact text, with [variables] in brackets]
```

**Detalhes:**
```
[exact text]
```

**Call de engajamento:**
```
[exact text with link placeholder]
```

**Assinatura:**
```
[exact signature]
```

---

## FOOTER

```
[exact footer text, with placeholders for year, legal links]
```

---

## SUGESTÕES OPCIONAIS CONSOLIDADAS

Sugestões marcadas ao longo do documento. Usuário decide se aceita, rejeita ou variante:

### Sugestão 1 — [título curto]
- **Original:** "[original text]"
- **Sugestão:** "[proposed text]"
- **Rationale:** [why this change would help]

### Sugestão 2 — [título curto]
- **Original:** "[original]"
- **Sugestão:** "[proposed]"
- **Rationale:** [reasoning]

_(mantenha no máximo 3–4 sugestões opcionais — mais que isso vira ruído)_

---

## CONTROLE DE VERSÃO DA COPY

Se a copy for iterada (A/B test, reescrita), criar branch de versão:
- `COPY.md` = versão ativa
- `COPY-v2.md`, `COPY-v3.md` = variações testadas
- Registrar em PLAN.md > "Notas e Decisões" qual versão está em produção
