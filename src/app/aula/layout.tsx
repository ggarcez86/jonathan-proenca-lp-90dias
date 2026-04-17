import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aula ao Vivo · Como Ser Promovido em 90 Dias",
  description: "Assista à aula gratuita com Jonathan Proença sobre o método de promoção em 90 dias. Ao vivo, com vagas limitadas.",
  robots: "noindex, nofollow", // Impede google crawlers de achar essa página secreta
};

export default function AulaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bg flex flex-col font-body selection:bg-accent/30 selection:text-white">
      {/* NAVBAR MINIMALISTA BLINDADA */}
      <nav className="relative z-50 w-full border-b border-border bg-[#0A0A0B]/80 backdrop-blur-xl">
        <div className="max-w-[1920px] mx-auto px-6 py-4 flex items-center justify-center sm:justify-start">
          <div className="text-xl sm:text-2xl font-display text-text-high tracking-tight">
            Jonathan Proença
          </div>
        </div>
      </nav>

      {/* RENDERIZADOR ESPECÍFICO DA ROTA /AULA */}
      <main className="flex-1 flex flex-col relative w-full overflow-hidden">
        {children}
      </main>

      {/* FOOTER INVISÍVEL */}
      <footer className="w-full border-t border-border/50 py-8 px-6 text-center text-text-low text-xs sm:text-sm bg-bg relative z-20">
        <p>© 2026 Jonathan Proença · Todos os direitos reservados</p>
      </footer>
    </div>
  );
}
