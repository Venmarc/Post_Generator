import puppeteerCore from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer';

export async function getBrowser() {
  if (process.env.NODE_ENV === 'development') {
    return await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
  }

  // Vercel / Production
  return await puppeteerCore.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
    headless: true,
  });
}

export function isLiteMode(): boolean {
  return process.env.NODE_ENV === 'production' || !!process.env.VERCEL;
}
