// src/components/home/WhyAutoPrime.jsx

import FadeIn from "../ui/FadeIn";
import C from "../../constants/theme";

const ITEMS = [
  { icon: "🔄", title: "Tomamos tu Usado",  desc: "Aceptamos permutas al mejor precio. Entregás tu auto y te vas con el nuevo en el día." },
  { icon: "🛡️", title: "Garantía de 1 Año", desc: "Seguridad mecánica garantizada por contrato de 12 meses en motor y caja." },
  { icon: "⚡", title: "Financiación 100%", desc: "Aprobación de crédito directa y veloz con los principales bancos del país." },
  { icon: "📝", title: "Papeles al Día",    desc: "Toda la documentación, SUCIVE y transferencias listas de forma transparente." },
];

export default function WhyAutoPrime() {
  return (
    <div style={{ maxWidth: 1000, margin: "88px auto 0", padding: "0 24px" }}>
      <FadeIn direction="up">
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: C.text, margin: 0 }}>
            ¿Por qué elegir AutoPrime?
          </h2>
          <p style={{ color: C.muted, fontSize: 15, marginTop: 10 }}>
            Rediseñamos la experiencia de compra de autos en Uruguay.
          </p>
        </div>
      </FadeIn>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 20 }}>
        {ITEMS.map((b, i) => (
          <FadeIn key={b.title} delay={i * 0.1} direction="up">
            <div className="why-card" style={{
              background: C.card, border: `1px solid ${C.border}`,
              borderRadius: 16, padding: "28px 22px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.02)",
            }}>
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: C.accentBg,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 26, marginBottom: 16,
              }}>
                {b.icon}
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: C.text, margin: "0 0 8px" }}>{b.title}</h3>
              <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.6, margin: 0 }}>{b.desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}