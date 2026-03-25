import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Eye, CheckCircle2, Sparkles, LayoutTemplate, Palette, Zap, Sun, Moon } from 'lucide-react';

const templates = [
  {
    id: 'minimal-pro',
    name: 'Minimalist Pro',
    description: 'Clean lines, lots of whitespace, and a focus on crisp typography. Perfect for developers who let their code do the talking.',
    tags: ['Clean', 'Professional', 'Light'],
    colors: ['#ffffff', '#f8fafc', '#334155'],
    icon: <LayoutTemplate size={24} />,
    image: 'https://images.unsplash.com/photo-1507238692062-54e1f8221c97?auto=format&fit=crop&q=80&w=600&h=800'
  },
  {
    id: 'cyber-edge',
    name: 'Cyberpunk Edge',
    description: 'Dark mode by default with glowing neon accents. Designed to make your tech stack pop and show off your modern vibe.',
    tags: ['Dark Mode', 'Neon', 'Tech'],
    colors: ['#0f172a', '#3b82f6', '#8b5cf6'],
    icon: <Zap size={24} />,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600&h=800'
  },
  {
    id: 'glassmorphism',
    name: 'Glassmorphism 3D',
    description: 'Premium frosted glass with floating 3D elements.',
    tags: ['Structured', 'Corporate', 'Blue'],
    colors: ['bg-indigo-100 text-indigo-700'],
    icon: <CheckCircle2 size={24} />,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600&h=800'
  },
  {
    id: 'bento-grid',
    name: 'Creative Bento',
    description: 'Bold gradients, unique grid structures, and interactive elements. Best for designers and frontend wizards.',
    tags: ['Vibrant', 'Creative', 'Bold'],
    colors: ['#ec4899', '#f43f5e', '#fdf2f8'],
    icon: <Palette size={24} />,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=600&h=800'
  }
];

