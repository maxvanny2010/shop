import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';
import eslint from 'vite-plugin-eslint';
import svgr from 'vite-plugin-svgr';
import {fileURLToPath} from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({mode}) => {
	console.log(`Running in ${mode} mode`);
	const isDevelopment = mode === 'development';

	return {
		plugins: [
			react(),
			eslint(),
			svgr(),
		],
		server: {
			port: 3000,
			proxy: isDevelopment
				? {
					'/api': {
						target: 'http://localhost:3001',
						changeOrigin: true,
						rewrite: (path) => path.replace(/^\/api/, ''),
					},
				}
				: undefined,
		},
		resolve: {
			alias: {
				'@assets': path.resolve(__dirname, './src/access'),
			},
		},
	};
});
