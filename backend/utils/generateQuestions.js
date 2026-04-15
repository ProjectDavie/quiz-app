function normalizePages(input) {
  if (!input) return [];

  if (Array.isArray(input)) return input;

  if (input.pages && Array.isArray(input.pages)) return input.pages;

  return [];
}

function scoreSentence(sentence) {
  let score = 0;

  const lower = sentence.toLowerCase();

  if (lower.includes(" is ")) score += 5;
  if (lower.includes(" defined as ")) score += 6;
  if (lower.includes(" refers to ")) score += 4;
  if (sentence.length < 120) score += 2;
  if (/\d/.test(sentence)) score += 2; // contains numbers
  if (sentence === sentence.toUpperCase()) score += 3;

  return score;
}

function extractBestChunks(pages) {
  const chunks = [];

  pages.forEach((page) => {
    const sentences = page.text
      .split(".")
      .map((s) => s.trim())
      .filter(Boolean);

    sentences.forEach((sentence) => {
      const score = scoreSentence(sentence);

      if (score >= 5) {
        chunks.push({
          text: sentence,
          page: page.pageNumber,
          score,
        });
      }
    });
  });

  return chunks.sort((a, b) => b.score - a.score);
}

function generateQuestions(input) {
  const pages = normalizePages(input);
  const chunks = extractBestChunks(pages);

  return chunks.slice(0, 20).map((chunk, index) => {
    return {
      id: index + 1,
      question: `According to page ${chunk.page}, what does the following statement explain?`,
      answer: chunk.text,
      page: chunk.page,
      type: "offline",
    };
  });
}

module.exports = { generateQuestions };