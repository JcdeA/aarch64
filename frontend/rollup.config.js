import svelte from "rollup-plugin-svelte";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import sveltePreprocess from "svelte-preprocess";
import typescript from "@rollup/plugin-typescript";
import css from "rollup-plugin-css-only";
import replace from "@rollup/plugin-replace";
import mdsvexPages from "rollup-plugin-mdsvex-pages";

const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require("child_process").spawn(
				"npm",
				["run", "start", "--", "--dev"],
				{
					stdio: ["ignore", "inherit", "inherit"],
					shell: true,
				}
			);

			process.on("SIGTERM", toExit);
			process.on("exit", toExit);
		},
	};
}

export default {
	input: "src/main.ts",
	output: {
		sourcemap: true,
		format: "iife",
		name: "app",
		file: "public/build/bundle.js",
	},
	plugins: [
		replace({
			__apiRoute__: process.env.DEV ? "/api" : "https://console.aarch64.com/api",
			__production__: true,
		}),

		mdsvexPages({
			paths: ["docs"],
		}),

		svelte({
			extensions: [".svelte", ".md"],
			preprocess: sveltePreprocess(),
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production,
			},
		}),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: "bundle.css" }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ["svelte"],
		}),
		commonjs(),
		typescript({
			sourceMap: !production,
			inlineSources: !production,
		}),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload({
			watch: "public", 
			clientUrl: process.env.GITPOD_WORKSPACE_URL ? 
			process.env.GITPOD_WORKSPACE_URL.replace('https://','https://8080-') + '/livereload.js': undefined,
		}),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser(),
	],
	watch: {
		clearScreen: false,
	},
};
