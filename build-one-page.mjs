import fs from "fs";
import vm from "vm";

const dir = import.meta.dirname || ".";
const htmlPath = `${dir}/index.html`;
let html = fs.readFileSync(htmlPath, "utf8");

const extraSrc = fs.readFileSync(`${dir}/data-extra.js`, "utf8");
const writingSrc = fs.readFileSync(`${dir}/writing-extra.js`, "utf8");
const megaSrc = fs.readFileSync(`${dir}/mega-bank.js`, "utf8");

const ctx = { globalThis: null };
ctx.globalThis = ctx;
vm.createContext(ctx);
vm.runInNewContext(
  extraSrc.replace(/window\.GRAMMAR_STUDIO_EXTRA/g, "globalThis.GRAMMAR_STUDIO_EXTRA") +
    "\n" +
    writingSrc.replace(/window\.GRAMMAR_STUDIO_WRITING/g, "globalThis.GRAMMAR_STUDIO_WRITING") +
    "\n" +
    megaSrc.replace(/^MEGA_BANK\s*=/, "globalThis.MEGA_BANK ="),
  ctx
);

const inline = `    const EXAM_BANK_EXTRA = ${JSON.stringify(ctx.GRAMMAR_STUDIO_EXTRA?.exercises || [])};
    const GLOSSARY_DATA = ${JSON.stringify(ctx.GRAMMAR_STUDIO_EXTRA?.glossary || [])};
    const STUDY_WEEKS = ${JSON.stringify(ctx.GRAMMAR_STUDIO_EXTRA?.studyWeeks || [])};
    const WRITING_DATA = ${JSON.stringify({
      prompts: ctx.GRAMMAR_STUDIO_WRITING?.prompts || [],
      exercises: ctx.GRAMMAR_STUDIO_WRITING?.exercises || [],
    })};
    const MEGA_BANK = ${JSON.stringify(ctx.MEGA_BANK || [])};

`;

html = html.replace(/<script src="data-extra\.js"><\/script>\s*\n?\s*<script src="writing-extra\.js"><\/script>\s*\n?/, "");

