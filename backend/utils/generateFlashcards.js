function splitSentences(text) {
  return text
    .replace(/\s+/g, " ")
    .split(/(?<=[.?!])\s+/)
    .map(s => s.trim())
    .filter(s => s.length > 10);
}

function extractDefinition(sentence) {
  const match = sentence.match(/(.+?)\s+(is|are|was|were)\s+(.+)/i);
  if (!match) return null;

  return {
    front: match[1].trim(),
    back: match[3].trim()
  };
}

function generateFlashcards(text) {
  const sentences = splitSentences(text);

  const flashcards = [];

  sentences.forEach(sentence => {
    const clean = sentence.trim();

    // 🔥 Definition flashcards
    const def = extractDefinition(clean);

    if (def && def.front.length > 2 && def.back.length > 5) {
      flashcards.push({
        front: def.front,
        back: def.back
      });
    }

    // 🔥 Key fact flashcards (short strong sentences)
    if (clean.length > 40 && clean.length < 180) {
      flashcards.push({
        front: `Key idea`,
        back: clean
      });
    }
  });

  return flashcards.slice(0, 50);
}

module.exports = { generateFlashcards };