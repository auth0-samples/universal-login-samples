// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        // entryFileNames: '[name].js',
        // chunkFileNames: '[name].js',
        // assetFileNames: '[name].[ext]'
        entryFileNames: 'index.js', // Single JavaScript output file
        assetFileNames: 'index.css', // Single CSS output file        
      }
    },

    cssCodeSplit: false, // Disable CSS code-splitting to bundle CSS in one file
  }
});