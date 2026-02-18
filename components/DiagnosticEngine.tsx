
import React, { useState } from 'react';
import { UCIHeartData } from '../types';
import { calculateHeartRisk, calculateTrends } from '../services/heartLogic';
import { explainRiskAI } from '../services/gemini';
import { 
  Dna, ArrowRight, Save, RotateCcw, 
  ChevronDown, Info, ShieldCheck
} from 'lucide-react';

const DiagnosticEngine: React.FC = () => {
  const [formData, setFormData] = useState<UCIHeartData>({
    timestamp: new Date().toISOString().split('T')[0],
    age: 50, sex: 1, cp: 0, trestbps: 130, chol: 220, fbs: 0, 
    restecg: 1, thalach: 150, exang: 0, oldpeak: 0, slope: 1, ca: 0, thal: 2
  });

  const [analyzing, setAnalyzing] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);

  const handlePredict = async () => {
    setAnalyzing(true);
    const result = calculateHeartRisk(formData);
    const explanation = await explainRiskAI(formData, result, []);
    setPrediction({ ...result, explanation });
    setAnalyzing(false);
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
      {/* Form Side */}
      <div className="flex-1 bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Dna className="text-blue-600" />
            Clinical Intake
          </h2>
          <div className="flex gap-2">
            <button onClick={() => setFormData({ ...formData, age: 50 })} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
              <RotateCcw className="w-4 h-4 text-slate-400" />
            </button>
            <button className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all">
              <Save className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <FormInput label="Patient Age" name="age" type="number" value={formData.age} onChange={(v) => setFormData({...formData, age: parseInt(v)})} />
          <FormSelect label="Gender" name="sex" value={formData.sex} onChange={(v) => setFormData({...formData, sex: parseInt(v)})}>
            <option value={1}>Male (Bio)</option>
            <option value={0}>Female (Bio)</option>
          </FormSelect>
          <FormSelect label="Chest Pain Class" name="cp" value={formData.cp} onChange={(v) => setFormData({...formData, cp: parseInt(v)})}>
            <option value={0}>Typical Angina</option>
            <option value={1}>Atypical Angina</option>
            <option value={2}>Non-anginal</option>
            <option value={3}>Asymptomatic</option>
          </FormSelect>
          <FormInput label="Resting BP (mmHg)" name="trestbps" type="number" value={formData.trestbps} onChange={(v) => setFormData({...formData, trestbps: parseInt(v)})} />
          <FormInput label="Cholesterol (mg/dl)" name="chol" type="number" value={formData.chol} onChange={(v) => setFormData({...formData, chol: parseInt(v)})} />
          <FormInput label="Max HR (bpm)" name="thalach" type="number" value={formData.thalach} onChange={(v) => setFormData({...formData, thalach: parseInt(v)})} />
          <FormInput label="ST Depression" name="oldpeak" type="number" step="0.1" value={formData.oldpeak} onChange={(v) => setFormData({...formData, oldpeak: parseFloat(v)})} />
          <FormSelect label="Major Vessels" name="ca" value={formData.ca} onChange={(v) => setFormData({...formData, ca: parseInt(v)})}>
            <option value={0}>Zero</option>
            <option value={1}>One</option>
            <option value={2}>Two</option>
            <option value={3}>Three</option>
          </FormSelect>
        </div>

        <button 
          onClick={handlePredict}
          disabled={analyzing}
          className="w-full mt-10 py-5 bg-slate-900 text-white rounded-[1.5rem] font-bold flex items-center justify-center gap-3 hover:bg-black transition-all shadow-xl shadow-slate-200 active:scale-[0.98]"
        >
          {analyzing ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              Processing Model...
            </div>
          ) : (
            <>
              Initialize Diagnostic Engine
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>

      {/* Result Side */}
      <div className="w-full lg:w-[400px] space-y-6">
        {prediction ? (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6">
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white text-center">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Global Risk Prediction</span>
              <div className="mt-4 relative inline-block">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
                  <circle 
                    cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" 
                    strokeDasharray={364}
                    strokeDashoffset={364 - (364 * prediction.score) / 100}
                    className={`${getRingColor(prediction.status)} transition-all duration-1000`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-3xl font-black">
                  {prediction.score}%
                </div>
              </div>
              <h4 className="mt-4 font-black text-xl">{prediction.status} Risk</h4>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">Model confidence calibrated against the Cleveland/UCI Gold Standard dataset.</p>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm">
              <h5 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                <Info className="w-4 h-4 text-blue-500" />
                V2 Summary Brief
              </h5>
              <div className="prose prose-xs max-w-none text-slate-600">
                <div className="whitespace-pre-wrap leading-relaxed">
                  {prediction.explanation}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full min-h-[400px] bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-12 text-center opacity-40">
            <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-sm mb-4">
              <ShieldCheck className="w-8 h-8 text-slate-300" />
            </div>
            <h4 className="font-bold text-slate-500">Intake Required</h4>
            <p className="text-xs text-slate-400 mt-2 max-w-[200px]">Fill clinical markers to the left to generate the cardiology reasoning map.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const FormInput = ({ label, ...props }: any) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider ml-1">{label}</label>
    <input 
      {...props} 
      className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-300"
    />
  </div>
);

const FormSelect = ({ label, children, ...props }: any) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider ml-1">{label}</label>
    <div className="relative">
      <select 
        {...props} 
        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none appearance-none transition-all font-medium text-slate-900"
      >
        {children}
      </select>
      <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
    </div>
  </div>
);

const getRingColor = (status: string) => {
  switch (status) {
    case 'Critical': return 'text-red-500';
    case 'High': return 'text-amber-500';
    case 'Moderate': return 'text-blue-500';
    default: return 'text-green-500';
  }
};

export default DiagnosticEngine;
