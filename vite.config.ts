import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@assets": resolve(__dirname, "attached_assets"),
    },
  },
  server: {
    host: "0.0.0.0", // 👈 permette l'accesso esterno
    strictPort: true,
    port: 5173,
    hmr: {
      clientPort: 443,
    },
  },
});
