import { generatePost, generateHooks } from './postGenerator.js';
import type { Platform, Style, PostInput } from './postGenerator.js';

interface TopicConfig {
  topic: string;
  platform: Platform;
  style: Style;
}

const inputs: TopicConfig[] = [
  { topic: "Why most developers fail at building products", platform: "x", style: "bold" },
  { topic: "The hidden cost of technical debt", platform: "x", style: "bold" },
  { topic: "AI agents are overhyped", platform: "linkedin", style: "professional" },
  { topic: "How remote work forces better communication", platform: "linkedin", style: "professional" },
  { topic: "Consistency vs motivation", platform: "instagram", style: "story" },
  { topic: "My biggest failure as An individual contributor", platform: "instagram", style: "story" }
];

async function runBatch() {
  console.log("Generating 6 posts with Hooks...\n");
  
  for (let i = 0; i < inputs.length; i++) {
    const config = inputs[i];
    if (!config) continue;

    console.log(`\n--- Post ${i + 1} | Platform: ${config.platform.toUpperCase()} | Style: ${config.style} | Topic: "${config.topic}" ---`);
    try {
      // 1. Generate Hooks
      const hooks = await generateHooks(config.topic, "gemini");
      const bestHook = hooks[0] || "The uncomfortable truth about this topic.";
      console.log(`[Hook Selected] ${bestHook}`);

      // 2. Generate Post
      const input: PostInput = {
        ...config,
        level: 'pro',
        hook: bestHook,
        provider: "gemini"
      };
      
      const result = await generatePost(input);
      console.log(`\n${result}`);
    } catch (e: any) {
      console.error(`Failed to generate: ${e.message}`);
    }
  }
}

runBatch().catch(console.error);
