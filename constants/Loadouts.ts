import FIRST_ORDER_LOADOUTS from "@/assets/loadouts/firstorder.json";
import EMPIRE_LOADOUTS from "@/assets/loadouts/galacticempire.json";
import REPUBLIC_LOADOUTS from "@/assets/loadouts/galacticrepublic.json";
import REBEL_LOADOUTS from "@/assets/loadouts/rebelalliance.json";
import RESISTANCE_LOADOUTS from "@/assets/loadouts/resistance.json";
import SCUM_LOADOUTS from "@/assets/loadouts/scumandvillainy.json";
import SEPARATIST_LOADOUTS from "@/assets/loadouts/separatistalliance.json";

export type Loadout = {
    builds: {
        threat: number;
        limited: number;
        xws: string;
        name: string;
        upgrades?: {
            [key: string]: string[] | undefined
        }
    }[]
    name: string;
}

export type FactionLoadouts = Record<string, Loadout>;

const Loadouts: Record<string, FactionLoadouts> = {
    firstorder: FIRST_ORDER_LOADOUTS,
    galacticempire: EMPIRE_LOADOUTS,
    galacticrepublic: REPUBLIC_LOADOUTS,
    rebelalliance: REBEL_LOADOUTS,
    resistance: RESISTANCE_LOADOUTS,
    scumandvillainy: SCUM_LOADOUTS,
    separatistalliance: SEPARATIST_LOADOUTS
} as const;

export default Loadouts;