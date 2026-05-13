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
      includeAssets: ["favicon.png", "180.png", "192.png", "512.png"],
      workbox: {
        skipWaiting: true,
        clientsClaim: true,
        cleanupOutdatedCaches: true,
        navigateFallback: "/index.html",
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,

        globPatterns: [
          "**/*.{js,css,html,ico,woff,woff2,json}",
        ],
        globIgnores: ["**/*.{mp3,wav,ogg,m4a}", "**/audio/**"],

        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.mode === "navigate",
            handler: "NetworkFirst",
            options: {
              cacheName: "pages-cache",
              networkTimeoutSeconds: 3,
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 365 * 24 * 60 * 60,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "images-cache",
              expiration: {
                maxEntries: 2000,
                maxAgeSeconds: 365 * 24 * 60 * 60,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: ({ request }) =>
              request.destination === "script" ||
              request.destination === "style" ||
              request.destination === "worker",
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "static-assets-cache",
              expiration: {
                maxEntries: 300,
                maxAgeSeconds: 365 * 24 * 60 * 60,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },

      // PWA MANIFEST
      manifest: {
        name: "MedConcerns App",
        short_name: "MedConcerns",
        description: "MedConcerns App",
        start_url: "/",
        scope: "/",
        display: "standalone",
        orientation: "landscape",
        background_color: "#ffffff",
        theme_color: "#ffffff",

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
    host: true,
    hmr: { overlay: false },
  },
});