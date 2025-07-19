import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "@fontsource/inter";
import "@fontsource/inter/400.css";
import "@fontsource/inter/900.css";
import "@fontsource/inter/600.css";
// import "@fontsource/inter/800.css";
import "@fontsource/inter/400-italic.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
