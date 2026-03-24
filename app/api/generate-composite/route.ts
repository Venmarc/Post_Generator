import { NextRequest, NextResponse } from 'next/server';
import { getBrowser } from '@/lib/browser';
import { generateGammaHTML } from '@/components/GammaRenderer';
import { searchPexels, buildPexelsQuery } from '@/lib/pexels';

export const maxDuration = 60; // Set memory limit and timeout for serverless
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { copy, theme, mood, layout } = body;

    if (!copy) {
      return NextResponse.json({ success: false, error: "Copy is required" }, { status: 400 });
    }

    // 1. Fetch Background
    const query = buildPexelsQuery(theme || 'abstract', mood || 'cinematic', layout || 'composite');
    const photo = await searchPexels(query);
    
    // 2. Generate HTML
    const html = generateGammaHTML({
      copy,
      theme: theme || 'default',
      mood: mood || 'default',
      layout: layout || 'default',
      bgImageUrl: photo?.src?.portrait || photo?.src?.large2x || undefined,
      photographer: photo?.photographer
    });

    // 3. Take Screenshot using Playwright
    const browser = await getBrowser();
    const context = await browser.newContext({
      viewport: { width: 1080, height: 1920 },
      deviceScaleFactor: 2
    });
    const page = await context.newPage();
    
    await page.setContent(html, { waitUntil: 'networkidle' });
    
    const screenshotsMs = Date.now();
    const screenshotBuffer = await page.screenshot({ 
      type: 'png',
      fullPage: false
    });
    const screenshot = screenshotBuffer.toString('base64');
    const screenshotTook = Date.now() - screenshotsMs;

    await browser.close();

    return NextResponse.json({ 
      success: true, 
      image: screenshot, // base64
      pexels: photo ? {
        photographer: photo.photographer,
        url: photo.url
      } : null,
      milestones: [
        `Pexels: Found background for "${query}" (${photo ? 'Success' : 'Fallback'})`,
        `Gamma: HTML Template generated (${copy.length} chars)`,
        `Playwright: Browser viewport 1080x1920 initialized`,
        `Render: Screenshot captured in ${screenshotTook}ms`
      ]
    });

  } catch (error: any) {
    console.error('Composite generation error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
