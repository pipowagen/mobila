
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const MODEL_NAME = 'gemini-3-flash-preview';

export const getGeminiResponse = async (prompt: string, history: ChatMessage[]) => {
  // Initialize GoogleGenAI with the API key from environment variables as per guidelines
  // MUST use new GoogleGenAI({ apiKey: process.env.API_KEY })
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: [
        ...history.map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: `Ești un asistent expert în design interior și mobilă la comandă pentru MaliMob Oanea, o firmă situată în Mălini, Suceava. 
        Scopul tău este să ajuți clienții să își planifice mobila (bucătării, dormitoare, living-uri). 
        Folosește Google Search pentru a oferi sfaturi despre trendurile de design din 2024-2025, materiale moderne și soluții ergonomice. 
        Fii politicos, profesionist și invită clienții să contacteze MaliMob Oanea pentru o ofertă personalizată.
        Răspunde întotdeauna în limba română.`,
        tools: [{ googleSearch: {} }],
      },
    });

    // Access the .text property directly as per the latest SDK guidelines
    const text = response.text || "Ne pare rău, a apărut o eroare la generarea răspunsului.";
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    return { text, sources };
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
