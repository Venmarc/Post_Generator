import OpenAI from 'openai';
import { GoogleGenAI } from '@google/genai';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Define the input types
export type Platform = 'x' | 'instagram' | 'linkedin';
export type Style = 'bold' | 'story' | 'professional';
export type AIProvider = 'openai' | 'gemini';
export type Level = 'pro' | 'elite';

export interface PostInput {
  topic: string;
  platform: Platform;
  style: Style;
  level: Level;
  hook: string;
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
3. NO CLICHÉS. Avoid overused phrases entirely. Ensure high mental friction.
4. Output MUST be ONLY a raw JSON array of 5 strings. Do not use markdown blocks (\`\`\`json). Just the array. Example: ["Hook 1", "Hook 2"]`;

  const userPrompt = `Topic: ${topic}`;
  let content = "";

  if (provider === 'gemini') {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.8,
        }
      });
      content = response.text?.trim() || '[]';
    } catch (error) {
      console.warn("Gemini API failed for hooks, falling back to OpenAI...");
      content = await generateHooksWithOpenAI(systemPrompt, userPrompt);
    }
  } else {
    content = await generateHooksWithOpenAI(systemPrompt, userPrompt);
  }

  try {
    // Strip markdown formatting if any model included it anyway
    const cleaned = content.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleaned);
  } catch (e) {
    console.error("Failed to parse hooks JSON:", content);
    return [];
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

/**
 * Generates platform-optimized content based on topic, platform, style, and the selected hook.
 */
export async function generatePost(input: PostInput): Promise<string> {
  const { topic, platform, style, hook, level, provider = 'gemini' } = input;
  
  const systemPrompt = buildSystemPrompt(platform, style, hook, level);
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
          temperature: 0.8,
        }
      });
      return response.text?.trim() || '';
    } catch (error) {
      console.warn("Gemini API failed for post, falling back to OpenAI...");
      return generateWithOpenAI(systemPrompt, userPrompt);
    }
  } else {
    return generateWithOpenAI(systemPrompt, userPrompt);
  }
}

async function generateWithOpenAI(systemPrompt: string, userPrompt: string): Promise<string> {
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

/**
 * Constructs the system prompt dynamically based on platform, style, and the selected hook.
 */
function buildSystemPrompt(platform: Platform, style: Style, hook: string, level: Level): string {
  let prompt = `You are a brutal, elite social media copywriter. You will write a single post about the user's provided topic.\n\n`;
  
  prompt += `CRITICAL UPGRADES (Non-negotiable):\n`;
  prompt += `- You MUST use this exact string as the first line of your post: "${hook}" (Do not change it!).\n`;

  if (level === 'elite') {
    prompt += `- MANDATORY: Include at least 2 concrete, highly specific, real-world examples in your post.\n`;
    prompt += `- MANDATORY: Replace any abstract statements with observable physical behavior.\n`;
    prompt += `- MANDATORY: End the post with a strong, definitive, non-question closing line. DO NOT ask the reader a question under any circumstances.\n`;
  }

  prompt += `- BANNED PHRASES: "features, not solutions", "technical debt is a tax", "we all know that feeling", "in today's world". Avoid predictable, generic phrases and "corporate sludge" entirely.\n`;
  prompt += `- NO POETIC FLUFF OR VIBES: Do NOT romanticize. No "insights too fragile for daylight" or aesthetic nonsense. Be grounded and heavy.\n`;
  prompt += `- FOCUS ON PSYCHOLOGICAL TRUTH: Expose something uncomfortable. Call the reader out. Give them language for a feeling they are avoiding.\n`;
  prompt += `- Create tension: challenge a common belief with an uncomfortable, specific contrasting reality.\n`;
  prompt += `- NO FLUFF: Cut out all generic introductions, filler words, and cliché conclusions.\n`;
  prompt += `- FORMATTING: Use generous whitespaces and line breaks to make it extremely readable. Keep paragraphs very short.\n\n`;

  prompt += `--- EXAMPLES OF STRONG PATTERN BREAKS & SPECIFICITY ---\n`;
  prompt += `[Example 1]\n`;
  prompt += `Your product isn't failing because of bad code.\n`;
  prompt += `It's failing because nobody cares.\n`;
  prompt += `You built features.\n`;
  prompt += `Nobody asked for them.\n\n`;

  prompt += `[Example 2]\n`;
  prompt += `Technical debt isn't slowing you down.\n`;
  prompt += `Context switching is.\n`;
  prompt += `Every "quick fix" forces your brain to reload the system.\n`;
  prompt += `That's the real cost.\n\n`;

  prompt += `[Example 3 (Replacing Fluffy Poetry with Reality)]\n`;
  prompt += `Forget sleep. Your best ideas live after midnight.\n`;
  prompt += `Not because you're more creative.\n`;
  prompt += `Because nothing is distracting you anymore.\n`;
  prompt += `No notifications.\n`;
  prompt += `No expectations.\n`;
  prompt += `No noise.\n`;
  prompt += `Just you—and the thoughts you've been avoiding all day.\n`;
  prompt += `That's why your brain won't shut up.\n`;
  prompt += `It finally has your attention.\n`;
  prompt += `The only way out is through.\n`;
  prompt += `-------------------------------------------------------\n\n`;

  // Apply Platform Rules
  switch (platform) {
   case 'x':
      prompt += `Platform requirements for X (formerly Twitter):\n` +
                `- Maximum ~280 characters length.\n` +
                `- Extremely short bursts of text (1 short sentence per line).\n`;
      break;
    case 'instagram':
      prompt += `Platform requirements for Instagram:\n` +
                `- Use an engaging, emotional tone without being generic.\n` +
                `- Use clear line breaks (no dense blocks of text). Kill slow starts.\n`;
      if (level === 'pro') {
        prompt += `- End with a single, highly specific question that provokes a response.\n`;
      }
      break;
    case 'linkedin':
      prompt += `Platform requirements for LinkedIn:\n` +
                `- Add conflict and stakes. It must not feel safe.\n` +
                `- Maintain a professional but deeply opinionated and authoritative tone.\n` +
                `- Make it hit hard. Short sentences mixed with slightly longer analytical ones.\n`;
      break;
  }

  prompt += `\n`;

  // Apply Style Rules
  switch (style) {
    case 'bold':
      prompt += `Style and Tone (bold):\n` +
                `- Extremely punchy and aggressive. Cause mental friction.\n` +
                `- Short, staccato, impactful sentences.\n`;
      break;
    case 'story':
      prompt += `Style and Tone (story):\n` +
                `- Highly narrative-driven structure without fluff. Get straight to the friction.\n` +
                `- Keep the tone deeply relatable and raw. Show the pain.\n`;
      break;
    case 'professional':
      prompt += `Style and Tone (professional):\n` +
                `- Organized and completely direct. No jargon unless absolutely necessary.\n` +
                `- Highly informative, aiming to reframe the reader's entire perspective immediately.\n`;
      break;
  }

  prompt += `\nCRITICAL: Output ONLY the final, raw text of the post. Do NOT include phrases like "Here is your post:", introductory remarks, or quotation marks. Remove all hashtags unless essential.`;

  return prompt;
}
