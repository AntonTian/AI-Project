import React from "react";
import "../css/homepage.css";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="homepage">
      <Navbar />
      <section className="hero">
        <div className="hero-container">
          <h1>WELCOME TO SEBASTIFY!</h1>
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
