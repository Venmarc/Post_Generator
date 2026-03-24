'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-void flex items-center justify-center p-6 select-none font-sans">
      <div className="max-w-md w-full relative group">
        {/* Glow behind the card */}
        <div className="absolute inset-x-0 -top-px h-px bg-linear-to-r from-transparent via-red-500/50 to-transparent" />
        <div className="absolute inset-x-0 -bottom-px h-px bg-linear-to-r from-transparent via-red-500/50 to-transparent" />
        
        <div className="bg-surface/40 backdrop-blur-2xl border border-white/5 rounded-3xl p-8 lg:p-12 shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="w-20 h-20 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.2)] animate-pulse">
              <AlertTriangle className="text-red-500 w-10 h-10" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-bold bg-linear-to-b from-white to-white/60 bg-clip-text text-transparent">Something went wrong</h2>
              <p className="text-text-secondary text-sm leading-relaxed max-w-[280px] mx-auto opacity-70">
                An unexpected error occurred in the lab engine. Don't worry, your data is safe.
              </p>
            </div>

            <div className="w-full pt-4 space-y-3">
              <button
                onClick={() => reset()}
                className="w-full flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-400 text-white py-4 rounded-2xl font-bold transition-all active:scale-95 shadow-[0_10px_30px_rgba(239,68,68,0.3)] group"
              >
                <RefreshCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                <span>Try Again</span>
              </button>
              
              <a 
                href="/"
                className="block w-full text-center py-4 text-sm font-semibold text-text-secondary/60 hover:text-text-primary transition-colors"
              >
                Return to Dashboard
              </a>
            </div>
          </div>
        </div>
        
        {/* Decorative corner */}
        <div className="absolute -top-1 -right-1 w-8 h-8 rounded-tr-3xl border-t border-r border-red-500/30" />
      </div>
    </div>
  );
}
