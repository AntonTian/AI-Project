import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Sebastify.css";
import Navbar from "./Navbar";
import { analyzeFeelings } from "./api";
import axios from "axios";

type EmotionToGenre = {
  happy: string[];
  sad: string[];
  angry: string[];
  nostalgic: string[];
  frustrated: string[];
  restless: string[];
  neutral: string[];
};

const emotionToGenre: EmotionToGenre = {
  happy: [
    "pop",
    "pop_rap",
    "post_teen_pop",
    "trap_music",
    "dance_pop",
    "jazz",
    "classic",
    "latin",
    "reggae",
    "lofi",
    "jpop",
    "gamelan",
    "indonesian pop",
    "kpop",
  ],
  sad: [
    "neo_mellow",
    "edm",
    "country",
    "blue",
    "rnb",
    "folk",
    "indie",
    "jdance",
    "indonesian_indie",
    "krock",
    "indonesian_pop",
  ],
  angry: [
    "rock",
    "rap",
    "tropical_house",
    "hip hop",
    "metal",
    "jrock",
    "krock",
    "kpop",
    "jpop",
    "indonesian_indie",
  ],
  nostalgic: [
    "neo mellow",
    "folk",
    "indie",
    "blue",
    "lofi",
    "classic",
    "indonesian_pop",
  ],
  frustrated: [
    "metal",
    "jrock",
    "krock",
    "rock",
    "rap",
    "metal",
    "indonesian_indie",
  ],
  restless: [
    "trap_music",
    "dance_pop",
    "rock",
    "rap",
    "tropical_house",
    "kpop",
    "jpop",
  ],
  neutral: ["pop"],
};

const genresData: { [key: string]: string[] } = {
  jazz: ["english", "instrumental"],
  rnb: ["english", "instrumental"],
  reggae: ["english", "spanish"],
  latin: ["spanish", "english"],
  rock: ["english", "spanish"],
  rap: ["english"],
  tropical_house: ["english"],
  hip_hop: ["english"],
  metal: ["english"],
  neo_mellow: ["english"],
  edm: ["english"],
  country: ["english"],
  blue: ["english"],
  folk: ["english"],
  indie: ["english"],
  pop: ["english", "spanish", "instrumental"],
  pop_rap: ["english"],
  post_teen_pop: ["english"],
  trap_music: ["english"],
  dance_pop: ["english"],
  classic: ["english"],
  lofi: ["english", "instrumental"],
  jpop: ["japanese"],
  gamelan: ["indonesian"],
  indonesian_pop: ["indonesian"],
  indonesian_indie: ["indonesian"],
  jrock: ["japanese"],
  jdance: ["japanese"],
  kpop: ["korean"],
  krock: ["korean"],
};

const Sebastify: React.FC = () => {
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState("Male");
  const [feelings, setFeelings] = useState({
    happy: 0,
    sad: 0,
    angry: 0,
  });
  const [feels, setFeels] = useState<string>("");
  const [language, setLanguage] = useState("english");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [artist, setArtist] = useState("");
  const [explanation, setExplanation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const filteredGenres = Object.keys(genresData).filter((genre) =>
    genresData[genre]?.includes(language)
  );

  const getGenresBasedOnFeelings = (feeling: keyof EmotionToGenre) => {
    return emotionToGenre[feeling] || [];
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
    setSelectedGenres([]);
  };

  const handleGenreChange = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

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
  };

  const getButtonClass = (buttonGender: string) => {
    return gender === buttonGender ? "active" : "";
  };

  const determineFeel = () => {
    const { happy, sad, angry } = feelings;

    const moodFromGenres = selectedGenres.some((genre) =>
      emotionToGenre.happy.includes(genre)
    );

    if (happy > sad && happy > angry) {
      return "happy";
    } else if (sad > happy && sad > angry) {
      return "sad";
    } else if (angry > happy && angry > sad) {
      return "angry";
    } else {
      if (happy === sad) {
        return "nostalgic";
      } else if (happy === angry) {
        return "restless";
      } else if (sad === angry) {
        return "frustrated";
      }
    }
    return "neutral";
  };

  useEffect(() => {
    const newFeels = determineFeel();
    setFeels(newFeels);
    console.log(newFeels);
    const updatedGenres = getGenresBasedOnFeelings(newFeels);
    setSelectedGenres(updatedGenres);
  }, [feelings]);

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
        genre: selectedGenres,
        language,
        artist,
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

      navigate("/Result", {
        state: { songs: songResults, explanation, feels },
      });
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

        <label>What language song do you want?*</label>
        <select value={language} onChange={handleLanguageChange}>
          <option value="english">English</option>
          <option value="spanish">Spanish</option>
          <option value="instrumental">Instrumental</option>
          <option value="japanese">Japanese</option>
          <option value="indonesian">Indonesian</option>
          <option value="korean">Korean</option>
        </select>

        <label>What is your Fav Genre?</label>
        <div className="genre-checkbox">
          {filteredGenres.map((genre) => (
            <div key={genre}>
              <input
                type="checkbox"
                checked={selectedGenres.includes(genre)}
                onChange={() => handleGenreChange(genre)}
              />
              <label>{genre}</label>
            </div>
          ))}
        </div>

        <div className="additional-inputs">
          <label>Artist:</label>
          <input
            type="text"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
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
