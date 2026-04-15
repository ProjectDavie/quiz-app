function splitSentences(text) {
  return text
    .replace(/\s+/g, " ")
    .split(/(?<=[.?!])\s+/)
    .map(s => s.trim())
    .filter(s => s.length > 10);
}

function isDefinition(sentence) {
  // X is Y pattern
  return /\b(is|are|was|were)\b/.test(sentence) && sentence.split(" ").length > 4;
}

function extractDefinition(sentence) {
  const match = sentence.match(/(.+?)\s+(is|are|was|were)\s+(.+)/i);
  if (!match) return null;

  return {
    concept: match[1].trim(),
    definition: match[3].trim()
  };
}

function containsList(text) {
  return /\(\w\)|\bi\)|\bii\)|\biii\)|\b-\b|\•/.test(text);
}

function generateQuestions(text) {
  const sentences = splitSentences(text);

  const questions = [];

  sentences.forEach(sentence => {
    const clean = sentence.trim();

    // 🔥 RULE 1: Definition questions
    if (isDefinition(clean)) {
      const def = extractDefinition(clean);

      if (def && def.concept.length > 2 && def.definition.length > 5) {
        questions.push({
          question: `What is ${def.concept}?`,
          answer: def.definition
        });
      }
    }

    // 🔥 RULE 2: Concept explanation
    if (clean.length > 60 && !containsList(clean)) {
      questions.push({
        question: `Explain: ${clean.slice(0, 50)}...`,
        answer: clean
      });
    }

    // 🔥 RULE 3: "What does X do?" pattern
    if (clean.toLowerCase().includes("used for") || clean.toLowerCase().includes("used to")) {
      const subject = clean.split("used")[0].trim();

      questions.push({
        question: `What is ${subject} used for?`,
        answer: clean
      });
    }
  });

  return questions.slice(0, 50); // prevent overload
}

module.exports = { generateQuestions };