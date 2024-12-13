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
  const resultData = location.state?.data || [];

  return (
    <div className="result-page">
      <Navbar />

      <div className="quote-section">
        <h2>“グッバイ 君の運命のヒトは僕じゃない”</h2>
        <h3>"Goodbye, I'm not the person in your destiny"</h3>
      </div>

      <div className="songs-list">
        {resultData.map((song: any, index: number) => (
          <div key={song.spotify_id} className="song-item">
            <h3>{song.name}</h3>
            <p>Song by {song.artist}</p>
            <button
              className="play-button"
              onClick={() =>
                window.open(`https://open.spotify.com/track/${song.spotify_id}`)
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
