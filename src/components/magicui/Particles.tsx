"use client";

import React, { useEffect, useRef } from "react";

interface ParticlesProps {
  className?: string;
  quantity?: number;
  color?: string;
  size?: number;
}

export const Particles: React.FC<ParticlesProps> = ({
  className = "",
  quantity = 80,
  color = "#C9A961",
  size = 1.2,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<any[]>([]);
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
    }
    initCanvas();
    animate();
    window.addEventListener("resize", initCanvas);

    return () => {
      window.removeEventListener("resize", initCanvas);
    };
  }, []);

  const initCanvas = () => {
    resizeCanvas();
    drawParticles();
  };

  const resizeCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      circles.current.length = 0;
      canvasSize.current.w = canvasContainerRef.current.offsetWidth;
      canvasSize.current.h = canvasContainerRef.current.offsetHeight;
      canvasRef.current.width = canvasSize.current.w;
      canvasRef.current.height = canvasSize.current.h;
    }
  };

  const circleParams = (): any => {
    const x = Math.floor(Math.random() * canvasSize.current.w);
    const y = Math.floor(Math.random() * canvasSize.current.h);
    const s = Math.random() * size + 0.2;
    const alpha = 0;
    const targetAlpha = parseFloat((Math.random() * 0.8 + 0.1).toFixed(1));
    const dx = (Math.random() - 0.5) * 0.3;
    const dy = (Math.random() * 0.5 + 0.2); // Caindo como fuligem
    return { x, y, s, alpha, targetAlpha, dx, dy };
  };

  const drawCircle = (circle: any, update = false) => {
    if (context.current) {
      const { x, y, s, alpha } = circle;
      context.current.beginPath();
      context.current.arc(x, y, s, 0, 2 * Math.PI);
      context.current.fillStyle = `${color}${Math.floor(alpha * 255).toString(16).padStart(2, "0")}`;
      context.current.fill();

      if (!update) {
        circles.current.push(circle);
      }
    }
  };

  const clearContext = () => {
    if (context.current) {
      context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);
    }
  };

  const drawParticles = () => {
    clearContext();
    for (let i = 0; i < quantity; i++) {
      drawCircle(circleParams());
    }
  };

  const animate = () => {
    clearContext();
    circles.current.forEach((circle: any) => {
      // Movimento cadenciado
      circle.y += circle.dy;
      circle.x += circle.dx;
      // Fade In e Out sutil do brilho
      if (circle.alpha < circle.targetAlpha) circle.alpha += 0.01;
      
      // Reseta se passar da tela
      if (circle.y > canvasSize.current.h) {
        circle.y = 0;
        circle.x = Math.floor(Math.random() * canvasSize.current.w);
      }
      if (circle.x > canvasSize.current.w || circle.x < 0) {
        circle.x = Math.floor(Math.random() * canvasSize.current.w);
      }
      
      drawCircle(circle, true);
    });
    window.requestAnimationFrame(animate);
  };

  return (
    <div className={className} ref={canvasContainerRef} aria-hidden="true" style={{ pointerEvents: 'none' }}>
      <canvas ref={canvasRef} />
    </div>
  );
};
