"use client";

import { useState, useEffect } from "react";

export type WebinarState = 'pre' | 'live' | 'post';

export function useWebinarState() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  // Página agora é replay — sempre exibe o vídeo direto
  return { state: 'live' as WebinarState, mounted };
}
