import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { readdir, rm } from "node:fs/promises";
import { exec } from "node:child_process";

/**
 *
 * @param {number} ms
 * @returns
 */
const wait = (ms) => new Promise((ok) => setTimeout(() => ok(), ms));

const main = async () => {
  const root = resolve(
    dirname(fileURLToPath(import.meta.url)),
    "../public/images"
  );
  const dir = await readdir(root);

  for await (const entry of dir) {
    if (entry.endsWith(".webp")) continue;

    console.info("CWEBP %s", entry);

    const outputPath = join(root, entry.replace(".png", ".webp"));
    const inputPath = join(root, entry);

    exec(`cwebp ${inputPath} -0 ${outputPath}`);

    await wait(800);

    await rm(inputPath);
  }
};

main();
