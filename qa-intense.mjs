import fs from "fs";
import vm from "vm";

const html = fs.readFileSync("index.html", "utf8");
const script = html.match(/<script[^>]*>([\s\S]*?)<\/script>/i)[1];
const cut = script.indexOf('document.querySelectorAll(".mark-done").forEach((btn) => {\n      btn.addEventListener("click"');
const dataScript = script.slice(0, cut);

const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(
  dataScript +
    `
  mergeUltraBoostIntoQuizzes();
  QUIZZES.escritura.items = WRITING_DATA.exercises || [];
  const report = { ok: true, checks: [] };
  function check(name, pass, detail) {
    report.checks.push({ name, pass, detail });
    if (!pass) report.ok = false;
  }
  check("bank-size", getMasterExamBank().length >= 400, getMasterExamBank().length);
  check("sections-html", ${JSON.stringify(html)}.includes('id="ecaes"'), true);
  const quizKeys = ${JSON.stringify([
    "tenses","future","conditionals","modals","passive","reported","relatives","wish",
    "inversion","participles","articles","connectors","phrasal","prepositions","wordformation",
    "agreement","comparatives","questions","writing","escritura","falsefriends","idioms",
    "reading","strategies","irregular","collocations","vocab","reference"
  ])};
  quizKeys.forEach((k) => check("quiz-" + k, QUIZZES[k] && QUIZZES[k].items.length > 0, QUIZZES[k]?.items?.length || 0));
  check("topic-grammar1", getTopicPool("grammar1").length > 10, getTopicPool("grammar1").length);
  check("type-gap", getTopicPool("type:gap").length > 20, getTopicPool("type:gap").length);
  let renderFails = 0;
  getMasterExamBank().slice(0, 120).forEach((item) => {
    try {
      const flat = flattenExercise(item);
      flat.forEach((f) => {
        if (f.type === "gap" && !f.line && !f.q) renderFails++;
        if (f.type === "choice" && (!f.options || f.correct == null)) renderFails++;
      });
    } catch (_) { renderFails++; }
  });
  check("sample-items", renderFails === 0, renderFails);
  globalThis.__qaReport = report;
  `,
  sandbox
);

const report = sandbox.__qaReport;
console.log(report.ok ? "QA INTENSE: OK" : "QA INTENSE: FAILURES");
for (const c of report.checks) {
  if (!c.pass) console.log("  FAIL", c.name, c.detail);
}
process.exit(report.ok ? 0 : 1);
