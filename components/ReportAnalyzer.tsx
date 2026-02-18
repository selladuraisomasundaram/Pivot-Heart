
import React, { useState } from 'react';
import { Upload, FileText, Loader2, CheckCircle } from 'lucide-react';
import { analyzeMedicalReport } from '../services/gemini';

const ReportAnalyzer: React.FC = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const simulateUpload = async () => {
    setAnalyzing(true);
    // Simulating OCR delay and backend call
    const mockReportText = `
      PATIENT ID: 99422
      DATE: 2024-05-18
      FINDINGS:
      Blood Pressure: 155/95 mmHg (Hyper-tension Stage 2).
      Total Cholesterol: 245 mg/dL.
      LDL: 160 mg/dL.
      ECG shows slight ST-segment elevation in V1-V3.
      Patient reports mild exertional dyspnea.
    `;
    
    const analysis = await analyzeMedicalReport(mockReportText);
    setResult(analysis);
    setAnalyzing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-12 rounded-3xl border border-slate-200 shadow-sm text-center">
        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <Upload className="text-blue-600 w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Upload Medical Report</h2>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">
          Our AI Agent will process your scan or text report to extract cardiovascular risk indicators automatically.
        </p>

        <div className="flex flex-col items-center gap-4">
          <label className="cursor-pointer group">
            <input type="file" className="hidden" onChange={simulateUpload} />
            <div className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center gap-2 group-hover:scale-105 active:scale-95">
              <FileText className="w-5 h-5" />
              Select PDF/Image Report
            </div>
          </label>
          <span className="text-xs text-slate-400">Supported formats: PDF, JPG, PNG (Max 5MB)</span>
        </div>
      </div>

      {analyzing && (
        <div className="flex flex-col items-center justify-center py-12 gap-4">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          <p className="text-slate-600 font-medium animate-pulse">Gemini Agent analyzing biomarkers...</p>
        </div>
      )}

      {result && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-blue-600 p-4 flex items-center justify-between text-white">
            <h3 className="font-bold flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              AI Analysis Completed
            </h3>
            <span className="text-xs bg-white/20 px-2 py-1 rounded">Confidence: 94%</span>
          </div>
          <div className="p-8">
            <div className="prose prose-slate max-w-none">
              <div className="whitespace-pre-wrap leading-relaxed text-slate-700">
                {result}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportAnalyzer;
