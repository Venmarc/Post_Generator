module.exports=[18622,(e,t,r)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},56704,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},24725,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},70406,(e,t,r)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},93695,(e,t,r)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},10343,e=>e.a(async(t,r)=>{try{let t=await e.y("puppeteer-core-3cc12a7b2479c6f0");e.n(t),r()}catch(e){r(e)}},!0),22973,e=>e.a(async(t,r)=>{try{let t=await e.y("@sparticuz/chromium-3369da5717b3ccb5");e.n(t),r()}catch(e){r(e)}},!0),10061,e=>e.a(async(t,r)=>{try{let t=await e.y("puppeteer-582bc9288a971b4a");e.n(t),r()}catch(e){r(e)}},!0),94854,e=>e.a(async(t,r)=>{try{var a=e.i(10343),n=e.i(22973),i=e.i(10061),s=t([a,n,i]);async function o(){return await a.default.launch({args:n.default.args,executablePath:await n.default.executablePath(),headless:!0})}[a,n,i]=s.then?(await s)():s,e.s(["getBrowser",0,o]),r()}catch(e){r(e)}},!1),39773,e=>{"use strict";async function t(e){let t=process.env.PEXELS_API_KEY;if(!t)return console.warn("PEXELS_API_KEY is missing in environment."),null;try{let r=await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(e)}&per_page=1&orientation=portrait&size=large`,{headers:{Authorization:t},next:{revalidate:86400}});if(!r.ok)return 429===r.status?console.error("Pexels API Rate Limit Exceeded (429)"):console.error(`Pexels API Error: ${r.status} ${r.statusText}`),null;return(await r.json()).photos[0]||null}catch(e){return console.error("Pexels Search Exception:",e),null}}e.s(["buildPexelsQuery",0,function(e,t,r){return[e,t,r].filter(Boolean).map(e=>{switch(e.toLowerCase()){case"cinematic":return"dramatic cinematic lighting";case"minimal":return"minimalist clean aesthetic";case"cosmic":return"outer space nebula cosmic";case"botanical":return"nature plants botanical leaves";case"neon":return"cyberpunk neon lights city";case"glassmorphic":return"abstract glass shapes blur";case"metallic":return"industrial metallic texture";case"pastel":return"soft pastel gradient";default:return e}}).join(" ")+" background"},"searchPexels",0,t])},22653,e=>{"use strict";e.s(["generateGammaHTML",0,function(e){let{copy:t,theme:r,mood:a,layout:n,bgImageUrl:i,photographer:s}=e,o=t.split("\n").filter(e=>e.trim().length>0),l=o[0]||"",c=o.slice(1).filter(e=>!e.startsWith("#")),d=o.filter(e=>e.startsWith("#")).join(" "),p=`
    background: rgba(10, 10, 18, 0.4);
    backdrop-filter: blur(24px) saturate(180%);
    -webkit-backdrop-filter: blur(24px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.8), 
                inset 0 1px 1px rgba(255, 255, 255, 0.05);
    border-radius: 40px;
    padding: 60px;
    color: #f8fafc;
  `;return`
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
      ${i?`
        background-image: url('${i}');
        background-size: cover;
        background-position: center;
      `:`
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
      ${p}
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
      <h1 class="headline">${l}</h1>
    </div>

    <div class="card body-card">
      <div class="body-text">
        ${c.map(e=>`<p style="margin-bottom: 30px">${e}</p>`).join("")}
      </div>
      ${d?`<div class="hashtags">${d}</div>`:""}
    </div>
  </div>

  ${s?`
    <div class="attribution">Background by ${s} on Pexels</div>
  `:`
    <div class="attribution">Generated Artistic Composite</div>
  `}
</body>
</html>
  `}])},15461,e=>e.a(async(t,r)=>{try{var a=e.i(89171),n=e.i(94854),i=e.i(22653),s=e.i(39773),o=t([n]);async function l(e){try{let{copy:t,theme:r,mood:o,layout:l}=await e.json();if(!t)return a.NextResponse.json({success:!1,error:"Copy is required"},{status:400});let c=(0,s.buildPexelsQuery)(r||"abstract",o||"cinematic",l||"composite"),d=await (0,s.searchPexels)(c),p=(0,i.generateGammaHTML)({copy:t,theme:r||"default",mood:o||"default",layout:l||"default",bgImageUrl:d?.src?.portrait||d?.src?.large2x||void 0,photographer:d?.photographer}),u=await (0,n.getBrowser)(),h=await u.newPage();await h.setViewport({width:1080,height:1920,deviceScaleFactor:2}),await h.setContent(p,{waitUntil:"networkidle0"});let g=Date.now(),x=await h.screenshot({type:"png",fullPage:!1,encoding:"base64"}),m=Date.now()-g;return await u.close(),a.NextResponse.json({success:!0,image:x,pexels:d?{photographer:d.photographer,url:d.url}:null,milestones:[`Pexels: Found background for "${c}" (${d?"Success":"Fallback"})`,`Gamma: HTML Template generated (${t.length} chars)`,"Puppeteer: Browser viewport 1080x1920 initialized",`Render: Screenshot captured in ${m}ms`]})}catch(e){return console.error("Composite generation error:",e),a.NextResponse.json({success:!1,error:e.message},{status:500})}}[n]=o.then?(await o)():o,e.s(["POST",0,l]),r()}catch(e){r(e)}},!1),9902,e=>e.a(async(t,r)=>{try{var a=e.i(47909),n=e.i(74017),i=e.i(96250),s=e.i(59756),o=e.i(61916),l=e.i(74677),c=e.i(69741),d=e.i(16795),p=e.i(87718),u=e.i(95169),h=e.i(47587),g=e.i(66012),x=e.i(70101),m=e.i(26937),f=e.i(10372),b=e.i(93695);e.i(20232);var v=e.i(5232),w=e.i(15461),y=t([w]);[w]=y.then?(await y)():y;let E=new a.AppRouteRouteModule({definition:{kind:n.RouteKind.APP_ROUTE,page:"/api/generate-composite/route",pathname:"/api/generate-composite",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/app/api/generate-composite/route.ts",nextConfigOutput:"",userland:w}),{workAsyncStorage:C,workUnitAsyncStorage:k,serverHooks:P}=E;async function R(e,t,r){r.requestMeta&&(0,s.setRequestMeta)(e,r.requestMeta),E.isDev&&(0,s.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let a="/api/generate-composite/route";a=a.replace(/\/index$/,"")||"/";let i=await E.prepare(e,t,{srcPage:a,multiZoneDraftMode:!1});if(!i)return t.statusCode=400,t.end("Bad Request"),null==r.waitUntil||r.waitUntil.call(r,Promise.resolve()),null;let{buildId:w,params:y,nextConfig:R,parsedUrl:C,isDraftMode:k,prerenderManifest:P,routerServerContext:A,isOnDemandRevalidate:T,revalidateOnlyGenerated:N,resolvedPathname:S,clientReferenceManifest:q,serverActionsManifest:_}=i,j=(0,c.normalizeAppPath)(a),$=!!(P.dynamicRoutes[j]||P.routes[S]),I=async()=>((null==A?void 0:A.render404)?await A.render404(e,t,C,!1):t.end("This page could not be found"),null);if($&&!k){let e=!!P.routes[S],t=P.dynamicRoutes[j];if(t&&!1===t.fallback&&!e){if(R.adapterPath)return await I();throw new b.NoFallbackError}}let O=null;!$||E.isDev||k||(O=S,O="/index"===O?"/":O);let H=!0===E.isDev||!$,U=$&&!H;_&&q&&(0,l.setManifestsSingleton)({page:a,clientReferenceManifest:q,serverActionsManifest:_});let z=e.method||"GET",M=(0,o.getTracer)(),D=M.getActiveScopeSpan(),F=!!(null==A?void 0:A.isWrappedByNextServer),B=!!(0,s.getRequestMeta)(e,"minimalMode"),L=(0,s.getRequestMeta)(e,"incrementalCache")||await E.getIncrementalCache(e,R,P,B);null==L||L.resetRequestCache(),globalThis.__incrementalCache=L;let K={params:y,previewProps:P.preview,renderOpts:{experimental:{authInterrupts:!!R.experimental.authInterrupts},cacheComponents:!!R.cacheComponents,supportsDynamicResponse:H,incrementalCache:L,cacheLifeProfiles:R.cacheLife,waitUntil:r.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,a,n)=>E.onRequestError(e,t,a,n,A)},sharedContext:{buildId:w}},G=new d.NodeNextRequest(e),W=new d.NodeNextResponse(t),X=p.NextRequestAdapter.fromNodeNextRequest(G,(0,p.signalFromNodeResponse)(t));try{let i,s=async e=>E.handle(X,K).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let r=M.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==u.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let n=r.get("next.route");if(n){let t=`${z} ${n}`;e.setAttributes({"next.route":n,"http.route":n,"next.span_name":t}),e.updateName(t),i&&i!==e&&(i.setAttribute("http.route",n),i.updateName(t))}else e.updateName(`${z} ${a}`)}),l=async i=>{var o,l;let c=async({previousCacheEntry:n})=>{try{if(!B&&T&&N&&!n)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let a=await s(i);e.fetchMetrics=K.renderOpts.fetchMetrics;let o=K.renderOpts.pendingWaitUntil;o&&r.waitUntil&&(r.waitUntil(o),o=void 0);let l=K.renderOpts.collectedTags;if(!$)return await (0,g.sendResponse)(G,W,a,K.renderOpts.pendingWaitUntil),null;{let e=await a.blob(),t=(0,x.toNodeOutgoingHttpHeaders)(a.headers);l&&(t[f.NEXT_CACHE_TAGS_HEADER]=l),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==K.renderOpts.collectedRevalidate&&!(K.renderOpts.collectedRevalidate>=f.INFINITE_CACHE)&&K.renderOpts.collectedRevalidate,n=void 0===K.renderOpts.collectedExpire||K.renderOpts.collectedExpire>=f.INFINITE_CACHE?void 0:K.renderOpts.collectedExpire;return{value:{kind:v.CachedRouteKind.APP_ROUTE,status:a.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:n}}}}catch(t){throw(null==n?void 0:n.isStale)&&await E.onRequestError(e,t,{routerKind:"App Router",routePath:a,routeType:"route",revalidateReason:(0,h.getRevalidateReason)({isStaticGeneration:U,isOnDemandRevalidate:T})},!1,A),t}},d=await E.handleResponse({req:e,nextConfig:R,cacheKey:O,routeKind:n.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:P,isRoutePPREnabled:!1,isOnDemandRevalidate:T,revalidateOnlyGenerated:N,responseGenerator:c,waitUntil:r.waitUntil,isMinimalMode:B});if(!$)return null;if((null==d||null==(o=d.value)?void 0:o.kind)!==v.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==d||null==(l=d.value)?void 0:l.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});B||t.setHeader("x-nextjs-cache",T?"REVALIDATED":d.isMiss?"MISS":d.isStale?"STALE":"HIT"),k&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let p=(0,x.fromNodeOutgoingHttpHeaders)(d.value.headers);return B&&$||p.delete(f.NEXT_CACHE_TAGS_HEADER),!d.cacheControl||t.getHeader("Cache-Control")||p.get("Cache-Control")||p.set("Cache-Control",(0,m.getCacheControlHeader)(d.cacheControl)),await (0,g.sendResponse)(G,W,new Response(d.value.body,{headers:p,status:d.value.status||200})),null};F&&D?await l(D):(i=M.getActiveScopeSpan(),await M.withPropagatedContext(e.headers,()=>M.trace(u.BaseServerSpan.handleRequest,{spanName:`${z} ${a}`,kind:o.SpanKind.SERVER,attributes:{"http.method":z,"http.target":e.url}},l),void 0,!F))}catch(t){if(t instanceof b.NoFallbackError||await E.onRequestError(e,t,{routerKind:"App Router",routePath:j,routeType:"route",revalidateReason:(0,h.getRevalidateReason)({isStaticGeneration:U,isOnDemandRevalidate:T})},!1,A),$)throw t;return await (0,g.sendResponse)(G,W,new Response(null,{status:500})),null}}e.s(["handler",0,R,"patchFetch",0,function(){return(0,i.patchFetch)({workAsyncStorage:C,workUnitAsyncStorage:k})},"routeModule",0,E,"serverHooks",0,P,"workAsyncStorage",0,C,"workUnitAsyncStorage",0,k]),r()}catch(e){r(e)}},!1)];

//# sourceMappingURL=%5Broot-of-the-server%5D__0~kgbsb._.js.map