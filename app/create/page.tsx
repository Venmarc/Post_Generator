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
  MessageSquare,
  ChevronDown,
  Beaker,
  Download,
  RotateCcw
} from 'lucide-react';
import { useDraft } from '../../lib/drafts';
import { useTelemetry } from '../../lib/storage';
import { platformPresets } from '../../lib/presets';
import { AIModel, Platform, Style, Level } from '../../lib/ai';
import { TEST_LINKED_POST } from '../../lib/test-data';

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
  const [imageModel, setImageModel] = useState<AIModel>('gemini-3-flash');
  const [level, setLevel] = useState<Level>('balanced');
  const [style, setStyle] = useState<Style>('professional');
  
  const [layout, setLayout] = useState('composite-hero');
  const [theme, setTheme] = useState('orbit');
  const [visualMood, setVisualMood] = useState('cinematic');
  
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [pexelsKey, setPexelsKey] = useState("");
  
  const { trackGeneration, trackExport } = useTelemetry();
  
  const hooksRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [showSuccess, setShowSuccess] = useState(false);

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
    setShowSuccess(false);
    
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
          pexelsKey: pexelsKey,
          format: 'portrait'
        }),
      });
      
      const data = await response.json();
      if (data.success) {
        setGeneratedImage(data.base64Data);
        await trackGeneration(topic, platform, data.base64Data);
        clearDraft();
        setShowSuccess(true);
        
        // Smooth scroll to preview
        setTimeout(() => {
          previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
      }
    } catch (error) {
      console.error("Render failed:", error);
    } finally {
      setIsRendering(false);
    }
  };

  const handleLoadTestData = () => {
    setTopic("Technical Leadership vs. Management");
    setPlatform("linkedin");
    setSelectedHook("The subtle art of technical leadership isn't just about code complexity.");
    setGeneratedCopy(TEST_LINKED_POST);
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
    link.download = `social-post-${Date.now()}.png`;
    link.click();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCopy);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  // Reusable Dropdown Component
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

    // Close when clicking outside
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
    <div className="max-w-7xl mx-auto px-6 py-12 relative">
      {/* Header Pipeline */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold text-text-primary tracking-tight mb-2">Content Pipeline</h1>
          <p className="text-text-secondary/60 text-lg">From raw concept to viral artistic output.</p>
        </div>
        
        <div className="flex items-center gap-4">
           {generatedImage && (
             <div className="flex items-center gap-2">
                <button 
                  onClick={handleDownloadImage}
                  className="flex items-center gap-2 px-6 py-3 bg-surface border border-border-subtle/50 rounded-xl text-accent font-bold hover:border-accent/40 hover:bg-accent/5 transition-all shadow-glow"
                >
                   <Download className="w-4 h-4" />
                   Download Asset
                </button>
             </div>
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
          <div className="bg-surface rounded-card border border-border-subtle/50 p-8 shadow-card relative group z-20">
            <div className="flex items-center justify-between mb-8">
               <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/10 rounded-lg text-accent">
                     <Cpu className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold text-text-primary/90">Post Architect</h2>
               </div>
               <div className="flex items-center gap-2">
                 <button 
                   onClick={handleClearPipeline}
                   className="flex items-center gap-2 px-3 py-1.5 bg-void/40 border border-border-subtle/30 rounded-lg text-[9px] font-black text-text-secondary hover:text-red-400 hover:border-red-400/40 transition-all uppercase tracking-widest"
                   title="Clear All Data"
                 >
                   <RotateCcw className="w-3 h-3" />
                   Clear Flow
                 </button>
                 <button 
                   onClick={handleLoadTestData}
                   className="flex items-center gap-2 px-3 py-1.5 bg-void/40 border border-border-subtle/30 rounded-lg text-[9px] font-black text-text-secondary hover:text-accent hover:border-accent/40 transition-all uppercase tracking-widest"
                   title="Load Developer Test Data"
                 >
                   <Beaker className="w-3 h-3" />
                   Load Test
                 </button>
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
               <div className="w-full sm:w-auto min-w-[180px]">
                  <CustomSelect 
                    value={textModel}
                    onChange={setTextModel}
                    options={[
                      { id: 'gemini-3-pro', label: 'Gemini 3 Pro', icon: <Cpu className="w-3 h-3" /> },
                      { id: 'gemini-3-flash', label: 'Gemini 3 Flash', icon: <Cpu className="w-3 h-3" /> },
                      { id: 'gemini-2.5-flash', label: 'Gemini 2.5', icon: <Cpu className="w-3 h-3" /> },
                      { id: 'gpt-4o', label: 'GPT-4o', icon: <Cpu className="w-3 h-3" /> },
                      { id: 'gpt-4o-mini', label: 'GPT-4o Mini', icon: <Cpu className="w-3 h-3" /> }
                    ]}
                  />
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
                   { id: 'motivational', label: 'Hype / Motivation', icon: <Activity className="w-3 h-3" /> },
                   { id: 'minimal', label: 'Minimal', icon: <Minus className="w-3 h-3" /> },
                   { id: 'conversational', label: 'Relatable', icon: <MessageSquare className="w-3 h-3" /> }
                 ]}
               />
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
        <div className="lg:col-span-4 space-y-8 relative z-10">
          
          <div className="bg-surface rounded-card border border-border-subtle/50 p-8 shadow-card relative z-30">
            <div className="flex items-center justify-between mb-10">
               <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/10 rounded-lg text-accent">
                     <Palette className="w-5 h-5" />
                  </div>
                  <h2 className="text-lg font-bold text-text-primary/80">Art Direction</h2>
               </div>
            </div>

            <div className="mb-10">
               <CustomSelect 
                 label="Engine Settings"
                 value={imageModel}
                 onChange={setImageModel}
                 options={[
                   { id: 'gpt-4o-mini', label: 'GPT-4o Mini', icon: <Cpu className="w-3 h-3" /> },
                   { id: 'gpt-4o', label: 'GPT-4o', icon: <Cpu className="w-3 h-3" /> },
                   { id: 'gemini-3-flash', label: 'Gemini 3 Flash', icon: <Cpu className="w-3 h-3" /> }
                 ]}
               />
            </div>

             <div className="mb-10">
                <CustomSelect 
                  label="Artistic Visual Vibe"
                  value={visualMood}
                  onChange={setVisualMood}
                  columns={2}
                  options={[
                    { id: "clean-void", label: "Clean Void", icon: <Layers className="w-3 h-3" />, desc: "Minimal dark contrast" },
                    { id: "neon-edge", label: "Neon Edge Glow", icon: <Zap className="w-3 h-3" />, desc: "Vibrant neon outlines" },
                    { id: "cosmic-depth", label: "Cosmic Depth", icon: <Palette className="w-3 h-3" />, desc: "Nebula space gradients" },
                    { id: "pastel-haze", label: "Pastel Haze", icon: <Palette className="w-3 h-3" />, desc: "Soft blurred gradients" },
                    { id: "warm-film", label: "Warm Film Grain", icon: <Flame className="w-3 h-3" />, desc: "Sunset analog grain" },
                    { id: "metallic", label: "Metallic Industrial", icon: <Cpu className="w-3 h-3" />, desc: "Cool steel sharp lines" },
                    { id: "organic", label: "Organic Botanical", icon: <Activity className="w-3 h-3" />, desc: "Abstract leaf patterns" },
                    { id: "monochrome", label: "Monochrome Burst", icon: <Palette className="w-3 h-3" />, desc: "Grayscale + accent color" },
                    { id: "glassmorphic", label: "Glassmorphic Overlay", icon: <Monitor className="w-3 h-3" />, desc: "Frosted glass effects" },
                    { id: "noise", label: "Subtle Noise Texture", icon: <Minus className="w-3 h-3" />, desc: "Faint analog texture" },
                    { id: "radial", label: "Radial Energy Pulse", icon: <Zap className="w-3 h-3" />, desc: "Central radiant burst" },
                    { id: "custom", label: "Custom Prompt", icon: <Sparkles className="w-3 h-3" />, desc: "User description" }
                  ]}
                />
                {visualMood === 'custom' && (
                  <div className="mt-4 animate-in fade-in slide-in-from-top-2">
                    <textarea 
                      placeholder="Describe your custom visual look..."
                      className="w-full h-24 bg-void/40 border border-border-subtle/30 rounded-xl px-4 py-3 text-[10px] font-bold text-text-primary focus:outline-none focus:border-accent/40 transition-all resize-none shadow-inner"
                    />
                  </div>
                )}
             </div>

            <div className="space-y-6 pt-8 border-t border-border-subtle/20">
               <CustomSelect 
                 label="Layout Mode"
                 value={layout}
                 onChange={setLayout}
                 options={[
                   { id: 'single-hero', label: 'Single Hero' },
                   { id: 'stacked-vertical', label: 'Stacked Vertical' },
                   { id: 'floating-collage', label: 'Floating Collage' },
                   { id: 'diagonal-flow', label: 'Diagonal Flow' },
                   { id: 'grid-breaks', label: 'Grid with Breaks' },
                   { id: 'presentation-spread', label: 'Presentation Spread' },
                   { id: 'quote-focus', label: 'Quote Focus' }
                 ]}
               />
               <CustomSelect 
                 label="Theme Visuals"
                 value={theme}
                 onChange={setTheme}
                 options={[
                   { id: 'void-cyber', label: 'Void Cyber' },
                   { id: 'cosmic-nebula', label: 'Cosmic Nebula' },
                   { id: 'pastel-dream', label: 'Pastel Dream' },
                   { id: 'botanical-modern', label: 'Botanical Abstract' },
                   { id: 'neon-pulse', label: 'Neon Pulse' },
                   { id: 'minimal-mono', label: 'Minimal Monochrome' },
                   { id: 'warm-sunset', label: 'Warm Sunset' },
                   { id: 'cold-steel', label: 'Cold Steel' },
                   { id: 'grainy-film', label: 'Grainy Film' }
                 ]}
               />

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
        <div ref={previewRef} className="mt-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
           {showSuccess && (
             <div className="mb-6 flex items-center justify-center gap-3 py-4 bg-accent/10 border border-accent/20 rounded-2xl animate-in zoom-in-95">
                <CheckCircle2 className="w-5 h-5 text-accent" />
                <span className="text-sm font-bold text-accent uppercase tracking-widest">Masterpiece Rendered Successfully</span>
             </div>
           )}
           <div className="bg-surface rounded-card border border-border-subtle/50 p-1 bg-[url('/grain.png')] bg-repeat shadow-2xl overflow-hidden">
             <img 
               src={`data:image/png;base64,${generatedImage}`} 
               alt="Generated Post" 
               className="w-full rounded-2xl"
             />
           </div>
        </div>
      )}
    </div>
  );
}
