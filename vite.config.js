import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import { bunny } from 'laravel-vite-plugin/fonts';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            // app.* is the admin; landing/main.tsx is the public demo showcase.
            input: ['resources/css/app.css', 'resources/js/app.js', 'resources/js/landing/main.tsx'],
            refresh: true,
            fonts: [
                bunny('DM Sans', {
                    weights: [400, 500, 600],
                    optimizedFallbacks: false,
                }),
                bunny('Fraunces', {
                    weights: [400, 600],
                    optimizedFallbacks: false,
                }),
            ],
        }),
        react(),
        tailwindcss(),
    ],
    server: {
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});
