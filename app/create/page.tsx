"use client";

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Zap, 
  Lightbulb, 
  Loader2, 
  RefreshCw, 
  ArrowRight, 
  Copy, 
  Sparkles, 
  Layers, 
  Palette, 
  Cpu,
  Monitor,
  CheckCircle2,
  Search,
  Flame,
  Activity,
  Minus,
  MessageSquare
} from 'lucide-react';
import { useDraft } from '../../lib/drafts';
import { useTelemetry } from '../../lib/storage';
import { platformPresets } from '../../lib/presets';
import { AIModel, Platform, Style, Level } from '../../lib/ai';

export default function CreateWorkspace() {
  const { topic, setTopic, platform: draftPlatform, setPlatform, clearDraft, isHydrated: draftReady } = useDraft();
  
  // Cast platform to valid type or default to linkedin
  const platform = (draftPlatform?.toLowerCase() as Platform) || 'linkedin';

  const [isGeneratingHooks, setIsGeneratingHooks] = useState(false);
  const [isGeneratingCopy, setIsGeneratingCopy] = useState(false);
  const [isRendering, setIsRendering] = useState(false);
  
  const [hooks, setHooks] = useState<string[]>([]);
  const [selectedHook, setSelectedHook] = useState<string | null>(null);
  const [generatedCopy, setGeneratedCopy] = useState<string>("");
  
  const [textModel, setTextModel] = useState<AIModel>('gemini-3-pro');
  const [imageModel, setImageModel] = useState<AIModel>('gpt-4o-mini');
  const [level, setLevel] = useState<Level>('balanced');
  const [style, setStyle] = useState<Style>('professional');
  
  const [layout, setLayout] = useState('composite-hero');
  const [theme, setTheme] = useState('orbit');
  const [visualMood, setVisualMood] = useState('cinematic');
  
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [copyFeedback, setCopyFeedback] = useState(false);
  
  const { trackGeneration, trackExport } = useTelemetry();
  
  const hooksRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to hooks when they are generated
  useEffect(() => {
    if (hooks.length > 0 && hooksRef.current) {
      hooksRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [hooks]);

  const filteredPresets = useMemo(() => 
    platformPresets.filter(p => p.platform.toLowerCase() === platform.toLowerCase()),
  [platform]);

  if (!draftReady) return null;

  const handleGenerateHooks = async () => {
    if (!topic || isGeneratingHooks) return;
    setIsGeneratingHooks(true);
    setHooks([]);
    setSelectedHook(null);
    setGeneratedCopy("");

    try {
      const response = await fetch("/api/hooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, model: textModel }),
      });
      const data = await response.json();
      if (data.success) setHooks(data.hooks);
    } catch (error) {
      console.error("Hook generation failed:", error);
    } finally {
      setIsGeneratingHooks(false);
    }
  };

  const handleGenerateCopy = async () => {
    if (!selectedHook || isGeneratingCopy) return;
    setIsGeneratingCopy(true);
    
    try {
      const response = await fetch("/api/generate-copy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          topic, 
          hook: selectedHook, 
          platform, 
          style, 
          level, 
          model: textModel 
        }),
      });
      const data = await response.json();
      if (data.success) setGeneratedCopy(data.content);
    } catch (error) {
      console.error("Copy generation failed:", error);
    } finally {
      setIsGeneratingCopy(false);
    }
  };

  const handleRender = async () => {
    if (!generatedCopy && !isRendering) return;
    setIsRendering(true);
    
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
          cards: [{ title: selectedHook, body: generatedCopy }],
          model: imageModel,
          layout: layout,
          theme: theme,
          visualMood: visualMood,
          format: 'portrait'
        }),
      });
      
      const data = await response.json();
      if (data.success) {
        setGeneratedImage(data.base64Data);
        await trackGeneration(topic, platform, data.base64Data);
        clearDraft();
      }
    } catch (error) {
      console.error("Render failed:", error);
    } finally {
      setIsRendering(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCopy);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 relative">
      {/* Header Pipeline */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold text-text-primary tracking-tight mb-2">Content Pipeline</h1>
          <p className="text-text-secondary/60 text-lg">From raw concept to viral artistic output.</p>
        </div>
        
        <div className="flex items-center gap-4">
           {generatedImage && (
             <button className="flex items-center gap-2 px-6 py-3 bg-surface border border-border-subtle/50 rounded-xl text-text-primary font-bold hover:border-accent/40 transition-all">
                Preview Result
             </button>
           )}
           <button 
             onClick={handleRender}
             disabled={isRendering || !generatedCopy}
             className="flex items-center gap-2 px-8 py-3 bg-accent text-void rounded-xl font-extrabold shadow-glow hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:grayscale disabled:scale-100"
           >
             {isRendering ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
             RENDER FINAL OUTPUT
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT: POST ARCHITECT */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Section 1: Concept & Setup */}
          <div className="bg-surface rounded-card border border-border-subtle/50 p-8 shadow-card relative overflow-hidden group">
            <div className="flex items-center justify-between mb-8">
               <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/10 rounded-lg text-accent">
                     <Cpu className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold text-text-primary/90">Post Architect</h2>
               </div>
            </div>

            {/* Platform Tabs */}
            <div className="flex gap-2 mb-8">
               {['linkedin', 'instagram', 'x', 'tiktok'].map((p) => (
                  <button 
                    key={p}
                    onClick={() => setPlatform(p as any)}
                    className={`px-5 py-2 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all border ${
                       platform === p 
                          ? 'bg-accent/10 border-accent text-accent' 
                          : 'bg-void/30 border-border-subtle/20 text-text-secondary hover:text-white'
                    }`}
                  >
                    {p === 'x' ? 'TWITTER' : p}
                  </button>
               ))}
            </div>

            <textarea 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder={`Raw topic or idea for ${platform}...`}
              className="w-full bg-void/50 border border-border-subtle/50 rounded-2xl p-6 text-text-primary text-xl focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/10 transition-all min-h-[160px] resize-none placeholder:text-text-secondary/20 mb-6"
            />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-4 border-b border-border-subtle/20 mb-8">
               <div className="flex items-center gap-2 bg-void/50 p-1.5 rounded-xl border border-border-subtle/30 w-full sm:w-auto">
                  <span className="text-[10px] font-black text-text-secondary/40 px-3 uppercase tracking-widest">Model Engine</span>
                  <select 
                    value={textModel}
                    onChange={(e) => setTextModel(e.target.value as AIModel)}
                    className="bg-transparent text-[10px] font-bold text-text-secondary px-3 py-1 focus:outline-none cursor-pointer hover:text-white"
                  >
                    <option value="gemini-3-pro">Gemini 3 Pro</option>
                    <option value="gemini-3-flash">Gemini 3 Flash</option>
                    <option value="gemini-2.5-flash">Gemini 2.5</option>
                    <option value="gpt-4o">GPT-4o</option>
                    <option value="gpt-4o-mini">GPT-4o Mini</option>
                  </select>
               </div>
               
               <div className="flex items-center gap-2 bg-void/50 p-1.5 rounded-xl border border-border-subtle/30 w-full sm:w-auto self-end">
                 <button 
                    onClick={handleGenerateHooks}
                    disabled={isGeneratingHooks || !topic}
                    className="flex items-center gap-2 px-6 py-2 bg-accent text-void rounded-lg text-[10px] font-black uppercase tracking-widest shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-30"
                  >
                    {isGeneratingHooks ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                    GENERATE HOOKS
                  </button>
               </div>
            </div>

            {/* Precision & Style: NOW PART OF ARCHITECT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div>
                  <label className="text-[9px] font-black text-text-secondary/60 uppercase tracking-[3px] block mb-4">Precision Level</label>
                  <div className="grid grid-cols-5 gap-1.5 p-1.5 bg-void/50 rounded-xl border border-border-subtle/30">
                     {[
                       { id: 'raw', label: 'Raw' },
                       { id: 'balanced', label: 'Balanced' },
                       { id: 'polished', label: 'Polished' },
                       { id: 'elite', label: 'Elite' },
                       { id: 'viral', label: 'Viral' }
                     ].map((l) => (
                       <button 
                         key={l.id}
                         onClick={() => setLevel(l.id as Level)}
                         className={`py-2 rounded-lg text-[9px] font-black tracking-widest transition-all ${level === l.id ? 'bg-accent text-void shadow-glow' : 'text-text-secondary hover:text-white'}`}
                       >
                         {l.label}
                       </button>
                     ))}
                  </div>
               </div>

               <div>
                  <label className="text-[9px] font-black text-text-secondary/60 uppercase tracking-[3px] block mb-4">Writing Style</label>
                  <div className="grid grid-cols-2 gap-2">
                     {[
                       { id: 'professional', label: 'Professional', icon: <Monitor className="w-3 h-3" /> },
                       { id: 'bold', label: 'Bold', icon: <Zap className="w-3 h-3" /> },
                       { id: 'story', label: 'Story', icon: <Layers className="w-3 h-3" /> },
                       { id: 'curiosity', label: 'Curiosity', icon: <Search className="w-3 h-3" /> },
                       { id: 'sarcastic', label: 'Sarcastic', icon: <Flame className="w-3 h-3" /> },
                       { id: 'motivational', label: 'Hype', icon: <Activity className="w-3 h-3" /> },
                       { id: 'minimal', label: 'Minimal', icon: <Minus className="w-3 h-3" /> },
                       { id: 'conversational', label: 'Relatable', icon: <MessageSquare className="w-3 h-3" /> }
                     ].map((s) => (
                       <button
                         key={s.id}
                         onClick={() => setStyle(s.id as any)}
                         className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${
                           style === s.id 
                             ? 'bg-accent/5 border-accent text-white shadow-[inset_0_0_15px_rgba(16,185,129,0.03)]' 
                             : 'bg-void/10 border-border-subtle/20 text-text-secondary hover:border-accent/40'
                         }`}
                       >
                         <div className={`p-1.5 rounded-lg transition-colors ${style === s.id ? 'bg-accent text-void' : 'bg-void text-accent/30'}`}>
                           {s.icon}
                         </div>
                         <span className="text-[9px] font-black uppercase tracking-tight">{s.label}</span>
                       </button>
                     ))}
                  </div>
               </div>
            </div>
          </div>

          {/* Section 2: Viral Angles */}
          {hooks.length > 0 && (
            <div ref={hooksRef} className="bg-surface rounded-card border border-border-subtle/50 p-8 shadow-card animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-bold text-text-secondary uppercase tracking-widest flex items-center gap-2">
                    <Zap className="w-4 h-4" /> Pick Your Hook
                  </h3>
                  <span className="text-[10px] text-text-secondary/40 italic">Select one to continue</span>
               </div>
               
               <div className="grid grid-cols-1 gap-3 mb-8">
                  {hooks.map((hook, idx) => (
                    <button 
                       key={idx}
                       onClick={() => setSelectedHook(hook)}
                       className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 group ${
                          selectedHook === hook 
                             ? 'bg-accent/5 border-accent shadow-[0_0_20px_rgba(16,185,129,0.05)]' 
                             : 'bg-void/20 border-border-subtle/30 hover:border-accent/30'
                       }`}
                    >
                       <div className="flex items-start gap-4">
                          <div className={`mt-1.5 shrink-0 w-3 h-3 rounded-full border-2 transition-all ${
                             selectedHook === hook ? 'bg-accent border-accent scale-110 shadow-glow' : 'border-text-secondary/20'
                          }`}></div>
                          <p className={`text-sm leading-relaxed transition-colors ${
                             selectedHook === hook ? 'text-text-primary font-medium' : 'text-text-secondary/60 group-hover:text-text-primary/80'
                          }`}>
                            {hook}
                          </p>
                       </div>
                    </button>
                  ))}
               </div>

               {selectedHook && !generatedCopy && (
                 <div className="flex justify-center bg-void/30 p-8 rounded-2xl border border-dashed border-border-subtle/30">
                    <button 
                      onClick={handleGenerateCopy}
                      disabled={isGeneratingCopy}
                      className="flex items-center gap-3 px-8 py-4 bg-accent text-void rounded-xl font-black text-sm shadow-glow hover:scale-105 active:scale-95 transition-all"
                    >
                      {isGeneratingCopy ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
                      GENERATE FULL WRITE-UP
                    </button>
                 </div>
               )}
            </div>
          )}

          {/* Section 3: Final Copy */}
          {generatedCopy && (
             <div className="bg-surface rounded-card border border-border-subtle/50 p-8 shadow-card animate-in fade-in zoom-in-95 duration-500">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-bold text-text-secondary uppercase tracking-widest flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent" /> Generated Copy
                  </h3>
                  <div className="flex gap-2">
                     <button 
                       onClick={copyToClipboard}
                       className="p-2 hover:bg-accent/10 rounded-lg text-text-secondary transition-all relative group"
                     >
                        <Copy className={`w-4 h-4 ${copyFeedback ? 'text-accent' : ''}`} />
                        {copyFeedback && <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] bg-accent text-void px-2 py-1 rounded font-bold">Copied!</span>}
                     </button>
                  </div>
                </div>
                
                <div className="bg-void/60 rounded-2xl p-8 border border-border-subtle/40">
                  <pre className="text-text-primary/90 text-base leading-loose whitespace-pre-wrap font-sans italic opacity-90">
                    {generatedCopy}
                  </pre>
                </div>
                
                <div className="mt-8 pt-8 border-t border-border-subtle/20 flex flex-col sm:flex-row items-center justify-between gap-6">
                   <div className="flex items-center gap-3 text-text-secondary/40">
                      <Zap className="w-4 h-4" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Post is ready for rendering</span>
                   </div>
                   <button 
                      onClick={() => setGeneratedCopy("")}
                      className="text-[10px] font-bold text-text-secondary/40 hover:text-accent transition-colors flex items-center gap-2 uppercase tracking-tighter"
                    >
                      <RefreshCw className="w-3 h-3" /> Re-generate Copy
                    </button>
                </div>
             </div>
          )}

        </div>

        {/* RIGHT: ARTISTIC DIRECTION */}
        <div className="lg:col-span-4 space-y-8">
          
          <div className="bg-surface rounded-card border border-border-subtle/50 p-8 shadow-card">
            <div className="flex items-center justify-between mb-10">
               <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/10 rounded-lg text-accent">
                     <Palette className="w-5 h-5" />
                  </div>
                  <h2 className="text-lg font-bold text-text-primary/80">Art Direction</h2>
               </div>
            </div>

            {/* Image Model */}
            <div className="mb-10">
               <label className="text-[10px] font-bold text-text-secondary uppercase tracking-[2px] block mb-4">Rendering Engine</label>
               <div className="flex items-center gap-2 bg-void/50 p-1 rounded-xl border border-border-subtle/30 overflow-hidden">
                  <select 
                    value={imageModel}
                    onChange={(e) => setImageModel(e.target.value as AIModel)}
                    className="w-full bg-transparent text-[10px] font-bold text-text-secondary px-4 py-2.5 focus:outline-none cursor-pointer"
                  >
                    <option value="gpt-4o-mini">GPT-4o Mini</option>
                    <option value="gpt-4o">GPT-4o</option>
                    <option value="gemini-3-flash">Gemini 3 Flash</option>
                  </select>
               </div>
            </div>

            {/* Visual Persona / Mood */}
            <div className="space-y-3 mb-10">
               <label className="text-[10px] font-bold text-text-secondary uppercase tracking-[2px] block mb-4">Visual Look</label>
               {[
                 { id: 'cinematic', label: 'Cinematic High-Key', icon: <Layers className="w-3 h-3" /> },
                 { id: 'tech', label: 'Futuristic Tech', icon: <Monitor className="w-3 h-3" /> },
                 { id: 'abstract', label: 'Minimal Abstract', icon: <Palette className="w-3 h-3" /> },
                 { id: 'raw', label: 'Gritty Raw', icon: <Zap className="w-3 h-3" /> }
               ].map((v) => (
                 <button
                   key={v.id}
                   onClick={() => setVisualMood(v.id)}
                   className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${
                     visualMood === v.id 
                       ? 'bg-accent/5 border-accent text-white shadow-[0_0_15px_rgba(16,185,129,0.1)]' 
                       : 'bg-void/10 border-border-subtle/20 text-text-secondary hover:border-accent/40'
                   }`}
                 >
                   <div className={`p-2 rounded-lg transition-colors ${visualMood === v.id ? 'bg-accent text-void' : 'bg-void text-accent/30'}`}>
                     {v.icon}
                   </div>
                   <span className="text-[10px] font-bold uppercase tracking-tight">{v.label}</span>
                 </button>
               ))}
            </div>

            {/* Visual Options */}
            <div className="space-y-6 pt-8 border-t border-border-subtle/20">
               <div className="flex flex-col gap-2">
                  <span className="text-[9px] font-black text-text-secondary/40 uppercase tracking-widest">Layout Mode</span>
                  <select 
                    value={layout} 
                    onChange={(e) => setLayout(e.target.value)}
                    className="w-full bg-void/50 border border-border-subtle/30 rounded-lg px-3 py-2 text-[10px] font-bold text-accent focus:outline-none"
                  >
                    <option value="composite-hero">Composite Hero</option>
                    <option value="grid-minimal">Grid Minimal</option>
                    <option value="split-story">Split Story</option>
                  </select>
               </div>
               <div className="flex flex-col gap-2">
                  <span className="text-[9px] font-black text-text-secondary/40 uppercase tracking-widest">Theme Visuals</span>
                  <select 
                    value={theme} 
                    onChange={(e) => setTheme(e.target.value)}
                    className="w-full bg-void/50 border border-border-subtle/30 rounded-lg px-3 py-2 text-[10px] font-bold text-accent focus:outline-none"
                  >
                    <option value="orbit">Orbit Dark</option>
                    <option value="emerald">Emerald Neon</option>
                    <option value="glass">Glassmorphism</option>
                  </select>
               </div>
            </div>
          </div>

        </div>

      </div>
      
      {/* Scroll Indicator or Status */}
      <div className="mt-12 flex justify-center">
         <div className="flex items-center gap-6 px-8 py-3 bg-surface/50 rounded-full border border-border-subtle/30 backdrop-blur-md">
            <div className="flex items-center gap-2">
               <div className={`w-2 h-2 rounded-full ${isGeneratingHooks || isGeneratingCopy || isRendering ? 'bg-accent animate-pulse' : 'bg-accent'}`}></div>
               <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">
                  {isGeneratingHooks ? "Drafting Viral Hooks..." : isGeneratingCopy ? "Architecting Full Copy..." : isRendering ? "Rendering High-Fidelity Output..." : "Engine Ready"}
               </span>
            </div>
         </div>
      </div>

      {/* Preview Area */}
      {generatedImage && (
        <div className="mt-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
           <div className="bg-surface rounded-card border border-border-subtle/50 p-1 bg-[url('/grain.png')] bg-repeat">
             <img 
               src={`data:image/png;base64,${generatedImage}`} 
               alt="Generated Post" 
               className="w-full rounded-2xl shadow-2xl"
             />
           </div>
        </div>
      )}
    </div>
  );
}
