export default function TargetAudience() {
  const audience = [
    "Você entrega mais do que todo mundo e continua no mesmo cargo há mais de 1 ano",
    "Você já recebeu feedback vago tipo \"você está no caminho certo\" e não entendeu o que fazer com isso",
    "Você já investiu em curso, certificação ou MBA e ainda não foi promovido",
    "Você viu um colega com menos resultado ser promovido na sua frente — e não entendeu por quê",
    "Você quer subir sem precisar puxar saco, mudar quem você é ou jogar política"
  ];

  return (
    <section className="py-32 px-6 max-w-3xl mx-auto border-b border-border">
      <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-text-high mb-16 tracking-tight text-center">Essa aula é para você se...</h2>
      <ul className="space-y-0">
        {audience.map((item, i) => (
          <li key={i} className="py-8 border-b border-border-strong last:border-0 text-text-mid hover:text-text-high text-lg lg:text-xl font-body transition-colors duration-300">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
