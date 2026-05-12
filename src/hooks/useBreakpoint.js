// src/hooks/useBreakpoint.js
// Devuelve el breakpoint actual y helpers booleanos.
// Usarlo en cualquier componente que necesite adaptarse al tamaño de pantalla.

import { useState, useEffect } from "react";

const BREAKPOINTS = { sm: 640, md: 768, lg: 1024 };

function getBreakpoint(w) {
  if (w < BREAKPOINTS.sm) return "xs";
  if (w < BREAKPOINTS.md) return "sm";
  if (w < BREAKPOINTS.lg) return "md";
  return "lg";
}

export function useBreakpoint() {
  const [bp, setBp] = useState(() => getBreakpoint(window.innerWidth));

  useEffect(() => {
    const onResize = () => setBp(getBreakpoint(window.innerWidth));
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return {
    bp,
    isMobile:  bp === "xs" || bp === "sm",
    isTablet:  bp === "md",
    isDesktop: bp === "lg",
  };
}