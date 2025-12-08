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
//       includeAssets: [
//         "assets/images/*",
//         "assets/audio/*",
//       ],
//       workbox: {
//          maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
//         globPatterns: ["**/*.{js,css,html,svg,png,jpg,jpeg,mp3,mp4}"],
//         runtimeCaching: [
//           {
//             urlPattern: /^\/assets\/images\/.*\.(svg|png|jpg|jpeg)$/i,
//             handler: "CacheFirst",
//             options: {
//               cacheName: "image-cache",
//               expiration: {
//                 maxEntries: 200,
//                 maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
//               },
//             },
//           },
//         ],
//       },
//       manifest: {
//         name: "MedConcerns App",
//         short_name: "MedConcerns",
//         description: "MedConcerns App",
//         theme_color: "#ffffff",
//         background_color: "#ffffff",
//         display: "standalone",
//         scope: "/",
//         start_url: "/",
//         orientation: "landscape",
//         icons: [
//           {
//             src: "/192.png",
//             sizes: "192x192",
//             type: "image/png",
//           },
//           {
//             src: "/512.png",
//             sizes: "512x512",
//             type: "image/png",
//           },
//           {
//             src: "/180.png",
//             sizes: "180x180",
//             type: "image/png",
//           },
//         ],
//       },
//     }),
//   ],
//   server: {
//     hmr: {
//       overlay: false,
//     },
//     host: true,
//   },
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
          "images/*.{png,svg,jpg,jpeg,webp}",
          "assets/images/*.{png,svg,jpg,jpeg,webp}",
        ],

        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "images-cache",
              expiration: {
                maxEntries: 2000, 
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
                maxEntries: 100,
                maxAgeSeconds: 365 * 24 * 60 * 60,
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
