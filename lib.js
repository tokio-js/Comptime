let comptimeItems = {};
export function add(id, value) {
    if (typeof value === "function") {
        value = value();
    }
    comptimeItems[id] = value;
}
export function ComptimePlugin(namespace = /^\$COMPTIME$/) {
    let res = "";
    for (const [key, value] of Object.entries(comptimeItems)) {
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
    };
}
