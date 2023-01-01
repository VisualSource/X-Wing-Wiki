//@ts-ignore
import * as mod from "https://deno.land/std@0.167.0/path/mod.ts";

const ROOT = "https://raw.githubusercontent.com/guidokessels/xwing-data2/master";
const MANIFEST = `${ROOT}/data/manifest.json`;

type Translation = { [key: string]: { en: string; } };

interface Manifest {
    pilots: { faction: string; ships: string[] }[];
    "quick-builds": string[];
}

interface Ship {
    name: string;
    xws: string;
    pilots: { caption: string; name: string; xws: string; }[]
}

interface Loadout {
    "quick-builds": { 
        threat: number; 
        pilots: { 
            id: string; 
            upgrades?: { [key: string]: string[] 
            } 
        }[]
    }[]
}

const readLocalJson = async <T = never>(file: string): Promise<T> => {
    const dir = mod.resolve(mod.dirname(mod.fromFileUrl(import.meta.url)),file);
    console.log(dir);
    const data = await Deno.readTextFile(dir);
    return JSON.parse(data);
}

const loadTranslations = async (): Promise<Translation> => {
    const net = await fetchParse<Translation>(`${ROOT}/data/translation.json`);
    const local = await readLocalJson<Translation>("./extra_data/translation.json");
    return {
        ...local,
        ...net
    }
}

const fetchParse = <T = never>(request: string) => fetch(request).then(value=>value.json() as Promise<T>);

const main = async () => {
    let missing_loadouts = 0;
    let fond_loadouts = 0;
    const manifest = await fetchParse<Manifest>(MANIFEST);
 
    const quickbuilds = manifest["quick-builds"];
    const faction_ships = manifest.pilots;

    const getQuickBuild = async (faction: string) => {
        let idx = 0;
        while(idx < quickbuilds.length) {
            //@ts-ignore
            const id = quickbuilds[idx].split("/")[2].split(".")[0].replaceAll("-","");
            if(id === faction) {
                const route = quickbuilds[idx];
                const network_data = await fetchParse<Loadout>(`${ROOT}/${route}`);
                const local_data = await readLocalJson<Loadout>(`./extra_data/loadouts/${route.replace("data/quick-builds/","")}`)

                return {
                    "quick-builds": [ ...network_data["quick-builds"], ...local_data["quick-builds"] ]
                };
            }
            idx++;
        }
        return null;
    } 

    const tranlation = await loadTranslations();
    const loadouts = new Map<string,{ builds: Loadout["quick-builds"], ship: string; }>();

    for(const faction of faction_ships) {
        const build = await getQuickBuild(faction.faction);

        if(!build) {
            console.log("No quick build for %s",faction);
            continue;
        }
        const quickbuilds = build["quick-builds"];

        const findQuickBuildPilot = (id: string) => {
            let idx = 0;
            while(idx < quickbuilds.length) {
                const item = quickbuilds[idx].pilots.findIndex(value=>value.id===id);
                
                if(item !== -1) {
                    return {
                        build: idx,
                        pilot: item
                    }
                }
                
                idx++;
            }
            return null;
        }

        const findTranslation = (id: string) => {
            return tranlation[id]?.en ?? id;
        }

        for(const ship of faction.ships) {
            const data = await fetchParse<Ship>(`${ROOT}/${ship}`);

            const builds: Loadout["quick-builds"] = [];

            for(const pilot of data.pilots) {
                const idxs = findQuickBuildPilot(pilot.xws);

                if(!idxs) {
                    console.log("No Quick build for %s (%s)", pilot.name,pilot?.caption ?? "");
                    missing_loadouts++;
                    continue;
                }   

                fond_loadouts++;

                const threat = quickbuilds[idxs.build].threat;
                const buildPilot = quickbuilds[idxs.build].pilots[idxs.pilot];

                buildPilot.id = findTranslation(buildPilot.id);
                if(buildPilot?.upgrades) {
                    for(const [key,upgrades] of Object.entries(buildPilot.upgrades)) {
                        for(const [i,upgrade] of upgrades.entries()) {
                            buildPilot.upgrades[key][i] = findTranslation(upgrade);
                        }
                    }
                }

                builds.push({
                    threat,
                    pilots:[buildPilot]
                });
            }

            if(builds.length > 0) loadouts.set(`${faction.faction}-${data.xws}`,{ builds, ship: findTranslation(data.xws)});
        }
    }

    const dir = mod.resolve(mod.dirname(mod.fromFileUrl(import.meta.url)),"../src/assets/loadouts");

    const search: { title: string; id: string; tags: string[],  category: string[] }[] = [];

    for(const [key,data] of loadouts.entries()) {

        search.push({
            id: key,
            category: ["SHIP"],
            title: data.ship.toUpperCase(),
            tags: [
                key.split("-")[0].toUpperCase(),
                ...data.builds.map(value=>value.pilots[0].id.toUpperCase()),
            ]
        })

        await Deno.writeTextFile(mod.join(dir,`${key}.json`),JSON.stringify(data),{ create: true }); 
    }

    const serachFile = mod.resolve(mod.dirname(mod.fromFileUrl(import.meta.url)),"../src/assets/search/loadouts.ts");
    await Deno.writeTextFile(serachFile,`export default ${JSON.stringify(search)};`,{ create: true });

    console.log("Total Missing Loadouts",missing_loadouts);
    console.log("Total Found Loadouts",fond_loadouts);
}

main();