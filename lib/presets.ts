export interface Preset {
  id: string;
  platform: 'LinkedIn' | 'Instagram' | 'Twitter' | 'TikTok';
  label: string;
  topic: string;
}

export const platformPresets: Preset[] = [
  // LINKEDIN
  { id: 'li-1', platform: 'LinkedIn', label: 'Contrarian Take', topic: 'Why [Common Industry Advice] is actually holding you back in 2025.' },
  { id: 'li-2', platform: 'LinkedIn', label: 'The Hard Truth', topic: 'The most expensive mistake I made while building my first business.' },
  { id: 'li-3', platform: 'LinkedIn', label: 'Case Study', topic: 'How we helped [Client] achieve [Result] by focusing on [Simple Change].' },
  
  // INSTAGRAM
  { id: 'ig-1', platform: 'Instagram', label: 'Daily Motivation', topic: 'A gentle reminder that [Aspirational Goal] is a marathon, not a sprint.' },
  { id: 'ig-2', platform: 'Instagram', label: 'Artistic Hook', topic: 'Behind the scenes at Artenova: Transforming basic ideas into elite visual assets.' },
  
  // TWITTER / X
  { id: 'tw-1', platform: 'Twitter', label: 'Tech Hot Take', topic: 'Unpopular opinion: [Coding Tool/Framework] is actually overrated for most startups.' },
  { id: 'tw-2', platform: 'Twitter', label: 'Viral Thread', topic: '10 tools I use to 10x my creative output without spending a dime. 🧵' },
];

export function getPresets(platform: string): Preset[] {
  return platformPresets.filter(p => p.platform === platform);
}
