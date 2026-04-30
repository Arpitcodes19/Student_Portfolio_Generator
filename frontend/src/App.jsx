import React, { useState, useEffect } from 'react'; 
import html2canvas from 'html2canvas'; // 🚀 PDF ke liye import
import { jsPDF } from 'jspdf';         // 🚀 PDF ke liye import

import Auth from './components/Auth'; 
import MultiStepForm from './components/MultiStepForm';
import TemplateSelector from './components/TemplateSelector';
import MinimalistPro from './components/MinimalistPro';
import CyberpunkEdge from './components/CyberpunkEdge';
import GlassmorphismPro from './components/GlassmorphismPro';
import BentoGrid from './components/BentoGrid';

function App() {
  const [phase, setPhase] = useState(0); 
  const [userData, setUserData] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isAppLoading, setIsAppLoading] = useState(true); 

  // AUTO-LOGIN LOGIC
  useEffect(() => {
    const checkUserStatus = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          const response = await fetch('${process.env.REACT_APP_API_URL}/api/portfolio/me', {
            method: 'GET',
            headers: { 'x-auth-token': token }
          });

          if (response.ok) {
            const data = await response.json();
            setUserData(data);
            setSelectedTemplate(data.selectedTemplate);
            setPhase(3); 
          }
        } catch (error) {
          console.error("Auto-login error:", error);
        }
      }
      setIsAppLoading(false); 
    };

    checkUserStatus();
  }, []);

  // LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setUserData(null);
    setPhase(0);
  };

  const handleAuthSuccess = () => {
    setPhase(1); 
  };

  const handleFormSubmit = (data) => {
    setUserData(data);
    setPhase(2); 
  };

  const savePortfolio = async (finalData) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setPhase(0);
      return;
    }

    try {
      const response = await fetch('${process.env.REACT_APP_API_URL}/api/portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token 
        },
        body: JSON.stringify(finalData)
      });
      if(response.ok) console.log("Portfolio saved! 🚀");
    } catch (error) {
      console.error("Error saving portfolio:", error);
    }
  };

  const handleTemplateSelect = async (templateId) => {
    setSelectedTemplate(templateId);
    setPhase(3); 
    const finalPortfolioData = { ...userData, selectedTemplate: templateId };
    await savePortfolio(finalPortfolioData);
  };

  // 🚀 NAYA FUNCTION: PDF Download karne ke liye
  const handleDownloadPDF = async () => {
    const element = document.getElementById('portfolio-content');
    if (!element) return;

    try {
      // High quality print ke liye options
      const canvas = await html2canvas(element, { 
        scale: 2, 
        useCORS: true 
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${userData?.fullName || 'My'}_Portfolio.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("PDF download failed. Please try again.");
    }
  };

  if (isAppLoading) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-[#09090b]' : 'bg-slate-50'}`}>
      
      {/* LOGOUT BUTTON */}
      {phase > 0 && (
        <button 
          onClick={handleLogout}
          className="fixed bottom-6 left-6 z-50 px-4 py-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white text-xs font-bold rounded-lg border border-red-500/50 transition-all print:hidden"
        >
          Logout
        </button>
      )}

      {phase === 0 && (
        <Auth 
          onAuthSuccess={handleAuthSuccess} 
          isDarkMode={isDarkMode} 
          toggleDarkMode={() => setIsDarkMode(!isDarkMode)} 
        />
      )}

      {phase === 1 && <MultiStepForm onComplete={handleFormSubmit} />}

      {phase === 2 && <TemplateSelector onSelectTemplate={handleTemplateSelect} />}

      {phase === 3 && (
        <div className="relative w-full min-h-screen bg-white">
          
          {/* 🚀 ACTION BUTTONS CONTAINER */}
          <div className="fixed top-6 right-6 z-50 flex gap-3 print:hidden">
            <button 
              onClick={() => setPhase(1)} 
              className="px-5 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-full shadow-xl hover:bg-slate-800 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
            >
              ← Edit
            </button>
            
            {/* DOWNLOAD PDF BUTTON */}
            <button 
              onClick={handleDownloadPDF} 
              className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white text-sm font-bold rounded-full shadow-xl hover:shadow-indigo-500/25 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
            >
              ↓ Download PDF
            </button>
          </div>

          {/* 🚀 WRAPPER FOR PDF EXPORT */}
          <div id="portfolio-content" className="w-full min-h-screen">
            {selectedTemplate === 'minimal-pro' ? (
              <MinimalistPro data={userData} />
            ) : selectedTemplate === 'cyber-edge' ? (
              <CyberpunkEdge data={userData} />
            ) : selectedTemplate === 'glassmorphism' ? (
              <GlassmorphismPro data={userData} />
            ) : selectedTemplate === 'bento-grid' ? (
              <BentoGrid data={userData} />
            ) : (
              <div className={`min-h-screen flex flex-col items-center justify-center p-10 text-center ${isDarkMode ? 'bg-[#09090b] text-white' : 'bg-slate-50 text-slate-900'}`}>
                <h1 className="text-4xl font-black mb-4 uppercase text-indigo-500">{selectedTemplate}</h1>
                <p>Under Development...</p>
                <button onClick={() => setPhase(2)} className="mt-8 px-6 py-2 bg-zinc-800 rounded-lg text-white">Choose Another</button>
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}

export default App;