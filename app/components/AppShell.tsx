"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen w-full bg-void text-foreground flex overflow-hidden font-sans selection:bg-primary/30">
      
      {/* LEFT SIDEBAR (Desktop) */}
      <aside className="hidden md:flex flex-col w-[80px] h-screen border-r border-border bg-[#030408] py-8 items-center justify-between z-20">
        <div className="flex flex-col items-center space-y-8">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/50 overflow-hidden shadow-glow">
            <Layers className="text-primary w-5 h-5" />
          </div>

          <nav className="flex flex-col space-y-6 mt-8">
            <SidebarIcon icon={<Home />} href="/" active={pathname === "/"} />
            <SidebarIcon icon={<PenTool />} href="/create" active={pathname === "/create"} />
            <SidebarIcon icon={<BarChart2 />} href="/analytics" active={pathname === "/analytics"} />
          </nav>
        </div>

        <div className="flex flex-col space-y-6 text-muted-foreground">
          <SidebarIcon icon={<Settings />} href="/settings" active={pathname === "/settings"} />
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <header className="h-[80px] w-full border-b border-border flex items-center justify-between px-6 lg:px-10 bg-background/80 backdrop-blur-md z-10">
          <button 
            className="md:hidden text-foreground/70 hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="hidden md:flex space-x-8 h-full items-center">
            <Tab label="Dashboard" href="/" isActive={pathname === "/"} />
            <Tab label="Create Pipeline" href="/create" isActive={pathname === "/create"} />
          </div>

          <div className="flex items-center space-x-6">
            <div className="relative hidden sm:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-surface border border-border rounded-pill py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary w-64 transition-all"
              />
            </div>
            <button className="relative text-foreground/60 hover:text-foreground transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full"></span>
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-blue-500 cursor-pointer border border-border/50 hover:shadow-glow transition-all"></div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-10 lg:p-12 pb-24">
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* MOBILE BOTTOM NAV */}
      <div className="md:hidden fixed bottom-0 left-0 w-full h-[70px] bg-surface border-t border-border flex z-50 px-6 justify-between items-center pb-safe">
        <MobileNavIcon icon={<Home />} href="/" active={pathname === "/"} />
        <MobileNavIcon icon={<PenTool />} href="/create" active={pathname === "/create"} />
        <MobileNavIcon icon={<BarChart2 />} href="/analytics" active={pathname === "/analytics"} />
        <MobileNavIcon icon={<Settings />} href="/settings" active={pathname === "/settings"} />
      </div>

    </div>
  );
}

function SidebarIcon({ icon, href, active = false }: { icon: React.ReactNode, href: string, active?: boolean }) {
  return (
    <Link href={href}>
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300 group relative
        ${active ? 'bg-primary/10 text-primary shadow-[inset_0_0_10px_rgba(124,58,237,0.1)]' : 'text-foreground/40 hover:text-foreground/90 hover:bg-white/5'}
      `}>
        {active && <div className="absolute left-0 w-1 h-6 bg-primary rounded-r-full shadow-glow"></div>}
        <div className={`transform transition-transform ${active ? 'scale-110' : 'group-hover:scale-110'}`}>
          {icon}
        </div>
      </div>
    </Link>
  );
}

function Tab({ label, href, isActive }: { label: string, href: string, isActive: boolean }) {
  return (
    <Link href={href} className={`relative h-full flex items-center text-sm font-medium transition-colors
      ${isActive ? 'text-white' : 'text-foreground/50 hover:text-foreground/80'}
    `}>
      {label}
      {isActive && (
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary shadow-glow"></div>
      )}
    </Link>
  );
}

function MobileNavIcon({ icon, href, active = false }: { icon: React.ReactNode, href: string, active?: boolean }) {
  return (
    <Link href={href}>
      <div className={`p-3 rounded-xl transition-all ${active ? 'text-primary bg-primary/10' : 'text-foreground/50'}`}>
        {icon}
      </div>
    </Link>
  );
}
