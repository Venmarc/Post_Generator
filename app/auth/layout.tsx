import React from "react";
import { Heart, MessageCircle, Send, Bookmark, Repeat2, MoreHorizontal, Layers } from 'lucide-react';

// --- Types ---
interface TextContent {
  quote: string;
  author?: string;
  tag?: string;
  bgStyle?: React.CSSProperties;
  accentColor: string;
}

interface PostData {
  id: string;
  image?: string;
  textContent?: TextContent;
  platform: 'instagram' | 'twitter' | 'pinterest';
  username: string;
  likes: string;
  comments?: string;
  rotationDeg: number;
}

// --- THE DEFINITIVE ELITE GALLERY (Exactly 21 User-Uploaded High-Fidelity Assets) ---
const GALLERY_IMAGES = [
  "https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", // Red Car Sunset
  "https://images.pexels.com/photos/4202926/pexels-photo-4202926.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", // Pro Camera B&W
  "https://images.pexels.com/photos/3589903/pexels-photo-3589903.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", // Palm Tree Reflection
  "https://images.pexels.com/photos/7563891/pexels-photo-7563891.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", // Night City Skyline
  "https://images.pexels.com/photos/844297/pexels-photo-844297.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", // Yacht with Book/Fruit
  "https://images.pexels.com/photos/289262/pexels-photo-289262.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", // Woman on Yacht
  "https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", // Man in Red Bar
  "https://images.pexels.com/photos/4099388/pexels-photo-4099388.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", // NYC Cityscape
  "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", // Neon Street Blur
  "https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", // Scenic Backpack
  "https://images.pexels.com/photos/733857/pexels-photo-733857.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", // Gaming Setup 1
  "https://images.pexels.com/photos/1484437/pexels-photo-1484437.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", // Gaming Setup 2 (Anime)
  "https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", // Minimal Living Room
  "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", // Outdoor Patio
  "https://images.pexels.com/photos/267371/pexels-photo-267371.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", // Food Table Top
  "https://images.pexels.com/photos/533446/pexels-photo-533446.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", // Dining Candles
  "https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", // Yellow Motorcycle
  "https://images.pexels.com/photos/267367/pexels-photo-267367.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", // Smoke Motorcycle
  "https://images.pexels.com/photos/8831808/pexels-photo-8831808.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", // Jellyfish
  "https://images.pexels.com/photos/7563686/pexels-photo-7563686.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", // Badger Wildlife
  "https://images.pexels.com/photos/360438/pexels-photo-360438.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", // Elite Tech/Interface
];

const QUOTES: TextContent[] = [
  {
    quote: "The art of generation is seeing the invisible.",
    tag: "#VisualIntelligence",
    bgStyle: { background: "linear-gradient(160deg, #1e1b4b 0%, #312e81 45%, #4338ca 100%)" },
    accentColor: "#818cf8"
  },
  {
    quote: "Innovation is the mastery of complexity.",
    tag: "#CreativeSystems",
    bgStyle: { background: "linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)" },
    accentColor: "#34d399"
  },
  {
    quote: "Design is thinking made visual.",
    author: "Saul Bass",
    tag: "#DesignEthics",
    bgStyle: { background: "linear-gradient(150deg, #4c1d95 0%, #5b21b6 50%, #6d28d9 100%)" },
    accentColor: "#a78bfa"
  },
  {
    quote: "Magic is just science we don't understand yet.",
    tag: "#AIFuture",
    bgStyle: { background: "linear-gradient(145deg, #7c2d12 0%, #9a3412 40%, #c2410c 100%)" },
    accentColor: "#fb923c"
  }
];

const PLATFORMS: ('instagram' | 'twitter' | 'pinterest')[] = ['instagram', 'twitter', 'pinterest'];
const USERnames = ['venmarc', 'creative_lab', 'tech_pioneer', 'design_vision', 'pixel_architect', 'social_guru'];
const ROTATIONS = [2.2, -1.5, 1.8, -2.4, 2.8, -1.2, 2.5, -2.0, 1.6, -3.0, 2.2, -1.4, 1.0, 2.4, -2.2, 1.2, -3.0, 2.2, -1.6, 1.4, -2.0];

