import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import AppShell from './components/AppShell';
import { createClient } from '@/lib/supabase/server';
import SessionProvider from '@/components/SessionProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Social Asset Lab',
  description: 'AI-powered generation engine and asset dashboard',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body 
        className={`${inter.variable} antialiased selection:bg-accent/30 min-h-screen bg-void text-text-primary`}
        suppressHydrationWarning
      >
        <div className="fixed inset-0 -z-10 bg-void pointer-events-none overflow-hidden">
          {/* Layer 1: Radial accent gradient - subtle focal depth */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(16,185,129,0.07),transparent_65%)]" />

          {/* Layer 2: Noise/grain texture - premium analog vibe */}
          <div 
            className="absolute inset-0 opacity-[0.035] mix-blend-soft-light"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
            }}
          />

          {/* Layer 3: Faint cosmic blur */}
          <div className="absolute inset-0 bg-linear-to-br from-purple-950/8 via-transparent to-accent/8 blur-3xl" />
        </div>
        
        <SessionProvider>
          {user ? (
            <AppShell user={user}>{children}</AppShell>
          ) : (
            children
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
