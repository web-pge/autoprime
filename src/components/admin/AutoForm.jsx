// src/components/admin/AutoForm.jsx
// Formulario compartido para crear y editar vehículos

import { useState } from "react";
import Field from "../ui/Field";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";
import FotoSelector from "./FotoSelector";
import C from "../../constants/theme";
import { TIPOS, COMBUSTIBLES, TRANSMISIONES, EMPTY_AUTO } from "../../constants/vehicleOptions";

export default function AutoForm({ inicial = EMPTY_AUTO, onGuardar, onCancelar, titulo }) {
  const [form, setForm] = useState(inicial);

  const set = key => e => setForm(f => ({ ...f, [key]: e.target.value }));
  const setFotos = fotos => setForm(f => ({ ...f, fotos }));
  const setDestacado = e => setForm(f => ({ ...f, destacado: e.target.checked }));

  const valid = form.marca.trim() && form.modelo.trim() && form.precio;

  const handleGuardar = () => {
    if (!valid) return;
    onGuardar({
      ...form,
      año:    Number(form.año),
      km:     Number(form.km),
      precio: Number(form.precio),
    });
  };

  return (
    <div
      style={{
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: 12,
        padding: 24,
        marginBottom: 24,
      }}
    >
      <h3 style={{ margin: "0 0 20px", fontWeight: 500, fontSize: 16, color: C.text }}>
        {titulo}
      </h3>

      {/* Campos de texto */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <Field label="Marca *">
          <Input value={form.marca} onChange={set("marca")} placeholder="Toyota" />
        </Field>
        <Field label="Modelo *">
          <Input value={form.modelo} onChange={set("modelo")} placeholder="Corolla" />
        </Field>
        <Field label="Año">
          <Input value={form.año} onChange={set("año")} type="number" placeholder="2023" />
        </Field>
        <Field label="Kilómetros">
          <Input value={form.km} onChange={set("km")} type="number" placeholder="30000" />
        </Field>
        <Field label="Precio (USD) *">
          <Input value={form.precio} onChange={set("precio")} type="number" placeholder="25000" />
        </Field>
        <Field label="Color">
          <Input value={form.color} onChange={set("color")} placeholder="Blanco Perla" />
        </Field>
        <Field label="Tipo">
          <Select value={form.tipo} onChange={set("tipo")} opts={TIPOS} />
        </Field>
        <Field label="Combustible">
          <Select value={form.combustible} onChange={set("combustible")} opts={COMBUSTIBLES} />
        </Field>
        <Field label="Transmisión">
          <Select value={form.transmision} onChange={set("transmision")} opts={TRANSMISIONES} />
        </Field>
      </div>

      {/* Descripción */}
      <div style={{ marginTop: 14 }}>
        <Field label="Descripción">
          <Input
            value={form.desc}
            onChange={set("desc")}
            placeholder="Estado general, equipamiento, observaciones..."
            rows={2}
          />
        </Field>
      </div>

      {/* Selector de fotos */}
      <div style={{ marginTop: 14 }}>
        <FotoSelector selected={form.fotos} onChange={setFotos} />
      </div>

      {/* Destacado */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 14 }}>
        <input
          type="checkbox"
          id="destacado"
          checked={form.destacado}
          onChange={setDestacado}
        />
        <label htmlFor="destacado" style={{ fontSize: 14, color: C.text, cursor: "pointer" }}>
          Marcar como destacado ⭐
        </label>
      </div>

      {/* Acciones */}
      <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
        <Button onClick={handleGuardar} disabled={!valid}>
          Guardar vehículo
        </Button>
        <Button variant="ghost" onClick={onCancelar}>
          Cancelar
        </Button>
      </div>
    </div>
  );
}