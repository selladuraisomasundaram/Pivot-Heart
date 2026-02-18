
import { UCIHeartData, RiskPrediction, ClinicalTrend } from '../types';

export const calculateTrends = (records: UCIHeartData[]): ClinicalTrend[] => {
  if (records.length < 2) return [];
  
  const current = records[records.length - 1];
  const previous = records[records.length - 2];
  
  const markers = [
    { key: 'trestbps', label: 'Blood Pressure' },
    { key: 'chol', label: 'Cholesterol' },
    { key: 'thalach', label: 'Max Heart Rate' },
    { key: 'oldpeak', label: 'ST Depression' }
  ] as const;

  return markers.map(m => {
    const curVal = current[m.key];
    const prevVal = previous[m.key];
    const delta = curVal - prevVal;
    const percentageChange = prevVal !== 0 ? (delta / prevVal) * 100 : 0;
    
    let direction: 'up' | 'down' | 'stable' = 'stable';
    if (delta > 0) direction = 'up';
    if (delta < 0) direction = 'down';

    // Clinical severity logic
    let severity: 'normal' | 'caution' | 'danger' = 'normal';
    if (m.key === 'trestbps' || m.key === 'chol' || m.key === 'oldpeak') {
      if (percentageChange > 10) severity = 'danger';
      else if (percentageChange > 5) severity = 'caution';
    } else if (m.key === 'thalach') {
      if (percentageChange < -10) severity = 'danger';
      else if (percentageChange < -5) severity = 'caution';
    }

    return {
      marker: m.label,
      delta,
      percentageChange,
      direction,
      severity
    };
  });
};

export const calculateHeartRisk = (data: UCIHeartData): RiskPrediction => {
  let riskScore = 0;
  if (data.age > 55) riskScore += 10;
  if (data.sex === 1) riskScore += 5;
  if (data.cp === 3) riskScore += 15; else if (data.cp > 0) riskScore += 10;
  if (data.trestbps > 140) riskScore += 15;
  if (data.chol > 240) riskScore += 12;
  if (data.fbs === 1) riskScore += 10;
  if (data.thalach < 140) riskScore += 12;
  if (data.exang === 1) riskScore += 15;
  if (data.oldpeak > 2.0) riskScore += 20;
  riskScore += (data.ca * 10);
  if (data.thal === 3) riskScore += 15;

  const normalized = Math.min(Math.round((riskScore / 140) * 100), 100);

  let status: RiskPrediction['status'] = 'Low';
  if (normalized > 75) status = 'Critical';
  else if (normalized > 50) status = 'High';
  else if (normalized > 25) status = 'Moderate';

  return { score: normalized, status };
};
