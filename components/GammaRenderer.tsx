/**
 * Gamma-style composite HTML template generator.
 * Produces a self-contained HTML/CSS string for 1080x1920 viewport.
 */

interface GammaConfig {
  copy: string;
  theme: string;
  mood: string;
  layout: string;
  bgImageUrl?: string;
  photographer?: string;
}

export function generateGammaHTML(config: GammaConfig): string {
  const { copy, theme, mood, layout, bgImageUrl, photographer } = config;

  // Split copy into sections
  const lines = copy.split('\n').filter(l => l.trim().length > 0);
  const headline = lines[0] || "";
  const bodyLines = lines.slice(1).filter(l => !l.startsWith('#'));
  const hashtags = lines.filter(l => l.startsWith('#')).join(' ');

  // Glassmorphic styles
  const glassStyles = `
    background: rgba(10, 10, 18, 0.4);
    backdrop-filter: blur(24px) saturate(180%);
    -webkit-backdrop-filter: blur(24px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.8), 
                inset 0 1px 1px rgba(255, 255, 255, 0.05);
    border-radius: 40px;
    padding: 60px;
    color: #f8fafc;
  `;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet">
  <style>
    :root {
      --accent: #10b981;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 1080px;
      height: 1920px;
      overflow: hidden;
      font-family: 'Inter', sans-serif;
      background: #000814;
      display: flex;
      flex-direction: column;
      position: relative;
    }
    
    .background {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      z-index: 0;
      ${bgImageUrl ? `
        background-image: url('${bgImageUrl}');
        background-size: cover;
        background-position: center;
      ` : `
        background: radial-gradient(circle at 20% 30%, #0a1128 0%, #000814 100%);
      `}
    }

    .noise {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      z-index: 1;
      opacity: 0.15;
      pointer-events: none;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    }

    .overlay {
       position: absolute;
       top: 0; left: 0; width: 100%; height: 100%;
       z-index: 2;
       background: linear-gradient(0deg, rgba(0,8,20,0.8) 0%, rgba(0,8,20,0) 50%, rgba(0,8,20,0.4) 100%);
    }

    .container {
      position: relative;
      z-index: 10;
      width: 100%;
      height: 100%;
      padding: 100px 60px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .card {
      ${glassStyles}
      margin-bottom: 60px;
      position: relative;
    }

    .headline-card {
      transform: rotate(-2deg);
      z-index: 20;
    }

    .body-card {
      transform: rotate(1.5deg);
      margin-left: 20px;
      z-index: 15;
    }

    .headline {
      font-size: 84px;
      font-weight: 900;
      line-height: 1.1;
      letter-spacing: -3px;
      margin-bottom: 20px;
      background: linear-gradient(135deg, #fff 0%, #cbd5e1 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .body-text {
      font-size: 42px;
      font-weight: 400;
      line-height: 1.6;
      color: #e2e8f0;
      opacity: 0.9;
    }

    .hashtags {
      font-size: 32px;
      color: var(--accent);
      font-weight: 700;
      margin-top: 40px;
      letter-spacing: 2px;
    }

    .attribution {
      position: absolute;
      bottom: 40px;
      width: 100%;
      text-align: center;
      color: rgba(255,255,255,0.3);
      font-size: 18px;
      text-transform: uppercase;
      letter-spacing: 4px;
      z-index: 30;
    }
  </style>
</head>
<body>
  <div class="background"></div>
  <div class="noise"></div>
  <div class="overlay"></div>
  
  <div class="container">
    <div class="card headline-card">
      <h1 class="headline">${headline}</h1>
    </div>

    <div class="card body-card">
      <div class="body-text">
        ${bodyLines.map(line => `<p style="margin-bottom: 30px">${line}</p>`).join('')}
      </div>
      ${hashtags ? `<div class="hashtags">${hashtags}</div>` : ''}
    </div>
  </div>

  ${photographer ? `
    <div class="attribution">Background by ${photographer} on Pexels</div>
  ` : `
    <div class="attribution">Generated Artistic Composite</div>
  `}
</body>
</html>
  `;
}
