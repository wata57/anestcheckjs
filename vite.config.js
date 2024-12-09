import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslint(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "AnestCheck",
        short_name: "AnestCheck",
        description: "",
        display: "standalone",
        start_url: "/",
        theme_color: "#3b82f6",
        background_color: "#3b82f6",
        icons: [
          {
            src: "web-app-manifest-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "web-app-manifest-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
