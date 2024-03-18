import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { readLocalJson, FetchJson, writeTextFile } from "./utils.js";

const ROOT =
  "https://raw.githubusercontent.com/guidokessels/xwing-data2/master";
const MANIFEST = `${ROOT}/data/manifest.json`;

/**
 *
 * @returns {Promise<import("./types.js").Translation>}
 */
const loadTranslations = async () => {
  const net = await FetchJson(`${ROOT}/data/translation.json`);
  const local = await readLocalJson("./extra_data/translation.json");
  return {
    ...local,
    ...net,
  };
};

const main = async () => {
  let missing_loadouts = 0;
  let fond_loadouts = 0;
  const manifest = (await FetchJson) < Manifest > MANIFEST;

  const quickbuilds = manifest["quick-builds"];
  const faction_ships = manifest.pilots;

  /**
   *
   * @param {string} faction
   * @returns
   */
  const getQuickBuild = async (faction) => {
    let idx = 0;
    while (idx < quickbuilds.length) {
      //@ts-ignore
      const id = quickbuilds[idx]
        .split("/")[2]
        .split(".")[0]
        .replaceAll("-", "");
      if (id === faction) {
        const route = quickbuilds[idx];
        const network_data = (await FetchJson) < Loadout > `${ROOT}/${route}`;
        const local_data =
          (await readLocalJson) <
          Loadout >
          `./extra_data/loadouts/${route.replace("data/quick-builds/", "")}`;

        return {
          "quick-builds": [
            ...network_data["quick-builds"],
            ...local_data["quick-builds"],
          ],
        };
      }
      idx++;
    }
    return null;
  };

  const tranlation = await loadTranslations();
  /**
   * @type {Map<string, Map<string, { builds: import("./types.js").Loadout["quick-builds"], ship: string; xws: string; }>>}
   */
  const loadouts = new Map();

  /**
   *
   * @param {string} faction
   * @param {string} ship
   * @param {{ builds: import("./types.js").Loadout["quick-builds"], ship: string; xws: string; }} data
   */
  const addShip = (faction, ship, data) => {
    if (!loadouts.has(faction)) {
      loadouts.set(faction, new Map());
    }

    const group = loadouts.get(faction);
    group?.set(ship, data);
  };

  for (const faction of faction_ships) {
    const build = await getQuickBuild(faction.faction);

    if (!build) {
      console.log("No quick build for %s", faction);
      continue;
    }
    const quickbuilds = build["quick-builds"];

    /**
     *
     * @param {string} id
     * @returns {{ buildIdx: number, pilotIdx: number; }[] | null}
     */
    const findQuickBuildForPilot = (id) => {
      /**
       * @type {{ buildIdx: number, pilotIdx: number; }[]}
       */
      const builds = [];

      for (const [buildIdx, build] of quickbuilds.entries()) {
        for (const [pilotIdx, pilot] of build.pilots.entries()) {
          if (pilot.id === id) {
            builds.push({
              buildIdx,
              pilotIdx,
            });
          }
        }
      }

      if (builds.length === 0) return null;

      return builds;
    };

    /**
     *
     * @param {string} id
     * @returns
     */
    const findTranslation = (id) => {
      return tranlation[id]?.en ?? id;
    };

    for (const ship of faction.ships) {
      const data = (await FetchJson) < Ship > `${ROOT}/${ship}`;
      /**
       * @type {import("./types.js").Loadout["quick-builds"]}
       */
      const builds = [];

      for (const pilot of data.pilots) {
        const loadouts = findQuickBuildForPilot(pilot.xws);

        if (!loadouts) {
          console.log(
            "No Quick build for %s (%s)",
            pilot.name,
            pilot?.caption ?? ""
          );
          missing_loadouts++;
          continue;
        }

        fond_loadouts += loadouts.length;

        for (const loadout of loadouts) {
          const threat = quickbuilds[loadout.buildIdx].threat;
          const buildPilot =
            quickbuilds[loadout.buildIdx].pilots[loadout.pilotIdx];

          buildPilot.xws = buildPilot.id;
          buildPilot.id = findTranslation(buildPilot.id);

          if (buildPilot?.upgrades) {
            for (const [key, upgrades] of Object.entries(buildPilot.upgrades)) {
              for (const [i, upgrade] of upgrades.entries()) {
                buildPilot.upgrades[key][i] = findTranslation(upgrade);
              }
            }
          }

          builds.push({
            threat,
            pilots: [buildPilot],
          });
        }
      }

      if (builds.length > 0)
        addShip(faction.faction, data.xws, {
          xws: data.xws,
          builds,
          ship: findTranslation(data.xws),
        });
    }
  }

  const dir = resolve(
    dirname(fileURLToPath(import.meta.url)),
    "../public/loadouts"
  );
  /**
   * @type {{ title: string; id: string; tags: string[], category: string[] }[]}
   */
  const search = [];

  for (const [faction, ships] of loadouts.entries()) {
    for (const [key, ship] of ships.entries()) {
      search.push({
        id: `${faction}-${key}`,
        title: ship.ship.toUpperCase(),
        category: ["SHIP", faction.toUpperCase()],
        tags: [
          key.split("-")[0].toUpperCase(),
          ...ship.builds.map((value) => value.pilots[0].id.toUpperCase()),
        ],
      });
    }

    await writeTextFile(
      join(dir, `${faction}.json`),
      JSON.stringify(Array.from(ships.values()))
    );
  }

  const serachFile = resolve(
    dirname(fileURLToPath(import.meta.url)),
    "../src/assets/search/loadouts.ts"
  );
  await writeTextFile(serachFile, `export default ${JSON.stringify(search)};`);

  console.log("Total Missing Loadouts", missing_loadouts);
  console.log("Total Found Loadouts", fond_loadouts);
};

main();
