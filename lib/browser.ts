import { chromium as playwright } from 'playwright-core';
import chromium from '@sparticuz/chromium';

export async function getBrowser() {
  const isDev = process.env.NODE_ENV === 'development';

  if (isDev) {
    // Local development using the Playwright version installed on the machine
    return await playwright.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
  }

  // Vercel / Production using the specialized @sparticuz/chromium binary
  // We point to the remote pack to ensure it's always available regardless of Vercel bundling
  const remoteURL = 'https://github.com/Sparticuz/chromium/releases/download/v143.0.4/chromium-v143.0.4-pack.x64.tar';
  
  return await playwright.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(remoteURL),
    headless: true,
  });
}

export function isLiteMode(): boolean {
  return process.env.NODE_ENV === 'production' || !!process.env.VERCEL;
}
