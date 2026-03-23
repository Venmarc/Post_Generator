module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/lib/browser.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "getBrowser",
    ()=>getBrowser,
    "isLiteMode",
    ()=>isLiteMode
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$puppeteer$2d$core__$5b$external$5d$__$28$puppeteer$2d$core$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$puppeteer$2d$core$29$__ = __turbopack_context__.i("[externals]/puppeteer-core [external] (puppeteer-core, esm_import, [project]/node_modules/puppeteer-core)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$sparticuz$2f$chromium__$5b$external$5d$__$2840$sparticuz$2f$chromium$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$sparticuz$2f$chromium$29$__ = __turbopack_context__.i("[externals]/@sparticuz/chromium [external] (@sparticuz/chromium, esm_import, [project]/node_modules/@sparticuz/chromium)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$puppeteer__$5b$external$5d$__$28$puppeteer$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$puppeteer$29$__ = __turbopack_context__.i("[externals]/puppeteer [external] (puppeteer, esm_import, [project]/node_modules/puppeteer)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$puppeteer$2d$core__$5b$external$5d$__$28$puppeteer$2d$core$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$puppeteer$2d$core$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f40$sparticuz$2f$chromium__$5b$external$5d$__$2840$sparticuz$2f$chromium$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$sparticuz$2f$chromium$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$puppeteer__$5b$external$5d$__$28$puppeteer$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$puppeteer$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$puppeteer$2d$core__$5b$external$5d$__$28$puppeteer$2d$core$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$puppeteer$2d$core$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f40$sparticuz$2f$chromium__$5b$external$5d$__$2840$sparticuz$2f$chromium$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$sparticuz$2f$chromium$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$puppeteer__$5b$external$5d$__$28$puppeteer$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$puppeteer$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
async function getBrowser() {
    if ("TURBOPACK compile-time truthy", 1) {
        return await __TURBOPACK__imported__module__$5b$externals$5d2f$puppeteer__$5b$external$5d$__$28$puppeteer$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$puppeteer$29$__["default"].launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox'
            ]
        });
    }
    //TURBOPACK unreachable
    ;
}
function isLiteMode() {
    return ("TURBOPACK compile-time value", "development") === 'production' || !!process.env.VERCEL;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/themes.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "themes",
    ()=>themes,
    "visualMoods",
    ()=>visualMoods
]);
const themes = {
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
const visualMoods = {
    'clean-void': {
        bodyStyle: 'background: #050505; color: #ffffff;',
        cardStyle: 'background: rgba(15, 15, 20, 0.9); border: 1px solid rgba(255,255,255,0.05);'
    },
    'neon-edge': {
        bodyStyle: 'background: #000000; color: #ffffff;',
        cardStyle: 'background: rgba(10, 10, 10, 0.95); border: 1px solid var(--accent); box-shadow: 0 0 20px rgba(var(--accent-rgb), 0.3);'
    },
    'cosmic-depth': {
        bodyStyle: 'background: radial-gradient(circle at center, #1b2735 0%, #090a0f 100%); color: #ffffff;',
        cardStyle: 'background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1);',
        overlay: '<div style="position:fixed;top:0;left:0;width:100%;height:100%;background:url(https://www.transparenttextures.com/patterns/stardust.png);opacity:0.3;pointer-events:none;"></div>'
    },
    'pastel-haze': {
        bodyStyle: 'background: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%); color: #1e293b;',
        cardStyle: 'background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.5);'
    },
    'warm-film': {
        bodyStyle: 'background: #1a1a1a; color: #fef3c7;',
        cardStyle: 'background: rgba(45, 26, 26, 0.8); border: 1px solid rgba(251, 191, 36, 0.2); box-shadow: 0 0 40px rgba(251, 191, 36, 0.1);',
        overlay: '<div style="position:fixed;top:0;left:0;width:100%;height:100%;background:url(https://www.transparenttextures.com/patterns/film-grain.png);opacity:0.1;pointer-events:none;"></div>'
    },
    'metallic': {
        bodyStyle: 'background: linear-gradient(180deg, #2c3e50 0%, #000000 100%); color: #e2e8f0;',
        cardStyle: 'background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02)); border: 1px solid rgba(255,255,255,0.2);'
    },
    'organic': {
        bodyStyle: 'background: #f0f4f0; color: #064e3b;',
        cardStyle: 'background: rgba(255, 255, 255, 0.8); border: 1px solid rgba(5, 150, 105, 0.2);'
    },
    'monochrome': {
        bodyStyle: 'background: #ffffff; color: #000000;',
        cardStyle: 'background: #000000; color: #ffffff; border-radius: 0;'
    },
    'glassmorphic': {
        bodyStyle: 'background: linear-gradient(45deg, #ee9ca7 0%, #ffdde1 100%); color: #ffffff;',
        cardStyle: 'background: rgba(255, 255, 255, 0.2); backdrop-filter: blur(25px); border: 1px solid rgba(255,255,255,0.3); box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);'
    },
    'noise': {
        bodyStyle: 'background: #0a0a0a; color: #ffffff;',
        cardStyle: 'background: #1a1a1a; border: 1px solid #333;',
        overlay: '<div style="position:fixed;top:0;left:0;width:100%;height:100%;background:url(https://www.transparenttextures.com/patterns/carbon-fibre.png);opacity:0.2;pointer-events:none;"></div>'
    },
    'radial': {
        bodyStyle: 'background: radial-gradient(circle, var(--accent) 0%, #000 70%); color: #ffffff;',
        cardStyle: 'background: rgba(0,0,0,0.6); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1);'
    }
};
}),
"[project]/cardRenderer.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "renderCard",
    ()=>renderCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$browser$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/browser.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$themes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/themes.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$browser$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$browser$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
