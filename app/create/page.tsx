"use client";
import { Layers } from "lucide-react";

export default function CreatePipeline() {
  return (
    <div className="animate-in fade-in duration-500 slide-in-from-bottom-4">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-2">Content Pipeline</h1>
          <p className="text-foreground/50 text-sm">Generate elite hooks and render Gamma-style composites.</p>
        </div>
        <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-glow hover:scale-[1.02] active:scale-95">
          Generate Output
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
        <div className="lg:col-span-8 bg-card border border-border rounded-card p-8 shadow-card-inner group hover:border-primary/30 transition-all duration-300 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <h2 className="text-xl font-medium mb-6 text-white/90">Topic & Parameters</h2>
          <textarea 
            placeholder="What are we talking about today? (e.g., Gym personalities that make people uncomfortable)"
            className="w-full h-40 bg-surface border border-border rounded-2xl p-4 text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none placeholder:text-foreground/30"
          ></textarea>
        </div>

        <div className="lg:col-span-4 bg-card border border-border rounded-card p-8 shadow-card-inner transition-all duration-300">
          <h2 className="text-xl font-medium mb-6 text-white/90">Engine Settings</h2>
          <div className="space-y-4">
            <div className="h-12 bg-surface rounded-xl border border-border flex items-center justify-between px-4 text-sm">
              <span className="text-foreground/50">Platform</span>
              <span className="text-white font-medium">LinkedIn</span>
            </div>
            <div className="h-12 bg-surface rounded-xl border border-border flex items-center justify-between px-4 text-sm">
              <span className="text-foreground/50">Output Level</span>
              <span className="text-primary font-medium">Elite</span>
            </div>
            <div className="h-12 bg-surface rounded-xl border border-border flex items-center justify-between px-4 text-sm">
              <span className="text-foreground/50">Layout Mode</span>
              <span className="text-white font-medium">Composite Hero</span>
            </div>
            <div className="h-12 bg-surface rounded-xl border border-border flex items-center justify-between px-4 text-sm">
              <span className="text-foreground/50">Theme Visuals</span>
              <span className="text-white font-medium">Orbit</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-12 h-96 bg-[#030408] border border-border rounded-[2.5rem] p-8 mt-4 relative overflow-hidden group border-dashed flex items-center justify-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="text-center z-10">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-4 border border-primary/20">
              <Layers className="w-8 h-8 text-primary opacity-80" />
            </div>
            <h3 className="text-xl font-medium text-white/90 mb-2">Awaiting Generation</h3>
            <p className="text-foreground/50 text-sm">Your final presentation graphic will render here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
