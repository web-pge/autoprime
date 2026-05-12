// src/components/home/DondeEstamos.jsx

import { useNavigate } from "react-router-dom";
import FadeIn from "../ui/FadeIn";
import C from "../../constants/theme";

const INFO = [
  ["📍", "Av. Italia y Propios, Montevideo"],
  ["🕒", "Lun–Sáb: 09:00 a 19:00 hs"],
  ["📞", "099 123 456 (WhatsApp directo)"],
];

export default function DondeEstamos() {
  const navigate = useNavigate();

  return (
    <FadeIn direction="up" style={{ maxWidth: 1000, margin: "88px auto 100px", padding: "0 24px" }}>
      <div style={{
        background: C.card, border: `1px solid ${C.border}`,
        borderRadius: 24, overflow: "hidden",
        display: "flex", flexWrap: "wrap",
        boxShadow: "0 12px 40px rgba(0,0,0,0.04)",
      }}>
        {/* Info */}
        <div style={{ flex: "1 1 340px", padding: "48px 40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <span style={{
            color: C.gold, fontSize: 11, fontWeight: 700,
            letterSpacing: 2, textTransform: "uppercase",
            marginBottom: 12, display: "block",
          }}>
            📍 Showroom Principal
          </span>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: C.text, margin: "0 0 14px" }}>
            Vení a conocernos
          </h2>
          <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.7, margin: "0 0 28px" }}>
            Te esperamos en nuestro showroom para ver y probar cualquier auto del catálogo con total tranquilidad. Estacionamiento exclusivo y café de bienvenida.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {INFO.map(([icon, txt]) => (
              <div key={txt} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <span style={{ fontSize: 18 }}>{icon}</span>
                <span style={{ fontSize: 14, color: C.text }}>{txt}</span>
              </div>
            ))}
          </div>

          <button
            className="btn-gold"
            style={{ marginTop: 28, alignSelf: "flex-start", animation: "none" }}
            onClick={() => navigate("/contacto")}
          >
            Escribinos →
          </button>
        </div>

        {/* Mapa */}
        <div style={{ flex: "1 1 380px", minHeight: 340 }}>
          <iframe
            title="Ubicación AutoPrime"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3272.03606825701!2d-56.138402424361555!3d-34.892994872851894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959f811559869275%3A0xc3cf938bdf8f15d7!2sAv.%20Italia%20%26%20Propios!5e0!3m2!1ses!2suy!4v1715200000000!5m2!1ses!2suy"
            width="100%" height="100%"
            style={{ border: 0, minHeight: 340, display: "block" }}
            allowFullScreen="" loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </FadeIn>
  );
}