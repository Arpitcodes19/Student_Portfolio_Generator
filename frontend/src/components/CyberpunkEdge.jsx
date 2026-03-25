import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Terminal, Github, Linkedin, Mail, MapPin, Cpu, Zap, Globe, Download, AlertTriangle, ShieldAlert } from 'lucide-react';

const CyberpunkEdge = ({ data }) => {
  const containerRef = useRef(null);
  
  const {
    fullName = 'UNKNOWN_USER',
    imagePreview = null,
    email = '',
    location = 'Sector 7G',
    about = 'System ready. Awaiting commands.',
    college = '',
    degree = '',
    graduationYear = '',
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

  // Cyberpunk GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered reveal of UI elements (dropping in from top)
      gsap.fromTo(".cyber-elem", 
        { opacity: 0, y: -20, clipPath: "inset(0% 0% 100% 0%)" }, 
        { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, stagger: 0.15, ease: "power3.out", delay: 0.2 }
      );

      // Glitch effect on the main avatar
      gsap.to(".avatar-glitch", {
        x: () => Math.random() * 10 - 5,
        y: () => Math.random() * 10 - 5,
        opacity: () => Math.random() * 0.5 + 0.5,
        duration: 0.1,
        repeat: -1,
        repeatDelay: 3,
        yoyo: true,
        ease: "rough({ template: none.out, strength: 1, points: 20, taper: 'none', randomize: true, clamp: false})"
      });
      
      // Typing effect for the "about" paragraph
      const aboutEl = document.querySelector(".typewriter-text");
      if (aboutEl) {
        const text = aboutEl.innerText;
        aboutEl.innerHTML = "";
        text.split("").forEach((char, i) => {
          const span = document.createElement("span");
          span.innerText = char;
          span.style.opacity = 0;
          aboutEl.appendChild(span);
          gsap.to(span, { opacity: 1, duration: 0.01, delay: 1.0 + (i * 0.02) });
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#030303] print:bg-white font-mono text-[#00f0ff] selection:bg-[#ff003c] selection:text-white relative overflow-hidden" ref={containerRef}>
      
      {/* --- INJECTED CUSTOM CSS FOR CYBERPUNK EFFECTS --- */}
      <style>{`
        /* CRT Scanlines Overlay */
        .scanlines {
          background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
          background-size: 100% 4px, 3px 100%;
          pointer-events: none;
        }
        /* Moving Grid Background */
        .cyber-grid {
          background-image: 
            linear-gradient(transparent 95%, rgba(0, 240, 255, 0.15) 100%),
            linear-gradient(90deg, transparent 95%, rgba(0, 240, 255, 0.15) 100%);
          background-size: 40px 40px;
          animation: gridMove 20s linear infinite;
        }
        @keyframes gridMove {
          0% { background-position: 0 0; }
          100% { background-position: 0 400px; }
        }
        /* Cut Corner Borders (Cyberpunk classic look) */
        .clip-cut {
          clip-path: polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%);
        }
        .clip-cut-reverse {
          clip-path: polygon(20px 0, 100% 0, 100% 100%, 0 100%, 0 20px);
        }
        /* Chromatic Aberration Text Glitch */
        .text-glitch {
          position: relative;
        }
        .text-glitch::before, .text-glitch::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #030303;
        }
        .text-glitch::before {
          left: 2px;
          text-shadow: -1px 0 #ff003c;
          clip: rect(24px, 550px, 90px, 0);
          animation: glitch-anim 2s infinite linear alternate-reverse;
        }
        .text-glitch::after {
          left: -2px;
          text-shadow: -1px 0 #00f0ff;
          clip: rect(85px, 550px, 140px, 0);
          animation: glitch-anim 2.5s infinite linear alternate-reverse;
        }
        @keyframes glitch-anim {
          0% { clip: rect(10px, 9999px, 81px, 0); }
          20% { clip: rect(62px, 9999px, 14px, 0); }
          40% { clip: rect(29px, 9999px, 98px, 0); }
          60% { clip: rect(86px, 9999px, 23px, 0); }
          80% { clip: rect(4px, 9999px, 73px, 0); }
          100% { clip: rect(93px, 9999px, 45px, 0); }
        }
        /* Striped Warning Pattern */
        .warning-stripes {
          background: repeating-linear-gradient(
            45deg,
            #fcee0a,
            #fcee0a 10px,
            #000000 10px,
            #000000 20px
          );
        }
      `}</style>

      {/* Persistent Scanlines & Grid - Hidden on Print */}
      <div className="scanlines fixed inset-0 z-0 print:hidden"></div>
      <div className="cyber-grid absolute inset-0 z-0 print:hidden"></div>

      {/* Marquee Banner */}
      <div className="relative z-10 w-full bg-[#fcee0a] text-black text-[10px] font-black tracking-[0.2em] py-1 overflow-hidden print:hidden border-b-2 border-black cyber-elem">
        <div className="whitespace-nowrap animate-[marquee_15s_linear_infinite]">
          WARNING: UNAUTHORIZED ACCESS DETECTED // SYSTEM OVERRIDE INITIATED // NEURAL LINK ACTIVE // WELCOME TO THE MAINFRAME // WARNING: UNAUTHORIZED ACCESS DETECTED //
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 pb-20 print:text-black">
        
        {/* Header / System Nav */}
        <header className="py-6 flex justify-between items-end border-b-2 border-[#ff003c]/40 mb-12 cyber-elem print:border-black">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-[#ff003c] tracking-[0.3em] font-bold">/// SYS.OP.INTERFACE</span>
            <div className="flex items-center gap-3">
              <ShieldAlert size={28} className="text-[#00f0ff] animate-pulse" />
              <span className="text-2xl font-black tracking-widest uppercase text-white drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] print:text-black print:drop-shadow-none">
                NET.<span className="text-[#ff003c]">RUNNER</span>
              </span>
            </div>
          </div>
          
          <div className="flex gap-4 items-center print:hidden">
            {github && <a href={`https://github.com/${github}`} target="_blank" rel="noreferrer" className="text-white hover:text-[#00f0ff] hover:drop-shadow-[0_0_5px_#00f0ff] transition-all duration-300"><Github size={22} /></a>}
            {linkedin && <a href={`https://${linkedin}`} target="_blank" rel="noreferrer" className="text-white hover:text-[#00f0ff] hover:drop-shadow-[0_0_5px_#00f0ff] transition-all duration-300"><Linkedin size={22} /></a>}
            {email && <a href={`mailto:${email}`} className="text-white hover:text-[#00f0ff] hover:drop-shadow-[0_0_5px_#00f0ff] transition-all duration-300"><Mail size={22} /></a>}
            
            <button 
              onClick={handleDownloadPDF}
              className="ml-6 clip-cut px-6 py-2 bg-[#ff003c] text-white text-xs font-black uppercase tracking-widest hover:bg-[#00f0ff] hover:text-black transition-colors duration-300 flex items-center gap-2 group relative overflow-hidden"
            >
              <div className="absolute inset-0 warning-stripes opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <Download size={16} /> DATA_DUMP
            </button>
          </div>
        </header>

        <main className="space-y-16 mt-4">
          
          {/* Hero Profile */}
          <section className="cyber-elem flex flex-col-reverse md:flex-row gap-10 items-center md:items-start relative group">
            
            {/* Holographic Text Info */}
            <div className="flex-1 bg-black/60 clip-cut border-l-4 border-[#00f0ff] p-8 md:p-12 backdrop-blur-sm relative print:border-black print:bg-white">
              {/* Decorative Tech Accents */}
              <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#ff003c]/50 print:hidden"></div>
              <div className="absolute bottom-4 left-4 text-[8px] text-[#ff003c] opacity-50 font-sans print:hidden">01001000 01101001</div>
              
              <div className="inline-block px-3 py-1 bg-[#fcee0a] text-black text-[10px] font-black tracking-widest mb-6 shadow-[4px_4px_0_#ff003c] print:shadow-none print:border print:border-black">
                STATUS: ENHANCED_
              </div>

              <h1 className="text-5xl md:text-7xl font-black uppercase text-white mb-2 tracking-tighter text-glitch print:text-black print:text-shadow-none" data-text={fullName}>
                {fullName}
              </h1>
              
              <h2 className="text-xl md:text-2xl text-[#00f0ff] mb-8 flex items-center gap-3 drop-shadow-[0_0_5px_rgba(0,240,255,0.5)] print:text-gray-800 print:drop-shadow-none">
                <Terminal size={20} className="text-[#ff003c]" /> {role || 'MERCENARY'}
              </h2>
              
              <p className="typewriter-text text-slate-300 leading-relaxed mb-8 border-l-2 border-[#ff003c]/40 pl-4 min-h-[60px] print:text-black">
                {about}
              </p>
              
              {location && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] text-xs tracking-widest print:border-black print:text-black print:bg-transparent">
                  <MapPin size={14} className="text-[#ff003c]" /> {location}
                </div>
              )}
            </div>

            {/* Avatar Hologram */}
            {imagePreview ? (
              <div className="relative w-48 h-48 md:w-64 md:h-64 flex-shrink-0 avatar-glitch group-hover:scale-[1.02] transition-transform duration-500">
                {/* Cyber Frame */}
                <div className="absolute inset-0 clip-cut-reverse border-2 border-[#00f0ff] shadow-[0_0_20px_rgba(0,240,255,0.3)] bg-[#ff003c]/20 print:border-black print:shadow-none print:bg-transparent"></div>
                <div className="absolute -inset-2 clip-cut border border-[#ff003c] opacity-50 z-[-1] print:hidden"></div>
                <img 
                  src={imagePreview} 
                  alt="User" 
                  className="absolute inset-1 w-[calc(100%-8px)] h-[calc(100%-8px)] object-cover clip-cut-reverse filter contrast-[1.2] saturate-[1.2] grayscale-[30%] mix-blend-screen group-hover:mix-blend-normal group-hover:grayscale-0 transition-all duration-700 print:mix-blend-normal print:filter-none" 
                />
                {/* Scanline overlay over image */}
                <div className="absolute inset-1 clip-cut-reverse bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,240,255,0.1)_2px,rgba(0,240,255,0.1)_4px)] pointer-events-none print:hidden"></div>
              </div>
            ) : (
              <div className="w-48 h-48 clip-cut-reverse border-2 border-[#00f0ff] flex flex-col items-center justify-center text-[#00f0ff] bg-black/80 print:border-black print:text-black print:bg-white">
                <AlertTriangle size={32} className="mb-2 text-[#ff003c] animate-pulse" />
                <span className="text-[10px] tracking-widest">IMG_NOT_FOUND</span>
              </div>
            )}
          </section>

          {/* Data Grid: Skills */}
          {skills.length > 0 && (
            <section className="cyber-elem print:break-inside-avoid">
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-xl font-black text-white uppercase tracking-[0.2em] print:text-black">
                  <span className="text-[#ff003c]">/</span>/ CYBERWARE_LOADOUT
                </h3>
                <div className="flex-1 h-[2px] bg-gradient-to-r from-[#00f0ff]/50 to-transparent print:bg-black"></div>
              </div>
              
              <div className="flex flex-wrap gap-3 md:gap-4">
                {skills.map((skill, index) => (
                  <div key={index} className="group relative">
                    <span className="relative z-10 block px-4 py-2 bg-black border border-[#00f0ff]/40 text-[#00f0ff] text-xs font-bold tracking-widest uppercase transition-all duration-300 group-hover:bg-[#00f0ff] group-hover:text-black group-hover:border-[#00f0ff] print:border-black print:text-black print:bg-white">
                      {skill}
                    </span>
                    {/* Shadow block behind skill */}
                    <div className="absolute top-1 left-1 w-full h-full bg-[#ff003c] z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 print:hidden"></div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Logs: Exp & Edu */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 print:break-inside-avoid">
            
            {/* Experience Block */}
            {role && (
              <div className="cyber-elem bg-black/80 clip-cut border border-[#ff003c]/40 p-8 hover:border-[#ff003c] hover:shadow-[0_0_30px_rgba(255,0,60,0.15)] transition-all duration-500 relative group print:border-black print:bg-white print:shadow-none">
                <div className="absolute top-0 right-4 w-1 h-8 bg-[#ff003c] group-hover:h-full transition-all duration-500 opacity-50 print:hidden"></div>
                
                <h3 className="text-[10px] text-[#ff003c] tracking-[0.3em] font-bold mb-4 flex items-center gap-2">
                  <Cpu size={14} /> CORP_HISTORY
                </h3>
                <h4 className="text-2xl text-white font-black uppercase tracking-tight mb-1 print:text-black">{role}</h4>
                <p className="text-[#00f0ff] text-sm tracking-widest font-bold mb-6 print:text-gray-700">{company}</p>
                
                <div className="inline-flex text-[10px] bg-[#111] text-slate-400 px-3 py-1 border border-slate-800 print:bg-transparent print:border-gray-300">
                  UPTIME: <span className="text-white ml-2 print:text-black">{duration}</span>
                </div>
              </div>
            )}

            {/* Education Block */}
            {college && (
              <div className="cyber-elem bg-black/80 clip-cut border border-[#00f0ff]/40 p-8 hover:border-[#00f0ff] hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] transition-all duration-500 relative group print:border-black print:bg-white print:shadow-none">
                <div className="absolute top-0 right-4 w-1 h-8 bg-[#00f0ff] group-hover:h-full transition-all duration-500 opacity-50 print:hidden"></div>

                <h3 className="text-[10px] text-[#00f0ff] tracking-[0.3em] font-bold mb-4 flex items-center gap-2">
                  <Zap size={14} /> NEURAL_TRAINING
                </h3>
                <h4 className="text-2xl text-white font-black uppercase tracking-tight mb-1 print:text-black">{degree}</h4>
                <p className="text-[#ff003c] text-sm tracking-widest font-bold mb-6 print:text-gray-700">{college}</p>
                
                <div className="inline-flex text-[10px] bg-[#111] text-slate-400 px-3 py-1 border border-slate-800 print:bg-transparent print:border-gray-300">
                  VERSION_PATCH: <span className="text-white ml-2 print:text-black">{graduationYear}</span>
                </div>
              </div>
            )}
          </section>

          {/* Main Quest: Project */}
          {projectTitle && (
            <section className="cyber-elem print:break-inside-avoid">
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-xl font-black text-white uppercase tracking-[0.2em] print:text-black">
                  <span className="text-[#fcee0a]">/</span>/ PRIMARY_DIRECTIVE
                </h3>
                <div className="flex-1 h-[2px] bg-gradient-to-r from-[#fcee0a]/50 to-transparent print:bg-black"></div>
              </div>

              <div className="bg-[#fcee0a]/10 border-2 border-[#fcee0a] p-8 md:p-12 relative group print:bg-white print:border-black">
                {/* Tech Bracket Corners */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#fcee0a] -translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300 print:hidden"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#fcee0a] translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300 print:hidden"></div>

                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-6">
                  <div>
                    <div className="text-[10px] text-[#fcee0a] tracking-widest font-bold mb-2 print:text-black">EXECUTABLE_FOUND</div>
                    <h4 className="text-3xl md:text-4xl text-white uppercase font-black tracking-tight print:text-black">{projectTitle}</h4>
                  </div>
                  
                  {projectLink && (
                    <a href={projectLink} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#fcee0a] text-black text-xs font-black uppercase tracking-widest hover:bg-white transition-colors flex-shrink-0 group/btn print:border print:border-black print:bg-transparent">
                      <Globe size={16} className="group-hover/btn:animate-spin print:hidden" />
                      RUN_PROGRAM
                    </a>
                  )}
                </div>
                
                <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-3xl print:text-gray-800">
                  {projectDesc}
                </p>

                {/* Print Only Link */}
                {projectLink && (
                   <p className="hidden print:block text-xs mt-4 text-gray-500 font-mono">
                     SRC: {projectLink}
                   </p>
                )}
              </div>
            </section>
          )}

        </main>
        
        <footer className="mt-24 pt-8 border-t border-slate-800 text-center cyber-elem print:border-t-black">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] print:text-gray-500">
            {fullName} // NEURAL IMPRINT RECORDED
          </p>
        </footer>
      </div>
    </div>
  );
};

export default CyberpunkEdge;