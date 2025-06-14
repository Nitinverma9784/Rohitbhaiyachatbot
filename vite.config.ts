import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 3000, // Default React port
    open: true  // Automatically open browser
  },
  build: {
    outDir: "dist", // Output directory for build
    emptyOutDir: true // Empty output directory before build
  },
  optimizeDeps: {
    include: ["@google/genai"] // If using Google GenAI
  }
});