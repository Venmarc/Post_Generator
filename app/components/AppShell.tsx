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
    <div className="min-h-screen w-full bg-transparent text-text-primary flex overflow-hidden font-sans selection:bg-accent/30">
      
      {/* LEFT SIDEBAR (Desktop) */}
      <aside className="hidden md:flex flex-col w-[100px] h-screen border-r border-border-subtle/50 bg-void py-10 items-center justify-between z-20">
        <div className="flex flex-col items-center space-y-10">
          <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center border border-accent/30 overflow-hidden shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:scale-105">
            <Layers className="text-accent w-7 h-7" />
          </div>

          <nav className="flex flex-col space-y-8 mt-10">
            <SidebarIcon icon={<Home className="w-7 h-7" />} href="/" active={pathname === "/"} />
            <SidebarIcon icon={<PenTool className="w-7 h-7" />} href="/create" active={pathname === "/create"} />
            <SidebarIcon icon={<BarChart2 className="w-7 h-7" />} href="/analytics" active={pathname === "/analytics"} />
          </nav>
        </div>

        <div className="flex flex-col space-y-8 text-text-secondary/40">
          <SidebarIcon icon={<Settings className="w-7 h-7" />} href="/settings" active={pathname === "/settings"} />
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <header className="h-[80px] w-full border-b border-border-subtle/50 flex items-center justify-between px-6 lg:px-10 bg-void/80 backdrop-blur-md z-10">
          <button 
            className="md:hidden text-text-secondary hover:text-accent transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="hidden md:flex space-x-10 h-full items-center">
            <Tab label="Dashboard" href="/" isActive={pathname === "/"} />
            <Tab label="Create Pipeline" href="/create" isActive={pathname === "/create"} />
          </div>

          <div className="flex items-center space-x-6">
            <div className="relative hidden sm:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary/40" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-surface border border-border-subtle/50 rounded-pill py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-accent w-64 transition-all"
              />
            </div>
            <button className="relative text-text-secondary hover:text-text-primary transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-accent rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
            </button>
            <div className="w-10 h-10 rounded-full bg-linear-to-tr from-accent to-accent-dark cursor-pointer border border-border-subtle/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"></div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 lg:p-12 pb-24">
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
        ${active ? 'bg-accent/10 text-accent shadow-inset-glow' : 'text-text-secondary/40 hover:text-text-primary hover:bg-white/5'}
      `}>
        {active && <div className="absolute left-0 w-1 h-6 bg-accent rounded-r-full shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>}
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
      ${isActive ? 'text-text-primary' : 'text-text-secondary/50 hover:text-text-primary'}
    `}>
      {label}
      {isActive && (
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent shadow-[0_0_10px_rgba(16,185,129,0.6)]"></div>
      )}
    </Link>
  );
}

function MobileNavIcon({ icon, href, active = false }: { icon: React.ReactNode, href: string, active?: boolean }) {
  return (
    <Link href={href}>
      <div className={`p-3 rounded-xl transition-all ${active ? 'text-accent bg-accent/10 shadow-inset-glow' : 'text-text-secondary/50'}`}>
        {icon}
      </div>
    </Link>
  );
}
