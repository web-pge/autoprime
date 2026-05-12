// src/components/ui/Field.jsx
// Wrapper de label + contenido para formularios

import C from "../../constants/theme";

export default function Field({ label, children }) {
  return (
    <div>
      <label style={{ fontSize: 12, color: C.muted, display: "block", marginBottom: 4 }}>
        {label}
      </label>
      {children}
    </div>
  );
}