import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
export default defineConfig({
    plugins: [
        react(),
        dts({ // Generates .d.ts files
            insertTypesEntry: true,
            rollupTypes: true,
        }),
    ],
    build: {
        lib: {
            entry: './src/index.ts',
            name: 'base_react_package',
            fileName: (format) => `shared-components.${format}.js`, // Outputs ESM and UMD
            formats: ['es', 'umd']
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                },
            },
        },
    },
});