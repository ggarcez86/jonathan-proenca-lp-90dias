import type { Metadata } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import Analytics from "@/components/Analytics";
import { CustomCursor } from "@/components/magicui/CustomCursor";
import "../styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Como Ser Promovido em 90 Dias · Webinário Gratuito com Jonathan Proença",
  description: "O método que nenhum diretor vai te ensinar. Aula ao vivo e gratuita para profissionais que entregam tudo e não são promovidos. Vagas limitadas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body
        className={`${geistSans.variable} ${instrumentSerif.variable} antialiased bg-bg text-text-high overflow-x-hidden`}
      >
        <CustomCursor />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
