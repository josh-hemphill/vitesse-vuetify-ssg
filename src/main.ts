import { ViteSSG } from 'vite-ssg';
import generatedRoutes from 'virtual:generated-pages';
import { setupLayouts } from 'virtual:generated-layouts';
import App from './App.vue';
// your custom styles here
import './styles/main.css';

const routes = setupLayouts(generatedRoutes);

const getName = (str: string) => {
	let parts = str.split('/');
	parts = parts[parts.length - 1].split('.');
	return parts[0];
};

export const createApp = ViteSSG(
	App,
	{ routes },
	async(ctx) => {
		// install all modules under `modules/`
		const detected: string[] = [];
		const mods = Object.entries(import.meta.globEager('./modules/*.ts'))
			.map((i) => {
				detected.push(getName(i[0]));
				return i[1].install?.(ctx);
			});
		await Promise
			.all(mods);
	},
);
