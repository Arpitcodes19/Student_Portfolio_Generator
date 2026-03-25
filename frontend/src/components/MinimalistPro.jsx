import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { 
  Github, Linkedin, Mail, ExternalLink, MapPin, 
  Briefcase, GraduationCap, Code, ArrowUpRight, Download 
} from 'lucide-react';

const MinimalistPro = ({ data }) => {
  const containerRef = useRef(null);

  // Destructure data with safe fallbacks. 
  const {
    fullName = 'Your Name',
    imagePreview = null, // Yahan aapki photo aayegi
    email = '',
    location = '',
    about = 'A passionate professional ready to make an impact.',
    college = '',
    degree = '',
    graduationYear = '',
    experienceLevel = 'Fresher',
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

  // Premium GSAP Reveal Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered fade up for main elements
      gsap.fromTo(
        ".animate-item",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "expo.out", delay: 0.2 }
      );
      
      // Slight scale-in for the project card
      gsap.fromTo(
        ".animate-card",
        { y: 50, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "expo.out", delay: 0.6 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Trigger browser's print to PDF functionality
  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    // Added print:bg-white to ensure a clean background when saving to PDF
    <div className="min-h-screen bg-[#fafafa] print:bg-white text-slate-800 font-sans selection:bg-slate-900 selection:text-white pb-10 relative overflow-hidden" ref={containerRef}>
      
      {/* Subtle background noise/gradient overlay for premium feel - Hidden when printing */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.4] print:hidden" 
           style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, #e2e8f0 0%, transparent 70%)' }}>
      </div>

      <div className="relative z-10">
        {/* Navbar/Header */}
        <header className="max-w-4xl mx-auto px-6 py-12 flex justify-between items-center animate-item">
          <div className="text-2xl font-black tracking-tighter text-slate-900 flex items-center gap-1">
            {fullName.split(' ')[0]}<span className="text-slate-400">.</span>
          </div>
          
          <div className="flex gap-5 items-center">
            {/* Social Links */}
            <div className="flex gap-5 print:hidden">
              {github && <a href={`https://github.com/${github}`} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-900 hover:-translate-y-0.5 transition-all duration-300"><Github size={20} /></a>}
              {linkedin && <a href={`https://${linkedin}`} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-900 hover:-translate-y-0.5 transition-all duration-300"><Linkedin size={20} /></a>}
              {email && <a href={`mailto:${email}`} className="text-slate-400 hover:text-slate-900 hover:-translate-y-0.5 transition-all duration-300"><Mail size={20} /></a>}
            </div>

            {/* Divider */}
            <div className="w-[1px] h-6 bg-slate-200 print:hidden"></div>

            {/* Download Button - Hidden when printing */}
            <button 
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-full hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 print:hidden"
            >
              <Download size={16} />
              <span>Save PDF</span>
            </button>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-6 space-y-24 md:space-y-32 mt-4 md:mt-10">
          
          {/* Hero Section */}
          <section className="animate-item relative">
            
            <div className="flex flex-col-reverse md:flex-row md:items-end justify-between gap-8 mb-8">
              <div>
                {/* Status Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-medium text-slate-600 mb-8 print:shadow-none print:border-slate-300">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 print:hidden"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Available for new opportunities
                </div>

                <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] text-slate-900">
                  Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500 print:text-slate-900">{fullName}</span>. <br />
                  <span className="text-slate-400 font-medium">I build things for the web.</span>
                </h1>
              </div>

              {/* PROFILE IMAGE RENDER (Updated Logic) */}
              {imagePreview && (
                <div className="relative w-32 h-32 md:w-48 md:h-48 flex-shrink-0 mb-4 md:mb-0">
                  <div className="absolute inset-0 bg-indigo-100 rounded-[2.5rem] rotate-6 print:hidden"></div>
                  <img 
                    src={imagePreview} 
                    alt={fullName} 
                    className="relative z-10 w-full h-full object-cover rounded-[2.5rem] border-4 border-white shadow-xl print:shadow-none print:border-slate-200"
                  />
                </div>
              )}
            </div>
            
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed mb-10 font-light">
              {about}
            </p>
            
            {location && (
              <div className="flex items-center gap-2 text-sm font-medium text-slate-400 uppercase tracking-widest">
                <MapPin size={16} /> Based in {location}
              </div>
            )}
          </section>

          {/* Skills Section */}
          {skills.length > 0 && (
            <section className="animate-item">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-8 flex items-center gap-3">
                <Code size={14} /> Technical Arsenal
              </h2>
              <div className="flex flex-wrap gap-2.5">
                {skills.map((skill, index) => (
                  <span key={index} className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-600 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:border-slate-400 hover:text-slate-900 hover:-translate-y-0.5 transition-all duration-300 cursor-default print:shadow-none print:border-slate-300">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Experience / Education Combo (Timeline Style) */}
          <section className="animate-item grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            
            {/* Experience Timeline */}
            {experienceLevel === 'Experienced' && role && (
              <div>
                <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-8 flex items-center gap-3">
                  <Briefcase size={14} /> Experience
                </h2>
                <div className="relative pl-6 border-l border-slate-200">
                  <div className="absolute w-2.5 h-2.5 bg-slate-900 rounded-full -left-[5px] top-2 shadow-[0_0_0_4px_#fafafa] print:shadow-none"></div>
                  <div className="group">
                    <h3 className="text-xl font-bold text-slate-900">{role}</h3>
                    <p className="text-slate-500 font-medium mt-1">{company}</p>
                    <div className="inline-block px-2.5 py-1 bg-slate-100 text-slate-500 text-xs font-semibold rounded-md mt-3 print:border print:border-slate-200">
                      {duration}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Education Timeline */}
            {college && (
              <div>
                <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-8 flex items-center gap-3">
                  <GraduationCap size={14} /> Education
                </h2>
                <div className="relative pl-6 border-l border-slate-200">
                  <div className="absolute w-2.5 h-2.5 bg-slate-300 rounded-full -left-[5px] top-2 shadow-[0_0_0_4px_#fafafa] print:shadow-none print:bg-slate-400"></div>
                  <div className="group">
                    <h3 className="text-xl font-bold text-slate-900">{degree}</h3>
                    <p className="text-slate-500 font-medium mt-1">{college}</p>
                    <div className="inline-block px-2.5 py-1 bg-slate-100 text-slate-500 text-xs font-semibold rounded-md mt-3 print:border print:border-slate-200">
                      Class of {graduationYear}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Featured Project */}
          {projectTitle && (
            <section className="animate-item print:break-inside-avoid">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-8 flex items-center gap-3">
                <ExternalLink size={14} /> Featured Work
              </h2>
              
              <a 
                href={projectLink ? (projectLink.startsWith('http') ? projectLink : `https://${projectLink}`) : '#'} 
                target="_blank" 
                rel="noreferrer" 
                className={`animate-card block group relative bg-white p-8 md:p-12 rounded-[2rem] border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1 ${!projectLink && 'pointer-events-none'} print:shadow-none print:border-slate-300`}
              >
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-3xl font-black tracking-tight text-slate-900 group-hover:text-slate-700 transition-colors">{projectTitle}</h3>
                  {projectLink && (
                    <div className="p-3 bg-slate-50 text-slate-400 rounded-full group-hover:bg-slate-900 group-hover:text-white transition-all duration-300 transform group-hover:rotate-45 print:hidden">
                      <ArrowUpRight size={20} strokeWidth={2.5} />
                    </div>
                  )}
                </div>
                <p className="text-slate-600 text-lg leading-relaxed max-w-2xl font-light">
                  {projectDesc}
                </p>
                {/* Print-only URL display */}
                {projectLink && (
                  <p className="hidden print:block text-slate-400 text-sm mt-4">
                    {projectLink}
                  </p>
                )}
                
                {/* Decorative minimal grid pattern inside the card */}
                <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10 rounded-br-[2rem] pointer-events-none print:hidden" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
              </a>
            </section>
          )}
        </main>

        {/* Signature Footer - Hidden when printing */}
        <footer className="mt-32 flex justify-center relative z-10 animate-item print:hidden">
          <div className="flex items-center gap-3 px-6 py-3 rounded-full border border-slate-200/80 bg-white/80 backdrop-blur-md shadow-lg">
            <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
              Crafted by
            </span>
            <div className="w-[1px] h-4 bg-slate-300"></div>
            <span className="text-[11px] font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 tracking-wider uppercase cursor-default">
              Arpit Kumar
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MinimalistPro;