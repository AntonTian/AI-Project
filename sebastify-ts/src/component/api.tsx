import axios, { AxiosRequestConfig } from "axios";
import { OpenAIResponse } from "./OpenAIResponse";

const apiKey = process.env.REACT_APP_API_KEY || "";
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

export const analyzeFeelings = async (text: string): Promise<string> => {
  try {
    const requestBody = {
      contents: [
        {
          parts: [{ text: "what do you know about hoshimachi suisei" }],
        },
      ],
    };

    const config: AxiosRequestConfig = {
      method: "POST",
      url: url,
      data: requestBody,
    };

    const response = await axios.request<OpenAIResponse>(config);
    return response.data.choices[0].text.trim();
  } catch (error: any) {
    if (error.response) {
      console.error("API Response Error:", error.response.data);
    } else {
      console.error("Error:", error.message);
    }
    throw new Error("Failed to analyze feelings.");
  }
};
