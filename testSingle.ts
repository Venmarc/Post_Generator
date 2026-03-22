import { generatePost } from './postGenerator.js';

async function run() {
  const result = await generatePost({
    topic: 'The impact of small lies',
    platform: 'linkedin',
    style: 'professional',
    level: 'elite',
    hook: "Small lies don't just deceive others; they rewire *you*.",
    provider: 'gemini'
  });
  console.log(result);
}

run().catch(console.error);
