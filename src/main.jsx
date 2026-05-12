// src/main.jsx
// Punto de entrada de la aplicación.

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// Reset CSS mínimo — sin dependencias externas
const globalStyles = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    background: #F7F8FA;
    color: #1A1A2E;
    -webkit-font-smoothing: antialiased;
  }
  a { color: inherit; }
  button, input, select, textarea { font-family: inherit; }
`;

const styleTag = document.createElement("style");
styleTag.textContent = globalStyles;
document.head.appendChild(styleTag);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);