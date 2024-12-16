import axios from "axios";
import React from "react";

const url = `https://wowiwowi.pythonanywhere.com/recommend_songs`;

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
    const payload: any = {
      age: age,
      gender: gender,
      feelings: feels,
      language: language,
      description: explanation,
    };

    if (genre.length > 0) {
      payload["genre"] = genre;
    }
    if (artist.trim()) {
      payload["artist"] = artist;
    }
    if (year.trim()) {
      payload["year"] = year;
    }

    console.log(payload);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(url, payload, config);
    console.log("Payload : ", payload);
    console.log("Response : ", res.data);
    console.log("Response (Recommendation Only): ", res.data.recommendations);
    return res.data.recommendations;
  } catch (error: any) {
    console.error("API Response Error:", error);
    throw new Error("Failed to analyze feelings.");
  }
};
