import { join, resolve } from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import autoprefixer from 'autoprefixer';
import postcssShort from 'postcss-short';
import sortMediaQueries from 'postcss-sort-media-queries';
import juice from '@vituum/vite-plugin-juice';
import VitePluginSvgSpritemap from '@spiriit/vite-plugin-svg-spritemap';
import Unfonts from 'unplugin-fonts/vite';
import pxtorem from 'postcss-pxtorem';
import postcssFunctions from 'postcss-functions';
import { getAllPages, getFonts } from './config/helpers';
import { vitePluginDeploy } from './config/plugins/deploy/vite-plugin-deploy';
import vitePluginPug from './config/plugins/pug/vite-plugin-pug';
import svgoConfig from './svgo.config';
import {
	em,
	fluid,
	percent,
} from './config/postcss/functions';

import {
	BASE_PORT,
	FTP_OPTIONS,
	FTP_PRODUCTION_OPTIONS,
	OUTPUT_DIR,
	PROJECT_NAME,
	PROJECT_TITLE,
	PROJECT_URL,
	SOURCE_DIR,
	VIEWS_DIR,
} from './project.config';

export default defineConfig(({ mode }) => {
	const IS_DEV = mode === 'development';
	const IS_PRODUCTION = mode === 'production';
	const IS_INITIAL = mode === 'initial';
	const IS_DEPLOY = mode === 'deploy';
	const IS_DEPLOY_PRODUCTION = mode === 'deploy-production';
	const IS_BUILD = IS_PRODUCTION || IS_DEPLOY_PRODUCTION;

	let BASE_URL = '/';

	if (IS_DEPLOY)
		BASE_URL = `/${PROJECT_NAME}/`;

	else if (IS_BUILD || IS_INITIAL)
		BASE_URL = PROJECT_URL;

	const PAGES = getAllPages(VIEWS_DIR);
	const FONTS = getFonts(`${SOURCE_DIR}/public/fonts`);

	return {
		base: BASE_URL,
		server: {
			host: '0.0.0.0',
			port: BASE_PORT,
			// Для работы api
			// proxy: {
			// 	'/api': {
			// 		target: '', // Пример: http://space.xpage.ru.192.168.88.128.nip.io
			// 		changeOrigin: true,
			// 		secure: false,
			// 		cookieDomainRewrite: {
			// 			'*': '',
			// 		},
			// 	},
			// },
		},
		root: SOURCE_DIR,
		envDir: '../',
		build: {
			minify: 'terser',
			cssMinify: 'lightningcss',
			manifest: IS_BUILD,
			outDir: OUTPUT_DIR,
			rollupOptions: {
				input: IS_BUILD
					? resolve(SOURCE_DIR, 'scripts/main.ts')
					: {
							index: resolve(SOURCE_DIR, 'index.html'),
							...PAGES,
						},

				output: {
					chunkFileNames: 'scripts/[name]-chunk-[hash].js',
					entryFileNames: 'scripts/index-[hash].js',
					assetFileNames: ({ name }) => {
						if (/\.css$/.test(name ?? '')) {
							if (Object.keys(PAGES).includes(name.split('.')[0]))
								return 'styles/index-[hash][extname]';

							return 'styles/[name]-[hash][extname]';
						}
						if (/.(woff2|woff)$/.test(name ?? ''))
							return 'fonts/[name][extname]';

						if (/.(ico|jpg|png|webp|avif|svg)$/.test(name ?? ''))
							return 'img/[name][extname]';

						if (/.(mp4)$/.test(name ?? ''))
							return 'videos/[name][extname]';

						return 'assets/[name][extname]';
					},
				},
			},
			emptyOutDir: true,
		},
		css: {
			devSourcemap: IS_DEV,
			preprocessorOptions: {
				sass: {
					additionalData: `
					@import "@styles/base/nested"\n
					$isDev: ${IS_DEV}\n
					$BASE_URL: "${BASE_URL}"\n`,
				},
			},
			postcss: {
				plugins: [
					autoprefixer(),
					postcssShort(),
					...(IS_DEV ? [] : [sortMediaQueries()]),
					pxtorem({
						propList: [
							'*',
						],
						selectorBlackList: [
							'line-height',
							'letter-spacing',
						],
						exclude: (filePath) => {
							// Исключаем файлы из папки src/styles/emails
							return filePath.includes('/styles/emails/') || filePath.includes('\\styles\\emails\\');
						},
					}),
					postcssFunctions({
						functions: {
							fluid,
							em,
							percent,
						},
					}),
				],
			},
		},
		resolve: {
			alias: {
				'vue': 'vue/dist/vue.esm-bundler.js',
				'@': SOURCE_DIR,
				'@components': join(SOURCE_DIR, 'components'),
				'@scripts': join(SOURCE_DIR, 'scripts'),
				'@styles': join(SOURCE_DIR, 'styles'),
				'@img': join(SOURCE_DIR, 'assets/img'),
			},
		},
		plugins: [
			Unfonts({
				custom: {
					display: 'swap',
					families: FONTS,
				},
			}),
			juice({
				paths: [`${SOURCE_DIR}/views/emails`],
			}),
			vue(),
			vitePluginPug({
				serve: {
					options: {
						basedir: `${SOURCE_DIR}/templates`,
					},
					locals: {
						PROJECT_TITLE,
						IS_DEV,
						BASE_URL,
					},
				},
				build: {
					options: {
						basedir: `${SOURCE_DIR}/templates`,
						pretty: true,
					},
					locals: {
						PROJECT_TITLE,
						IS_DEV,
						BASE_URL,
					},
				},
			}),
			VitePluginSvgSpritemap(`./src/assets/icons/**/*.svg`, {
				prefix: 'icon-',
				injectSVGOnDev: true,
				output: {
					filename: '../img/icons.svg',
				},
				svgo: {
					...svgoConfig,
				},
			}),
			...(IS_DEPLOY
				? [
						vitePluginDeploy({
							outDir: FTP_OPTIONS.serverPath,
							connectionOptions: {
								host: FTP_OPTIONS.host,
								username: FTP_OPTIONS.user,
								password: FTP_OPTIONS.password,
							},
						}),
					]
				: IS_DEPLOY_PRODUCTION
					? [
							vitePluginDeploy({
								outDir: FTP_PRODUCTION_OPTIONS.serverPath,
								connectionOptions: {
									host: FTP_PRODUCTION_OPTIONS.host,
									username: FTP_PRODUCTION_OPTIONS.user,
									password: FTP_PRODUCTION_OPTIONS.password,
								},
							}),
						]
					: []),
		],
	};
});
