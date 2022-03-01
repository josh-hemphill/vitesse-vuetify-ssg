import fs from 'fs';
import glob from 'fast-glob';
import YAML from 'yaml';
import type { RouteRecordRaw } from 'vue-router';
import { DEFAULT_LANG } from './defaults-config.js';
type Route = RouteRecordRaw

export const getLangs = () => Object.fromEntries(
	glob.sync('./locales/*.y(a)?ml')
		.map((v) => {
			const yaml = v.endsWith('.yaml');
			return [v.slice(10, yaml ? -5 : -4), v];
		}),
);
// Import i18n resources
// https://vitejs.dev/guide/features.html#glob-import
export const getMessages = () => Object.fromEntries(
	Object.entries(getLangs())
		.map(([k, v]) => {
			const file = fs.readFileSync(v, 'utf8');
			const doc = YAML.parseDocument(file);
			return [k, doc.contents];
		}),
);
export const onRoutesGenerated = (routes: Route[]) => {
	const lRoutes: Route[] = [];
	/* console.log('');
	console.dir({ routes }); */
	for (let i = 0; i < routes.length; i++) {
		const v = routes[i].path;
		if (v.startsWith('/:all')) {
			lRoutes.push({ ...routes[i], path: '/error' });
			continue;
		}

		if (v === '/' && !routes[i].meta?.lang) {
			routes[i].meta.lang = DEFAULT_LANG;
			continue;
		}

		if (v.startsWith('/:lang')) {
			const LANGS = Object.keys(getLangs());
			const langPath = v.slice(6) || '/index';
			if (!LANGS.length) LANGS.push('en');
			lRoutes.push(...LANGS
				.map((ln): typeof routes[0] => ({
					...routes[i],
					name: ln,
					path: `/${ln}${langPath}`,
					meta: { ...(routes[i]?.meta || {}), lang: ln },
					alias: langPath.endsWith('index') ? `/${ln}$/` : undefined,
				})));
			lRoutes.push({
				...routes[i],
				name: langPath.slice(1),
				path: langPath,
				meta: { ...(routes[i]?.meta || {}), lang: DEFAULT_LANG },
				alias: langPath.endsWith('index') ? `/` : undefined,
			});
			continue;
		}
		lRoutes.push(routes[i]);
	}
	// console.dir({ lRoutes: lRoutes.map((v) => v.path) });
	return lRoutes;
};
