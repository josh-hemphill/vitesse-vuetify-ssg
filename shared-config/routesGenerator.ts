import * as fs from 'fs';
import * as _glob from 'fast-glob';
import * as _YAML from 'yaml';
import type { RouteRecordRaw } from 'vue-router';
import { MESSAGE_GLOB, getMessages as compileMessages } from '../locales/index.js';
import { defaultExport } from '../src/types.js';
import { DEFAULT_LANG } from './defaults-config.js';
const glob = defaultExport(_glob);
const YAML = defaultExport(_YAML);
type Route = RouteRecordRaw

const Langs: Set<string> = new Set();
const LangFiles: { path: string;name: string;ext: string }[]
	= glob.sync(`../locales/${MESSAGE_GLOB}`, { objectMode: true })
		.map(({ path, name }) => {
			const lang = path.split('/').filter((v) => v && v[0] !== '.').shift();
			if (!lang)
				throw new Error(`invalid language file: ${path}`);
			const ext = name.split('.').pop();
			if (!ext)
				throw new Error(`invalid file extension: ${path}`);
			if (lang)
				Langs.add(lang);
			return ({ path, name, lang, ext });
		});

export const getLangs = () => Array.from(Langs.values());

// Import i18n resources
// https://vitejs.dev/guide/features.html#glob-import
export const getMessages = async () => {
	const mapped: Record<string, unknown> = {};
	for (const { path, ext } of LangFiles) {
		const file = fs.readFileSync(path, 'utf8');
		const getYaml = (str: string) => (<any>YAML.parseDocument(str).contents);
		const getImport = (str: string) => import(str).then((v) => defaultExport(v));
		const getJson = (str: string) => JSON.parse(str);
		const content = await ({
			yaml: getYaml,
			yml: getYaml,
			json: getJson,
			ts: getImport,
			js: getImport,
		}[ext] || getImport)(file);
		mapped[path] = content;
	}

	return compileMessages(mapped);
};

export const onRoutesGenerated = (routes: Route[]) => {
	const lRoutes: Route[] = [];
	/* console.log('');
	console.dir({ routes }); */
	for (let i = 0; i < routes.length; i++) {
		const lRoute = routes[i];
		const v = lRoute.path;
		if (v.startsWith('/:all')) {
			lRoutes.push({ ...lRoute, path: '/error' });
			continue;
		}

		if (v === '/' && !lRoute.meta?.lang) {
			if (!lRoute.meta)
				lRoute.meta = {};
			lRoute.meta.lang = DEFAULT_LANG;
			continue;
		}

		if (v.startsWith('/:lang')) {
			const LANGS = Array.from(getLangs());
			if (!LANGS.length)
				LANGS.push('en');
			const langPath = v.slice(6) || '/index';
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
				alias: langPath.endsWith('index') ? '/' : undefined,
			});
			continue;
		}
		lRoutes.push(routes[i]);
	}
	// console.dir({ lRoutes: lRoutes.map((v) => v.path) });
	return lRoutes;
};
