import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';
import socketioPlugin from './vite-plugin-socketio.js';

export default defineConfig({
	plugins: [sveltekit(), socketioPlugin()],
	resolve: {
		alias: {
			$: path.resolve('./src/')
		}
	},
	server: {
		proxy: {
			'/socket-io/socket.io': {
				target: 'http://localhost:3000',
				ws: true
			}
		}
	},
});
