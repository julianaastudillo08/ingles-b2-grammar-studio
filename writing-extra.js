/* Taller de escritura B2+ — ejercicios y consignas */
window.GRAMMAR_STUDIO_WRITING = {
  prompts: [
    {
      id: "opinion-social",
      title: "Opinion essay — Redes sociales",
      minWords: 200,
      task: "Some people believe social media does more harm than good for teenagers. To what extent do you agree or disagree? Give reasons and examples. Write 200–250 words. Use formal register."
    },
    {
      id: "discuss-edu",
      title: "Discussion — Educación online",
      minWords: 200,
      task: "Discuss the advantages and disadvantages of online learning for university students. Include a clear conclusion with your overall view."
    },
    {
      id: "problem-city",
      title: "Problem-solution — Tráfico urbano",
      minWords: 220,
      task: "Many cities suffer from traffic congestion and air pollution. Describe the main problems and suggest practical solutions. Use at least two paragraphs for solutions."
    },
    {
      id: "email-formal",
      title: "Formal email — Solicitud",
      minWords: 120,
      task: "Write an email to a professor requesting an extension for an assignment. Explain your reason briefly and propose a new deadline. Use Dear Professor…, Yours sincerely."
    },
    {
      id: "email-informal",
      title: "Informal email — Invitación",
      minWords: 100,
      task: "Write an email to a friend inviting them to a small celebration. Mention date, place and one activity. Use informal openings/closings."
    },
    {
      id: "report-survey",
      title: "Short report — Resultados",
      minWords: 150,
      task: "Summarise the main findings of a survey: 60% support recycling, 25% are neutral, 15% oppose. Mention one recommendation for the local council."
    },
    {
      id: "graph-desc",
      title: "Descripción de gráfico",
      minWords: 120,
      task: "Describe a line graph showing rising renewable energy use from 2010 to 2020. Use: increased steadily, peaked, accounted for, compared with."
    },
    {
      id: "complaint",
      title: "Carta de queja",
      minWords: 150,
      task: "Write a complaint letter about a product that stopped working after one week. State what you bought, when, what went wrong, and what you want (refund or replacement)."
    }
  ],
  exercises: [
    { type: "choice", q: "Best opening for a formal essay:", options: ["Hey! Let's talk about…", "In recent years, the issue of… has attracted considerable attention.", "I will write about…", "This is my essay."], correct: 1, explain: "Hook académico + tema." },
    { type: "error", q: "More academic:", options: ["Kids these days are glued to phones.", "Many adolescents spend excessive time on mobile devices.", "Phones are everywhere lol.", "Everybody uses phones and that's it."], correct: 1, explain: "Registro formal." },
    { type: "error", q: "Formal email closing:", options: ["Love,", "Yours sincerely,", "See ya,", "XOXO"], correct: 1, explain: "Yours sincerely (conocemos nombre)." },
    { type: "error", q: "Informal email opening:", options: ["Dear Sir or Madam,", "Hi Maria,", "To whom it may concern,", "Respected Madam,"], correct: 1, explain: "Hi + nombre." },
    { type: "gap", line: "I am writing to ___ (enquire) about the internship programme.", answers: ["enquire", "inquire"], explain: "Formal email phrase." },
    { type: "gap", line: "I look forward to ___ (hear) from you at your earliest convenience.", answers: ["hearing"], explain: "look forward to + -ing." },
    { type: "gap", line: "___ (Please) find attached the report you requested.", answers: ["Please"], explain: "Email formula." },
    { type: "gap", line: "The graph ___ (show) a sharp increase between 2015 and 2018.", answers: ["shows", "showed"], explain: "Present for current figure description." },
    { type: "gap", line: "Overall, it is ___ (clear) that action is needed.", answers: ["clear"], explain: "Hedging + clear." },
    { type: "cloze", segments: ["In conclusion, ", { answers: ["although", "while"] }, " there are drawbacks, the benefits ", { answers: ["outweigh", "are greater than"] }, " the costs."], explain: "Conclusión equilibrada." },
    { type: "order", parts: ["In my opinion", ",", "governments should invest more in public transport"], order: [0, 1, 2], explain: "Opinion topic sentence." },
    { type: "order", parts: ["To begin with", ",", "the main advantage is flexibility"], order: [0, 1, 2], explain: "Organising body paragraph." },
    { type: "match", left: ["Furthermore", "However", "Therefore"], right: ["añadir idea", "contrastar", "concluir causa"], pairs: [0, 1, 2], explain: "Linkers en ensayo." },
    { type: "match", left: ["Dear Mr Smith", "Hi Tom", "To whom it may concern"], right: ["formal conocido", "informal", "formal desconocido"], pairs: [0, 1, 2], explain: "Email register." },
    { type: "choice", q: "Hedging (más cauteloso):", options: ["This proves that…", "This appears to suggest that…", "This is 100% true.", "Everyone knows…"], correct: 1, explain: "appears to suggest." },
    { type: "choice", q: "Nominalisation:", options: ["We implemented the policy quickly.", "The rapid implementation of the policy…", "We did it fast.", "The policy was done."], correct: 1, explain: "implementation of." },
    { type: "choice", q: "Avoid in academic writing:", options: ["passive voice sometimes", "contractions (don't)", "linking words", "paragraphing"], correct: 1, explain: "do not instead of don't." },
    { type: "choice", q: "Topic sentence should:", options: ["introduce the paragraph main idea", "repeat the title only", "be a question only", "list random facts"], correct: 0, explain: "Coherencia." },
    { type: "error", q: "Cohesive paragraph:", options: ["Phones are bad. Cats are cute. I like pizza.", "One drawback is distraction. Another concern is sleep loss.", "Phones. Distraction. Sleep.", "Bad bad bad."], correct: 1, explain: "One theme + Another." },
    { type: "gap", line: "According ___ recent studies, the trend is upward.", answers: ["to"], explain: "according to." },
    { type: "gap", line: "The figure rose ___ approximately 40%.", answers: ["by", "to"], explain: "rise by X% = incremento." },
    { type: "gap", line: "Sales remained ___ (steady) throughout the period.", answers: ["steady", "stable"], explain: "Describing graphs." },
    { type: "cloze", segments: ["The data indicates that women ", { answers: ["accounted for", "represented"] }, " the majority of participants, ", { answers: ["whereas", "while"] }, " men made up the rest."], explain: "Compare data groups." },
    { type: "choice", q: "Best thesis (advantages/disadvantages):", options: ["There are pros and cons.", "While remote work offers flexibility, it may reduce team cohesion.", "I like home.", "Remote work is remote."], correct: 1, explain: "Matiz en tesis." },
    { type: "error", q: "Formal complaint:", options: ["Your product sucks.", "I am writing to express my dissatisfaction with…", "Fix this now!!!", "You guys broke it."], correct: 1, explain: "express my dissatisfaction." },
    { type: "gap", line: "I would be grateful if you could ___ (provide) a full refund.", answers: ["provide"], explain: "Polite request." },
    { type: "gap", line: "___ (I) am attaching copies of the receipt.", answers: ["I"], explain: "Active voice OK in emails." },
    { type: "order", parts: ["On the one hand", ",", "online courses are affordable"], order: [0, 1, 2], explain: "Balanced argument." },
    { type: "order", parts: ["On the other hand", ",", "they require strong self-discipline"], order: [0, 1, 2], explain: "Pair with on the one hand." },
    { type: "choice", q: "Conclusion should NOT:", options: ["summarise main points", "introduce brand-new arguments", "give a final recommendation", "refer back to thesis"], correct: 1, explain: "No ideas nuevas." },
    { type: "match", left: ["In addition", "As a result", "In contrast"], right: ["and", "so", "but"], pairs: [0, 1, 2], explain: "Formal linkers." },
    { type: "gap", line: "This essay will ___ (examine) both sides of the argument.", answers: ["examine", "discuss", "explore"], explain: "Academic intro." },
    { type: "error", q: "Paragraph unity:", options: ["One paragraph = one main idea", "Mix unrelated ideas freely", "No linking words", "One sentence only always"], correct: 0, explain: "Unity." }
  ]
};
