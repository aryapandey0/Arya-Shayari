import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export const generateShayari = async (mood) => {
  try {

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
         content: `
You are a professional Hindi poet.

Write exactly 2 lines of Hindi shayari about ${mood}.

Rules:
- Only 2 lines
- Emotional poetic tone
- Do not exceed 2 lines
`     }
      ],
      model: "llama-3.3-70b-versatile"
    });

    return completion.choices[0].message.content;

  } catch (error) {
    console.error("AI Error:", error);
    throw error;
  }
};