async function renderCard(options) {
    const { cards, layout, theme, visualMood, format, backgroundImage, pexelsKey } = options;
    const activeTheme = __TURBOPACK__imported__module__$5b$project$5d2f$themes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["themes"][theme] || __TURBOPACK__imported__module__$5b$project$5d2f$themes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["themes"]['gleam'];
    const activeMood = __TURBOPACK__imported__module__$5b$project$5d2f$themes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["visualMoods"][visualMood] || __TURBOPACK__imported__module__$5b$project$5d2f$themes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["visualMoods"]['clean-void'];
    const width = format === 'wide' ? 1920 : 1080;
    let height = format === 'portrait' ? 1350 : format === 'wide' ? 1080 : 1080;
    if (format === 'tall' || layout.startsWith('composite') || layout.includes('flow')) {
        height = Math.max(1350, 400 + cards.length * 400);
    }
    // Pexels fallback logic
    let finalBg = backgroundImage;
    if (!finalBg && pexelsKey) {
        try {
            const query = `${theme} ${visualMood} abstract background`;
            const pexelRes = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1`, {
                headers: {
                    Authorization: pexelsKey
                }
            });
            const pexelData = await pexelRes.json();
            if (pexelData.photos?.[0]?.src?.large2x) {
                finalBg = pexelData.photos[0].src.large2x;
            }
        } catch (e) {
            console.error("Pexels fetch failed:", e);
        }
    }
    const browser = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$browser$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getBrowser"])();
    try {
        const page = await browser.newPage();
        await page.setViewport({
            width,
            height
        });
        const htmlGenerator = (cardsData)=>generateCompositeHTML(cardsData, activeTheme, activeMood, layout, height, finalBg);
        if (layout === 'carousel') {
            const buffers = [];
            for (const card of cards){
                const html = htmlGenerator([
                    card
                ]);
                await page.setContent(html, {
                    waitUntil: 'domcontentloaded'
                });
                await page.evaluateHandle('document.fonts.ready');
                const buffer = await page.screenshot({
                    type: 'png'
                });
                buffers.push(Buffer.from(buffer));
            }
            return buffers;
        } else {
            const html = htmlGenerator(cards);
            await page.setContent(html, {
                waitUntil: 'domcontentloaded'
            });
            await page.evaluateHandle('document.fonts.ready');
            const buffer = await page.screenshot({
                type: 'png'
            });
            return Buffer.from(buffer);
        }
    } finally{
        await browser.close();
    }
}
function generateCompositeHTML(cards, theme, mood, layout, totalHeight, bgImage) {
    const pageBg = bgImage ? `background: linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.9)), url('${bgImage}') no-repeat center center; background-size: cover;` : mood.bodyStyle;
    let cardsHtml = '';
    if (layout === 'composite-vertical' || layout === 'stacked-vertical') {
        cardsHtml = `
      <div class="composite-vertical-container">
        ${cards.map((c, i)=>`
          <div class="card-block" style="${mood.cardStyle}">
            ${c.imageUrl ? `<img src="${c.imageUrl}" class="card-img" />` : ''}
            <div class="card-text">
              <div class="card-title"><span class="card-number">${i + 1}.</span> ${c.title}</div>
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
        ${cards.map((c, i)=>{
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
        ${cards.map((c, i)=>`
          <div class="card-block diagonal-card" style="margin-left: ${i * 60}px; transform: rotate(${i % 2 === 0 ? '-1deg' : '1deg'}); ${mood.cardStyle}">
            <div class="card-title"><span class="card-number">${i + 1}.</span> ${c.title}</div>
            <div class="card-body">${c.body}</div>
          </div>
        `).join('')}
      </div>
    `;
    } else if (layout === 'grid-breaks') {
        cardsHtml = `
      <div class="grid-container">
        ${cards.map((c, i)=>`
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
          ${orbits.map((c, i)=>`
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
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/child_process [external] (child_process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/process [external] (process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("process", () => require("process"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/querystring [external] (querystring, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("querystring", () => require("querystring"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/fs/promises [external] (fs/promises, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs/promises", () => require("fs/promises"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[externals]/node:stream/promises [external] (node:stream/promises, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:stream/promises", () => require("node:stream/promises"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[project]/lib/ai.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateHooks",
    ()=>generateHooks,
    "generatePostContent",
    ()=>generatePostContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dotenv$2f$config$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/dotenv/config.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$openai$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/openai/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$openai$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__OpenAI__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/openai/client.mjs [app-route] (ecmascript) <export OpenAI as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@google/genai/dist/node/index.mjs [app-route] (ecmascript)");
;
;
;
// Initialize AI clients
const openai = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$openai$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__OpenAI__as__default$3e$__["default"]({
    apiKey: process.env.OPENAI_API_KEY || ""
});
const genAI = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$google$2f$genai$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GoogleGenAI"]({
    apiKey: process.env.GEMINI_API_KEY || ""
});
/**
 * Maps a friendly model ID to the canonical SDK identifier.
 */ function getModelIdentifier(model) {
    switch(model){
        case 'gemini-3-pro':
            return 'models/gemini-1.5-pro'; // Stabilize as 1.5 Pro
        case 'gemini-3-flash':
            return 'models/gemini-1.5-flash'; // Stabilize as 1.5 Flash
        case 'gemini-2.5-flash':
            return 'models/gemini-1.5-flash'; // Fallback to 1.5 Flash
        case 'gpt-4o':
            return 'gpt-4o';
        case 'gpt-4o-mini':
            return 'gpt-4o-mini';
        default:
            return 'models/gemini-1.5-flash';
    }
}
async function generateHooks(topic, model = 'gemini-3-flash') {
    const systemPrompt = `You are an elite copywriter. For the given topic, write exactly 5 distinct, scroll-stopping hooks.
Rules:
1. Each hook must use a different angle:
  - Contrarian (Challenge a common belief)
  - Curiosity gap (Make them need the answer)
  - Bold claim (State something definitive and jarring)
  - Pain point (Highlight an unrecognized friction)
  - Unexpected insight (A rare, non-obvious observation)
2. Maximum 12 words per hook. Keep them punchy.
3. NO CLICHÉS. Ensure high mental friction.
4. Output MUST be ONLY a raw JSON array of 5 strings. Just the array. 
Example: ["Hook 1", "Hook 2", "Hook 3", "Hook 4", "Hook 5"]`;
    const userPrompt = `Topic: ${topic}`;
    let content = "";
    const modelId = getModelIdentifier(model);
    if (modelId.startsWith('models/')) {
        try {
            const response = await genAI.models.generateContent({
                model: modelId,
                contents: [
                    {
                        role: 'user',
                        parts: [
                            {
                                text: userPrompt
                            }
                        ]
                    }
                ],
                config: {
                    systemInstruction: systemPrompt,
                    temperature: 0.8
                }
            });
            content = response.text?.trim() || '[]';
        } catch (error) {
            console.error(`Gemini API FAILURE (${modelId}):`, error);
            // Minimal fallback to OpenAI if Gemini fails entirely
            content = await generateWithOpenAI('gpt-4o-mini', systemPrompt, userPrompt);
        }
    } else {
        content = await generateWithOpenAI(modelId, systemPrompt, userPrompt);
    }
    try {
        const cleaned = content.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(cleaned);
    } catch (e) {
        console.error("Failed to parse hooks JSON:", content);
        return [
            topic
        ];
    }
}
async function generatePostContent(input) {
    const { topic, platform, style, hook, level, model } = input;
    const systemPrompt = buildSystemPrompt(platform, style, hook, level);
    const userPrompt = `Topic: ${topic}`;
    const modelId = getModelIdentifier(model);
    if (modelId.startsWith('models/')) {
        try {
            const response = await genAI.models.generateContent({
                model: modelId,
                contents: [
                    {
                        role: 'user',
                        parts: [
                            {
                                text: userPrompt
                            }
                        ]
                    }
                ],
                config: {
                    systemInstruction: systemPrompt,
                    temperature: 0.8
                }
            });
            return response.text?.trim() || '';
        } catch (error) {
            console.error(`Gemini API FAILURE (${modelId}):`, error);
            return generateWithOpenAI('gpt-4o-mini', systemPrompt, userPrompt);
        }
    } else {
        return generateWithOpenAI(modelId, systemPrompt, userPrompt);
    }
}
async function generateWithOpenAI(modelId, systemPrompt, userPrompt) {
    const response = await openai.chat.completions.create({
        model: modelId,
        messages: [
            {
                role: 'system',
                content: systemPrompt
            },
            {
                role: 'user',
                content: userPrompt
            }
        ],
        temperature: 0.8
    });
    return (response.choices[0]?.message?.content || '').trim();
}
function buildSystemPrompt(platform, style, hook, level) {
    let prompt = `You are a brutal, elite social media copywriter. You will write a single post about the user's provided topic.\n\n`;
    prompt += `CRITICAL UPGRADES (Non-negotiable):\n`;
    prompt += `- You MUST use this exact string as the first line of your post: "${hook}" (Do not change it!).\n`;
    // Apply Precision Levels
    switch(level){
        case 'raw':
            prompt += `- PRECISION: Minimal editing. Quick first draft. Preserve original phrasing. Brainstorming mode.\n`;
            break;
        case 'balanced':
            prompt += `- PRECISION: Default. Remove obvious fluff. Strengthen hook moderately. Fix grammar and flow.\n`;
            break;
        case 'polished':
            prompt += `- PRECISION: Tight editing. Sharpen every sentence. Remove redundancy. Improve overall rhythm.\n`;
            break;
        case 'elite':
            prompt += `- PRECISION: ELITE / RAZOR. Maximal compression + impact. Contrarian angles amplified. Zero filler. reads like top 1% creator copy.\n`;
            break;
        case 'viral':
            prompt += `- PRECISION: VIRAL candidate. Optimized for shareability. curiosity gaps, bold claims, emotional triggers. Trade nuance for attention.\n`;
            break;
    }
    if (level === 'elite' || level === 'viral') {
        prompt += `- MANDATORY: Include at least 2 concrete, highly specific, real-world examples in your post.\n`;
        prompt += `- MANDATORY: Replace any abstract statements with observable physical behavior.\n`;
        prompt += `- MANDATORY: End the post with a strong, definitive, non-question closing line.\n`;
    }
    prompt += `- BANNED PHRASES: "features, not solutions", "technical debt is a tax", "we all know that feeling", "in today's world".\n`;
    prompt += `- NO POETIC FLUFF: Do NOT romanticize. Be grounded and heavy.\n`;
    prompt += `- FORMATTING: Use generous whitespaces and line breaks.\n\n`;
    // Apply Platform Rules
    switch(platform){
        case 'x':
            prompt += `Platform requirements for X (formerly Twitter):\n` + `- Maximum ~280 characters length.\n` + `- Extremely short bursts of text (1 short sentence per line).\n`;
            break;
        case 'instagram':
            prompt += `Platform requirements for Instagram:\n` + `- Use an engaging, emotional tone. Clear line breaks. Kill slow starts.\n`;
            break;
        case 'linkedin':
            prompt += `Platform requirements for LinkedIn:\n` + `- Add conflict and stakes. Professional but authoritative tone.\n`;
            break;
        case 'tiktok':
            prompt += `Platform requirements for TikTok:\n` + `- Very short caps-heavy hooks. High energy. Engagement driven.\n`;
            break;
    }
    prompt += `\n`;
    // Apply Writing Styles
    switch(style){
        case 'professional':
            prompt += `Style and Tone (Professional / Thought Leader):\n` + `- Clean, authoritative, LinkedIn-native, value-first.\n`;
            break;
        case 'bold':
            prompt += `Style and Tone (Bold / Contrarian):\n` + `- Challenges norms, strong opinions, provokes debate. aggressive.\n`;
            break;
        case 'story':
            prompt += `Style and Tone (Story / Narrative):\n` + `- Anecdote-driven, personal, emotional arc, longer-form feel. Show the pain.\n`;
            break;
        case 'curiosity':
            prompt += `Style and Tone (Curiosity / Teaser):\n` + `- Heavy hooks, open loops, question-led, short & punchy.\n`;
            break;
        case 'sarcastic':
            prompt += `Style and Tone (Sarcastic / Edgy):\n` + `- Dry wit, irony, slight roast energy.\n`;
            break;
        case 'motivational':
            prompt += `Style and Tone (Motivational / Hype):\n` + `- Pump-up, aspirational, gym-bro / entrepreneur energy.\n`;
            break;
        case 'minimal':
            prompt += `Style and Tone (Minimal / Aphorism):\n` + `- Ultra-short, quotable, wisdom-bomb style.\n`;
            break;
        case 'conversational':
            prompt += `Style and Tone (Conversational / Relatable):\n` + `- "You and me talking", casual, emojis ok, friendly.\n`;
            break;
    }
    prompt += `\nCRITICAL: Output ONLY the raw post text. No hashtags, no quotes.`;
    return prompt;
}
}),
"[project]/app/api/render/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cardRenderer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cardRenderer.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/ai.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$cardRenderer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$cardRenderer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
async function POST(req) {
    try {
        const body = await req.json();
        const { topic, platform, style, level, hook, model, visualMood, pexelsKey, ...options } = body;
        let aiText = '';
        if (!options.cards || options.cards.length === 0) {
            aiText = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generatePostContent"])({
                topic,
                platform: platform || 'linkedin',
                style: style || 'professional',
                level: level || 'balanced',
                hook: hook || topic,
                model: model || 'gemini-3-pro'
            });
        }
        // 2. Prepare Render Options
        const renderOptions = {
            cards: options.cards || [
                {
                    title: hook || topic || 'New Post',
                    body: aiText
                }
            ],
            layout: options.layout || 'composite-hero',
            theme: options.theme || 'orbit',
            format: options.format || 'portrait',
            visualMood: visualMood || 'clean-void',
            pexelsKey: pexelsKey || process.env.PEXELS_API_KEY || "",
            backgroundImage: options.backgroundImage
        };
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$cardRenderer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["renderCard"])(renderOptions);
        if (Array.isArray(result)) {
            const base64Images = result.map((buffer)=>buffer.toString('base64'));
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                base64Images
            });
        } else {
            const base64Image = result.toString('base64');
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                base64Data: base64Image
            });
        }
    } catch (error) {
        console.error('Render error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: error.message
        }, {
            status: 500
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0ccj4-n._.js.map