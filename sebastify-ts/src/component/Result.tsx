import React from "react";
import "../css/Result.css";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";

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

  return (
    <div className="result-page">
      <Navbar />

      <div className="quote-section">
        <h2>“グッバイ 君の運命のヒトは僕じゃない”</h2>
        <h3>"Goodbye, I'm not the person in your destiny"</h3>
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
