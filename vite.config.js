import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@assets": resolve(__dirname, "attached_assets"),

    },
  },
  server: {
    host: true,
    origin: "https://*.csb.app",
    port: 5173,
    strictPort: true,
  },
});
