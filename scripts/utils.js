import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { readFile, writeFile } from "node:fs/promises";

/**
 * @param {string} path
 * @return {Promise<string>}
 */
export function readTextFile(path) {
  return readFile(path, { encoding: "utf-8" });
}

/**
 * @param {string} path
 * @param {string} content
 * @returns
 */
export function writeTextFile(path, content) {
  return writeFile(path, content);
}

/**
 * @param {string} path
 */
const getPath = (path) =>
  resolve(dirname(fileURLToPath(import.meta.url)), path);
const ROOT =
  "https://raw.githubusercontent.com/guidokessels/xwing-data2/master";
const MANIFEST = `${ROOT}/data/manifest.json`;

/**
 * @template T
 * @param {string} request
 * @returns {Promise<T>}
 */
export const FetchJson = (request) =>
  fetch(request).then((value) => value.json());
/**
 * @template T
 * @param {string[]} requests
 * @param {string} root
 * @returns {Promise<T[]>}
 */
export const FetchArray = (requests, root) => {
  return Promise.all(requests.map((value) => FetchJson(`${root}/${value}`)));
};

/**
 *
 * @returns {Promise<import("./types.d.ts").Manifest>}
 */
export const FetchManifest = () => FetchJson(MANIFEST);

/**
 * @template T
 * @param {string} file
 * @return {Promise<T>}
 */
export const readLocalJson = async (file) => {
  const dir = resolve(dirname(fileURLToPath(import.meta.url)), file);
  console.log("Loading Local:", dir);
  const data = await readTextFile(dir);
  return JSON.parse(data);
};

/**
 *
 * @returns {Promise<import("./types.d.ts").Translation>}
 */
export const loadTranslations = async () => {
  const { exteral, internal } = await loadData(
    "data/translation.json",
    "translation.json",
    {}
  );
  return {
    ...internal,
    ...exteral,
  };
};

/**
 *
 * @param {string} route
 * @returns {Promise<import("./types.d.ts").Ship>}
 */
export const loadShip = async (route) => {
  return (await FetchJson) < Ship > `${ROOT}/${route}`;
};

/**
 *
 * @param {string} route
 * @returns {Promise<import("./types.d.ts").QuickBuilds>}
 */
export const loadLoadouts = async (route) => {
  const { exteral, internal } =
    (await loadData) <
    QuickBuilds >
    (route,
    route.replace("data/quick-builds/", "loadouts/"),
    { "quick-builds": [] });
  return {
    "quick-builds": [...exteral["quick-builds"], ...internal["quick-builds"]],
  };
};

/**
 *
 * @param {string[]} routes
 * @returns {Promise<Record<import("./types.d.ts").Upgrade, Partial<import("./types.d.ts").UpgradeItem>[]>>}
 */
export const loadListUpdate = async (routes) => {
  const items = await Promise.all(
    routes.map((value) => loadUpgrade(value, value.replace("data", "")))
  );
  /**
   * @type {Record<string, import("./types.d.ts").UpgradeItem[]>}
   */
  const output = {};

  for (let i = 0; i < items.length; i++) {
    output[routes[i].replace("data/upgrades/", "").replace(".json", "")] =
      items[i];
  }

  return output;
};

/**
 *
 * @param {string} route
 * @param {string} local
 * @returns {Promise<import("./types.d.ts").UpgradeItem[]>}
 */
export const loadUpgrade = async (route, local) => {
  const { exteral, internal } = await loadData(route, local, []);
  return [...exteral, ...internal];
};

/**
 * @template T
 * @param {string} external_data
 * @param {string} internal_data
 * @param {T} defaultValue
 */
export const loadData = async (external_data, internal_data, defaultValue) => {
  const [exteral, internal] = await Promise.allSettled([
    FetchJson(`${ROOT}/${external_data}`),
    readLocalJson(getPath(`./extra_data/${internal_data}`)),
  ]);

  let data = defaultValue;
  if (exteral.status === "rejected") throw new Error("Failed to load data");

  if (internal.status === "fulfilled") {
    data = internal.value;
  } else {
    console.warn("No file found for internal path. Using default value.");
  }

  return {
    exteral: exteral.value,
    internal: data,
  };
};

/**
 *
 * @param {string} route
 * @returns {Promise<import("./types.d.ts").Faction[]>}
 */
export const loadFactions = (route) => FetchJson(`${ROOT}/${route}`);
