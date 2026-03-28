"use client";

import React, { useState, useEffect } from "react";
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
  Menu,
  X,
  LogOut,
  ChevronRight,
  LucideIcon
} from "lucide-react";

import { User } from "@supabase/supabase-js";
import UserNav from "@/components/UserNav";
import { createClient } from "@/lib/supabase/client";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export default function AppShell({ 
  children,
  user
}: { 
  children: React.ReactNode,
  user: User
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathname = usePathname();

  // Close drawer on path change
  useEffect(() => {
    setIsDrawerOpen(false);
  }, [pathname]);

  const navItems: NavItem[] = [
    { label: "Dashboard", href: "/dashboard", icon: Home },
    { label: "Create Pipeline", href: "/create-pipeline", icon: PenTool },
    { label: "Analytics", href: "/analytics", icon: BarChart2 },
  ];

  const bottomItems: NavItem[] = [
    { label: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen w-full flex bg-transparent text-text-primary overflow-hidden font-sans selection:bg-accent/30 selection:text-white">
      
      {/* --- DESKTOP SIDEBAR --- */}
      <aside className="hidden lg:flex flex-col w-[84px] h-screen border-r border-white/5 bg-void/50 backdrop-blur-xl py-10 items-center justify-between z-40">
        <div className="flex flex-col items-center space-y-10 w-full">
          <Link href="/dashboard" className="w-11 h-11 rounded-xl bg-linear-to-br from-accent/30 to-accent/10 flex items-center justify-center border border-accent/30 overflow-hidden shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:scale-110 group">
            <Layers className="text-accent w-5 h-5 group-hover:rotate-12 transition-transform" />
          </Link>
 
          <nav className="flex flex-col space-y-8">
            {navItems.map((item) => (
              <SidebarIcon 
                key={item.href}
                icon={<item.icon className="w-5 h-5" />} 
                href={item.href} 
                active={pathname === item.href} 
                label={item.label}
              />
            ))}
          </nav>
        </div>

        <div className="flex flex-col space-y-8 text-text-secondary/40">
          {bottomItems.map((item) => (
            <SidebarIcon 
              key={item.href}
              icon={<item.icon className="w-5 h-5" />} 
              href={item.href} 
              active={pathname === item.href} 
              label={item.label}
            />
          ))}
        </div>
      </aside>

      {/* --- MOBILE DRAWER OVERLAY --- */}
      {isDrawerOpen && (
        <div 
          className="fixed inset-0 bg-void/60 backdrop-blur-sm z-60 lg:hidden transition-all duration-300"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* --- MOBILE DRAWER --- */}
      <aside className={`fixed top-0 left-0 bottom-0 w-[280px] bg-surface/95 backdrop-blur-2xl border-r border-white/10 z-60 transform transition-transform duration-500 ease-out lg:hidden flex flex-col
        ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full shadow-none'}
        shadow-[20px_0_60px_rgba(0,0,0,0.5)]
      `}>
        <div className="p-8 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center border border-accent/30">
              <Layers className="text-accent w-5 h-5" />
            </div>
            <span className="font-bold text-lg tracking-tight">ARTENOVA</span>
          </div>
          <button 
            onClick={() => setIsDrawerOpen(false)}
            className="p-2 rounded-full hover:bg-white/5 transition-colors text-text-secondary"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
          <div className="text-[10px] font-bold text-text-secondary/40 uppercase tracking-[2px] mb-4 ml-4">Main Menu</div>
          {navItems.map((item) => (
            <DrawerItem 
              key={item.href} 
              icon={<item.icon className="w-5 h-5" />} 
              label={item.label} 
              href={item.href} 
              active={pathname === item.href} 
            />
          ))}
          
          <div className="pt-8 text-[10px] font-bold text-text-secondary/40 uppercase tracking-[2px] mb-4 ml-4">Support</div>
          {bottomItems.map((item) => (
            <DrawerItem 
              key={item.href} 
              icon={<item.icon className="w-5 h-5" />} 
              label={item.label} 
              href={item.href} 
              active={pathname === item.href} 
            />
          ))}
        </nav>

        <div className="p-6 border-t border-white/5">
          <button 
            onClick={async () => {
              const supabase = createClient();
              await supabase.auth.signOut();
              window.location.href = '/';
            }}
            className="w-full flex items-center justify-between p-4 rounded-xl bg-red-500/5 hover:bg-red-500/10 text-red-500 border border-red-500/10 transition-all group"
          >
            <div className="flex items-center space-x-3">
              <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Sign Out</span>
            </div>
            <ChevronRight className="w-4 h-4 opacity-50" />
          </button>
        </div>
      </aside>

      {/* --- STAGE (Main Viewport) --- */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        
        {/* Header - Stage level (full width) */}
        <header className="h-[64px] w-full border-b border-white/5 flex items-center justify-center px-4 lg:px-10 bg-void/40 backdrop-blur-xl z-50 sticky top-0">
          {/* Header Content - Container level */}
          <div className="w-full max-w-[1300px] flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                className="lg:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-text-secondary hover:text-accent hover:border-accent/30 transition-all active:scale-95"
                onClick={() => setIsDrawerOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="hidden lg:flex space-x-8 h-full items-center ml-2">
                <Tab label="Dashboard" href="/dashboard" isActive={pathname === "/dashboard"} />
                <Tab label="Pipeline" href="/create-pipeline" isActive={pathname === "/create-pipeline"} />
              </div>
              <span className="lg:hidden font-bold text-sm tracking-widest text-accent">ARTENOVA</span>
            </div>

            <div className="flex items-center space-x-4 sm:space-x-8">
              <div className="relative hidden md:block">
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary/40" />
                <input 
                  type="text" 
                  placeholder="Quick search..." 
                  className="bg-white/5 border border-white/10 rounded-full py-2.5 pl-11 pr-6 text-sm focus:outline-none focus:ring-1 focus:ring-accent w-64 xl:w-80 transition-all focus:bg-white/8"
                />
              </div>
              <button className="relative p-2 text-text-secondary/60 hover:text-text-primary transition-all hover:bg-white/5 rounded-full group">
                <Bell className="w-5 h-5 group-hover:rotate-15" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)] border border-void"></span>
              </button>
              <UserNav email={user.email} />
            </div>
          </div>
        </header>

        {/* --- CONTAINER (Main Content) --- */}
        <main className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="max-w-[1300px] mx-auto p-4 lg:p-6 xl:p-8 min-h-full flex flex-col">
            <div className="flex-1 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              {children}
            </div>
            
            {/* Footer shadow logic - subtle separation */}
            <footer className="mt-20 py-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-[11px] text-text-secondary/30 uppercase tracking-[2px]">
              <div>© 2026 Artenova AI Engine</div>
              <div className="flex space-x-8 mt-4 md:mt-0">
                <a href="#" className="hover:text-accent transition-colors">Privacy</a>
                <a href="#" className="hover:text-accent transition-colors">Terms</a>
                <a href="#" className="hover:text-accent transition-colors">Support</a>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}

function SidebarIcon({ icon, href, active = false, label }: { icon: React.ReactNode, href: string, active?: boolean, label: string }) {
  return (
    <Link href={href} title={label}>
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 group relative
        ${active ? 'bg-accent/15 text-accent shadow-[inset_0_0_20px_rgba(16,185,129,0.1)] border border-accent/20' : 'text-text-secondary/30 hover:text-text-primary hover:bg-white/5'}
      `}>
        {active && <div className="absolute left-[-15px] w-1.5 h-6 bg-accent rounded-r-full shadow-[0_0_15px_rgba(16,185,129,0.8)]"></div>}
        <div className={`transform transition-transform ${active ? 'scale-110' : 'group-hover:scale-110 group-hover:rotate-3'}`}>
          {icon}
        </div>
        
        {/* Tooltip on hover */}
        <div className="absolute left-full ml-4 px-3 py-1.5 bg-surface-dark border border-white/10 rounded-lg text-xs font-medium text-white opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all pointer-events-none z-50 whitespace-nowrap">
          {label}
        </div>
      </div>
    </Link>
  );
}

function DrawerItem({ icon, label, href, active }: { icon: React.ReactNode, label: string, href: string, active: boolean }) {
  return (
    <Link href={href} className="block group">
      <div className={`flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300
        ${active ? 'bg-accent/10 border border-accent/20 text-accent' : 'hover:bg-white/5 text-text-secondary border border-transparent'}
      `}>
        <div className={`transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`}>
          {icon}
        </div>
        <span className="font-semibold">{label}</span>
      </div>
    </Link>
  );
}

function Tab({ label, href, isActive }: { label: string, href: string, isActive: boolean }) {
  return (
    <Link href={href} className={`relative h-full flex items-center text-sm font-semibold tracking-wide transition-all
      ${isActive ? 'text-text-primary' : 'text-text-secondary/40 hover:text-text-primary'}
    `}>
      {label}
      {isActive && (
        <div className="absolute bottom-[-22px] left-0 w-full h-[3px] bg-accent shadow-[0_0_15px_rgba(16,185,129,0.8)] rounded-full"></div>
      )}
    </Link>
  );
}
