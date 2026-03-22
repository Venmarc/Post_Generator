import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import AppShell from './components/AppShell';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Social Asset Lab',
  description: 'AI-powered generation engine and asset dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body 
        className={`${inter.variable} antialiased selection:bg-primary/30 min-h-screen bg-background text-foreground`}
        suppressHydrationWarning
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
