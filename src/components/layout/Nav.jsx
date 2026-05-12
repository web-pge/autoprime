// src/components/layout/Nav.jsx

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import C from "../../constants/theme";
import { useBreakpoint } from "../../hooks/useBreakpoint";

const LINKS = [
  { label: "Inicio",    to: "/" },
  { label: "Catálogo",  to: "/catalogo" },
  { label: "Contacto",  to: "/contacto" },
  { label: "⚙️ Admin", to: "/admin" },
];

export default function Nav() {
  const { pathname } = useLocation();
  const { isMobile } = useBreakpoint();
  const [open, setOpen] = useState(false);

  const linkStyle = active => ({
    background:     active ? C.accent : "transparent",
    color:          active ? "#fff" : "rgba(255,255,255,0.85)",
    padding:        "8px 16px",
    borderRadius:   6,
    fontSize:       14,
    fontWeight:     500,
    textDecoration: "none",
    transition:     "background .2s, color .2s",
    display:        "block",
  });

  return (
    <nav style={{
      background: C.navy,
      padding: "0 24px",
      position: "sticky", top: 0, zIndex: 100,
    }}>
      {/* Barra principal */}
      <div style={{
        display: "flex", alignItems: "center",
        justifyContent: "space-between", height: 60,
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <span style={{ fontSize: 22 }}>🏎️</span>
          <span style={{ color: "#fff", fontWeight: 500, fontSize: 18, letterSpacing: -0.5 }}>
            Auto<span style={{ color: "#E8A838" }}>Prime</span>
          </span>
        </Link>

        {/* Desktop links */}
        {!isMobile && (
          <div style={{ display: "flex", gap: 4 }}>
            {LINKS.map(({ label, to }) => (
              <Link key={to} to={to} style={linkStyle(pathname === to)}>
                {label}
              </Link>
            ))}
          </div>
        )}

        {/* Hamburguesa mobile */}
        {isMobile && (
          <button
            onClick={() => setOpen(o => !o)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: "#fff", fontSize: 22, padding: "4px 8px",
              display: "flex", flexDirection: "column", gap: 5,
            }}
            aria-label="Menú"
          >
            <span style={{
              display: "block", width: 24, height: 2, background: "#fff",
              transition: "transform .25s, opacity .25s",
              transform: open ? "rotate(45deg) translate(5px, 5px)" : "none",
            }} />
            <span style={{
              display: "block", width: 24, height: 2, background: "#fff",
              transition: "opacity .25s",
              opacity: open ? 0 : 1,
            }} />
            <span style={{
              display: "block", width: 24, height: 2, background: "#fff",
              transition: "transform .25s, opacity .25s",
              transform: open ? "rotate(-45deg) translate(5px, -5px)" : "none",
            }} />
          </button>
        )}
      </div>

      {/* Menú mobile desplegable */}
      {isMobile && (
        <div style={{
          maxHeight: open ? 300 : 0,
          overflow: "hidden",
          transition: "max-height .3s ease",
        }}>
          <div style={{ paddingBottom: 12, display: "flex", flexDirection: "column", gap: 4 }}>
            {LINKS.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                style={linkStyle(pathname === to)}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}