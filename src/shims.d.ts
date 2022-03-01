/* eslint-disable import/no-duplicates */

declare interface Window {
	// extend the window
}

// with vite-plugin-md, markdowns can be treat as Vue components
declare module '*.md' {
	import type { ComponentOptions } from 'vue';
	const component: ComponentOptions;
	export default component;
}

declare module 'vuetify/lib/locale/adapters/vue-i18n.mjs' {
	import type { I18n, useI18n } from 'vue-i18n';
	import type { LocaleAdapter } from 'vuetify/lib/composables/locale';
	import type { RtlOptions } from 'vuetify/lib/composables/rtl';

	type VueI18nAdapterParams = {
		i18n: I18n<{}, {}, {}, string, false>
		useI18n: typeof useI18n
	} & RtlOptions

	export function createVueI18nAdapter ({ i18n, useI18n, ...rest }: VueI18nAdapterParams): (LocaleAdapter & RtlOptions)
}
