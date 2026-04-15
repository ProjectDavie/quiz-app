function scoreSentence(sentence) {
  let score = 0;

  const lower = sentence.toLowerCase();

  if (lower.includes(" is ")) score += 5;
  if (lower.includes(" means ")) score += 5;
  if (lower.includes(" refers to ")) score += 4;
  if (sentence.length < 120) score += 2;

  return score;
}

function extractChunks(pages) {
  const chunks = [];

  pages.forEach((page) => {
    const sentences = page.text
      .split(".")
      .map((s) => s.trim())
      .filter(Boolean);

    sentences.forEach((sentence) => {
      const score = scoreSentence(sentence);

      if (score >= 4) {
        chunks.push({
          text: sentence,
          page: page.pageNumber,
        });
      }
    });
  });

  return chunks;
}

function generateFlashcards(pages) {
  const chunks = extractChunks(pages);

  return chunks.slice(0, 25).map((chunk, i) => {
    const words = chunk.text.split(" ");

    return {
      id: i + 1,
      front: words.slice(0, 6).join(" ") + "...",
      back: chunk.text,
      page: chunk.page,
      type: "offline",
    };
  });
}

module.exports = { generateFlashcards };