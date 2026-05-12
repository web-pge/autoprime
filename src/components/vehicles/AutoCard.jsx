// src/components/vehicles/AutoCard.jsx

import { useNavigate } from "react-router-dom";
import Badge from "../ui/Badge";
import C from "../../constants/theme";

const fmt$ = n => `USD ${Number(n).toLocaleString("es-UY")}`;
const fmtKm = n => `${Number(n).toLocaleString("es-UY")} km`;

// Detecta si el string es base64 (foto real) o emoji
const esImagen = src => typeof src === "string" && src.startsWith("data:");

const Thumbnail = ({ fotos = [] }) => {
  const primera = fotos[0];

  if (primera && esImagen(primera)) {
    return (
      <img
        src={primera}
        alt="foto vehículo"
        style={{ width: "100%", height: 140, objectFit: "cover", display: "block" }}
      />
    );
  }

  // Fallback — sin foto
  return (
    <div style={{
      background: C.accentBg, height: 140,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 48, color: C.muted,
    }}>
      🚗
    </div>
  );
};

export default function AutoCard({ auto }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/auto/${auto.id}`)}
      style={{
        background: C.card, borderRadius: 12,
        border: `1px solid ${C.border}`,
        cursor: "pointer", overflow: "hidden",
        transition: "transform .18s, box-shadow .18s",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(27,42,74,0.13)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Thumbnail */}
      <div style={{ position: "relative" }}>
        <Thumbnail fotos={auto.fotos} />
        {auto.destacado && (
          <div style={{ position: "absolute", top: 10, right: 10 }}>
            <Badge bg={C.gold}>⭐ Destacado</Badge>
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: "14px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <p style={{ margin: 0, fontSize: 15, fontWeight: 500, color: C.text }}>
              {auto.marca} {auto.modelo}
            </p>
            <p style={{ margin: "2px 0 0", fontSize: 13, color: C.muted }}>
              {auto.año} · {fmtKm(auto.km)}
            </p>
          </div>
          <p style={{ margin: 0, fontSize: 16, fontWeight: 500, color: C.accent }}>
            {fmt$(auto.precio)}
          </p>
        </div>
        <div style={{ marginTop: 10, display: "flex", gap: 6, flexWrap: "wrap" }}>
          <Badge bg={C.navyL}>{auto.tipo}</Badge>
          <Badge bg="#4B5563">{auto.combustible}</Badge>
        </div>
      </div>
    </div>
  );
}