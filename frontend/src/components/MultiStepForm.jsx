import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { 
  User, BookOpen, Wrench, Briefcase, Camera, Github, Globe, 
  ArrowRight, ArrowLeft, Check, Phone, Linkedin, FileText, Mail, MapPin, Loader2, Calendar, Award,
  Sun, Moon, Sparkles
} from 'lucide-react';

const MultiStepForm = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [resumeName, setResumeName] = useState("");
  
  // Theme State
  const [isDark, setIsDark] = useState(true);
  
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState(["React", "Node.js", "TypeScript"]);

  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', location: '', website: '', about: '',
    college: '', degree: '', graduationYear: '', cgpa: '',
    experienceLevel: 'Fresher', company: '', role: '', duration: '',
    projectTitle: '', projectLink: '', projectDesc: '',
    github: '', linkedin: '', twitter: ''
  });

  const formRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      formRef.current, 
      { opacity: 0, y: 20, scale: 0.98 }, 
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" }
    );
  }, [step]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const addSkill = (e) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      if (!skills.includes(skillInput.trim())) setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill) => setSkills(skills.filter(s => s !== skill));

  const handleLaunch = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      if (onComplete) {
      onComplete({ ...formData, skills ,imagePreview, 
          resumeName});
    }
    console.log("✨ Portfolio Data Sent to App.jsx!");
    }, 2500);
  };

  // Theme Helper
  const t = (darkClass, lightClass) => isDark ? darkClass : lightClass;

  // Reusable Classes
  const inputClass = `w-full px-4 py-3 text-sm rounded-xl outline-none transition-all duration-300 ${
    t("bg-zinc-900/50 border border-zinc-700/50 text-zinc-200 placeholder:text-zinc-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:bg-zinc-900/80 shadow-[inset_0_1px_4px_rgba(0,0,0,0.3)]", 
      "bg-white/50 border border-slate-200/60 text-slate-800 placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 focus:bg-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]")
  }`;
  
  const labelClass = `flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider mb-2 ${
    t("text-zinc-400", "text-slate-500")
  }`;

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 font-sans transition-colors duration-700 relative overflow-hidden ${
      t("bg-[#09090b] text-zinc-200", "bg-[#f8fafc] text-slate-700")
    }`}>
      
      {/* Aesthetic Mesh Background Glows */}
      <div className={`fixed top-[-10%] left-[-10%] w-[500px] h-[500px] blur-[120px] rounded-full pointer-events-none transition-all duration-1000 ${
        t("bg-indigo-600/20", "bg-purple-300/40")
      }`}></div>
      <div className={`fixed bottom-[-10%] right-[-5%] w-[600px] h-[600px] blur-[150px] rounded-full pointer-events-none transition-all duration-1000 ${
        t("bg-blue-600/10", "bg-sky-200/50")
      }`}></div>
      <div className={`fixed top-[20%] right-[15%] w-[300px] h-[300px] blur-[100px] rounded-full pointer-events-none transition-all duration-1000 ${
        t("bg-fuchsia-600/10", "bg-pink-200/40")
      }`}></div>

      <div className={`w-full max-w-3xl backdrop-blur-2xl rounded-[2rem] overflow-hidden flex flex-col max-h-[85vh] z-10 transition-all duration-500 ring-1 ${
        t("bg-zinc-900/40 ring-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]", 
          "bg-white/60 ring-slate-200/80 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)]")
      }`}>
        
        {/* Header */}
        <div className={`p-8 shrink-0 relative flex justify-between items-center transition-colors border-b ${
          t("bg-zinc-900/40 border-white/5", "bg-white/40 border-slate-200/50")
        }`}>
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-black tracking-tight flex items-center gap-3">
              <span className={`bg-clip-text text-transparent bg-gradient-to-r ${t("from-white to-zinc-400", "from-slate-800 to-slate-500")}`}>
                Student Portfolio Builder
              </span>
              <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest flex items-center gap-1 shadow-sm ${
                t("bg-indigo-500/20 text-indigo-300 border border-indigo-500/30", "bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-none")
              }`}>
                <Sparkles size={10} /> PRO
              </span>
            </h1>
            <p className={`text-sm font-medium ${t("text-zinc-500", "text-slate-400")}`}>Architect your professional legacy.</p>
          </div>
          
          <div className="flex items-center gap-5">
            {/* Theme Toggle Button */}
            <button 
              onClick={() => setIsDark(!isDark)}
              className={`p-3 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 ${
                t("bg-zinc-800/80 text-amber-400 hover:bg-zinc-700 shadow-lg shadow-black/20 ring-1 ring-white/5", 
                  "bg-white text-indigo-500 shadow-md ring-1 ring-slate-100")
              }`}
            >
              {isDark ? <Sun size={18} strokeWidth={2.5} /> : <Moon size={18} strokeWidth={2.5} />}
            </button>
          </div>
        </div>

        {/* Premium Stepper with Connecting Lines */}
        <div className={`relative flex justify-between px-6 sm:px-16 py-6 shrink-0 transition-colors border-b ${
          t("bg-zinc-900/20 border-white/5", "bg-white/30 border-slate-200/50")
        }`}>
          {/* Background Progress Line */}
          <div className="absolute top-1/2 left-16 right-16 h-[2px] -translate-y-1/2 bg-slate-200 dark:bg-zinc-800 z-0 hidden sm:block">
             <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 ease-out" 
                  style={{ width: `${((step - 1) / 3) * 100}%` }}></div>
          </div>

          {['Identity', 'Academics', 'Experience', 'Launch'].map((title, index) => {
            const i = index + 1;
            const isActive = step >= i;
            const isCurrent = step === i;
            return (
              <div key={i} className="flex flex-col items-center gap-3 z-10 relative">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                  isActive 
                    ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] scale-110 ring-4 ring-indigo-500/20" 
                    : t("bg-zinc-800 text-zinc-500 ring-1 ring-zinc-700", "bg-white text-slate-400 ring-1 ring-slate-200 shadow-sm")
                }`}>
                  {step > i ? <Check size={18} strokeWidth={3} /> : i}
                </div>
                <span className={`text-[10px] uppercase font-bold tracking-widest hidden sm:block transition-colors duration-300 ${
                  isCurrent ? t("text-indigo-400", "text-indigo-600") : 
                  isActive ? t("text-zinc-300", "text-slate-700") : 
                  t("text-zinc-600", "text-slate-400")
                }`}>
                  {title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Scrollable Form Content */}
        <div className="p-6 sm:p-10 overflow-y-auto flex-1 custom-scrollbar">
          <form ref={formRef} className="space-y-8">
            
            {/* STEP 1: Personal & Identity */}
            {step === 1 && (
              <div className="space-y-8">
                <div className="flex flex-col sm:flex-row gap-6 items-center mb-2">
                    <div className="relative group shrink-0">
                        <div className={`w-28 h-28 rounded-full border-2 border-dashed flex items-center justify-center overflow-hidden transition-all duration-300 cursor-pointer group-hover:scale-105 ${
                          t("border-zinc-600 bg-zinc-800/50 group-hover:border-indigo-500 group-hover:bg-indigo-500/10", 
                            "border-slate-300 bg-white group-hover:border-indigo-400 group-hover:shadow-md")
                        }`}>
                            {imagePreview ? (
                              <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                              <div className="flex flex-col items-center gap-1">
                                <Camera size={24} className={t("text-zinc-500 group-hover:text-indigo-400", "text-slate-400 group-hover:text-indigo-500")} />
                                <span className={`text-[9px] font-bold uppercase tracking-wider ${t("text-zinc-500", "text-slate-400")}`}>Upload</span>
                              </div>
                            )}
                        </div>
                        <input type="file" onChange={(e) => setImagePreview(URL.createObjectURL(e.target.files[0]))} className="absolute inset-0 opacity-0 cursor-pointer" />
                    </div>
                    <div className="text-center sm:text-left">
                        <h3 className={`text-xl font-bold mb-1 ${t("text-white", "text-slate-800")}`}>Who are you?</h3>
                        <p className={`text-sm ${t("text-zinc-400", "text-slate-500")}`}>Let's start with the basics. Add your photo and contact info.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClass}><User size={14}/> Full Name</label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className={inputClass} placeholder="e.g. Jane Doe" />
                  </div>
                  <div>
                    <label className={labelClass}><Mail size={14}/> Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} placeholder="hello@janedoe.com" />
                  </div>
                  <div>
                    <label className={labelClass}><Phone size={14}/> Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputClass} placeholder="+1 (555) 000-0000" />
                  </div>
                  <div>
                    <label className={labelClass}><MapPin size={14}/> Location</label>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} className={inputClass} placeholder="San Francisco, CA" />
                  </div>
                </div>
                
                <div>
                    <label className={labelClass}><FileText size={14}/> Professional Summary</label>
                    <textarea name="about" value={formData.about} rows="3" onChange={handleChange} className={`${inputClass} resize-none`} placeholder="Write a short, engaging bio about your career goals and what makes you unique..."></textarea>
                </div>
              </div>
            )}

            {/* STEP 2: Academics & Skills */}
            {step === 2 && (
              <div className="space-y-8">
                <div>
                  <h3 className={`text-xl font-bold mb-1 ${t("text-white", "text-slate-800")}`}>Educational Background</h3>
                  <p className={`text-sm mb-6 ${t("text-zinc-400", "text-slate-500")}`}>Where did you study and what are your superpowers?</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className={labelClass}><BookOpen size={14}/> University / Institute</label>
                      <input type="text" name="college" value={formData.college} onChange={handleChange} className={inputClass} placeholder="e.g. Stanford University" />
                    </div>
                    <div>
                      <label className={labelClass}>Degree / Course</label>
                      <input type="text" name="degree" value={formData.degree} onChange={handleChange} className={inputClass} placeholder="B.S. Computer Science" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                          <label className={labelClass}><Calendar size={14}/> Grad Year</label>
                          <input type="text" name="graduationYear" value={formData.graduationYear} onChange={handleChange} className={inputClass} placeholder="2024" />
                      </div>
                      <div>
                          <label className={labelClass}><Award size={14}/> CGPA / %</label>
                          <input type="text" name="cgpa" value={formData.cgpa} onChange={handleChange} className={inputClass} placeholder="3.8" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`pt-6 border-t ${t("border-white/5", "border-slate-200/60")}`}>
                    <label className={labelClass}><Wrench size={14}/> Technical Arsenal</label>
                    <p className={`text-xs mb-3 ${t("text-zinc-500", "text-slate-400")}`}>Type a skill and press Enter to add it to your stack.</p>
                    <div className={`flex flex-wrap gap-2 p-4 rounded-xl min-h-[120px] content-start transition-all duration-300 ring-1 ${
                      t("bg-zinc-900/50 ring-zinc-700/50 focus-within:ring-indigo-500 focus-within:bg-zinc-900/80 shadow-[inset_0_1px_4px_rgba(0,0,0,0.3)]", 
                        "bg-white/50 ring-slate-200/60 focus-within:ring-indigo-400 focus-within:bg-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]")
                    }`}>
                        {skills.map(s => (
                            <span key={s} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm ${
                              t("bg-zinc-800 text-zinc-300 ring-1 ring-zinc-700 hover:bg-zinc-700", 
                                "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50")
                            }`}>
                                {s} 
                                <button type="button" onClick={() => removeSkill(s)} className="text-zinc-400 hover:text-red-400 transition-colors ml-1">
                                  ×
                                </button>
                            </span>
                        ))}
                        <input 
                            value={skillInput}
                            onKeyDown={addSkill}
                            onChange={(e) => setSkillInput(e.target.value)}
                            placeholder={skills.length === 0 ? "E.g. React, Python, Docker..." : "Type another skill..."}
                            className={`bg-transparent outline-none text-sm font-medium flex-1 min-w-[140px] p-1 ${t("text-zinc-200 placeholder:text-zinc-600", "text-slate-700 placeholder:text-slate-400")}`}
                        />
                    </div>
                </div>
              </div>
            )}

            {/* STEP 3: Experience & Projects */}
            {step === 3 && (
              <div className="space-y-8">
                <div>
                  <h3 className={`text-xl font-bold mb-4 ${t("text-white", "text-slate-800")}`}>Experience Level</h3>
                  {/* Premium Toggle */}
                  <div className={`flex p-1.5 rounded-xl ring-1 ${t("bg-zinc-900/80 ring-zinc-700/50", "bg-slate-100 ring-slate-200")}`}>
                      <button type="button" onClick={() => setFormData({...formData, experienceLevel: 'Fresher'})} 
                        className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all duration-300 ${
                          formData.experienceLevel === 'Fresher' 
                            ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md scale-[1.02]' 
                            : t('text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50', 'text-slate-500 hover:text-slate-700 hover:bg-white/50')
                        }`}>
                          🎓 Fresher / Student
                      </button>
                      <button type="button" onClick={() => setFormData({...formData, experienceLevel: 'Experienced'})} 
                        className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all duration-300 ${
                          formData.experienceLevel === 'Experienced' 
                            ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md scale-[1.02]' 
                            : t('text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50', 'text-slate-500 hover:text-slate-700 hover:bg-white/50')
                        }`}>
                          💼 Experienced Pro
                      </button>
                  </div>
                </div>

                {formData.experienceLevel === 'Experienced' && (
                  <div className="space-y-5 animate-in fade-in slide-in-from-top-4 duration-500">
                      <h4 className={`text-sm font-bold flex items-center gap-2 ${t("text-indigo-400", "text-indigo-600")}`}><Briefcase size={16}/> Most Recent Role</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                              <label className={labelClass}>Company Name</label>
                              <input type="text" name="company" value={formData.company} onChange={handleChange} className={inputClass} placeholder="e.g. Acme Corp" />
                          </div>
                          <div>
                              <label className={labelClass}>Job Title</label>
                              <input type="text" name="role" value={formData.role} onChange={handleChange} className={inputClass} placeholder="Senior Developer" />
                          </div>
                          <div className="md:col-span-2">
                              <label className={labelClass}>Duration</label>
                              <input type="text" name="duration" value={formData.duration} onChange={handleChange} className={inputClass} placeholder="Jan 2022 - Present" />
                          </div>
                      </div>
                  </div>
                )}

                <div className={`space-y-5 pt-6 border-t ${t("border-white/5", "border-slate-200/60")}`}>
                    <h4 className={`text-sm font-bold flex items-center gap-2 ${t("text-indigo-400", "text-indigo-600")}`}><Globe size={16}/> Highlight Project</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className={labelClass}>Project Name</label>
                        <input type="text" name="projectTitle" value={formData.projectTitle} onChange={handleChange} className={inputClass} placeholder="Project Phoenix" />
                      </div>
                      <div>
                        <label className={labelClass}>Live Link / Repository</label>
                        <input type="text" name="projectLink" value={formData.projectLink} onChange={handleChange} className={inputClass} placeholder="https://github.com/..." />
                      </div>
                      <div className="md:col-span-2">
                        <label className={labelClass}>Impact Description</label>
                        <textarea name="projectDesc" value={formData.projectDesc} onChange={handleChange} className={`${inputClass} resize-none`} rows="2" placeholder="What problem did it solve? What technologies powered it?"></textarea>
                      </div>
                    </div>
                </div>
              </div>
            )}

            {/* STEP 4: Socials & Launch */}
            {step === 4 && (
              <div className="space-y-8">
                <div>
                  <h3 className={`text-xl font-bold mb-1 ${t("text-white", "text-slate-800")}`}>Connect & Upload</h3>
                  <p className={`text-sm mb-6 ${t("text-zinc-400", "text-slate-500")}`}>Where can people find your work? Attach your latest resume.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                          <label className={labelClass}><Github size={14}/> GitHub Profile</label>
                          <div className="relative">
                            <span className={`absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium ${t("text-zinc-500", "text-slate-400")}`}>github.com/</span>
                            <input type="text" name="github" value={formData.github} onChange={handleChange} className={`${inputClass} pl-[100px]`} placeholder="username" />
                          </div>
                      </div>
                      <div>
                          <label className={labelClass}><Linkedin size={14}/> LinkedIn URL</label>
                          <input type="text" name="linkedin" value={formData.linkedin} onChange={handleChange} className={inputClass} placeholder="linkedin.com/in/username" />
                      </div>
                      <div className="md:col-span-2">
                          <label className={labelClass}><Globe size={14}/> Personal Portfolio Website</label>
                          <input type="text" name="website" value={formData.website} onChange={handleChange} className={inputClass} placeholder="https://yourdomain.com" />
                      </div>
                  </div>
                </div>
                
                <div className={`relative border-2 border-dashed rounded-2xl p-10 transition-all duration-300 text-center group cursor-pointer overflow-hidden ${
                  t("border-zinc-700 bg-zinc-900/30 hover:bg-zinc-800/50 hover:border-indigo-500", 
                    "border-slate-300 bg-slate-50/50 hover:bg-indigo-50/30 hover:border-indigo-400")
                }`}>
                    <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${t("from-indigo-500 to-purple-600", "from-indigo-400 to-blue-500")}`}></div>
                    
                    <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setResumeName(e.target.files[0]?.name)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                    
                    <div className="flex flex-col items-center justify-center space-y-3 pointer-events-none relative z-10">
                      <div className={`p-4 rounded-full transition-transform duration-500 group-hover:-translate-y-2 ${
                        t("bg-zinc-800 text-zinc-400 group-hover:text-indigo-400 group-hover:bg-indigo-500/10", 
                          "bg-white text-slate-400 shadow-sm group-hover:text-indigo-500 group-hover:bg-indigo-50")
                      }`}>
                        <FileText size={32} />
                      </div>
                      <div>
                        <p className={`text-base font-bold ${t("text-zinc-200", "text-slate-700")}`}>
                          {resumeName ? resumeName : "Drop your Resume here"}
                        </p>
                        <p className={`text-xs mt-1 ${t("text-zinc-500", "text-slate-400")}`}>PDF, DOCX up to 10MB</p>
                      </div>
                    </div>
                </div>
              </div>
            )}

          </form>
        </div>

        {/* Action Controls */}
        <div className={`p-6 flex justify-between items-center shrink-0 transition-colors border-t ${
          t("bg-zinc-900/60 border-white/5", "bg-white/80 border-slate-200/50 backdrop-blur-lg")
        }`}>
          <button 
            type="button" 
            onClick={() => step > 1 && setStep(step - 1)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
              step === 1 ? "opacity-0 pointer-events-none" : 
              t("text-zinc-400 hover:text-white hover:bg-zinc-800", "text-slate-500 hover:text-slate-800 hover:bg-slate-100")
            }`}
          >
            <ArrowLeft size={16}/> Back
          </button>

          {step < 4 ? (
            <button 
              type="button" 
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white rounded-xl text-sm font-bold transition-all duration-300 shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] hover:-translate-y-0.5 active:scale-95 active:translate-y-0"
            >
              Continue <ArrowRight size={16} strokeWidth={2.5}/>
            </button>
          ) : (
            <button 
              type="button" 
              onClick={handleLaunch} 
              disabled={isProcessing}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 shadow-xl hover:-translate-y-0.5 active:scale-95 active:translate-y-0 disabled:opacity-70 disabled:pointer-events-none ${
                t("bg-white text-zinc-900 hover:bg-zinc-200 shadow-white/10", "bg-slate-900 text-white hover:bg-slate-800 shadow-slate-900/20")
              }`}
            >
              {isProcessing ? <><Loader2 className="animate-spin" size={18}/> Generating...</> : <><Sparkles size={18}/> Launch Portfolio</>}
            </button>
          )}
        </div>
      </div>

      {/* Signature Footer */}
      <footer className="mt-8 relative z-10">
        <div className={`flex items-center gap-3 px-6 py-3 rounded-full border backdrop-blur-md shadow-lg transition-colors ${
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
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
          background: ${isDark ? '#3f3f46' : '#cbd5e1'}; 
          border-radius: 10px; 
          transition: background 0.3s; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { 
          background: ${isDark ? '#52525b' : '#94a3b8'}; 
        }
        /* Fix for Webkit autofill backgrounds to maintain theme */
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus, 
        input:-webkit-autofill:active{
            -webkit-box-shadow: 0 0 0 30px ${isDark ? '#18181b' : '#ffffff'} inset !important;
            -webkit-text-fill-color: ${isDark ? '#e4e4e7' : '#1e293b'} !important;
            transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>
    </div>
  );
};

export default MultiStepForm;