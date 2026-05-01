import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, Sparkles, Sun, Moon, Loader2 } from 'lucide-react';

const Auth = ({ onAuthSuccess, isDarkMode, toggleDarkMode }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // 1. API URL ko decide karein (Render link from .env)
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg(''); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    // 2. URL ko dynamic banayein
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
    const url = `${API_URL}${endpoint}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('userName', data.name);
      
      onAuthSuccess();

    } catch (error) {
      console.error('Auth error:', error);
      // Agar backend band ho ya link galat ho toh "Failed to fetch" yahan handle hoga
      setErrorMsg(error.message === 'Failed to fetch' 
        ? 'Cannot connect to server. Please try again later.' 
        : error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrorMsg('');
    setFormData({ name: '', email: '', password: '' });
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-[#09090b] text-slate-200' : 'bg-slate-50 text-slate-800'}`}>
      
      <button
        onClick={toggleDarkMode}
        className={`absolute top-6 right-6 p-3 rounded-full backdrop-blur-md border transition-all duration-300 z-50 shadow-lg ${
          isDarkMode
            ? 'bg-white/10 border-white/20 text-yellow-400 hover:bg-white/20 hover:scale-110'
            : 'bg-white/80 border-slate-200 text-indigo-600 hover:bg-white hover:scale-110 shadow-slate-200/50'
        }`}
        aria-label="Toggle Theme"
      >
        {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
      </button>

      <div className={`absolute top-[-10%] left-[-10%] w-96 h-96 rounded-full blur-3xl pointer-events-none transition-colors duration-500 ${isDarkMode ? 'bg-indigo-600/20' : 'bg-indigo-300/40'}`}></div>
      <div className={`absolute bottom-[-10%] right-[-10%] w-96 h-96 rounded-full blur-3xl pointer-events-none transition-colors duration-500 ${isDarkMode ? 'bg-fuchsia-600/20' : 'bg-fuchsia-300/40'}`}></div>

      <div className={`w-full max-w-md rounded-3xl p-8 shadow-2xl relative z-10 transition-all duration-500 ${
        isDarkMode 
        ? 'bg-white/5 border border-white/10 backdrop-blur-xl' 
        : 'bg-white/80 border border-white/50 backdrop-blur-xl shadow-slate-200/50'
      }`}>
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 mb-4 shadow-lg shadow-indigo-500/30">
            <Sparkles className="text-white" size={24} />
          </div>
          <h1 className={`text-3xl font-black tracking-tight mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            {isLogin 
              ? 'Enter your details to access your portfolios.' 
              : 'Start building your professional digital presence.'}
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm text-center font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div className="space-y-1.5 animate-in fade-in slide-in-from-top-4 duration-500">
              <label className={`text-sm font-medium ml-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User size={18} className={isDarkMode ? 'text-slate-500' : 'text-slate-400'} />
                </div>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe" 
                  required={!isLogin}
                  className={`w-full pl-11 pr-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all ${
                    isDarkMode 
                    ? 'bg-black/20 border border-white/10 focus:border-indigo-500 text-white placeholder-slate-500' 
                    : 'bg-white border border-slate-200 focus:border-indigo-500 text-slate-900 placeholder-slate-400 shadow-sm'
                  }`}
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className={`text-sm font-medium ml-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail size={18} className={isDarkMode ? 'text-slate-500' : 'text-slate-400'} />
              </div>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com" 
                required
                className={`w-full pl-11 pr-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all ${
                  isDarkMode 
                  ? 'bg-black/20 border border-white/10 focus:border-indigo-500 text-white placeholder-slate-500' 
                  : 'bg-white border border-slate-200 focus:border-indigo-500 text-slate-900 placeholder-slate-400 shadow-sm'
                }`}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center ml-1">
              <label className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Password</label>
              {isLogin && <a href="#" className={`text-xs hover:text-indigo-400 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>Forgot?</a>}
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock size={18} className={isDarkMode ? 'text-slate-500' : 'text-slate-400'} />
              </div>
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••" 
                required
                className={`w-full pl-11 pr-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all ${
                  isDarkMode 
                  ? 'bg-black/20 border border-white/10 focus:border-indigo-500 text-white placeholder-slate-500' 
                  : 'bg-white border border-slate-200 focus:border-indigo-500 text-slate-900 placeholder-slate-400 shadow-sm'
                }`}
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-fuchsia-500 hover:from-indigo-600 hover:to-fuchsia-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/25 transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:hover:translate-y-0 cursor-pointer"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                {isLogin ? 'Sign In' : 'Create Account'}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className={`mt-8 text-center text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={toggleMode} 
            type="button"
            className={`font-semibold transition-colors underline decoration-indigo-500/30 underline-offset-4 ${
              isDarkMode ? 'text-white hover:text-indigo-400' : 'text-slate-900 hover:text-indigo-600'
            }`}
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Auth;