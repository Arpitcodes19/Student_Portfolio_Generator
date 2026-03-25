import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { 
  Github, Linkedin, Mail, ExternalLink, 
  Terminal, User, Trophy, MapPin, Download, Star, Code, ArrowUpRight
} from 'lucide-react';

const BentoGrid = ({ data }) => {
  const containerRef = useRef(null);

  const {
    fullName = 'ARPIT',
    imagePreview = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2000&auto=format&fit=crop',
    about = 'Building scalable MERN applications with a focus on high-performance animations and 3D web experiences.',
    skills = ['React', 'Node.js', 'Three.js', 'GSAP', 'MongoDB', 'PostgreSQL'],
    projectTitle = 'Portfolio OS',
    projectDesc = 'A system-level portfolio builder designed for the next generation of full-stack developers.',
    projectLink = '#',
    role = 'Full Stack Developer',
    company = 'Kasganj, UP',
    github = '',
    linkedin = '',
    email = ''
  } = data || {};

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Brutalist reveal - No fades, just sharp movements
      gsap.from(".neo-card", {
        y: 100,
        x: -20,
        rotate: -2,
        duration: 0.8,
        stagger: 0.1,
        ease: "power4.out"
      });
      
      // Infinite marquee animation for skills or footer
      gsap.to(".marquee-inner", {
        xPercent: -50,
        repeat: -1,
        duration: 20,
        ease: "none"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[#F0F0F0] p-4 md:p-12 font-mono text-black selection:bg-yellow-300" ref={containerRef}>
      
      {/* Top Header Label */}
      <div className="max-w-6xl mx-auto mb-8 flex justify-between items-end border-b-4 border-black pb-4">
        <div>
          <h2 className="text-sm font-black tracking-tighter uppercase italic">Status: Available for hire</h2>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Dev_Version: 3.0.1</p>
        </div>
        <div className="text-right">
           <span className="text-4xl font-black">2026©</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[160px]">
        
        {/* PROFILE CARD - THE HERO */}
        <div className="neo-card md:col-span-7 md:row-span-3 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 flex flex-col justify-between group hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
          <div>
            <div className="w-32 h-32 border-4 border-black mb-8 overflow-hidden bg-yellow-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <img src={imagePreview} alt="Profile" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-4 uppercase">
              {fullName}
            </h1>
            <div className="inline-block bg-black text-white px-4 py-1 text-xl font-bold italic rotate-[-1deg]">
              {role}
            </div>
          </div>
          
          <div className="flex gap-4 mt-8">
            <button className="bg-yellow-400 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all">
              <Github size={28} />
            </button>
            <button className="bg-cyan-400 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all">
              <Linkedin size={28} />
            </button>
            <button className="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all">
              <Mail size={28} />
            </button>
          </div>
        </div>

        {/* ABOUT SECTION - SOLID YELLOW */}
        <div className="neo-card md:col-span-5 md:row-span-2 bg-[#FFEB3B] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 flex flex-col justify-center">
          <Terminal className="mb-4" size={32} />
          <h3 className="text-2xl font-black mb-4 underline decoration-4">MISSION_STATEMENT:</h3>
          <p className="text-lg font-bold leading-tight uppercase italic">{about}</p>
        </div>

        {/* TECH STACK - GRID LOOK */}
        <div className="neo-card md:col-span-5 md:row-span-2 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8">
          <div className="flex items-center gap-2 mb-6 font-black text-xl italic uppercase">
            <Code size={24}/> Stack_Dump
          </div>
          <div className="grid grid-cols-2 gap-2">
            {skills.map((s, i) => (
              <div key={i} className="border-2 border-black p-2 font-bold hover:bg-black hover:text-white transition-colors cursor-default">
                {`> ${s}`}
              </div>
            ))}
          </div>
        </div>

        {/* PROJECT CARD - THE 'VINTAGE' BUTTON LOOK */}
        <div className="neo-card md:col-span-8 md:row-span-2 bg-cyan-400 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 flex flex-col justify-between group overflow-hidden relative">
          <Star className="absolute -top-4 -right-4 w-24 h-24 opacity-20" />
          <div>
            <div className="flex justify-between items-start mb-4">
              <Trophy size={40} />
              <button className="bg-white border-4 border-black p-2 font-black uppercase text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                Project_Report
              </button>
            </div>
            <h3 className="text-4xl font-black italic uppercase mb-2">{projectTitle}</h3>
            <p className="text-lg font-bold leading-none max-w-lg uppercase italic">{projectDesc}</p>
          </div>
          <a href={projectLink} className="flex items-center gap-2 font-black text-xl hover:underline mt-4">
            GO_TO_LIVE_PREVIEW <ArrowUpRight size={24} />
          </a>
        </div>

        {/* SMALL STAT CARDS */}
        <div className="neo-card md:col-span-4 md:row-span-1 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 flex items-center gap-4">
          <MapPin size={32} />
          <div>
            <p className="text-[10px] font-black uppercase text-gray-400">Located_In</p>
            <p className="font-black text-xl">{company}</p>
          </div>
        </div>

        <div className="neo-card md:col-span-4 md:row-span-1 bg-[#FF5722] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 flex flex-col justify-center text-white">
          <div className="flex justify-between items-center">
            <span className="font-black italic text-2xl uppercase">Resume.pdf</span>
            <Download size={28} />
          </div>
        </div>

      </div>

      {/* FOOTER - MARQUEE STYLE */}
      <footer className="mt-20 border-t-4 border-b-4 border-black py-4 overflow-hidden bg-white">
        <div className="marquee-inner flex whitespace-nowrap gap-8 items-center">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-8">
              <span className="text-2xl font-black italic uppercase">DESIGNED BY ARPIT</span>
              <Star className="fill-black" size={24} />
              <span className="text-2xl font-black italic uppercase">BUILDING THE FUTURE</span>
              <Star className="fill-black" size={24} />
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default BentoGrid;