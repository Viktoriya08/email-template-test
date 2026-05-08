import SftpClient from 'ssh2-sftp-client';
import type { Plugin } from 'vite';

interface DeployOptions {
	outDir: string;
	connectionOptions: {
		host: string;
		username: string;
		password: string;
	};
}

export function vitePluginDeploy(options: DeployOptions): Plugin {
	let distDir = 'dist';
	return {
		name: 'vite-plugin-deploy',
		apply: 'build',
		enforce: 'post',
		configResolved(cfg) {
			distDir = cfg.build.outDir;
		},
		closeBundle() {
			const input = distDir;
			const output = options.outDir;

			function config() {
				const config = {
					connect: {
						host: options.connectionOptions.host,
						username: options.connectionOptions.username,
						password: options.connectionOptions.password,
					},
					outputPath: output,
				};

				return config;
			}
			const start = new Date();

			async function deploy() {
				const client = new SftpClient();

				try {
					await client.connect(config().connect);
					await client.mkdir(output, true);
					await client.rmdir(output, true);
					client.on('upload', (info) => {
						// eslint-disable-next-line no-console
						console.log(`Uploaded ${info.source}`);
					});
					const rslt = await client.uploadDir(input, output, { useFastput: true });
					return rslt;
				}
				catch (err) {
					console.error(err);
				}
				finally {
					client.end();
				}
			}

			return deploy()
				.then(() => {
					const end = new Date();
					const time = end.getTime() - start.getTime();
					// eslint-disable-next-line no-console
					console.log(`\x1B[32m Deploy: Finished in ${time / 1000}s`);
				})
				.catch((err) => {
					console.error(`\x1B[31m Deploy: Error ${err.message}`);
				});
		},
	};
}
