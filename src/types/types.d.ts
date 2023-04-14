module Ships {
    type ShipSearchData = {
        title: string;
        faction_icon: string;
        id: string;
        ship_icon: string;
        tags: string[];
    }

    type Ship = {
        icon: string;
        dial: `${number}${string}`[],
        xws: string;
        pilots: {
            xws: string;
            image: string;
            loadout_full: Record<string, {

            }>
        }[]
    }

    export type UpgradeItemSide = {
        title: string;
        ability: string;
        force?: { value: number; recovers: number; }
        charges?: { value: number; recovers: number; }
        attack?: {
            arc: string,
            maxrange: number;
            minrange: number;
            ordnance: boolean;
            value: number;
        }
        actions?: { type: string; difficulty: Difficulty; linked: { type: string; difficulty: Difficulty; } }[];
        grants?: {
            type: string;
            value: {
                type: string;
                difficulty: Difficulty;
                linked: { type: string; difficulty: Difficulty; }
            }
        }[]
    }
    export type UpgradeItem = {
        name: string;
        limited: number;
        xws: string;
        sides: UpgradeItemSide[];
    }

    type Difficulty = "Red" | "White" | "Blue" | "Purple";
    interface StdShip {
        name: string,
        xws: string,
        stats: { type: "attack" | "agility" | "shields" | "hull" | "charges" | "force" | "energy", value: number; recovers?: number; arc?: string; }[],
        actions: { difficulty: Difficulty; type: string; linked?: { difficulty: Difficulty; type: string; } }[],
        icon: string,
    }

    interface StdPilot {
        threat: number,
        standardLoadout: Record<Upgrade, string[]>,
        name: string;
        initiative: number,
        limited: number,
        xws: string,
        text?: string,
        shipAbility?: {
            name: string;
            text: string;
        },
        artwork?: string,
        force?: { value: number; recovers: number; }
        caption?: string,
        ability?: string,
        shipActions?: { difficulty: Difficulty; type: string; linked?: { difficulty: Difficulty; type: string; } }[],
        charges?: { value: number; recovers: number; }
    }

}