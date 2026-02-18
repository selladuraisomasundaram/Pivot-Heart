
import React from 'react';
import { LayoutDashboard, Microscope, FileSearch, HeartPulse, LogOut } from 'lucide-react';
import { Medication, UCIHeartData } from './types';

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { id: 'diagnostic', label: 'Diagnostic Engine', icon: <Microscope className="w-5 h-5" /> },
  { id: 'analyzer', label: 'Report Analyser', icon: <FileSearch className="w-5 h-5" /> },
  { id: 'carepath', label: 'Care Path', icon: <HeartPulse className="w-5 h-5" /> },
];

export const MOCK_HISTORY: UCIHeartData[] = [
  {
    timestamp: '2024-01-15',
    age: 58, sex: 1, cp: 1, trestbps: 135, chol: 210, fbs: 0, 
    restecg: 1, thalach: 160, exang: 0, oldpeak: 0.8, slope: 1, ca: 0, thal: 2
  },
  {
    timestamp: '2024-03-10',
    age: 58, sex: 1, cp: 2, trestbps: 142, chol: 235, fbs: 0, 
    restecg: 1, thalach: 155, exang: 1, oldpeak: 1.2, slope: 1, ca: 1, thal: 2
  },
  {
    timestamp: '2024-05-20',
    age: 58, sex: 1, cp: 3, trestbps: 155, chol: 245, fbs: 1, 
    restecg: 2, thalach: 142, exang: 1, oldpeak: 2.1, slope: 2, ca: 2, thal: 3
  }
];

export const COMMON_MEDICATIONS: Medication[] = [
  { name: 'Atorvastatin', type: 'Statin', dosage: '20mg Daily', purpose: 'Lowers LDL cholesterol to prevent plaque buildup.' },
  { name: 'Metoprolol', type: 'Beta-blocker', dosage: '50mg Daily', purpose: 'Reduces heart rate and blood pressure.' },
  { name: 'Lisinopril', type: 'ACE Inhibitor', dosage: '10mg Daily', purpose: 'Relaxes blood vessels to lower blood pressure.' },
];
