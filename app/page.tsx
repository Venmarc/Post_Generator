import React from "react"
import Link from "next/link"
import { 
  Rocket, 
  Shield, 
  Zap, 
  CheckCircle2, 
  Layers, 
  PenTool, 
  BarChart2,
  ArrowRight
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-void/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center border border-accent/30 shadow-[0_0_15px_rgba(16,185,129,0.2)] group-hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all">
              <Rocket className="text-accent w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">SocialAsset<span className="text-accent">Lab</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-text-secondary hover:text-accent transition-colors">Features</a>
            <a href="#pricing" className="text-sm text-text-secondary hover:text-accent transition-colors">Pricing</a>
            <div className="h-4 w-px bg-white/10 mx-2" />
            <Link href="/auth/login" className="text-sm text-text-secondary hover:text-accent transition-colors">Log In</Link>
            <Link href="/auth/sign-up">
              <Button size="sm" className="px-6 rounded-full shadow-glow-sm">Start Free</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-widest mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Zap className="w-3 h-3" />
            <span>Next-Gen Content Pipeline</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-8 leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-1000">
            Turn raw ideas into <br />
            <span className="text-accent bg-clip-text">viral artistic posts</span> <br />
            in seconds.
          </h1>
          
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-12 animate-in fade-in duration-1000 delay-200">
            AI hooks + Gamma-style composites. The elite terminal for creators who demand high-friction, visceral social media assets.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in duration-1000 delay-300">
            <Link href="/auth/sign-up">
              <Button size="lg" className="min-w-[200px] h-16 text-lg rounded-full">
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="outline" size="lg" className="min-w-[200px] h-16 text-lg rounded-full border-white/10 hover:border-accent/30 hover:bg-accent/5">
                View Demo
              </Button>
            </Link>
          </div>

          {/* App Preview Mockup */}
          <div className="mt-24 relative p-4 rounded-[2.5rem] bg-surface/30 border border-white/5 shadow-2xl backdrop-blur-sm animate-in zoom-in-95 duration-1000 delay-500 overflow-hidden group">
            <div className="absolute inset-0 bg-radial-accent opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
            <div className="rounded-4xl overflow-hidden border border-white/10 bg-void relative">
                <div className="absolute top-0 w-full h-8 bg-surface/80 flex items-center px-4 gap-1.5 border-b border-white/5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                </div>
                <div className="pt-12 pb-8 px-6 grid grid-cols-12 gap-6 min-h-[400px]">
                    <div className="col-span-3 space-y-4">
                        <div className="h-6 w-full bg-surface-hover rounded-md opacity-50" />
                        <div className="h-6 w-2/3 bg-surface-hover rounded-md opacity-30" />
                    </div>
                    <div className="col-span-9 bg-surface/40 rounded-2xl border border-white/5 p-8 flex flex-col items-center justify-center relative">
                        <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                            <Layers className="text-accent w-8 h-8" />
                        </div>
                        <div className="h-4 w-48 bg-accent/20 rounded-full" />
                        <div className="mt-6 space-y-2 w-full max-w-sm">
                            <div className="h-2 w-full bg-white/5 rounded-full" />
                            <div className="h-2 w-5/6 bg-white/5 rounded-full" />
                            <div className="h-2 w-4/6 bg-white/5 rounded-full" />
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 border-t border-white/5 bg-surface/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Built for absolute impact.</h2>
            <p className="text-text-secondary max-w-xl mx-auto text-lg">Every feature is designed to sharpen your thinking and amplify your reach.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<PenTool className="w-8 h-8" />}
              title="Post Architect v5.0"
              description="Our specialized AI engine enforces 'visceral description' rules to ensure every word physically lands."
            />
            <FeatureCard 
              icon={<BarChart2 className="w-8 h-8" />}
              title="Artistic Visual Vibe"
              description="Curated art direction tokens that transform simple topics into premium aesthetic composites."
            />
            <FeatureCard 
              icon={<Layers className="w-8 h-8" />}
              title="Gamma Renderer"
              description="State-of-the-art glassmorphic rendering. 1080x1920 portrait boards optimized for mobile loops."
            />
          </div>
        </div>
      </section>

      {/* Pricing/Closing */}
      <section className="py-24 px-6 text-center bg-void">
        <div className="max-w-3xl mx-auto p-12 rounded-[3rem] bg-accent/5 border border-accent/20 shadow-glow relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-accent opacity-30 pointer-events-none" />
          <h2 className="text-4xl font-bold text-white mb-4 relative z-10">Start building your lab.</h2>
          <p className="text-text-secondary mb-10 text-lg relative z-10">The free tier includes 5 elite generations per month. No credit card required.</p>
          <Link href="/auth/sign-up">
            <Button size="lg" className="h-16 px-12 rounded-full relative z-10 shadow-glow">
              Claim Your Access
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-accent/20 flex items-center justify-center border border-accent/30">
              <Rocket className="text-accent w-3 h-3" />
            </div>
            <span className="text-sm font-bold text-white uppercase tracking-widest">SocialAssetLab</span>
          </div>
          <div className="flex gap-8 text-xs text-text-secondary">
            <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-accent transition-colors">Twitter (X)</a>
          </div>
          <p className="text-xs text-text-secondary/40">© 2026 Social Asset Lab. Future-ready architecture.</p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-10 rounded-[2.5rem] bg-surface/50 border border-white/5 hover:border-accent/30 transition-all duration-500 hover:-translate-y-2 group shadow-xl">
      <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-8 group-hover:scale-110 transition-transform shadow-inset-glow">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <p className="text-text-secondary leading-relaxed">{description}</p>
    </div>
  )
}
