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
      includeAssets: [
        "assets/images/*",
        "assets/audio/*",
        "assets/icons/*"
      ],
      workbox: {
         maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
        globPatterns: ["**/*.{js,css,html,svg,png,jpg,jpeg,mp3,mp4}"],
        runtimeCaching: [
          {
            urlPattern: /^\/assets\/images\/.*\.(svg|png|jpg|jpeg)$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "image-cache",
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
            },
          },
        ],
      },
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
            src: "/192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/180.png",
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
