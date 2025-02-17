import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import dts from 'vite-plugin-dts';
import path from "path";

import { peerDependencies } from "./package.json";

const __dirname = dirname(fileURLToPath(import.meta.url))
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({ tsconfigPath: './tsconfig.app.json', rollupTypes: true, exclude: ["src/**/*.stories.*"] }), // Output .d.ts files


  ],
  // copid below resolve block from shadcn-ui installation guide.
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'), //'./src/index.ts',
      name: 'react_components',
      // fileName: (format) => `react_components.${format}.js`,
      fileName: 'react_components',
      formats: ['es', 'cjs', 'umd'],
      cssFileName: 'styles',
    },
    rollupOptions: {
      external: Object.keys(peerDependencies),
      output: { globals: { 'react': 'React', 'react-dom': 'ReactDOM', 'lucide-react': 'lucideReact', 'oidc-client-ts': 'oidcClientTs', "@tanstack/react-query": "reactQuery", "node-cache": "NodeCache", "next-themes": "nextThemes" } }
    }
  },
})
