"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabaseBrowser } from "@/lib/supabase-browser";

const PROOF_POINTS = [
  "Acompanhamento individual por 90 dias para os 20 primeiros",
  "O mesmo método que gerou 11 promoções e 4 transferências internacionais",
  "Turmas pequenas — cada caso exige atenção individual",
];

export default function TimedSalesCTA({
  alwaysVisible = false,
  appearAfterSeconds = Number(process.env.NEXT_PUBLIC_CTA_APPEAR_SECONDS ?? 3600),
}: {
  alwaysVisible?: boolean;
  appearAfterSeconds?: number;
}) {
  const [visible, setVisible] = useState(alwaysVisible);

  useEffect(() => {
    if (alwaysVisible) return;

    supabaseBrowser
      .from("site_config")
      .select("value")
      .eq("key", "cta_visible")
      .single()
      .then(({ data }) => { if (data?.value) setVisible(true); });

    const channel = supabaseBrowser
      .channel("cta-config-changes")
      .on("postgres_changes", {
        event: "UPDATE",
        schema: "public",
        table: "site_config",
        filter: "key=eq.cta_visible",
      }, (payload) => { if (payload.new.value) setVisible(true); })
      .subscribe();

    const timer = setTimeout(() => setVisible(true), appearAfterSeconds * 1000);

    return () => {
      supabaseBrowser.removeChannel(channel);
      clearTimeout(timer);
    };
  }, [alwaysVisible, appearAfterSeconds]);

  const salesUrl = process.env.NEXT_PUBLIC_SALES_URL ?? "";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mt-12 max-w-[640px] mx-auto"
        >
          <div className="bg-surface-1 border border-border rounded-lg overflow-hidden">

            {/* 1. Filete dourado */}
            <div
              className="h-[3px] w-full"
              style={{ background: "linear-gradient(to right, transparent, var(--accent), transparent)" }}
            />

            {/* Bloco superior — badge, headline, nome, divisor, proof points */}
            <div className="flex flex-col items-center text-center px-8 pt-10 pb-8">

              {/* 2. Badge */}
              <span className="font-body font-semibold text-[11px] uppercase tracking-[0.18em] text-accent mb-5">
                Para quem não quer esperar mais
              </span>

              {/* 3. Headline */}
              <h2 className="font-display text-[28px] leading-snug text-text-high mb-4">
                Você já sabe o problema.<br />
                Agora tem o método.
              </h2>

              {/* 4. Subtítulo */}
              <p className="font-body text-[14px] text-text-low mb-1">Mentoria</p>

              {/* 5. Nome em destaque */}
              <p className="font-display text-[22px] text-accent">Liga Executiva</p>

              {/* 6. Divisor curto */}
              <div className="w-[60px] h-px bg-border my-7" />

              {/* 7. Proof points — alinhados à esquerda, centralizados no bloco */}
              <ul className="flex flex-col gap-3 text-left w-full max-w-[400px]">
                {PROOF_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-3 font-body text-[13px] text-text-mid">
                    <span className="text-accent shrink-0 leading-relaxed select-none">—</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

            </div>

            {/* 8. Bloco de urgência */}
            <div className="bg-surface-2 border-t border-border px-8 py-6 text-center">
              <p className="font-display text-[15px] text-text-high italic leading-relaxed">
                "Daqui a 90 dias você vai estar no mesmo cargo,{" "}
                <br className="hidden sm:inline" />
                ou vai estar contando como chegou lá."
              </p>
            </div>

            {/* 9. Botão + 10. Microcopy */}
            <div className="flex flex-col items-center px-8 py-8">
              <a
                href={salesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-accent text-accent-fg font-body font-bold text-sm uppercase tracking-widest rounded-md transition-opacity hover:opacity-90"
              >
                Quero minha vaga na Liga Executiva →
              </a>
              <p className="font-body text-[12px] text-text-low text-center mt-4 leading-relaxed">
                Condição exclusiva para quem assistiu a aula · Página de inscrição com todos os detalhes
              </p>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
