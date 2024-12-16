import React, { useEffect, useState } from "react";
import "../css/homepage.css";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { getSession } from "../utils/getSession";

function HomePage() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      if (session) {
        setUsername(session.data.claims.username.toUpperCase());
      }
    };

    fetchSession();
  }, []);
  return (
    <div className="homepage">
      <Navbar />
      <section className="hero">
        <div className="hero-container">
          <h1>WELCOME TO SEBASTIFY{username ? `, ${username}!` : "!"}</h1>
          <p>Music for Every Feel, Music for Every Mood</p>
          <Link to="/Sebastify">
            <button>Get Started</button>
          </Link>
          <img src="assets/home.jpg" alt="" />
        </div>
      </section>
    </div>
  );
}

export default HomePage;
