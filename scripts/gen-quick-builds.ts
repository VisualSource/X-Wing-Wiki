import { join, parse } from "node:path";
import { fetchJson, fetchTranslations, MANIFEST, type QuickBuild, readLocal, type Manifest, type Ship } from "./utils";

type QuickBuilds = { "quick-builds": QuickBuild[] }

const state = {
    missing: 0,
    found: 0,
    std: 0,
    search: [] as { id: string, title: string; category: string[], tags: string[] }[]
};

const [manifset, translations, nameOverrides] = await Promise.all([
    fetchJson<Manifest>(MANIFEST),
    fetchTranslations(),
    readLocal<Record<string, Record<string, string>>>("name-override.json")
]);

console.log("Using manifest version %s", manifset.version);

const getTranslation = (id: string, fallback?: string) => translations[id]?.en ?? fallback ?? id;
const getOverride = (faction: string, id: string) => {
    if (faction in nameOverrides && nameOverrides[faction][id]) {
        return nameOverrides[faction][id];
    }
    return id;
}

// 1. read manifest pilots list
// 2. parse faction name
// 3. load ship
// 4. find quick build for pilot id
// 5. get translations for pilot and upgrades
// 6. GOTO 2 IF NOT END ELSE GOTO 7
// 7. write file to assets dir
// 8. generate search json
// 9. write to assets dir


/** find all pilots in quick builds that match the given pilot id*/
const findQuickBuildsFromId = (builds: QuickBuild[], id: string) => {
    const options: { build: number, pilot: number }[] = [];

    for (let i = 0; i < builds.length; i++) {
        for (let j = 0; j < builds[i].pilots.length; j++) {
            if (builds[i].pilots[j].id === id) {
                options.push({ build: i, pilot: j });
            }
        }
    }

    return !options.length ? null : options;
}

const parseFactionShipList = async (data: Manifest["pilots"][0]) => {
    // 1. parse faction name.

    const ship = data.ships.at(0);
    if (!ship) throw new Error("Unable to parse faction name from ship path");
    const faction = parse(ship).dir.split("/").at(-1);
    if (!faction) throw new Error("Failed to parse faction name");

    // 2. fetch quick builds

    const [network, local] = await Promise.all([
        fetchJson<QuickBuilds>(`/data/quick-builds/${faction}.json`),
        readLocal<QuickBuilds>(`loadouts/${faction}.json`)
    ]);

    // remove dups
    const builds = network["quick-builds"];
    const seen = new Set(builds.flatMap(e => e.pilots.map(e => e.id)));
    for (const build of local["quick-builds"]) {
        let remove = [];

        for (let index = 0; index < build.pilots.length; index++) {
            if (seen.has(build.pilots[index].id)) {
                remove.push(build.pilots[index].id);
                continue;
            }
        }

        for (const id of remove) {
            const idx = build.pilots.findIndex(e => e.id === id);
            if (idx === -1) continue;
            build.pilots.splice(idx, 1);
        }

        if (build.pilots.length > 1) builds.push(build);
    }

    const shipsdata: Record<string, {
        builds: {
            threat: number;
            limited: number;
            xws: string;
            name: string;
            upgrades: Record<string, string[]> | undefined;
        }[], name: string;
    }> = {};

    // load ship then find builds for pilot id's

    for (const ship of data.ships) {
        const factionShipData = await fetchJson<Ship>(ship);
        const ships = [];

        for (const pilot of factionShipData.pilots) {
            if (pilot.standardLoadout) {
                state.std++;
                //console.log("Found standardLoadout pilot %s", pilot.name);
                continue;
            }

            // find quick build for pilot id
            const qbs = findQuickBuildsFromId(builds, getOverride(faction, pilot.xws));
            if (!qbs) {
                console.log("Failed to find quick build for pilot %s (%s) on ship %s | Faction: %s", pilot.name, pilot?.caption ?? "", factionShipData.name, factionShipData.faction);
                state.missing++;
                continue;
            }

            state.found += qbs.length;

            // compile data
            for (const qb of qbs) {
                const threat = builds[qb.build].threat;
                const qbPilot = builds[qb.build].pilots[qb.pilot];

                ships.push({
                    threat,
                    limited: pilot.limited,
                    xws: qbPilot.id,
                    name: pilot.name,
                    upgrades: qbPilot?.upgrades ? Object.entries(qbPilot.upgrades).reduce((prev, [key, values]) => {
                        prev[key] = values.map(tech => getTranslation(tech))
                        return prev;
                    }, {} as Record<string, string[]>) : undefined
                });
            }
        }

        // search json
        state.search.push({
            id: `${factionShipData.faction}-${factionShipData.xws}`,
            title: factionShipData.name,
            category: ["SHIP", faction.split("-").join(" ").toUpperCase()],
            tags: ships.map(e => e.name.toUpperCase())
        });

        shipsdata[factionShipData.xws] = { builds: ships, name: getTranslation(factionShipData.xws, factionShipData.name) }
    }

    return { ships: shipsdata, faction: faction.replaceAll("-", "") }
}

const content = await Promise.all(manifset.pilots.map(e => parseFactionShipList(e)));

// write content outdir
for (const data of content) {
    await Bun.write(join(import.meta.dirname, "../assets/loadouts", `${data.faction}.json`), JSON.stringify(data.ships));
}
await Bun.write(join(import.meta.dirname, "../assets/search/loadouts.json"), JSON.stringify(state.search), { createPath: true });

console.log("Total Missing Loadouts", state.missing);
console.log("Total Found Loadouts", state.found);
console.log("Total Found Standerd Loadouts", state.std);