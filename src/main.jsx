import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { DiseaseContext } from "./context/DiseaseContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DiseaseContext>
      <App />
    </DiseaseContext>
  </StrictMode>
);
