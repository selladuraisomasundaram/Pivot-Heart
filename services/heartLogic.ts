
import { UCIHeartData, RiskPrediction } from '../types';

/**
 * Simplified weighted risk calculator based on UCI Heart Disease dataset clinical observations.
 * In a production app, this would be a trained ML model (RandomForest/XGBoost).
 */
export const calculateHeartRisk = (data: UCIHeartData): RiskPrediction => {
  let riskScore = 0;

  // Age factor
  if (data.age > 55) riskScore += 10;
  else if (data.age > 40) riskScore += 5;

  // Sex factor (males traditionally higher baseline in this dataset context)
  if (data.sex === 1) riskScore += 5;

  // Chest Pain (CP: 0=Typical, 1=Atypical, 2=Non-Anginal, 3=Asymptomatic)
  // Higher scores for atypical/non-anginal often correlate with actual heart issues in UCI
  if (data.cp === 3) riskScore += 15;
  else if (data.cp > 0) riskScore += 10;

  // Resting Blood Pressure (Trestbps)
  if (data.trestbps > 140) riskScore += 15;
  else if (data.trestbps > 130) riskScore += 8;

  // Cholesterol (Chol)
  if (data.chol > 240) riskScore += 12;
  else if (data.chol > 200) riskScore += 5;

  // Fasting Blood Sugar
  if (data.fbs === 1) riskScore += 10;

  // Max Heart Rate (Thalach) - Lower is usually riskier
  if (data.thalach < 140) riskScore += 12;
  else if (data.thalach < 160) riskScore += 5;

  // Exercise Induced Angina
  if (data.exang === 1) riskScore += 15;

  // Oldpeak (ST depression)
  if (data.oldpeak > 2.0) riskScore += 20;
  else if (data.oldpeak > 1.0) riskScore += 10;

  // Major Vessels (CA)
  riskScore += (data.ca * 10);

  // Thalassemia
  if (data.thal === 3) riskScore += 15;

  // Normalize score to 0-100
  const normalized = Math.min(Math.round((riskScore / 140) * 100), 100);

  let status: RiskPrediction['status'] = 'Low';
  if (normalized > 75) status = 'Critical';
  else if (normalized > 50) status = 'High';
  else if (normalized > 25) status = 'Moderate';

  return { score: normalized, status };
};
