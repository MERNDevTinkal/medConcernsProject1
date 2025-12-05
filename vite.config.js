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
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
        globPatterns: [
          "assets/icons/*.{png,svg,jpg,jpeg}",
          "assets/basic/*.{png,svg,jpg,jpeg}"
        ],
        runtimeCaching: [
          {
            urlPattern: ({ url }) =>
              url.pathname.startsWith("/images/") ||
              url.pathname.startsWith("/assets/images/"),

            handler: "CacheFirst",
            options: {
              cacheName: "dynamic-images-cache",
              expiration: {
                maxEntries: 60,          
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
            },
          },

          {
            urlPattern: ({ url }) =>
              url.pathname.startsWith("/audio/") ||
              url.pathname.startsWith("/assets/audio/"),

            handler: "CacheFirst",
            options: {
              cacheName: "dynamic-audio-cache",
              expiration: {
                maxEntries: 20,          
                maxAgeSeconds: 30 * 24 * 60 * 60,
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
    hmr: { overlay: false },
    host: true,
  },
});
