// src/services/leadsService.js

const BASE = import.meta.env.VITE_API_URL;

const handleResponse = async res => {
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Error de red" }));
    throw new Error(err.error || `Error ${res.status}`);
  }
  return res.json();
};

// Envía consulta de un cliente — público
export const submitLead = data =>
  fetch(`${BASE}/api/leads`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(data),
  }).then(handleResponse);

// Obtiene todos los leads — solo admin
export const getLeads = () => {
  const session = JSON.parse(sessionStorage.getItem("autoprime_auth") || "{}");
  return fetch(`${BASE}/api/leads`, {
    headers: {
      "Content-Type":  "application/json",
      Authorization:   `Bearer ${session.token}`,
    },
  }).then(handleResponse);
};