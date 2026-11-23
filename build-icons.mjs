import { readFileSync, writeFileSync } from "node:fs";
const set = JSON.parse(readFileSync("node_modules/@iconify-json/material-icon-theme/icons.json", "utf8"));
const has = n => set.icons[n];

// file extensions -> Material Icon Theme names
const ext = {
  html:"html", htm:"html", css:"css", scss:"sass", sass:"sass", less:"less",
  js:"javascript", mjs:"javascript", cjs:"javascript", ts:"typescript", jsx:"react", tsx:"react",
  json:"json", svg:"svg", md:"markdown", mdx:"markdown", yml:"yaml", yaml:"yaml", xml:"xml", toml:"toml",
  png:"image", jpg:"image", jpeg:"image", gif:"image", webp:"image", ico:"image", bmp:"image", avif:"image",
  py:"python", vue:"vue", php:"php", java:"java", go:"go", rs:"rust", c:"c", cpp:"cpp", cs:"csharp",
  rb:"ruby", swift:"swift", kt:"kotlin", dart:"dart", lua:"lua", sh:"console", bash:"console", ps1:"powershell",
  csv:"table", sql:"database", txt:"document", log:"log", lock:"lock", pdf:"pdf", env:"tune",
  zip:"zip", tar:"zip", gz:"zip", tgz:"zip", rar:"zip", "7z":"zip",
  mp4:"video", webm:"video", mov:"video", mp3:"audio", wav:"audio", ogg:"audio",
  woff:"font", woff2:"font", ttf:"font", otf:"font"
};
// exact file names
const files = {
  "package.json":"nodejs", "package-lock.json":"nodejs", "readme.md":"readme", "license":"certificate", "license.md":"certificate",
  ".gitignore":"git", ".gitattributes":"git", "favicon.ico":"favicon", "robots.txt":"robots", "dockerfile":"docker",
  "vite.config.js":"vite", "tailwind.config.js":"tailwindcss", ".nojekyll":"git", ".env":"tune", "todo.md":"todo"
};
// folder names -> base icon name (the "-open" variant is derived)
const dirs = {
  src:"folder-src", source:"folder-src", public:"folder-public", images:"folder-images", img:"folder-images", imgs:"folder-images",
  css:"folder-css", styles:"folder-css", style:"folder-css", js:"folder-javascript", scripts:"folder-scripts",
  data:"folder-database", db:"folder-database", docs:"folder-docs", doc:"folder-docs", components:"folder-components",
  node_modules:"folder-node", test:"folder-test", tests:"folder-test", __tests__:"folder-test", config:"folder-config",
  pages:"folder-views", views:"folder-views", api:"folder-api", utils:"folder-utils", util:"folder-utils", helpers:"folder-utils",
  assets:"folder-resource", lib:"folder-lib", dist:"folder-dist", build:"folder-dist", fonts:"folder-font", json:"folder-json",
  temp:"folder-temp", tmp:"folder-temp", plugins:"folder-plugin", layouts:"folder-layout", routes:"folder-routes",
  hooks:"folder-hook", server:"folder-server", client:"folder-client", app:"folder-app", mock:"folder-mock", mocks:"folder-mock",
  ".github":"folder-github", workflows:"folder-gh-workflows", ".vscode":"folder-vscode"
};

const used = {}, miss = [];
const svg = n => {
  if (!has(n)) { miss.push(n); n = "document"; }
  const ic = set.icons[n], w = ic.width ?? set.width ?? 16, h = ic.height ?? set.height ?? 16;
  return used[n] ||= `<svg style="width:20px;height:20px;flex:none" viewBox="${ic.left ?? 0} ${ic.top ?? 0} ${w} ${h}">${ic.body}</svg>`;
};
const out = { files: {}, ext: {}, dirs: {}, dirsOpen: {} };
for (const [k, v] of Object.entries(ext)) out.ext[k] = svg(v);
for (const [k, v] of Object.entries(files)) out.files[k] = svg(v);
for (const [k, v] of Object.entries(dirs)) { out.dirs[k] = svg(v); out.dirsOpen[k] = svg(has(v + "-open") ? v + "-open" : v); }
out.file = svg("document"); const warm = x => x.replace(/#8d6e63/gi, "#ffb300").replace(/#d7ccc8/gi, "#ffe082"); // amber default folders
out.dir = warm(svg("folder-base")); out.dirOpen = warm(svg("folder-base-open"));

writeFileSync("icons.js",
`window.VSICONS=(p,d,o)=>{const I=${JSON.stringify(out)};const n=p.split("/").pop().toLowerCase();
if(d)return(o?I.dirsOpen[n]||I.dirOpen:I.dirs[n]||I.dir);
return I.files[n]||I.ext[n.split(".").pop()]||I.file};\n`);
console.log("icons.js written:", Object.keys(used).length, "unique icons", miss.length ? "| missing: " + [...new Set(miss)].join(", ") : "");
