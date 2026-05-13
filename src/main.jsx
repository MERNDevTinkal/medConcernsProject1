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
    console.log("✅ App is ready to work offline - Images will work without internet");
  },
  onRegistered() {
    console.log("✅ Service Worker registered successfully");
  },
  onRegisterError(error) {
    console.error("❌ Service Worker registration failed:", error);
  },
});

// Handle offline/online status
window.addEventListener("offline", () => {
  console.log("📴 App is now offline - using cached assets");
});

window.addEventListener("online", () => {
  console.log("📶 App is back online");
});

// Log cache status on app load
if ("caches" in window) {
  caches.keys().then((cacheNames) => {
    console.log("📦 Available caches:", cacheNames);
  });
}

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

