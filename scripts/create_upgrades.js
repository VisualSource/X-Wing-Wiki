import { resolve, dirname } from 'node:path';
import { fileURLToPath } from "node:url";
import { writeTextFile, FetchManifest, loadListUpdate } from './utils.js';

const manifest = await FetchManifest();

const upgrade_list = await loadListUpdate(manifest.upgrades);

for (const [_, upgrades] of Object.entries(upgrade_list)) {
    for (const upgrade of upgrades) {
        delete upgrade.restrictions;
        delete upgrade.standard;
        delete upgrade.extended;
        delete upgrade.epic;
        delete upgrade.standardLoadoutOnly;
        delete upgrade.cost;
        delete upgrade.limited;

        for (const side of upgrade.sides) {
            delete side.ffg;
            delete side.image;
            delete side.slots;
            delete side.type;
            delete side.artwork;
        }
    }
}

const dir = resolve(dirname(fileURLToPath(import.meta.url)), "../public/upgrades.json");
await writeTextFile(dir, JSON.stringify(upgrade_list), { create: true });