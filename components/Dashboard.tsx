
import React, { useState, useEffect } from 'react';
import { MOCK_HISTORY } from '../constants';
import { calculateHeartRisk, calculateTrends } from '../services/heartLogic';
import { explainRiskAI } from '../services/gemini';
import { 
  TrendingUp, TrendingDown, AlertCircle, Heart, 
  Activity, ArrowUpRight, MessageSquare, ShieldCheck,
  Zap, Loader2
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const [records] = useState(MOCK_HISTORY);
  const [brief, setBrief] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const current = records[records.length - 1];
  const prediction = calculateHeartRisk(current);
  const trends = calculateTrends(records);

  useEffect(() => {
    const fetchBrief = async () => {
      const result = await explainRiskAI(current, prediction, trends);
      setBrief(result);
      setLoading(false);
    };
    fetchBrief();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-6 h-full auto-rows-fr">
      {/* Card 1: Risk Gauge */}
      <div className="md:col-span-2 md:row-span-1 bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden flex flex-col justify-between shadow-2xl">
        <div className="absolute -right-10 -top-10 opacity-20">
          <Heart className="w-48 h-48 text-red-500" />
        </div>
        <div className="flex justify-between items-start relative z-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Cardiac Risk Index</span>
            <h3 className="text-4xl font-black mt-1">{prediction.score}%</h3>
          </div>
          <div className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase ${getStatusStyle(prediction.status)}`}>
            {prediction.status}
          </div>
        </div>
        <div className="relative z-10">
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ${getBarColor(prediction.status)}`}
              style={{ width: `${prediction.score}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-500 mt-3 font-medium">Based on 14 clinical markers vs ACC Guidelines</p>
        </div>
      </div>

      {/* Card 2: Trend Alert */}
      <div className="md:col-span-2 md:row-span-1 bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            V2 Temporal Alerts
          </h4>
          <span className="text-[10px] font-bold text-slate-400">LAST 4 MONTHS</span>
        </div>
        <div className="space-y-4">
          {trends.filter(t => t.severity !== 'normal').map((t, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${t.severity === 'danger' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
                  {t.direction === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">{t.marker}</p>
                  <p className="text-[10px] text-slate-500">Rate of Change: {t.percentageChange.toFixed(1)}%</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-300" />
            </div>
          ))}
          {trends.filter(t => t.severity !== 'normal').length === 0 && (
            <div className="py-4 text-center">
              <ShieldCheck className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="text-xs text-slate-500">All markers trending within normal thresholds.</p>
            </div>
          )}
        </div>
      </div>

      {/* Card 3: AI Doctor's Brief */}
      <div className="md:col-span-3 md:row-span-2 bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm overflow-y-auto">
        <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
          <h4 className="font-black text-slate-900 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
            The "Doctor's Brief"
          </h4>
          <button className="text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors">
            REFRESH ANALYSIS
          </button>
        </div>
        {loading ? (
          <div className="flex flex-col items-center justify-center h-48 gap-3">
            <Loader2 className="w-8 h-8 text-slate-300 animate-spin" />
            <p className="text-xs text-slate-400 font-medium">Running XAI Guideline Logic...</p>
          </div>
        ) : (
          <div className="prose prose-sm max-w-none text-slate-600 prose-headings:text-slate-900 prose-strong:text-slate-900 prose-li:marker:text-blue-500">
            <div className="whitespace-pre-wrap leading-relaxed">
              {brief}
            </div>
          </div>
        )}
      </div>

      {/* Card 4: Quick Metrics Grid */}
      <div className="md:col-span-1 md:row-span-2 flex flex-col gap-4">
        <MetricSmall title="Max Heart Rate" value={current.thalach} unit="bpm" icon={<Activity className="text-blue-500" />} />
        <MetricSmall title="Resting BP" value={current.trestbps} unit="mmHg" icon={<AlertCircle className="text-red-500" />} />
        <div className="flex-1 bg-blue-600 rounded-[2rem] p-6 text-white flex flex-col justify-between shadow-xl shadow-blue-200">
          <MessageSquare className="w-8 h-8 opacity-40" />
          <div>
            <h5 className="font-bold text-sm">Ask Gemini</h5>
            <p className="text-[10px] text-blue-100 mt-1">Deep dive into this patient's history with real-time AI.</p>
            <button className="mt-4 w-full py-3 bg-white/20 hover:bg-white/30 rounded-xl text-xs font-bold transition-all backdrop-blur-md border border-white/10">
              Start Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricSmall = ({ title, value, unit, icon }: any) => (
  <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex items-center justify-between">
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{title}</p>
      <p className="text-xl font-black text-slate-900 mt-1">{value} <span className="text-[10px] font-normal text-slate-400">{unit}</span></p>
    </div>
    <div className="p-3 bg-slate-50 rounded-2xl">{icon}</div>
  </div>
);

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'Critical': return 'bg-red-500/10 text-red-500';
    case 'High': return 'bg-amber-500/10 text-amber-500';
    case 'Moderate': return 'bg-blue-500/10 text-blue-500';
    default: return 'bg-green-500/10 text-green-500';
  }
};

const getBarColor = (status: string) => {
  switch (status) {
    case 'Critical': return 'bg-red-500';
    case 'High': return 'bg-amber-500';
    case 'Moderate': return 'bg-blue-500';
    default: return 'bg-green-500';
  }
};

export default Dashboard;
