import { generateHooks } from '../lib/ai';
import * as dotenv from 'dotenv';
dotenv.config();

async function test() {
  console.log("Testing Hook Generation...");
  try {
    const hooks = await generateHooks("The future of AI in 2025");
    console.log("Hooks generated successfully:", hooks);
  } catch (error: any) {
    console.error("TEST SCRIPT CAUGHT ERROR:");
    console.error(error);
    if (error.response) console.error("Response data:", error.response.data);
  }
}

test();
