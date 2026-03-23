import "dotenv/config";
import OpenAI from 'openai';
import { GoogleGenAI } from '@google/genai';

// Initialize AI clients
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

export type AIModel = 
  | 'gemini-3-pro' 
  | 'gemini-3-flash' 
  | 'gemini-2.5-flash' 
  | 'gpt-4o' 
  | 'gpt-4o-mini';

/**
 * Maps a friendly model ID to the canonical SDK identifier.
 * Based on available models: gemini-2.5-pro, gemini-2.5-flash, gemini-2.0-flash
 */
function getModelIdentifier(model: AIModel): string {
  switch (model) {
    case 'gemini-3-pro': return 'models/gemini-2.5-pro'; 
    case 'gemini-3-flash': return 'models/gemini-2.5-flash';
    case 'gemini-2.5-flash': return 'models/gemini-2.5-flash';
    case 'gpt-4o': return 'gpt-4o';
    case 'gpt-4o-mini': return 'gpt-4o-mini';
    default: return 'models/gemini-2.0-flash';
  }
}

/**
 * Generates 5 distinct hooks for a given topic.
 */
export async function generateHooks(topic: string, model: AIModel = 'gemini-3-flash'): Promise<string[]> {
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
  const modelId = getModelIdentifier(model);

  if (modelId.startsWith('models/')) {
    try {
      const response = await genAI.models.generateContent({
        model: modelId,
        contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.8,
        }
      });
      content = response.text?.trim() || '[]';
    } catch (error) {
      console.error(`Gemini API FAILURE (${modelId}):`, error);
      // Minimal fallback to OpenAI if Gemini fails entirely
      content = await generateWithOpenAI('gpt-4o-mini', systemPrompt, userPrompt);
    }
  } else {
    content = await generateWithOpenAI(modelId as any, systemPrompt, userPrompt);
  }

  try {
    const cleaned = content.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleaned);
  } catch (e) {
    console.error("Failed to parse hooks JSON:", content);
    return [topic]; 
  }
}

export type Platform = 'x' | 'instagram' | 'linkedin' | 'tiktok';
export type Style = 
  | 'professional' 
  | 'bold' 
  | 'story' 
  | 'curiosity' 
  | 'sarcastic' 
  | 'motivational' 
  | 'minimal' 
  | 'conversational';
export type Level = 'raw' | 'balanced' | 'polished' | 'elite' | 'viral';

export interface PostInput {
  topic: string;
  platform: Platform;
  style: Style;
  level: Level;
  hook: string;
  model: AIModel; 
}

/**
 * Generates platform-optimized content based on topic, platform, style, and the selected hook.
 */
export async function generatePostContent(input: PostInput): Promise<string> {
  const { topic, platform, style, hook, level, model } = input;
  
  const systemPrompt = buildSystemPrompt(platform, style, hook, level);
  const userPrompt = `Topic: ${topic}`;
  const modelId = getModelIdentifier(model);

  if (modelId.startsWith('models/')) {
    try {
      const response = await genAI.models.generateContent({
        model: modelId,
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
      console.error(`Gemini API FAILURE (${modelId}):`, error);
      return generateWithOpenAI('gpt-4o-mini', systemPrompt, userPrompt);
    }
  } else {
    return generateWithOpenAI(modelId as any, systemPrompt, userPrompt);
  }
}

async function generateWithOpenAI(modelId: string, systemPrompt: string, userPrompt: string): Promise<string> {
  const response = await openai.chat.completions.create({
    model: modelId,
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

  // Apply Precision Levels
  switch (level) {
    case 'raw':
      prompt += `- PRECISION: Minimal editing. Quick first draft. Preserve original phrasing. Brainstorming mode.\n`;
      break;
    case 'balanced':
      prompt += `- PRECISION: Default. Remove obvious fluff. Strengthen hook moderately. Fix grammar and flow.\n`;
      break;
    case 'polished':
      prompt += `- PRECISION: Tight editing. Sharpen every sentence. Remove redundancy. Improve overall rhythm.\n`;
      break;
    case 'elite':
      prompt += `- PRECISION: ELITE / RAZOR. Maximal compression + impact. Contrarian angles amplified. Zero filler. reads like top 1% creator copy.\n`;
      break;
    case 'viral':
      prompt += `- PRECISION: VIRAL candidate. Optimized for shareability. curiosity gaps, bold claims, emotional triggers. Trade nuance for attention.\n`;
      break;
  }

  if (level === 'elite' || level === 'viral') {
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
    case 'tiktok':
      prompt += `Platform requirements for TikTok:\n` +
                `- Very short caps-heavy hooks. High energy. Engagement driven.\n`;
      break;
  }

  prompt += `\n`;

  // Apply Writing Styles
  switch (style) {
    case 'professional':
      prompt += `Style and Tone (Professional / Thought Leader):\n` +
                `- Clean, authoritative, LinkedIn-native, value-first.\n`;
      break;
    case 'bold':
      prompt += `Style and Tone (Bold / Contrarian):\n` +
                `- Challenges norms, strong opinions, provokes debate. aggressive.\n`;
      break;
    case 'story':
      prompt += `Style and Tone (Story / Narrative):\n` +
                `- Anecdote-driven, personal, emotional arc, longer-form feel. Show the pain.\n`;
      break;
    case 'curiosity':
      prompt += `Style and Tone (Curiosity / Teaser):\n` +
                `- Heavy hooks, open loops, question-led, short & punchy.\n`;
      break;
    case 'sarcastic':
      prompt += `Style and Tone (Sarcastic / Edgy):\n` +
                `- Dry wit, irony, slight roast energy.\n`;
      break;
    case 'motivational':
      prompt += `Style and Tone (Motivational / Hype):\n` +
                `- Pump-up, aspirational, gym-bro / entrepreneur energy.\n`;
      break;
    case 'minimal':
      prompt += `Style and Tone (Minimal / Aphorism):\n` +
                `- Ultra-short, quotable, wisdom-bomb style.\n`;
      break;
    case 'conversational':
      prompt += `Style and Tone (Conversational / Relatable):\n` +
                `- "You and me talking", casual, emojis ok, friendly.\n`;
      break;
  }

  prompt += `\nCRITICAL: Output ONLY the raw post text. No hashtags, no quotes.`;

  return prompt;
}
