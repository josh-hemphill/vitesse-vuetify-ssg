import * as vuetifyLocales from 'vuetify/locale';
import { proto } from '../src/utils.js';
type R<T> = Record<string, T>;
type VuetifyLocaleMap = typeof vuetifyMap;
type Locales = keyof VuetifyLocaleMap;
const vuetifyMap = {
	'de': 'de',
	'en': 'en',
	'es': 'es',
	'fr': 'fr',
	'it': 'it',
	'ja': 'ja',
	'ko': 'ko',
	'pt-BR': 'pt',
	'ru': 'ru',
	'tr': 'tr',
	'vi': 'vi',
	'zh-CN': 'zhHans',
} as const;
const mappedVuetifyLocales = Object.fromEntries(Object.entries(vuetifyMap).map(([l, v]) => {
	return [l, vuetifyLocales[v]] as const;
}));
const seenLangs: string[] = [];
export const getMessages = (globImport: Record<string, any>) => ((<[string, string[], R<R<object>>][]>Object.entries(
	globImport,
)
	.flatMap(([key, value]) => {
		const pathParts = key.split('/').filter((v) => v && v[0] !== '.');
		const name = pathParts.pop()?.split('.').shift();
		pathParts.push(name || '');

		if (pathParts[0] === 'locales') pathParts.shift();
		const lang = <Locales>(pathParts.shift() || 'en');
		if (!vuetifyMap[lang]) console.warn(`Language '${lang}' missing mapping to vuetify language`);

		if (value._default) value = value._default;
		else if (value.default) value = value.default;
		const data = { ...value };
		const $vuetify = data.$vuetify;
		if (typeof $vuetify === 'string' && proto.hasProperty(mappedVuetifyLocales, $vuetify))
			data.$vuetify = mappedVuetifyLocales[$vuetify];

		if (pathParts[pathParts.length - 1] === '$') pathParts.pop();
		const result = [[lang, pathParts, data]];
		if (!seenLangs.includes(lang)) {
			seenLangs.push(lang);
			result.push([lang, ['$vuetify'], mappedVuetifyLocales[lang]]);
		}

		return result;
	})).reduce((acc, [lang, pathParts, value]) => {
	if (!acc[lang]) acc[lang] = {};
	let curObj = acc[lang];
	for (const part of pathParts) {
		if (!curObj[part]) curObj[part] = {};
		curObj = curObj[part];
	}
	Object.assign(curObj, value);
	return acc;
}, <R<any>>{}));
export const MESSAGE_GLOB = '*/**/*.(y(a)?ml|ts|js)';
export const messages = () => getMessages(
	// https://vitejs.dev/guide/features.html#glob-import
	import.meta.globEager('./*/**/*.(y(a)?ml|ts|js)'),
);
