import { Plugin, PluginBuild } from "npm:esbuild";

export interface ComptimePlugin extends Plugin {
    readonly name: "comptime";
    setup(build: PluginBuild): void;
}

let comptimeItems: Record<string, object> = {};

export function add(id: string, value: object): void;
export function add(id: string, value: () => object): void;
export function add(id: string, value: object | (() => object)): void {
    if (typeof value === "function") {
        value = value();
    }
    comptimeItems[id] = value;
}

export function ComptimePlugin(namespace: RegExp = /^\$COMPTIME$/): ComptimePlugin {
    let res = "";
    for(const [key, value] of Object.entries(comptimeItems)) {
        res += `export const ${key} = ${JSON.stringify(value)};\n`;
    }
    return {
        name: "comptime",
        setup(build) {
            build.onResolve({ filter: namespace }, args => ({
                path: args.path,
                namespace: 'comptime_injected',
            }));
            build.onLoad({ filter: /.*/, namespace: 'comptime_injected' }, () => ({
                contents: res,
                loader: 'ts',
            }));
        }
    }
};

export default ComptimePlugin;
