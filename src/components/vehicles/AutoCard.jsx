// src/components/vehicles/AutoCard.jsx

import { useState }    from "react";
import { useNavigate } from "react-router-dom";
import { useInView }   from "../../hooks/useInView";
import Badge           from "../ui/Badge";
import C               from "../../constants/theme";

const fmt$ = n => n ? `USD ${Number(n).toLocaleString("es-UY")}` : "Consultar precio";
const fmtKm = n => n ? `${Number(n).toLocaleString("es-UY")} km` : "—";
const esImagen = src => typeof src === "string" && src.startsWith("data:");

// Delay escalonado por índice — máximo 400ms para no aburrir
const getDelay = i => Math.min(i * 0.06, 0.4);

const Thumbnail = ({ fotos = [], hover }) => {
  const primera = fotos[0];
  if (primera && esImagen(primera)) {
    return (
      <img
        src={primera}
        alt="foto vehículo"
        style={{
          width: "100%", height: 160, objectFit: "cover", display: "block",
          transition: "transform .4s ease",
          transform: hover ? "scale(1.06)" : "scale(1)",
        }}
      />
    );
  }
  return (
    <div style={{
      background: C.accentBg, height: 160,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 56, transition: "transform .4s ease",
      transform: hover ? "scale(1.08)" : "scale(1)",
    }}>
      🚗
    </div>
  );
};

export default function AutoCard({ auto, index = 0 }) {
  const navigate  = useNavigate();
  const [ref, inView] = useInView();
  const [hover, setHover] = useState(false);

  return (
    <div
      ref={ref}
      onClick={() => navigate(`/auto/${auto.id}`)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: C.card, borderRadius: 14,
        border: `1.5px solid ${hover ? C.accent : C.border}`,
        cursor: "pointer", overflow: "hidden",
        transition: "transform .25s ease, box-shadow .25s ease, border-color .25s ease, opacity .55s ease",
        transform: inView
          ? hover ? "translateY(-5px)" : "translateY(0)"
          : "translateY(24px)",
        opacity:    inView ? 1 : 0,
        transitionDelay: inView ? `${getDelay(index)}s` : "0s",
        boxShadow: hover
          ? "0 16px 40px rgba(27,42,74,0.14)"
          : "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      {/* Imagen con overflow hidden para el zoom */}
      <div style={{ overflow: "hidden", position: "relative" }}>
        <Thumbnail fotos={auto.fotos} hover={hover} />

        {/* Badge destacado */}
        {auto.destacado && (
          <div style={{ position: "absolute", top: 10, right: 10 }}>
            <Badge bg={C.gold}>⭐ Destacado</Badge>
          </div>
        )}

        {/* Overlay "Ver detalle" al hacer hover */}
        <div style={{
          position: "absolute", inset: 0,
          background: "rgba(27,42,74,0.55)",
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: hover ? 1 : 0,
          transition: "opacity .25s ease",
        }}>
          <span style={{
            background: "#fff", color: C.navy,
            padding: "8px 20px", borderRadius: 100,
            fontSize: 13, fontWeight: 700,
            transform: hover ? "translateY(0)" : "translateY(8px)",
            transition: "transform .25s ease",
          }}>
            Ver detalle →
          </span>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: "14px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <p style={{ margin: 0, fontSize: 15, fontWeight: 600, color: C.text }}>
              {auto.marca} {auto.modelo}
            </p>
            <p style={{ margin: "3px 0 0", fontSize: 13, color: C.muted }}>
              {auto.año} · {fmtKm(auto.km)}
            </p>
          </div>
          <p style={{
            margin: 0, fontSize: 15, fontWeight: 700,
            color: hover ? C.gold : C.accent,
            transition: "color .25s ease",
          }}>
            {fmt$(auto.precio)}
          </p>
        </div>

        <div style={{ marginTop: 10, display: "flex", gap: 6, flexWrap: "wrap" }}>
          <Badge bg={C.navyL}>{auto.tipo}</Badge>
          <Badge bg="#4B5563">{auto.combustible}</Badge>
        </div>

        {/* Barra inferior animada */}
        <div style={{
          marginTop: 12, height: 2, borderRadius: 2,
          background: `linear-gradient(90deg, ${C.accent}, ${C.gold})`,
          transform: `scaleX(${hover ? 1 : 0})`,
          transformOrigin: "left",
          transition: "transform .35s ease",
        }} />
      </div>
    </div>
  );
}