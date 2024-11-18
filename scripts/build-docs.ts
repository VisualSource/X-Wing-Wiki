import { Glob } from "bun";
import { join, parse } from "node:path";
import { load } from "js-yaml";

const isString = (v: unknown) => {
    if (!v) return new Error("Value is not a string");
    return null;
}
const isStringArray = (v: unknown) => {
    if (!Array.isArray(v)) return new Error("Value is not an array");
    if (!v.every(e => typeof e === "string")) return new Error("Array contains not string value");
    return null;
}

const METADATA_PROPS: { optional: boolean, name: string, isValid: (v: unknown) => Error | null }[] = [
    { name: "category", optional: false, isValid: isStringArray },
    { name: "title", optional: false, isValid: isString },
    { name: "version", optional: false, isValid: isString },
    { name: "tags", optional: true, isValid: isStringArray },
    { name: "desc", optional: true, isValid: isString },
    {
        name: "links", optional: true, isValid: (value) => {
            if (!Array.isArray(value)) return new Error("Value is not an array");

            for (const v of value) {
                if (typeof v !== "object") return new Error("Value is not a object");
                if (!("title" in v)) return new Error("Object is missing the 'title' in object");
                if (!("id" in v)) return new Error("Object is missing prop 'id' in object");
                if (typeof v.title !== "string") return new Error("'title' prop in object is not a string");
                if (typeof v.id !== "string") return new Error("'id' props in object is not a string");
            }
            return null;
        }
    }
];
const loadDocFile = async (path: string) => {
    const file = await Bun.file(path).text();
    const lines = file.split("\n");
    let meta = [];

    for (let i = 0; i < lines.length; i++) {
        if (i === 0) {
            if (lines[i].startsWith("---")) {
                continue;
            }
            break;
        }
        if (lines[i].startsWith("---")) {
            break;
        }
        meta.push(lines[i]);
    }

    const filename = parse(path).name;


    try {
        const data = load(meta.join("\n"), { json: true }) as Record<string, unknown>;

        for (const prop of METADATA_PROPS) {
            if (prop.name in data) {
                const r = prop.isValid(data[prop.name]);
                if (r) throw new Error(`Metadata prop "${prop.name}": ${r.message}`);
            } else if (!prop.optional) {
                throw new Error(`Missing metadata prop "${prop.name}"`);
            }
        }
        return {
            content: file,
            search: {
                title: data.title,
                category: data.category,
                tags: data?.tags,
                id: filename,
                desc: data?.desc
            }
        }
    } catch (error) {
        console.error(`Error in file: "${filename}"`);
        throw error;
    }
}

async function scanDir(target: string, dir: string) {
    const glob = new Glob(target);
    const scan = glob.scan({ absolute: true, cwd: dir });
    return Array.fromAsync(scan);
}

const files = await scanDir("*.md", join(import.meta.dirname, "../docs"));
const items = await Promise.all(files.map(file => loadDocFile(file)));

const docs: Record<string, string> = {};
const search = [];
for (const item of items) {
    docs[item.search.id] = item.content;
    search.push(item.search);
}

await Bun.write(join(import.meta.dirname, "../assets/docs.json"), JSON.stringify(docs));
await Bun.write(join(import.meta.dirname, "../assets/search/docs.json"), JSON.stringify(search));