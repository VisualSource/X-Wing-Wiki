import { Glob } from "bun";

const glob = new Glob("*.webp");

const root = "../assets/images/docs";

const output = [];

for await (const file of glob.scan({ cwd: "./assets/images/docs", onlyFiles: true })) {
    output.push([file, `require('${root}/${file}')`]);
}

const a = output.reduce((prev, current) => {
    return prev + `"${current[0]}":${current[1]},\n`;
}, "export default {\n") + "};";

await Bun.write("./lib/imageRefs.ts", a); 