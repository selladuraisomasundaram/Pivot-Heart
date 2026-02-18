
import React, { useState } from 'react';
import { analyzeImplicitRisk } from '../services/gemini';
import { 
  FileSearch, UploadCloud, Search, 
  CheckCircle2, AlertTriangle, Cpu, 
  ClipboardCheck, Loader2 
} from 'lucide-react';

const ReportAnalyser: React.FC = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const simulateScan = async () => {
    setAnalyzing(true);
    const mockText = `
      CT ANGIOGRAM FINDINGS:
      Evidence of calcification in proximal LAD. 
      Ejection fraction: 54%.
      Sub-endocardial hypo-perfusion detected during peak exertion.
      LDL: 155 mg/dL, HDL: 38 mg/dL.
      Clinical history: Smoker, Father had MI at 52.
    `;
    const analysis = await analyzeImplicitRisk(mockText);
    setResult(analysis);
    setAnalyzing(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Search/Upload Area */}
      <div className="bg-white rounded-[3rem] p-12 border border-slate-200 shadow-sm text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
          <Search className="w-64 h-64 rotate-12" />
        </div>
        
        <div className="relative z-10">
          <div className="w-24 h-24 bg-blue-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
            <UploadCloud className="w-10 h-10 text-blue-600" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Implicit Risk Analyser</h2>
          <p className="text-slate-500 max-w-lg mx-auto mt-3 text-lg leading-relaxed font-medium">
            Paste clinical observations or upload imaging reports. Gemini V2 detects patterns human observers might miss.
          </p>
          
          <div className="mt-12 flex flex-col items-center gap-6">
            <button 
              onClick={simulateScan}
              disabled={analyzing}
              className="px-10 py-5 bg-slate-900 text-white rounded-[1.5rem] font-bold text-lg hover:bg-black transition-all flex items-center gap-3 shadow-2xl active:scale-95 disabled:opacity-50"
            >
              {analyzing ? <Loader2 className="w-6 h-6 animate-spin" /> : <FileSearch className="w-6 h-6" />}
              {analyzing ? 'Reasoning Engine Active...' : 'Simulate Report Ingestion'}
            </button>
            <div className="flex items-center gap-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> OCR V3</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> Clinical Reasoning</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> ACC Verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Results Bento */}
      {result && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-bottom-8 duration-700">
          {/* Main Content */}
          <div className="md:col-span-2 bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-indigo-50 rounded-2xl">
                <Cpu className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-black text-slate-900">Implicit Findings Analysis</h3>
            </div>
            <div className="prose prose-slate prose-sm max-w-none text-slate-600">
              <div className="whitespace-pre-wrap leading-relaxed font-medium bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
                {result}
              </div>
            </div>
          </div>

          {/* Quick Stats Column */}
          <div className="space-y-6">
            <div className="bg-red-50 rounded-[2.5rem] p-8 border border-red-100">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <h4 className="font-bold text-red-900">Red Flag Markers</h4>
              </div>
              <ul className="space-y-3">
                <FlagItem label="Calcification in LAD" severity="high" />
                <FlagItem label="Family History Factor" severity="med" />
                <FlagItem label="Smoker Status" severity="high" />
              </ul>
            </div>

            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white flex flex-col justify-between">
              <ClipboardCheck className="w-8 h-8 text-blue-400 mb-6" />
              <div>
                <h5 className="font-bold text-lg">Integrate Logic</h5>
                <p className="text-[10px] text-slate-500 mt-2 uppercase tracking-widest font-black leading-tight">
                  Would you like to push these markers to the Diagnostic Engine for recalculation?
                </p>
                <button className="mt-6 w-full py-4 bg-white text-slate-900 rounded-2xl font-black text-xs hover:bg-blue-50 transition-all uppercase">
                  Sync Clinical Records
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const FlagItem = ({ label, severity }: any) => (
  <li className="flex items-center gap-2">
    <div className={`w-1.5 h-1.5 rounded-full ${severity === 'high' ? 'bg-red-600' : 'bg-amber-600'}`} />
    <span className="text-[11px] font-bold text-slate-700">{label}</span>
  </li>
);

export default ReportAnalyser;
