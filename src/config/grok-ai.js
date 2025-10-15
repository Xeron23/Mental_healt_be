import { Groq } from "groq-sdk";

    
export const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const GROQ_DEFAULT_MODEL = "llama-3.1-8b-instant"; 
export const GROQ_DEFAULT_SETTINGS = {
  temperature: 0.7,
  max_tokens: 100,
};