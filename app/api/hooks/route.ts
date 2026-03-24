import { NextResponse } from 'next/server';
import { generateHooks } from '@/lib/ai';

export async function POST(req: Request) {
  console.log('--- ARTENOVA HOOK ARCHITECT INITIATED ---');
  try {
    const body = await req.json().catch(() => ({}));
    const { topic, model } = body;
    console.log('Hooks request:', { topic, model });

    if (!topic) {
      console.warn('Hooks API: Missing topic');
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    console.log('Calling generateHooks with:', { topic, model: model || 'gemini-3-pro' });
    const hooks = await generateHooks(topic, model || 'gemini-3-pro');
    console.log('Hooks generated successfully:', hooks.length);

    return NextResponse.json({ success: true, hooks });
  } catch (error: any) {
    console.error('CRITICAL Hooks API Error:', error);
    // Ensure we ALWAYS return JSON
    return new Response(JSON.stringify({ 
      success: false,
      error: 'Failed to generate hooks', 
      details: error.message,
      stack: error.stack
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
