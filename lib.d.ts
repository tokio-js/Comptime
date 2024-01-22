import { Plugin, PluginBuild } from "npm:esbuild";

/**
 * The ComptimePlugin interface.
 * 
 * This contains the name of the plugin and the setup function.
 * 
 * Example:
 * ```ts
 * import { add, plugin } from "@comptime";
 * import * as esbuild from "esbuild";
 * 
 * add("foo", { bar: "baz" });
 * add("version", () => {
 *     const version = Deno.readTextFileSync("version.txt");
 *     return version + "-" + new Date().toISOString();
 * });
 * 
 * await esbuild.build({
 *     entryPoints: ["index.ts"],
 *     bundle: true, // Very important!
 *     outfile: "out.js",
 *     plugins: [plugin],
 * });
 * ```
 * @interface ComptimePlugin
 * @extends {Plugin}
 * @see {add}
 * @see {plugin}
*/
export interface ComptimePlugin extends Plugin {
    /** The name of the plugin */
    readonly name: "comptime";
    /**
     * The plugin setup function.
     * 
     * This is where the guts of the plugin are.
     * 
     * @param {PluginBuild} build The build object.
     * @see {PluginBuild}
     * @see {ComptimePlugin}
     * @see {add}
     * @see {plugin}
    */
    setup(build: PluginBuild): void;
}

/**
 * Adds a comptime item to the build.
 * 
 * Example:
 * ```ts
 * import { add, plugin } from "@comptime";
 * import * as esbuild from "esbuild";
 * 
 * add("foo", { bar: "baz" });
 * 
 * await esbuild.build({
 *     entryPoints: ["index.ts"],
 *     bundle: true, // Very important!
 *     outfile: "out.js",
 *     plugins: [plugin],
 * });
 * ```
 * 
 * @param {string} id The ID associated with the item.
 * @param {object} value The value of the item.
 * @see {ComptimePlugin}
 * @see {plugin}
*/
export function add(id: string, value: object): void;

/**
 * Adds a comptime item to the build.
 * 
 * It is expected that the function is synchronous.
 * 
 * Example:
 * ```ts
 * import { add, plugin } from "@comptime";
 * import * as esbuild from "esbuild";
 * 
 * add("version", () => {
 *      const version = Deno.readTextFileSync("version.txt");
 *      return version + "-" + new Date().toISOString();
 * });
 * 
 * await esbuild.build({
 *     entryPoints: ["index.ts"],
 *     bundle: true, // Very important!
 *     outfile: "out.js",
 *     plugins: [plugin],
 * });
 * ```
 * 
 * @param {string} id The ID associated with the item.
 * @param {() => object} value The value of the item.
 * @see {ComptimePlugin}
 * @see {plugin}
*/
export function add(id: string, value: () => object): void;

/**
 * The comptime plugin itself.
 * 
 * Example:
 * 
 * ```ts
 * import comptime from "@comptime";
 * 
 * await esbuild.build({
 *     entryPoints: ["index.ts"],
 *     bundle: true, // Very important!
 *     outfile: "out.js",
 *     plugins: [comptime],
 * });
 * ```
 * 
 * @param {RegExp | undefined} namespace The namespace to use for the plugin.
 * @returns {ComptimePlugin} The comptime plugin.
 * @see {ComptimePlugin}
 * @see {add}
*/
export function plugin(namespace?: RegExp): ComptimePlugin;

export default plugin;
