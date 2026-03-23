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
"[project]/components/GammaRenderer.tsx [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Gamma-style composite HTML template generator.
 * Produces a self-contained HTML/CSS string for 1080x1920 viewport.
 */ __turbopack_context__.s([
    "generateGammaHTML",
    ()=>generateGammaHTML
]);
function generateGammaHTML(config) {
    const { copy, theme, mood, layout, bgImageUrl, photographer } = config;
    // Split copy into sections
    const lines = copy.split('\n').filter((l)=>l.trim().length > 0);
    const headline = lines[0] || "";
    const bodyLines = lines.slice(1).filter((l)=>!l.startsWith('#'));
    const hashtags = lines.filter((l)=>l.startsWith('#')).join(' ');
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
        ${bodyLines.map((line)=>`<p style="margin-bottom: 30px">${line}</p>`).join('')}
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
}),
"[project]/lib/pexels.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Pexels API abstraction with smart querying and 24h caching.
 */ __turbopack_context__.s([
    "buildPexelsQuery",
    ()=>buildPexelsQuery,
    "searchPexels",
    ()=>searchPexels
]);
async function searchPexels(query) {
    const apiKey = process.env.PEXELS_API_KEY;
    if (!apiKey) {
        console.warn("PEXELS_API_KEY is missing in environment.");
        return null;
    }
    try {
        // We use standard fetch with revalidation for 24h caching
        const response = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=portrait&size=large`, {
            headers: {
                Authorization: apiKey
            },
            next: {
                revalidate: 86400
            }
        });
        if (!response.ok) {
            if (response.status === 429) {
                console.error("Pexels API Rate Limit Exceeded (429)");
            } else {
                console.error(`Pexels API Error: ${response.status} ${response.statusText}`);
            }
            return null;
        }
        const data = await response.json();
        return data.photos[0] || null;
    } catch (error) {
        console.error("Pexels Search Exception:", error);
        return null;
    }
}
function buildPexelsQuery(theme, mood, layout) {
    // mapping common internal keys to descriptive terms
    const terms = [
        theme,
        mood,
        layout
    ].filter(Boolean);
    // Refine common values
    const refined = terms.map((t)=>{
        switch(t.toLowerCase()){
            case 'cinematic':
                return 'dramatic cinematic lighting';
            case 'minimal':
                return 'minimalist clean aesthetic';
            case 'cosmic':
                return 'outer space nebula cosmic';
            case 'botanical':
                return 'nature plants botanical leaves';
            case 'neon':
                return 'cyberpunk neon lights city';
            case 'glassmorphic':
                return 'abstract glass shapes blur';
            case 'metallic':
                return 'industrial metallic texture';
            case 'pastel':
                return 'soft pastel gradient';
            default:
                return t;
        }
    });
    return refined.join(' ') + ' background';
}
}),
"[project]/app/api/generate-composite/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$browser$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/browser.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$GammaRenderer$2e$tsx__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/GammaRenderer.tsx [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pexels$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/pexels.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$browser$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$browser$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
async function POST(req) {
    try {
        const body = await req.json();
        const { copy, theme, mood, layout } = body;
        if (!copy) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "Copy is required"
            }, {
                status: 400
            });
        }
        // 1. Fetch Background
        const query = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pexels$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildPexelsQuery"])(theme || 'abstract', mood || 'cinematic', layout || 'composite');
        const photo = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pexels$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["searchPexels"])(query);
        // 2. Generate HTML
        const html = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$GammaRenderer$2e$tsx__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateGammaHTML"])({
            copy,
            theme: theme || 'default',
            mood: mood || 'default',
            layout: layout || 'default',
            bgImageUrl: photo?.src?.portrait || photo?.src?.large2x || undefined,
            photographer: photo?.photographer
        });
        // 3. Take Screenshot
        const browser = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$browser$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getBrowser"])();
        const page = await browser.newPage();
        await page.setViewport({
            width: 1080,
            height: 1920,
            deviceScaleFactor: 2
        });
        await page.setContent(html, {
            waitUntil: 'networkidle0'
        });
        // Add a small delay for any extra font/image settling if needed
        // await new Promise(r => setTimeout(r, 500));
        const screenshotsMs = Date.now();
        const screenshot = await page.screenshot({
            type: 'png',
            fullPage: false,
            encoding: 'base64'
        });
        const screenshotTook = Date.now() - screenshotsMs;
        await browser.close();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            image: screenshot,
            pexels: photo ? {
                photographer: photo.photographer,
                url: photo.url
            } : null,
            milestones: [
                `Pexels: Found background for "${query}" (${photo ? 'Success' : 'Fallback'})`,
                `Gamma: HTML Template generated (${copy.length} chars)`,
                `Puppeteer: Browser viewport 1080x1920 initialized`,
                `Render: Screenshot captured in ${screenshotTook}ms`
            ]
        });
    } catch (error) {
        console.error('Composite generation error:', error);
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

//# sourceMappingURL=%5Broot-of-the-server%5D__12iho2k._.js.map