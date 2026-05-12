// src/components/vehicles/AutoGallery.jsx

import { useState } from "react";
import C from "../../constants/theme";

const esImagen = src => typeof src === "string" && src.startsWith("data:");

export default function AutoGallery({ fotos = [] }) {
  const [idx, setIdx] = useState(0);

  // Sin fotos — placeholder
  if (!fotos.length) return (
    <div style={{
      background: C.accentBg, height: 240,
      display: "flex", alignItems: "center",
      justifyContent: "center", fontSize: 80, color: C.muted,
    }}>
      🚗
    </div>
  );

  const actual = fotos[idx];

  return (
    <div>
      {/* Foto principal */}
      {esImagen(actual) ? (
        <img
          src={actual}
          alt={`foto-${idx + 1}`}
          style={{ width: "100%", height: 280, objectFit: "cover", display: "block" }}
        />
      ) : (
        <div style={{
          background: C.accentBg, height: 240,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 90,
        }}>
          {actual}
        </div>
      )}

      {/* Miniaturas — solo si hay más de una foto */}
      {fotos.length > 1 && (
        <div style={{
          display: "flex", gap: 8, padding: "10px 16px",
          borderBottom: `1px solid ${C.border}`, flexWrap: "wrap",
        }}>
          {fotos.map((f, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              style={{
                padding: 0, border: `2px solid ${i === idx ? C.accent : C.border}`,
                borderRadius: 6, cursor: "pointer", overflow: "hidden",
                background: "none", transition: "border-color .15s",
              }}
            >
              {esImagen(f) ? (
                <img
                  src={f}
                  alt={`miniatura-${i + 1}`}
                  style={{ width: 56, height: 48, objectFit: "cover", display: "block" }}
                />
              ) : (
                <div style={{
                  width: 56, height: 48, display: "flex",
                  alignItems: "center", justifyContent: "center",
                  fontSize: 24, background: C.bg,
                }}>
                  {f}
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}