// src/hooks/useAuth.js
// Login real contra la API de Vercel.

import { useState } from "react";

const BASE        = import.meta.env.VITE_API_URL || "https://autoprime-api-ruby.vercel.app";
const SESSION_KEY = "autoprime_auth";

const getSession = () => {
  try { return JSON.parse(sessionStorage.getItem(SESSION_KEY)); }
  catch { return null; }
};

export function useAuth() {
  const [session, setSession] = useState(getSession);
  const [error, setError]     = useState(null);
  const [loading, setLoading] = useState(false);

  const isAuthenticated = !!session?.token;

  const login = async ({ usuario, password }) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${BASE}/api/auth/login`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ usuario, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Credenciales incorrectas.");
        setLoading(false);
        return false;
      }

      const data = await res.json();
      const s    = { usuario: data.usuario, token: data.token };
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(s));
      setSession(s);
      setLoading(false);
      return true;

    } catch {
      setError("Error de conexión con el servidor.");
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setSession(null);
  };

  return { isAuthenticated, session, login, logout, error, loading };
}