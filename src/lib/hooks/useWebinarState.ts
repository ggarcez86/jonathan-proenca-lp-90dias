"use client";

import { useState, useEffect } from "react";

export type WebinarState = 'pre' | 'live' | 'post';

export function useWebinarState() {
  const [state, setState] = useState<WebinarState>('pre');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const checkState = () => {
      // 1. Feature de Debug/Preview: Se tiver ?preview=na url, sobrepõe a lógica de tempo
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const forcedPreview = urlParams.get('preview');
        if (forcedPreview === 'pre' || forcedPreview === 'live' || forcedPreview === 'post') {
          setState(forcedPreview as WebinarState);
          return;
        }
      }
      const now = new Date();
      // Datas injetadas via env variables na Vercel (com fallback rígido para evitar falha se o Env não for upado)
      const startStr = process.env.NEXT_PUBLIC_WEBINAR_START || "2026-05-14T21:00:00-03:00";
      const endStr = process.env.NEXT_PUBLIC_WEBINAR_END || "2026-05-14T23:00:00-03:00";

      if (!startStr || !endStr) {
        // Se as datas não estiverem configuradas, caímos por padrão no PRE (sala de espera)
        setState('pre');
        return;
      }

      const startDate = new Date(startStr);
      const endDate = new Date(endStr);

      if (now < startDate) {
        setState('pre');
      } else if (now >= startDate && now <= endDate) {
        setState('live');
      } else {
        setState('post');
      }
    };

    // Checagem imediata
    checkState();

    // Loop a cada 1 segundo (pra tela transicionar cirurgicamente quando der a hora)
    const interval = setInterval(checkState, 1000);
    return () => clearInterval(interval);
    
  }, []);

  return { state, mounted };
}
