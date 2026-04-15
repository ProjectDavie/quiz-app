function isHeading(line) {
  const trimmed = line.trim();

  if (!trimmed) return false;

  // ALL CAPS heading
  if (trimmed === trimmed.toUpperCase() && trimmed.length < 80) {
    return true;
  }

  // Ends with colon (common in notes)
  if (trimmed.endsWith(":")) {
    return true;
  }

  // Short strong title
  if (trimmed.split(" ").length <= 6 && trimmed.length < 60) {
    return true;
  }

  return false;
}

function cleanLine(line) {
  return line
    .replace(/\s+/g, " ")
    .replace(/[•\-–]/g, "")
    .trim();
}

function generateTopics(pages) {
  const topics = [];

  let currentTopic = null;

  pages.forEach((page) => {
    const lines = page.text
      .split("\n")
      .map(cleanLine)
      .filter(Boolean);

    lines.forEach((line) => {
      const heading = isHeading(line);

      // START NEW TOPIC
      if (heading) {
        if (currentTopic) {
          topics.push(currentTopic);
        }

        currentTopic = {
          topic: line.replace(/:$/, ""),
          pageNumbers: [page.pageNumber],
          content: "",
          type: "section",
        };

        return;
      }

      // INIT IF NULL
      if (!currentTopic) {
        currentTopic = {
          topic: `Page ${page.pageNumber} - General`,
          pageNumbers: [page.pageNumber],
          content: "",
          type: "section",
        };
      }

      // APPEND CONTENT
      currentTopic.content += line + " ";
    });

    // ensure page tracking
    if (currentTopic && !currentTopic.pageNumbers.includes(page.pageNumber)) {
      currentTopic.pageNumbers.push(page.pageNumber);
    }
  });

  // finalize last topic
  if (currentTopic) {
    topics.push(currentTopic);
  }

  // CLEAN OUTPUT
  return topics.map((t) => ({
    ...t,
    content: t.content.trim(),
  }));
}

module.exports = { generateTopics };