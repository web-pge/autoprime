// src/components/layout/Footer.jsx

import { Link } from "react-router-dom";
import C from "../../constants/theme";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: C.navy,
        color: "rgba(255,255,255,0.5)",
        padding: "28px 24px",
        marginTop: 60,
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        {/* Marca */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 18 }}>🏎️</span>
          <span style={{ color: "#fff", fontWeight: 500, fontSize: 15, letterSpacing: -0.5 }}>
            Auto<span style={{ color: "#E8A838" }}>Prime</span>
          </span>
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: 20 }}>
          {[
            { label: "Catálogo", to: "/catalogo" },
            { label: "Contacto", to: "/contacto" },
          ].map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, textDecoration: "none" }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Copyright */}
        <p style={{ margin: 0, fontSize: 13 }}>
          © {year} AutoPrime · Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
}