function generateQuestions(text) {
  if (!text) return [];

  const sentences = text
    .split(".")
    .map(s => s.trim())
    .filter(s => s.length > 10);

  const questions = [];

  for (const sentence of sentences) {
    // Try to find definition-style sentences
    if (sentence.includes(" is ")) {
      const [term, definition] = sentence.split(" is ");

      if (term && definition) {
        questions.push({
          question: `What is ${term.trim()}?`,
          answer: definition.trim(),
        });
      }
    }
  }

  // Fallback (IMPORTANT)
  if (questions.length === 0 && sentences.length > 0) {
    questions.push({
      question: `Explain: ${sentences[0]}`,
      answer: sentences[0],
    });
  }

  return questions;
}

module.exports = { generateQuestions };