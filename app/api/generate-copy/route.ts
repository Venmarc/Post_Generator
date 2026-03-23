import { NextRequest, NextResponse } from 'next/server';
import { generatePostContent, PostInput } from '@/lib/ai';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { topic, platform, style, level, hook, model } = body;

    if (!topic || !hook) {
      return NextResponse.json({ success: false, error: "Topic and Hook are required" }, { status: 400 });
    }

    const content = await generatePostContent({
      topic,
      platform: platform || 'linkedin',
      style: style || 'professional',
      level: level || 'balanced',
      hook,
      model: model || 'gemini-3-pro'
    });

    return NextResponse.json({ success: true, content });
  } catch (error: any) {
    console.error('Copy generation error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
