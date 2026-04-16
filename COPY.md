# COPY.md — Landing Page "Como Ser Promovido em 90 Dias"

> **Instruções para o agente (Claude / Gemini):**
> Este é o documento de verdade para toda a copy da página. Ao implementar cada seção, copie o texto **literal** deste arquivo. Não parafraseie, não resuma, não reordene frases. Se precisar quebrar uma frase em múltiplos elementos (ex: separar uma palavra para dar ênfase em `<em>`), mantenha o texto exato e apenas estruture o HTML/JSX em torno dele.
>
> Pontos marcados com `<!-- OPCIONAL -->` são sugestões de melhoria. Manter o original é o default; o Gustavo decide se aceita a sugestão ou não.

---

## METADATA (head tags)

**Page title:**
```
Como Ser Promovido em 90 Dias · Webinário Gratuito com Jonathan Proença
```

**Meta description:**
```
O método que nenhum diretor vai te ensinar. Aula ao vivo e gratuita para profissionais que entregam tudo e não são promovidos. Vagas limitadas.
```

**OG title:** `Como Ser Promovido em 90 Dias`
**OG description:** `Webinário gratuito com Jonathan Proença. Aula ao vivo. Vagas limitadas.`

---

## BARRA DE URGÊNCIA

```
⚠ Vagas limitadas · Webinário gratuito · Apenas para quem garantir o link
```

<!-- OPCIONAL: substituir "Apenas para quem garantir o link" por "Link enviado por e-mail após inscrição" — mais claro e menos ambíguo. Mantém a dinâmica de escassez sem parecer forçado. -->

---

## HERO

### Badge (acima da headline)

```
Aula ao vivo e gratuita
```

### Headline

```
O método que nenhum diretor vai te ensinar para ser promovido em 90 dias
```

**Tratamento visual sugerido:** "nenhum diretor vai te ensinar" em itálico (via `<em>` ou classe CSS) — cria ênfase editorial e alinha com a estética Dark AI-forward.

**Nota de ajuste:** original veio como "O Método que nenhum diretor Vai Te Ensinar Para Ser Promovido em 90 Dias". Ajustei para capitalização de título natural em português (só a primeira letra maiúscula, exceto nomes próprios). Mais elegante e menos "gringuês".

### Subheadline

```
Mesmo que você já tenha tentado de tudo. Mesmo que seu gestor nunca te dê feedback claro. Mesmo que você entregue mais do que todo mundo ao seu redor.
```

### Corpo do Hero (5 parágrafos, ordem fixa)

**Parágrafo 1:**
```
Você trabalha mais que todo mundo. Chega cedo, sai tarde, nunca diz não.
```

**Parágrafo 2:**
```
E ainda assim, ano após ano, a promoção vai para outra pessoa.
```

**Parágrafo 3:**
```
Não é falta de competência. Não é azar. Não é porque você não merece.
```

**Parágrafo 4:**
```
É porque ninguém te ensinou as regras do jogo.
```

**Parágrafo 5:**
```
Nessa aula gratuita, você vai descobrir exatamente o que os profissionais que sobem rápido fazem de diferente — e que você pode começar a aplicar ainda essa semana.
```

**Tratamento visual sugerido:** Parágrafo 4 ("É porque ninguém te ensinou as regras do jogo") pode receber destaque — cor accent, itálico, ou tamanho ligeiramente maior. É o pivot da narrativa.

---

## FORMULÁRIO DE CAPTURA (hero e final)

### Headline do form

```
Garanta seu lugar agora
```

### Sub-headline do form

```
(As vagas fecham quando lotar)
```

### Labels dos campos

- Nome: `Nome completo`
- E-mail: `Seu melhor e-mail`
- WhatsApp: `WhatsApp (com DDD)`

### Placeholders

- Nome: `Maria Silva`
- E-mail: `voce@empresa.com.br`
- WhatsApp: `(11) 98765-4321`

### Helper text (abaixo dos campos)

- E-mail: `Usaremos apenas para enviar o link do webinário`
- WhatsApp: `Para receber o link e lembrete 1h antes da aula`

### Botão do form (microcopy)

```
Quero minha vaga gratuita →
```

**Estados do botão:**
- Idle: `Quero minha vaga gratuita →`
- Loading: `Garantindo sua vaga...`
- Success: `✓ Vaga confirmada`

### Disclaimer (abaixo do botão)

```
100% gratuito. Sem cartão. Sem pegadinha.
```

### Mensagens de erro

- Nome inválido: `Por favor, digite seu nome completo`
- E-mail inválido: `Formato de e-mail inválido. Exemplo: voce@empresa.com.br`
- WhatsApp inválido: `WhatsApp inválido. Inclua o DDD. Exemplo: (11) 98765-4321`
- Campo vazio: `Este campo é obrigatório`
- Erro de rede: `Não conseguimos processar sua inscrição. Verifique sua conexão e tente novamente.`

