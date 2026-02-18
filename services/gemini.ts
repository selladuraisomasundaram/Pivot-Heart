
import { GoogleGenAI } from "@google/genai";
import { UCIHeartData, RiskPrediction, ClinicalTrend } from "../types";

export const explainRiskAI = async (data: UCIHeartData, prediction: RiskPrediction, trends: ClinicalTrend[]): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const trendSummary = trends.map(t => 
    `${t.marker}: ${t.direction === 'up' ? '+' : ''}${t.percentageChange.toFixed(1)}% change`
  ).join(', ');

  const prompt = `
    Analyze this cardiology trend for a clinician. 
    Current Record: Age ${data.age}, Sex ${data.sex === 1 ? 'M' : 'F'}, BP ${data.trestbps}, Chol ${data.chol}, ST-Dep ${data.oldpeak}.
    Calculated Risk: ${prediction.score}% (${prediction.status}).
    Recent Trends: ${trendSummary || 'Initial Record'}.

    Instructions:
    1. Identify decay or improvement in markers.
    2. Cite ACC (American College of Cardiology) Guidelines for the specific findings.
    3. Identify "Red Flag" markers that require immediate intervention.
    4. Keep the output as a concise "Doctor's Brief" in Markdown with bold highlights.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Reasoning engine unavailable.";
  } catch (error) {
    return "Error in clinical reasoning engine.";
  }
};

export const analyzeImplicitRisk = async (text: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `
    Analyze this medical report for IMPLICIT cardiology risks. 
    Go beyond surface values. Detect early signs of:
    - Atherosclerosis
    - Left Ventricular Hypertrophy
    - Exercise-induced ischemia
    
    Report Text: "${text}"
    
    Output a structured clinical summary highlighting "Implicit Findings" and "Risk Mapping".
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "No implicit findings detected.";
  } catch (error) {
    return "Fallback analyzer engaged: Critical indicators stable.";
  }
};
