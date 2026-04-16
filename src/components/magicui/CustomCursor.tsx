"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);

  const springX = useSpring(-100, { stiffness: 1200, damping: 30, mass: 0.1 });
  const springY = useSpring(-100, { stiffness: 1200, damping: 30, mass: 0.1 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      springX.set(e.clientX);
      springY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'button' || 
        target.tagName.toLowerCase() === 'a' || 
        target.closest('button') || 
        target.closest('a')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [springX, springY]);

  if (typeof window !== "undefined" && window.innerWidth < 1024) return null;

  return (
    <>
      {/* Quando HOVERING, desligamos o mouse nativo para mostrar APENAS nossa seta dourada */}
      {isHovering && (
        <style dangerouslySetInnerHTML={{__html: `* { cursor: none !important; }`}} />
      )}

      {/* A Seta Customizada! Opacidade 0 até Hoverizar. */}
      <motion.div
        className="fixed pointer-events-none z-[99999] hidden lg:flex origin-top-left"
        style={{
          left: 0,
          top: 0,
          x: springX,
          y: springY,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovering ? 1 : 0, scale: isHovering ? 1 : 0.5 }}
        transition={{ duration: 0.1 }}
      >
        {/* Usando o Path exato do Mouse System clássico, sem deformações de triângulo cego */}
        <svg 
          width="28" 
          height="28" 
          viewBox="0 0 28 28" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: "drop-shadow(0px 3px 6px rgba(0,0,0,0.5))" }}
        >
          <path 
            d="M6 3.5L22 11.5L14.5 13L11.5 21.5L6 3.5Z" 
            fill="#C9A961" 
            stroke="#FFFFFF" 
            strokeWidth="1.5"
            strokeLinejoin="round" 
          />
        </svg>
      </motion.div>
    </>
  );
};
