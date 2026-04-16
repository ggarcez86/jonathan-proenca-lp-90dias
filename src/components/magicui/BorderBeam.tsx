"use client";

import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  duration?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
  children?: React.ReactNode;
}

export const BorderBeam = ({
  className,
  duration = 8,
  borderWidth = 3,
  colorFrom = "#C9A961", // Gold
  colorTo = "transparent",
  children
}: BorderBeamProps) => {
  return (
    <div className={cn("relative rounded-[inherit]", className)}>
      {/* 
        A MÁGICA REAL: Usamos MaskComposite.
        Isso recorta nativamente o "recheio" do formulário onde a luz rodaria.
        O gradiente amarelo/radar NUNCA VAI VAZAR para dentro do form.
        Ele vai existir APENAS matematicamente na espessura da borda.
      */}
      <div 
        className="absolute inset-0 pointer-events-none rounded-[inherit]"
        style={{
          border: `${borderWidth}px solid transparent`,
          mask: `linear-gradient(white, white) padding-box, linear-gradient(white, white) border-box`,
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
        }}
      >
        <div 
           className="absolute w-[200%] h-[200%] left-[-50%] top-[-50%] animate-[spin_10s_linear_infinite]"
           style={{
             background: `conic-gradient(from 90deg at 50% 50%, ${colorTo} 0%, ${colorTo} 70%, ${colorFrom} 100%)`,
             animationDuration: `${duration}s`
           }}
        />
      </div>

      <div className="relative z-20 rounded-[inherit]">
        {children}
      </div>
    </div>
  );
};
