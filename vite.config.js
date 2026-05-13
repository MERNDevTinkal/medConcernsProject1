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
      workbox: {
        // Increase cache limit for larger assets
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // 10MB per file

        // Cache only essential static files during build
        globPatterns: [
          "**/*.{js,css,html,ico}",
          "**/*.{png,svg,jpg,jpeg,webp}",
        ],

        // PRIORITY: Cache images and audio on-demand for offline use
        runtimeCaching: [
          // HIGH PRIORITY: Cache app shell (JS, CSS, HTML)
          {
            urlPattern: ({ request }) => 
              request.destination === "" || 
              request.destination === "document" ||
              request.destination === "script" ||
              request.destination === "style",
            handler: "NetworkFirst",
            options: {
              cacheName: "app-shell",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
              },
            },
          },
          
          // MEDIUM PRIORITY: Cache images (required for offline)
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "images-cache",
              expiration: {
                maxEntries: 500,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },

          // LOWER PRIORITY: Cache audio files (optional for offline)
          {
            urlPattern: ({ request }) => request.destination === "audio",
            handler: "CacheFirst",
            options: {
              cacheName: "audio-cache",
              expiration: {
                maxEntries: 50, // Limit audio files to save storage
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },

          // Fallback for any audio served from assets
          {
            urlPattern: /.*\.mp3$/,
            handler: "CacheFirst",
            options: {
              cacheName: "audio-files",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],

        // Skip service worker for certain files
        skipWaiting: true,
        clientsClaim: true,
      },

      // PWA MANIFEST
      manifest: {
        name: "MedConcerns App",
        short_name: "MedConcerns",
        description: "Medical Concerns Tracking App",
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
            purpose: "any",
          },
          {
            src: "/512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/180.png",
            sizes: "180x180",
            type: "image/png",
            purpose: "any",
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