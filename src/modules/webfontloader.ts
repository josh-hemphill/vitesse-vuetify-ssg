import type { UserModule } from '~/types.js';
/**
 * plugins/webfontloader.js
 *
 * webfontloader documentation: https://github.com/typekit/webfontloader
 */

export const install: UserModule = async({ isClient }) => {
	if (!isClient) return;
	const webFontLoader = await import(/* webpackChunkName: "webfontloader" */'webfontloader');

	webFontLoader.load({
		google: {
			families: ['Roboto:100,300,400,500,700,900&display=swap'],
		},
	});
};
