import * as mod from "https://deno.land/std@0.167.0/path/mod.ts";
export type Size = "Medium" | "Large" | "Huge" | "Small";
export type Upgrade = "turret" | "astromech" | "gunner" | "illicit" | "talent" | "missile" | "modification" | "configuration" | "crew" | "title" | "tactical-relay" | "sensor" | "force-power" | "cannon" | "device" | "torpedo" | "command";
export type Image = `${"https://"}${string}${".png"}`;
export type Translation = { [key: string]: { en: string; } };
export interface Loadout {
    "quick-builds": {
        threat: number;
        pilots: {
            id: string;
            xws: string;
            upgrades?: {
                [key: string]: string[]
            }
        }[]
    }[]
}
export interface Manifest {
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

export interface Faction {
    name: string;
    xws: string;
    ffg: number;
    icon: Image
}

export type UpgradeItemSide = {
    title: string;
    type: Upgrade;
    ability: string;
    slots: string[];
    force?: { value: number; recovers: number; }
    charges?: { value: number; recovers: number; }
    actions?: { type: string; difficulty: string; }[];
    image: Image;
    ffg: number;
    artwork: Image;
    alt?: { image: Image; source: string; }[]
    grants?: {
        type: string;
        value: {
            type: string;
            difficulty: string;
            linked: { type: string; difficulty: string; }
        }
    }[]
}
export type UpgradeItem = {
    name: string;
    limited: number;
    xws: string;
    sides: UpgradeItemSide[];
    cost: { value: number; }
    restrictions: {
        factions?: string[];
        names?: string[];
        action?: { type: string; };
        sizes?: Size[]
    }[];
    extended: boolean;
    standard: boolean;
    epic: boolean;
    standardLoadoutOnly?: boolean;
}
export interface QuickBuilds {
    "quick-builds": {
        threat: number;
        pilots: { id: string; upgrades: Record<Upgrade, string[]> }[]
    }[]
}

export interface Ship {
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
        caption?: string;
        initiative: number;
        limited?: number;
        cost: number;
        loadout: number;
        xws: string;
        ability?: string;
        image: Image;
        force?: { value: number; recovers: number; }
        shipAbility?: {
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

export interface UpgradeCard {
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

const getPath = (path: string) => mod.resolve(mod.dirname(mod.fromFileUrl(import.meta.url)), mod.join("../", path));
const ROOT = "https://raw.githubusercontent.com/guidokessels/xwing-data2/master";
const MANIFEST = `${ROOT}/data/manifest.json`;

export const FetchJson = <T = never>(request: string) => fetch(request).then(value => value.json() as Promise<T>);
export const FetchArray = <T = unknown>(requests: string[], root: string) => {
    return Promise.all(requests.map(value => FetchJson<T>(`${root}/${value}`)));
}

export const FetchManifest = () => FetchJson<Manifest>(MANIFEST);

const readLocalJson = async <T = never>(file: string): Promise<T> => {
    const dir = mod.resolve(mod.dirname(mod.fromFileUrl(import.meta.url)), file);
    console.log(dir);
    const data = await Deno.readTextFile(dir);
    return JSON.parse(data);
}

export const loadTranslations = async (): Promise<Translation> => {
    const net = await FetchJson<Translation>(`${ROOT}/data/translation.json`);
    const local = await readLocalJson<Translation>(getPath("./extra_data/translation.json"));
    return {
        ...local,
        ...net
    }
}

export const loadListLoadouts = async (routes: string) => Promise<Map<string, Loadout>> => {




}

export const loadLoadouts = async (route: string): Promise<Loadout> => {
    const { exteral, internal } = await loadData<Loadout>(route, `loadouts/${route.replace("data/quick-builds/", "")}`, { "quick-builds": [] });
    return {
        "quick-builds": [...exteral["quick-builds"], ...internal["quick-builds"]]
    };
}

export const loadListUpdate = async (routes: string[]): Promise<Record<Upgrade, Partial<UpgradeItem>[]>> => {
    const items = await Promise.all(routes.map(value => loadUpgrade(value, value.replace("data", ""))));

    const output: Record<string, UpgradeItem[]> = {};

    for (let i = 0; i < items.length; i++) {
        output[routes[i].replace("data/upgrades/", "").replace(".json", "")] = items[i];
    }

    return output;
}

export const loadUpgrade = async (route: string, local: string): Promise<UpgradeItem[]> => {
    const { exteral, internal } = await loadData<UpgradeItem[]>(route, `./extra_data/${local}`, []);
    return [...exteral, ...internal];
}

export const loadData = async <T>(external_data: string, internal_data: string, defaultValue: T) => {
    const [exteral, internal] = await Promise.allSettled([
        FetchJson<T>(`${ROOT}/${external_data}`),
        readLocalJson<T>(internal_data)
    ]);

    if (exteral.status === "rejected") throw new Error("Failed to load data");

    return {
        exteral: exteral.value,
        internal: internal.status === "rejected" ? defaultValue : internal.value
    }
}