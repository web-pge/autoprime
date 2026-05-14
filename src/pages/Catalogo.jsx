// src/pages/Catalogo.jsx

import { useState, useMemo } from "react";
import AutoCard     from "../components/vehicles/AutoCard";
import AutoFilters  from "../components/vehicles/AutoFilters";
import FadeIn       from "../components/ui/FadeIn";
import C            from "../constants/theme";
import { useVehiculos } from "../hooks/useVehiculos";

const PRECIO_MAX_SLIDER = 50000;
const FILTERS_INIT = { tipo: "Todos", marca: "Todas", precioMax: PRECIO_MAX_SLIDER };

// Skeleton de una card mientras carga
const CardSkeleton = () => (
  <div style={{
    background: C.card, borderRadius: 12,
    border: `1px solid ${C.border}`, overflow: "hidden",
  }}>
    <div style={{ height: 140, background: `linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%)`, backgroundSize: "400px 100%", animation: "shimmerSkeleton 1.4s infinite" }} />
    <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ height: 16, width: "70%", borderRadius: 4, background: "#eee", animation: "shimmerSkeleton 1.4s infinite" }} />
      <div style={{ height: 12, width: "45%", borderRadius: 4, background: "#eee", animation: "shimmerSkeleton 1.4s .1s infinite" }} />
      <div style={{ height: 12, width: "30%", borderRadius: 4, background: "#eee", marginTop: 4, animation: "shimmerSkeleton 1.4s .2s infinite" }} />
    </div>
  </div>
);

export default function Catalogo() {
  const { autos, loading } = useVehiculos();
  const [filters, setFilters] = useState(FILTERS_INIT);

  const filtrados = useMemo(() => autos.filter(a =>
    (filters.tipo  === "Todos"  || a.tipo  === filters.tipo) &&
    (filters.marca === "Todas"  || a.marca === filters.marca) &&
    (filters.precioMax >= PRECIO_MAX_SLIDER || Number(a.precio) <= filters.precioMax)
  ), [autos, filters]);

  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
      <style>{`
        @keyframes shimmerSkeleton {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navyL} 100%)`,
        padding: "48px 24px 40px",
      }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <FadeIn direction="up">
            <p style={{ color: C.gold, fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 10px" }}>
              ✦ Catálogo completo
            </p>
            <h1 style={{ color: "#fff", fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700, margin: "0 0 10px", letterSpacing: -0.5 }}>
              Encontrá tu próximo auto
            </h1>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 15, margin: 0 }}>
              {autos.length} vehículo{autos.length !== 1 ? "s" : ""} disponible{autos.length !== 1 ? "s" : ""} · Precios transparentes
            </p>
          </FadeIn>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 24px" }}>
        {/* Filtros */}
        <div style={{ animation: "fadeSlideDown .5s ease both" }}>
          <AutoFilters
            autos={autos}
            filters={filters}
            onChange={setFilters}
            total={filtrados.length}
          />
        </div>

        {/* Skeletons mientras carga */}
        {loading && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
            {Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)}
          </div>
        )}

        {/* Sin resultados */}
        {!loading && filtrados.length === 0 && (
          <FadeIn direction="up">
            <div style={{ textAlign: "center", padding: "80px 0", color: C.muted }}>
              <div style={{ fontSize: 56 }}>🔍</div>
              <h3 style={{ margin: "16px 0 8px", color: C.text, fontWeight: 600 }}>Sin resultados</h3>
              <p style={{ margin: "0 0 20px", fontSize: 14 }}>No hay vehículos con esos filtros.</p>
              <button
                onClick={() => setFilters(FILTERS_INIT)}
                style={{
                  background: C.accent, color: "#fff", border: "none",
                  padding: "10px 24px", borderRadius: 8, cursor: "pointer",
                  fontSize: 14, fontWeight: 500,
                }}
              >
                Limpiar filtros
              </button>
            </div>
          </FadeIn>
        )}

        {/* Grid de cards */}
        {!loading && filtrados.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
            {filtrados.map((auto, i) => (
              <AutoCard key={auto.id} auto={auto} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}