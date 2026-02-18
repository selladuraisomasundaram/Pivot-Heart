
import React, { useState } from 'react';
import { User } from '../types';
import { Heart, ShieldCheck, Mail, Lock, User as UserIcon, ArrowRight } from 'lucide-react';

interface AuthProps {
  onLogin: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('Dr. Alex Carter');
  const [email, setEmail] = useState('architect@pivot-heart.ai');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: name || 'Demo User',
      email: email,
      role: 'Physician'
    };
    localStorage.setItem('pivot_heart_user', JSON.stringify(mockUser));
    onLogin(mockUser);
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(30,58,138,0.1),transparent)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[480px] bg-white rounded-[3.5rem] shadow-[0_32px_128px_-12px_rgba(0,0,0,0.5)] overflow-hidden relative z-10 border border-white/10">
        <div className="bg-slate-50 p-12 text-center border-b border-slate-100 relative">
          <div className="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-500/20 transform hover:scale-110 transition-transform duration-500">
            <Heart className="w-10 h-10 text-white fill-white/20" />
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Pivot-Heart <span className="text-blue-600">v2</span></h1>
          <p className="text-slate-400 mt-3 font-semibold text-sm uppercase tracking-[0.2em]">Clinical Decision OS</p>
        </div>

        <form onSubmit={handleSubmit} className="p-12 space-y-6 bg-white">
          {!isLogin && (
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Identity</label>
              <div className="relative group">
                <UserIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-5 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                  placeholder="Clinical ID"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Credentials</label>
            <div className="relative group">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-5 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                placeholder="Hospital Email"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Secure Protocol</label>
            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <input 
                type="password" 
                defaultValue="password123"
                className="w-full pl-12 pr-5 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-5 bg-blue-600 text-white font-black rounded-[1.5rem] shadow-2xl shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-3 transform active:scale-95 text-lg"
          >
            {isLogin ? 'Access Clinical Hub' : 'Initialize Protocol'}
            <ArrowRight className="w-5 h-5" />
          </button>

          <button 
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="w-full text-center text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-widest"
          >
            {isLogin ? "Request Access to Platform" : 'Return to Secure Login'}
          </button>
        </form>

        <div className="px-12 pb-12 text-center opacity-50">
          <p className="text-[9px] text-slate-400 uppercase font-black tracking-[0.3em] leading-relaxed">
            HIPAA Compliant • 256-bit AES • Gemini Reasoning Engine Active
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
