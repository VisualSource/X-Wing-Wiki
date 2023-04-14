import { type LoaderFunctionArgs, defer } from "react-router-dom";

const loader = async ({ params }: LoaderFunctionArgs) => {
    if (!params.idx || !params.shipid) throw new Error("Missing shipid or idx");

    const index = parseInt(params.idx);
    if (isNaN(index)) throw new Error("Invaild ship index");

    const [factionId, shipType, pilotId, loadoutId, ..._] = params.shipid.split(":");

    return defer({
        data: new Promise<object>(async (ok, reject) => {

            const [pilotData, upgradeData] = await Promise.all([
                fetch(`/std_loadouts/${factionId}.json`).then(value => value.json()) as Promise<[string, { ship: { xws: string; }, pilots: { id: string; standardLoadout?: Record<string, string[]>; xws: string; }[] }][]>,
                fetch(`/upgrades.json`).then(value => value.json()) as Promise<Record<string, { xws: string; sides: { ability?: string; }[] }[]>>
            ]);
            const builds = pilotData.find(ship => ship[0] === shipType);
            if (!builds) return reject("Failed to find ship.");

            const [_, data] = builds;
            const pilot = data.pilots.find(pilot => pilot.xws === pilotId && pilot.id === loadoutId);
            if (!pilot) return reject("Failed to find ship pilot.");

            let upgrades: { xws: string; sides: { ability?: string; }[] }[] = [];

            if (pilot?.standardLoadout) {
                upgrades = Object.entries(pilot.standardLoadout).reduce((acc, [key, items]) => {
                    const updateType = upgradeData[key];
                    if (!updateType) return acc;

                    for (const item of items) {
                        const fullupgrade = updateType.find(value => value.xws === item);
                        if (!fullupgrade) continue;
                        acc.push(fullupgrade);
                    }
                    return acc;
                }, [] as { xws: string; sides: { ability?: string; }[] }[]);

                upgrades.sort((a, b) => a.sides.reduce((acc, c) => (c?.ability?.length ?? 0) + acc, 0) - b.sides.reduce((acc, c) => (c?.ability?.length ?? 0) + acc, 0))
            }

            delete pilot?.standardLoadout;

            ok({
                ship: data.ship,
                pilot: pilot,
                standardLoadout: upgrades
            });
        })
    })
}


export default loader;