---

## SEÇÃO — O QUE VOCÊ VAI APRENDER

### Section heading

```
O que você vai descobrir nessa aula
```

<!-- OPCIONAL: a copy original não tinha heading para esta seção. "O que você vai descobrir nessa aula" mantém curiosidade (descobrir > aprender). Se preferir algo mais direto: "Nessa aula você vai aprender:" -->

### Itens (5 bullets — ordem fixa)

**01.**
```
Por que profissionais que entregam menos são promovidos antes de você — e como virar esse jogo
```

**02.**
```
O erro silencioso que transforma bons profissionais em "insubstituíveis no cargo" — e como sair dessa armadilha
```

**03.**
```
Como decodificar o perfil do seu gestor e falar exatamente o que ele precisa ouvir para te promover
```

**04.**
```
A conversa que você nunca teve com a sua liderança — e que pode mudar tudo em 90 dias
```

**05.**
```
Como usar inteligência artificial para multiplicar seus resultados e criar visibilidade na sua empresa
```

**Tratamento visual:** Números `01.` a `05.` em Instrument Serif oversized como marcadores (não usar ícones Lucide em círculos). Ver ASSETS.md > Ícones na Página.

---

## SEÇÃO — ESSA AULA É PARA VOCÊ SE...

### Section heading

```
Essa aula é para você se...
```

### Itens (5 bullets — ordem fixa)

```
Você entrega mais do que todo mundo e continua no mesmo cargo há mais de 1 ano
```

```
Você já recebeu feedback vago tipo "você está no caminho certo" e não entendeu o que fazer com isso
```

```
Você já investiu em curso, certificação ou MBA e ainda não foi promovido
```

```
Você viu um colega com menos resultado ser promovido na sua frente — e não entendeu por quê
```

```
Você quer subir sem precisar puxar saco, mudar quem você é ou jogar política
```

**Tratamento visual:** Lista vertical com separadores hairline entre itens. Sem cards, sem backgrounds coloridos, sem ícones de check. Editorial e limpo.

---

## SEÇÃO — QUEM É JONATHAN PROENÇA

### Section heading (pequeno, tipo label)

```
Quem é Jonathan Proença
```

### Corpo (storytelling — ordem e quebras fixas)

**Parágrafo 1:**
```
Cresci em Madureira, subúrbio do Rio de Janeiro. Casa de um quarto, pai segurança, mãe fazendo curso técnico.
```

**Parágrafo 2:**
```
Fui técnico de fábrica por 10 anos. Trabalhei de macacão. Sem MBA, sem escola europeia, sem pistolão.
```

**Parágrafo 3:**
```
Enquanto isso, mapeei o padrão. Estudei como gestores pensam, como decisões de promoção são tomadas de verdade — não o que eles dizem na avaliação anual, mas o que acontece na reunião quando você não está na sala.
```

**Parágrafo 4 (pull quote — tratamento visual especial):**
```
Resultado: mais de 11 promoções. Transferências para França, Espanha, Egito e Estados Unidos. Hoje lidero um time de inteligência artificial em uma multinacional no Texas.
```

**Parágrafo 5:**
```
E ainda estou na ativa.
```

**Parágrafo 6:**
```
O que eu vou te ensinar nessa aula não está em nenhum livro de gestão. Não tem no seu MBA. Não tem no LinkedIn.
```

**Parágrafo 7:**
```
Está aqui. Gratuito. Por tempo limitado.
```

**Tratamento visual sugerido:**
- Parágrafo 4 como pull quote editorial — Instrument Serif, tamanho maior, cor accent ou destacado em um painel lateral
- Parágrafos 6 e 7 em ritmo mais lento (espaçamento maior entre linhas)
- Foto do Jonathan à esquerda em layout editorial (ver ASSETS.md)

---

## SEÇÃO — POR QUE É GRATUITO?

### Section heading

```
Por que é gratuito?
```

### Corpo (ordem e quebras fixas)

**Parágrafo 1:**
```
Porque eu já fui o profissional que entregava tudo e não entendia por que não subia.
```

**Parágrafo 2:**
```
Eu sei o que essa sensação faz com você.
```

**Parágrafo 3:**
```
E eu sei que existe uma saída. Uma que não exige que você mude quem é.
```

**Parágrafo 4:**
```
Essa aula é a minha forma de provar isso antes de qualquer outra coisa.
```

**Tratamento visual sugerido:** Seção intimista, max-width ~640px, centralizada, tipografia mais quiet. Fundo `--surface-1` para criar pausa visual antes do CTA final.

---

## SEÇÃO — CTA FINAL

