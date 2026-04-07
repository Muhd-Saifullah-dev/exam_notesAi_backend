const { GEMINI_API_KEY } = require("./env.config");

const gemini_url =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent";

const generateGeminiResponse = async (prompt) => {
  try {
    const response = await fetch(`${gemini_url}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API Error Response:", data);
      throw new Error(data?.error?.message || "Gemini request failed");
    }

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error("No text returned from Gemini");
    }

    const cleanText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    try {
      return JSON.parse(cleanText);
    } catch {
      return cleanText; // agar plain text aaye toh bhi return kar do
    }
  } catch (error) {
    console.error("Gemini Fetch Error:", error.message);
    throw new Error(error.message || "Gemini API fetch failed");
  }
};

module.exports = { generateGeminiResponse };