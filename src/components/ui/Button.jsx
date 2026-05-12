// src/components/ui/Button.jsx

import C from "../../constants/theme";

const VARIANTS = {
  primary:  { bg: C.accent,    color: "#fff",   border: "none" },
  danger:   { bg: C.dangerBg,  color: C.danger, border: `1px solid #FCA5A5` },
  ghost:    { bg: "none",      color: C.muted,  border: `1px solid ${C.border}` },
  outlined: { bg: C.accentBg,  color: C.accent, border: `1px solid ${C.accent}` },
};

export default function Button({
  children,
  onClick,
  variant = "primary",
  fullWidth = false,
  disabled = false,
  style = {},
}) {
  const v = VARIANTS[variant] ?? VARIANTS.primary;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: disabled ? C.border : v.bg,
        color:      disabled ? C.muted  : v.color,
        border:     v.border,
        padding:    "9px 20px",
        borderRadius: 7,
        fontSize:   14,
        fontWeight: 500,
        cursor:     disabled ? "default" : "pointer",
        width:      fullWidth ? "100%" : "auto",
        fontFamily: "inherit",
        transition: "opacity .15s",
        ...style,
      }}
    >
      {children}
    </button>
  );
}