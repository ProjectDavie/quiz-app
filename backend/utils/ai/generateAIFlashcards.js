const { callAI } = require("./generateAI");

/**
 * Generate AI flashcards per page
 */
async function generateAIFlashcards(text, pageNumber) {
  const prompt = `
Create flashcards from ONE PAGE ONLY.

PAGE NUMBER: ${pageNumber}

Rules:
- 2-3 flashcards max
- simple front, detailed back
- use ONLY page content

Return ONLY JSON:

{
  "flashcards": [
    {
      "front": "string",
      "back": "string",
      "page": ${pageNumber}
    }
  ]
}

TEXT:
${text}
`;

  const result = await callAI(prompt);

  if (!result || !result.flashcards) return [];

  return result.flashcards;
}

module.exports = { generateAIFlashcards };