// src/components/home/TrustBar.jsx
// Franja de confianza debajo del hero.

import FadeIn from "../ui/FadeIn";
import C from "../../constants/theme";

const ITEMS = [
  { icon: "🏦", title: "Financiación Flexible",    desc: "Trabajamos con los principales bancos locales hasta en 60 cuotas mensuales." },
  { icon: "⚖️", title: "Escribanía Propia",        desc: "Gestión ágil de títulos, transferencias e historial SUCIVE sin complicaciones." },
  { icon: "🔧", title: "Inspección de 100 Puntos", desc: "Cada vehículo pasa un riguroso control mecánico antes de entregarse." },
];

export default function TrustBar() {
  return (
    <div style={{ maxWidth: 1000, margin: "56px auto 0", padding: "0 24px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
        {ITEMS.map((b, i) => (
          <FadeIn key={b.title} delay={i * 0.12} direction="up">
            <div className="card-trust" style={{
              background: C.card, borderRadius: 18,
              border: `1px solid ${C.border}`,
              padding: "28px 24px", display: "flex", gap: 18,
              boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
            }}>
              <span style={{ fontSize: 38, flexShrink: 0 }}>{b.icon}</span>
              <div>
                <h4 style={{ margin: "0 0 6px", fontSize: 15, color: C.text, fontWeight: 600 }}>{b.title}</h4>
                <p style={{ margin: 0, fontSize: 13, color: C.muted, lineHeight: 1.6 }}>{b.desc}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}