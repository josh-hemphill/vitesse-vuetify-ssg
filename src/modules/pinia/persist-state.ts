import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import type { PiniaModule } from '~/types.js';

export const install: PiniaModule = (pinia) => {
	pinia.use(piniaPluginPersistedstate);
};
