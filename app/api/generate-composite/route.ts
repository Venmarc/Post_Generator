import { NextRequest, NextResponse } from 'next/server';
import { getBrowser } from '@/lib/browser';
import { generateGammaHTML } from '@/components/GammaRenderer';
import { searchPexels, buildPexelsQuery } from '@/lib/pexels';

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

    // 3. Take Screenshot
    const browser = await getBrowser();
    const page = await browser.newPage();
    
    await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 2 });
    await page.setContent(html, { waitUntil: 'networkidle0' });
    
    // Add a small delay for any extra font/image settling if needed
    // await new Promise(r => setTimeout(r, 500));

    const screenshot = await page.screenshot({ 
      type: 'png',
      fullPage: false,
      encoding: 'base64'
    });

    await browser.close();

    return NextResponse.json({ 
      success: true, 
      image: screenshot, // base64
      pexels: photo ? {
        photographer: photo.photographer,
        url: photo.url
      } : null
    });

  } catch (error: any) {
    console.error('Composite generation error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
