import { generatePost } from './postGenerator.js';

async function run() {
  console.log("Generating post with Gemini...");
  
  const result = await generatePost({
    topic: "Why most developers fail at building products",
    platform: "x",
    style: "bold"
  });

  console.log("\n--- FINAL POST ---");
  console.log(result);
  console.log("------------------\n");
}

run().catch(console.error);
