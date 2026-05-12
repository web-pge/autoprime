// src/hooks/useAuth.js
// Maneja el estado de autenticación del admin.
// Credenciales hardcodeadas para la demo.
// Cuando el backend esté listo, reemplazás login() por un fetch a /api/auth/login

import { useState } from "react";

// ── Credenciales demo ─────────────────────────────────────────────────────────
// TODO: mover a variables de entorno y validar en el backend
const ADMIN_USER = "admin";
const ADMIN_PASS = "autoprime2025";

const SESSION_KEY = "autoprime_auth";

const getSession = () => {
  try { return JSON.parse(sessionStorage.getItem(SESSION_KEY)); }
  catch { return null; }
};

export function useAuth() {
  const [session, setSession] = useState(getSession);
  const [error, setError]     = useState(null);
  const [loading, setLoading] = useState(false);

  const isAuthenticated = !!session;

  const login = async ({ usuario, password }) => {
    setLoading(true);
    setError(null);

    // Simula latencia de red
    await new Promise(res => setTimeout(res, 600));

    if (usuario === ADMIN_USER && password === ADMIN_PASS) {
      const s = { usuario, loginAt: new Date().toISOString() };
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(s));
      setSession(s);
      setLoading(false);
      return true;
    }

    setError("Usuario o contraseña incorrectos.");
    setLoading(false);
    return false;

    // TODO — reemplazar por:
    // const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ usuario, password }),
    // });
    // if (!res.ok) { setError("Credenciales inválidas."); return false; }
    // const { token } = await res.json();
    // sessionStorage.setItem(SESSION_KEY, JSON.stringify({ usuario, token }));
    // setSession({ usuario, token });
    // return true;
  };

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setSession(null);
  };

  return { isAuthenticated, session, login, logout, error, loading };
}