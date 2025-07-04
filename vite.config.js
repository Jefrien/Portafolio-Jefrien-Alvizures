import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import tailwindcss from "@tailwindcss/vite"
import path from "node:path"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		preact({
			prerender: {
				enabled: true,
				renderTarget: '#app',
				additionalPrerenderRoutes: ['/404'],
				previewMiddlewareEnabled: true,
				previewMiddlewareFallback: '/404',
			},
		}),
		tailwindcss(),
	],
	resolve: {
		alias: {
			"react": "preact/compat",
			"react-dom/test-utils": "preact/test-utils",
			"react-dom": "preact/compat",
			"react/jsx-runtime": "preact/jsx-runtime",
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
