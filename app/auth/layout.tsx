import { Instagram, Linkedin, Twitter, Heart, MessageCircle, User as UserIcon } from "lucide-react";

function MockPost({ rotation, platform, delay }: { rotation: string, platform: 'ig' | 'li' | 'x', delay: string }) {
  const platforms = {
    ig: { icon: Instagram, color: 'text-pink-500' },
    li: { icon: Linkedin, color: 'text-blue-500' },
    x: { icon: Twitter, color: 'text-white' }
  };
  const { icon: Icon, color } = platforms[platform];

  return (
    <div 
      className={`bg-surface/40 border border-white/5 rounded-2xl p-4 shadow-2xl backdrop-blur-sm ${rotation} scale-95 animate-in fade-in zoom-in duration-1000 ${delay}`}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
          <UserIcon className="w-4 h-4 text-white/40" />
        </div>
        <div className="flex-1">
          <div className="h-2 w-16 bg-white/10 rounded-full mb-1" />
          <div className="h-1.5 w-10 bg-white/5 rounded-full" />
        </div>
        <Icon className={`w-3.5 h-3.5 ${color} opacity-40`} />
      </div>
      
      <div className="aspect-4/3 rounded-xl bg-linear-to-br from-white/5 to-transparent mb-3 flex items-center justify-center">
        {platform === 'ig' ? "📸" : platform === 'li' ? "💼" : "🔥"}
      </div>
      
      <div className="space-y-1.5 mb-4">
        <div className="h-2 w-full bg-white/10 rounded-full" />
        <div className="h-2 w-3/4 bg-white/10 rounded-full" />
      </div>
      
      <div className="flex items-center gap-3 text-[10px] text-white/20">
        <div className="flex items-center gap-1">
          <Heart className="w-3 h-3" /> 2.4k
        </div>
        <div className="flex items-center gap-1">
          <MessageCircle className="w-3 h-3" /> 87
        </div>
      </div>
    </div>
  );
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-void relative overflow-hidden">
      {/* Background collage layer */}
      <div className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none overflow-hidden select-none">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 p-8 h-full w-full">
          <MockPost rotation="rotate-[-3deg]" platform="ig" delay="delay-100" />
          <MockPost rotation="rotate-[4deg]" platform="li" delay="delay-300" />
          <MockPost rotation="rotate-[-2deg] mt-12" platform="x" delay="delay-500" />
          <MockPost rotation="rotate-[6deg] -mt-8" platform="ig" delay="delay-200" />
          <MockPost rotation="rotate-[-4deg]" platform="li" delay="delay-700" />
          <MockPost rotation="rotate-[5deg] mt-4" platform="x" delay="delay-400" />
          <MockPost rotation="rotate-[-5deg] mt-16" platform="ig" delay="delay-600" />
          <MockPost rotation="rotate-[3deg]" platform="li" delay="delay-200" />
          <MockPost rotation="rotate-[-2deg] -mt-12" platform="x" delay="delay-800" />
          <MockPost rotation="rotate-[4deg] mt-8" platform="ig" delay="delay-100" />
          <MockPost rotation="rotate-[-3deg]" platform="li" delay="delay-500" />
          <MockPost rotation="rotate-[6deg] mt-10" platform="x" delay="delay-300" />
        </div>
      </div>

      {/* Overlay layers */}
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_30%_70%,rgba(16,185,129,0.08),transparent_65%)] mix-blend-soft-light pointer-events-none" />
      <div 
        className="absolute inset-0 z-10 opacity-[0.035] pointer-events-none" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />
      
      {/* Centered Content */}
      <div className="w-full max-w-md z-20 animate-in fade-in zoom-in-95 duration-700 relative">
        <div className="flex justify-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center border border-accent/30 shadow-[0_0_20px_rgba(16,185,129,0.2)] backdrop-blur-md">
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-accent w-8 h-8"
            >
              <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
            </svg>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}
