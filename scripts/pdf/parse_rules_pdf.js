import { fileURLToPath } from "node:url";
import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "fs";
import path from "node:path";
import { isTypedArray } from "node:util/types";

async function fetchPdf(url, config) {
  const input = path.parse(url);
  const cachedFile = path.join(
    fileURLToPath(import.meta.resolve(config.temp)),
    input.base,
  );

  const exists = existsSync(cachedFile);
  if (exists) {
    return new Uint8Array(await readFile(cachedFile));
  }

  console.log("Downloading File: ", url);

  const file = await fetch(url);

  const buffer = await file.arrayBuffer();

  await writeFile(cachedFile, Buffer.from(buffer));
  return new Uint8Array(buffer);
}

async function loadConfig() {
  const file = await readFile(
    fileURLToPath(import.meta.resolve("../../package.json")),
    "utf-8",
  );

  return JSON.parse(file)["scripts-config"];
}

const HEADING_ONE = 18;
const HEADING_TWO = 11;
const HEADING_THREE = [7, 10];
function render(pagedata) {
  const options = {
    normalizeWhitespace: false,
    disableCombineTextItems: false,
  };

  const middle = pagedata.view[2] / 2;

  return pagedata.getTextContent(options).then(function (textContent) {
    const data = {
      left: {},
      right: {},
    };
    let h = 0;
    let last_type;
    let lastY = undefined;

    for (let item of textContent.items) {
      if (lastY === undefined) lastY = item.transform[5];

      let side = "left";
      if (item.transform[4] > middle) {
        side = "right";
      }

      if (lastY !== item.transform[5]) {
        h++;
      }

      let id = `${h}_text`;
      if (item.height === HEADING_TWO) {
        id = `${h}_h2`;
        last_type = "h2";
      } else if (item.height === HEADING_ONE) {
        id = `${h}_h1`;
        last_type = "h1";
      } else if (HEADING_THREE.includes(item.height) || last_type === "h3") {
        id = `${h}_h3`;

        if (item.height === 0) {
          last_type = "text";
        } else {
          last_type = "h3";
        }
      }

      if (
        !item.str.startsWith("©") &&
        item.str.length !== 0 &&
        !(item.str.length === 1 && /\d/.test(item.str))
      ) {
        if (!(id in data[side])) data[side][id] = "";
        data[side][id] += item.str;
      }

      lastY = item.transform[5];
    }

    return data;
  });
}
async function PDF(buffer) {
  if (!isTypedArray(buffer)) {
    throw new Error("Requires typedarray");
  }
  const pdf = await import(import.meta.resolve("./v4.0.379/build/pdf.mjs"));

  const task = await pdf.getDocument({ data: buffer });
  const doc = await task.promise;

  let metaData = await doc.getMetadata().catch((err) => {
    return null;
  });

  let text = [];

  for (let i = 1; i <= doc.numPages; i++) {
    let pageText = await doc
      .getPage(i)
      .then((page) => render(page))
      .catch((err) => {
        return "";
      });

    text.push(pageText);
  }

  doc.destroy();

  return text;
}

const config = await loadConfig();

const file = await fetchPdf(config.rules_reference_url, config);

PDF(file).then(async (data) => {
  const output = [];

  for (const a of data.slice(1)) {
    const pageleft = Object.entries(a.left);
    const pageright = Object.entries(a.right);
    let content = "";
    let isList = false;
    let isSub = false;
    for (const [key, value] of pageleft.concat(pageright)) {
      const type = key.split("_")[1];

      switch (type) {
        case "h1":
          if (content.length > 0) {
            output.push(content);
            content = "";
          }
          content += `# ${value}\n`;
          break;
        case "h2":
          if (content.length > 0) {
            output.push(content);
            content = "";
          }
          content += `## ${value}\n`;
          break;
        case "h3":
          content += `### ${value.toLowerCase()}\n`;
          break;

        default:
          if (value.startsWith("•") || value.startsWith("◊")) {
            content += `${value.replace("•", "-").replace("◊", "\t-")}\n`;
            isList = true;
            isSub = value.startsWith("◊");
            continue;
          }

          if (isList) {
            content += `${isSub ? "\t" : ""}${value}\n`;

            if (value.trim().endsWith(".")) {
              isList = false;
            }
            continue;
          }

          content += `${value}\n`;
          break;
      }
    }
  }

  let i = 0;
  for (const item of output) {
    await writeFile(
      fileURLToPath(import.meta.resolve(`./tmp/output/${i}.md`)),
      item,
    );
    i++;
  }
});
