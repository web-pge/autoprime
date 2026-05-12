// src/pages/Admin.jsx

import { useState } from "react";
import AutoForm from "../components/admin/AutoForm";
import AdminRow from "../components/admin/AdminRow";
import Button from "../components/ui/Button";
import C from "../constants/theme";
import { useVehiculos } from "../hooks/useVehiculos";
import { EMPTY_AUTO } from "../constants/vehicleOptions";
import { useBreakpoint } from "../hooks/useBreakpoint";

const TABLE_HEADERS = ["Vehículo", "Año / km", "Precio", "Estado", "Acciones"];

export default function Admin() {
  const { autos, agregar, actualizar, eliminar } = useVehiculos();
  const { isMobile } = useBreakpoint();
  const [modo, setModo]       = useState("lista");
  const [autoEdit, setAutoEdit] = useState(null);

  const handleEditar   = auto => { setAutoEdit(auto); setModo("editar"); };
  const handleCancelar = ()   => { setModo("lista"); setAutoEdit(null); };

  const handleGuardarNuevo = async form => {
    await agregar({ ...form, id: Date.now() });
    setModo("lista");
  };

  const handleGuardarEdicion = async form => {
    await actualizar(form);
    setModo("lista");
    setAutoEdit(null);
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: isMobile ? "20px 16px" : "32px 24px" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, gap: 12 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: isMobile ? 18 : 22, fontWeight: 600, color: C.text }}>
            Panel de administración
          </h2>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: C.muted }}>
            {autos.length} vehículo{autos.length !== 1 ? "s" : ""} publicados
          </p>
        </div>
        {modo === "lista"
          ? <Button onClick={() => setModo("nuevo")} style={{ whiteSpace: "nowrap" }}>
              {isMobile ? "+ Agregar" : "+ Agregar vehículo"}
            </Button>
          : <Button variant="danger" onClick={handleCancelar}>✕ Cancelar</Button>
        }
      </div>

      {/* Formulario nuevo */}
      {modo === "nuevo" && (
        <AutoForm
          inicial={{ ...EMPTY_AUTO }}
          onGuardar={handleGuardarNuevo}
          onCancelar={handleCancelar}
          titulo="Nuevo vehículo"
        />
      )}

      {/* Formulario edición */}
      {modo === "editar" && autoEdit && (
        <AutoForm
          inicial={{ ...autoEdit }}
          onGuardar={handleGuardarEdicion}
          onCancelar={handleCancelar}
          titulo={`Editando: ${autoEdit.marca} ${autoEdit.modelo}`}
        />
      )}

      {/* Tabla / lista */}
      {modo === "lista" && (
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>

          {/* Encabezado — solo desktop */}
          {!isMobile && (
            <div style={{
              padding: "12px 20px", background: C.bg,
              borderBottom: `1px solid ${C.border}`,
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr 130px",
              gap: 12,
            }}>
              {TABLE_HEADERS.map(h => (
                <span key={h} style={{ fontSize: 12, fontWeight: 600, color: C.muted, textTransform: "uppercase", letterSpacing: 0.4 }}>
                  {h}
                </span>
              ))}
            </div>
          )}

          {/* Filas */}
          {autos.length === 0 ? (
            <div style={{ textAlign: "center", padding: "48px 0", color: C.muted }}>
              <div style={{ fontSize: 40 }}>🚗</div>
              <p style={{ marginTop: 12 }}>No hay vehículos publicados todavía.</p>
            </div>
          ) : (
            autos.map(a => (
              <AdminRow key={a.id} auto={a} onEditar={handleEditar} onEliminar={eliminar} />
            ))
          )}
        </div>
      )}
    </div>
  );
}