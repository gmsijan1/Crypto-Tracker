// main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import CryptoWrapper from "./CryptoContext.jsx";
import { AuthProvider } from "./AuthContext.jsx";
import "./styles/global.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CryptoWrapper>
        <App />
      </CryptoWrapper>
    </AuthProvider>
  </StrictMode>,
);
