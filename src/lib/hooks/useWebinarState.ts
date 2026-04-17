"use client";

import { useState, useEffect } from "react";

export type WebinarState = 'pre' | 'live' | 'post';

export function useWebinarState() {
  const [state, setState] = useState<WebinarState>('pre');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const checkState = () => {
      const now = new Date();
      // Datas injetadas via env variables na Vercel
      // O Next.js congela o valor na build, mas como é NEXT_PUBLIC, funciona safe no cliente
      const startStr = process.env.NEXT_PUBLIC_WEBINAR_START;
      const endStr = process.env.NEXT_PUBLIC_WEBINAR_END;

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
