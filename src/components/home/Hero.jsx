// src/components/home/Hero.jsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import C from "../../constants/theme";

const STATS = [
  ["🚗", "200+ autos vendidos"],
  ["⭐", "4.9 valoración"],
  ["🏦", "Financiación en el día"],
];

export default function Hero({ scrollY = 0 }) {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      backgroundImage: `linear-gradient(135deg, rgba(27,42,74,0.82) 0%, rgba(44,62,93,0.65) 100%), url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop')`,
      backgroundSize: "cover",
      backgroundPosition: `center ${scrollY * 0.35}px`,
      padding: "130px 24px 110px",
      color: "#fff",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Glow decorativo */}
      <div style={{
        position: "absolute", top: -100, right: -100,
        width: 500, height: 500, borderRadius: "50%",
        background: `radial-gradient(circle, rgba(197,151,43,0.12) 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />

      <div style={{
        maxWidth: 1000, margin: "0 auto",
        display: "flex", flexWrap: "wrap",
        gap: 48, alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Copy */}
        <div style={{ flex: "1 1 440px" }}>
          <p style={{
            color: C.gold, margin: "0 0 16px", fontSize: 12,
            fontWeight: 700, letterSpacing: 3, textTransform: "uppercase",
            opacity: ready ? 1 : 0,
            animation: ready ? "heroBadge .6s ease forwards" : "none",
          }}>
            ✦ Automotora Online · Uruguay
          </p>

          <h1 style={{
            fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700,
            margin: "0 0 20px", lineHeight: 1.12, letterSpacing: "-1px",
            textShadow: "0 2px 20px rgba(0,0,0,0.3)",
            opacity: ready ? 1 : 0,
            animation: ready ? "heroFadeUp .7s ease .1s both" : "none",
          }}>
            El auto que querés,<br />
            <span style={{ color: C.gold }}>con la tranquilidad</span><br />
            que buscás.
          </h1>

          <p style={{
            color: "rgba(255,255,255,0.88)", fontSize: 16,
            margin: "0 0 36px", lineHeight: 1.7, maxWidth: 460,
            opacity: ready ? 1 : 0,
            animation: ready ? "heroFadeUp .7s ease .25s both" : "none",
          }}>
            Comprá, vendé o permutá de forma 100% transparente. Garantía mecánica escrita por un año y financiación bancaria pre-aprobada en el día.
          </p>

          <div style={{
            display: "flex", gap: 14, flexWrap: "wrap",
            opacity: ready ? 1 : 0,
            animation: ready ? "heroFadeUp .7s ease .4s both" : "none",
          }}>
            <button className="btn-gold" onClick={() => navigate("/catalogo")}>Ver Catálogo 🚗</button>
            <button className="btn-ghost" onClick={() => navigate("/contacto")}>Consultar ahora 💬</button>
          </div>

          {/* Stats */}
          <div style={{
            display: "flex", gap: 12, marginTop: 40, flexWrap: "wrap",
            opacity: ready ? 1 : 0,
            animation: ready ? "heroFadeUp .7s ease .55s both" : "none",
          }}>
            {STATS.map(([icon, txt]) => (
              <div key={txt} className="stat-pill">
                <span>{icon}</span>
                <span style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.9)" }}>{txt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card flotante */}
        <div style={{
          flex: "1 1 300px", display: "flex", justifyContent: "center",
          opacity: ready ? 1 : 0,
          animation: ready ? "heroFadeUp .8s ease .3s both" : "none",
        }}>
          <div className="featured-card" style={{
            background: "rgba(27,42,74,0.4)",
            border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: 24, padding: "32px 28px",
            backdropFilter: "blur(12px)",
            textAlign: "center", width: "100%", maxWidth: 300,
            boxShadow: "0 24px 60px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}>
            <span style={{
              background: C.gold, color: "#fff", padding: "4px 14px",
              borderRadius: 100, fontSize: 10, fontWeight: 700,
              letterSpacing: 1.5, textTransform: "uppercase",
            }}>
              ⭐ Destacado del mes
            </span>
            <div style={{ fontSize: 88, margin: "20px 0 12px", filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))" }}>
              🏎️
            </div>
            <h3 style={{ margin: "0 0 6px", fontSize: 20, fontWeight: 600, color: "#fff" }}>
              Porsche 911 Carrera S
            </h3>
            <p style={{ margin: "0 0 20px", color: "rgba(255,255,255,0.6)", fontSize: 13 }}>
              2023 · 12.000 km · Automático
            </p>
            <p style={{ margin: 0, color: C.gold, fontSize: 22, fontWeight: 700 }}>USD 125.000</p>
          </div>
        </div>
      </div>
    </div>
  );
}