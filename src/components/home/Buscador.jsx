// src/components/home/Buscador.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FadeIn from "../ui/FadeIn";
import Select from "../ui/Select";
import C from "../../constants/theme";
import { TIPOS, TRANSMISIONES, PRESUPUESTOS } from "../../constants/vehicleOptions";

export default function Buscador() {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState({
    tipo:        TIPOS[1],
    transmision: TRANSMISIONES[1],
    presupuesto: PRESUPUESTOS[2],
  });

  const set = k => e => setBusqueda(p => ({ ...p, [k]: e.target.value }));

  const CAMPOS = [
    ["1. Tipo de vehículo", "tipo",        TIPOS],
    ["2. Transmisión",      "transmision",  TRANSMISIONES],
    ["3. Presupuesto",      "presupuesto",  PRESUPUESTOS],
  ];

  return (
    <FadeIn direction="up" style={{ maxWidth: 1000, margin: "60px auto 0", padding: "0 24px" }}>
      <div style={{
        background: C.card, borderRadius: 20,
        boxShadow: "0 8px 32px rgba(27,42,74,0.06)",
        border: `1px solid ${C.border}`, padding: "32px 36px",
      }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 24 }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 20, fontWeight: 600, color: C.text }}>
              Encontrá tu próximo auto 🔍
            </h3>
            <p style={{ margin: "4px 0 0", color: C.muted, fontSize: 13 }}>
              Decinos qué necesitás y te mostramos las mejores opciones.
            </p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 16, alignItems: "flex-end" }}>
          {CAMPOS.map(([label, key, opts], i) => (
            <div key={key} style={{ opacity: 0, animation: `heroFadeUp .5s ease ${0.1 + i * 0.1}s both` }}>
              <label style={{ fontSize: 11, color: C.muted, display: "block", marginBottom: 6, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>
                {label}
              </label>
              <Select value={busqueda[key]} onChange={set(key)} opts={opts} />
            </div>
          ))}
          <button className="search-btn" onClick={() => navigate("/catalogo")}>
            Buscar →
          </button>
        </div>
      </div>
    </FadeIn>
  );
}