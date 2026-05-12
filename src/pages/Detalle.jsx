// src/pages/Detalle.jsx

import { useParams, useNavigate } from "react-router-dom";
import AutoGallery from "../components/vehicles/AutoGallery";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import C from "../constants/theme";
import { useVehiculos } from "../hooks/useVehiculos";

const fmt$ = n => `USD ${Number(n).toLocaleString("es-UY")}`;
const fmtKm = n => `${Number(n).toLocaleString("es-UY")} km`;

export default function Detalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { autos, loading } = useVehiculos();

  if (loading) return (
    <div style={{ textAlign: "center", padding: "80px 0", color: C.muted }}>
      <div style={{ fontSize: 40 }}>🔄</div>
      <p style={{ marginTop: 12 }}>Cargando...</p>
    </div>
  );

  const auto = autos.find(a => String(a.id) === String(id));

  if (!auto) return (
    <div style={{ textAlign: "center", padding: "80px 24px", color: C.muted }}>
      <div style={{ fontSize: 48 }}>🚫</div>
      <p style={{ marginTop: 12 }}>Vehículo no encontrado.</p>
      <Button onClick={() => navigate("/catalogo")} style={{ marginTop: 16 }}>
        Volver al catálogo
      </Button>
    </div>
  );

  const specs = [
    ["Tipo",        auto.tipo],
    ["Combustible", auto.combustible],
    ["Transmisión", auto.transmision],
  ];

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "32px 24px" }}>
      <button
        onClick={() => navigate("/catalogo")}
        style={{ background: "none", border: "none", cursor: "pointer", color: C.accent, fontSize: 14, padding: 0, marginBottom: 20 }}
      >
        ← Volver al catálogo
      </button>

      <div style={{ background: C.card, borderRadius: 12, border: `1px solid ${C.border}`, overflow: "hidden" }}>
        {/* Galería */}
        <AutoGallery fotos={auto.fotos} />

        <div style={{ padding: "24px 28px" }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
            <div>
              <h1 style={{ margin: 0, fontSize: 24, fontWeight: 500, color: C.text }}>
                {auto.marca} {auto.modelo}
              </h1>
              <p style={{ margin: "4px 0 0", color: C.muted, fontSize: 14 }}>
                {auto.año} · {fmtKm(auto.km)} · {auto.color}
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ margin: 0, fontSize: 26, fontWeight: 500, color: C.accent }}>
                {fmt$(auto.precio)}
              </p>
              {auto.destacado && <Badge bg={C.gold}>⭐ Destacado</Badge>}
            </div>
          </div>

          {/* Descripción */}
          <p style={{ margin: "16px 0", color: C.text, lineHeight: 1.6, fontSize: 14 }}>
            {auto.desc}
          </p>

          {/* Specs */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, margin: "20px 0" }}>
            {specs.map(([k, v]) => (
              <div key={k} style={{ background: C.bg, borderRadius: 8, padding: "12px 14px" }}>
                <p style={{ margin: 0, fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: 0.5 }}>{k}</p>
                <p style={{ margin: "4px 0 0", fontWeight: 500, fontSize: 14, color: C.text }}>{v}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Button onClick={() => navigate("/contacto")} fullWidth style={{ padding: 13, fontSize: 15 }}>
            Consultar por este vehículo
          </Button>
        </div>
      </div>
    </div>
  );
}