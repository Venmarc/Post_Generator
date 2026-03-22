"use client";

import { Layers, Activity, Users, ArrowUpRight } from "lucide-react";

export default function DashboardOverview() {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-2">System Overview</h1>
          <p className="text-foreground/50 text-sm">Dashboard and telemetry data</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card border border-border rounded-card p-6 shadow-card">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Layers className="w-5 h-5" />
            </div>
            <span className="text-xs bg-green-500/10 text-green-400 px-2 py-1 rounded-md font-medium flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" /> 12%
            </span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">1,248</h3>
          <p className="text-foreground/50 text-sm">Total Assets Generated</p>
        </div>
        
        <div className="bg-card border border-border rounded-card p-6 shadow-card">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
              <Activity className="w-5 h-5" />
            </div>
            <span className="text-xs bg-green-500/10 text-green-400 px-2 py-1 rounded-md font-medium flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" /> 5.4%
            </span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">98.2%</h3>
          <p className="text-foreground/50 text-sm">Engine Success Rate</p>
        </div>
        
        <div className="bg-card border border-border rounded-card p-6 shadow-card">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">0</h3>
          <p className="text-foreground/50 text-sm">Active Subscriptions (Auth Pending)</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-3xl p-8 shadow-card min-h-[400px] flex items-center justify-center flex-col text-center">
        <div className="w-16 h-16 rounded-2xl bg-background/50 flex items-center justify-center mb-4 border border-border/50">
          <Layers className="text-foreground/30 w-8 h-8" />
        </div>
        <h3 className="text-xl font-medium text-white/90 mb-2">No active sessions</h3>
        <p className="text-foreground/50 text-sm max-w-sm">Head over to the Create Pipeline to generate your first multimodal presentation board.</p>
      </div>
    </div>
  );
}
