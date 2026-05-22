"use client";

import { useWebinarState } from "@/lib/hooks/useWebinarState";
import { useEffect } from "react";
import { logPageView } from "@/app/actions/logAnalytics";
import { supabaseBrowser } from "@/lib/supabase-browser";
import PreEvent from "./components/PreEvent";
import LiveEvent from "./components/LiveEvent";
import PostEvent from "./components/PostEvent";

export default function WebinarPage() {
  const { state, mounted } = useWebinarState();

  useEffect(() => {
    const channel = supabaseBrowser
      .channel("force-reload")
      .on("postgres_changes",
        { event: "*", schema: "public", table: "site_config", filter: "key=eq.force_reload" },
        () => { window.location.reload(); }
      )
      .subscribe();
    return () => { supabaseBrowser.removeChannel(channel); };
  }, []);

  // Rastreia sessão para contagem de viewers
  useEffect(() => {
    let sid = localStorage.getItem("aula_sid");
    if (!sid) {
      sid = crypto.randomUUID();
      localStorage.setItem("aula_sid", sid);
    }

    // Insere sessão no DB para total acumulado (ignora duplicata se recarregar)
    supabaseBrowser
      .from("viewer_sessions")
      .upsert({ session_id: sid }, { onConflict: "session_id", ignoreDuplicates: true })
      .then();

    // Entra no canal de presença para contagem de ativos em tempo real
    const presenceCh = supabaseBrowser.channel("aula-viewers");
    presenceCh.subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        await presenceCh.track({ sid });
      }
    });

    return () => { supabaseBrowser.removeChannel(presenceCh); };
  }, []);

  useEffect(() => {
    // Loga view na central do dashboard quando a página do webinario carrega
    const eventId = crypto.randomUUID();

    // Disparo browser-side do PageView com eventID
    if (typeof window !== "undefined" && typeof (window as any).fbq === "function") {
      (window as any).fbq("track", "PageView", {}, { eventID: eventId });
    }

    // Captura cookies de tracking do Meta
    const getCookie = (name: string) => {
      const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
      return match ? decodeURIComponent(match[2]) : undefined;
    };

    logPageView({
      path: "/aula",
      eventId,
      fbp: getCookie("_fbp"),
      fbc: getCookie("_fbc"),
      eventSourceUrl: window.location.href,
    });
  }, []);

  // Hydration safety: só exibe a UI depois de ler o timezone client e envs no browser
  if (!mounted) return null;

  return (
    <div className="w-full relative min-h-[90vh]">
      {state === 'pre' && <PreEvent />}
      {state === 'live' && <LiveEvent />}
      {state === 'post' && <PostEvent />}
    </div>
  );
}
