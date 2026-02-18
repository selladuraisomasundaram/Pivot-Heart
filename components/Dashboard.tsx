
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FALLBACK_VITALS } from '../constants';
import { Activity, ShieldAlert, BookOpen, Clock } from 'lucide-react';

const Dashboard: React.FC = () => {
  const latestVitals = FALLBACK_VITALS[FALLBACK_VITALS.length - 1];

  return (
    <div className="space-y-6">
      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard 
          title="Current BPM" 
          value={latestVitals.bpm} 
          unit="bpm" 
          icon={<Activity className="text-red-500" />} 
          trend="+2% vs baseline"
        />
        <StatCard 
          title="Blood Pressure" 
          value={`${latestVitals.systolic}/${latestVitals.diastolic}`} 
          unit="mmHg" 
          icon={<ShieldAlert className="text-blue-500" />} 
          trend="Stable"
        />
        <StatCard 
          title="Cholesterol" 
          value={latestVitals.cholesterol} 
          unit="mg/dl" 
          icon={<Activity className="text-amber-500" />} 
          trend="Borderline"
        />
        <StatCard 
          title="Risk Level" 
          value="Low" 
          unit="Index" 
          icon={<ShieldAlert className="text-green-500" />} 
          trend="-5% Improvement"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vital History Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800">Cardiovascular History</h3>
            <select className="text-sm border rounded-md px-2 py-1 bg-slate-50">
              <option>Last 30 Days</option>
              <option>Last 6 Months</option>
            </select>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={FALLBACK_VITALS}>
                <defs>
                  <linearGradient id="colorBpm" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="timestamp" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="bpm" stroke="#3b82f6" fillOpacity={1} fill="url(#colorBpm)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Knowledge Base */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 mb-2 text-blue-600">
            <BookOpen className="w-5 h-5" />
            <h3 className="font-bold">Medical Knowledge</h3>
          </div>
          <div className="space-y-4">
            <KnowledgeItem 
              title="Understanding LDL" 
              desc="Low-density lipoprotein is often called 'bad' cholesterol because it builds up in walls." 
            />
            <KnowledgeItem 
              title="Sodium Limits" 
              desc="The AHA recommends no more than 2,300 mg a day for most adults." 
            />
            <KnowledgeItem 
              title="Aerobic Activity" 
              desc="Aim for 150 mins of moderate activity per week for cardiac health." 
            />
          </div>
          <button className="w-full py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors mt-4">
            Explore Library
          </button>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, unit, icon, trend }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <div className="p-2 bg-slate-50 rounded-lg">{icon}</div>
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{trend}</span>
    </div>
    <div>
      <h4 className="text-2xl font-bold text-slate-900">{value} <span className="text-sm font-normal text-slate-500">{unit}</span></h4>
      <p className="text-xs text-slate-400 mt-1">{title}</p>
    </div>
  </div>
);

const KnowledgeItem = ({ title, desc }: any) => (
  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
    <h5 className="text-sm font-bold text-slate-800 mb-1">{title}</h5>
    <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
  </div>
);

export default Dashboard;
