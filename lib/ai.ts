import OpenAI from 'openai';
import { GoogleGenAI } from '@google/genai';

// Initialize AI clients
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

export type AIProvider = 'openai' | 'gemini';

/**
 * Generates 5 distinct hooks for a given topic.
 */
export async function generateHooks(topic: string, provider: AIProvider = 'gemini'): Promise<string[]> {
  const systemPrompt = `You are an elite copywriter. For the given topic, write exactly 5 distinct, scroll-stopping hooks.
Rules:
1. Each hook must use a different angle:
  - Contrarian (Challenge a common belief)
  - Curiosity gap (Make them need the answer)
  - Bold claim (State something definitive and jarring)
  - Pain point (Highlight an unrecognized friction)
  - Unexpected insight (A rare, non-obvious observation)
2. Maximum 12 words per hook. Keep them punchy.
3. NO CLICHÉS. Ensure high mental friction.
4. Output MUST be ONLY a raw JSON array of 5 strings. Just the array. 
Example: ["Hook 1", "Hook 2", "Hook 3", "Hook 4", "Hook 5"]`;

  const userPrompt = `Topic: ${topic}`;
  let content = "";

  if (provider === 'gemini') {
    try {
      const response = await genAI.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.8,
        }
      });
      content = response.text?.trim() || '[]';
    } catch (error) {
      console.warn("Gemini API failed for hooks, falling back to OpenAI...", error);
      content = await generateHooksWithOpenAI(systemPrompt, userPrompt);
    }
  } else {
    content = await generateHooksWithOpenAI(systemPrompt, userPrompt);
  }

  try {
    const cleaned = content.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleaned);
  } catch (e) {
    console.error("Failed to parse hooks JSON:", content);
    // Fallback if parsing fails - try a simple split if it's just lines
    return [topic]; 
  }
}

async function generateHooksWithOpenAI(systemPrompt: string, userPrompt: string): Promise<string> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    temperature: 0.8,
  });
  return (response.choices[0]?.message?.content || '[]').trim();
}

export type Platform = 'x' | 'instagram' | 'linkedin';
export type Style = 'bold' | 'story' | 'professional';
export type Level = 'pro' | 'elite';

export interface PostInput {
  topic: string;
  platform: Platform;
  style: Style;
  level: Level;
  hook: string;
  provider?: AIProvider; 
}

/**
 * Generates platform-optimized content based on topic, platform, style, and the selected hook.
 */
export async function generatePostContent(input: PostInput): Promise<string> {
  const { topic, platform, style, hook, level, provider = 'gemini' } = input;
  
  const systemPrompt = buildSystemPrompt(platform, style, hook, level);
  const userPrompt = `Topic: ${topic}`;

  if (provider === 'gemini') {
    try {
      const response = await genAI.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: [
          { role: 'user', parts: [{ text: userPrompt }] }
        ],
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.8,
        }
      });
      return response.text?.trim() || '';
    } catch (error) {
      console.warn("Gemini API failed for post, falling back to OpenAI...");
      return generatePostWithOpenAI(systemPrompt, userPrompt);
    }
  } else {
    return generatePostWithOpenAI(systemPrompt, userPrompt);
  }
}

async function generatePostWithOpenAI(systemPrompt: string, userPrompt: string): Promise<string> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    temperature: 0.8,
  });
  return (response.choices[0]?.message?.content || '').trim();
}

function buildSystemPrompt(platform: Platform, style: Style, hook: string, level: Level): string {
  let prompt = `You are a brutal, elite social media copywriter. You will write a single post about the user's provided topic.\n\n`;
  
  prompt += `CRITICAL UPGRADES (Non-negotiable):\n`;
  prompt += `- You MUST use this exact string as the first line of your post: "${hook}" (Do not change it!).\n`;

  if (level === 'elite') {
    prompt += `- MANDATORY: Include at least 2 concrete, highly specific, real-world examples in your post.\n`;
    prompt += `- MANDATORY: Replace any abstract statements with observable physical behavior.\n`;
    prompt += `- MANDATORY: End the post with a strong, definitive, non-question closing line.\n`;
  }

  prompt += `- BANNED PHRASES: "features, not solutions", "technical debt is a tax", "we all know that feeling", "in today's world".\n`;
  prompt += `- NO POETIC FLUFF: Do NOT romanticize. Be grounded and heavy.\n`;
  prompt += `- FORMATTING: Use generous whitespaces and line breaks.\n\n`;

  // Apply Platform Rules
  switch (platform) {
   case 'x':
      prompt += `Platform requirements for X (formerly Twitter):\n` +
                `- Maximum ~280 characters length.\n` +
                `- Extremely short bursts of text (1 short sentence per line).\n`;
      break;
    case 'instagram':
      prompt += `Platform requirements for Instagram:\n` +
                `- Use an engaging, emotional tone. Clear line breaks. Kill slow starts.\n`;
      break;
    case 'linkedin':
      prompt += `Platform requirements for LinkedIn:\n` +
                `- Add conflict and stakes. Professional but authoritative tone.\n`;
      break;
  }

  prompt += `\n`;

  // Apply Style Rules
  switch (style) {
    case 'bold':
      prompt += `Style and Tone (bold):\n` +
                `- Extremely punchy and aggressive. Cause mental friction.\n`;
      break;
    case 'story':
      prompt += `Style and Tone (story):\n` +
                `- Highly narrative-driven structure without fluff. Show the pain.\n`;
      break;
    case 'professional':
      prompt += `Style and Tone (professional):\n` +
                `- Organized and direct. Reframe the reader's perspective.\n`;
      break;
  }

  prompt += `\nCRITICAL: Output ONLY the raw post text. No hashtags, no quotes.`;

  return prompt;
}
