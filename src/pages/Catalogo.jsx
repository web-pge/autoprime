// src/pages/Catalogo.jsx

import { useState, useMemo } from "react";
import AutoCard from "../components/vehicles/AutoCard";
import AutoFilters from "../components/vehicles/AutoFilters";
import C from "../constants/theme";
import { useVehiculos } from "../hooks/useVehiculos";

const FILTERS_INIT = { tipo: "Todos", marca: "Todas", precioMax: 50000 };

export default function Catalogo() {
  const { autos, loading } = useVehiculos();
  const [filters, setFilters] = useState(FILTERS_INIT);

  const filtrados = useMemo(() => autos.filter(a =>
    (filters.tipo  === "Todos"  || a.tipo  === filters.tipo) &&
    (filters.marca === "Todas"  || a.marca === filters.marca) &&
    a.precio <= filters.precioMax
  ), [autos, filters]);

  if (loading) return (
    <div style={{ textAlign: "center", padding: "80px 0", color: C.muted }}>
      <div style={{ fontSize: 40 }}>🔄</div>
      <p style={{ marginTop: 12 }}>Cargando catálogo...</p>
    </div>
  );

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 24px" }}>
      <h2 style={{ fontSize: 22, fontWeight: 500, color: C.text, margin: "0 0 20px" }}>
        Catálogo de vehículos
      </h2>

      <AutoFilters
        autos={autos}
        filters={filters}
        onChange={setFilters}
        total={filtrados.length}
      />

      {filtrados.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: C.muted }}>
          <div style={{ fontSize: 48 }}>🔍</div>
          <p style={{ marginTop: 12 }}>No hay vehículos con esos filtros.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
          {filtrados.map(a => <AutoCard key={a.id} auto={a} />)}
        </div>
      )}
    </div>
  );
}