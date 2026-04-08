import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface AnalysisResult {
  alignmentScore: number;
  philosophicalMatch: string;
  careerArchetypes: string[];
  universityAdvice: string;
  emotionalIntelligenceInsight: string;
  suggestedPractices: string[];
  destinyInsight?: string;
}

export async function analyzePath(userReflection: string, birthDate?: string, birthTime?: string): Promise<AnalysisResult> {
  const prompt = `
    User Reflection: ${userReflection}
    ${birthDate ? `Birth Date: ${birthDate}` : ""}
    ${birthTime ? `Birth Time: ${birthTime}` : ""}
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      systemInstruction: `You are a wise, empathetic, and sophisticated career and life philosopher, also skilled in interpreting Zi Wei Dou Shu (Purple Star Astrology). 
      The user is seeking a path that integrates internal satisfaction, wealth, and emotional depth. 
      
      If birth date and time are provided, calculate and interpret their Zi Wei Dou Shu (Tu Vi) chart. 
      Note: 
      - Use the birth date and time to determine their Mệnh (Self), Quan Lộc (Career), and Tài Bạch (Wealth) palaces.
      - Provide insights based on the major stars (Chính Tinh) and their interactions.
      - Look for contradictions between their "High Standards" and their "Destiny Stars".
      
      Analyze their reflection and provide a structured response in JSON format.
      - alignmentScore: 0-100
      - philosophicalMatch: A name for their life philosophy.
      - careerArchetypes: 3-5 career paths.
      - universityAdvice: Specific advice on higher education.
      - emotionalIntelligenceInsight: A deep reflection on their emotional needs.
      - suggestedPractices: 3-5 daily or weekly practices.
      - destinyInsight: (Optional) A brief interpretation of how their birth chart (Tu Vi) aligns with their aspirations.`,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          alignmentScore: { type: Type.NUMBER },
          philosophicalMatch: { type: Type.STRING },
          careerArchetypes: { type: Type.ARRAY, items: { type: Type.STRING } },
          universityAdvice: { type: Type.STRING },
          emotionalIntelligenceInsight: { type: Type.STRING },
          suggestedPractices: { type: Type.ARRAY, items: { type: Type.STRING } },
          destinyInsight: { type: Type.STRING },
        },
        required: ["alignmentScore", "philosophicalMatch", "careerArchetypes", "universityAdvice", "emotionalIntelligenceInsight", "suggestedPractices"],
      },
    },
  });

  return JSON.parse(response.text || "{}");
}
