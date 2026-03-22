import "dotenv/config";
import { GoogleGenAI } from '@google/genai';

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

async function testGemini() {
  console.log("Testing Solo Gemini call...");
  try {
    const response = await genAI.models.generateContent({
      model: 'models/gemini-1.5-flash',
      contents: [{ role: 'user', parts: [{ text: "Write 5 hooks for AI tools" }] }],
      config: {
        systemInstruction: "You are a copywriter. Output MUST be ONLY a raw JSON array of 5 strings.",
        temperature: 0.8,
      }
    });
    console.log("Gemini Response Text:", response.text);
  } catch (error: any) {
    console.error("GEMINI SOLO FAILURE:");
    console.error(error);
  }
}

testGemini();
