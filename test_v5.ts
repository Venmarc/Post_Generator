import { generatePostContent } from './lib/ai';
import * as dotenv from 'dotenv';
dotenv.config();

async function verify() {
  console.log("--- STARTING V5.0 VIRAL VERIFICATION ---");
  const input = {
    topic: 'The impact of small lies',
    platform: 'linkedin' as const,
    style: 'bold' as const,
    level: 'viral' as const,
    hook: "Small lies don't just deceive others; they rewire *you*.",
    model: 'gemini-3-pro' as const
  };

  try {
    const result = await generatePostContent(input);
    console.log("\n--- GENERATED POST ---");
    console.log(result);
    console.log("\n--- VERIFICATION COMPLETE ---");
  } catch (error) {
    console.error("Verification failed:", error);
  }
}

verify();
