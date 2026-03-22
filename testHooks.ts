import { generateHooks, generatePost } from './postGenerator.js';
import type { Platform, Style } from './postGenerator.js';

async function run() {
  const topic = "Why most developers fail at building products";
  const platform: Platform = "x";
  const style: Style = "bold";

  console.log(`\n=================================================`);
  console.log(`📝 TOPIC: "${topic}"`);
  console.log(`=================================================\n`);

  console.log("🔥 Generating 5 Hooks...\n");
  const hooks = await generateHooks(topic, "gemini");

  hooks.forEach((hook, index) => {
    console.log(`[Hook ${index + 1}] ${hook}`);
  });

  const selectedHook = hooks[0] || "Fallback hook"; // Picking the first one for the demo
  console.log(`\n\n🎯 Selected best hook: "${selectedHook}"\n`);
  
  console.log("🚀 Generating Final Post...\n");
  const result = await generatePost({
    topic,
    platform,
    style,
    level: 'elite',
    hook: selectedHook,
    provider: "gemini"
  });

  console.log(result);
  console.log(`\n=================================================\n`);
}

run().catch(console.error);
