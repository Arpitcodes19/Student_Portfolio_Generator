import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { 
  Github, Linkedin, Mail, MapPin, 
  Briefcase, GraduationCap, Code2, ExternalLink, Download, Sparkles 
} from 'lucide-react';

const GlassmorphismPro = ({ data }) => {
  const containerRef = useRef(null);

  const {
    fullName = 'Your Name',
    imagePreview = null,
    email = '',
    location = '',
    about = 'Creating digital experiences.',
    college = '',
    degree = '',
    graduationYear = '',
    experienceLevel = '',
    company = '',
    role = '',
    duration = '',
    projectTitle = '',
    projectDesc = '',
    projectLink = '',
    github = '',
    linkedin = '',
    skills = []
  } = data || {};

  // High-End GSAP Cinematic Reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Slow, deep orb movement
      gsap.to(".orb-1", { y: -80, x: 50, scale: 1.1, duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".orb-2", { y: 60, x: -60, scale: 1.2, duration: 10, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1 });
      gsap.to(".orb-3", { scale: 1.3, x: 30, duration: 7, repeat: -1, yoyo: true, ease: "sine.inOut" });

      // 3D Staggered Bento Card Reveal
      gsap.fromTo(
        ".bento-card",
        { y: 80, opacity: 0, scale: 0.95, rotationX: 15 },
        { y: 0, opacity: 1, scale: 1, rotationX: 0, duration: 1.5, stagger: 0.1, ease: "expo.out", delay: 0.2 }
      );
      
      // Header drop in
      gsap.fromTo(
        ".header-animate",
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    // Base: Deep space black for maximum contrast
    <div className="min-h-screen bg-[#030014] text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 pb-20 relative overflow-hidden print:bg-white print:text-slate-900" ref={containerRef}>
      
      {/* 1. Grain/Noise Texture (Crucial for premium glass effect) */}
      <div className="fixed inset-0 opacity-[0.04] pointer-events-none z-10 mix-blend-overlay print:hidden" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* 2. Insane Floating Neon Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none print:hidden z-0">
        <div className="orb-1 absolute top-[-15%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-violet-600/30 blur-[120px] mix-blend-screen"></div>
        <div className="orb-2 absolute bottom-[-10%] right-[-5%] w-[55vw] h-[55vw] rounded-full bg-cyan-600/20 blur-[150px] mix-blend-screen"></div>
        <div className="orb-3 absolute top-[30%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-fuchsia-600/10 blur-[100px] mix-blend-screen"></div>
      </div>

      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 pt-10">
        
        {/* Top Navigation */}
        <header className="header-animate flex justify-between items-center mb-10 print:mb-8">
          <div className="text-2xl font-black tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] print:text-slate-900 print:drop-shadow-none">
            {fullName.split(' ')[0]}<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">.io</span>
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex gap-4 print:hidden bg-white/[0.03] border border-white/[0.05] p-2 px-4 rounded-full backdrop-blur-md shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]">
              {github && <a href={`https://github.com/${github}`} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-cyan-300 hover:scale-110 transition-all duration-300"><Github size={18} /></a>}
              {linkedin && <a href={`https://${linkedin}`} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-cyan-300 hover:scale-110 transition-all duration-300"><Linkedin size={18} /></a>}
              {email && <a href={`mailto:${email}`} className="text-slate-400 hover:text-cyan-300 hover:scale-110 transition-all duration-300"><Mail size={18} /></a>}
            </div>
            <button 
              onClick={handleDownloadPDF}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm font-semibold transition-all print:hidden flex items-center gap-2 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(34,211,238,0.2)] hover:border-cyan-500/30"
            >
              <Download size={16} /> Save PDF
            </button>
          </div>
        </header>

        {/* BENTO BOX GRID LAYOUT */}
        <main className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-[auto_auto] gap-6">
          
          {/* Bento Box 1: Hero (Spans 2 columns) */}
          <section className="bento-card md:col-span-2 relative overflow-hidden rounded-[2.5rem] bg-white/[0.02] border border-white/[0.05] backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] p-10 md:p-12 group hover:bg-white/[0.04] transition-colors duration-500 print:shadow-none print:border-slate-200 print:bg-transparent">
            {/* Glossy top edge highlight */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50"></div>
            
            <div className="flex flex-col md:flex-row gap-10 items-center relative z-10">
              {imagePreview && (
                <div className="relative w-36 h-36 md:w-48 md:h-48 flex-shrink-0">
                  {/* Glowing rings behind image */}
                  <div className="absolute inset-0 rounded-full border border-cyan-500/30 scale-[1.15] animate-[spin_10s_linear_infinite] print:hidden"></div>
                  <div className="absolute inset-0 rounded-full border border-violet-500/30 scale-[1.3] animate-[spin_15s_linear_infinite_reverse] print:hidden"></div>
                  <img 
                    src={imagePreview} 
                    alt={fullName} 
                    className="relative z-10 w-full h-full object-cover rounded-full border border-white/20 shadow-[0_0_40px_rgba(139,92,246,0.3)] print:border-slate-300 print:shadow-none"
                  />
                </div>
              )}
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-cyan-300 text-[10px] font-bold uppercase tracking-[0.2em] mb-6 print:bg-slate-100 print:text-slate-600 print:border-slate-200 shadow-[inset_0_0_10px_rgba(255,255,255,0.02)]">
                  <Sparkles size={12} className="text-violet-400" />
                  {experienceLevel || 'Professional'}
                </div>
                <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4 text-white drop-shadow-md print:text-slate-900">
                  {fullName}
                </h1>
                <p className="text-lg text-slate-300 leading-relaxed font-light print:text-slate-600">
                  {about}
                </p>
                {location && (
                  <div className="mt-6 flex items-center justify-center md:justify-start gap-2 text-sm text-slate-400 font-medium print:text-slate-500">
                    <MapPin size={16} className="text-cyan-400 print:text-slate-400"/> {location}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Bento Box 2: Skills (Spans 1 column, right side) */}
          <section className="bento-card md:col-span-1 relative overflow-hidden rounded-[2.5rem] bg-white/[0.02] border border-white/[0.05] backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] p-8 md:p-10 flex flex-col print:shadow-none print:border-slate-200 print:bg-transparent">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400 mb-6 flex items-center gap-3 print:text-slate-500">
              <Code2 size={16} /> Arsenal
            </h2>
            <div className="flex flex-wrap gap-2 mt-auto">
              {skills.map((skill, index) => (
                <span key={index} className="px-4 py-2 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm font-medium text-slate-200 hover:bg-cyan-500/20 hover:border-cyan-400/50 hover:text-white transition-all duration-300 cursor-default shadow-[0_4px_10px_rgba(0,0,0,0.2)] print:bg-slate-100 print:border-slate-200 print:text-slate-700 print:shadow-none">
                  {skill}
                </span>
              ))}
              {skills.length === 0 && <span className="text-slate-500 text-sm">No skills added yet.</span>}
            </div>
          </section>

          {/* Bento Box 3: Experience (Spans 1 column) */}
          {role && (
            <section className="bento-card relative overflow-hidden rounded-[2.5rem] bg-white/[0.02] border border-white/[0.05] backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] p-8 md:p-10 group print:shadow-none print:border-slate-200 print:bg-transparent">
              <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 blur-[50px] rounded-full group-hover:bg-violet-500/20 transition-all duration-500 pointer-events-none print:hidden"></div>
              
              <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-400 mb-8 flex items-center gap-3 print:text-slate-500">
                <Briefcase size={16} /> Experience
              </h2>
              <div className="relative pl-5 border-l border-white/10 print:border-slate-200">
                <div className="absolute w-2 h-2 bg-violet-400 rounded-full -left-[4.5px] top-2 shadow-[0_0_15px_rgba(139,92,246,0.8)] print:shadow-none print:bg-slate-400"></div>
                <h3 className="text-2xl font-black text-white tracking-wide print:text-slate-900">{role}</h3>
                <p className="text-slate-300 mt-1 font-medium print:text-slate-600">{company}</p>
                <div className="inline-block mt-4 px-3 py-1.5 bg-white/[0.05] rounded-lg text-xs font-semibold tracking-wider text-slate-400 print:bg-slate-100 print:text-slate-500">
                  {duration}
                </div>
              </div>
            </section>
          )}

          {/* Bento Box 4: Education (Spans 1 column) */}
          {college && (
            <section className="bento-card relative overflow-hidden rounded-[2.5rem] bg-white/[0.02] border border-white/[0.05] backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] p-8 md:p-10 group print:shadow-none print:border-slate-200 print:bg-transparent">
               <div className="absolute bottom-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] rounded-full group-hover:bg-emerald-500/20 transition-all duration-500 pointer-events-none print:hidden"></div>

              <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400 mb-8 flex items-center gap-3 print:text-slate-500">
                <GraduationCap size={16} /> Education
              </h2>
              <h3 className="text-xl font-bold text-white leading-tight print:text-slate-900">{degree}</h3>
              <p className="text-sm text-slate-300 mt-2 font-medium print:text-slate-600">{college}</p>
              <div className="mt-6 pt-4 border-t border-white/5 print:border-slate-200 flex justify-between items-center">
                <span className="text-[10px] text-slate-500 font-bold tracking-[0.2em] uppercase">Class of</span>
                <span className="text-emerald-300 font-bold bg-emerald-500/10 px-3 py-1 rounded-full text-xs print:bg-slate-100 print:text-slate-700">{graduationYear}</span>
              </div>
            </section>
          )}

          {/* Bento Box 5: Featured Project (Spans 1 column, dynamic sizing based on what's missing) */}
          {projectTitle && (
            <section className={`bento-card relative overflow-hidden rounded-[2.5rem] bg-white/[0.02] border border-white/[0.05] backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] p-8 md:p-10 group hover:bg-white/[0.04] transition-all duration-500 print:shadow-none print:border-slate-200 print:bg-transparent ${!role || !college ? 'md:col-span-2' : 'md:col-span-1'}`}>
              
              <div className="flex justify-between items-start mb-6 relative z-10">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-fuchsia-400 flex items-center gap-3 print:text-slate-500">
                  <ExternalLink size={16} /> Spotlight
                </h2>
                {projectLink && (
                  <a href={projectLink.startsWith('http') ? projectLink : `https://${projectLink}`} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center hover:bg-fuchsia-500 hover:text-white transition-all duration-300 transform group-hover:rotate-45 hover:shadow-[0_0_20px_rgba(217,70,239,0.4)] print:hidden">
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
              <h3 className="text-2xl font-black text-white mb-3 print:text-slate-900 relative z-10">{projectTitle}</h3>
              <p className="text-sm text-slate-300 leading-relaxed font-light relative z-10 print:text-slate-600 line-clamp-4">{projectDesc}</p>
              
              {/* Decorative graphic in the background of the card */}
              <div className="absolute -bottom-10 -right-10 w-48 h-48 border border-white/5 rounded-full pointer-events-none group-hover:scale-110 transition-transform duration-700 print:hidden"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-fuchsia-500/10 rounded-full pointer-events-none group-hover:scale-110 transition-transform duration-700 delay-75 print:hidden"></div>
            </section>
          )}
        </main>

        {/* Signature Footer */}
        <footer className="mt-20 flex justify-center pb-8 bento-card print:hidden">
          <div className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/[0.08] bg-white/[0.02] backdrop-blur-2xl shadow-xl">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">
              Crafted by
            </span>
            <div className="w-[1px] h-4 bg-white/20"></div>
            <span className="text-[11px] font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 tracking-wider uppercase cursor-default">
              Arpit Kumar
            </span>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default GlassmorphismPro;