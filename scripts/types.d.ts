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
        text?: string;
        shipActions?: {
            difficulty: string; type: string;
        }[]
        charges?: { value: number; recovers: number; };
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

export interface StdShip {
    name: string,
    xws: string,
    stats: unknown,
    actions: unknown,
    icon: string,
}

export interface StdPilot {
    id: string;
    threat: number,
    standardLoadout: Record<Upgrade, string[]>,
    name: string;
    initiative: number,
    limited: number,
    xws: string,
    text?: string,
    shipAbility?: unknown,
    artwork?: string,
    force?: unknown
    caption?: string,
    ability?: string,
    shipActions?: { difficulty: string; type: string; }[],
    charges?: unknown
}