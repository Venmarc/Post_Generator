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

// --- THE 100% AUTHENTIC USER GALLERY (Selected 17 Assets for the 21-item Cap) ---
const GALLERY_IMAGES = Array.from({ length: 17 }, (_, i) => `/images/auth-collage/img${i + 1}.png`);

// --- Strategic Text Posts (Exactly Replicated from Figma Optimized Build) ---
const STRATEGIC_QUOTES: PostData[] = [
  {
    id: "quote-1",
    platform: "twitter",
    username: "CreativeHQ",
    likes: "3.1k",
    comments: "88",
    rotationDeg: -2.0,
    textContent: {
      quote: "Create boldly. Live freely. Design your own story.",
      author: "CreativeHQ",
      tag: "#DesignLife",
      bgStyle: { background: "linear-gradient(160deg, #4c1d95 0%, #6d28d9 45%, #7c3aed 100%)" },
      accentColor: "#c4b5fd",
    }
  },
  {
    id: "quote-2",
    platform: "instagram",
    username: "canva.templates",
    likes: "2.2k",
    comments: "61",
    rotationDeg: 1.8,
    textContent: {
      quote: "The night hours are the most powerful for creation.",
      tag: "#CreateAtNight",
      bgStyle: { background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #1d4ed8 100%)" },
      accentColor: "#60a5fa",
    }
  },
  {
    id: "quote-3",
    platform: "pinterest",
    username: "QuoteBoard",
    likes: "4.1k",
    rotationDeg: -2.4,
    textContent: {
      quote: "Your only limit is your mind. Break the pattern, build the life.",
      tag: "#MindsetShift",
      bgStyle: { background: "linear-gradient(150deg, #0c0a1e 0%, #1a1040 50%, #2e1065 100%)" },
      accentColor: "#e879f9",
    }
  },
  {
    id: "quote-4",
    platform: "instagram",
    username: "mind.setdaily",
    likes: "1.8k",
    comments: "47",
    rotationDeg: 1.5,
    textContent: {
      quote: "Design is not just what it looks like. Design is how it works.",
      author: "Steve Jobs",
      tag: "#Inspiration",
      bgStyle: { background: "linear-gradient(145deg, #064e3b 0%, #065f46 40%, #047857 100%)" },
      accentColor: "#6ee7b7",
    }
  }
];

const PLATFORMS: ('instagram' | 'twitter' | 'pinterest')[] = ['instagram', 'twitter', 'pinterest'];
const USERnames = ['venmarc', 'creative_lab', 'tech_pioneer', 'design_vision', 'pixel_architect', 'social_guru'];
const ROTATIONS = [2.2, -1.8, 1.5, -2.4, 2.8, -1.2, 2.5, -2.0, 1.6, -2.8, 2.2, -1.4, 1.2, 2.4, -2.2, 1.6, -3.0];

function MockPost({ data }: { data: PostData }) {
  const { platform, username, likes, comments, image, textContent, rotationDeg } = data;

  const renderContent = () => {
    if (textContent) {
      return (
        <div 
          className="aspect-2/3 flex flex-col items-center justify-center px-6 py-8 relative overflow-hidden" 
          style={textContent.bgStyle}
        >
          {/* Decorative circles (Figma Precise) */}
          <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-20 bg-white" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full opacity-10 bg-white" />

          {/* Big quotation mark */}
          <span className="text-6xl leading-none opacity-25 text-white absolute top-4 left-6 select-none font-serif">"</span>
          
          {/* Quote with extra visual impact */}
          <p 
            className="text-white text-[11px] leading-snug text-center font-bold relative z-10 px-2"
            style={{ textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}
          >
            {textContent.quote}
          </p>
          
          {textContent.author && (
            <p className="text-white/60 text-[8px] mt-3 italic relative z-10">— {textContent.author}</p>
          )}
          
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
        <img src={image} alt="Post" className="w-full h-full object-cover object-center" />
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
          <div className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" /><span className="text-[8px]">{likes}</span></div>
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
  // Total 21 items: 17 images + 4 strategic quotes
  const columns: PostData[][] = [[], [], [], [], []];
  
  const imagePosts: PostData[] = GALLERY_IMAGES.map((img, i) => ({
    id: `img-${i}`,
    image: img,
    platform: PLATFORMS[i % 3],
    username: USERnames[i % USERnames.length],
    likes: (Math.random() * 5 + 1).toFixed(1) + "k",
    comments: Math.floor(Math.random() * 100).toString(),
    rotationDeg: ROTATIONS[i % ROTATIONS.length]
  }));

  // Column Distribution (Targeting 5 columns, total 21 items)
  // Column 1: Far Left (4 items)
  columns[0].push(imagePosts[0], imagePosts[1], imagePosts[2], imagePosts[3]);
  
  // Column 2: Left of card (4 items) - Contains quote 1 (Create Boldly) and quote 2 (Night Hours)
  // Quote 2 is at the top, Quote 1 is below it (middle)
  columns[1].push(STRATEGIC_QUOTES[1], STRATEGIC_QUOTES[0], imagePosts[4], imagePosts[5]);
  
  // Column 3: Center / Top of card (5 items) - Contains Quote 4 (Steve Jobs) at the top
  columns[2].push(STRATEGIC_QUOTES[3], imagePosts[6], imagePosts[7], imagePosts[8], imagePosts[9]);
  
  // Column 4: Right of card (4 items) - Contains Quote 3 (Limit is Mind)
  columns[3].push(imagePosts[10], STRATEGIC_QUOTES[2], imagePosts[11], imagePosts[12]);
  
  // Column 5: Far Right (4 items)
  columns[4].push(imagePosts[13], imagePosts[14], imagePosts[15], imagePosts[16]);

  const colOffsets = ["mt-0", "mt-32", "mt-12", "mt-48", "mt-20"];

  return (
    <div className="h-screen w-full flex items-center justify-center bg-void relative overflow-hidden">
      {/* Absolute Background Stage */}
      <div className="absolute inset-0 z-0 bg-void" />

      {/* Authenticity Stage - 17 Images + 4 Strategic Figma Quotes */}
      <div className="absolute inset-0 z-10 w-full h-full flex items-center justify-center select-none overflow-hidden scale-[0.75] sm:scale-85 lg:scale-100 transition-all duration-700 pointer-events-none">
        <div className="relative w-full max-w-[1500px] h-full flex items-center justify-center pt-20 pb-40 px-12">
          
          {/* Subtle Dynamic Glow */}
          <div className="absolute inset-0 bg-linear-to-br from-emerald-500/5 via-transparent to-purple-500/5 z-10" />

          {/* Authentic Masonry Grid - 5 Independent Staggered Stacks */}
          <div className="flex gap-10 opacity-40 transition-opacity duration-1000 w-full justify-center">
            {columns.map((col, i) => (
              <div key={i} className={`flex flex-col gap-10 w-full max-w-[280px] ${colOffsets[i]}`}>
                {col.map(post => <MockPost key={post.id} data={post} />)}
              </div>
            ))}
          </div>

          {/* Fading Vignettes */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-void via-void/90 to-transparent z-20" />
          <div className="absolute inset-x-0 top-0 h-1/4 bg-linear-to-b from-void via-void/80 to-transparent z-20" />
          <div className="absolute inset-0 bg-void/25 backdrop-blur-[0.5px] z-20" />
        </div>
      </div>

      {/* Auth Form - Translucent Focal Point */}
      <div className="relative z-30 flex items-center justify-center p-4 scale-[0.75] sm:scale-85 lg:scale-100 transition-transform duration-700">
        <div className="drop-shadow-[0_25px_80px_rgba(0,0,0,1)]">
          <div className="flex justify-center mb-10">
            <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center border border-accent/40 shadow-[0_0_40px_rgba(16,185,129,0.35)] backdrop-blur-2xl animate-pulse-slow">
              <Layers className="text-accent w-8 h-8" />
            </div>
          </div>
          {children}
        </div>
      </div>

      {/* Extreme Radial Vignette */}
      <div className="absolute inset-0 z-40 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,0.95)]" />
    </div>
  );
}
