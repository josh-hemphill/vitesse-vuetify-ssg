import { createI18n } from 'vue-i18n';
import { messages } from '../../locales/index.js';
import { getCreateVuetifyWi18n } from './vuetify.js';
import type { UserModule } from '~/types.js';

// Import i18n resources
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
