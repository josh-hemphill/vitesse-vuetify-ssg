import { createI18n } from 'vue-i18n';
import { VuetifyLocales, getCreateVuetifyWi18n } from './vuetify.js';
import type { UserModule } from '~/types.js';
type R<T> = Record<string, T>;

// Import i18n resources
// https://vitejs.dev/guide/features.html#glob-import
export const messages: R<any> = {};

if (import.meta.env.SSR) {
	const { normalize, parse, sep } = await import('path');
	const dynamicLangMs: [string, string[], R<R<object>>][] = Object.entries(
		import.meta.globEager('../../locales/**/*.(y(a)?ml|ts|js)'))
		.map(([key, value]) => {
			const { name, dir } = parse(key);
			const pathParts = normalize(dir).split(sep).filter((v) => v && v[0] !== '.');
			pathParts.push(name);

			if (pathParts[0] === 'locales') pathParts.shift();
			const lang = pathParts.shift() || 'en';

			if (value._default) value = value._default;
			else if (value.default) value = value.default;
			const data = { ...value };
			if (typeof data.$vuetify === 'string') data.$vuetify = (<Record<string, object>>VuetifyLocales)[data.$vuetify];
			if (pathParts[pathParts.length - 1] === '$') pathParts.pop();
			return [lang, pathParts, data];
		});
	for (const [lang, pathParts, value] of dynamicLangMs) {
		if (!messages[lang]) messages[lang] = {};
		let curObj = messages[lang];
		for (const part of pathParts) {
			if (!curObj[part]) curObj[part] = {};
			curObj = curObj[part];
		}
		Object.assign(curObj, value);
	}
}

export const install: UserModule = ({ app, router }) => {
	router.isReady().then(() => {
		const route = router.currentRoute.value;
		const lang = <string>route?.meta?.lang || 'en';
		const i18n = createI18n({
			legacy: false,
			locale: lang,
			numberFormats: {},
			datetimeFormats: {},
			messages,
		});
		const vuetify = getCreateVuetifyWi18n(i18n);
		app.use(vuetify);
		app.use(i18n);
	});
};
