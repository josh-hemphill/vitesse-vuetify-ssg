import { ViteSSG } from 'vite-ssg';
import generatedRoutes from 'virtual:generated-pages';
import { setupLayouts } from 'virtual:generated-layouts';
import App from './App.vue';
// your custom styles here
import 'uno.css'
import './styles/main.css';

const routes = setupLayouts(generatedRoutes);

const getName = (str: string) => str.split('/').pop()?.split('.')?.[0] || '';

export const createApp = ViteSSG(
	App,
	{ routes },
	async(ctx) => {
		// install all modules under `modules/`
		const detected: string[] = [];
		const mods = Object.entries(import.meta.glob('./modules/*.ts', { eager: true }))
			.map((i) => {
				detected.push(getName(i[0]));
				return (<Record<string,CallableFunction>>(i[1])).install?.(ctx);
			});
		await Promise
			.all(mods);
	},
);
