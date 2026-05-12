// src/pages/AdminLogin.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Field from "../components/ui/Field";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import C from "../constants/theme";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login, loading, error } = useAuthContext();
  const [form, setForm] = useState({ usuario: "", password: "" });
  const [showPass, setShowPass] = useState(false);

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const valid = form.usuario.trim() && form.password.trim();

  const handleSubmit = async () => {
    if (!valid) return;
    const ok = await login(form);
    if (ok) navigate("/admin");
  };

  const handleKeyDown = e => { if (e.key === "Enter") handleSubmit(); };

  return (
    <div style={{
      minHeight: "calc(100vh - 60px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navyL} 100%)`,
      padding: "24px",
    }}>
      <div style={{
        background: C.card, borderRadius: 20,
        boxShadow: "0 24px 60px rgba(0,0,0,0.2)",
        padding: "40px 36px", width: "100%", maxWidth: 400,
      }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <span style={{ fontSize: 48 }}>🏎️</span>
          <h1 style={{ margin: "12px 0 4px", fontSize: 22, fontWeight: 700, color: C.text }}>
            Panel de administración
          </h1>
          <p style={{ margin: 0, fontSize: 14, color: C.muted }}>
            Ingresá tus credenciales para continuar
          </p>
        </div>

        {/* Form */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Field label="Usuario">
            <Input
              value={form.usuario}
              onChange={set("usuario")}
              placeholder="admin"
              onKeyDown={handleKeyDown}
            />
          </Field>

          <Field label="Contraseña">
            <div style={{ position: "relative" }}>
              <Input
                type={showPass ? "text" : "password"}
                value={form.password}
                onChange={set("password")}
                placeholder="••••••••"
                onKeyDown={handleKeyDown}
              />
              <button
                onClick={() => setShowPass(s => !s)}
                style={{
                  position: "absolute", right: 10, top: "50%",
                  transform: "translateY(-50%)",
                  background: "none", border: "none",
                  cursor: "pointer", fontSize: 16, color: C.muted,
                }}
              >
                {showPass ? "🙈" : "👁️"}
              </button>
            </div>
          </Field>

          {/* Error */}
          {error && (
            <div style={{
              background: C.dangerBg, border: `1px solid #FCA5A5`,
              borderRadius: 8, padding: "10px 14px",
              fontSize: 13, color: C.danger,
            }}>
              ⚠️ {error}
            </div>
          )}

          <Button
            onClick={handleSubmit}
            disabled={!valid || loading}
            fullWidth
            style={{ padding: "13px", fontSize: 15, marginTop: 4 }}
          >
            {loading ? "Verificando..." : "Ingresar →"}
          </Button>
        </div>

        {/* Hint demo */}
        <div style={{
          marginTop: 24, padding: "12px 14px",
          background: C.accentBg, borderRadius: 8,
          fontSize: 12, color: C.accent, textAlign: "center", lineHeight: 1.6,
        }}>
          🔑 Demo: <strong>admin</strong> / <strong>autoprime2025</strong>
        </div>
      </div>
    </div>
  );
}