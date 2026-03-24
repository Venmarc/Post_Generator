import OpenAI from 'openai';
import { GoogleGenAI } from '@google/genai';

// Initialize AI clients
console.log('--- INITIALIZING AI CLIENTS ---');
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('CRITICAL: GEMINI_API_KEY is missing from environment variables!');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "stub_to_prevent_fatal",
});

const genAI = new GoogleGenAI({
  apiKey: apiKey || "stub_to_prevent_fatal",
});
console.log('AI Clients initialized.');

export type AIModel = 
  | 'gemini-3-pro' 
  | 'gemini-3-flash' 
  | 'gemini-2.5-pro'
  | 'gemini-2.5-flash' 
  | 'gemini-1.5-pro'
  | 'gpt-4o' 
  | 'gpt-4o-mini'
  | 'gpt-3.5-turbo';

/**
 * Maps a friendly model ID to the canonical SDK identifier.
 */
function getModelIdentifier(model: AIModel): string {
  console.log(`Mapping model: ${model}`);
  switch (model) {
    case 'gemini-3-pro': return 'models/gemini-1.5-pro'; 
    case 'gemini-3-flash': return 'models/gemini-2.0-flash';
    case 'gemini-2.5-pro': return 'models/gemini-1.5-pro';
    case 'gemini-2.5-flash': return 'models/gemini-1.5-flash';
    case 'gemini-1.5-pro': return 'models/gemini-1.5-pro';
    case 'gpt-4o': return 'gpt-4o';
    case 'gpt-4o-mini': return 'gpt-4o-mini';
    case 'gpt-3.5-turbo': return 'gpt-3.5-turbo';
    default: 
      console.warn(`Unknown model ${model}, defaulting to models/gemini-1.5-flash`);
      return 'models/gemini-1.5-flash';
  }
}

/**
 * Generates 5 distinct hooks for a given topic.
 */
export async function generateHooks(topic: string, model: AIModel = 'gemini-3-flash'): Promise<string[]> {
  const systemPrompt = `You are an elite copywriter. For the given topic, write exactly 5 distinct, scroll-stopping hooks.
Rules:
1. Each hook must use a different angle: Contrarian, Curiosity gap, Bold claim, Pain point, Unexpected insight.
2. Maximum 12 words per hook. Keep them punchy.
3. NO CLICHÉS. Output MUST be ONLY a raw JSON array of 5 strings. Just the array.`;

  const userPrompt = `Topic: ${topic}`;
  let content = "";
  const modelId = getModelIdentifier(model);

  console.log('--- GENERATE HOOKS START ---');
  console.log('Target Model ID:', modelId);

  // Check if it's a Gemini model
  if (modelId.includes('gemini')) {
    try {
      console.log('Invoking @google/genai.models.generateContent (SIMPLIFIED STRINGS)...');
      const response = await genAI.models.generateContent({
        model: modelId,
        contents: userPrompt,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.8,
        }
      });
      
      console.log('Response received from Gemini.');
      content = response.text || '[]';
      console.log('Extracted content (first 100 chars):', content.substring(0, 100));
    } catch (error: any) {
      console.error(`Gemini API FAILURE (${modelId}):`, error);
      console.log('Attempting OpenAI fallback...');
      content = await generateWithOpenAI('gpt-4o-mini', systemPrompt, userPrompt);
    }
  } else {
    console.log('Invoking OpenAI...');
    content = await generateWithOpenAI(modelId as any, systemPrompt, userPrompt);
  }

  try {
    const cleaned = content.replace(/```json/g, '').replace(/```/g, '').trim();
    const result = JSON.parse(cleaned);
    console.log('SUCCESS: hooks parsed correctly.');
    return result;
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
 * Generates platform-optimized content.
 */
export async function generatePostContent(input: PostInput): Promise<string> {
  const { topic, platform, style, hook, level, model } = input;
  
  const systemPrompt = buildSystemPrompt(platform, style, hook, level);
  const userPrompt = `Topic: ${topic}`;
  const modelId = getModelIdentifier(model);

  console.log('--- GENERATE POST START ---');
  console.log('Target Model ID:', modelId);

  if (modelId.includes('gemini')) {
    try {
      console.log('Invoking @google/genai.models.generateContent (SIMPLIFIED STRINGS)...');
      const response = await genAI.models.generateContent({
        model: modelId,
        contents: userPrompt,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.8,
        }
      });
      console.log('Response received from Gemini.');
      return response.text || '';
    } catch (error: any) {
      console.error(`Gemini API FAILURE (${modelId}):`, error);
      console.log('Attempting OpenAI fallback...');
      return generateWithOpenAI('gpt-4o-mini', systemPrompt, userPrompt);
    }
  } else {
    console.log('Invoking OpenAI...');
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
  prompt += `CRITICAL: You MUST use this hook as the first line: "${hook}"\n`;
  prompt += `PRECISION LEVEL: ${level.toUpperCase()}\n`;
  prompt += `STYLE: ${style.toUpperCase()}\n`;
  prompt += `PLATFORM: ${platform.toUpperCase()}\n`;
  prompt += `\nRULES:\n- visceral real-world examples\n- behavioral observations\n- heavy whitespace\n- absolute hammer closing statements\n- NO CLICHÉS\n`;
  prompt += `\nOutput ONLY the raw post text. No hashtags, no quotes.`;
  return prompt;
}
