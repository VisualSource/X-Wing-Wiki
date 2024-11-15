export type Loadout = Record<string, {
    builds: {
        threat: number;
        limited: number;
        xws: string;
        name: string;
        upgrades?: Record<string, string[]>
    }[]
    name: string;
}>

const Loadouts = new Map<string, Loadout>([
    ["firstorder", require("../assets/loadouts/firstorder.json")],
    ["galacticempire", require("../assets/loadouts/galacticempire.json")],
    ["galacticrepublic", require("../assets/loadouts/galacticrepublic.json")],
    ["rebelalliance", require("../assets/loadouts/rebelalliance.json")],
    ["resistance", require("../assets/loadouts/resistance.json")],
    ["scumandvillainy", require("../assets/loadouts/scumandvillainy.json")],
    ["separatistalliance", require("../assets/loadouts/separatistalliance.json")]
]);

export default Loadouts;