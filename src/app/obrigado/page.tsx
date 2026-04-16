import Link from "next/link";
import Footer from "@/sections/Footer";

export default function ObrigadoPage() {
  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center py-20 px-6 max-w-4xl mx-auto w-full">
        <div className="text-center space-y-6 mb-16">
          <h1 className="font-display text-5xl lg:text-7xl text-accent">Sua vaga está confirmada.</h1>
          <p className="text-xl text-text-mid max-w-2xl mx-auto">
            Em alguns segundos você receberá um e-mail com o link da sessão e um guia de preparação.
          </p>
        </div>

        <div className="w-full bg-surface-1 border border-border rounded-lg p-8 mb-16 max-w-2xl mx-auto">
          <div className="space-y-4 text-text-high text-lg">
            <p><strong>Webinário:</strong> Como Ser Promovido em 90 Dias</p>
            <p><strong>Data:</strong> <span className="text-accent">[a preencher]</span></p>
            <p><strong>Horário:</strong> <span className="text-accent">[a preencher]</span> (horário de Brasília)</p>
            <p><strong>Duração:</strong> 90 minutos</p>
          </div>
        </div>

        <div className="w-full max-w-2xl mx-auto text-center space-y-8">
          <h2 className="text-2xl font-bold">Próximo passo: entre no grupo dos participantes</h2>
          <div className="bg-surface-2 p-6 rounded-lg text-left inline-block w-full">
            <p className="mb-4 font-semibold text-text-high text-lg">No grupo você recebe:</p>
            <ul className="space-y-3 text-text-mid list-disc list-inside">
              <li>Lembrete no dia do webinário</li>
              <li>Acesso prioritário ao material</li>
              <li>Canal direto com a equipe do Jonathan</li>
            </ul>
          </div>
          
          <a href={process.env.NEXT_PUBLIC_WHATSAPP_GROUP_URL || "#"} target="_blank" rel="noopener noreferrer" className="block w-full bg-[#25D366] text-black py-4 rounded font-bold uppercase tracking-widest hover:brightness-110 transition-all">
            Entrar no grupo do WhatsApp →
          </a>
        </div>

        <div className="mt-16 text-center space-y-6">
          <p className="text-text-high">Adicione à sua agenda para não esquecer:</p>
          <div className="flex gap-4 justify-center">
            <button className="px-6 py-2 bg-surface-2 border border-border rounded text-text-mid hover:text-text-high transition-colors">Google Calendar</button>
            <button className="px-6 py-2 bg-surface-2 border border-border rounded text-text-mid hover:text-text-high transition-colors">Outlook</button>
            <button className="px-6 py-2 bg-surface-2 border border-border rounded text-text-mid hover:text-text-high transition-colors">Apple Calendar</button>
          </div>
        </div>

        <div className="mt-24 text-center text-text-low text-sm">
          <p>Não recebeu o e-mail em 5 minutos? Verifique sua caixa de spam ou escreva para contato@[domínio].com</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
