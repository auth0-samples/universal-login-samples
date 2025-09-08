import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const rootNodeModules = path.resolve(__dirname, "../../../node_modules");

export default defineConfig({
  plugins: [react()],
  // resolve: {
  //   alias: {
  //     react: path.resolve(rootNodeModules, "react"),
  //     "react-dom": path.resolve(rootNodeModules, "react-dom"),
  //   },
  //   dedupe: ["react", "react-dom"],
  // },
  build: {
    target: "esnext",
    rollupOptions: {
      output: {
        entryFileNames: "index.js",      // Single JS output
        assetFileNames: "index.css",     // Single CSS output
        manualChunks: () => "index.js",  // Force single chunk
      },
    },
    cssCodeSplit: false, // Bundle all CSS into one file
  },
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
      },
    },
  },
});
