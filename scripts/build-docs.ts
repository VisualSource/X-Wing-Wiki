import { Glob } from "bun";

const glob = new Glob("*.md");

const data = {};

for await (const file of glob.scan({ cwd: "./docs", onlyFiles: true })) {
    const id = (file as string).replace(".md", "");

    const content = await Bun.file(`./docs/${file}`).text();

    data[id] = content;

}

Bun.write("./assets/docs.json", JSON.stringify(data));
