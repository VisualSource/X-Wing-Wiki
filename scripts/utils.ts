import { join } from "node:path";

export type ActionType = "Focus" | "Lock" | "Coordinate" | "Reinforce" | "Jam";
export type ActionDifficulty = "White";
export type Size = "Medium" | "Large" | "Huge" | "Small";
export type Upgrade = "turret" | "astromech" | "gunner" | "illicit" | "talent" | "missile" | "modification" | "configuration" | "crew" | "title" | "tactical-relay" | "sensor" | "force-power" | "cannon" | "device" | "torpedo" | "command";
export type ShipPilot = {
    name: string;
    initiative: number;
    cost: number;
    loadout: number;
    limited: number;
    standardLoadout?: string[]
    artwork: string;
    image: string;
    shipAbility?: {
        name: string;
        text: string;
    },
    caption?: string;
    ability?: string;
    keywords?: string[]
    charges?: { value: number, recovers: number };
    engagement?: number;
    text: string;
    standard: boolean;
    extended: boolean;
    epic: boolean;
    xws: string;
    slots: Upgrade[]
}
export type Ship = {
    name: string;
    xws: string;
    faction: string;
    icon: string;
    size: Size,
    dial: `${0 | 1 | 2 | 3 | 4 | 5}${string}${string}`[],
    dialCodes: string[],
    stats: Array<{ type: "attack", arc: string, value: number } | { type: "hull" | "agility", value: number } | { type: "shields" | "energy", value: number, recovers?: number; }>;
    actions: { difficulty: ActionDifficulty; type: ActionType; }[];
    pilots: ShipPilot[]
}
export type Translation = { en: string }
export type Translations = Record<string, Translation>;
export type Manifest = {
    version: string;
    damagedecks: string[];
    factions: string[];
    stats: string[];
    actions: string[];
    pilots: { faction: string; ships: string[] }[];
    upgrades: string[];
    conditions: string;
    "quick-builds": string[]
}
export type QuickBuild = {
    threat: number;
    pilots: { id: string; upgrades?: Record<Upgrade, string[]> }[];
}

/** URL to the xwing data github  */
export const DATA_ROOT = "https://raw.githubusercontent.com/guidokessels/xwing-data2/master";
export const MANIFEST = "/data/manifest.json";
export const TRANSLATION = "/data/translation.json";

/** Loads a json file from the DATA_ROOT URL */
export const fetchJson = <T = unknown>(url: string) => fetch(join(DATA_ROOT, url)).then(e => e.json()) as Promise<T>;
/** 
 * Loads local json files from the extra_data folder*/
export const readLocal = <T = unknown>(file: string) => Bun.file(join(import.meta.dirname, "./extra_data", file)).json() as Promise<T>;

/**
 * Loads translations from network and local.
 * Local translations are overriden if a network version exists. 
 */
export const fetchTranslations = async () => {
    const network = await fetchJson<Translations>(TRANSLATION);
    const local = await readLocal<Translations>("translation.json");
    return {
        ...local,
        ...network
    }
}
