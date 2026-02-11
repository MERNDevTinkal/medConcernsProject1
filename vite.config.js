// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";
// import { VitePWA } from "vite-plugin-pwa";

// export default defineConfig({
//   plugins: [
//     react(),
//     tailwindcss(),
//     VitePWA({
//       registerType: "autoUpdate",
//       workbox: {
//         maximumFileSizeToCacheInBytes: 20 * 1024 * 1024,

//         globPatterns: [
//           "**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp}",
//           "assets/*.{png,svg,jpg,jpeg,webp}"
//         ],

//       runtimeCaching: [
//         {
//           urlPattern: ({ request }) => request.destination === "image",
//           handler: "CacheFirst",
//           options: {
//             cacheName: "images-cache",
//             expiration: {
//               maxEntries: 2000,
//               maxAgeSeconds: 365 * 24 * 60 * 60,
//             },
//           },
//         },
//         {
//           urlPattern: ({ request }) => request.destination === "audio",
//           handler: "CacheFirst",
//           options: {
//             cacheName: "audio-cache",
//             expiration: {
//               maxEntries: 100,
//               maxAgeSeconds: 365 * 24 * 60 * 60,
//             },
//           },
//         },
//       ],
//     },

//       // PWA MANIFEST
//       manifest: {
//       name: "MedConcerns App",
//       short_name: "MedConcerns",
//       description: "MedConcerns App",
//       start_url: "/",
//       scope: "/",
//       display: "standalone",
//       orientation: "landscape",
//       background_color: "#ffffff",
//       theme_color: "#ffffff",

//       icons: [
//         {
//           src: "/192.png",
//           sizes: "192x192",
//           type: "image/png",
//         },
//         {
//           src: "/512.png",
//           sizes: "512x512",
//           type: "image/png",
//         },
//         {
//           src: "/180.png",
//           sizes: "180x180",
//           type: "image/png",
//         }
//       ]
//     }
//     })
//   ],

// server: {
//   host: true,
//     hmr: { overlay: false },
// },
// });

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
        maximumFileSizeToCacheInBytes: 20 * 1024 * 1024,

        globPatterns: [
          "**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp}",
          "assets/*.{png,svg,jpg,jpeg,webp}"
        ],

        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "images-cache",
              expiration: {
                maxEntries: 3000,
                maxAgeSeconds: 365 * 24 * 60 * 60,
              },
            },
          },
          {
            urlPattern: ({ request }) => request.destination === "audio",
            handler: "CacheFirst",
            options: {
              cacheName: "audio-cache",
              expiration: {
                maxEntries: 500,
                maxAgeSeconds: 365 * 24 * 60 * 60,
              },
            },
          },
          {
            urlPattern: ({ request }) =>
              request.destination === "document" ||
              request.destination === "script" ||
              request.destination === "style",
            handler: "CacheFirst",
            options: {
              cacheName: "app-shell",
            },
          },
          {
            urlPattern: ({ url }) =>
              url.hostname === "v1.checkprojectstatus.com" &&
              url.pathname.startsWith("/medConcerns/api/v1"),
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              networkTimeoutSeconds: 3,
              expiration: {
                maxEntries: 500,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
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
          }
        ]
      }
    })
  ],

  server: {
    host: true,
    hmr: { overlay: false },
  },
});

