import React from "react";
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

  const handleSearch = (explanation: string, feels: string) => {
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
    return matchedQuotes;
  };

  const matchedQuotes = handleSearch(explanation, feels);
  const randomQuote =
    matchedQuotes.length > 0
      ? matchedQuotes[Math.floor(Math.random() * matchedQuotes.length)]
      : null;

  return (
    <div className="result-page">
      <Navbar />

      <div className="quote-section">
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
        {songs.map((song) => (
          <div key={song.spotify_id} className="song-item">
            <h3>{song.name}</h3>
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

      <button className="see-more">See More</button>
    </div>
  );
};

export default Result;
