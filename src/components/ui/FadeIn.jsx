// src/components/ui/FadeIn.jsx
// Wrapper que anima sus hijos con fade + slide al entrar en el viewport.
// Reutilizable en cualquier página.
//
// Props:
//   delay     — segundos de retraso (default 0)
//   direction — "up" | "left" | "right" | "none"
//   style     — estilos extra para el wrapper

import { useInView } from "../../hooks/useInView";

export default function FadeIn({ children, delay = 0, direction = "up", style = {} }) {
  const [ref, inView] = useInView();

  const translate =
    direction === "up"    ? "translateY(32px)"  :
    direction === "left"  ? "translateX(-32px)" :
    direction === "right" ? "translateX(32px)"  : "none";

  return (
    <div
      ref={ref}
      style={{
        opacity:    inView ? 1 : 0,
        transform:  inView ? "none" : translate,
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}