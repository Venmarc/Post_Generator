import { PostInput } from './lib/ai';

// Mock buildSystemPrompt if needed, or just import it if it's exported.
// Since it's not exported, I'll copy the logic briefly to a new file to get the prompt.
import fs from 'fs';

const libAi = fs.readFileSync('/home/redmane/Documents/Post_Generator/lib/ai.ts', 'utf-8');
const buildSystemPromptMatch = libAi.match(/function buildSystemPrompt\([\s\S]*?\n\}/);
if (buildSystemPromptMatch) {
  const buildSystemPromptStr = buildSystemPromptMatch[0];
  // We need to evaluate this somehow or just copy-paste the logic here.
  // I'll just copy-paste the logic to a temporary script.
}
