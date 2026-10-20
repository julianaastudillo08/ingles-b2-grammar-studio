import fs from "fs";

const path = "index.html";
let html = fs.readFileSync(path, "utf8");

const order = [
  "tenses", "future", "conditionals", "modals", "passive", "reported", "relatives", "wish",
  "inversion", "participles", "articles", "connectors", "phrasal", "prepositions", "wordformation",
  "agreement", "comparatives", "questions", "writing", "falsefriends", "idioms", "reading",
  "strategies", "irregular", "collocations", "vocab", "plan", "glossary", "reference", "ecaes",
];

const mainStart = html.indexOf("<main>");
const mainEnd = html.indexOf("</main>");
if (mainStart < 0 || mainEnd < 0) throw new Error("main not found");

const main = html.slice(mainStart, mainEnd + 7);
const heroEnd = main.indexOf('<article class="section"');
const footerStart = main.lastIndexOf("<footer");
if (heroEnd < 0 || footerStart < 0) throw new Error("hero/articles/footer bounds");

const head = main.slice(0, heroEnd);
const foot = main.slice(footerStart);

const articles = {};
for (const id of order) {
  const re = new RegExp(`<article class="section" id="${id}"[^>]*>[\\s\\S]*?</article>`, "i");
  const m = main.match(re);
  if (!m) throw new Error("missing article " + id);
  articles[id] = m[0];
}

const body = order.map((id) => articles[id]).join("\n\n      ");
const newMain = head + body + "\n\n      " + foot;
html = html.slice(0, mainStart) + newMain + html.slice(mainEnd + 7);
fs.writeFileSync(path, html);
console.log("Reordered", order.length, "sections");
