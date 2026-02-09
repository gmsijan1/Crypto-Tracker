import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import CryptoWrapper from "./CryptoContext";
import "./style.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CryptoWrapper>
      <App />
    </CryptoWrapper>
  </StrictMode>,
);
