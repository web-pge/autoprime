// src/hooks/useVehiculos.js

import { useState, useEffect } from "react";
import { getVehiculos, createVehiculo, updateVehiculo, deleteVehiculo } from "../services/vehiculosService";

export function useVehiculos() {
  const [autos, setAutos]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    setLoading(true);
    getVehiculos()
      .then(data => {
        setAutos(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => { setError(err); setLoading(false); });
  }, []);

  const agregar = async data => {
    setError(null);
    try {
      const nuevo = await createVehiculo(data);
      if (nuevo && nuevo.id) {
        setAutos(prev => [nuevo, ...prev]);
      } else {
        const lista = await getVehiculos();
        setAutos(Array.isArray(lista) ? lista : []);
      }
    } catch (err) {
      setError(err);
    }
  };

  const actualizar = async data => {
    setError(null);
    try {
      const actualizado = await updateVehiculo(data);
      if (actualizado && actualizado.id) {
        setAutos(prev => prev.map(a => a.id === actualizado.id ? actualizado : a));
      } else {
        const lista = await getVehiculos();
        setAutos(Array.isArray(lista) ? lista : []);
      }
    } catch (err) {
      setError(err);
    }
  };

  const eliminar = async id => {
    setError(null);
    try {
      await deleteVehiculo(id);
      setAutos(prev => prev.filter(a => a.id !== id));
    } catch (err) {
      setError(err);
    }
  };

  return { autos, loading, error, agregar, actualizar, eliminar };
}