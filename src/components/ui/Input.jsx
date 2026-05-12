// src/components/ui/Input.jsx

import C from "../../constants/theme";

const baseStyle = {
  width: "100%",
  padding: "8px 10px",
  borderRadius: 6,
  border: `1px solid ${C.border}`,
  fontSize: 14,
  boxSizing: "border-box",
  outline: "none",
  fontFamily: "inherit",
};

export default function Input({
  value,
  onChange,
  type = "text",
  placeholder = "",
  rows,          // si se pasa rows, renderiza un textarea
  disabled = false,
}) {
  if (rows) {
    return (
      <textarea
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        style={{ ...baseStyle, resize: "vertical" }}
      />
    );
  }

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      style={baseStyle}
    />
  );
}