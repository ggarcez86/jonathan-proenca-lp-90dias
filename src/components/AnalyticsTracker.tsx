"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { logPageView } from "@/app/actions/logAnalytics";

/**
 * Lê um cookie pelo nome.
 */
function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : undefined;
}

export function AnalyticsTracker() {
  const pathname = usePathname();
  const trackedPaths = useRef<Set<string>>(new Set());

  useEffect(() => {
    // Evita contar duas vezes o mesmo caminho durante hmr ou re-renders malucos no client route
    if (!trackedPaths.current.has(pathname)) {
      trackedPaths.current.add(pathname);
      
      // Dispara em background silencioso
      if(pathname === "/" || pathname === "/obrigado"){
        // Gerar eventId para deduplicação Pixel ↔ CAPI
        const eventId = crypto.randomUUID();

        // Disparo browser-side do PageView com eventID para deduplicação
        if (typeof window !== "undefined" && typeof (window as any).fbq === "function") {
          (window as any).fbq("track", "PageView", {}, { eventID: eventId });
          console.log("[Meta Pixel] ✅ PageView disparado. eventID:", eventId);
        }

        // Disparo server-side (CAPI) com mesmos identificadores
        logPageView({
          path: pathname,
          eventId,
          fbp: getCookie("_fbp"),
          fbc: getCookie("_fbc"),
          eventSourceUrl: window.location.href,
        });
      }
    }
  }, [pathname]);

  return null; // Componente fantasma! Nenhuma UI renderizada.
}
