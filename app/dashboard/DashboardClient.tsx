"use client";

import { Layers, Activity, Users, ArrowUpRight, CheckCircle2, Clock, Loader2 } from "lucide-react";
import { useTelemetry } from "@/lib/storage";
import Link from "next/link";

import { User } from "@supabase/supabase-js";

export default function DashboardClient({ user }: { user: User }) {
  const { generated, exported, exportRate, lastActivity, history, loading } = useTelemetry();

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-2">System Overview</h1>
          <p className="text-foreground/50 text-sm">Real-time performance and asset telemetry</p>
        </div>
        {lastActivity && (
          <div className="flex items-center gap-2 px-3 py-1 bg-accent/5 border border-accent/20 rounded-full">
            <Clock className="w-3 h-3 text-accent" />
            <span className="text-[10px] text-accent font-bold uppercase tracking-widest">
              Last Activity: {new Date(lastActivity).toLocaleTimeString()}
            </span>
          </div>
        )}
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 transition-opacity duration-300 ${loading ? 'opacity-50' : 'opacity-100'}`}>
        <div className="bg-surface rounded-card border border-border-subtle/50 p-8 shadow-card backdrop-blur-[2px] transition-all duration-300 ease-out hover:shadow-card-hover hover:-translate-y-2 hover:scale-[1.01] group">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all">
              <Layers className="w-6 h-6" />
            </div>
            <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-md font-medium flex items-center gap-1">
              Live
            </span>
          </div>
          <h3 className="text-3xl font-bold text-text-primary mb-1">
            {loading ? "..." : generated.toLocaleString()}
          </h3>
          <p className="text-text-secondary text-sm">Total Assets Generated</p>
        </div>
        
        <div className="bg-surface rounded-card border border-border-subtle/50 p-8 shadow-card backdrop-blur-[2px] transition-all duration-300 ease-out hover:shadow-card-hover hover:-translate-y-2 hover:scale-[1.01] group">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all">
              <Activity className="w-6 h-6" />
            </div>
            <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-md font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> {exported} Exported
            </span>
          </div>
          <h3 className="text-3xl font-bold text-text-primary mb-1">
            {loading ? "..." : `${exportRate}%`}
          </h3>
          <p className="text-text-secondary text-sm">Export Efficiency</p>
        </div>
        
        <div className="bg-surface rounded-card border border-border-subtle/50 p-8 shadow-card backdrop-blur-[2px] transition-all duration-300 ease-out hover:shadow-card-hover hover:-translate-y-2 hover:scale-[1.01] group">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all">
              <Users className="w-6 h-6" />
            </div>
            {loading && <Loader2 className="w-4 h-4 animate-spin text-accent" />}
          </div>
          <h3 className="text-lg font-bold text-text-primary mb-1 truncate">{user.email}</h3>
          <p className="text-text-secondary text-sm">Logged in as</p>
        </div>
      </div>

      {!loading && generated === 0 ? (
        <div className="bg-surface rounded-card border border-border-subtle/50 p-12 shadow-card backdrop-blur-[2px] min-h-[400px] flex items-center justify-center flex-col text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-radial-accent opacity-50 pointer-events-none"></div>
          <div className="w-20 h-20 rounded-3xl bg-void/50 flex items-center justify-center mb-6 border border-border-subtle/50 transition-all duration-300 group-hover:scale-110 group-hover:border-accent/30 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]">
            <Layers className="text-text-secondary/30 w-10 h-10 group-hover:text-accent/50 transition-colors" />
          </div>
          <h3 className="text-2xl font-semibold text-text-primary mb-3">No active sessions</h3>
          <p className="text-text-secondary text-lg max-w-md mb-8">Head over to the Create Pipeline to generate your first multimodal presentation board.</p>
          <Link href="/create" className="px-8 py-3 bg-accent text-void rounded-full font-bold hover:scale-105 transition-all shadow-glow">
            Start Generation
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-surface rounded-card border border-border-subtle/50 p-10 shadow-card">
             <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-semibold text-text-primary">
                  {loading ? "Synchronizing Cloud Archive..." : "Export History (Last 10)"}
                </h3>
                <span className="text-[10px] text-accent font-bold uppercase tracking-widest border border-accent/20 px-3 py-1 rounded-full">Archive Active</span>
             </div>
             
             {history.length === 0 && !loading ? (
               <div className="py-10 text-center border-2 border-dashed border-border-subtle/30 rounded-2xl">
                 <p className="text-text-secondary/40 text-sm">No exports recorded yet. Your high-performing posts will appear here.</p>
               </div>
             ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {history.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-5 bg-void/40 hover:bg-void/60 rounded-2xl border border-border-subtle/30 hover:border-accent/30 transition-all group overflow-hidden">
                       <div className="flex items-center gap-4 min-w-0">
                          <div className="w-12 h-12 rounded-xl bg-accent/5 flex items-center justify-center text-accent/40 group-hover:text-accent transition-colors relative overflow-hidden">
                             {item.image_url ? (
                               <img src={item.image_url} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-100 transition-opacity" />
                             ) : (
                               <CheckCircle2 className="w-5 h-5" />
                             )}
                          </div>
                          <div className="truncate">
                             <p className="text-sm font-bold text-text-primary truncate">{item.topic}</p>
                             <div className="flex items-center gap-2 mt-1">
                                <span className="text-[10px] font-bold text-accent uppercase tracking-tighter">{item.platform}</span>
                                <span className="w-1 h-1 rounded-full bg-border-subtle"></span>
                                <span className="text-[10px] text-text-secondary/40 whitespace-nowrap">{new Date(item.timestamp).toLocaleDateString()}</span>
                             </div>
                          </div>
                       </div>
                       <Link 
                         href={`/create?topic=${encodeURIComponent(item.topic)}`}
                         className="p-2 opacity-0 group-hover:opacity-100 bg-accent/10 hover:bg-accent text-accent hover:text-void rounded-lg transition-all shrink-0"
                       >
                         <ArrowUpRight className="w-4 h-4" />
                       </Link>
                    </div>
                 ))}
               </div>
             )}
          </div>
        </div>
      )}
    </div>
  );
}
