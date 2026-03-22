import OpenAI from 'openai';
import { GoogleGenAI } from '@google/genai';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Define the input types
export type Platform = 'x' | 'instagram' | 'linkedin';
export type Style = 'bold' | 'story' | 'professional';
export type AIProvider = 'openai' | 'gemini';

export interface PostInput {
  topic: string;
  platform: Platform;
  style: Style;
  provider?: AIProvider; // Optional, defaults to gemini
}

// Ensure you have OPENAI_API_KEY and GEMINI_API_KEY in your environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

/**
 * Generates platform-optimized content based on topic, platform, and style.
 * Uses Gemini by default, falls back to OpenAI if it fails.
 */
export async function generatePost(input: PostInput): Promise<string> {
  const { topic, platform, style, provider = 'gemini' } = input;
  
  const systemPrompt = buildSystemPrompt(platform, style);
  const userPrompt = `Topic: ${topic}`;

  if (provider === 'gemini') {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          { role: 'user', parts: [{ text: userPrompt }] }
        ],
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
        }
      });
      return response.text?.trim() || '';
    } catch (error) {
      console.warn("Gemini API failed, falling back to OpenAI...");
      return generateWithOpenAI(systemPrompt, userPrompt);
    }
  } else {
    return generateWithOpenAI(systemPrompt, userPrompt);
  }
}

/**
 * Helper to call OpenAI API
 */
async function generateWithOpenAI(systemPrompt: string, userPrompt: string): Promise<string> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    temperature: 0.7,
  });

  return (response.choices[0]?.message?.content || '').trim();
}

/**
 * Constructs the system prompt dynamically based on platform and style.
 */
function buildSystemPrompt(platform: Platform, style: Style): string {
  let prompt = `You are an expert social media copywriter. You will write a single post about the user's provided topic.\n\n`;

  // Apply Platform Rules
  switch (platform) {
    case 'x':
      prompt += `Platform requirements for X (formerly Twitter):\n` +
                `- Keep the total length around 280 characters maximum.\n` +
                `- Start with a strong hook in the first line.\n` +
                `- Keep lines very short (1-2 sentences maximum per line).\n`;
      break;
    case 'instagram':
      prompt += `Platform requirements for Instagram:\n` +
                `- Use an engaging, emotional tone.\n` +
                `- Use line breaks to maximize readability.\n` +
                `- Add an optional light Call To Action (CTA) at the end.\n`;
      break;
    case 'linkedin':
      prompt += `Platform requirements for LinkedIn:\n` +
                `- Use a clear, logical structure.\n` +
                `- Ensure the content is insight-driven.\n` +
                `- Maintain a professional and authoritative tone.\n`;
      break;
  }

  prompt += `\n`;

  // Apply Style Rules
  switch (style) {
    case 'bold':
      prompt += `Style and Tone (bold):\n` +
                `- Make it punchy.\n` +
                `- Use a slightly contrarian or highly confident tone.\n` +
                `- Use short, impactful sentences.\n`;
      break;
    case 'story':
      prompt += `Style and Tone (story):\n` +
                `- Make it narrative-driven.\n` +
                `- Keep it relatable.\n` +
                `- Inject a slightly emotional resonance.\n`;
      break;
    case 'professional':
      prompt += `Style and Tone (professional):\n` +
                `- Keep it clean and direct.\n` +
                `- Be highly informative.\n` +
                `- Project a strong authority tone.\n`;
      break;
  }

  prompt += `\nOutput only the final text of the post. Do not include any explanations, introductory remarks, emojis unless appropriate, or quotation marks around the post. Return ONLY the final text.`;

  return prompt;
}
