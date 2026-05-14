// src/hooks/useAuth.js

import { useState } from "react";

const BASE        = import.meta.env.VITE_API_URL || "https://autoprime-api-ruby.vercel.app";
const SESSION_KEY = "autoprime_auth";

const getSession = () => {
  try { return JSON.parse(sessionStorage.getItem(SESSION_KEY)); }
  catch { return null; }
};

// FIX: igual que vehiculosService — leer texto antes de parsear
// para no explotar si el body viene vacío o la API devuelve 304.
const parseJSON = async res => {
  const text = await res.text();
  if (!text) return {};
  try { return JSON.parse(text); }
  catch { return {}; }
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
        cache:   "no-store",   // FIX: evita 304 en el POST de login
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ usuario, password }),
      });

      // FIX: usar parseJSON en vez de res.json() directo
      const data = await parseJSON(res);

      if (!res.ok) {
        setError(data.error || "Credenciales incorrectas.");
        setLoading(false);
        return false;
      }

      // FIX: si el token no vino en la respuesta, reportar error claro
      if (!data.token) {
        setError("El servidor no devolvió un token. Intentá de nuevo.");
        setLoading(false);
        return false;
      }

      const s = { usuario: data.usuario, token: data.token };
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