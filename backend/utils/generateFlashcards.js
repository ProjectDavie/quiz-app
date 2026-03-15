function generateFlashcards(text) {
  const sentences = text.split(".");
  const flashcards = [];

  sentences.forEach(sentence => {
    if (sentence.includes(" is ")) {
      const parts = sentence.split(" is ");

      const term = parts[0].trim();
      const definition = parts[1].trim();

      if (term.length > 0 && definition.length > 0) {
        flashcards.push({
          front: term,
          back: definition
        });
      }
    }
  });

  return flashcards;
}

module.exports = { generateFlashcards };