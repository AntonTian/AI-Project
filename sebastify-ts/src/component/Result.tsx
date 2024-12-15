import React, { useEffect, useState } from "react";
import "../css/Result.css";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import quotes from "./json/quotes.json";

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

const Result: React.FC = () => {
  const location = useLocation();
  const { state } = location;
  const songs: Song[] = state?.songs || [];
  const explanation: string = state?.explanation || "";
  const feels: string = state?.feels || "";

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

  const getBackgroundColor = (feels: string) => {
    const randomInt = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    switch (feels.toLowerCase()) {
      case "happy":
        // return `rgb(${randomInt(200, 255)}, ${randomInt(200, 255)}, ${randomInt(
        //   100,
        //   150
        // )})`;
        return `linear-gradient(180deg, rgb(${randomInt(200, 255)}, ${randomInt(
          200,
          255
        )}, ${randomInt(100, 150)}), rgba(255, 255, 200, 0))`;
      case "sad":
        // return `rgb(${randomInt(100, 150)}, ${randomInt(150, 200)}, ${randomInt(
        //   200,
        //   255
        // )})`;
        return `linear-gradient(180deg, rgb(${randomInt(100, 150)}, ${randomInt(
          150,
          200
        )}, ${randomInt(200, 255)}), rgba(200, 220, 255, 0))`;
      case "angry":
        // return `rgb(${randomInt(200, 255)}, ${randomInt(50, 100)}, ${randomInt(
        //   50,
        //   100
        // )})`;
        return `linear-gradient(180deg, rgb(${randomInt(200, 255)}, ${randomInt(
          50,
          100
        )}, ${randomInt(50, 100)}), rgba(255, 200, 200, 0))`;
      default:
        // return `rgb(${randomInt(200, 255)}, ${randomInt(200, 255)}, ${randomInt(
        //   200,
        //   255
        // )})`;
        return `linear-gradient(135deg, rgb(${randomInt(200, 255)}, ${randomInt(
          200,
          255
        )}, ${randomInt(200, 255)}), rgba(240, 240, 240, 0.5))`;
    }
  };

  return (
    <div className="result-page">
      <Navbar />
      <div
        className="quote-section"
        style={{
          background: getBackgroundColor(feels),
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
