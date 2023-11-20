import { pathToFileURL, fileURLToPath } from "node:url";
import { stat, readFile, writeFile } from "node:fs/promises";
import { join, dirname, resolve, parse } from "node:path";
import pdf from "pdf-parse/lib/pdf-parse.js";

const current_directory = dirname(fileURLToPath(import.meta.url));
const package_json = resolve(current_directory, "../../package.json");

/** @type {{ rules_reference_url: string, temp: string }} */
const config = await readFile(package_json, { encoding: "utf-8" })
  .then((value) => JSON.parse(value))
  .then((value) => value["scripts-config"]);

console.log("CONFIG", config);

const tempdir = config.temp;
const file_name = parse(
  fileURLToPath(config.rules_reference_url.replace("https://", "file://"))
).base;
const file_path = `${tempdir}/${file_name}`;

console.log("FILE NAME:", file_name, "FILE PATH:", file_path);

const file = await stat(file_path)
  .then(async (value) => {
    if (!value.isFile()) throw new Error("Pdf file does not exist");
    console.log("READING FILE:", file_name);
    return readFile(file_path);
  })
  .catch(async () => {
    console.log("DOWNLOADING FILE:", file_name);
    const request = await fetch(config.rules_reference_url);
    const blob = await request.arrayBuffer();
    await writeFile(file_path, blob);
    return blob;
  });

const sections = {};

/** @type {import("pdf-parse").Options} */
const options = {
  version: "v2.0.550",
  /**
   *
   * @param {import("./index.d.ts").RenderPageData} pageData
   * @returns
   */
  pagerender: (pageData) => {
    const render_options = {
      normalizeWhitespace: true,
      disableCombineTextItems: false,
      includeMarkedContent: true,
    };

    const HEADER1 = 18;
    const HEADER2 = 11;

    return pageData.getTextContent(render_options).then((textContent) => {
      let text = "";

      let current_header = "";
      let sub_header = "";

      let lastHeader = 0;
      for (const item of textContent.items) {
        //item.transform[5]; // y value

        switch (item.transform[0]) {
          case HEADER1:
            {
              if (lastHeader === item.transform[0]) {
                current_header += item.str;
              } else {
                lastHeader = item.transform[0];

                if (current_header.length) sections[current_header] = {};
                current_header = item.str;
              }
            }
            break;
          case HEADER2:
            {
              if (lastHeader === item.transform[0]) {
                sub_header += item.str;
              } else {
                lastHeader = item.transform[0];
                if (sub_header.length)
                  sections[current_header][sub_header] = {};
                sub_header = item.str;
              }
            }
            //console.log(item.transform, item.str);
            break;
          default:
            //lastHeader = item.transform[0];
            break;
        }
      }

      /*let lastY,
        text = {
          HEADING: [],
        };
      let current = "";
      for (let item of textContent.items) {
        //console.log(item, textContent.styles[item.fontName]);

        if (lastY == item.transform[5] || !lastY) {
          current += item.str;
        } else {
          text["HEADING"].push(current);
          current = "";
          current += item.str;
        }
        lastY = item.transform[5];
      }*/
      return text;
    });
  },
};

const data = await pdf(new Uint8Array(file), options);

console.log(sections);
