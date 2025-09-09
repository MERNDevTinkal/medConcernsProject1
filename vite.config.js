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
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "robots.txt"], // Optional, but recommended
      manifest: {
        name: "My React Vite PWA",
        short_name: "VitePWA",
        description: "A Vite PWA built with React",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "icon.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icon.png",
            sizes: "512x512",
            type: "image/png",
          },
          // {
          //   src: "apple-touch-icon.png",
          //   sizes: "180x180",
          //   type: "image/png",
          // },
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
