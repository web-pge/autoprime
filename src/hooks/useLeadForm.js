// src/hooks/useLeadForm.js
// Estado, validación y envío del formulario de contacto.
// Cuando el agente de IA esté listo, el POST va acá — Contacto.jsx no se toca.

import { useState } from "react";
import { submitLead } from "../services/leadsService";

const INIT = {
  nombre:      "",
  tel:         "",
  email:       "",
  presupuesto: "",
  mensaje:     "",
};

export function useLeadForm() {
  const [form, setForm]       = useState(INIT);
  const [enviado, setEnviado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  // Helper para actualizar un campo individual
  const set = key => e => setForm(f => ({ ...f, [key]: e.target.value }));

  // Validación mínima: nombre y teléfono obligatorios
  const isValid = form.nombre.trim().length > 0 && form.tel.trim().length > 0;

  const enviar = async () => {
    if (!isValid) return;
    setLoading(true);
    try {
      await submitLead(form);
      setEnviado(true);
      setForm(INIT);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => { setForm(INIT); setEnviado(false); setError(null); };

  return { form, set, enviado, loading, error, isValid, enviar, reset };
}