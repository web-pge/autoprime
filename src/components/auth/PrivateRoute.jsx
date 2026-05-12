// src/components/auth/PrivateRoute.jsx
// Protege rutas que requieren autenticación.
// Si no está logueado, redirige al login de admin.

import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuthContext();
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
}