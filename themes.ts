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
  },
  'void-cyber': {
    bg: '#050505',
    cardBg: 'rgba(15, 15, 20, 0.9)',
    accent: '#10b981',
    text: '#ffffff',
    shadow: '0 0 40px rgba(16, 185, 129, 0.1)',
    radius: '8px'
  },
  'cosmic-nebula': {
    bg: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
    cardBg: 'rgba(255, 255, 255, 0.05)',
    accent: '#f472b6',
    text: '#ffffff',
    shadow: '0 20px 50px rgba(244, 114, 182, 0.2)',
    radius: '30px'
  },
  'pastel-dream': {
    bg: 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)',
    cardBg: 'rgba(255, 255, 255, 0.4)',
    accent: '#fbcfe8',
    text: '#4a5568',
    shadow: '0 10px 30px rgba(0,0,0,0.05)',
    radius: '40px'
  },
  'botanical-modern': {
    bg: '#f0f4f0',
    cardBg: '#ffffff',
    accent: '#059669',
    text: '#064e3b',
    shadow: '0 10px 30px rgba(5, 150, 105, 0.05)',
    radius: '16px'
  },
  'neon-pulse': {
    bg: '#000000',
    cardBg: 'rgba(10, 10, 10, 0.95)',
    accent: '#00ffcc',
    text: '#ffffff',
    shadow: '0 0 30px rgba(0, 255, 204, 0.4)',
    radius: '4px'
  },
  'minimal-mono': {
    bg: '#ffffff',
    cardBg: '#f8fafc',
    accent: '#000000',
    text: '#000000',
    shadow: 'none',
    radius: '0px'
  },
  'warm-sunset': {
    bg: 'linear-gradient(to bottom, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)',
    cardBg: 'rgba(255, 255, 255, 0.8)',
    accent: '#f87171',
    text: '#7c2d12',
    shadow: '0 20px 40px rgba(248, 113, 113, 0.2)',
    radius: '24px'
  },
  'cold-steel': {
    bg: '#2c3e50',
    cardBg: 'rgba(255, 255, 255, 0.1)',
    accent: '#94a3b8',
    text: '#f1f5f9',
    shadow: '0 20px 50px rgba(0,0,0,0.5)',
    radius: '2px'
  },
  'grainy-film': {
    bg: '#1a1a1a',
    cardBg: '#262626',
    accent: '#d1d5db',
    text: '#e5e7eb',
    shadow: '0 2px 4px rgba(0,0,0,0.5)',
    radius: '12px'
  }
};
