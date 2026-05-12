// src/components/admin/AdminRow.jsx
// En desktop: fila de tabla. En mobile: card apilada.

import Badge from "../ui/Badge";
import Button from "../ui/Button";
import C from "../../constants/theme";
import { useBreakpoint } from "../../hooks/useBreakpoint";

const fmt$ = n => `USD ${Number(n).toLocaleString("es-UY")}`;
const fmtKm = n => `${Number(n).toLocaleString("es-UY")} km`;
const esImagen = src => typeof src === "string" && src.startsWith("data:");

const MiniThumb = ({ fotos = [] }) => {
  const primera = fotos[0];
  if (primera && esImagen(primera)) {
    return (
      <img
        src={primera}
        alt="thumb"
        style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 8, border: `1px solid ${C.border}`, flexShrink: 0 }}
      />
    );
  }
  return (
    <div style={{
      width: 48, height: 48, borderRadius: 8, background: C.accentBg,
      border: `1px solid ${C.border}`, display: "flex", alignItems: "center",
      justifyContent: "center", fontSize: 22, flexShrink: 0,
    }}>
      🚗
    </div>
  );
};

export default function AdminRow({ auto, onEditar, onEliminar }) {
  const { isMobile } = useBreakpoint();

  // ── MOBILE: card ──────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <div style={{
        padding: "16px", borderBottom: `1px solid ${C.border}`,
        display: "flex", gap: 12, alignItems: "flex-start",
      }}>
        <MiniThumb fotos={auto.fotos} />

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
            <div style={{ minWidth: 0 }}>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: C.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {auto.marca} {auto.modelo}
              </p>
              <p style={{ margin: "2px 0 6px", fontSize: 12, color: C.muted }}>
                {auto.tipo} · {auto.año || "—"} · {auto.km ? fmtKm(auto.km) : "—"}
              </p>
            </div>
            <Badge bg={auto.destacado ? "#C5972B" : "#9CA3AF"}>
              {auto.destacado ? "⭐" : "—"}
            </Badge>
          </div>

          <p style={{ margin: "0 0 10px", fontSize: 14, fontWeight: 600, color: C.accent }}>
            {auto.precio ? fmt$(auto.precio) : "—"}
          </p>

          <div style={{ display: "flex", gap: 8 }}>
            <Button variant="outlined" onClick={() => onEditar(auto)} style={{ padding: "5px 14px", fontSize: 12, flex: 1 }}>
              Editar
            </Button>
            <Button variant="danger" onClick={() => onEliminar(auto.id)} style={{ padding: "5px 14px", fontSize: 12, flex: 1 }}>
              Eliminar
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ── DESKTOP: fila de tabla ────────────────────────────────────────────────
  return (
    <div style={{
      padding: "12px 20px",
      borderBottom: `1px solid ${C.border}`,
      display: "grid",
      gridTemplateColumns: "2fr 1fr 1fr 1fr 130px",
      gap: 12,
      alignItems: "center",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
        <MiniThumb fotos={auto.fotos} />
        <div style={{ minWidth: 0 }}>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: C.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {auto.marca} {auto.modelo}
          </p>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: C.muted }}>
            {auto.tipo} · {auto.fotos?.length ?? 0} foto{auto.fotos?.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <p style={{ margin: 0, fontSize: 13, color: C.text }}>
        {auto.año || "—"} · {auto.km ? fmtKm(auto.km) : "—"}
      </p>

      <p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: auto.precio ? C.accent : C.muted }}>
        {auto.precio ? fmt$(auto.precio) : "—"}
      </p>

      <Badge bg={auto.destacado ? "#C5972B" : "#9CA3AF"}>
        {auto.destacado ? "⭐ Destacado" : "Normal"}
      </Badge>

      <div style={{ display: "flex", gap: 6 }}>
        <Button variant="outlined" onClick={() => onEditar(auto)} style={{ padding: "5px 12px", fontSize: 12 }}>
          Editar
        </Button>
        <Button variant="danger" onClick={() => onEliminar(auto.id)} style={{ padding: "5px 10px", fontSize: 12 }}>
          ✕
        </Button>
      </div>
    </div>
  );
}