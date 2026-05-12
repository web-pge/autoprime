// src/components/layout/Nav.jsx

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import C from "../../constants/theme";
import { useBreakpoint } from "../../hooks/useBreakpoint";
import { useAuthContext } from "../../context/AuthContext";

const PUBLIC_LINKS = [
  { label: "Inicio",   to: "/" },
  { label: "Catálogo", to: "/catalogo" },
  { label: "Contacto", to: "/contacto" },
];

export default function Nav() {
  const { pathname }                = useLocation();
  const navigate                    = useNavigate();
  const { isMobile }                = useBreakpoint();
  const { isAuthenticated, logout } = useAuthContext();
  const [open, setOpen]             = useState(false);

  // Si está logueado muestra "⚙️ Admin", sino "🔐 Admin" que lleva al login
  const links = [
    ...PUBLIC_LINKS,
    isAuthenticated
      ? { label: "⚙️ Admin", to: "/admin" }
      : { label: "🔐 Admin", to: "/admin/login" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
    setOpen(false);
  };

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

  const logoutBtnStyle = {
    background:  "rgba(239,68,68,0.15)",
    color:       "#FCA5A5",
    border:      "1px solid rgba(239,68,68,0.3)",
    padding:     "7px 14px",
    borderRadius: 6,
    fontSize:    13,
    fontWeight:  500,
    cursor:      "pointer",
    transition:  "background .2s",
  };

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
          <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
            {links.map(({ label, to }) => (
              <Link key={to} to={to} style={linkStyle(pathname === to)}>
                {label}
              </Link>
            ))}
            {/* Botón salir — solo si está logueado */}
            {isAuthenticated && (
              <button onClick={handleLogout} style={{ ...logoutBtnStyle, marginLeft: 4 }}>
                Salir
              </button>
            )}
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
          maxHeight: open ? 320 : 0,
          overflow: "hidden",
          transition: "max-height .3s ease",
        }}>
          <div style={{ paddingBottom: 12, display: "flex", flexDirection: "column", gap: 4 }}>
            {links.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                style={linkStyle(pathname === to)}
              >
                {label}
              </Link>
            ))}
            {/* Salir en mobile */}
            {isAuthenticated && (
              <button onClick={handleLogout} style={{
                ...logoutBtnStyle,
                textAlign: "left",
                marginTop: 4,
                fontSize: 14,
                padding: "8px 16px",
              }}>
                Cerrar sesión
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}