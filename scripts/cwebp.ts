import * as mod from "https://deno.land/std@0.167.0/path/mod.ts";

const wait = (ms: number)=> new Promise<void>(ok=>setTimeout(()=>ok(),ms));

const main = async () => {
    const root = mod.resolve(mod.dirname(mod.fromFileUrl(import.meta.url)),"../public/images");

    for await (const  entry of Deno.readDir(root)) {
        if(entry.name.endsWith(".webp")) continue;

        console.info("CWEBP %s",entry.name);

        const outputPath = mod.join(root,entry.name.replace(".png",".webp"));
        const inputPath = mod.join(root,entry.name);

        await Deno.run({
            "cmd": ["cwebp",inputPath,"-o",outputPath]
        });

        await wait(800);

        await Deno.remove(inputPath);
    }
}

main();