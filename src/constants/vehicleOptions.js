// src/constants/vehicleOptions.js

export const TIPOS        = ["Sedán", "SUV", "Hatchback", "Pick-up"];
export const COMBUSTIBLES = ["Nafta", "Diesel", "Eléctrico", "Híbrido"];
export const TRANSMISIONES = ["Manual", "Automático", "CVT"];

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
  tipo:        "Sedán",
  combustible: "Nafta",
  transmision: "Manual",
  color:       "",
  desc:        "",
  fotos:       ["🚗"],
  destacado:   false,
};