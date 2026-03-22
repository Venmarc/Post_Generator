import { NextRequest, NextResponse } from 'next/server';
import { renderCard, RenderOptions } from '../../../cardRenderer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { topic, ...options } = body;

    // Hardcoded default for testing if not provided
    const renderOptions: RenderOptions = {
      cards: options.cards || [
        { title: topic || 'New Post', body: 'Generating elite content...' }
      ],
      layout: options.layout || 'composite-hero',
      theme: options.theme || 'orbit',
      format: options.format || 'portrait',
      backgroundImage: options.backgroundImage
    };

    const result = await renderCard(renderOptions);

    if (Array.isArray(result)) {
      // Handle carousel (multiple images)
      const base64Images = result.map(buffer => buffer.toString('base64'));
      return NextResponse.json({ images: base64Images });
    } else {
      // Single image
      const base64Image = result.toString('base64');
      return NextResponse.json({ image: base64Image });
    }
  } catch (error: any) {
    console.error('Render error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
