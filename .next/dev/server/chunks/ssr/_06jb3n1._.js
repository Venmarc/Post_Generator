module.exports = [
"[project]/lib/drafts.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useDraft",
    ()=>useDraft
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
const DRAFT_KEY = 'artenova_current_draft';
function useDraft(initialTopic = "", initialPlatform = "LinkedIn") {
    const [topic, setTopic] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialTopic);
    const [platform, setPlatform] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialPlatform);
    const [isHydrated, setIsHydrated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Load draft on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const saved = localStorage.getItem(DRAFT_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setTopic(parsed.topic || "");
                setPlatform(parsed.platform || "LinkedIn");
            } catch (e) {
                console.error("Failed to load draft", e);
            }
        }
        setIsHydrated(true);
    }, []);
    // Save draft whenever it changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isHydrated) return;
        localStorage.setItem(DRAFT_KEY, JSON.stringify({
            topic,
            platform
        }));
    }, [
        topic,
        platform,
        isHydrated
    ]);
    const clearDraft = ()=>{
        setTopic("");
        localStorage.removeItem(DRAFT_KEY);
    };
    return {
        topic,
        setTopic,
        platform,
        setPlatform,
        clearDraft,
        isHydrated
    };
}
}),
"[project]/lib/supabase.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-ssr] (ecmascript) <locals>");
;
// Fallback values for build-time to prevent "supabaseUrl is required" errors
const supabaseUrl = ("TURBOPACK compile-time value", "https://vdpmpfzushnpydywiiik.supabase.co") || 'https://placeholder-url.supabase.co';
const supabaseAnonKey = ("TURBOPACK compile-time value", "sb_publishable_c2FarQfvh0dJLMe6DKKlnA_wp1KeSt3") || 'placeholder-anon-key';
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey);
}),
"[project]/lib/storage.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTelemetry",
    ()=>useTelemetry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [app-ssr] (ecmascript)");
"use client";
;
;
const STORAGE_KEY = 'artenova_telemetry';
const defaultStats = {
    generated: 0,
    exported: 0,
    lastActivity: null,
    history: []
};
// Helper to convert base64 to Blob for Supabase Storage
const base64ToBlob = (base64, contentType = 'image/png')=>{
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for(let i = 0; i < byteCharacters.length; i++){
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([
        byteArray
    ], {
        type: contentType
    });
};
function useTelemetry() {
    const [stats, setStats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(defaultStats);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const fetchCloudStats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        try {
            // Get counts
            const { count: totalGenerated } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('posts_history').select('*', {
                count: 'exact',
                head: true
            });
            const { count: totalExported } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('posts_history').select('*', {
                count: 'exact',
                head: true
            }).eq('is_exported', true);
            // Get last 10 history items
            const { data: historyData } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('posts_history').select('*').order('created_at', {
                ascending: false
            }).limit(10);
            const formattedHistory = (historyData || []).map((item)=>({
                    id: item.id,
                    topic: item.topic,
                    platform: item.platform,
                    timestamp: item.created_at,
                    image_url: item.image_url,
                    is_exported: item.is_exported
                }));
            const newStats = {
                generated: totalGenerated || 0,
                exported: totalExported || 0,
                lastActivity: formattedHistory[0]?.timestamp || null,
                history: formattedHistory
            };
            setStats(newStats);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newStats));
        } catch (e) {
            console.error("Cloud fetch failed", e);
        } finally{
            setLoading(false);
        }
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Load local cache immediately
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            setStats(JSON.parse(saved));
        }
        fetchCloudStats();
    }, [
        fetchCloudStats
    ]);
    const trackGeneration = async (topic, platform, base64Image)=>{
        let imageUrl = '';
        if (base64Image) {
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.png`;
            const blob = base64ToBlob(base64Image);
            const { data: uploadData } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].storage.from('post-assets').upload(fileName, blob);
            if (uploadData) {
                const { data: publicUrlData } = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].storage.from('post-assets').getPublicUrl(fileName);
                imageUrl = publicUrlData.publicUrl;
            }
        }
        const { data: insertedData } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('posts_history').insert([
            {
                topic,
                platform,
                image_url: imageUrl
            }
        ]).select().single();
        if (insertedData) {
            fetchCloudStats(); // Refresh stats from cloud
        }
    };
    const trackExport = async (topic, platform, id)=>{
        // If we have an ID (from cloud history), update it. 
        // Otherwise, we find the most recent matching topic/platform
        const query = id ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('posts_history').update({
            is_exported: true
        }).eq('id', id) : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('posts_history').update({
            is_exported: true
        }).eq('topic', topic).eq('platform', platform).is('is_exported', false).order('created_at', {
            ascending: false
        }).limit(1);
        await query;
        fetchCloudStats();
    };
    return {
        ...stats,
        loading,
        exportRate: stats.generated > 0 ? Math.round(stats.exported / stats.generated * 100) : 0,
        trackGeneration,
        trackExport
    };
}
}),
"[project]/lib/presets.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getPresets",
    ()=>getPresets,
    "platformPresets",
    ()=>platformPresets
]);
const platformPresets = [
    // LINKEDIN
    {
        id: 'li-1',
        platform: 'LinkedIn',
        label: 'Contrarian Take',
        topic: 'Why [Common Industry Advice] is actually holding you back in 2025.'
    },
    {
        id: 'li-2',
        platform: 'LinkedIn',
        label: 'The Hard Truth',
        topic: 'The most expensive mistake I made while building my first business.'
    },
    {
        id: 'li-3',
        platform: 'LinkedIn',
        label: 'Case Study',
        topic: 'How we helped [Client] achieve [Result] by focusing on [Simple Change].'
    },
    // INSTAGRAM
    {
        id: 'ig-1',
        platform: 'Instagram',
        label: 'Daily Motivation',
        topic: 'A gentle reminder that [Aspirational Goal] is a marathon, not a sprint.'
    },
    {
        id: 'ig-2',
        platform: 'Instagram',
        label: 'Artistic Hook',
        topic: 'Behind the scenes at Artenova: Transforming basic ideas into elite visual assets.'
    },
    // TWITTER / X
    {
        id: 'tw-1',
        platform: 'Twitter',
        label: 'Tech Hot Take',
        topic: 'Unpopular opinion: [Coding Tool/Framework] is actually overrated for most startups.'
    },
    {
        id: 'tw-2',
        platform: 'Twitter',
        label: 'Viral Thread',
        topic: '10 tools I use to 10x my creative output without spending a dime. 🧵'
    }
];
function getPresets(platform) {
    return platformPresets.filter((p)=>p.platform === platform);
}
}),
"[project]/lib/test-data.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TEST_LINKED_POST",
    ()=>TEST_LINKED_POST
]);
const TEST_LINKED_POST = `The subtle art of technical leadership isn't just about code complexity. 
It’s about the silence between the sprints.
It’s about the decisions you DON'T make.

Case in point:
We spent 3 weeks debating a schema change.
I killed it in 5 minutes.
Not because I'm smarter, but because I saw the downstream friction.

Lead with vision, not just versioning. 
Stop polishing the problems and start engineering the exits.

#Leadership #TechStrategy #EngineeringManagement`;
}),
"[project]/app/create/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

const e = new Error("Could not parse module '[project]/app/create/page.tsx'\n\nExpected '</', got 'numeric literal'");
e.code = 'MODULE_UNPARSABLE';
throw e;
}),
];

//# sourceMappingURL=_06jb3n1._.js.map