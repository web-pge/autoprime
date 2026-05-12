// src/hooks/useInView.js
// Detecta cuando un elemento entra en el viewport.
// Reutilizable en cualquier página o componente.

import { useState, useEffect, useRef } from "react";

export function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        obs.disconnect(); // solo dispara una vez
      }
    }, { threshold: 0.15, ...options });

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return [ref, inView];
}