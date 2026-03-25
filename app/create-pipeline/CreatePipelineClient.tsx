"use client";

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Image from 'next/image';
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
  MessageSquare,
  ChevronDown,
  Beaker,
  Download,
  RotateCcw,
  Star
} from 'lucide-react';
import { useDraft } from '@/lib/drafts';
import { useTelemetry } from '@/lib/storage';
import { platformPresets } from '@/lib/presets';
import { AIModel, Platform, Style, Level } from '@/lib/ai';
import { TEST_LINKED_POST } from '@/lib/test-data';

import { User } from "@supabase/supabase-js";

export default function CreatePipelineClient({ user }: { user: User }) {
  const { topic, setTopic, platform: draftPlatform, setPlatform, clearDraft, isHydrated: draftReady } = useDraft();
  
  const platform = (draftPlatform?.toLowerCase() as Platform) || 'linkedin';

  const [isGeneratingHooks, setIsGeneratingHooks] = useState(false);
  const [isGeneratingCopy, setIsGeneratingCopy] = useState(false);
  const [isRendering, setIsRendering] = useState(false);
  
  const [hooks, setHooks] = useState<string[]>([]);
  const [selectedHook, setSelectedHook] = useState<string | null>(null);
  const [generatedCopy, setGeneratedCopy] = useState<string>("");
  
  const [textModel, setTextModel] = useState<AIModel>('gemini-3-pro');
  const [imageModel, setImageModel] = useState<AIModel>('gemini-3-flash');
  const [level, setLevel] = useState<Level>('balanced');
  const [style, setStyle] = useState<Style>('professional');
  
  const [layout, setLayout] = useState('floating-collage');
  const [theme, setTheme] = useState('cosmic-nebula');
  const [visualMood, setVisualMood] = useState('cinematic');
  
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [copyFeedback, setCopyFeedback] = useState(false);
  
  const { trackGeneration, trackExport } = useTelemetry();
  const hooksRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (hooks.length > 0 && hooksRef.current) {
      hooksRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [hooks]);

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
      if (data.success) {
        setHooks(data.hooks);
      } else {
        console.error("Hook generation error:", data.error);
        alert("Artenova Architect Error: " + (data.error || "Quota exhausted or timeout."));
      }
    } catch (error: any) {
      console.error("Hook generation failed:", error);
      alert("System Failure: " + (error.message || "Unknown error"));
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
      if (data.success) {
        setGeneratedCopy(data.content);
      } else {
        console.error("Copy generation error:", data.error);
        alert("Artenova Synthesis Error: " + (data.error || "Provider failure."));
      }
    } catch (error: any) {
      console.error("Copy generation failed:", error);
      alert("System Failure: " + (error.message || "Unknown error"));
    } finally {
      setIsGeneratingCopy(false);
    }
  };

  const handleRender = async () => {
    if (!generatedCopy || isRendering) return;
    setIsRendering(true);
    setShowSuccess(false);
    
    const startTime = Date.now();

    const heartbeat = setInterval(() => {
      const elapsed = Math.round((Date.now() - startTime) / 1000);
      if (elapsed % 5 === 0 && elapsed > 0) {
        // Heartbeat kept for future monitoring if needed.
      }
    }, 1000);
    
    try {
      const response = await fetch("/api/generate-composite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          copy: generatedCopy,
          theme,
          mood: visualMood,
          layout
        }),
      });
      
      const data = await response.json();
      clearInterval(heartbeat);

      if (data.success) {
        setGeneratedImage(data.image);
        await trackGeneration(topic, platform, data.image);
        setShowSuccess(true);
        
        setTimeout(() => {
          previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
      } else {
        alert("Rendering failed: " + data.error);
      }
    } catch (error: any) {
      clearInterval(heartbeat);
      console.error("Render failed:", error);
      alert("Render failed: " + error.message);
    } finally {
      setIsRendering(false);
    }
  };

  const handleLoadTestData = () => {
    setTopic("Modern Web Architecture in 2026");
    setPlatform("linkedin");
    setSelectedHook("The future of software isn't built on servers. It's built on agents.");
    setGeneratedCopy("The future of software isn't built on servers. It's built on agents.\n\nWe spent decades focusing on infrastructure, latency, and scale. In 2026, those are solved problems.\n\nThe new bottleneck is cognitive load. \n\nWe don't need faster APIs. We need smarter intent mapping. \n\n#SoftwareEngineering #AI #Agents #FutureOfWork");
  };

  const handleClearPipeline = () => {
    setTopic("");
    setHooks([]);
    setSelectedHook(null);
    setGeneratedCopy("");
    setGeneratedImage(null);
    setShowSuccess(false);
    clearDraft();
  };

  const handleDownloadImage = () => {
    if (!generatedImage) return;
    const link = document.createElement("a");
    link.href = `data:image/png;base64,${generatedImage}`;
    link.download = `artistic-composite-${Date.now()}.png`;
    link.click();
    trackExport(topic, platform);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCopy);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  const CustomSelect = ({ 
    label, 
    value, 
    options, 
    onChange, 
    columns = 1 
  }: { 
    label?: string, 
    value: string, 
    options: { id: string, label: string, icon?: React.ReactNode, desc?: string }[], 
    onChange: (id: any) => void,
    columns?: number
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedOption = options.find(o => o.id === value);

    return (
      <div className="relative group/dropdown" ref={dropdownRef}>
        {label && <label className="text-[9px] font-black text-text-secondary/60 uppercase tracking-[3px] block mb-3">{label}</label>}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between px-4 py-3 bg-void/40 border rounded-xl transition-all duration-300 ${isOpen ? 'border-accent shadow-glow bg-void/60' : 'border-border-subtle/30 hover:border-accent/40'}`}
        >
          <div className="flex items-center gap-3">
             {selectedOption?.icon && <div className="text-accent">{selectedOption.icon}</div>}
             <span className="text-[10px] font-black uppercase tracking-widest text-text-primary/90">{selectedOption?.label || value}</span>
          </div>
          <ChevronDown className={`w-3 h-3 text-text-secondary/40 transition-transform duration-300 ${isOpen ? 'rotate-180 text-accent' : ''}`} />
        </button>

        {isOpen && (
          <div className={`absolute z-100 mt-2 p-2 bg-surface/95 border border-accent/20 rounded-2xl shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200 min-w-full ${columns === 2 ? 'w-80' : 'w-full'}`}>
            <div className={`grid gap-1 ${columns === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
               {options.map((opt) => (
                 <button
                   key={opt.id}
                   onClick={() => {
                     onChange(opt.id);
                     setIsOpen(false);
                   }}
                   className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                     value === opt.id 
                       ? 'bg-accent/10 text-accent font-black border border-accent/20' 
                       : 'text-text-secondary hover:bg-void/40 hover:text-white'
                   }`}
                 >
                    {opt.icon && <div className={`p-1 rounded transition-colors ${value === opt.id ? 'text-accent' : 'text-text-secondary/40'}`}>{opt.icon}</div>}
                    <div className="flex flex-col text-left">
                      <span className="text-[9px] font-black uppercase tracking-tight">{opt.label}</span>
                      {opt.desc && <span className="text-[7px] opacity-40 lowercase leading-tight">{opt.desc}</span>}
                    </div>
                  </button>
               ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-void text-foreground selection:bg-accent/30">
      <div className="max-w-7xl mx-auto px-6 py-12 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-bold text-text-primary mb-2 uppercase tracking-[3px]">Artenova Pipeline</h1>
            <p className="text-text-secondary/60 text-lg italic">From raw concept to viral artistic output.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={handleClearPipeline}
              className="flex items-center gap-2 px-6 py-3 bg-surface border border-border-subtle/50 rounded-xl text-text-secondary font-bold hover:text-red-400 hover:border-red-400/40 transition-all opacity-60 hover:opacity-100"
            >
               <RotateCcw className="w-4 h-4" />
               Clear & Start New
            </button>
            
            <button 
              onClick={handleRender}
              disabled={isRendering || !generatedCopy}
              className="flex items-center gap-2 px-8 py-3 bg-accent text-void rounded-xl font-extrabold shadow-glow hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:grayscale disabled:scale-100"
            >
              {isRendering ? <Loader2 className="w-5 h-5 animate-spin" /> : <Star className="w-5 h-5" />}
              {isRendering ? "Rendering Gamma Composite..." : "Generate Artistic Composite"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: POST ARCHITECT */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-surface rounded-card border border-border-subtle/50 p-8 shadow-card relative group z-20">
              <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent/10 rounded-lg text-accent">
                       <Cpu className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-bold text-text-primary/90 uppercase tracking-widest">Artenova Architect</h2>
                 </div>
                 <button 
                   onClick={handleLoadTestData}
                   className="flex items-center gap-2 px-3 py-1.5 bg-void/40 border border-border-subtle/30 rounded-lg text-[9px] font-black text-text-secondary hover:text-accent hover:border-accent/40 transition-all uppercase tracking-widest"
                 >
                   <Beaker className="w-3 h-3" />
                   Load Test
                 </button>
              </div>

              <div className="flex items-center justify-between mb-8">
                  <div className="flex gap-2">
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
               </div>

              <textarea 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder={`What's on your mind for ${platform}?`}
                className="w-full bg-void/50 border border-border-subtle/50 rounded-2xl p-6 text-text-primary text-xl focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/10 transition-all min-h-[160px] resize-none placeholder:text-text-secondary/20 mb-6"
              />

              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-4 border-b border-border-subtle/20 mb-8">
                 <div className="w-full sm:w-auto min-w-[200px]">
                    <CustomSelect 
                      value={textModel}
                      onChange={setTextModel}
                      options={[
                        { id: 'gemini-3-pro', label: 'Gemini 3 Pro', icon: <Cpu className="w-3 h-3" /> },
                        { id: 'gemini-3-flash', label: 'Gemini 3 Flash', icon: <Cpu className="w-3 h-3" /> },
                        { id: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash', icon: <Cpu className="w-3 h-3" /> },
                        { id: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro', icon: <Cpu className="w-3 h-3" /> },
                        { id: 'gpt-4o', label: 'GPT-4o', icon: <Cpu className="w-3 h-3" /> },
                        { id: 'gpt-4o-mini', label: 'GPT-4o Mini', icon: <Cpu className="w-3 h-3" /> },
                        { id: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo', icon: <Cpu className="w-3 h-3" /> }
                      ]}
                    />
                 </div>
                 
                 <div className="flex items-center gap-2 w-full sm:w-auto">
                   <button 
                      onClick={handleGenerateHooks}
                      disabled={isGeneratingHooks || !topic}
                      className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-8 py-3 bg-accent text-void rounded-xl text-[10px] font-black uppercase tracking-widest shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-30"
                    >
                      {isGeneratingHooks ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                      GENERATE HOOKS
                    </button>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <CustomSelect 
                   label="Precision Level"
                   value={level}
                   onChange={setLevel}
                   options={[
                     { id: 'raw', label: 'Raw / Fast' },
                     { id: 'balanced', label: 'Balanced' },
                     { id: 'polished', label: 'Polished' },
                     { id: 'elite', label: 'Elite / Razor' },
                     { id: 'viral', label: 'Viral Candidate' }
                   ]}
                 />

                 <CustomSelect 
                   label="Writing Style"
                   value={style}
                   onChange={setStyle}
                   columns={2}
                   options={[
                     { id: 'professional', label: 'Professional', icon: <Monitor className="w-3 h-3" /> },
                     { id: 'bold', label: 'Bold', icon: <Zap className="w-3 h-3" /> },
                     { id: 'story', label: 'Story', icon: <Layers className="w-3 h-3" /> },
                     { id: 'curiosity', label: 'Curiosity', icon: <Search className="w-3 h-3" /> },
                     { id: 'sarcastic', label: 'Sarcastic', icon: <Flame className="w-3 h-3" /> },
                     { id: 'motivational', label: 'Hype / Motivation', icon: <Zap className="w-3 h-3" /> },
                     { id: 'minimal', label: 'Minimal', icon: <Palette className="w-3 h-3" /> },
                     { id: 'conversational', label: 'Relatable', icon: <MessageSquare className="w-3 h-3" /> }
                   ]}
                 />
              </div>
            </div>

            {hooks.length > 0 && (
              <div ref={hooksRef} className="bg-surface rounded-card border border-border-subtle/50 p-8 shadow-card animate-in fade-in slide-in-from-bottom-4 duration-500">
                 <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-bold text-text-secondary uppercase tracking-widest flex items-center gap-2">
                      <Zap className="w-4 h-4" /> Pick Your Hook
                    </h3>
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
               </div>
            )}
          </div>

          {/* RIGHT: ARTISTIC DIRECTION */}
          <div className="lg:col-span-4 space-y-8 relative z-10">
            <div className="bg-surface rounded-card border border-border-subtle/50 p-8 shadow-card relative z-30">
              <div className="flex items-center gap-3 mb-10">
                 <div className="p-2 bg-accent/10 rounded-lg text-accent">
                    <Palette className="w-5 h-5" />
                 </div>
                 <h2 className="text-lg font-bold text-text-primary/80 uppercase tracking-widest">Artenova Direction</h2>
              </div>

              <div className="space-y-8">
                 <CustomSelect 
                   label="Engine Settings"
                   value={imageModel}
                   onChange={setImageModel}
                   options={[
                     { id: 'gemini-3-flash', label: 'Gemini 3 Flash', icon: <Cpu className="w-3 h-3" /> },
                     { id: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash', icon: <Cpu className="w-3 h-3" /> },
                     { id: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro', icon: <Cpu className="w-3 h-3" /> },
                     { id: 'gpt-4o-mini', label: 'GPT-4o Mini', icon: <Cpu className="w-3 h-3" /> }
                   ]}
                 />

                 <CustomSelect 
                   label="Artistic Visual Vibe"
                   value={visualMood}
                   onChange={setVisualMood}
                   columns={1}
                   options={[
                     { id: "cinematic", label: "Cinematic", icon: <Layers className="w-3 h-3" />, desc: "Dramatic lighting" },
                     { id: "glassmorphic", label: "Glossy Glass", icon: <Monitor className="w-3 h-3" />, desc: "Frosted glass overlay" },
                     { id: "cosmic", label: "Cosmic Nebula", icon: <Palette className="w-3 h-3" />, desc: "Deep space vibes" },
                     { id: "minimal", label: "Pure Minimal", icon: <Monitor className="w-3 h-3" />, desc: "Clean & high contrast" },
                     { id: "neon", label: "Neon Cyber", icon: <Zap className="w-3 h-3" />, desc: "Vibrant electric glow" }
                   ]}
                 />

                 <CustomSelect 
                   label="Layout Mode"
                   value={layout}
                   onChange={setLayout}
                   options={[
                     { id: 'floating-collage', label: 'Floating Collage' },
                     { id: 'single-center', label: 'Single Focus' },
                     { id: 'split-grid', label: 'Split Grid' }
                   ]}
                 />

                 <CustomSelect 
                   label="Theme Visuals"
                   value={theme}
                   onChange={setTheme}
                   options={[
                     { id: 'cosmic-nebula', label: 'Cosmic Nebula' },
                     { id: 'botanical-modern', label: 'Botanical Abstract' },
                     { id: 'minimal-noir', label: 'Minimal Noir' },
                     { id: 'vibrant-gradient', label: 'Vibrant Gradient' }
                   ]}
                 />
              </div>
            </div>

            {/* Preview and Downloads */}
            {generatedImage && (
              <div ref={previewRef} className="bg-surface rounded-card border border-border-subtle/50 p-6 shadow-card animate-in fade-in slide-in-from-right-4">
                 <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xs font-bold text-text-primary uppercase tracking-widest">Composite Output</h3>
                    <button 
                      onClick={handleDownloadImage}
                      className="p-2 bg-accent/20 text-accent rounded-lg hover:bg-accent/30 transition-all"
                      title="Download PNG"
                    >
                       <Download className="w-4 h-4" />
                    </button>
                 </div>
                 
                 <div className="relative group rounded-xl overflow-hidden shadow-2xl border border-white/5">
                      <div className="relative w-full h-[300px] overflow-hidden">
                        <Image 
                          src={`data:image/png;base64,${generatedImage}`} 
                          alt="Composite Result" 
                          fill
                          className="object-contain group-hover:scale-[1.02] transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, 80vw"
                        />
                      </div>
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-linear-to-t from-black/80 to-transparent flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                       <button 
                         onClick={handleDownloadImage}
                         className="flex items-center gap-2 px-4 py-2 bg-accent text-void rounded-lg font-bold text-[10px] uppercase"
                       >
                          <Download className="w-3 h-3" />
                          Save High-Res PNG
                       </button>
                    </div>
                 </div>
                 
                 {showSuccess && (
                   <div className="mt-4 py-3 bg-accent/10 border border-accent/20 rounded-xl flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-3 h-3 text-accent" />
                      <span className="text-[9px] font-bold text-accent uppercase tracking-widest text-center">Masterpiece Rendered</span>
                   </div>
                 )}
              </div>
            )}
          </div>
        </div>

        {/* Global UI Loading Bar */}
        {(isGeneratingHooks || isGeneratingCopy || isRendering) && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
             <div className="flex items-center gap-4 px-8 py-4 bg-surface/80 border border-accent/40 rounded-2xl backdrop-blur-2xl shadow-glow animate-in slide-in-from-bottom-8">
                <Loader2 className="w-5 h-5 text-accent animate-spin" />
                <span className="text-xs font-bold text-text-primary uppercase tracking-widest">
                   {isGeneratingHooks ? "Synthesizing Scroll-Stopping Hooks..." : isGeneratingCopy ? "Drafting Viral Narrative..." : "Rendering Gamma Composite..."}
                </span>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
