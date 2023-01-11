// Styles
import 'vuetify/styles';
import { createVueI18nAdapter } from 'vuetify/lib/locale/adapters/vue-i18n.mjs';
import { useI18n } from 'vue-i18n';
import type { I18n } from 'vue-i18n';

// Vuetify
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';
import type { UserModule } from '~/types.js';
import { isDark } from '~~/logic/index.js';

export * as VuetifyLocales from 'vuetify/locale';
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export const getCreateVuetifyWi18n = (i18n: I18n<R<any>, {}, {}, string, false>) => {
	return createVuetify({
		icons: {
			defaultSet: 'mdi',
			aliases,
			sets: {
				mdi,
			},
		},
		theme: {
			defaultTheme: isDark.value ? 'dark' : 'light',
		},
		locale: createVueI18nAdapter({
			i18n,
			useI18n,
		}),
	});
};

// https://github.com/antfu/vite-plugin-pwa#automatic-reload-when-new-content-available
export const install: UserModule = async() => {
};
