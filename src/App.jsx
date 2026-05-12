// src/App.jsx
// Router raíz. Estructura: Nav fija arriba, páginas en el medio, Footer abajo.
// Para proteger /admin agregá un PrivateRoute cuando implementes auth.

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Nav     from "./components/layout/Nav";
import Footer  from "./components/layout/Footer";
import Inicio   from "./pages/Inicio";
import Catalogo from "./pages/Catalogo";
import Detalle  from "./pages/Detalle";
import Contacto from "./pages/Contacto";
import Admin    from "./pages/Admin";

import InicioTest from './pages/InicioTest';

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>

        <Nav />

        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/test"         element={<Inicio />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/auto/:id" element={<Detalle />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/admin"    element={<Admin />} />
            <Route path="/"    element={<InicioTest/>} />
            {/* Cualquier ruta desconocida redirige al inicio */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />

      </div>
    </BrowserRouter>
  );
}

// TODO — proteger /admin con auth:
//
// import { PrivateRoute } from "./components/auth/PrivateRoute";
// <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />