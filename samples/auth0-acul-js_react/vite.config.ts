import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: "esnext",
    rollupOptions: {
      output: {
        entryFileNames: "index.js", // Single JavaScript output file
        assetFileNames: "index.css", // Single CSS output file
        manualChunks: () => "index.js", // Force single chunk
      },
    },
    cssCodeSplit: false, // Disable CSS code-splitting to bundle CSS in one file
  },
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true, // Disable "Dependency is not used" warning
      },
    },
  },
});
