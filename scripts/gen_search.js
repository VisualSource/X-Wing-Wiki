import { parse, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import superjson from "superjson";
import {
  writeTextFile,
  FetchManifest,
  loadLoadouts,
  loadFactions,
  loadShip,
} from "./utils.js";

const factionsplit = {
  rebelalliance: "rebel-alliance",
  galacticempire: "galactic-empire",
  scumandvillainy: "scum-and-villainy",
  resistance: "resistance",
  firstorder: "first-order",
  galacticrepublic: "galactic-republic",
  separatistalliance: "separatist-alliance",
};

const manifest = await FetchManifest();

const factions = await loadFactions(manifest.factions[0]);

/**
 * @param {string} faction
 * @return {*}
 */
const getIcon = (faction) => {
  return factions.find((value) => value.xws === faction)?.icon ?? "";
};

/**
 * @type {Map<string,Map<string,import("./types.d.ts").Ship>>}
 */
const shipAndPilots = new Map();
/**
 * @type {Map<string,import("./types.d.ts").QuickBuilds["quick-builds"]>}
 */
const quickbuilds = new Map();

/**
 *
 * @param {string} faction
 * @param {string} id
 * @returns {null | { pilot: number; ship: string; }}
 */
const findShipPilot = (faction, id) => {
  const factionShips = shipAndPilots.get(faction);
  if (!factionShips) return null;

  for (const [key, data] of factionShips.entries()) {
    let idx = 0;
    for (const pilot of data.pilots) {
      if (pilot.xws === id) {
        return {
          pilot: idx,
          ship: key,
        };
      }
      idx++;
    }
  }

  return null;
};

/**
 *
 * @param {string} faction
 * @param {string} ship
 * @returns {null|import("./types.d.ts").Ship}
 */
const getPilot = (faction, ship) => {
  const factionShips = shipAndPilots.get(faction);
  if (!factionShips) return null;

  const pilots = factionShips.get(ship);
  if (!pilots) return null;

  return pilots;
};

for (const key of manifest["quick-builds"]) {
  const data = await loadLoadouts(key);
  const faction = parse(key).name.replaceAll("-", "");
  quickbuilds.set(faction, data["quick-builds"]);
}

for (const { faction, ships } of manifest.pilots) {
  const factionShips = new Map();
  for (const ship of ships) {
    console.log(`Loading: `, ship);
    const data = await loadShip(ship);
    const name = parse(ship).name;
    factionShips.set(name, data);
  }
  shipAndPilots.set(faction, factionShips);
}

/**
 * @type {Map<string,Map<string,{ ship: import("./types.d.ts").StdShip, pilots: import("./types.d.ts").StdPilot[] }>>}
 */
const output = new Map();
let found_loadouts = 0;
let missing_loadouts = 0;
let missing_ships = 0;

for (const [faction, loadouts] of quickbuilds.entries()) {
  /**
   * @type {Map<string,{ship: import("./types.d.ts").StdShip, pilots: import("./types.d.ts").StdPilot[]}>}
   */
  const ships = new Map();

  for (const { threat, pilots } of loadouts) {
    for (const pilot of pilots) {
      const shipId = findShipPilot(faction, pilot.id);
      if (!shipId) {
        console.warn(`Failed to find ship for ${pilot.id}`);
        continue;
      }
      const shipData = getPilot(faction, shipId.ship);
      if (!shipData) {
        console.warn(`Failed to get ship data: (${shipId.ship})`);
        missing_ships++;
        continue;
      }
      if (!ships.has(shipData.xws)) {
        ships.set(shipData.xws, {
          ship: {
            name: shipData.name,
            xws: shipData.xws,
            stats: shipData.stats,
            actions: shipData.actions,
            icon: shipData.icon,
          },
          pilots: [],
        });
      }

      const pilotData = shipData.pilots.at(shipId.pilot);
      if (!pilotData) {
        console.warn(`Failed to get pilot data: (${shipId.pilot})`);
        missing_loadouts++;
        continue;
      }

      const ship = ships.get(shipData.xws);
      ship.pilots.push({
        threat,
        id: crypto.randomUUID().split("-")[0],
        standardLoadout: pilot.upgrades,
        name: pilotData.name,
        initiative: pilotData.initiative,
        limited: pilotData?.limited ?? 0,
        xws: pilotData.xws,
        text: pilotData?.text,
        shipAbility: pilotData?.shipAbility,
        artwork: `https://infinitearenas.com/xw2/images/artwork/pilots/${pilotData.xws}.png`,
        force: pilotData?.force,
        caption: pilotData?.caption,
        ability: pilotData?.ability,
        shipActions: pilotData?.shipActions,
        charges: pilotData?.charges,
      });
      found_loadouts++;
    }
  }

  output.set(faction, ships);
}

/**
 * @type {{ title: string; tags: string[]; id: string; ship_icon: string; faction_icon: string; }[]}
 */
const search = [];

for (const [faction, ships] of output.entries()) {
  for (const [ship, pilots] of ships.entries()) {
    for (const pilot of pilots.pilots) {
      search.push({
        title: pilot.name,
        tags: [
          faction.toUpperCase(),
          pilot.name.toUpperCase(),
          ship.toUpperCase(),
        ],
        id: encodeURIComponent(
          `${faction}:${pilots.ship.xws}:${pilot.xws}:${pilot.id}`
        ),
        ship_icon:
          pilots.ship.icon?.replace(
            "https://squadbuilder.fantasyflightgames.com/ship_types/",
            `https://infinitearenas.com/xw2/images/shipicons/${factionsplit[faction]}/`
          ) ?? "",
        faction_icon: getIcon(faction),
      });
    }
  }
}

console.log("Found", found_loadouts, "Loadouts");
console.info("Missing", missing_loadouts, "Loadouts");
console.info("Missing", missing_ships, "Ships");

const serachFile = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../src/assets/search/std_loadouts.ts"
);
await writeTextFile(serachFile, `export default ${JSON.stringify(search)};`, {
  create: true,
});

/**
 *
 * @param {string} faction
 * @returns
 */
const outDir = (faction) =>
  resolve(
    dirname(fileURLToPath(import.meta.url)),
    `../public/std_loadouts/${faction}.json`
  );

for (const [faction, ships] of output.entries()) {
  const dir = outDir(faction);
  const { json } = superjson.serialize(ships);
  await Deno.writeTextFile(dir, JSON.stringify(json), { create: true });
}
