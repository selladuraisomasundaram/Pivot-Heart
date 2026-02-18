
export interface PatientVitals {
  bpm: number;
  systolic: number;
  diastolic: number;
  cholesterol: number;
  timestamp: string;
}

export interface UCIHeartData {
  id?: string;
  timestamp: string;
  age: number;
  sex: number; // 1 = male, 0 = female
  cp: number; // chest pain type (0-3)
  trestbps: number; // resting blood pressure
  chol: number; // serum cholestoral
  fbs: number; // fasting blood sugar > 120 (1=true, 0=false)
  restecg: number; // resting ecg (0-2)
  thalach: number; // max heart rate
  exang: number; // exercise induced angina (1=yes, 0=no)
  oldpeak: number; // ST depression
  slope: number; // slope of peak exercise ST (0-2)
  ca: number; // number of major vessels (0-3)
  thal: number; // 1=normal, 2=fixed, 3=reversable
}

export interface RiskPrediction {
  score: number;
  status: 'Low' | 'Moderate' | 'High' | 'Critical';
  explanation?: string;
  trends?: ClinicalTrend[];
}

export interface ClinicalTrend {
  marker: string;
  delta: number;
  percentageChange: number;
  direction: 'up' | 'down' | 'stable';
  severity: 'normal' | 'caution' | 'danger';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Patient' | 'Physician';
}

export interface Medication {
  name: string;
  type: string;
  dosage: string;
  purpose: string;
}
