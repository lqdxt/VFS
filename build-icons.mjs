import { readFileSync, writeFileSync } from "node:fs";
const set = JSON.parse(readFileSync("node_modules/@iconify-json/vscode-icons/icons.json", "utf8"));
const map = {
  html:"file-type-html", htm:"file-type-html", css:"file-type-css", js:"file-type-js-official", mjs:"file-type-js-official",
  json:"file-type-json", svg:"file-type-svg", png:"file-type-image", jpg:"file-type-image", jpeg:"file-type-image",
  gif:"file-type-image", webp:"file-type-image", md:"file-type-markdown", ts:"file-type-typescript-official",
  tsx:"file-type-reactjs", jsx:"file-type-reactjs", py:"file-type-python", vue:"file-type-vue", txt:"file-type-text",
  _file:"default-file", _dir:"default-folder", _open:"default-folder-opened"
};
const svg = n => `<svg style="width:20px;height:20px;flex:none" viewBox="0 0 32 32">${set.icons[n].body}</svg>`;
const out = Object.fromEntries(Object.entries(map).map(([k, v]) => [k, svg(v)]));
writeFileSync("icons.js", `window.VSICONS=(p,d,o)=>{const I=${JSON.stringify(out)};return d?(o?I._open:I._dir):(I[(p.split(".").pop()||"").toLowerCase()]||I._file)};\n`);
console.log("icons.js written:", Object.keys(out).length, "icons");
