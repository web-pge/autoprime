// src/services/leadsService.js
// Envío de leads al backend.
// El backend se encarga de pasarlo al agente de IA para calificación
// y notificar al vendedor si corresponde.

// ─── TIPOS de respuesta esperada del backend ──────────────────────────────────
//
// {
//   id:        "lead_abc123",
//   score:     "hot" | "warm" | "cold",
//   razon:     "Cliente con presupuesto definido y vehículo específico en mente.",
//   notificar: true | false,
//   creadoEn:  "2025-05-09T14:32:00Z",
// }

// ─── MOCK ────────────────────────────────────────────────────────────────────
const delay = ms => new Promise(res => setTimeout(res, ms));

export const submitLead = async formData => {
  await delay(600); // simula llamada al backend

  // Mock de respuesta — el agente real calificará según nombre, presupuesto y mensaje
  const mockResponse = {
    id:        `lead_${Date.now()}`,
    score:     "warm",
    razon:     "Lead recibido. Pendiente de calificación por el agente.",
    notificar: false,
    creadoEn:  new Date().toISOString(),
  };

  console.log("📨 Lead enviado:", formData);
  console.log("🤖 Respuesta del agente (mock):", mockResponse);

  return mockResponse;

  // TODO — reemplazar por:
  // const res = await fetch(`${import.meta.env.VITE_API_URL}/leads`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(formData),
  // });
  // if (!res.ok) throw new Error("Error al enviar consulta");
  // return res.json();
  //
  // El backend recibe el lead, llama a Claude con el contexto,
  // recibe { score, razon, notificar } y si notificar === true
  // dispara un mensaje por WhatsApp / email al vendedor.
};