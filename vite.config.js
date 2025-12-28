import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Configuration Vite en mode librairie pour packager le composant SmartModal.
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.js"),
      name: "SmartModal",
      formats: ["es", "cjs"],
      fileName: (format) =>
        format === "es"
          ? "smart-modal-hrnet.es.js"
          : "smart-modal-hrnet.cjs"
    },
    copyPublicDir: false,
    emptyOutDir: true,
    rollupOptions: {
      // Les dépendances peer sont externes pour éviter de les re-bundler.
      external: ["react", "react-dom", "styled-components"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "styled-components": "styled"
        }
      }
    }
  }
});
