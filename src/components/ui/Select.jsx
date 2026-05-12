// src/components/ui/Select.jsx

import C from "../../constants/theme";

export default function Select({ value, onChange, opts = [], disabled = false }) {
  return (
    <select
      value={value}
      onChange={onChange}
      disabled={disabled}
      style={{
        width: "100%",
        padding: "8px 10px",
        borderRadius: 6,
        border: `1px solid ${C.border}`,
        fontSize: 14,
        fontFamily: "inherit",
        background: C.card,
        color: C.text,
        cursor: disabled ? "default" : "pointer",
      }}
    >
      {opts.map(o => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  );
}