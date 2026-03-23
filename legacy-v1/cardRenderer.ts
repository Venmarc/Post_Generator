import { getBrowser } from '../lib/browser';
import { themes, visualMoods } from './themes';

export interface CardObject {
  title: string;
  body: string;
  imageUrl?: string;
}

export interface RenderOptions {
  cards: CardObject[];
  layout: string;
  theme: string;
  visualMood: string;
  format: 'square' | 'portrait' | 'tall' | 'wide';
  keywords?: string[];
  backgroundImage?: string;
  pexelsKey?: string;
}

export async function renderCard(options: RenderOptions): Promise<Buffer | Buffer[]> {
  const { cards, layout, theme, visualMood, format, backgroundImage, pexelsKey } = options;
  const activeTheme = themes[theme] || themes['gleam'];
  const activeMood = visualMoods[visualMood] || visualMoods['clean-void'];
  
  const width = format === 'wide' ? 1920 : 1080;
  let height = format === 'portrait' ? 1350 : format === 'wide' ? 1080 : 1080;
  
  if (format === 'tall' || layout.startsWith('composite') || layout.includes('flow')) {
    height = Math.max(1350, 400 + (cards.length * 400));
  }

  // Pexels fallback logic
  let finalBg = backgroundImage;
  if (!finalBg && pexelsKey) {
    try {
      const query = `${theme} ${visualMood} abstract background`;
      const pexelRes = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1`, {
        headers: { Authorization: pexelsKey }
      });
      const pexelData = await pexelRes.json();
      if (pexelData.photos?.[0]?.src?.large2x) {
        finalBg = pexelData.photos[0].src.large2x;
      }
    } catch (e) {
      console.error("Pexels fetch failed:", e);
    }
  }

  const browser = await getBrowser();

  try {
    const page = await browser.newPage();
    await page.setViewport({ width, height });

    const htmlGenerator = (cardsData: CardObject[]) => 
      generateCompositeHTML(cardsData, activeTheme, activeMood, layout, height, finalBg);

    if (layout === 'carousel') {
      const buffers: Buffer[] = [];
      for (const card of cards) {
        const html = htmlGenerator([card]);
        await page.setContent(html, { waitUntil: 'domcontentloaded' });
        await page.evaluateHandle('document.fonts.ready');
        const buffer = await page.screenshot({ type: 'png' });
        buffers.push(Buffer.from(buffer));
      }
      return buffers;
    } else {
      const html = htmlGenerator(cards);
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
  mood: any,
  layout: string, 
  totalHeight: number,
  bgImage?: string
): string {
  
  const pageBg = bgImage 
    ? `background: linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.9)), url('${bgImage}') no-repeat center center; background-size: cover;` 
    : mood.bodyStyle;

  let cardsHtml = '';

  if (layout === 'composite-vertical' || layout === 'stacked-vertical') {
    cardsHtml = `
      <div class="composite-vertical-container">
        ${cards.map((c, i) => `
          <div class="card-block" style="${mood.cardStyle}">
            ${c.imageUrl ? `<img src="${c.imageUrl}" class="card-img" />` : ''}
            <div class="card-text">
              <div class="card-title"><span class="card-number">${i+1}.</span> ${c.title}</div>
              <div class="card-body">${c.body}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  } else if (layout === 'composite-hero' || layout === 'floating-collage') {
    const positions = [
      'top: 15%; left: 10%; transform: rotate(-2deg); width: 80%; z-index: 10;',
      'top: 40%; left: 5%; transform: rotate(1deg); width: 60%; z-index: 9;',
      'top: 50%; right: 5%; transform: rotate(-1deg); width: 60%; z-index: 8;',
      'top: 70%; left: 15%; transform: rotate(2deg); width: 70%; z-index: 7;',
      'top: 80%; right: 10%; transform: rotate(-2deg); width: 65%; z-index: 6;'
    ];
    
    cardsHtml = `
      <div class="composite-hero-container">
        ${cards.map((c, i) => {
          const posStyle = positions[i % positions.length];
          const isMainTitle = i === 0;
          return `
            <div class="card-hero-block" style="${posStyle} ${mood.cardStyle}">
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
  } else if (layout === 'diagonal-flow') {
    cardsHtml = `
      <div class="diagonal-container">
        ${cards.map((c, i) => `
          <div class="card-block diagonal-card" style="margin-left: ${i * 60}px; transform: rotate(${i % 2 === 0 ? '-1deg' : '1deg'}); ${mood.cardStyle}">
            <div class="card-title"><span class="card-number">${i+1}.</span> ${c.title}</div>
            <div class="card-body">${c.body}</div>
          </div>
        `).join('')}
      </div>
    `;
  } else if (layout === 'grid-breaks') {
    cardsHtml = `
      <div class="grid-container">
        ${cards.map((c, i) => `
          <div class="card-block grid-card" style="margin-top: ${i % 2 === 0 ? '0' : '40px'}; ${mood.cardStyle}">
            <div class="card-title">${c.title}</div>
            <div class="card-body">${c.body}</div>
          </div>
        `).join('')}
      </div>
    `;
  } else if (layout === 'quote-focus') {
    const mainCard = cards[0];
    const orbits = cards.slice(1);
    cardsHtml = `
      <div class="quote-focus-container">
        <div class="card-block quote-main" style="${mood.cardStyle}">
          <div class="card-title" style="font-size: 80px;">"${mainCard?.title}"</div>
          <div class="card-body" style="font-size: 50px;">${mainCard?.body}</div>
        </div>
        <div class="orbit-container">
          ${orbits.map((c, i) => `
            <div class="card-block orbit-card" style="transform: scale(0.6); ${mood.cardStyle}">
               <div class="card-title" style="font-size: 24px;">${c.title}</div>
            </div>
          `).join('')}
        </div>
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

        /* New Layouts */
        .diagonal-container {
          display: flex;
          flex-direction: column;
          gap: 40px;
          width: 100%;
          padding-left: 50px;
        }
        .diagonal-card {
          width: 85%;
          box-shadow: 20px 20px 60px rgba(0,0,0,0.2);
        }

        .grid-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          width: 100%;
        }
        .grid-card {
           padding: 40px;
        }

        .quote-focus-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          gap: 100px;
        }
        .quote-main {
           width: 100%;
           text-align: center;
           border-left: 15px solid var(--accent);
        }
        .orbit-container {
           display: flex;
           gap: 20px;
           justify-content: center;
           flex-wrap: wrap;
        }
      </style>
    </head>
    <body style="${mood.bodyStyle}">
      ${mood.overlay || ''}
      ${cardsHtml}
    </body>
    </html>
  `;
}
