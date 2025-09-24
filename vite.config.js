import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      // includeAssets: ["favicon.ico", "apple-touch-icon.png", "robots.txt"], // Optional, but recommended
      manifest: {
        name: "MedConcerns App",
        short_name: "MedConcerns",
        description: "MedConcerns App",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        scope: "/",
        start_url: "/",
        orientation: "landscape",
        icons: [
          {
            src: "192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "180.png",
            sizes: "180x180",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  server: {
    hmr: {
      overlay: false,
    },
    host: true,
  },
});
