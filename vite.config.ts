import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-plugin-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
    base: '/',
    server: {
        port: 5173,
        open: true,
        host: true,
    },
    plugins: [react(), tsconfigPaths()],
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: false,
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        },
        rollupOptions: {
            output: {
                manualChunks(id: string) {
                    if (id.includes('node_modules/three/')) return 'three';
                    if (id.includes('node_modules/@react-three/')) return 'three';
                    if (id.includes('node_modules/react-dom/') || id.includes('node_modules/react/') || id.includes('node_modules/react-router-dom/')) return 'vendor';
                    if (id.includes('node_modules/i18next/') || id.includes('node_modules/react-i18next/')) return 'i18n';
                    if (id.includes('node_modules/framer-motion/')) return 'motion';
                },
            },
        },
    },
    optimizeDeps: {
        include: ['react', 'react-dom', 'react-router-dom', 'firebase/app', 'firebase/analytics'],
    },
})
