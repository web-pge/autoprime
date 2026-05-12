// src/pages/Contacto.jsx

import { useNavigate } from "react-router-dom";
import Field from "../components/ui/Field";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import Button from "../components/ui/Button";
import C from "../constants/theme";
import { useLeadForm } from "../hooks/useLeadForm";
import { PRESUPUESTOS } from "../constants/vehicleOptions";

export default function Contacto() {
  const navigate = useNavigate();
  const { form, set, enviado, enviar } = useLeadForm();

  if (enviado) return (
    <div style={{ maxWidth: 500, margin: "60px auto", padding: "0 24px", textAlign: "center" }}>
      <div style={{ background: C.successBg, border: "1px solid #A3E0BF", borderRadius: 12, padding: 40 }}>
        <div style={{ fontSize: 48 }}>✅</div>
        <h3 style={{ color: "#1A6B44", margin: "12px 0 6px", fontWeight: 500 }}>¡Consulta enviada!</h3>
        <p style={{ color: "#2D8659", margin: "0 0 18px", fontSize: 14 }}>
          Te contactamos a la brevedad. Gracias por tu interés.
        </p>
        <Button onClick={() => navigate("/catalogo")}>Ver más vehículos</Button>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 520, margin: "0 auto", padding: "40px 24px" }}>
      <h2 style={{ fontSize: 22, fontWeight: 500, color: C.text, margin: "0 0 6px" }}>
        ¿Te interesa un vehículo?
      </h2>
      <p style={{ color: C.muted, margin: "0 0 28px", fontSize: 14 }}>
        Completá el formulario y un asesor te contacta a la brevedad.
      </p>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 28, display: "flex", flexDirection: "column", gap: 14 }}>
        <Field label="Nombre completo *">
          <Input value={form.nombre} onChange={set("nombre")} placeholder="Tu nombre" />
        </Field>
        <Field label="Teléfono *">
          <Input value={form.tel} onChange={set("tel")} type="tel" placeholder="+598 9X XXX XXX" />
        </Field>
        <Field label="Email">
          <Input value={form.email} onChange={set("email")} type="email" placeholder="tu@email.com" />
        </Field>
        <Field label="Presupuesto estimado">
          <Select value={form.presupuesto} onChange={set("presupuesto")} opts={PRESUPUESTOS} />
        </Field>
        <Field label="Mensaje">
          <Input
            value={form.mensaje}
            onChange={set("mensaje")}
            placeholder="Contanos qué estás buscando..."
            rows={3}
          />
        </Field>

        <Button
          onClick={enviar}
          disabled={!form.nombre.trim() || !form.tel.trim()}
          fullWidth
          style={{ padding: 13, fontSize: 15, marginTop: 4 }}
        >
          Enviar consulta
        </Button>
      </div>
    </div>
  );
}