export interface ThemeConfig {
  bg: string;
  cardBg: string;
  accent: string;
  text: string;
  shadow: string;
  radius: string;
}

export const themes: Record<string, ThemeConfig> = {
  gleam: {
    bg: 'linear-gradient(135deg, #ffffff, #f0f4ff)',
    cardBg: 'rgba(255, 255, 255, 0.9)',
    accent: '#6366f1',
    text: '#111827',
    shadow: '0 20px 40px rgba(0,0,0,0.05)',
    radius: '24px'
  },
  orbit: {
    bg: 'radial-gradient(circle at top right, #1a1a2e, #0a0a0a)',
    cardBg: 'rgba(30, 30, 46, 0.85)',
    accent: '#a5b4fc',
    text: '#f8fafc',
    shadow: '0 20px 40px rgba(0,0,0,0.4)',
    radius: '24px'
  },
  vortex: {
    bg: 'linear-gradient(to bottom, #000000, #111111)',
    cardBg: '#1a1a1a',
    accent: '#ff4444',
    text: '#ffffff',
    shadow: '0 20px 50px rgba(255,68,68,0.1)',
    radius: '12px'
  },
  dialogue: {
    bg: '#f9fafb',
    cardBg: '#ffffff',
    accent: '#10b981',
    text: '#1f2937',
    shadow: '0 10px 25px rgba(0,0,0,0.03)',
    radius: '8px'
  },
  leimoon: {
    bg: 'linear-gradient(to right, #fdfbfb, #ebedee)',
    cardBg: '#ffffff',
    accent: '#f43f5e',
    text: '#374151',
    shadow: '0 15px 35px rgba(244,63,94,0.08)',
    radius: '32px'
  },
  pearl: {
    bg: '#e2e8f0',
    cardBg: 'rgba(255, 255, 255, 0.6)',
    accent: '#0ea5e9',
    text: '#0f172a',
    shadow: '0 30px 60px rgba(0,0,0,0.1)',
    radius: '20px'
  }
};
