import * as mod from "https://deno.land/std@0.167.0/path/mod.ts";
import { FetchManifest, loadListUpdate, type UpgradeItemSide } from './utils.ts';

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

        for (const side of (upgrade.sides! as Partial<UpgradeItemSide>[])) {
            delete side.ffg;
            delete side.image;
            delete side.slots;
            delete side.type;
            delete side.artwork;
        }
    }
}

const dir = mod.resolve(mod.dirname(mod.fromFileUrl(import.meta.url)), "../public/upgrades.json");
await Deno.writeTextFile(dir, JSON.stringify(upgrade_list), { create: true });