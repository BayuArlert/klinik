import { createInertiaApp } from '@inertiajs/react';
import { createRoot, hydrateRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Klinik Sehat';

const pages = import.meta.glob('./pages/**/*.tsx');

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: async (name) => {
        const page = pages[`./pages/${name}.tsx`];

        if (!page) {
            throw new Error(`Page not found: ${name}`);
        }

        return ((await page()) as { default: unknown }).default as any;
    },
    setup({ el, App, props }) {
        if (import.meta.env.SSR) {
            return; // Dihandle oleh @inertiajs/vite di backend
        }

        if (el.hasChildNodes()) {
            hydrateRoot(el, <App {...props} />);
        } else {
            createRoot(el).render(<App {...props} />);
        }
    },
    progress: {
        color: '#0d9488',
    },
});
