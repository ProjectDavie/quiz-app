const pdf = require("pdf-parse");

async function extractText(buffer) {
  const data = await pdf(buffer);

  const pages = data.text
    .split("\n\x0c") // pdf-parse page separator (important)
    .map((pageText, index) => {
      let text = pageText;

      // --- CLEANING ---
      text = text
        .replace(/-\n/g, "")              // fix broken words
        .replace(/\s+/g, " ")             // normalize spacing
        .replace(/\n+/g, "\n")            // reduce line noise
        .trim();

      return {
        page: index + 1,
        text,
      };
    });

  // --- BUILD STRUCTURE-AWARE FULL TEXT ---
  const fullText = pages
    .map(p => `PAGE ${p.page}\n${p.text}`)
    .join("\n\n");

  return {
    pages,
    fullText,
  };
}

module.exports = extractText;