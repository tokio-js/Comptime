# Comptime

Compile-time constants in JS

## Usage

`build.js`:

```js
import { add, plugin } from "https://gh.matveit.dev/comptime";
import * as esbuild from "esbuild";

add("foo", { bar: "baz" });
add("version", () => {
    const version = Deno.readTextFileSync("version.txt");
    return version + "-" + new Date().toISOString();
});

await esbuild.build({
    entryPoints: ["index.ts"],
    bundle: true, // Very important!
    outfile: "out.js",
    plugins: [plugin],
});
```

`index.ts`:

```ts
import { foo, version } from "$COMPTIME";

console.log(foo.bar);
console.log(version);
```
