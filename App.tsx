
import React, { useState, useEffect } from 'react';
import { User } from './types';
import { NAV_ITEMS } from './constants';
import Dashboard from './components/Dashboard';
import DiagnosticEngine from './components/DiagnosticEngine';
import ReportAnalyser from './components/ReportAnalyser';
import CarePath from './components/CarePath';
import Auth from './components/Auth';
import { Heart, LogOut, ShieldCheck } from 'lucide-react';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('pivot_heart_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('pivot_heart_user');
    setUser(null);
  };

  if (loading) return (
    <div className="flex items-center justify-center h-screen bg-[#020617]">
      <div className="animate-pulse flex flex-col items-center">
        <Heart className="w-16 h-16 text-blue-600 mb-6" />
        <p className="text-blue-400/60 font-black uppercase tracking-[0.3em] text-xs">Loading v2 Protocol</p>
      </div>
    </div>
  );

  if (!user) return <Auth onLogin={setUser} />;

  return (
    <div className="flex h-screen bg-slate-50/50 overflow-hidden font-inter text-slate-900">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col p-8">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-12 h-12 bg-blue-600 rounded-[1.25rem] flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter leading-none">Pivot-Heart</h1>
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Enterprise v2</span>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all ${
                activeTab === item.id
                  ? 'bg-slate-900 text-white shadow-xl shadow-slate-200'
                  : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-8 border-t border-slate-100">
          <div className="bg-slate-50 rounded-2xl p-4 mb-4">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-black text-xs">
                {user.name.charAt(0)}
              </div>
              <p className="text-xs font-bold text-slate-900 truncate flex-1">{user.name}</p>
            </div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{user.role}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 py-4 text-xs font-black text-red-500 hover:bg-red-50 rounded-2xl transition-all uppercase tracking-widest border border-transparent hover:border-red-100"
          >
            <LogOut className="w-4 h-4" />
            End Session
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[#F8FAFC]">
        <header className="h-24 px-12 flex items-center justify-between sticky top-0 z-30 bg-[#F8FAFC]/80 backdrop-blur-md">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight capitalize">
            {activeTab.replace('-', ' ')}
          </h2>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full border border-green-100">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-black text-green-700 uppercase tracking-widest">Guideline Engine: Active</span>
            </div>
            <ShieldCheck className="w-6 h-6 text-slate-300" />
          </div>
        </header>

        <div className="px-12 pb-12">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'diagnostic' && <DiagnosticEngine />}
          {activeTab === 'analyzer' && <ReportAnalyser />}
          {activeTab === 'carepath' && <CarePath />}
        </div>
      </main>
    </div>
  );
};

export default App;