if (!html.includes("const EXAM_BANK_EXTRA")) {
  html = html.replace(/(\s*const EXAM_BANK = \[)/, `\n${inline}$1`);
}

const sectionsBlock = `    const NAV_GROUPS = [
      { id: "1-core", label: "Parte I — Gramática base" },
      { id: "2-structure", label: "Parte II — Estructura" },
      { id: "3-lexis", label: "Parte III — Léxico y forma" },
      { id: "4-skills", label: "Parte IV — Habilidades" },
      { id: "5-exam", label: "Parte V — Repaso y examen" },
      { id: "practice", label: "Parte VI — Simulacros" }
    ];

    const SECTIONS = [
      { id: "tenses", label: "01 · Tiempos verbales", group: "1-core" },
      { id: "future", label: "02 · Futuro", group: "1-core" },
      { id: "conditionals", label: "03 · Condicionales", group: "1-core" },
      { id: "modals", label: "04 · Modales", group: "1-core" },
      { id: "passive", label: "05 · Voz pasiva", group: "2-structure" },
      { id: "reported", label: "06 · Estilo indirecto", group: "2-structure" },
      { id: "relatives", label: "07 · Oraciones de relativo", group: "2-structure" },
      { id: "wish", label: "08 · Wish y preferencias", group: "2-structure" },
      { id: "inversion", label: "09 · Inversión (C1)", group: "2-structure" },
      { id: "participles", label: "10 · Gerundios e infinitivos", group: "2-structure" },
      { id: "articles", label: "11 · Artículos y cuantificadores", group: "3-lexis" },
      { id: "connectors", label: "12 · Conectores formales", group: "3-lexis" },
      { id: "phrasal", label: "13 · Phrasal verbs", group: "3-lexis" },
      { id: "prepositions", label: "14 · Preposiciones", group: "3-lexis" },
      { id: "wordformation", label: "15 · Formación de palabras", group: "3-lexis" },
      { id: "agreement", label: "16 · Concordancia y tags", group: "3-lexis" },
      { id: "comparatives", label: "17 · Comparativos", group: "3-lexis" },
      { id: "questions", label: "18 · Preguntas indirectas", group: "3-lexis" },
      { id: "writing", label: "19 · Escritura (taller)", group: "4-skills" },
      { id: "falsefriends", label: "20 · Falsos amigos", group: "4-skills" },
      { id: "idioms", label: "21 · Idioms B2", group: "4-skills" },
      { id: "reading", label: "22 · Reading comprehension", group: "4-skills" },
      { id: "strategies", label: "23 · Estrategias ECAES", group: "5-exam" },
      { id: "irregular", label: "24 · Verbos irregulares", group: "5-exam" },
      { id: "collocations", label: "25 · Collocations", group: "5-exam" },
      { id: "vocab", label: "26 · Vocabulario AWL", group: "5-exam" },
      { id: "plan", label: "27 · Plan 4 semanas", group: "5-exam" },
      { id: "glossary", label: "28 · Glosario", group: "5-exam" },
      { id: "reference", label: "29 · Fichas rápidas", group: "5-exam" },
      { id: "ecaes", label: "30 · Banco y simulacros", group: "practice" }
    ];`;

html = html.replace(/const SECTIONS = \[[\s\S]*?\];/, sectionsBlock);

if (!html.includes("const NAV_GROUPS")) {
  console.error("SECTIONS replace failed");
  process.exit(1);
}

const buildNavFn = `    function buildNav() {
      const ul = document.getElementById("navList");
      ul.innerHTML = "";
      NAV_GROUPS.forEach((g) => {
        const head = document.createElement("li");
        head.innerHTML = '<p class="nav-label">' + g.label + "</p>";
        ul.appendChild(head);
        SECTIONS.filter((s) => s.group === g.id).forEach((s) => {
          const li = document.createElement("li");
          const a = document.createElement("a");
          a.href = "#" + s.id;
          a.textContent = s.label;
          a.dataset.target = s.id;
          li.appendChild(a);
          ul.appendChild(li);
        });
      });
    }`;

html = html.replace(/function buildNav\(\) \{[\s\S]*?\n    \}/, buildNavFn);

const partCss = `
    .part-banner {
      margin: 2.5rem 0 1.5rem;
      padding: 1rem 1.25rem;
      border-left: 4px solid var(--accent);
      background: var(--bg-elevated);
      border-radius: var(--radius-sm);
    }
    .part-banner-num { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.14em; color: var(--accent); font-weight: 700; }
    .part-banner h3 { font-family: var(--font-display); font-size: 1.65rem; margin-top: 0.25rem; font-weight: 600; }
    .course-map { margin-top: 1rem; padding: 1rem 1.15rem; background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius); font-size: 0.82rem; color: var(--text-soft); }
    .course-map ol { margin: 0.5rem 0 0 1.2rem; }
    .course-map li { margin-bottom: 0.25rem; }`;

if (!html.includes(".part-banner")) {
  html = html.replace(/footer \{/, partCss + "\n\n    footer {");
}

if (!html.includes('id="courseMap"')) {
  html = html.replace(
    /<div class="hero-stats" id="heroStats"><\/div>/,
    `<div class="hero-stats" id="heroStats"></div>\n        <div class="course-map" id="courseMap"></div>`
  );
}

const helpers = `
    const PART_BANNER_META = {
      "1-core": { title: "Parte I", subtitle: "Gramática fundamental" },
      "2-structure": { title: "Parte II", subtitle: "Estructura de la oración" },
      "3-lexis": { title: "Parte III", subtitle: "Léxico, forma y precisión" },
      "4-skills": { title: "Parte IV", subtitle: "Escritura, lectura y uso" },
      "5-exam": { title: "Parte V", subtitle: "Repaso, recursos y examen" },
      "practice": { title: "Parte VI", subtitle: "Banco ECAES y simulacros" }
    };

    function getMasterExamBank() {
      return [...EXAM_BANK, ...EXAM_BANK_EXTRA, ...WRITING_DATA.exercises, ...MEGA_BANK];
    }

    function renderCourseMap() {
      const el = document.getElementById("courseMap");
      if (!el) return;
      let list = "";
      NAV_GROUPS.forEach((g) => {
        const items = SECTIONS.filter((s) => s.group === g.id).map((s) => s.label).join(" → ");
        list += "<li><strong>" + g.label + ":</strong> " + items + "</li>";
      });
      el.innerHTML = "<strong>Mapa del curso — 30 módulos en orden</strong><ol>" + list + "</ol>";
    }

    function insertPartBanners() {
      let last = null;
      document.querySelectorAll("article.section").forEach((art) => {
        const sec = SECTIONS.find((s) => s.id === art.id);
        const g = sec?.group;
        if (!g || g === last) return;
        const meta = PART_BANNER_META[g];
        if (!meta) return;
        const banner = document.createElement("div");
        banner.className = "part-banner";
        banner.innerHTML = '<span class="part-banner-num">' + meta.title + '</span><h3>' + meta.subtitle + '</h3>';
        art.parentNode.insertBefore(banner, art);
        last = g;
      });
    }

`;

if (!html.includes("function getMasterExamBank")) {
  html = html.replace(/function getExtraExercises/, helpers + "\n    function getExtraExercises");
}

html = html.replace(
  /function getExtraExercises\(\) \{[\s\S]*?\n    \}/,
  `function getExtraExercises() {
      return EXAM_BANK_EXTRA;
    }`
);

html = html.replace(
  /function getWritingExercises\(\) \{[\s\S]*?\n    \}/,
  `function getWritingExercises() {
      return WRITING_DATA.exercises || [];
    }`
);

html = html.replace(
  /function getAllExercisePool\(\) \{[\s\S]*?return \[[\s\S]*?\];\n    \}/,
  `function getAllExercisePool() {
      const fromTopics = Object.values(QUIZZES).flatMap((q) => q.items.flatMap(flattenExercise));
      return [...getMasterExamBank(), ...fromTopics];
    }`
);

html = html.replace(
  /function getFilteredExam\(\) \{[\s\S]*?\n    \}/,
  `function getFilteredExam() {
      if (examFilter === "all") return getMasterExamBank();
      return getMasterExamBank().filter((x) => x.type === examFilter);
    }`
);

html = html.replace(
  /const weeks = [\s\S]*?studyWeeks[\s\S]*?\[\];/,
  "const weeks = STUDY_WEEKS;"
);

html = html.replace(
  /const items = [\s\S]*?glossary[\s\S]*?\[\];/,
  "const items = GLOSSARY_DATA;"
);

html = html.replace(
  /if \(WRITING_DATA && QUIZZES\.escritura\) QUIZZES\.escritura\.items = WRITING_DATA\.exercises \|\| \[\];/,
  "if (QUIZZES.escritura) QUIZZES.escritura.items = WRITING_DATA.exercises || [];"
);

html = html.replace(
  /const w = window\.GRAMMAR_STUDIO_WRITING;[\s\S]*?const prompts = \(WRITING_DATA && WRITING_DATA\.prompts\) \|\| \[\];/,
  "const prompts = WRITING_DATA.prompts || [];"
);

html = html.replace(
  /initWritingWorkshop\(\);\s*buildNav\(\);/,
  "initWritingWorkshop();\n    renderCourseMap();\n    insertPartBanners();\n    buildNav();"
);

html = html.replace(
  /English Grammar Studio ·[^<]+/,
  "English Grammar Studio · TODO EN UNA PÁGINA · 30 módulos · 450+ ejercicios · Sin archivos externos."
);

fs.writeFileSync(htmlPath, html);
const total =
  (ctx.GRAMMAR_STUDIO_EXTRA?.exercises?.length || 0) +
  (ctx.GRAMMAR_STUDIO_WRITING?.exercises?.length || 0) +
  (ctx.MEGA_BANK?.length || 0);
console.log("Built index.html | extra+bank items:", total);
