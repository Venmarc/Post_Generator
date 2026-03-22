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
    ()=>themes
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
    const { cards, layout, theme, format, backgroundImage } = options;
    const activeTheme = __TURBOPACK__imported__module__$5b$project$5d2f$themes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["themes"][theme] || __TURBOPACK__imported__module__$5b$project$5d2f$themes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["themes"]['gleam'];
    const width = 1080;
    // Dynamic height for tall composite pages
    let height = format === 'portrait' ? 1350 : 1080;
    if (format === 'tall' || layout.startsWith('composite')) {
        height = Math.max(1350, 400 + cards.length * 400);
    }
    const browser = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$browser$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getBrowser"])();
    try {
        const page = await browser.newPage();
        await page.setViewport({
            width,
            height
        });
        if (layout === 'carousel') {
            const buffers = [];
            for (const card of cards){
                const html = generateCompositeHTML([
                    card
                ], activeTheme, layout, height, backgroundImage);
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
            // composite layouts or single
            const html = generateCompositeHTML(cards, activeTheme, layout, height, backgroundImage);
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
function generateCompositeHTML(cards, theme, layout, totalHeight, bgImage) {
    // Custom Background string
    const pageBg = bgImage ? `background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url('${bgImage}') no-repeat center center; background-size: cover;` : `background: ${theme.bg};`;
    let cardsHtml = '';
    if (layout === 'composite-vertical') {
        cardsHtml = `
      <div class="composite-vertical-container">
        ${cards.map((c, i)=>`
          <div class="card-block">
            ${c.imageUrl ? `<img src="${c.imageUrl}" class="card-img" />` : ''}
            <div class="card-text">
              <div class="card-title"><span class="card-number">${i + 1}.</span> ${c.title}</div>
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
        ${cards.map((c, i)=>{
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
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/app/api/render/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$cardRenderer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cardRenderer.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$cardRenderer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$cardRenderer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
async function POST(req) {
    try {
        const body = await req.json();
        const { topic, ...options } = body;
        // Hardcoded default for testing if not provided
        const renderOptions = {
            cards: options.cards || [
                {
                    title: topic || 'New Post',
                    body: 'Generating elite content...'
                }
            ],
            layout: options.layout || 'composite-hero',
            theme: options.theme || 'orbit',
            format: options.format || 'portrait',
            backgroundImage: options.backgroundImage
        };
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$cardRenderer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["renderCard"])(renderOptions);
        if (Array.isArray(result)) {
            // Handle carousel (multiple images)
            const base64Images = result.map((buffer)=>buffer.toString('base64'));
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                images: base64Images
            });
        } else {
            // Single image
            const base64Image = result.toString('base64');
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                image: base64Image
            });
        }
    } catch (error) {
        console.error('Render error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error.message
        }, {
            status: 500
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__10iho51._.js.map