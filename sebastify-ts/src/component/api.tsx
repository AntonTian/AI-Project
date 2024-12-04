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
}: {
  age: number;
  gender: string;
  feelings: { happy: number; sad: number; angry: number };
  genre: string[];
  language: string;
  artist: string;
  year: string;
  explanation: string;
}) => {
  try {
    const payload = {
      contents: [
        {
          parts: [
            {
              text: `Give some songs suggest with json data, based on user age ${age} old, gender : 
            ${gender}, feel : ${feelings}, which genre favourite ${genre}, 
            language : ${language}, which prefer artist : ${artist}, 
            in year public songs ${year}, then this is the user feel now ${explanation}`,
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
    console.log(`Give some songs suggest with json data, based on user age ${age} old, gender : 
            ${gender}, feel percetage => angry ${feelings.angry}% ,happy ${feelings.happy}% 
            ,sad ${feelings.sad}%, 
            which genre favourite ${genre}, 
            language : ${language}, which prefer artist : ${artist}, 
            in year public songs ${year}, then this is the user feel now ${explanation}`);
    console.log("Response : ", res.data);
    return res.data.songs;
  } catch (error: any) {
    console.error("API Response Error:", error);
    throw new Error("Failed to analyze feelings.");
  }
};
