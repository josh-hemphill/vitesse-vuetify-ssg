import { createPinia } from 'pinia';
import type { UserModule } from '~/types';

// Setup Pinia
// https://pinia.esm.dev/
export const install: UserModule = async({ isClient, initialState, app }) => {
	const pinia = createPinia();
	app.use(pinia);
	// install all pinia modules under `pinia/`
	const mods = Object.entries(import.meta.globEager('./pinia/*.ts'))
		.map((i) => {
			return i[1].install?.(pinia);
		});
	await Promise
		.all(mods);
	// Refer to
	// https://github.com/antfu/vite-ssg/blob/main/README.md#state-serialization
	// for other serialization strategies.
	if (isClient)
		pinia.state.value = (initialState.pinia) || {};

	else
		initialState.pinia = pinia.state.value;
};
