import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Aula ao Vivo · Método Liga Executiva",
  description: "Assista à aula gratuita com Jonathan Proença sobre o Método Liga Executiva. Ao vivo, com vagas limitadas.",
  robots: "noindex, nofollow", // Impede google crawlers de achar essa página secreta
};

export default function AulaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Vturb performance timing — deve rodar o mais cedo possível */}
      <Script id="vturb-perf" strategy="afterInteractive">{`!function(i,n){i._plt=i._plt||(n&&n.timeOrigin?n.timeOrigin+n.now():Date.now())}(window,performance);`}</Script>

      {/* Preload e DNS prefetch para o player Vturb */}
      <link rel="preload" href="https://scripts.converteai.net/cfd49a9b-b153-4e3b-85ad-c2a646843a51/players/6a108c4cd754ee16b0556d1c/v4/player.js" as="script" />
      <link rel="preload" href="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/smartplayer.js" as="script" />
      <link rel="preload" href="https://cdn.converteai.net/cfd49a9b-b153-4e3b-85ad-c2a646843a51/6a108b7870a79c09bac92e68/main.m3u8" as="fetch" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://cdn.converteai.net" />
      <link rel="dns-prefetch" href="https://scripts.converteai.net" />
      <link rel="dns-prefetch" href="https://images.converteai.net" />
      <link rel="dns-prefetch" href="https://license.vturb.com" />

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
    </>
  );
}
