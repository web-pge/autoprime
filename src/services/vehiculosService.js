// src/services/vehiculosService.js
// Persiste los vehículos en localStorage para funcionar sin backend.
// Cuando el backend esté listo, reemplazás estas funciones por fetch() y listo.

const KEY = "autoprime_vehiculos";

const delay = ms => new Promise(res => setTimeout(res, ms));

// ── Helpers localStorage ──────────────────────────────────────────────────────

const leer = () => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const escribir = datos => {
  try {
    localStorage.setItem(KEY, JSON.stringify(datos));
  } catch (e) {
    // localStorage lleno (probable por fotos muy pesadas)
    throw new Error("Almacenamiento lleno. Intentá con fotos más livianas.");
  }
};

// ── Mock inicial — se carga solo si localStorage está vacío ──────────────────

const MOCK = [
  { id: 1, marca: "Toyota",     modelo: "Corolla",         año: 2022, km: 28000, precio: 22500, tipo: "Sedán",     combustible: "Nafta",  transmision: "Automático", color: "Blanco Perla",   fotos: [], destacado: true,  desc: "Impecable estado, service al día, único dueño." },
  { id: 2, marca: "Volkswagen", modelo: "Golf GTI",        año: 2021, km: 41000, precio: 31000, tipo: "Hatchback", combustible: "Nafta",  transmision: "Manual",     color: "Rojo Tornado",   fotos: [], destacado: true,  desc: "Versión deportiva, levanta vidrios eléctricos, Bluetooth." },
  { id: 3, marca: "Ford",       modelo: "Ranger XLT",      año: 2023, km: 15000, precio: 44000, tipo: "Pick-up",   combustible: "Diesel", transmision: "Automático", color: "Gris Oxford",    fotos: [], destacado: false, desc: "4x4, caja larga, cámara de reversa, casi 0km." },
  { id: 4, marca: "Chevrolet",  modelo: "Tracker Premier", año: 2022, km: 33000, precio: 27800, tipo: "SUV",       combustible: "Nafta",  transmision: "Automático", color: "Azul Stellar",   fotos: [], destacado: true,  desc: "Full equipo, techo panorámico, Apple CarPlay." },
  { id: 5, marca: "Honda",      modelo: "Civic EX",        año: 2020, km: 58000, precio: 19500, tipo: "Sedán",     combustible: "Nafta",  transmision: "CVT",        color: "Negro Cristal",  fotos: [], destacado: false, desc: "Motor 1.5 turbo, pantalla táctil 8', sensor de estacionamiento." },
];

const inicializar = () => {
  if (!leer()) escribir(MOCK);
};

// ── API ───────────────────────────────────────────────────────────────────────

export const getVehiculos = async () => {
  await delay(300);
  inicializar();
  return leer();
};

export const createVehiculo = async data => {
  await delay(300);
  const lista = leer() ?? [];
  const nuevo = { ...data, id: Date.now() };
  escribir([nuevo, ...lista]);
  return nuevo;
};

export const updateVehiculo = async data => {
  await delay(300);
  const lista = leer() ?? [];
  const actualizada = lista.map(a => a.id === data.id ? { ...data } : a);
  escribir(actualizada);
  return { ...data };
};

export const deleteVehiculo = async id => {
  await delay(200);
  const lista = leer() ?? [];
  escribir(lista.filter(a => a.id !== id));
};

// Limpia todo y vuelve al mock inicial (útil para reset en demo)
export const resetVehiculos = () => {
  localStorage.removeItem(KEY);
  inicializar();
};