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
      .then(data => { setAutos(data); setLoading(false); })
      .catch(err  => { setError(err); setLoading(false); });
  }, []);

  const agregar = async data => {
    try {
      const nuevo = await createVehiculo(data);
      setAutos(prev => [nuevo, ...prev]);
    } catch (err) {
      setError(err);
    }
  };

  const actualizar = async data => {
    try {
      const actualizado = await updateVehiculo(data);
      setAutos(prev => prev.map(a => a.id === actualizado.id ? actualizado : a));
    } catch (err) {
      setError(err);
    }
  };

  const eliminar = async id => {
    try {
      await deleteVehiculo(id);
      setAutos(prev => prev.filter(a => a.id !== id));
    } catch (err) {
      setError(err);
    }
  };

  return { autos, loading, error, agregar, actualizar, eliminar };
}