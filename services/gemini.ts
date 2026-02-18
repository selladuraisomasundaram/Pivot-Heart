
import { GoogleGenAI } from "@google/genai";
import { UCIHeartData, RiskPrediction } from "../types";

// Removed getAI helper to strictly follow per-call initialization and direct API key usage guidelines

export const explainRiskAI = async (data: UCIHeartData, prediction: RiskPrediction): Promise<string> => {
  // Always initialize right before use with direct process.env.API_KEY
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `
    As a medical AI architect, explain this patient's heart disease risk profile based on the UCI Heart Disease Dataset attributes.
    Patient Data:
    - Age: ${data.age}
    - Sex: ${data.sex === 1 ? 'Male' : 'Female'}
    - Chest Pain Type (0-3): ${data.cp}
    - Resting BP: ${data.trestbps} mmHg
    - Cholesterol: ${data.chol} mg/dl
    - Max Heart Rate: ${data.thalach}
    - ST Depression (Oldpeak): ${data.oldpeak}
    - Major Vessels: ${data.ca}
    - Risk Score: ${prediction.score}%
    - Predicted Status: ${prediction.status}

    Instructions:
    1. Be precise and clinical yet empathetic.
    2. Cite specific reasons (e.g., if Oldpeak is high, mention exercise-induced ischemia).
    3. Provide actionable lifestyle or clinical next steps.
    4. Keep the response to 3-4 concise bullet points.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    // Property access .text is correct (not a method call)
    return response.text || "Unable to generate explanation at this time.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error connecting to AI diagnostic engine. Please check clinical thresholds manually.";
  }
};

export const analyzeMedicalReport = async (text: string): Promise<string> => {
  // Always initialize right before use with direct process.env.API_KEY
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `
    Analyze the following medical report excerpt and extract "At-Risk" values. 
    Summarize the findings and highlight any abnormalities related to cardiovascular health.
    Report Text: "${text}"
    
    Format the output in professional Markdown.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "No insights found.";
  } catch (error) {
    return "Fallback: Clinical analysis system offline.";
  }
};
