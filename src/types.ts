import type { ViteSSGContext } from 'vite-ssg';

export type UserModule = (ctx: ViteSSGContext) => void

export function defaultExport<T>(K: T): T {
	return typeof K === 'function'
		? K
		: (<{ default: typeof K }><unknown>K)?.default;
}
