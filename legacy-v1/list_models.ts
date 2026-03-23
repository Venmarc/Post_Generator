import "dotenv/config";
import { GoogleGenAI } from '@google/genai';

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

async function listModels() {
  console.log("Listing Gemini Models...");
  try {
    const models = await genAI.models.list();
    console.log("Found models:");
    let count = 0;
    for await (const m of models) {
      if (count++ >= 10) break;
      console.log(`- NAME: "${m.name}" | ACTIONS: ${m.supportedActions?.join(', ')}`);
    }
  } catch (error: any) {
    console.error("FAILED TO LIST MODELS:");
    console.error(error);
  }
}

listModels();
