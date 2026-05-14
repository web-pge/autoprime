// src/constants/vehicleOptions.js

export const TIPOS        = ["Sedan", "SUV", "Hatchback", "Pickup"];
export const COMBUSTIBLES = ["Nafta", "Diesel", "Electrico", "Hibrido"];
export const TRANSMISIONES = ["Manual", "Automatico", "CVT"];

export const FOTO_OPTS = [
  "🚗","🏎️","🛻","🚙","🚕",
  "💺","🛞","🔧","🪟","🎛️",
  "📱","🌅","🪣","⚙️","🗺️",
];

export const PRESUPUESTOS = [
  "Seleccioná...",
  "Hasta USD 15.000",
  "USD 15.000 – 25.000",
  "USD 25.000 – 35.000",
  "Más de USD 35.000",
];

export const EMPTY_AUTO = {
  marca:       "",
  modelo:      "",
  año:         "",
  km:          "",
  precio:      "",
  tipo:        "Sedan",
  combustible: "Nafta",
  transmision: "Manual",
  color:       "",
  desc:        "",
  fotos:       ["🚗"],
  destacado:   false,
};