import React from "react";
import "../css/Result.css";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";

interface Song {
  title: string;
  artist: string;
  year: number;
  image: string; // URL for the song's cover image
}

const Result: React.FC = () => {
  const location = useLocation();
  const songs: Song[] = location.state?.songs || [];

  return (
    <div className="result-page">
      <Navbar />

      <div className="quote-section">
        <h2>“グッバイ 君の運命のヒトは僕じゃない”</h2>
        <h3>"Goodbye, I'm not the person in your destiny"</h3>
      </div>

      <div className="songs-section">
        {songs.map((song) => (
          <div className="song-card" key={song.title}>
            <img src={song.image} alt={song.title} />
            <h3>{song.title}</h3>
            <p>Song by {song.artist}</p>
            <span>{song.year}</span>
            <button className="play-button">▶</button>
          </div>
        ))}
      </div>

      <button className="see-more">See More</button>
    </div>
  );
};

export default Result;
