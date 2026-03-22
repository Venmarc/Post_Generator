import { NextResponse } from 'next/server';
import { generateHooks } from '../../../lib/ai';

export async function POST(req: Request) {
  try {
    const { topic, provider } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    const hooks = await generateHooks(topic, provider || 'gemini-3-pro');

    return NextResponse.json({ success: true, hooks });
  } catch (error: any) {
    console.error('Hooks API Error:', error);
    return NextResponse.json({ 
      error: 'Failed to generate hooks', 
      details: error.message 
    }, { status: 500 });
  }
}
