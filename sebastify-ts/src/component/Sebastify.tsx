import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Sebastify.css";
import Navbar from "./Navbar";
import { analyzeFeelings } from "./api";
import axios from "axios";

const Sebastify: React.FC = () => {
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState("Male");
  const [feelings, setFeelings] = useState({
    happy: 0,
    sad: 0,
    angry: 0,
  });
  const [feels, setFeels] = useState<string>("");
  const [genre, setGenre] = useState<string[]>([]);
  const [language, setLanguage] = useState("English");
  const [artist, setArtist] = useState("");
  const [year, setYear] = useState("");
  const [explanation, setExplanation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSliderChange = (key: string, value: number) => {
    const newFeelings = { ...feelings, [key]: value };
    const total = newFeelings.happy + newFeelings.sad + newFeelings.angry;
    if (total > 100) {
      const excess = total - 100;
      if (
        newFeelings.happy >= newFeelings.sad &&
        newFeelings.happy >= newFeelings.angry
      ) {
        newFeelings.happy -= excess;
      } else if (
        newFeelings.sad >= newFeelings.happy &&
        newFeelings.sad >= newFeelings.angry
      ) {
        newFeelings.sad -= excess;
      } else {
        newFeelings.angry -= excess;
      }

      newFeelings.happy = Math.max(0, newFeelings.happy);
      newFeelings.sad = Math.max(0, newFeelings.sad);
      newFeelings.angry = Math.max(0, newFeelings.angry);
    }
    setFeelings(newFeelings);

    const newFeels = determineFeel();
    setFeels(newFeels);
  };

  const handleGenreChange = (selectedGenre: string) => {
    setGenre((prev) =>
      prev.includes(selectedGenre)
        ? prev.filter((g) => g !== selectedGenre)
        : [...prev, selectedGenre]
    );
  };

  const getButtonClass = (buttonGender: string) => {
    return gender === buttonGender ? "active" : "";
  };

  const determineFeel = () => {
    const { happy, sad, angry } = feelings;
    if (happy > sad && happy > angry) {
      return "happy";
    } else if (sad > happy && sad > angry) {
      return "sad";
    } else if (angry > happy && angry > sad) {
      return "angry";
    }
    return "neutral";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    if (age <= 0) {
      setErrorMessage("Age must be greater than 0.");
      return;
    }

    if (!gender.trim()) {
      setErrorMessage("Please select your gender.");
      return;
    }

    const totalFeelings = feelings.happy + feelings.sad + feelings.angry;
    if (totalFeelings !== 100) {
      setErrorMessage("Feelings must add up to 100%.");
      return;
    }

    if (!language.trim()) {
      setErrorMessage("Please select a language.");
      return;
    }

    try {
      const feels = determineFeel();

      const songResults = await analyzeFeelings({
        age,
        gender,
        feelings,
        genre,
        language,
        artist,
        year,
        explanation,
        feels,
      });

      //just dummy
      // const songResults = [
      //   {
      //     title: "Kokoronashi",
      //     artist: "Gumi",
      //     year: 2015,
      //     image: "https://example.com/kokoronashi.jpg",
      //   },
      //   {
      //     title: "Pretender",
      //     artist: "Official Hige Dandism",
      //     year: 2019,
      //     image: "https://example.com/pretender.jpg",
      //   },
      //   {
      //     title: "Shinunoga E-Wa",
      //     artist: "Fujii Kaze",
      //     year: 2020,
      //     image: "https://example.com/shinunoga-e-wa.jpg",
      //   },
      // ];

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
          <button
            type="button"
            id="genderButton"
            onClick={() => setGender("Female")}
            className={getButtonClass("Female")}
          >
            Female
          </button>
          <button
            type="button"
            id="genderButton"
            onClick={() => setGender("Anonymous")}
            className={getButtonClass("Anonymous")}
          >
            Anonymous
          </button>
          <button
            type="button"
            id="genderButton"
            onClick={() => setGender("Male")}
            className={getButtonClass("Male")}
          >
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