### Headline final

```
Sua próxima promoção começa nessa aula.
```

### Subheadline final

```
Gratuito. Ao vivo. Uma vez só.
Garanta seu lugar antes que as vagas fechem.
```

**Nota:** "Gratuito. Ao vivo. Uma vez só." deve ficar em uma linha (ou quebrar naturalmente no mobile). "Garanta seu lugar antes que as vagas fechem." é a linha seguinte.

### Botão final

```
Quero minha vaga gratuita →
```

**Consistência:** Mesmo texto e comportamento do botão do form do hero. Reusar o componente `<CaptureForm variant="final" />`.

### Microcopy abaixo do botão

```
Sem custo. Sem compromisso. Só o método.
```

---

## PÁGINA /OBRIGADO (pós-submit)

### Headline

```
Sua vaga está confirmada.
```

### Subheadline

```
Em alguns segundos você receberá um e-mail com o link da sessão e um guia de preparação.
```

### Detalhes do webinário (bloco destacado)

```
Webinário: Como Ser Promovido em 90 Dias
Data: [a preencher — bloqueador]
Horário: [a preencher — bloqueador] (horário de Brasília)
Duração: 90 minutos
```

### Bloco "próximo passo"

**Heading:**
```
Próximo passo: entre no grupo dos participantes
```

**Corpo:**
```
No grupo você recebe:
• Lembrete no dia do webinário
• Acesso prioritário ao material
• Canal direto com a equipe do Jonathan
```

**Botão:**
```
Entrar no grupo do WhatsApp →
```

### Bloco "adicionar ao calendário"

```
Adicione à sua agenda para não esquecer:
[Google Calendar] [Outlook] [Apple Calendar]
```

### Disclaimer (rodapé da página)

```
Não recebeu o e-mail em 5 minutos? Verifique sua caixa de spam ou escreva para contato@[domínio].com
```

---

## E-MAIL DE CONFIRMAÇÃO (enviado automaticamente)

### Subject line

```
Sua vaga no webinário "Como Ser Promovido em 90 Dias" está confirmada
```

### Preview text

```
Guarda este e-mail — o link da sessão está aqui dentro.
```

### Corpo do e-mail

**Abertura:**
```
Oi, [primeiro nome],

Que bom te ver aqui. Sua vaga no webinário está confirmada.
```

**Detalhes:**
```
Data: [data]
Horário: [hora] (horário de Brasília)
Duração: 90 minutos
Link da sessão: [link]
```

**Instrução:**
```
Salva este e-mail. No dia, é só clicar no link acima 5 minutos antes para entrar.
```

**Call de engajamento:**
```
Enquanto isso, entra no grupo dos participantes — lá eu mando lembretes, bônus e respondo dúvidas antes da aula:

[Link do grupo do WhatsApp]
```

**Assinatura:**
```
Forte abraço,
Jonathan Proença
```

<!-- OPCIONAL: adicionar um P.S. no e-mail. Ex: "P.S.: Se algum colega também vive a mesma situação, manda esse link pra ele — [URL da LP]. Quanto mais gente aplicando, maior o seu próprio network." — cria viralização orgânica sem parecer forçado. -->

---

## FOOTER

```
© 2026 Jonathan Proença · Todos os direitos reservados
[Política de Privacidade] · [Termos de Uso]
```

---

## SUGESTÕES OPCIONAIS CONSOLIDADAS

Duas sugestões de melhoria marcadas ao longo do documento. Gustavo decide se aceita, rejeita ou variante:

### Sugestão 1 — Barra de urgência mais clara
- **Original:** "⚠ Vagas limitadas · Webinário gratuito · Apenas para quem garantir o link"
- **Sugestão:** "⚠ Vagas limitadas · Webinário gratuito · Link enviado por e-mail após inscrição"
- **Rationale:** "Apenas para quem garantir o link" é ambíguo (garantir como? onde?). A alternativa é mais concreta e reforça o comportamento esperado (vá para o e-mail).

### Sugestão 2 — P.S. no e-mail de confirmação
- **Adicionar:** P.S. convidando o lead a compartilhar o link com colegas na mesma situação
- **Rationale:** Viralização orgânica sem custo. Em LPs de webinário premium, o P.S. compartilhável costuma gerar 3-8% de leads adicionais via referência. Não compromete o tom premium porque é framed como network-building ("quanto mais gente aplicando, maior o seu próprio network"), não como pedido de favor.

---

## CONTROLE DE VERSÃO DA COPY

Se a copy for iterada (A/B test, reescrita), criar branch de versão:
- `COPY.md` = versão ativa
- `COPY-v2.md`, `COPY-v3.md` = variações testadas
- Registrar em PLAN.md > "Notas e Decisões" qual versão está em produção
