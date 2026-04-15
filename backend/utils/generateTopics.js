function isHeading(line) {
  if (!line) return false;

  return (
    line === line.toUpperCase() ||
    line.endsWith(":") ||
    (line.length < 60 && /^[A-Z]/.test(line))
  );
}

function generateTopics(pages) {
  const topics = [];

  pages.forEach((page) => {
    const lines = page.text
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    let currentTopic = null;

    lines.forEach((line) => {
      if (isHeading(line)) {
        if (currentTopic) topics.push(currentTopic);

        currentTopic = {
          topicName: line.replace(/:$/, "").trim(),
          pageNumbers: [page.pageNumber],
          content: "",
        };
      } else {
        if (!currentTopic) {
          currentTopic = {
            topicName: `Page ${page.pageNumber} - Content`,
            pageNumbers: [page.pageNumber],
            content: "",
          };
        }

        currentTopic.content += line + " ";
      }
    });

    if (currentTopic) topics.push(currentTopic);
  });

  return topics.map((t) => ({
    ...t,
    content: t.content.trim(),
  }));
}

module.exports = { generateTopics };