const pdf = require("pdf-parse");

async function extractText(buffer) {

  const data = await pdf(buffer);

  let text = data.text;

  /* Clean text */

  text = text
    .replace(/\s+/g, " ")
    .replace(/\n\s*\n/g, "\n")
    .trim();

  return text;
}

module.exports = extractText;