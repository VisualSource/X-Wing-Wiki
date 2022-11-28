import { readdir, unlink } from 'fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import child_process from "node:child_process";

const wait = (ms)=> new Promise(ok=>setTimeout(()=>ok(),ms));

const main = async () => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const root = path.join(__dirname,"../public/images");
    const files = await readdir(root);

    for(const [key,file] of files.entries()) {
        if(file.endsWith(".webp")) continue;

        console.info("CWEBP %s",file);

        const outputPath = path.join(root,file.replace(".png",".webp"));
        const inputPath = path.join(root,file);

        await child_process.exec(`cwebp ${inputPath} -o ${outputPath}`);
        await wait(800);

        await unlink(inputPath);
    }
}

main();