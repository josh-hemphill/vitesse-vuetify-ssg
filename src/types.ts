import type { ViteSSGContext } from 'vite-ssg';

import type { Pinia } from 'pinia';
import type { Awaitable } from '@vueuse/core';

export type UserModule = (ctx: ViteSSGContext) => Awaitable<void>
export type PiniaModule = (ctx: Pinia) => Awaitable<void>

export function defaultExport<T>(K: T): T {
	return typeof K === 'function'
		? K
		: (<{ default: typeof K }><unknown>K)?.default;
}
