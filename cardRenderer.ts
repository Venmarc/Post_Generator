import { getBrowser } from './lib/browser';
import { themes } from './themes';

export interface CardObject {
  title: string;
  body: string;
  imageUrl?: string;
}

export interface RenderOptions {
  cards: CardObject[];
  layout: 'single' | 'carousel' | 'composite-vertical' | 'composite-masonry' | 'composite-hero';
  theme: 'gleam' | 'orbit' | 'vortex' | 'dialogue' | 'leimoon' | 'pearl' | 'custom';
  format: 'square' | 'portrait' | 'tall';
  keywords?: string[];
  backgroundImage?: string;
}

export async function renderCard(options: RenderOptions): Promise<Buffer | Buffer[]> {
  const { cards, layout, theme, format, backgroundImage } = options;
  const activeTheme = themes[theme] || themes['gleam'];
  
  const width = 1080;
  // Dynamic height for tall composite pages
  let height = format === 'portrait' ? 1350 : 1080;
  if (format === 'tall' || layout.startsWith('composite')) {
    height = Math.max(1350, 400 + (cards.length * 400));
  }

  const browser = await getBrowser();

  try {
    const page = await browser.newPage();
    await page.setViewport({ width, height });

    if (layout === 'carousel') {
      const buffers: Buffer[] = [];
      for (const card of cards) {
        const html = generateCompositeHTML([card], activeTheme, layout, height, backgroundImage);
        await page.setContent(html, { waitUntil: 'domcontentloaded' });
        await page.evaluateHandle('document.fonts.ready');
        const buffer = await page.screenshot({ type: 'png' });
        buffers.push(Buffer.from(buffer));
      }
      return buffers;
    } else {
      // composite layouts or single
      const html = generateCompositeHTML(cards, activeTheme, layout, height, backgroundImage);
      await page.setContent(html, { waitUntil: 'domcontentloaded' });
      await page.evaluateHandle('document.fonts.ready');
      const buffer = await page.screenshot({ type: 'png' });
      return Buffer.from(buffer);
    }
  } finally {
    await browser.close();
  }
}

function generateCompositeHTML(
  cards: CardObject[], 
  theme: any, 
  layout: string, 
  totalHeight: number,
  bgImage?: string
): string {
  
  // Custom Background string
  const pageBg = bgImage 
    ? `background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url('${bgImage}') no-repeat center center; background-size: cover;` 
    : `background: ${theme.bg};`;

  let cardsHtml = '';

  if (layout === 'composite-vertical') {
    cardsHtml = `
      <div class="composite-vertical-container">
        ${cards.map((c, i) => `
          <div class="card-block">
            ${c.imageUrl ? `<img src="${c.imageUrl}" class="card-img" />` : ''}
            <div class="card-text">
              <div class="card-title"><span class="card-number">${i+1}.</span> ${c.title}</div>
              <div class="card-body">${c.body}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  } else if (layout === 'composite-hero') {
    // Generate predefined floating/tilted card positions for up to 5 cards (Gamma style artistic composite)
    const positions = [
      'top: 15%; left: 10%; transform: rotate(-2deg); width: 80%; z-index: 10;',
      'top: 45%; left: 5%; transform: translateX(5%) rotate(1deg); width: 60%; z-index: 9;',
      'top: 55%; right: 5%; transform: translateX(-5%) rotate(-1deg); width: 60%; z-index: 8;',
      'top: 75%; left: 10%; transform: rotate(2deg); width: 80%; z-index: 7;',
      'top: 85%; right: 10%; transform: rotate(-1deg); width: 70%; z-index: 6;'
    ];
    
    cardsHtml = `
      <div class="composite-hero-container">
        ${cards.map((c, i) => {
          const posStyle = positions[i % positions.length];
          const isMainTitle = i === 0;
          return `
            <div class="card-hero-block" style="${posStyle}">
              ${c.imageUrl ? `<img src="${c.imageUrl}" class="card-img" />` : ''}
              <div class="card-text">
                <div class="card-title" style="font-size: ${isMainTitle ? '64px' : '48px'}">
                  ${!isMainTitle ? `<span class="card-number">${i}.</span>` : ''} ${c.title}
                </div>
                ${c.body ? `<div class="card-body" style="font-size: ${isMainTitle ? '42px' : '32px'}">${c.body}</div>` : ''}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">
      <style>
        :root {
          --accent: ${theme.accent};
          --text: ${theme.text};
          --card-bg: ${theme.cardBg};
          --shadow: ${theme.shadow};
          --radius: ${theme.radius};
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          width: 1080px;
          min-height: ${totalHeight}px;
          ${pageBg}
          font-family: 'Inter', sans-serif;
          color: var(--text);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 100px 80px;
          position: relative;
          overflow: hidden;
        }

        .composite-vertical-container {
          display: flex;
          flex-direction: column;
          gap: 60px;
          width: 100%;
          position: relative;
          z-index: 5;
        }

        .composite-hero-container {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }

        .card-block {
          background: var(--card-bg);
          backdrop-filter: blur(20px);
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          padding: 60px;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .card-hero-block {
          position: absolute;
          background: var(--card-bg);
          backdrop-filter: blur(25px);
          border-radius: var(--radius);
          box-shadow: 0 30px 60px rgba(0,0,0,0.3), inset 0 2px 2px rgba(255,255,255,0.1);
          padding: 50px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          border: 1px solid rgba(255,255,255,0.05);
        }

        .card-img {
          width: 100%;
          height: 300px;
          object-fit: cover;
          border-radius: calc(var(--radius) / 2);
        }

        .card-title {
          font-size: 52px;
          font-weight: 800;
          line-height: 1.2;
          color: var(--text);
        }

        .card-number {
          color: var(--accent);
          margin-right: 15px;
        }

        .card-body {
          font-size: 38px;
          font-weight: 400;
          line-height: 1.5;
          opacity: 0.9;
          white-space: pre-wrap;
        }
      </style>
    </head>
    <body>
      ${cardsHtml}
    </body>
    </html>
  `;
}
