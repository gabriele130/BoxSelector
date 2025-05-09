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
    },
  },
  server: {
    host: true,
    strictPort: true,
    port: 5173,
    origin: "https://t29472-5173.csb.app", // ← il dominio del tuo workspace attuale su CodeSandbox
    hmr: {
      clientPort: 443,
    },
  },
});