const MOCK_POSTS: PostData[] = [
  ...GALLERY_IMAGES.map((img, i) => ({
    id: `img-${i}`,
    image: img,
    platform: PLATFORMS[i % 3],
    username: USERnames[i % USERnames.length],
    likes: (Math.random() * 5 + 1).toFixed(1) + "k",
    comments: Math.floor(Math.random() * 100).toString(),
    rotationDeg: ROTATIONS[i % ROTATIONS.length]
  })),
  ...QUOTES.map((q, i) => ({
    id: `quote-${i}`,
    textContent: q,
    platform: PLATFORMS[i % 2],
    username: USERnames[(i + 2) % USERnames.length],
    likes: (Math.random() * 3 + 1).toFixed(1) + "k",
    comments: Math.floor(Math.random() * 50).toString(),
    rotationDeg: ROTATIONS[(i + 10) % ROTATIONS.length]
  }))
].sort((a, b) => a.id.localeCompare(b.id));

function MockPost({ data }: { data: PostData }) {
  const { platform, username, likes, comments, image, textContent, rotationDeg } = data;

  const renderContent = () => {
    if (textContent) {
      return (
        <div 
          className="aspect-2/3 flex flex-col items-center justify-center px-6 py-8 relative overflow-hidden"
          style={textContent.bgStyle}
        >
          <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-20 bg-white" />
          <span className="text-5xl leading-none opacity-25 text-white absolute top-4 left-6 select-none font-serif">"</span>
          <p className="text-white text-[10px] leading-snug text-center font-medium relative z-10">
            {textContent.quote}
          </p>
          {textContent.tag && (
            <span className="mt-4 px-3 py-1 rounded-full text-[9px] z-10 bg-white/20 text-white/80 font-semibold backdrop-blur-sm">
              {textContent.tag}
            </span>
          )}
        </div>
      );
    }
    return (
      <div className={`aspect-2/3 bg-slate-800 overflow-hidden relative`}>
        <img src={image} alt="Post" className="w-full h-full object-cover object-center" loading="lazy" />
      </div>
    );
  };

  const commonClasses = "bg-slate-900 overflow-hidden w-full shadow-2xl transition-all duration-500 hover:scale-[1.05] hover:z-50 hover:opacity-100";
  const styles = { transform: `rotate(${rotationDeg}deg)` };

  if (platform === 'instagram') {
    return (
      <div className={`${commonClasses} rounded-xl`} style={styles}>
        <div className="flex items-center gap-2 px-3 py-1.5 border-b border-slate-800/50">
          <div className="w-5 h-5 rounded-full bg-linear-to-br from-purple-500 via-pink-500 to-orange-500 p-[1.5px]">
            <div className="w-full h-full rounded-full bg-slate-900" />
          </div>
          <span className="text-white text-[9px] font-medium truncate opacity-90">{username}</span>
          <MoreHorizontal className="w-3 h-3 text-slate-500 ml-auto" />
        </div>
        {renderContent()}
        <div className="px-3 py-1.5">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2.5">
              <Heart className="w-3.5 h-3.5 text-white opacity-80" />
              <MessageCircle className="w-3.5 h-3.5 text-white opacity-80" />
              <Send className="w-3.5 h-3.5 text-white opacity-80" />
            </div>
            <Bookmark className="w-3.5 h-3.5 text-white opacity-80" />
          </div>
          <div className="text-white text-[9px] opacity-70 font-semibold">{likes} likes</div>
        </div>
      </div>
    );
  }

  if (platform === 'twitter') {
    return (
      <div className={`${commonClasses} rounded-xl border border-slate-800/50`} style={styles}>
        <div className="px-3 py-1.5 flex items-start gap-2">
          <div className="w-6 h-6 rounded-full bg-slate-800 shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-white font-bold text-[9px] truncate">{username}</span>
              <span className="text-slate-500 text-[9px] truncate">@{username.toLowerCase()}</span>
            </div>
          </div>
          <MoreHorizontal className="w-3 h-3 text-slate-500" />
        </div>
        {renderContent()}
        <div className="px-3 py-1.5 flex items-center justify-between border-t border-slate-800/50 text-slate-400">
          <div className="flex items-center gap-1"><MessageCircle className="w-3 h-3" /><span className="text-[8px]">{comments}</span></div>
          <div className="flex items-center gap-1"><Repeat2 className="w-3 h-3" /><span className="text-[8px]">42</span></div>
          <div className="flex items-center gap-1"><Heart className="w-3 h-3" /><span className="text-[8px]">{likes}</span></div>
          <Bookmark className="w-3 h-3" />
        </div>
      </div>
    );
  }

  return (
    <div className={`${commonClasses} rounded-2xl`} style={styles}>
      {renderContent()}
      <div className="px-3 py-1.5">
        <div className="flex items-center justify-between mb-0.5">
          <span className="text-white text-[9px] font-semibold truncate leading-none">Creative Lab</span>
          <Bookmark className="w-3 h-3 text-white opacity-80" />
        </div>
        <div className="flex items-center gap-1 opacity-60">
          <div className="w-3 h-3 rounded-full bg-slate-800" />
          <span className="text-slate-400 text-[8px] truncate">{username}</span>
        </div>
      </div>
    </div>
  );
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-void relative overflow-hidden">
      {/* Background Stage - Full Void */}
      <div className="absolute inset-0 z-0 bg-void" />

      {/* Borderless Auth Poster Stage - Full Height Vertical Stretch */}
      <div className="relative z-10 w-full min-h-screen flex items-center justify-center select-none scale-[0.75] sm:scale-85 lg:scale-100 transition-all duration-700">
        
        {/* Contained Masonry Grid (Borderless at top/bottom) */}
        <div className="relative w-full max-w-[1340px] h-full flex items-center justify-center">
          
          {/* Subtle Dynamic Glow */}
          <div className="absolute inset-0 bg-linear-to-br from-emerald-500/5 via-transparent to-purple-500/5 pointer-events-none z-10" />

          {/* Slanted Masonry Grid - Full Vertical Stretch, Sides Expanded slightly */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 px-10 py-24 opacity-40 hover:opacity-100 transition-opacity duration-1000 pointer-events-none">
            {MOCK_POSTS.map((post, i) => (
              <div 
                key={post.id} 
                className={`${i % 7 === 0 ? 'lg:row-span-2' : ''} h-fit flex items-center`}
              >
                <MockPost data={post} />
              </div>
            ))}
          </div>

          {/* Heavy Full-Bleed Atmospheric Vignettes (Gradient to Void) */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-void via-void/95 to-transparent z-20" />
          <div className="absolute inset-x-0 top-0 h-1/4 bg-linear-to-b from-void via-void/90 to-transparent z-20" />
          <div className="absolute inset-0 bg-void/30 backdrop-blur-[0.5px] z-20" />
        </div>

        {/* Auth Form - Perfectly Anchored & Focal */}
        <div className="absolute inset-0 z-30 flex items-center justify-center p-4">
          <div className="scale-[0.80] sm:scale-[0.90] lg:scale-[0.95] drop-shadow-[0_25px_80px_rgba(0,0,0,1)]">
            <div className="flex justify-center mb-10">
              <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center border border-accent/40 shadow-[0_0_40px_rgba(16,185,129,0.35)] backdrop-blur-2xl animate-pulse-slow">
                <Layers className="text-accent w-8 h-8" />
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>

      {/* Extreme Radial Vignette */}
      <div className="absolute inset-0 z-40 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,0.95)]" />
    </div>
  );
}
