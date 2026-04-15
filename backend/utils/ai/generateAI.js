const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: "https://api.deepseek.com",
});

async function callAI(prompt) {
  try {
    const res = await client.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content:
            "Return ONLY valid JSON. No markdown. No explanations.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.2,
    });

    const content = res.choices[0].message.content;

    return JSON.parse(content);
  } catch (err) {
    console.error("❌ DEEPSEEK ERROR:", err.message);

    return {
      fallback: true,
    };
  }
}

module.exports = { callAI };