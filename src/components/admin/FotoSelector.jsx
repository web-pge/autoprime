// src/components/admin/FotoSelector.jsx
// Permite subir fotos reales desde el disco.
// Las convierte a base64 para guardarlas en localStorage sin backend.

import { useRef } from "react";
import C from "../../constants/theme";

export default function FotoSelector({ selected = [], onChange }) {
  const inputRef = useRef();

  // Convierte cada archivo a base64
  const handleFiles = e => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const readers = files.map(file => new Promise((resolve, reject) => {
      // Aviso si la foto es muy grande
      if (file.size > 0.5 * 1024 * 1024) {
        reject(new Error(`"${file.name}" supera 500KB. Usá una foto más liviana.`));
        return;
      }
      const reader = new FileReader();
      reader.onload  = () => resolve(reader.result); // base64
      reader.onerror = () => reject(new Error(`Error leyendo ${file.name}`));
      reader.readAsDataURL(file);
    }));

    Promise.allSettled(readers).then(results => {
      const exitosas = results.filter(r => r.status === "fulfilled").map(r => r.value);
      const errores  = results.filter(r => r.status === "rejected").map(r => r.reason.message);

      if (errores.length) alert(errores.join("\n"));
      if (exitosas.length) onChange([...selected, ...exitosas]);
    });

    // Resetea el input para permitir subir el mismo archivo de nuevo
    e.target.value = "";
  };

  const eliminar = idx => onChange(selected.filter((_, i) => i !== idx));

  return (
    <div>
      <label style={{ fontSize: 12, color: C.muted, display: "block", marginBottom: 8 }}>
        Fotos del vehículo
      </label>

      {/* Previews */}
      {selected.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
          {selected.map((src, i) => (
            <div key={i} style={{ position: "relative" }}>
              <img
                src={src}
                alt={`foto-${i + 1}`}
                style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8, border: `1.5px solid ${C.border}` }}
              />
              <button
                onClick={() => eliminar(i)}
                style={{
                  position: "absolute", top: -6, right: -6,
                  background: C.danger, color: "#fff", border: "none",
                  borderRadius: "50%", width: 20, height: 20,
                  fontSize: 11, cursor: "pointer", lineHeight: 1,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >✕</button>
            </div>
          ))}
        </div>
      )}

      {/* Botón subir */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFiles}
        style={{ display: "none" }}
      />
      <button
        onClick={() => inputRef.current.click()}
        style={{
          background: C.accentBg,
          border: `1.5px dashed ${C.accent}`,
          color: C.accent,
          borderRadius: 8,
          padding: "10px 20px",
          cursor: "pointer",
          fontSize: 14,
          fontWeight: 500,
        }}
      >
        📷 Subir fotos
      </button>

      <p style={{ margin: "6px 0 0", fontSize: 12, color: C.muted }}>
        Máx. 500KB por foto · JPG, PNG, WEBP · Podés subir varias a la vez
      </p>
    </div>
  );
}