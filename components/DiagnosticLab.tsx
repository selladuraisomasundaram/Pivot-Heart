
import React, { useState } from 'react';
import { UCIHeartData, RiskPrediction } from '../types';
import { calculateHeartRisk } from '../services/heartLogic';
import { explainRiskAI } from '../services/gemini';
import { Activity, Zap, Info, Loader2 } from 'lucide-react';

const DiagnosticLab: React.FC = () => {
  const [formData, setFormData] = useState<UCIHeartData>({
    age: 45, sex: 1, cp: 0, trestbps: 120, chol: 200, fbs: 0, 
    restecg: 0, thalach: 150, exang: 0, oldpeak: 0, slope: 1, ca: 0, thal: 2
  });

  const [prediction, setPrediction] = useState<RiskPrediction | null>(null);
  const [aiExplanation, setAiExplanation] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseFloat(value) }));
  };

  const handlePredict = async () => {
    setLoading(true);
    const result = calculateHeartRisk(formData);
    setPrediction(result);
    
    // Call Gemini for XAI
    // Fix: Added empty trends array as third argument to match explainRiskAI signature
    const explanation = await explainRiskAI(formData, result, []);
    setAiExplanation(explanation);
    setLoading(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Inputs Section */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Activity className="text-blue-600" />
          Clinical Attributes (UCI Schema)
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          <InputGroup label="Age" name="age" value={formData.age} onChange={handleInputChange} />
          <SelectGroup label="Sex" name="sex" value={formData.sex} onChange={handleInputChange}>
            <option value={1}>Male</option>
            <option value={0}>Female</option>
          </SelectGroup>
          <SelectGroup label="Chest Pain (CP)" name="cp" value={formData.cp} onChange={handleInputChange}>
            <option value={0}>Typical Angina</option>
            <option value={1}>Atypical Angina</option>
            <option value={2}>Non-anginal</option>
            <option value={3}>Asymptomatic</option>
          </SelectGroup>
          <InputGroup label="Resting BP (Trestbps)" name="trestbps" value={formData.trestbps} onChange={handleInputChange} />
          <InputGroup label="Cholesterol (Chol)" name="chol" value={formData.chol} onChange={handleInputChange} />
          <SelectGroup label="Fasting Sugar > 120" name="fbs" value={formData.fbs} onChange={handleInputChange}>
            <option value={0}>False</option>
            <option value={1}>True</option>
          </SelectGroup>
          <InputGroup label="Max Heart Rate" name="thalach" value={formData.thalach} onChange={handleInputChange} />
          <SelectGroup label="Exercise Angina" name="exang" value={formData.exang} onChange={handleInputChange}>
            <option value={0}>No</option>
            <option value={1}>Yes</option>
          </SelectGroup>
          <InputGroup label="ST Depression" name="oldpeak" value={formData.oldpeak} onChange={handleInputChange} />
          <InputGroup label="Major Vessels (CA)" name="ca" value={formData.ca} onChange={handleInputChange} />
        </div>

        <button 
          onClick={handlePredict}
          disabled={loading}
          className="w-full mt-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Zap className="w-5 h-5" />}
          Run AI Heart Diagnostics
        </button>
      </div>

      {/* Results Section */}
      <div className="space-y-6">
        {prediction ? (
          <>
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
              <h4 className="text-slate-500 font-medium uppercase text-xs tracking-widest mb-4">Risk Probability Score</h4>
              <div className="relative inline-block">
                <div className={`text-6xl font-black ${getStatusColor(prediction.status)}`}>
                  {prediction.score}%
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1 bg-slate-900 text-white text-[10px] font-bold rounded-full uppercase tracking-tighter">
                  {prediction.status}
                </div>
              </div>
              <p className="text-sm text-slate-500 mt-8">
                Calculated using weighted logic from the Cleveland dataset repository.
              </p>
            </div>

            <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Activity className="w-24 h-24" />
              </div>
              <h4 className="flex items-center gap-2 font-bold mb-4 text-blue-400">
                <Info className="w-5 h-5" />
                Explainable AI (XAI) Analysis
              </h4>
              <div className="prose prose-invert prose-sm max-w-none">
                {aiExplanation ? (
                  <div className="whitespace-pre-wrap leading-relaxed">
                    {aiExplanation}
                  </div>
                ) : (
                  <div className="animate-pulse flex space-y-4 flex-col">
                    <div className="h-4 bg-slate-800 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-800 rounded w-full"></div>
                    <div className="h-4 bg-slate-800 rounded w-5/6"></div>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="bg-slate-100 border-2 border-dashed border-slate-200 h-full rounded-2xl flex flex-col items-center justify-center p-12 text-center opacity-60">
            <Activity className="w-16 h-16 text-slate-300 mb-4" />
            <h4 className="text-slate-500 font-bold">Waiting for input...</h4>
            <p className="text-sm text-slate-400 max-w-xs mt-2">Enter the clinical attributes on the left to start the AI prediction engine.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const InputGroup = ({ label, name, value, onChange }: any) => (
  <div className="space-y-1">
    <label className="text-[10px] font-bold text-slate-400 uppercase">{label}</label>
    <input 
      type="number" 
      name={name} 
      value={value} 
      onChange={onChange}
      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
    />
  </div>
);

const SelectGroup = ({ label, name, value, onChange, children }: any) => (
  <div className="space-y-1">
    <label className="text-[10px] font-bold text-slate-400 uppercase">{label}</label>
    <select 
      name={name} 
      value={value} 
      onChange={onChange}
      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
    >
      {children}
    </select>
  </div>
);

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Low': return 'text-green-500';
    case 'Moderate': return 'text-blue-500';
    case 'High': return 'text-amber-500';
    case 'Critical': return 'text-red-500';
    default: return 'text-slate-900';
  }
};

export default DiagnosticLab;
