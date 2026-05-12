// src/components/vehicles/AutoFilters.jsx

import { useState } from "react";
import Select  from "../ui/Select";
import C       from "../../constants/theme";
import { TIPOS } from "../../constants/vehicleOptions";

const fmt$ = n => `USD ${Number(n).toLocaleString("es-UY")}`;

export default function AutoFilters({ autos, filters, onChange, total }) {
  const { tipo, marca, precioMax } = filters;
  const [focused, setFocused] = useState(null);

  const marcas = ["Todas", ...Array.from(new Set(autos.map(a => a.marca)))];
  const tipos  = ["Todos", ...TIPOS];

  const fieldStyle = key => ({
    flex: 1, minWidth: 130,
    transform: focused === key ? "translateY(-2px)" : "none",
    transition: "transform .2s ease",
  });

  return (
    <div style={{
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 14,
      padding: "20px 24px",
      marginBottom: 24,
      boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
    }}>
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "flex-end" }}>

        {/* Tipo */}
        <div
          style={fieldStyle("tipo")}
          onFocus={() => setFocused("tipo")}
          onBlur={() => setFocused(null)}
        >
          <label style={{ fontSize: 11, color: C.muted, display: "block", marginBottom: 6, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>
            Tipo
          </label>
          <Select value={tipo} onChange={e => onChange({ ...filters, tipo: e.target.value })} opts={tipos} />
        </div>

        {/* Marca */}
        <div
          style={fieldStyle("marca")}
          onFocus={() => setFocused("marca")}
          onBlur={() => setFocused(null)}
        >
          <label style={{ fontSize: 11, color: C.muted, display: "block", marginBottom: 6, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>
            Marca
          </label>
          <Select value={marca} onChange={e => onChange({ ...filters, marca: e.target.value })} opts={marcas} />
        </div>

        {/* Precio */}
        <div style={{ flex: 2, minWidth: 200 }}>
          <label style={{ fontSize: 11, color: C.muted, display: "block", marginBottom: 6, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>
            Precio máximo — <span style={{ color: C.accent }}>{fmt$(precioMax)}</span>
          </label>
          <input
            type="range" min={10000} max={50000} step={500}
            value={precioMax}
            onChange={e => onChange({ ...filters, precioMax: Number(e.target.value) })}
            style={{ width: "100%", accentColor: C.accent }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: C.muted, marginTop: 4 }}>
            <span>USD 10.000</span>
            <span>USD 50.000</span>
          </div>
        </div>

        {/* Resultados + reset */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, minWidth: 100 }}>
          <span style={{
            fontSize: 22, fontWeight: 700, color: C.text,
            transition: "color .2s",
          }}>
            {total}
          </span>
          <span style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: 0.5 }}>
            resultado{total !== 1 ? "s" : ""}
          </span>
        </div>
      </div>
    </div>
  );
}