
import React from 'react';
import { Heart, Activity, FileText, ClipboardList, Settings, User as UserIcon } from 'lucide-react';
import { Medication } from './types';

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: <Activity className="w-5 h-5" /> },
  { id: 'diagnostic', label: 'Diagnostic Lab', icon: <Heart className="w-5 h-5" /> },
  { id: 'analyzer', label: 'Report Analyzer', icon: <FileText className="w-5 h-5" /> },
  { id: 'carepath', label: 'Care Path', icon: <ClipboardList className="w-5 h-5" /> },
];

export const FALLBACK_VITALS = [
  { bpm: 72, systolic: 120, diastolic: 80, cholesterol: 185, timestamp: '2024-05-01' },
  { bpm: 75, systolic: 122, diastolic: 82, cholesterol: 190, timestamp: '2024-05-05' },
  { bpm: 68, systolic: 118, diastolic: 78, cholesterol: 180, timestamp: '2024-05-10' },
  { bpm: 82, systolic: 140, diastolic: 90, cholesterol: 210, timestamp: '2024-05-15' },
  { bpm: 74, systolic: 125, diastolic: 82, cholesterol: 195, timestamp: '2024-05-20' },
];

export const COMMON_MEDICATIONS: Medication[] = [
  { name: 'Atorvastatin', type: 'Statin', dosage: '20mg Daily', purpose: 'Lowers LDL cholesterol to prevent plaque buildup.' },
  { name: 'Metoprolol', type: 'Beta-blocker', dosage: '50mg Daily', purpose: 'Reduces heart rate and blood pressure.' },
  { name: 'Lisinopril', type: 'ACE Inhibitor', dosage: '10mg Daily', purpose: 'Relaxes blood vessels to lower blood pressure.' },
  { name: 'Aspirin', type: 'Antiplatelet', dosage: '81mg Daily', purpose: 'Prevents blood clots from forming in arteries.' },
];
