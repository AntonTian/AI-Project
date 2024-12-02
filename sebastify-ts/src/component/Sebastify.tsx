import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Sebastify.css";
import Navbar from "./Navbar";
import { analyzeFeelings } from "./api";
import axios from "axios";

const Sebastify: React.FC = () => {
  const [age, setAge] = useState(37);
  const [gender, setGender] = useState("Anonymous");
  const [feelings, setFeelings] = useState({
    happy: 0,
    sad: 0,
    angry: 0,
  });
  const [newEmotion, setNewEmotion] = useState("");
  const [genre, setGenre] = useState<string[]>([]);
  const [language, setLanguage] = useState("Indonesia");
  const [artist, setArtist] = useState("");
  const [year, setYear] = useState("");
  const [explanation, setExplanation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSliderChange = (key: string, value: number) => {
    setFeelings({ ...feelings, [key]: value });
  };

  const handleGenreChange = (selectedGenre: string) => {
    setGenre((prev) =>
      prev.includes(selectedGenre)
        ? prev.filter((g) => g !== selectedGenre)
        : [...prev, selectedGenre]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!explanation.trim()) {
      setErrorMessage("Please explain your feelings.");
      return;
    }

    const url =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyB8KJzgnZZQHUFyZm3HzDBZGlhYcxIBaag";
    const payload = {
      contents: [
        {
          parts: [{ text: "what do you know about hoshimachi suisei" }],
        },
      ],
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(url, payload, config);
      console.log("Response : ", res.data);
      return res.data;

      const songResults = [
        {
          title: "Kokoronashi",
          artist: "Gumi",
          year: 2015,
          image: "https://example.com/kokoronashi.jpg",
        },
        {
          title: "Pretender",
          artist: "Official Hige Dandism",
          year: 2019,
          image: "https://example.com/pretender.jpg",
        },
        {
          title: "Shinunoga E-Wa",
          artist: "Fujii Kaze",
          year: 2020,
          image: "https://example.com/shinunoga-e-wa.jpg",
        },
      ];

      navigate("/Result", { state: { songs: songResults } });
    } catch (error: any) {
      setErrorMessage("Failed to analyze feelings. Please try again later.");
    }
  };

  return (
    <div>
      <Navbar />
      <form className="sebastify-form" onSubmit={handleSubmit}>
        <h1>Let’s Search Your Mood Song!</h1>
        <p className="mandatory">* = mandatory</p>

        <label>Your Age?*</label>
        <div className="age-input">
          <button
            type="button"
            onClick={() => setAge((prev) => Math.max(prev - 1, 0))}
          >
            &lt;
          </button>
          <span>{age}</span>
          <button type="button" onClick={() => setAge((prev) => prev + 1)}>
            &gt;
          </button>
        </div>

        <label>Your Gender?*</label>
        <div className="gender-input">
          <button type="button" onClick={() => setGender("Female")}>
            Female
          </button>
          <button type="button" onClick={() => setGender("Anonymous")}>
            Anonymous
          </button>
          <button type="button" onClick={() => setGender("Male")}>
            Male
          </button>
        </div>

        <label>How do you Feel?*</label>
        <div className="feelings-slider">
          {["happy", "sad", "angry"].map((key) => (
            <div key={key} className="slider">
              <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
              <input
                type="range"
                min="0"
                max="100"
                value={feelings[key as keyof typeof feelings]}
                onChange={(e) =>
                  handleSliderChange(key, parseInt(e.target.value, 10))
                }
              />
              <span>{feelings[key as keyof typeof feelings]}%</span>
            </div>
          ))}
        </div>

        <label>What is your Fav Genre?</label>
        <div className="genre-checkbox">
          {[
            "Pop",
            "Rock",
            "Country",
            "Jazz",
            "Blue",
            "Hip-Hop",
            "RnB",
            "Classical",
            "Folk",
            "Indie",
            "EDM",
            "Latin",
            "Metal",
            "Reggae",
            "Lo-Fi",
          ].map((g) => (
            <div key={g}>
              <input
                type="checkbox"
                checked={genre.includes(g)}
                onChange={() => handleGenreChange(g)}
              />
              <label>{g}</label>
            </div>
          ))}
        </div>

        <label>What language song do you want?*</label>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="Indonesia">Indonesia</option>
          <option value="English">English</option>
          <option value="Chinese">Chinese</option>
          <option value="Korean">Korean</option>
          <option value="Japanese">Japanese</option>
          <option value="Spanish">Spanish</option>
        </select>

        <div className="additional-inputs">
          <label>Artist:</label>
          <input
            type="text"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
          />

          <label>Year:</label>
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>

        <label>Can you explain your feel?</label>
        <textarea
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
        />

        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Sebastify;
