import { NextResponse } from 'next/server';
import { searchPexels, buildPexelsQuery } from '../../../lib/pexels';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const theme = searchParams.get('theme') || '';
  const mood = searchParams.get('mood') || '';
  const layout = searchParams.get('layout') || '';

  const query = buildPexelsQuery(theme, mood, layout);
  
  try {
    const photo = await searchPexels(query);
    return NextResponse.json({ success: true, photo });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
