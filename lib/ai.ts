import OpenAI from 'openai';
import { GoogleGenAI } from '@google/genai';
// @ts-ignore - Puter.js typing might not be available
import { init as initPuter } from '@heyputer/puter.js/src/init.cjs';

// Initialize AI clients
console.log('--- INITIALIZING ARTENOVA AI ENGINE ---');
const apiKey = process.env.GEMINI_API_KEY;
const openaiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.error('CRITICAL: GEMINI_API_KEY is missing!');
}
if (!openaiKey) {
  console.warn('WARNING: OPENAI_API_KEY is missing! Fallback system will be inactive.');
}

const openai = new OpenAI({
  apiKey: openaiKey || "stub_to_prevent_fatal",
});

const genAI = new GoogleGenAI({
  apiKey: apiKey || "stub_to_prevent_fatal",
});

const puterToken = process.env.PUTER_AUTH_TOKEN;
const puter = initPuter(puterToken);

console.log('AI Clients initialized (Gemini, OpenAI, Puter).');

export type AIModel = 
  | 'gemini-3-pro' 
  | 'gemini-3-flash' 
  | 'gemini-2.5-pro'
  | 'gemini-2.5-flash' 
  | 'gemini-1.5-pro'
  | 'gpt-4o' 
  | 'gpt-4o-mini'
  | 'gpt-3.5-turbo'
  | 'puter-gpt-4o'
  | 'puter-claude-3-5-sonnet'
  | 'puter-gemini-1.5-pro'
  | 'puter-llama-3-1-405b';

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
    case 'puter-gpt-4o': return 'gpt-4o';
    case 'puter-claude-3-5-sonnet': return 'claude-3-5-sonnet';
    case 'puter-gemini-1.5-pro': return 'gemini-1.5-pro';
    case 'puter-llama-3-1-405b': return 'llama-3.1-405b';
    default: 
      console.warn(`Unknown model ${model}, defaulting to models/gemini-1.5-flash`);
      return 'models/gemini-1.5-flash';
  }
}

/**
 * Utility to wrap any promise in a timeout.
 */
async function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  let timeoutId: any;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error(`[TIMEOUT] ${label} exceeded ${ms}ms limit.`));
    }, ms);
  });

  try {
    const result = await Promise.race([promise, timeoutPromise]);
    return result;
  } finally {
    clearTimeout(timeoutId);
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

  console.log('--- ARTENOVA HOOK ARCHITECT INITIATED ---');
  console.log('Target Model ID:', modelId);

  // Check if it's a Gemini model
  if (modelId.includes('gemini')) {
    if (!apiKey) {
      console.warn('Gemini API key missing, jumping to OpenAI fallback.');
      return generateWithOpenAI('gpt-4o-mini', systemPrompt, userPrompt).then(c => JSON.parse(c.replace(/```json/g, '').replace(/```/g, '').trim()));
    }

    try {
      console.log('Invoking Gemini (with 15s absolute timeout)...');
      const response = await withTimeout(
        genAI.models.generateContent({
          model: modelId,
          contents: userPrompt,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.8,
          }
        }),
        15000,
        `Gemini Hooks (${modelId})`
      );
      
      console.log('Response received from Gemini.');
      content = response.text || '[]';
    } catch (error: any) {
      console.error(`Gemini API FAILURE/TIMEOUT (${modelId}):`, error.message);
      console.log('CRITICAL: Attempting Puter.js High-Reliability Fallback...');
      try {
        content = await generateWithPuter('gpt-4o-mini', systemPrompt, userPrompt);
      } catch (fallbackError: any) {
        console.log('Puter fallback failed, attempting OpenAI direct...');
        try {
          content = await generateWithOpenAI('gpt-4o-mini', systemPrompt, userPrompt);
        } catch (openaiError: any) {
          throw new Error(`ARTENOVA ENGINE FAILURE: Primary Engine (Gemini) failed: [${error.message}] and Fallbacks (Puter + OpenAI) failed.`);
        }
      }
    }
  } else if (model.startsWith('puter-')) {
    console.log('Invoking Puter.js directly...');
    content = await generateWithPuter(modelId, systemPrompt, userPrompt);
  } else {
    console.log('Invoking OpenAI directly...');
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

  console.log('--- ARTENOVA POST ARCHITECT INITIATED ---');
  console.log('Target Model ID:', modelId);

  if (modelId.includes('gemini')) {
    if (!apiKey) {
      console.warn('Gemini API key missing, jumping to OpenAI fallback.');
      return generateWithOpenAI('gpt-4o-mini', systemPrompt, userPrompt);
    }

    try {
      console.log('Invoking Gemini (with 20s absolute timeout)...');
      const response = await withTimeout(
        genAI.models.generateContent({
          model: modelId,
          contents: userPrompt,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.8,
          }
        }),
        20000,
        `Gemini Post (${modelId})`
      );
      console.log('Response received from Gemini.');
      return response.text || '';
    } catch (error: any) {
      console.error(`Gemini API FAILURE/TIMEOUT (${modelId}):`, error.message);
      console.log('CRITICAL: Attempting Puter.js High-Reliability Fallback...');
      try {
        return await generateWithPuter('gpt-4o-mini', systemPrompt, userPrompt);
      } catch (fallbackError: any) {
        console.log('Puter fallback failed, attempting OpenAI direct...');
        try {
          return await generateWithOpenAI('gpt-4o-mini', systemPrompt, userPrompt);
        } catch (openaiError: any) {
          throw new Error(`ARTENOVA ENGINE FAILURE: Primary Engine (Gemini) failed: [${error.message}] and Fallbacks (Puter + OpenAI) failed.`);
        }
      }
    }
  } else if (model.startsWith('puter-')) {
    console.log('Invoking Puter.js directly...');
    return await generateWithPuter(modelId, systemPrompt, userPrompt);
  } else {
    console.log('Invoking OpenAI directly...');
    return generateWithOpenAI(modelId as any, systemPrompt, userPrompt);
  }
}

async function generateWithPuter(modelId: string, systemPrompt: string, userPrompt: string): Promise<string> {
  console.log(`Invoking Puter.js ${modelId} (with 20s absolute timeout)...`);
  try {
    const fullPrompt = `${systemPrompt}\n\nUSER INPUT: ${userPrompt}`;
    const response = await withTimeout(
      puter.ai.chat(fullPrompt, { model: modelId }),
      20000,
      `Puter (${modelId})`
    );
    
    // Handle string response
    if (typeof response === 'string') return response;
    
    // Handle complex response objects
    const content = response.message?.content;
    if (typeof content === 'string') return content;
    
    if (Array.isArray(content)) {
      return content
        .map((part: any) => (typeof part === 'string' ? part : (part.text || '')))
        .join('');
    }
    
    return '';
  } catch (error: any) {
    console.error(`Puter API FAILURE/TIMEOUT (${modelId}):`, error.message);
    throw error;
  }
}

async function generateWithOpenAI(modelId: string, systemPrompt: string, userPrompt: string): Promise<string> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('Fallback failed: OPENAI_API_KEY is not defined.');
  }

  try {
    console.log(`Invoking OpenAI ${modelId} (with 15s absolute timeout)...`);
    const response = await withTimeout(
      openai.chat.completions.create({
        model: modelId,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.8,
      }),
      15000,
      `OpenAI (${modelId})`
    );
    return (response.choices[0]?.message?.content || '').trim();
  } catch (error: any) {
    console.error(`OpenAI API FAILURE/TIMEOUT (${modelId}):`, error.message);
    throw error; // Re-throw to be caught by the route handler
  }
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
