//@ts-ignore
import * as mod from "https://deno.land/std@0.167.0/path/mod.ts";

declare var Deno: { writeTextFile(path: string| URL, data: string, options?: any): Promise<void> };

const ROOT = "https://raw.githubusercontent.com/guidokessels/xwing-data2/master";

const FetchJson = <T = never>(request: string) => fetch(request).then(value=>value.json() as Promise<T>);
const FetchArray = async <T=any>(requests: string[], root: string) => {
    return Promise.all(requests.map(value=>FetchJson<T>(`${root}/${value}`)));
}
type Size = "Medium" | "Large" | "Huge" | "Small";
type Upgrade = "turret" | "astromech" | "gunner" | "illicit" | "talent" | "missile" | "modification" | "configuration" | "crew" | "title" | "tactical-relay" | "sensor" | "force-power" | "cannon" | "device" | "torpedo" | "command";
type Image = `${"http://"}${string}${".png"}`;
interface Manifest {
    version: string;
    damagedecks: string[];
    factions: string[];
    stats: string[];
    actions: string[];
    pilots: { faction: string; ships: string[] }[]
    upgrades: string[];
    conditions: string;
    "quick-builds": string[]
}

interface Faction {
    name: string;
    xws: string;
    ffg: number;
    icon: Image
}

interface QuickBuilds {
    "quick-builds": {
        threat: number;
        pilots: { id: string; upgrades: Record<Upgrade,string[]> }[]
    }[]
}

interface Ship {
    name: string;
    xws: string;
    ffg: number;
    size: Size;
    dial: `${number}${string}`[];
    dialCodes: string[];
    stats: { type: "attack" | "agility" | "shields", value: number; arc?: string; }[]
    actions: { difficulty: string; type: string; }[];
    icon: `${"https://"}${string}${".png"}`;
    pilots: {
        name: string;
        caption: string;
        initiative: number;
        limited: number;
        cost: number;
        loadout: number;
        xws: string;
        ability: string;
        image: Image;
        force?: { value: number; recovers: number; }
        shipAbility: {
            name: string;
            text: string;
        }
        slots: Upgrade[],
        artwork: Image,
        ffg: number;
        standard: boolean;
        extended: boolean;
        keywords: string[];
        epic: boolean;
    }[]
}

interface UpgradeCard {
    name: string;
    limited: number;
    xws: string;
    sides: { 
        title: string;
        type: Upgrade, 
        ability: string; 
        slots: Upgrade[];
        force?: { value: number; recovers: number; }
        charges?: { value: number; recovers: number; }
        actions?: { type: string; difficulty: string; }[];
        grants: { type: string; value: { type: string; difficulty: string; } }[]
        image: Image; 
        artwork: Image; 
        alt: { image: Image; source: string; }[]
        ffg: number; 
    }[];
    standardLoadoutOnly?: boolean;
    cost: { value: number };
    restrictions: { 
        factions?: string[]; 
        names?: string[]; 
        action?: { type: string; }; 
        sizes?: Size[] 
    }[];
    standard: boolean;
    extended: boolean;
    epic: boolean;
}

type OutputData = { 
    xws: Ship["pilots"][0]["xws"];
    image: Ship["pilots"][0]["image"];
    name: string;
    loadout_full: {
        [key: string]: {
            xws: string;
            sides: { image: Image; alt: { image: Image; source: string; }[] }[]
        }
    }
}[];

interface ShipMod {
     xws: string; 
     icon: string;
     dial: Ship["dial"];
     pilots: OutputData;
}


