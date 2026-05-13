import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GlobalProvider } from "./context/DiseaseContext.jsx";
import { registerSW } from "virtual:pwa-register";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./Component/ScrollToTop/ScrollToTop";

const updateSW = registerSW({
  immediate: true,
  onNeedRefresh() {
    if (confirm("New content available. Refresh?")) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log("App is ready to work offline");
  },
});
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalProvider>
      <BrowserRouter>
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </GlobalProvider>
  </StrictMode>
);

