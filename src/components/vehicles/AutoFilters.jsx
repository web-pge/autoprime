// src/components/vehicles/AutoFilters.jsx

import Select from "../ui/Select";
import C from "../../constants/theme";
import { TIPOS } from "../../constants/vehicleOptions";

const fmt$ = n => `USD ${Number(n).toLocaleString("es-UY")}`;

export default function AutoFilters({ autos, filters, onChange, total }) {
  const { tipo, marca, precioMax } = filters;

  const marcasDisponibles = ["Todas", ...Array.from(new Set(autos.map(a => a.marca)))];
  const tiposDisponibles  = ["Todos", ...TIPOS];

  return (
    <div
      style={{
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: 10,
        padding: "16px 20px",
        marginBottom: 24,
        display: "flex",
        gap: 20,
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      {/* Tipo */}
      <div style={{ flex: 1, minWidth: 130 }}>
        <label style={{ fontSize: 12, color: C.muted, display: "block", marginBottom: 4 }}>Tipo</label>
        <Select
          value={tipo}
          onChange={e => onChange({ ...filters, tipo: e.target.value })}
          opts={tiposDisponibles}
        />
      </div>

      {/* Marca */}
      <div style={{ flex: 1, minWidth: 130 }}>
        <label style={{ fontSize: 12, color: C.muted, display: "block", marginBottom: 4 }}>Marca</label>
        <Select
          value={marca}
          onChange={e => onChange({ ...filters, marca: e.target.value })}
          opts={marcasDisponibles}
        />
      </div>

      {/* Precio */}
      <div style={{ flex: 2, minWidth: 180 }}>
        <label style={{ fontSize: 12, color: C.muted, display: "block", marginBottom: 4 }}>
          Precio máximo: <strong>{fmt$(precioMax)}</strong>
        </label>
        <input
          type="range"
          min={10000}
          max={50000}
          step={500}
          value={precioMax}
          onChange={e => onChange({ ...filters, precioMax: Number(e.target.value) })}
          style={{ width: "100%" }}
        />
      </div>

      {/* Resultados */}
      <p style={{ margin: 0, fontSize: 13, color: C.muted, whiteSpace: "nowrap" }}>
        {total} resultado{total !== 1 ? "s" : ""}
      </p>
    </div>
  );
}