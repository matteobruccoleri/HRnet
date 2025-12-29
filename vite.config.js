import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Configuration Vite pour une application React
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    emptyOutDir: true
  }
});
