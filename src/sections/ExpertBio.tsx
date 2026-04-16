import Image from "next/image";

export default function ExpertBio() {
  return (
    <section className="py-32 px-6 border-b border-border bg-surface-1/50">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24 items-center">
        
        {/* Editorial Photo Left */}
        <div className="aspect-[3/4] bg-surface-2 border border-border text-text-low relative overflow-hidden shrink-0">
          <div className="absolute inset-0 bg-gradient-to-t from-bg/40 via-transparent to-transparent z-10" />
          <Image 
                src="/assets/jonathan-hero.webp" 
                alt="Jonathan Proença em estilo editorial"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 40vw"
          />
        </div>
        
        {/* Prose Right */}
        <div className="space-y-8 font-body">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-accent border-b border-accent-border pb-3 inline-block">
            Quem é Jonathan Proença
          </p>
          
          <div className="space-y-6 text-lg sm:text-xl text-text-mid leading-relaxed max-w-xl">
            <p>Cresci em Madureira, subúrbio do Rio de Janeiro. Casa de um quarto, pai segurança, mãe fazendo curso técnico.</p>
            <p>Fui técnico de fábrica por 10 anos. Trabalhei de macacão. Sem MBA, sem escola europeia, sem pistolão.</p>
            <p>Enquanto isso, mapeei o padrão. Estudei como gestores pensam, como decisões de promoção são tomadas de verdade — não o que eles dizem na avaliação anual, mas o que acontece na reunião quando você não está na sala.</p>
          </div>
          
          {/* Pull Quote */}
          <blockquote className="font-display text-4xl sm:text-5xl text-accent my-12 border-l-4 border-accent pl-8 py-2 leading-tight">
            Resultado: mais de 11 promoções. Transferências para França, Espanha, Egito e Estados Unidos. Hoje lidero um time de inteligência artificial em uma multinacional no Texas.
          </blockquote>
          
          <div className="space-y-6 text-lg sm:text-xl text-text-mid leading-relaxed max-w-xl">
            <p>E ainda estou na ativa.</p>
            <p>O que eu vou te ensinar nessa aula não está em nenhum livro de gestão. Não tem no seu MBA. Não tem no LinkedIn.</p>
            <p className="text-text-high italic">Está aqui. Gratuito. Por tempo limitado.</p>
          </div>
        </div>
        
      </div>
    </section>
  );
}