const main = async () => {
    const manifest = await FetchJson<Manifest>(`${ROOT}/data/manifest.json`);   
    const factions = await FetchJson<Faction[]>(`${ROOT}/${manifest.factions[0]}`);
    const quickBuilds = new Map<string,QuickBuilds["quick-builds"]>();
    for(const request of manifest["quick-builds"]) {
        const faction = request.split("/")[2].split(".")[0];
        const data = await FetchJson<QuickBuilds>(`${ROOT}/${request}`);
        //@ts-ignore
        quickBuilds.set(faction.replaceAll("-",""),data["quick-builds"]);
    }
    const upgradesCards = new Map<string,UpgradeCard[]>();
    for(const request of manifest.upgrades) {
        const faction = request.split("/")[2].split(".")[0];
        const data = await FetchJson<UpgradeCard[]>(`${ROOT}/${request}`);
        upgradesCards.set(faction,data);
    }
    const ships = new Map<string,Ship[]>();

    for(const faction of manifest.pilots){
        const data = await FetchArray(faction.ships,ROOT);
        ships.set(faction.faction,data);
    }

    const output = new Map<string,Map<string,ShipMod>>();
    for(const [key,fships] of ships.entries()) {
        const builds = quickBuilds.get(key);
        if(!builds) {
            console.warn(`No builds for ${key}`);
            continue;
        }

        const a = new Map<string,ShipMod>();

        for(const ship of fships) {

            const selected: OutputData = [];

            for(const pilot of ship.pilots) {
                const build = builds.find(value=>value.pilots.findIndex(i=>i.id === pilot.xws) !== -1)?.pilots.find(i=>i.id===pilot.xws);

                if(!build) {
                    console.log(`${ship.name} ${pilot.name} of ${key} | NO LOADOUT`);
                    continue;
                }

                const loadout_pilot: OutputData[0] = {
                    xws: pilot.xws,
                    image: pilot.image,
                    name: pilot.name,
                    loadout_full: {}
                };

                if(!build?.upgrades) continue;

                for(const [key,upgrades] of Object.entries(build.upgrades)) {
                    (loadout_pilot as any).loadout_full[key] = [];
                    const cards = upgradesCards.get(key);

                    if(!cards) {
                        console.warn(`Failed to find cards for ${key}`);
                        continue
                    }

                    for(const upgrade of upgrades) {
                        const dataC = cards.find(value=>value.xws === upgrade);
                        if(!dataC) {
                            console.warn(`Missing ${key}|${upgrade}`)
                            continue;
                        }
                        (loadout_pilot as any).loadout_full[key].push({ xws: dataC.xws, sides: dataC.sides.map(value=>({ image: value.image, alt: value.alt })) });
                    }
                }

                selected.push(loadout_pilot);
            }

            if(selected.length > 0) a.set(ship.xws,{ icon: ship.icon, dial: ship.dial, xws: ship.xws, pilots: selected });
        }
        
        output.set(key,a);
    }

    
    const dir = mod.resolve(mod.dirname(mod.fromFileUrl(import.meta.url)),"../public/pilots");
    const search_dir = mod.resolve(mod.dirname(mod.fromFileUrl(import.meta.url)),"../src/assets/search");
    const search: { title: string; tags: string[]; id: string; ship_icon: string; faction_icon: string; }[] = [];

    for(const [faction,ships] of output.entries()) {

        const ficon = factions.find(value=>value.xws === faction);

        const data: { [key: string]: any } = {};
        
        for(const [ship,pilots] of ships.entries()) {

            for(const pilot of pilots.pilots) {
                search.push({
                    title: pilot.name,
                    tags: [
                        faction.toUpperCase(),
                        ship.toUpperCase(),
                    ],
                    faction_icon: ficon?.icon ?? "",
                    ship_icon: pilots.icon,
                    id: encodeURIComponent(`${faction}:${ship}:${pilot.xws}`)
                });
            }


            data[ship] = pilots;
        }

        await Deno.writeTextFile(mod.join(dir,`${faction}.json`),JSON.stringify(data),{ create: true }); 
    }
    await Deno.writeTextFile(mod.join(search_dir,`full_loadouts.ts`),`export default ${JSON.stringify(search)}`,{ create: true }); 
}
main();

