// backend/utils/generateTopics.js

function generateTopics(pages) {
  const topics = [];

  pages.forEach((page) => {
    const lines = page.text.split("\n").map((l) => l.trim()).filter(Boolean);
    let currentTopic = null;

    lines.forEach((line) => {
      // Detect heading: all caps or ending with colon
      if (line === line.toUpperCase() || line.endsWith(":")) {
        // Save previous topic
        if (currentTopic) topics.push(currentTopic);

        currentTopic = {
          topicName: line.replace(/:$/, "").trim(),
          pageNumbers: [page.pageNumber],
          text: "",
        };
      } else {
        if (!currentTopic) {
          currentTopic = {
            topicName: `Page ${page.pageNumber} - Untitled`,
            pageNumbers: [page.pageNumber],
            text: "",
          };
        }

        currentTopic.text += line + " ";
      }
    });

    if (currentTopic) topics.push(currentTopic);
  });

  // Clean topic text
  topics.forEach((t) => {
    t.text = t.text.trim();
  });

  return topics;
}

module.exports = { generateTopics };