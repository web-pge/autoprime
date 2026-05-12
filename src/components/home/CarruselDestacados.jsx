// src/components/home/CarruselDestacados.jsx

import { useState, useEffect } from "react";
import FadeIn from "../ui/FadeIn";
import AutoCard from "../vehicles/AutoCard";
import C from "../../constants/theme";

export default function CarruselDestacados({ autos = [] }) {
  const [slide, setSlide] = useState(0);

  // Autoplay cada 4 segundos
  useEffect(() => {
    if (!autos.length) return;
    const t = setInterval(() => setSlide(s => (s + 1) % autos.length), 4000);
    return () => clearInterval(t);
  }, [autos.length]);

  const prev = () => setSlide(s => (s - 1 + autos.length) % autos.length);
  const next = () => setSlide(s => (s + 1) % autos.length);

  if (!autos.length) return null;

  return (
    <div style={{ maxWidth: 1000, margin: "88px auto 0", padding: "0 24px" }}>
      <FadeIn direction="up">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: C.text, margin: 0 }}>
              Destacados de la semana ⭐
            </h2>
            <p style={{ color: C.muted, fontSize: 13, marginTop: 6 }}>
              {autos.length} vehículo{autos.length !== 1 ? "s" : ""} seleccionado{autos.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="arrow-btn" onClick={prev}>←</button>
            <button className="arrow-btn" onClick={next}>→</button>
          </div>
        </div>
      </FadeIn>

      {/* Viewport */}
      <div style={{ overflow: "hidden", borderRadius: 16 }}>
        <div style={{
          display: "flex", gap: 24,
          transform: `translateX(-${slide * 304}px)`,
          transition: "transform 0.55s cubic-bezier(0.25, 1, 0.5, 1)",
          width: `${autos.length * 304}px`,
          padding: "8px 4px",
        }}>
          {autos.map(auto => (
            <div key={auto.id} style={{ width: 280, flexShrink: 0 }}>
              <AutoCard auto={auto} />
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 24 }}>
        {autos.map((_, i) => (
          <button
            key={i}
            className={`dot-nav ${slide === i ? "active" : ""}`}
            onClick={() => setSlide(i)}
          />
        ))}
      </div>
    </div>
  );
}