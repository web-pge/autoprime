// src/App.jsx

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider }  from "./context/AuthContext";
import PrivateRoute      from "./components/auth/PrivateRoute";
import Nav               from "./components/layout/Nav";
import Footer            from "./components/layout/Footer";

import InicioTest from "./pages/InicioTest";
import Inicio     from "./pages/Inicio";
import Catalogo   from "./pages/Catalogo";
import Detalle    from "./pages/Detalle";
import Contacto   from "./pages/Contacto";
import Admin      from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>

          <Nav />

          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/"            element={<InicioTest />} />
              <Route path="/test"        element={<Inicio />} />
              <Route path="/catalogo"    element={<Catalogo />} />
              <Route path="/auto/:id"    element={<Detalle />} />
              <Route path="/contacto"    element={<Contacto />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={
                <PrivateRoute>
                  <Admin />
                </PrivateRoute>
              } />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer />

        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}