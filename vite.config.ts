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
                manualChunks: {
                    vendor: ['react', 'react-dom', 'react-router-dom'],
                    i18n: ['i18next', 'react-i18next'],
                    motion: ['framer-motion'],
                },
            },
        },
    },
    optimizeDeps: {
        include: ['react', 'react-dom', 'react-router-dom', 'firebase/app', 'firebase/analytics'],
    },
})
