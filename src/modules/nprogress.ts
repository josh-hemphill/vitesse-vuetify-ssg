import * as _NProgress from 'nprogress';
import type { UserModule } from '~/types.js';
const NProgress = (<{ default: typeof _NProgress }><unknown>_NProgress)?.default || _NProgress;
console.log(NProgress);

export const install: UserModule = ({ isClient, router }) => {
	if (isClient) {
		router.beforeEach(() => { NProgress.start() });
		router.afterEach(() => { NProgress.done() });
	}
};
