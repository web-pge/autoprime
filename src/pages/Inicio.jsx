// src/pages/Inicio.jsx

import { useNavigate } from "react-router-dom";
import AutoCard from "../components/vehicles/AutoCard";
import Button from "../components/ui/Button";
import C from "../constants/theme";
import { useVehiculos } from "../hooks/useVehiculos";

const FEATURES = [
  { icon: "📋", title: "Catálogo siempre actualizado",  desc: "Unidades gestionadas en tiempo real." },
  { icon: "💬", title: "Consultá sin compromiso",       desc: "Un asesor te contacta a la brevedad." },
  { icon: "🔒", title: "Información transparente",      desc: "Precios y estado verificados en cada publicación." },
];

export default function Inicio() {
  const navigate = useNavigate();
  const { autos } = useVehiculos();
  const destacados = autos.filter(a => a.destacado).slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <div
        style={{
          background: `linear-gradient(135deg, ${C.navy} 60%, ${C.navyL})`,
          padding: "64px 24px 56px",
          textAlign: "center",
        }}
      >
        <p style={{ color: "#E8A838", margin: "0 0 8px", fontSize: 13, fontWeight: 500, letterSpacing: 2, textTransform: "uppercase" }}>
          Automotora Online
        </p>
        <h1 style={{ color: "#fff", fontSize: 36, fontWeight: 500, margin: "0 0 12px", lineHeight: 1.2 }}>
          Encontrá tu próximo<br />auto sin salir de casa
        </h1>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 16, margin: "0 0 28px", maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
          Catálogo actualizado, precios transparentes y atención personalizada. Todo desde tu pantalla.
        </p>
        <Button onClick={() => navigate("/catalogo")} style={{ padding: "13px 32px", fontSize: 15 }}>
          Ver catálogo completo →
        </Button>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
        {/* Destacados */}
        <h2 style={{ fontSize: 20, fontWeight: 500, color: C.text, margin: "0 0 20px" }}>
          Vehículos destacados
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
          {destacados.map(a => <AutoCard key={a.id} auto={a} />)}
        </div>

        {/* Features */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginTop: 40 }}>
          {FEATURES.map(({ icon, title, desc }) => (
            <div key={title} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "20px 18px" }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{icon}</div>
              <p style={{ margin: "0 0 6px", fontWeight: 500, fontSize: 15, color: C.text }}>{title}</p>
              <p style={{ margin: 0, fontSize: 13, color: C.muted, lineHeight: 1.5 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}