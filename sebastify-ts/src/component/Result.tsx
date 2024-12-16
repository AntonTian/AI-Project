import React, { useEffect, useState } from "react";
import "../css/Result.css";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import quotes from "../json/quotes.json";

interface Quotes {
  Quote: string;
  Author: string;
  Tags: string[];
  Popularity: number;
  Category: string;
}

interface Song {
  artist: string;
  genre: string;
  name: string;
  position: number;
  spotify_id: string;
}

interface LocationState {
  songs: Song[];
  explanation: string;
  feels: string;
  feelings: {
    happy: number;
    sad: number;
    angry: number;
  };
}

const Result: React.FC = () => {
  const location = useLocation();
  const { songs, explanation, feels, feelings } =
    location.state as LocationState;

  const quotesData: Quotes[] = quotes as Quotes[];

  const [songLimit, setSongLimit] = useState(3);

  const [randomQuote, setRandomQuote] = useState<Quotes | null>(null);

  useEffect(() => {
    const explanationTags = explanation
      .split(" ")
      .map((word) => word.trim().toLowerCase());

    const matchedQuotes = quotesData.filter((quote: Quotes) => {
      const explanationMatch = quote.Tags.some((tag) =>
        explanationTags.includes(tag.toLowerCase())
      );
      const feelsMatch = quote.Tags.some(
        (tag) => tag.toLowerCase() === feels.toLowerCase()
      );

      return explanationMatch || feelsMatch;
    });

    if (matchedQuotes.length > 0) {
      setRandomQuote(
        matchedQuotes[Math.floor(Math.random() * matchedQuotes.length)]
      );
    }
  }, [explanation, feels, quotesData]);

  const handleSeeMore = () => {
    setSongLimit((prevLimit) => prevLimit + 3);
  };

  const getBackgroundColor = (feelings: {
    happy: number;
    sad: number;
    angry: number;
  }) => {
    const { happy, sad, angry } = feelings;

    // Hitung total dan persentase
    const total = happy + sad + angry;
    const happyPct = happy / total || 0;
    const sadPct = sad / total || 0;
    const angryPct = angry / total || 0;

    // Definisi warna dasar (RGB)
    const happyColor = { r: 255, g: 223, b: 128 }; // Warna cerah (kuning/oranye)
    const sadColor = { r: 128, g: 192, b: 255 }; // Warna sejuk (biru)
    const angryColor = { r: 255, g: 80, b: 80 }; // Warna hangat (merah)

    // Interpolasi warna
    const blendedColor = {
      r: Math.round(
        happyPct * happyColor.r + sadPct * sadColor.r + angryPct * angryColor.r
      ),
      g: Math.round(
        happyPct * happyColor.g + sadPct * sadColor.g + angryPct * angryColor.g
      ),
      b: Math.round(
        happyPct * happyColor.b + sadPct * sadColor.b + angryPct * angryColor.b
      ),
    };

    return `linear-gradient(180deg, rgb(${blendedColor.r}, ${blendedColor.g}, ${blendedColor.b}), rgba(255, 255, 255, 0))`;
  };

  return (
    <div className="result-page">
      <Navbar />
      <div
        className="quote-section"
        style={{
          background: getBackgroundColor(feelings),
        }}
      >
        {randomQuote ? (
          <>
            <h2>{randomQuote.Quote}</h2>
            <h3>{randomQuote.Author}</h3>
          </>
        ) : (
          <p>
            Sorry we cannot find the something will inspire you, but it's okay
            you can try another time
          </p>
        )}
      </div>

      <div className="songs-list">
        {songs.slice(0, songLimit).map((song) => (
          <div key={song.spotify_id} className="song-item">
            <div className="song-title">
              <h3>{song.name}</h3>
            </div>
            <p>Song by {song.artist}</p>
            <button
              className="play-button"
              onClick={() =>
                window.open(
                  `https://open.spotify.com/track/${song.spotify_id}`,
                  "_blank"
                )
              }
            >
              ▶
            </button>
          </div>
        ))}
      </div>

      {songLimit < songs.length && (
        <button className="see-more" onClick={handleSeeMore}>
          See More
        </button>
      )}
    </div>
  );
};

export default Result;
