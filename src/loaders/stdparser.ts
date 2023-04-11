import { type LoaderFunctionArgs, defer } from "react-router-dom";

const loader = async ({ params }: LoaderFunctionArgs) => {
    if (!params.idx || !params.shipid) throw new Error("Missing shipid or idx");

    const index = parseInt(params.idx);
    if (isNaN(index)) throw new Error("Invaild ship index");

    const [factionId, shipType, pilotId, ...other] = params.shipid.split(":");

    return defer({
        data: new Promise<object>(async (ok, reject) => {

            const requestPilotData = await fetch(`/loadouts/${factionId}.json`);

            if (!requestPilotData.ok) return reject("Failed to get pilot data");

            const pilotData = await requestPilotData.json() as { xws: string; builds: { threat: number; pilots: { xws: string; }[] }[] }[];

            const builds = pilotData.find(ship => ship.xws === shipType);

            if (!builds) return reject("Failed to get loadout");

            let loadoutData;

            for (const build of builds.builds) {
                for (const pilot of build.pilots) {
                    if (pilotId !== pilot.xws) continue;
                    loadoutData = pilot;
                    break;
                }
                if (!loadoutData) continue;
                break;
            }






        })
    })
}


export default loader;