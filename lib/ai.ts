import OpenAI from 'openai';
import { GoogleGenAI } from '@google/genai';

// Initialize AI clients
console.log('--- INITIALIZING AI CLIENTS ---');
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "stub_to_prevent_fatal",
});

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "stub_to_prevent_fatal",
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
 * Based on available models: gemini-2.5-pro, gemini-2.5-flash, gemini-2.0-flash
 */
function getModelIdentifier(model: AIModel): string {
  console.log(`Mapping model: ${model}`);
  switch (model) {
    // Futuristic mapping for elite branding
    case 'gemini-3-pro': return 'models/gemini-1.5-pro'; 
    case 'gemini-3-flash': return 'models/gemini-2.0-flash';
    case 'gemini-2.5-pro': return 'models/gemini-1.5-pro';
    case 'gemini-2.5-flash': return 'models/gemini-1.5-flash';
    case 'gemini-1.5-pro': return 'models/gemini-1.5-pro';
    case 'gpt-4o': return 'gpt-4o';
    case 'gpt-4o-mini': return 'gpt-4o-mini';
    case 'gpt-3.5-turbo': return 'gpt-3.5-turbo';
    default: 
      console.warn(`Unknown model ${model}, defaulting to gemini-1.5-flash`);
      return 'models/gemini-1.5-flash';
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
    prompt += `\n--- ELITE CONSTRAINTS ENGINE (V5.0) ---\n`;
    prompt += `- RULE 1 (Real-World Examples): Include exactly 2 concrete, highly specific, visceral real-world examples (e.g., "skimming page 14 of a 20-page proposal" or "claiming you're on the way while still in bed").\n`;
    prompt += `- RULE 2 (Behavioral Observations): Replace ALL abstract feelings (anxious, nervous, guilt) with observable physical behaviors (eyes darting, heart thumping, shoulders tightening, jaw clenching, flinching slightly). Describe the nervous system response.\n`;
    prompt += `- RULE 3 (Absolute Closing): End with a definitive, hard-hitting absolute statement. NO questions. No "What do you think?". Close like a hammer.\n`;
    prompt += `- RULE 4 (The Friction Anchor): Explicitly describe the "muscle memory" of failure or inaction. (e.g. "The way your finger hovers over the send button but pulls back," or "The silent agreement you make with yourself to not mention the elephant in the room").\n`;
    prompt += `- RULE 5 (Structural Rhythm): Use a 1-2-1 rhythm. One short punchy line. Two supporting visceral lines. One heavy "hammer" line. Repeat this structure.\n`;
    
    if (level === 'viral') {
      prompt += `- APEX VIRALITY: Amplify psychological friction. Focus on the slow decay of self-integrity and the internal "price of cowardice." Trade nuance for high-stakes emotional triggers.\n`;
      prompt += `- APEX FORMATTING: Generous whitespace. NO emojis. NO hashtags. Pure, heavy text only.\n`;
    }
    
    prompt += `BENCHMARK QUALITY: Your level 4/5 output must match the visceral, behavioral intensity of this reference: "Your eyes dart around the room. Your heart thumps. You are what you repeatedly accept from yourself. The high cost of comfort is your own self-respect."\n`;
    prompt += `--- END ENGINE ---\n\n`;
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