const TemplateSelector = ({ onSelectTemplate }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDark, setIsDark] = useState(true); // Theme State

  // Theme Helper
  const t = (darkClass, lightClass) => isDark ? darkClass : lightClass;

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIdx]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIdx((prev) => (prev + 1) % templates.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIdx((prev) => (prev - 1 + templates.length) % templates.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div className={`min-h-screen flex flex-col items-center py-12 px-4 sm:px-8 font-sans overflow-hidden relative transition-colors duration-700 ${
      t("bg-[#09090b] text-zinc-200", "bg-[#f8fafc] text-slate-700")
    }`}>
      
      {/* Background Glow based on active template */}
      <div 
        className="fixed inset-0 opacity-20 transition-colors duration-1000 blur-[150px] pointer-events-none"
        style={{ backgroundColor: templates[activeIdx].colors[1] }}
      ></div>

      {/* Theme Toggle Button (Top Right) */}
      <div className="absolute top-8 right-8 z-50">
        <button 
          onClick={() => setIsDark(!isDark)}
          className={`p-3 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 ${
            t("bg-zinc-800/80 text-amber-400 hover:bg-zinc-700 shadow-lg shadow-black/20 ring-1 ring-white/5", 
              "bg-white text-indigo-500 shadow-md ring-1 ring-slate-200 hover:bg-slate-50")
          }`}
        >
          {isDark ? <Sun size={20} strokeWidth={2.5} /> : <Moon size={20} strokeWidth={2.5} />}
        </button>
      </div>

      {/* Header Section */}
      <div className="text-center z-10 mb-12 animate-fade-in-down mt-4">
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border ${
          t("bg-indigo-500/10 border-indigo-500/20 text-indigo-400", "bg-indigo-50 border-indigo-200 text-indigo-600")
        }`}>
          <Sparkles size={14} /> Step 2: Choose Design
        </div>
        <h1 className={`text-4xl md:text-5xl font-black tracking-tight mb-4 transition-colors ${
          t("text-white", "text-slate-900")
        }`}>
          Select Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Masterpiece</span>
        </h1>
        <p className={`max-w-xl mx-auto text-sm md:text-base transition-colors ${
          t("text-zinc-400", "text-slate-500")
        }`}>
          Your data is saved. Now, choose the architectural blueprint that best represents your personal brand to the world.
        </p>
      </div>

      {/* 3D Coverflow Carousel Section */}
      <div className="relative w-full max-w-6xl h-[500px] flex items-center justify-center perspective-[1200px] z-10 mt-4">
        
        {templates.map((tpl, idx) => {
          // Calculate relative position for the 3D effect
          const offset = idx - activeIdx;
          const absOffset = Math.abs(offset);
          const isCenter = offset === 0;
          
          // Math for the Coverflow effect
          const translateX = offset * 280; // Distance between cards
          const translateZ = -absOffset * 150; // Push inactive cards back
          const rotateY = offset * -15; // Angle the cards inwards
          const opacity = isCenter ? 1 : Math.max(0.3, 1 - absOffset * 0.3);
          const zIndex = 10 - absOffset;

          return (
            <div
              key={tpl.id}
              className="absolute transition-all duration-700 ease-out cursor-pointer group"
              style={{
                transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`,
                opacity,
                zIndex,
              }}
              onClick={() => !isCenter && setActiveIdx(idx)}
            >
              {/* Template Card */}
              <div className={`w-[320px] md:w-[380px] h-[480px] rounded-3xl overflow-hidden border-2 flex flex-col transition-all duration-500 ${
                isCenter 
                  ? t('border-indigo-500 shadow-[0_0_40px_rgba(99,102,241,0.3)] bg-zinc-900', 'border-indigo-400 shadow-[0_20px_50px_-12px_rgba(99,102,241,0.4)] bg-white') 
                  : t('border-zinc-800 shadow-xl bg-zinc-900/50 hover:border-zinc-600', 'border-slate-200 shadow-lg bg-white/60 hover:border-slate-300')
              }`}>
                
                {/* Card Image / Preview Graphic */}
                <div className={`h-3/5 w-full relative overflow-hidden ${t('bg-zinc-800', 'bg-slate-100')}`}>
                  <div className={`absolute inset-0 bg-gradient-to-t z-10 transition-colors duration-500 ${
                    t('from-zinc-900 via-transparent to-transparent', 'from-white via-transparent to-transparent')
                  }`}></div>
                  <img src={tpl.image} alt={tpl.name} className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${t('opacity-70', 'opacity-90')}`} />
                  
                  {/* Color Palette Badges */}
                  <div className={`absolute top-4 right-4 z-20 flex gap-1 backdrop-blur-md p-1.5 rounded-full border ${
                    t('bg-zinc-950/50 border-white/10', 'bg-white/50 border-slate-200/50 shadow-sm')
                  }`}>
                    {tpl.colors.map((color, i) => (
                      <div key={i} className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: color }}></div>
                    ))}
                  </div>
                </div>

                {/* Card Content */}
                <div className="h-2/5 p-6 flex flex-col justify-between relative z-20">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className={t("text-indigo-400", "text-indigo-600")}>{tpl.icon}</div>
                      <h3 className={`text-xl font-bold tracking-wide transition-colors ${t("text-white", "text-slate-800")}`}>
                        {tpl.name}
                      </h3>
                    </div>
                    <p className={`text-xs line-clamp-2 mb-3 transition-colors ${t("text-zinc-400", "text-slate-500")}`}>
                      {tpl.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {tpl.tags.map(tag => (
                        <span key={tag} className={`text-[9px] uppercase font-bold tracking-wider px-2 py-1 rounded-md border transition-colors ${
                          t("bg-zinc-800 text-zinc-300 border-zinc-700", "bg-slate-100 text-slate-600 border-slate-200")
                        }`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Active Card Action Button */}
                  <div className={`transition-all duration-500 transform ${isCenter ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'}`}>
                    <button 
                      onClick={() => onSelectTemplate && onSelectTemplate(tpl.id)}
                      className={`w-full py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-lg hover:-translate-y-0.5 active:translate-y-0 ${
                        t("bg-white text-zinc-900 hover:bg-zinc-200 shadow-white/10", "bg-slate-900 text-white hover:bg-slate-800 shadow-slate-900/20")
                      }`}
                    >
                      <Eye size={16} /> Preview & Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center gap-6 mt-12 z-10">
        <button 
          onClick={handlePrev}
          className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all backdrop-blur-sm ${
            t("bg-zinc-900/80 border-zinc-700 text-zinc-400 hover:text-white hover:border-indigo-500 hover:bg-indigo-500/10", 
              "bg-white/80 border-slate-200 text-slate-500 hover:text-slate-800 hover:border-indigo-400 hover:bg-indigo-50 shadow-sm")
          }`}
        >
          <ChevronLeft size={24} />
        </button>
        
        {/* Indicators */}
        <div className="flex gap-2">
          {templates.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1.5 rounded-full transition-all duration-500 ${
                idx === activeIdx 
                  ? 'w-8 bg-gradient-to-r from-indigo-500 to-purple-500' 
                  : t('w-2 bg-zinc-700', 'w-2 bg-slate-300')
              }`}
            ></div>
          ))}
        </div>

        <button 
          onClick={handleNext}
          className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all backdrop-blur-sm ${
            t("bg-zinc-900/80 border-zinc-700 text-zinc-400 hover:text-white hover:border-indigo-500 hover:bg-indigo-500/10", 
              "bg-white/80 border-slate-200 text-slate-500 hover:text-slate-800 hover:border-indigo-400 hover:bg-indigo-50 shadow-sm")
          }`}
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Signature Footer */}
      <footer className="mt-12 relative z-10 animate-fade-in-down" style={{ animationDelay: '0.2s' }}>
        <div className={`flex items-center gap-3 px-6 py-3 rounded-full border backdrop-blur-md shadow-lg transition-colors duration-500 ${
          t("bg-zinc-900/40 border-white/10", "bg-white/60 border-slate-200/80")
        }`}>
          <span className={`text-[10px] uppercase tracking-widest font-bold ${t("text-zinc-500", "text-slate-400")}`}>
            Crafted by
          </span>
          <div className={`w-[1px] h-4 ${t("bg-zinc-700", "bg-slate-300")}`}></div>
          <span className="text-[11px] font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 tracking-wider uppercase cursor-default">
            Arpit Kumar
          </span>
        </div>
      </footer>

      <style jsx global>{`
        .perspective-[1200px] {
          perspective: 1200px;
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out forwards;
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default TemplateSelector;