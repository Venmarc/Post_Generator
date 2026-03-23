import { NextRequest, NextResponse } from 'next/server';
import { renderCard, RenderOptions } from '@/legacy-v1/cardRenderer';
import { generatePostContent } from '@/lib/ai';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { topic, platform, style, level, hook, model, visualMood, pexelsKey, ...options } = body;

    let aiText = '';
    if (!options.cards || options.cards.length === 0) {
      aiText = await generatePostContent({
        topic,
        platform: platform || 'linkedin',
        style: style || 'professional',
        level: level || 'balanced',
        hook: hook || topic,
        model: model || 'gemini-3-pro'
      });
    }

    // 2. Prepare Render Options
    const renderOptions: RenderOptions = {
      cards: options.cards || [
        { title: hook || topic || 'New Post', body: aiText }
      ],
      layout: options.layout || 'composite-hero',
      theme: options.theme || 'orbit',
      format: options.format || 'portrait',
      visualMood: visualMood || 'clean-void',
      pexelsKey: pexelsKey || process.env.PEXELS_API_KEY || "",
      backgroundImage: options.backgroundImage
    };

    const result = await renderCard(renderOptions);

    if (Array.isArray(result)) {
      const base64Images = result.map(buffer => buffer.toString('base64'));
      return NextResponse.json({ success: true, base64Images });
    } else {
      const base64Image = result.toString('base64');
      return NextResponse.json({ success: true, base64Data: base64Image });
    }
  } catch (error: any) {
    console.error('Render error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
