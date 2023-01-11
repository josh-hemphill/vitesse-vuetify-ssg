/// <reference types="vitest" />
import * as path from 'path';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';
import Components from 'unplugin-vue-components/vite';
import { Vuetify3Resolver } from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite';
import Markdown from 'vite-plugin-md';
import { VitePWA } from 'vite-plugin-pwa';
import vueI18n from '@intlify/unplugin-vue-i18n/vite';
import Inspect from 'vite-plugin-inspect';
import Prism from 'markdown-it-prism';
import vuetify from 'vite-plugin-vuetify';
import UnoCss from '@unocss/vite';
import * as _LinkAttributes from 'markdown-it-link-attributes';
import { onRoutesGenerated } from './shared-config/routesGenerator.js';
import { defaultExport } from './src/types.js';
const LinkAttributes = defaultExport(_LinkAttributes);

const basePath = `${path.resolve(__dirname, 'src')}/`;
const sharedConfigPath = `${path.resolve(__dirname, 'shared-config')}/`;

export default defineConfig({
	resolve: {
		alias: [
			{ find: '~/', replacement: basePath },
			{ find: 'S_CONFIG/', replacement: sharedConfigPath },
			{ find: /^~~\/(.*)\.js$/, replacement: `${basePath}$1.ts` },
		],
		extensions: [
		  ".js",
		  ".json",
		  ".jsx",
		  ".mjs",
		  ".md",
		  ".ts",
		  ".tsx",
		  ".vue",
		  ".css",
		  ".scss",
		],
	},
	plugins: [
		Vue({
			include: [/\.vue$/, /\.md$/],
		}),

		// https://github.com/hannoeru/vite-plugin-pages
		Pages({
			/* extendRoute: (rt, parent) => {
				console.dir({ rt, parent });
			}, */
			extensions: ['vue', 'md'],
			onRoutesGenerated,
		}),

		// https://github.com/JohnCampionJr/vite-plugin-vue-layouts
		Layouts(),

		// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
		vuetify({
			autoImport: false,
		}),

		// https://github.com/antfu/unplugin-auto-import
		AutoImport({
			imports: [
				'vue',
				'vue-router',
				'vue-i18n',
				'@vueuse/head',
				'@vueuse/core',
				'pinia',
				{
					vuetify: [
						'useDisplay',
					],
					'@mdi/js': Object.keys(await import('@mdi/js')).filter(v=>v.startsWith('mdi')),
				},
			],
			vueTemplate: true,

			// Generate corresponding .eslintrc-auto-import.json file.
			// eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
			eslintrc: {
				enabled: true, // Default `false`
				filepath: './.eslintrc.auto-import.json', // Default `./.eslintrc-auto-import.json`
				globalsPropValue: 'readonly', // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
			},
			dts: 'src/auto.imports.d.ts',
		}),

		// https://github.com/antfu/unplugin-vue-components
		Components({
			// allow auto load markdown components under `./src/components/`
			extensions: ['vue', 'md'],

			dts: 'src/auto.components.d.ts',

			// allow auto import and register components used in markdown
			include: [/\.vue$/, /\.vue\?vue/, /\.md$/],

			// custom resolvers
			resolvers: [
				Vuetify3Resolver(),
			],
		}),

		// https://github.com/antfu/vite-plugin-md
		// Don't need this? Try vitesse-lite: https://github.com/antfu/vitesse-lite
		Markdown({
			wrapperClasses: 'prose prose-sm m-auto text-left',
			headEnabled: true,
			markdownItSetup(md) {
				// https://prismjs.com/
				md.use(Prism);
				md.use(LinkAttributes, {
					pattern: /^https?:\/\//,
					attrs: {
						target: '_blank',
						rel: 'noopener',
					},
				});
			},
		}),

		// https://github.com/antfu/vite-plugin-pwa
		VitePWA({
			registerType: 'autoUpdate',
			includeAssets: ['favicon.svg', 'robots.txt', 'safari-pinned-tab.svg'],
			manifest: {
				name: 'simplecrypt',
				short_name: 'simplecrypt',
				theme_color: '#ffffff',
				icons: [
					{
						src: '/pwa-192x192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: '/pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png',
					},
					{
						src: '/pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable',
					},
				],
			},
		}),

		// https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n
		vueI18n({
			runtimeOnly: true,
			compositionOnly: true,
			include: [path.resolve(__dirname, 'locales/**')],
		}),

		UnoCss({
			presets:[],
			rules:[
				// Auto-transform CSS classes to create your own directives
			]
		}),

		// https://github.com/antfu/vite-plugin-inspect
		Inspect({
			// change this to enable inspect for debugging
			enabled: false,
		}),
	],

	server: {
		fs: {
			strict: true,
		},
	},

	// https://github.com/antfu/vite-ssg
	ssgOptions: {
		crittersOptions: false,
		script: 'async defer',
		formatting: 'minify',
		includeAllRoutes: false,
		/* includedRoutes: (paths, routes) => {
			// console.log(routes.map((v) => v.children[0]));
			return paths;
		}, */
		/* onBeforePageRender: async(route, html, ctx) => {
			await ctx.router.isReady();
			return html;
		},
		onPageRendered: (route, html, ctx) => {
			return html;
		}, */
	},
	ssr: {
		noExternal: ['vuetify']
	},

	optimizeDeps: {
		include: [
			'vue',
			'vue-router',
			'@vueuse/core',
			'@vueuse/head',
			'vuetify',
			'@mdi/js',
		],
		exclude: [
			'vue-demi',
		],
	},
	build: {
		polyfillModulePreload: false,
		target: 'esnext',
	},

	// https://github.com/vitest-dev/vitest
	test: {
		include: ['test/**/*.test.ts'],
		environment: 'jsdom',
		deps: {
			inline: ['@vue', '@vueuse', 'vue-demi'],
		},
	},
});
