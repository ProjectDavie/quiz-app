const { callAI } = require("./generateAI");

/**
 * Generate AI questions per page
 */
async function generateAIQuestions(text, pageNumber) {
  const prompt = `
You are generating exam questions from ONE PAGE ONLY.

PAGE NUMBER: ${pageNumber}

Rules:
- Use ONLY this page content
- Generate 2-3 questions max
- Include clear answers
- No repetition
- Academic tone

Return ONLY JSON:

{
  "questions": [
    {
      "question": "string",
      "answer": "string or bullet points",
      "page": ${pageNumber}
    }
  ]
}

TEXT:
${text}
`;

  const result = await callAI(prompt);

  if (!result || !result.questions) return [];

  return result.questions;
}

module.exports = { generateAIQuestions };