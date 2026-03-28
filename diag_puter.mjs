// Using the exact pattern from lib/ai.ts
import { init as initPuter } from '@heyputer/puter.js/src/init.cjs';
import dotenv from 'dotenv';
dotenv.config();

console.log('--- STARTING DIAGNOSTIC ---');
try {
  const puterToken = process.env.PUTER_AUTH_TOKEN || "";
  console.log('Puter Token present:', !!puterToken);
  
  const puter = initPuter(puterToken);
  console.log('Puter initialized successfully.');

  // Test actual AI call
  // puter.ai.chat returns a promise
  const response = await puter.ai.chat("Say hello", { model: "claude-3-5-sonnet" });
  console.log('Response content:', typeof response === 'string' ? response : JSON.stringify(response.message?.content));
  
} catch (e) {
  console.error('DIAGNOSTIC FAILED:', e);
}
