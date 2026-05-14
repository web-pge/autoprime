// src/services/vehiculosService.js
// Conectado a la API real en Vercel.
// VITE_API_URL debe estar en el .env del frontend.

const BASE = import.meta.env.VITE_API_URL || "";

// Helper para requests autenticados
const authHeaders = () => {
  const session = JSON.parse(sessionStorage.getItem("autoprime_auth") || "{}");
  return {
    "Content-Type": "application/json",
    ...(session.token ? { Authorization: `Bearer ${session.token}` } : {}),
  };
};

// Helper para manejar errores de la API
const handleResponse = async res => {
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Error de red" }));
    throw new Error(err.error || `Error ${res.status}`);
  }
  return res.json();
};

export const getVehiculos = () =>
  fetch(`${BASE}/api/vehiculos`).then(handleResponse);

export const getVehiculoById = id =>
  fetch(`${BASE}/api/vehiculos/${id}`).then(handleResponse);

export const createVehiculo = data =>
  fetch(`${BASE}/api/vehiculos`, {
    method:  "POST",
    headers: authHeaders(),
    body:    JSON.stringify(data),
  }).then(handleResponse);

export const updateVehiculo = data =>
  fetch(`${BASE}/api/vehiculos/${data.id}`, {
    method:  "PUT",
    headers: authHeaders(),
    body:    JSON.stringify(data),
  }).then(handleResponse);

export const deleteVehiculo = id =>
  fetch(`${BASE}/api/vehiculos/${id}`, {
    method:  "DELETE",
    headers: authHeaders(),
  }).then(res => {
    if (!res.ok) throw new Error(`Error ${res.status}`);
  });

export const toggleDestacado = id =>
  fetch(`${BASE}/api/vehiculos/${id}/destacar`, {
    method:  "PATCH",
    headers: authHeaders(),
  }).then(handleResponse);