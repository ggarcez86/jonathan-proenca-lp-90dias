"use client";

import { useWebinarState } from "@/lib/hooks/useWebinarState";
import { useEffect } from "react";
import { logPageView } from "@/app/actions/logAnalytics";
import PreEvent from "./components/PreEvent";
import LiveEvent from "./components/LiveEvent";
import PostEvent from "./components/PostEvent";

export default function WebinarPage() {
  const { state, mounted } = useWebinarState();

  useEffect(() => {
    // Loga view na central do dashboard quando a página do webinario carrega
    logPageView("/aula");
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
