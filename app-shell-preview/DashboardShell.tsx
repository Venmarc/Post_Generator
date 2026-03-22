"use client";

import React, { useState } from "react";
import { 
  Home, 
  Settings, 
  Layers, 
  PenTool, 
  BarChart2, 
  Search, 
  Bell, 
  Menu
} from "lucide-react";

export default function DashboardShell() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-background text-foreground flex overflow-hidden font-sans selection:bg-primary/30">
      
      {/* LEFT SIDEBAR (Desktop) */}
      <aside className="hidden md:flex flex-col w-[80px] h-screen border-r border-border bg-[#030408] py-8 items-center justify-between z-20">
        <div className="flex flex-col items-center space-y-8">
          {/* Logo / Brand */}
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/50 overflow-hidden shadow-[0_0_15px_rgba(124,58,237,0.5)]">
            <Layers className="text-primary w-5 h-5" />
          </div>

          {/* Navigation vertical stack */}
          <nav className="flex flex-col space-y-6 mt-8">
            <SidebarIcon icon={<Home />} active />
            <SidebarIcon icon={<PenTool />} />
            <SidebarIcon icon={<BarChart2 />} />
          </nav>
        </div>

        {/* Bottom actions */}
        <div className="flex flex-col space-y-6 text-muted-foreground">
          <SidebarIcon icon={<Settings />} />
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        
        {/* TOP HEADER */}
        <header className="h-[80px] w-full border-b border-border flex items-center justify-between px-6 lg:px-10 bg-background/80 backdrop-blur-md z-10">
          
          {/* Mobile hamburger */}
          <button 
            className="md:hidden text-foreground/70 hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Top Nav Tabs */}
          <div className="hidden md:flex space-x-8 h-full items-center">
            <Tab label="Overview" isActive={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
            <Tab label="Presets" isActive={activeTab === 'presets'} onClick={() => setActiveTab('presets')} />
            <Tab label="Generations" isActive={activeTab === 'generations'} onClick={() => setActiveTab('generations')} />
            <Tab label="Integrations" isActive={activeTab === 'integrations'} onClick={() => setActiveTab('integrations')} />
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-6">
            <div className="relative hidden sm:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" />
              <input 
                type="text" 
                placeholder="Search posts..." 
                className="bg-[#0A0D14] border border-border rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary w-64 transition-all"
              />
            </div>
            <button className="relative text-foreground/60 hover:text-foreground transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full"></span>
            </button>
            <div className="w-9 h-9 rounded-full bg-linear-to-tr from-primary to-blue-500 cursor-pointer border border-border/50 hover:shadow-hover-glow transition-all"></div>
          </div>
        </header>

        {/* SCROLLABLE MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 lg:p-12 pb-24">
          <div className="max-w-[1600px] mx-auto">
            
            {/* Title Section */}
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-2">Social Asset Lab</h1>
                <p className="text-foreground/50 text-sm">Engine status: Elite bounds active. Awaiting prompt.</p>
              </div>
              <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:shadow-hover-glow hover:scale-[1.02] active:scale-95">
                + New Generation
              </button>
            </div>

            {/* Asymmetric Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
              
              {/* Main Input / Prompt Card (Spans 8 cols) */}
              <div className="lg:col-span-8 bg-card border border-border rounded-3xl p-8 shadow-card-inner relative overflow-hidden group hover:border-primary/30 transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <h2 className="text-xl font-medium mb-6 text-white/90">Input your topic here</h2>
                <div className="w-full h-40 border border-dashed border-border/60 rounded-2xl flex items-center justify-center text-foreground/40 bg-background/30 group-hover:bg-background/50 transition-colors cursor-pointer">
                  Topic, parameters, and constraints...
                </div>
              </div>

              {/* Quick Settings / Outputs (Spans 4 cols) */}
              <div className="lg:col-span-4 bg-card border border-border rounded-3xl p-8 shadow-card-inner hover:shadow-hover-glow hover:scale-[1.01] transition-all duration-300">
                <h2 className="text-xl font-medium mb-6 text-white/90">Engine Settings</h2>
                <div className="space-y-4">
                  <div className="h-12 bg-background/50 rounded-xl border border-border flex items-center px-4 text-foreground/60 text-sm">
                    Platform: LinkedIn
                  </div>
                  <div className="h-12 bg-background/50 rounded-xl border border-border flex items-center px-4 text-primary text-sm font-medium">
                    Level: Elite (Strict Constraints)
                  </div>
                  <div className="h-12 bg-background/50 rounded-xl border border-border flex items-center px-4 text-foreground/60 text-sm">
                    Theme: Orbit + 3D Render
                  </div>
                </div>
              </div>

              {/* Generated Hooks Preview (Spans 12 cols, wide) */}
              <div className="lg:col-span-12 bg-card border border-border rounded-4xl p-8 shadow-card-inner mt-4">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-medium text-white/90">Generated hooks preview</h2>
                  <span className="text-xs font-medium px-3 py-1 bg-primary/20 text-primary rounded-full border border-primary/30">
                    Live
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Hook Cards */}
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-6 rounded-2xl bg-background/40 border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 cursor-pointer">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                          {i}
                        </div>
                      </div>
                      <p className="text-foreground/80 text-sm leading-relaxed">
                        A perfectly generated, psychologically grounded hook that exposes a painful reality.
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Final Output View (Spans 12 cols) */}
              <div className="lg:col-span-12 h-96 bg-[#030408] border border-border rounded-[2.5rem] p-8 shadow-card-inner flex items-center justify-center mt-4 relative overflow-hidden group">
                 {/* Decorative background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>
                <div className="text-center z-10">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-4 border border-primary/20">
                    <Layers className="w-8 h-8 text-primary opacity-80" />
                  </div>
                  <h3 className="text-xl font-medium text-white/90 mb-2">Platform outputs</h3>
                  <p className="text-foreground/50 text-sm">Generate your hooks to unlock the presentation board.</p>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>

      {/* MOBILE BOTTOM NAV */}
      <div className="md:hidden fixed bottom-0 left-0 w-full h-[70px] bg-card border-t border-border flex z-50 px-6 justify-between items-center pb-safe">
        <MobileNavIcon icon={<Home />} active />
        <MobileNavIcon icon={<PenTool />} />
        <MobileNavIcon icon={<BarChart2 />} />
        <MobileNavIcon icon={<Settings />} />
      </div>

    </div>
  );
}

