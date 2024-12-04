import axios from "axios";
import React from "react";

const apiKey = process.env.REACT_APP_API_KEY || "";
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

export const analyzeFeelings = async ({
  age,
  gender,
  feelings,
  genre,
  language,
  artist,
  year,
  explanation,
  feels,
}: {
  age: number;
  gender: string;
  feelings: { happy: number; sad: number; angry: number };
  genre: string[];
  language: string;
  artist: string;
  year: string;
  explanation: string;
  feels: string;
}) => {
  try {
    const payload = {
      contents: [
        {
          parts: [
            {
              text: `Aku adalah seorang ${gender} berumur ${age}, aku menyukai musik 
              ${genre} dan saat ini aku sedang merasa ${feels},
               bisakah kamu memberikan saya rekomendasi lagu dengan bahasa ${language} 
               dari artist ${artist} yang rilis tahun ${year}`,
            },
          ],
        },
      ],
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(url, payload, config);
    console.log(`Aku adalah seorang ${gender} berumur ${age}, aku menyukai musik 
              ${genre} dan saat ini aku sedang merasa ${feels},
               bisakah kamu memberikan saya rekomendasi lagu dengan bahasa ${language} 
               dari artist ${artist} yang rilis tahun ${year}`);
    console.log("Response : ", res.data);
    return res.data.songs;
  } catch (error: any) {
    console.error("API Response Error:", error);
    throw new Error("Failed to analyze feelings.");
  }
};
