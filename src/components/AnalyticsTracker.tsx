"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { logPageView } from "@/app/actions/logAnalytics";

export function AnalyticsTracker() {
  const pathname = usePathname();
  const trackedPaths = useRef<Set<string>>(new Set());

  useEffect(() => {
    // Evita contar duas vezes o mesmo caminho durante hmr ou re-renders malucos no client route
    if (!trackedPaths.current.has(pathname)) {
      trackedPaths.current.add(pathname);
      
      // Dispara em background silencioso
      if(pathname === "/" || pathname === "/obrigado"){
         logPageView(pathname);
      }
    }
  }, [pathname]);

  return null; // Componente fantasma! Nenhuma UI renderizada.
}
