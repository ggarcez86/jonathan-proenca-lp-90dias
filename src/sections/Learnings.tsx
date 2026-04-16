export default function Learnings() {
  const learnings = [
    "Por que profissionais que entregam menos são promovidos antes de você — e como virar esse jogo",
    "O erro silencioso que transforma bons profissionais em \"insubstituíveis no cargo\" — e como sair dessa armadilha",
    "Como decodificar o perfil do seu gestor e falar exatamente o que ele precisa ouvir para te promover",
    "A conversa que você nunca teve com a sua liderança — e que pode mudar tudo em 90 dias",
    "Como usar inteligência artificial para multiplicar seus resultados e criar visibilidade na sua empresa"
  ];

  return (
    <section className="py-32 px-6 max-w-4xl mx-auto border-b border-border">
      <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-text-high mb-16 tracking-tight">O que você vai descobrir nessa aula</h2>
      <div className="grid gap-12 sm:gap-16">
        {learnings.map((item, i) => (
          <div key={i} className="grid grid-cols-[auto_1fr] gap-6 sm:gap-10 items-start group">
            <span className="font-display text-6xl sm:text-7xl text-accent/40 leading-[0.7] group-hover:text-accent/80 transition-colors duration-500">
              0{i + 1}
            </span>
            <p className="text-lg sm:text-xl text-text-mid font-body leading-relaxed max-w-2xl group-hover:text-text-high transition-colors duration-500">
              {item}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
