import { GoogleGenAI, Type } from "@google/genai";
import { ApologyContent } from "../types";

// Fallback content in case API key is missing or fails
const FALLBACK_CONTENT: ApologyContent = {
  title: "致全世界最可爱的瑞瑞",
  body: "我知道错啦！(跪下.jpg) 我就是个大笨蛋，惹你生气是我不对。虽然我智商经常掉线，但心意一直在线呀🥺"
};

export const generateApology = async (): Promise<ApologyContent> => {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    console.warn("No API Key found, using fallback content.");
    await new Promise(resolve => setTimeout(resolve, 2000));
    return FALLBACK_CONTENT;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    // Updated prompt for a wittier, funnier tone
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-latest',
      contents: `Write a playful, witty, and humorous apology letter in Chinese for a girl named "瑞瑞" (Ruirui). 
      The user (sender) made her angry.
      Tone: Super cute, self-deprecating (using internet slang like "跪搓衣板", "负荆请罪"), slightly "shameless" but full of love. Make her laugh.
      Do NOT be too heavy or serious. Use emojis freely.
      Length: Around 100-120 words.
      Format: JSON with 'title' (creative headline) and 'body'.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            body: { type: Type.STRING }
          },
          required: ["title", "body"]
        }
      }
    });

    const text = response.text;
    if (text) {
      return JSON.parse(text) as ApologyContent;
    }
    return FALLBACK_CONTENT;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return FALLBACK_CONTENT;
  }
};