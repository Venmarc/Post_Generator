"use client";
import { useState, useMemo } from "react";
import { Layers, Loader2, Sparkles, Download, RefreshCw, Lightbulb, Zap } from "lucide-react";
import { useTelemetry } from "../../lib/storage";
import { platformPresets } from "../../lib/presets";
import { useDraft } from "../../lib/drafts";

export default function CreatePipeline() {
  const { topic, setTopic, platform, setPlatform, clearDraft, isHydrated: draftReady } = useDraft();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingHooks, setIsGeneratingHooks] = useState(false);
  const [hooks, setHooks] = useState<string[]>([]);
  const [selectedHook, setSelectedHook] = useState<string | null>(null);
  const [level, setLevel] = useState<'pro' | 'elite'>('pro');
  const [style, setStyle] = useState<'bold' | 'story' | 'professional'>('bold');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  
  const { trackGeneration, trackExport } = useTelemetry();

  const filteredPresets = useMemo(() => 
    platformPresets.filter(p => p.platform === platform),
  [platform]);

  if (!draftReady) return null; // Prevent hydration mismatch

  const handleGenerateHooks = async () => {
    if (!topic || isGeneratingHooks) return;
    setIsGeneratingHooks(true);
    setHooks([]);
    setSelectedHook(null);

    try {
      const response = await fetch("/api/hooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      const data = await response.json();
      if (data.success) {
        setHooks(data.hooks);
      }
    } catch (error) {
      console.error("Hook generation failed:", error);
    } finally {
      setIsGeneratingHooks(false);
    }
  };

  const handleGenerate = async () => {
    if (!topic && !isGenerating) return;
    
    setIsGenerating(true);
    setGeneratedImage(null);

    try {
      const response = await fetch("/api/render", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          topic,
          platform,
          style,
          level,
          hook: selectedHook,
          layout: 'composite-hero',
          theme: 'orbit',
          format: 'portrait'
        }),
      });

      const data = await response.json();
        if (data.success && data.base64Data) {
          setGeneratedImage(data.base64Data);
          trackGeneration(topic, platform, data.base64Data);
          clearDraft(); // Reset for next project
        } else {
        console.error("No image returned:", data.error);
      }
    } catch (error) {
      console.error("Generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExport = () => {
    if (!generatedImage) return;
    trackExport(topic, platform);
    
    // Simulate real download
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${generatedImage}`;
    link.download = `artenova-${Date.now()}.png`;
    link.click();
  };

  return (
    <div className="animate-in fade-in duration-500 slide-in-from-bottom-4 pb-20">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary mb-2">Content Pipeline</h1>
          <p className="text-text-secondary/60 text-base">Generate elite hooks and render Gamma-style composites.</p>
        </div>
        <button 
          onClick={handleGenerate}
          disabled={isGenerating || !topic}
          className="bg-accent disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent/90 text-void px-8 py-3 rounded-full text-sm font-bold transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
        >
          {isGenerating ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          {isGenerating ? "Rendering..." : "Generate Output"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Main Input Card */}
        <div className="lg:col-span-2 bg-surface rounded-card border border-border-subtle/50 p-10 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-2 hover:scale-[1.01] group relative overflow-hidden flex flex-col">
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-text-primary/90">Topic & Parameters</h2>
            <div className="flex items-center gap-2 px-3 py-1 bg-accent/10 rounded-full border border-accent/20">
              <Zap className="w-3 h-3 text-accent" />
              <span className="text-[10px] text-accent font-bold uppercase tracking-widest">{platform} Mode</span>
            </div>
          </div>
          <textarea 
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder={`What are we talking about today on ${platform}?`}
            className="w-full bg-void/50 border border-border-subtle/50 rounded-2xl p-6 text-text-primary text-xl focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/10 transition-all min-h-[140px] mb-8 resize-none placeholder:text-text-secondary/30"
          />

          {/* Viral Hook Engine Section */}
          <div className="mt-auto pt-6 border-t border-border-subtle/20">
             <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-accent/10 rounded-lg text-accent">
                      <Lightbulb className="w-5 h-5" />
                   </div>
                   <h3 className="font-semibold text-text-primary/80">Viral Hook Engine</h3>
                </div>
                <button 
                  onClick={handleGenerateHooks}
                  disabled={isGeneratingHooks || !topic}
                  className="text-xs font-bold text-accent uppercase tracking-widest hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isGeneratingHooks ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
                  {hooks.length > 0 ? "Re-generate Hooks" : "Generate 5 Hooks"}
                </button>
             </div>

             <div className="space-y-3">
                {isGeneratingHooks && (
                   <div className="flex flex-col gap-3 animate-pulse">
                      {[1,2,3].map(i => (
                         <div key={i} className="h-16 bg-void/30 border border-border-subtle/20 rounded-xl"></div>
                      ))}
                   </div>
                )}
                
                {hooks.map((hook, idx) => (
                   <button 
                      key={idx}
                      onClick={() => setSelectedHook(hook)}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 group flex items-start gap-3 ${
                         selectedHook === hook 
                            ? 'bg-accent/10 border-accent shadow-[0_0_15px_rgba(16,185,129,0.1)]' 
                            : 'bg-void/20 border-border-subtle/30 hover:border-accent/40'
                      }`}
                   >
                      <div className={`mt-1 w-2 h-2 rounded-full shrink-0 transition-colors ${selectedHook === hook ? 'bg-accent animate-pulse' : 'bg-text-secondary/20 group-hover:bg-accent/40'}`}></div>
                      <span className={`text-sm tracking-tight leading-relaxed ${selectedHook === hook ? 'text-text-primary font-medium' : 'text-text-secondary/70 group-hover:text-text-primary/90'}`}>
                         {hook}
                      </span>
                   </button>
                ))}

                {!isGeneratingHooks && hooks.length === 0 && (
                   <div className="py-8 text-center border border-dashed border-border-subtle/20 rounded-xl">
                      <p className="text-xs text-text-secondary/30 italic">Enter a topic above to generate elite viral hooks.</p>
                   </div>
                )}
             </div>
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-8 flex flex-col">
          {/* Strategy & Style Selection */}
          <div className="bg-surface rounded-card border border-border-subtle/50 p-8 shadow-card flex-1">
            <h3 className="text-sm font-semibold text-text-secondary/40 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Zap className="w-4 h-4" /> Strategy & Style
            </h3>

            {/* Level Toggle */}
            <div className="mb-8">
               <label className="text-[10px] font-bold text-text-secondary uppercase tracking-[2px] block mb-3">Copywriter Level</label>
               <div className="grid grid-cols-2 gap-2 p-1 bg-void/50 rounded-xl border border-border-subtle/30">
                  <button 
                    onClick={() => setLevel('pro')}
                    className={`py-2 rounded-lg text-xs font-bold transition-all ${level === 'pro' ? 'bg-accent text-void shadow-glow' : 'text-text-secondary hover:text-white'}`}
                  >
                    PRO
                  </button>
                  <button 
                    onClick={() => setLevel('elite')}
                    className={`py-2 rounded-lg text-xs font-bold transition-all ${level === 'elite' ? 'bg-accent text-void shadow-glow' : 'text-text-secondary hover:text-white'}`}
                  >
                    ELITE
                  </button>
               </div>
               <p className="mt-2 text-[10px] text-text-secondary/40 leading-relaxed italic">
                 {level === 'elite' ? "Elite: Heavy, contrarian style with concrete examples." : "Pro: Balanced, engaging platform-standard copy."}
               </p>
            </div>

            {/* Style Selection */}
            <div className="space-y-3">
               <label className="text-[10px] font-bold text-text-secondary uppercase tracking-[2px] block mb-3">Post Tone</label>
               {[
                 { id: 'bold', label: 'Bold & Aggressive', icon: <Zap className="w-3 h-3" /> },
                 { id: 'story', label: 'Raw Storytelling', icon: <Sparkles className="w-3 h-3" /> },
                 { id: 'professional', label: 'Elite Authority', icon: <Layers className="w-3 h-3" /> }
               ].map((s) => (
                 <button
                   key={s.id}
                   onClick={() => setStyle(s.id as any)}
                   className={`w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${
                     style === s.id 
                       ? 'bg-accent/10 border-accent text-white' 
                       : 'bg-void/30 border-border-subtle/20 text-text-secondary hover:border-accent/30'
                   }`}
                 >
                   <div className={`p-2 rounded-lg ${style === s.id ? 'bg-accent text-void' : 'bg-void text-accent/50'}`}>
                     {s.icon}
                   </div>
                   <span className="text-xs font-semibold">{s.label}</span>
                 </button>
               ))}
            </div>
          </div>

          <div className="bg-surface rounded-card border border-border-subtle/50 p-8 shadow-card">
            <h3 className="text-sm font-semibold text-text-secondary/40 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Lightbulb className="w-4 h-4" /> Quick Presets
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {filteredPresets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => setTopic(preset.topic)}
                  className="text-left p-4 rounded-xl bg-void/50 border border-border-subtle/30 hover:border-accent/50 hover:bg-accent/5 transition-all group"
                >
                  <p className="text-[10px] font-bold text-accent mb-1 uppercase tracking-wider">{preset.label}</p>
                  <p className="text-xs text-text-secondary group-hover:text-text-primary transition-colors line-clamp-1">{preset.topic}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Engine Settings Card */}
        <div className="bg-surface rounded-card border border-border-subtle/50 p-10 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-2 hover:scale-[1.01] flex flex-col">
          <h2 className="text-xl font-semibold mb-6 text-text-primary/90">Engine Settings</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <span className="text-text-secondary/40 text-[10px] font-bold uppercase tracking-widest px-1">Selected Platform</span>
              <div className="grid grid-cols-2 gap-2">
                {(["LinkedIn", "Instagram", "Twitter", "TikTok"] as const).map((p) => (
                  <button 
                    key={p}
                    onClick={() => setPlatform(p)}
                    className={`h-11 rounded-xl text-xs font-bold transition-all border ${platform === p ? 'bg-accent/10 border-accent/40 text-accent' : 'bg-void border-border-subtle/50 text-text-secondary/60 hover:border-accent/20'}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            
            <SettingItem label="Output Level" value="Elite" isAccent />
            <SettingItem label="Layout Mode" value="Composite Hero" />
            <SettingItem label="Theme Visuals" value="Orbit" />
          </div>
          
          <div className="mt-auto pt-10">
            <div className="bg-accent/5 border border-accent/10 rounded-2xl p-5 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-accent uppercase tracking-widest mb-1">Status</p>
                <p className="text-sm font-semibold text-text-primary">Engine Ready</p>
              </div>
              <RefreshCw className="w-5 h-5 text-accent opacity-40" />
            </div>
          </div>
        </div>

        {/* Generated Output / Preview Section */}
        <div className="lg:col-span-3 bg-surface/40 rounded-3xl border border-accent/15 shadow-card p-10 min-h-[600px] flex flex-col items-center justify-center relative overflow-hidden text-center mt-4">
          <div className="absolute inset-0 bg-linear-to-br from-purple-950/10 via-transparent to-accent/10 pointer-events-none" />
          
          <div className="relative z-10 w-full max-w-4xl mx-auto">
            {!generatedImage && !isGenerating ? (
              <div className="max-w-lg mx-auto">
                <h2 className="text-2xl font-bold text-text-primary mb-4">Preview: Gamma-Style Composite</h2>
                <p className="text-text-secondary/60 text-base mb-10">
                  Select a draft or enter a topic to start. The final 1080px asset will render here.
                </p>
                
                <div className="relative w-64 md:w-72 mx-auto aspect-9/16 rounded-2xl overflow-hidden border border-accent/20 shadow-[0_0_50px_rgba(16,185,129,0.1)] group-hover:scale-[1.02] transition-transform duration-500 opacity-40 grayscale">
                  <div className="absolute inset-0 bg-linear-to-br from-purple-900/40 to-accent/20" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_70%)]" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Layers className="w-12 h-12 text-accent/30" />
                  </div>
                </div>
              </div>
            ) : isGenerating ? (
              <div className="flex flex-col items-center">
                <div className="w-64 md:w-72 aspect-9/16 bg-void/40 rounded-2xl border border-accent/10 flex flex-col items-center justify-center animate-pulse relative overflow-hidden">
                   <div className="absolute inset-0 bg-linear-to-br from-accent/5 to-transparent" />
                   <Loader2 className="w-10 h-10 text-accent/20 animate-spin mb-4" />
                   <p className="text-accent/40 font-bold uppercase tracking-widest text-[10px]">Processing Layout...</p>
                </div>
                <p className="mt-8 text-text-secondary/60 text-sm">Orchestrating pixels & composite cards...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center animate-in zoom-in-95 duration-500">
                <div className="relative group">
                  <img 
                    src={`data:image/png;base64,${generatedImage}`} 
                    alt="Generated Composite" 
                    className="w-full max-w-md mx-auto rounded-3xl shadow-[0_0_100px_rgba(16,185,129,0.2)] border border-accent/20"
                  />
                  <div className="absolute top-6 right-6 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                    <button 
                      onClick={handleExport}
                      className="bg-void/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 hover:bg-accent hover:text-void transition-all cursor-pointer shadow-2xl"
                    >
                      <Download size={20} />
                    </button>
                    <button onClick={handleGenerate} className="bg-void/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 hover:bg-accent hover:text-void transition-all cursor-pointer shadow-2xl">
                      <RefreshCw size={20} />
                    </button>
                  </div>
                </div>
                <div className="mt-10 flex items-center gap-8">
                   <div className="text-left">
                     <p className="text-accent text-[10px] font-bold uppercase tracking-widest mb-1">Status</p>
                     <p className="text-sm font-semibold text-text-primary">Render Success</p>
                   </div>
                   <div className="w-px h-8 bg-border-subtle/50"></div>
                   <div className="text-left">
                     <p className="text-text-secondary/40 text-[10px] font-bold uppercase tracking-widest mb-1">Platform</p>
                     <p className="text-sm font-semibold text-text-primary">{platform}</p>
                   </div>
                </div>
              </div>
            )}
          </div>
          
          {!generatedImage && !isGenerating && (
            <div className="absolute bottom-10 left-0 w-full flex justify-center gap-2 px-10">
              <div className="flex items-center gap-2 bg-void/40 backdrop-blur-sm border border-accent/10 rounded-full px-4 py-2 grayscale opacity-50">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
                <span className="text-[10px] text-accent font-bold uppercase tracking-widest">Awaiting Generator Task</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SettingItem({ label, value, isAccent = false }: { label: string, value: string, isAccent?: boolean }) {
  return (
    <div className="h-14 bg-void border border-border-subtle/50 rounded-xl flex items-center justify-between px-5 transition-all hover:bg-surface-hover hover:border-accent/20">
      <span className="text-text-secondary/60 text-xs font-medium">{label}</span>
      <span className={`text-xs font-bold ${isAccent ? 'text-accent' : 'text-text-primary'}`}>{value}</span>
    </div>
  );
}
