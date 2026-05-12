// src/context/AuthContext.jsx
// Contexto global de autenticación.
// Envuelve la app en App.jsx para que cualquier componente
// pueda acceder al estado de auth sin prop drilling.

import { createContext, useContext } from "react";
import { useAuth } from "../hooks/useAuth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

// Hook para consumir el contexto — import { useAuthContext } from "../context/AuthContext"
export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext debe usarse dentro de <AuthProvider>");
  return ctx;
}