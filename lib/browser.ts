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
  return await playwright.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
    headless: true,
  });
}

export function isLiteMode(): boolean {
  return process.env.NODE_ENV === 'production' || !!process.env.VERCEL;
}
