import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Lead } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchLeads = async (
  query: string,
  userLocation: { latitude: number; longitude: number } | null
): Promise<Lead[]> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: query,
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: userLocation
          ? {
              retrievalConfig: {
                latLng: userLocation,
              },
            }
          : undefined,
      },
    });

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (!groundingChunks || groundingChunks.length === 0) {
      return [];
    }

    const leads: Lead[] = groundingChunks
      .filter(chunk => chunk.maps && chunk.maps.title && chunk.maps.uri)
      .map(chunk => ({
        title: chunk.maps.title,
        uri: chunk.maps.uri,
      }));

    return leads;
  } catch (error) {
    console.error("Error fetching leads from Gemini API:", error);
    throw new Error("Failed to fetch leads. Please check your query or API key.");
  }
};

export const analyzeLeads = async (analysisQuery: string, leads: Lead[]): Promise<string> => {
  const leadDataString = leads.map(lead => `- ${lead.title} (${lead.uri})`).join('\n');
  
  const prompt = `
    Based on the following list of businesses, please perform the requested analysis.

    Business List:
    ${leadDataString}

    User's Analysis Request:
    "${analysisQuery}"

    Provide a concise and insightful analysis.
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: prompt,
      config: {
        thinkingConfig: {
          thinkingBudget: 32768,
        },
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error analyzing leads with Gemini API:", error);
    throw new Error("Failed to analyze leads. The model may be unavailable or the request is too complex.");
  }
};
