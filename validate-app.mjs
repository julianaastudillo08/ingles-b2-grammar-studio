import fs from "fs";
import vm from "vm";

const html = fs.readFileSync("index.html", "utf8");
const script = html.match(/<script[^>]*>([\s\S]*?)<\/script>/i)[1];
const cut = script.indexOf('document.querySelectorAll(".mark-done").forEach((btn) => {\n      btn.addEventListener("click"');
if (cut < 0) throw new Error("cut marker not found");
const dataScript = script.slice(0, cut);

const quizKeys = [
  "tenses", "future", "conditionals", "modals", "passive", "reported", "relatives", "wish",
  "inversion", "participles", "articles", "connectors", "phrasal", "prepositions", "wordformation",
  "agreement", "writing", "escritura", "comparatives", "questions", "falsefriends", "idioms",
  "reading", "strategies", "irregular", "collocations", "vocab", "reference",
];

const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(
  dataScript +
    `
  mergeUltraBoostIntoQuizzes();
  QUIZZES.escritura.items = WRITING_DATA.exercises || [];
  const issues = [];
  const bank = getMasterExamBank();

  function checkItem(item, where) {
    if (!item || !item.type) { issues.push({ where, msg: "missing type" }); return; }
    const t = item.type;
    if (t === "choice") {
      if (!item.q && !item.line) issues.push({ where, msg: "choice missing q" });
      if (!Array.isArray(item.options) || item.options.length < 2) issues.push({ where, msg: "choice bad options" });
      if (item.correct == null || item.correct < 0 || item.correct >= (item.options?.length || 0))
        issues.push({ where, msg: "choice bad correct", correct: item.correct, where });
    }
    if (t === "gap") {
      if (!item.line && !item.q) issues.push({ where, msg: "gap missing line" });
      if (!item.answers || !item.answers.length) issues.push({ where, msg: "gap no answers" });
    }
    if (t === "error") {
      if (!item.options || item.correct == null) issues.push({ where, msg: "error incomplete" });
    }
    if (t === "match") {
      if (!item.left || !item.right || !item.pairs) issues.push({ where, msg: "match incomplete" });
      if (item.pairs && item.left && item.pairs.length !== item.left.length)
        issues.push({ where, msg: "match pairs length" });
    }
    if (t === "order") {
      if (!item.parts || !item.order) issues.push({ where, msg: "order incomplete" });
      if (item.parts && item.order) {
        const used = new Set(item.order);
        if (used.size !== item.order.length) issues.push({ where, msg: "order duplicate indices" });
        item.order.forEach((i) => {
          if (i < 0 || i >= item.parts.length) issues.push({ where, msg: "order index OOB", i });
        });
      }
    }
    if (t === "cloze") {
      if (!item.segments) issues.push({ where, msg: "cloze no segments" });
    }
    if (t === "reading") {
      if (!item.passage && !item.questions) issues.push({ where, msg: "reading incomplete" });
    }
  }

  for (const key of ${JSON.stringify(quizKeys)}) {
    const q = QUIZZES[key];
    if (!q) issues.push({ where: "QUIZZES", msg: "missing quiz key " + key });
    else q.items.forEach((it, i) => {
      if (it.type === "reading" && it.questions) it.questions.forEach((sub, j) => checkItem(sub, "quiz:" + key + "[" + i + "].q[" + j + "]"));
      else checkItem(it, "quiz:" + key + "[" + i + "]");
    });
  }

  bank.forEach((it, i) => checkItem(it, "bank[" + i + "]"));

  const htmlStr = ${JSON.stringify(html)};
  const missingSections = SECTIONS.map(s => s.id).filter(id => !htmlStr.includes('id="' + id + '"'));

  result = {
    bankSize: bank.length,
    issues,
    missingSections,
    topicCounts: Object.fromEntries(Object.entries(QUIZZES).map(([k,v]) => [k, v.items.length]))
  };
  `,
  sandbox
);

const { result } = sandbox;
console.log("Bank size:", result.bankSize);
console.log("Missing sections:", result.missingSections);
console.log("Issues:", result.issues.length);
if (result.issues.length) console.log(result.issues.slice(0, 30));
const totalTopic = Object.values(result.topicCounts).reduce((a, b) => a + b, 0);
console.log("Topic quiz items (total):", totalTopic);
console.log("Per topic:", result.topicCounts);
