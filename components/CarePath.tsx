
import React from 'react';
import { COMMON_MEDICATIONS } from '../constants';
import { Pill, Clock, CheckCircle2, ChevronRight } from 'lucide-react';

const CarePath: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 rounded-3xl text-white shadow-xl">
        <h2 className="text-3xl font-black mb-2 tracking-tight">Personalized Care Path</h2>
        <p className="text-blue-100 max-w-xl">
          Based on your latest diagnostics, your care team has defined this clinical roadmap to maintain heart stability.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Medication Tracker */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Pill className="text-blue-600" />
            Medication Tracker
          </h3>
          <div className="space-y-4">
            {COMMON_MEDICATIONS.map((med, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-4">
                <div className="p-3 bg-white rounded-xl shadow-sm">
                  <Pill className="w-5 h-5 text-indigo-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-slate-900">{med.name}</h4>
                    <span className="text-[10px] font-bold px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full uppercase">
                      {med.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mb-2">{med.dosage}</p>
                  <p className="text-[11px] text-slate-400 italic leading-snug">{med.purpose}</p>
                </div>
                <button className="p-2 hover:bg-green-100 rounded-lg group transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-slate-300 group-hover:text-green-600" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps / Timeline */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Clock className="text-blue-600" />
            Clinical Timeline
          </h3>
          <div className="space-y-8 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
            <TimelineItem 
              time="June 05, 2024" 
              title="Full Metabolic Panel" 
              status="Scheduled"
              active
            />
            <TimelineItem 
              time="June 20, 2024" 
              title="Echocardiogram Review" 
              status="Pending Approval"
            />
            <TimelineItem 
              time="July 12, 2024" 
              title="Telehealth Follow-up" 
              status="Tentative"
            />
            <TimelineItem 
              time="August 15, 2024" 
              title="Stress Test Evaluation" 
              status="Waitlist"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const TimelineItem = ({ time, title, status, active }: any) => (
  <div className="relative pl-12">
    <div className={`absolute left-0 top-1 w-10 h-10 rounded-full border-4 border-white shadow-sm flex items-center justify-center transition-all ${active ? 'bg-blue-600' : 'bg-slate-200'}`}>
      <div className={`w-2 h-2 rounded-full ${active ? 'bg-white' : 'bg-slate-400'}`} />
    </div>
    <div>
      <span className="text-[10px] font-bold text-slate-400 uppercase">{time}</span>
      <h4 className="font-bold text-slate-900">{title}</h4>
      <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
        {status} <ChevronRight className="w-3 h-3" />
      </p>
    </div>
  </div>
);

export default CarePath;