// ---------------------------------------------------------
// Helper sub-components (Tailwind styled)
// ---------------------------------------------------------

function SidebarIcon({ icon, active = false }: { icon: React.ReactNode, active?: boolean }) {
  return (
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300 group relative
      ${active ? 'bg-primary/10 text-primary shadow-[inset_0_0_10px_rgba(124,58,237,0.1)]' : 'text-foreground/40 hover:text-foreground/90 hover:bg-white/5'}
    `}>
      {active && <div className="absolute left-0 w-1 h-6 bg-primary rounded-r-full shadow-[0_0_10px_rgba(124,58,237,0.8)]"></div>}
      <div className={`transform transition-transform ${active ? 'scale-110' : 'group-hover:scale-110'}`}>
        {icon}
      </div>
    </div>
  );
}

function Tab({ label, isActive, onClick }: { label: string, isActive: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`relative h-full flex items-center text-sm font-medium transition-colors
        ${isActive ? 'text-white' : 'text-foreground/50 hover:text-foreground/80'}
      `}
    >
      {label}
      {isActive && (
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary shadow-[0_0_8px_rgba(124,58,237,0.8)]"></div>
      )}
    </button>
  );
}

function MobileNavIcon({ icon, active = false }: { icon: React.ReactNode, active?: boolean }) {
  return (
    <div className={`p-3 rounded-xl transition-all
      ${active ? 'text-primary bg-primary/10' : 'text-foreground/50'}
    `}>
      {icon}
    </div>
  );
}
