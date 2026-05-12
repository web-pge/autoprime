// src/hooks/useFilters.js
// Lógica de filtrado del catálogo extraída de Catalogo.jsx.
// Si el día de mañana agregás un filtro nuevo (año, color, etc.)
// lo tocás acá y no ensuciás la página.

import { useState, useMemo } from "react";

const INIT = {
  tipo:      "Todos",
  marca:     "Todas",
  precioMax: 50000,
};

export function useFilters(autos = []) {
  const [filters, setFilters] = useState(INIT);

  const filtrados = useMemo(() => autos.filter(a =>
    (filters.tipo      === "Todos"  || a.tipo  === filters.tipo) &&
    (filters.marca     === "Todas"  || a.marca === filters.marca) &&
    a.precio <= filters.precioMax
  ), [autos, filters]);

  const resetFilters = () => setFilters(INIT);

  return { filters, setFilters, filtrados, resetFilters };
}