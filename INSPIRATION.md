# M0.5 — Visual Research & Inspiration (Dark AI-forward)

Conforme a documentação da skill `capture-page-inspiration`, esta pesquisa mapeia referências premium focadas em estética "Dark AI-forward" aplicada a funis/agendamentos/captação. O objetivo é evitar visuais de infoprodutos genéricos e seguir uma linguagem de SaaS premium / High-ticket Mentorship.

## 1. Referências Mapeadas

**1. Reforge (Landing Pages de Programas Executivos)**
- **Por que está aqui:** Estrutura de conteúdo voltada para executivos e profissionais mid-senior.
- **Hero / Form:** Texto alinhado à esquerda e formulário "limpo" focado na captação inicial.
- **Hierarquia:** Prioriza as "dores/estagnação" (copy) em cards sutis antes de apresentar o mentor.
- **Takeaway:** O estilo de listagem vertical com fontes Serif finas para números demonstra autoridade.

**2. Linear (linear.app - Referência Estética)**
- **Por que está aqui:** É o padrão-ouro do "Dark Premium".
- **Visual:** Backgrounds quase totalmente pretos (`#0A0A0B`), com *gradient meshes* subjacentes muito sutis.
- **Tipografia:** Mescla sans-serifs minimalistas para UI e detalhes em Serif para "brand weight".
- **Takeaway:** O uso extremo de contraste no Call to Action (botão claro com leve brilho) puxa a conversão sem precisar de vermelho ou amarelo gritante.

**3. Vercel Ship / Next.js Conf (Eventos de Captura)**
- **Por que está aqui:** É essencialmente uma LP de captura para um "webinário/evento".
- **Form:** Sticky lateral no desktop ou um ticket gerado no topo pós-inscrição.
- **Visual:** Dark-mode nativo. Uso de contornos (borders) de 1px com baixa opacidade para definir os inputs de formulário em superfícies `#111`.
- **Takeaway:** Formulário centralizado no hero ou hero *split-screen* com forte presença da data/vagas.

**4. Maven (High-Ticket Courses / Cohort LPs)**
- **Por que está aqui:** Eles criaram um layout padrão focado em "Instrutores premium".
- **Hero:** Foto com recorte orgânico ao lado de um CTA muito óbvio. Background neutro-escuro.
- **Social Proof:** Traz logotipos onde o mentor já trabalhou logo abaixo da dobra (ex: logos vazados em cinza/branco com baixa opacidade).
- **Takeaway:** Secção "Quem é o especialista" editorial.

---

## 2. Moodboard Consolidado

**Paleta Dark AI-forward (Executivo):**
- **Base Background:** `#0A0A0B` (Preto Quente, traz um ar cinematográfico).
- **Superfícies de destaque (Cards/Form):** `#141417` a `#1E1F24`.
- **Acento (Warm Gold/Premium):** `#C9A961` ou variações de cobre refinado, usado apenas em micro-interações, checkmarks e hover no CTA. NUNCA como fundo inteiro.
- **Textos:** Títulos em `#F4F4F5`, subtítulos e labels de input em `#A1A1AA`.

**Tipografia:**
- **Display:** Instrument Serif (traz a estética editorial do "Madureira pro Texas", de sabedoria e autoridade não-fabricada).
- **Body & Controls:** Geist (geométrica, leitura rápida e familiaridade com SaaS).

**Padrões de Layout (Layout Archetypes):**
- **Split Hero (3:2):** Copy forte à esquerda, foto bem color-graded e formulário à direita (típico de conversão direta).
- **Uso de Form:** *Inline* no topo, eliminando a fricção de carregar um modal extra, mas se repetindo numa versão dramática no rodapé para capturar quem desceu a página inteira.

**Social Proof:**
- Evitar longos depoimentos em vídeo; adotar a pull quote forte (ex: "Resultado: 11 promoções.") em fontes Serif gigantes (6rem com baixa opacidade nas aspas).

---

## 3. Direções Recomendadas para o Projeto

Com base nisso, temos 3 estruturas tangíveis para codar no M1:

### Direção A: "O SaaS Executivo" (Focado em Form Central / Produto)
- O layout flui do centro para baixo.
- **Hero:** Badge, Headline enorme, Subhead e CTA centralizado. O formulário fica contido num "Card de vidro" levemente translúcido acima do background texturizado ou mesh dourado super sutil. A foto do mentor vem abaixo da dobra.
- **Prós:** Foco 100% no método, conversão ultra rápida para quem já conhece do anúncio.

### Direção B: "O Split Cinematográfico" (Recomendado pelo PRD)
- **Hero (Desktop):** A tela é dividida. Esquerda (60%) tem toda a copy (Headline até Parágrafo 5). Direita (40%) tem a foto do Jonathan mesclada perfeitamente com um formulário no rodapé da imagem.
- **Prós:** Cria conexão instantânea (Rosto + Método). Segue exatamente o padrão de conversão High-ticket (semelhante ao Maven LPs).

### Direção C: "O Editorial Sombrio" (Estilo Revista Forbes Dark Mode)
- **Hero:** A foto do Jonathan fica enorme à esquerda (ou ocupando grande parte do background, esmaecida), e o texto fluindo como um artigo de revista à direita. O "formulário" na verdade começa como um único input de e-mail e depois abre o resto (progressivo) – não faremos progressivo aqui, mas mantém a pegada estética.
- **Prós:** Transforma uma "página de vendas" numa peça de leitura. Muito diferente dos infoprodutos.

---

**Qual dessas direções ressoa mais com a proposta?**
Acredito que a **Direção B (Split Cinematográfico)** case perfeitamente com os `breakpoints` ditados no PRD ("Desktop: texto esquerda, foto + form à direita"). Podemos seguir com a implementação visual dessa estrutura no M1?
