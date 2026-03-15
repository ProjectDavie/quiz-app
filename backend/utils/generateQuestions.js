// backend/utils/generateQuestions.js

function generateQuestions(text) {
  const sentences = text.split(".");
  const questions = [];

  sentences.forEach(sentence => {
    if (sentence.includes(" is ")) {
      const parts = sentence.split(" is ");
      const term = parts[0].trim();
      const definition = parts[1].trim();

      if (term.length > 0 && definition.length > 0) {
        questions.push({
          question: `What is ${term}?`,
          answer: definition
        });
      }
    }
  });

  return questions;
}

module.exports = { generateQuestions };