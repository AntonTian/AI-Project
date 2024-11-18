import React from 'react';
import '../css/navbar.css';

function Navbar() {
  return (
    <nav>
      <div className="logo">SEBASTIFY</div>
      <div className="nav-items">
        <a href="/Homepage/homepage.html">Home</a>
        <a href="/AboutUs/AboutUs.html">About Us</a>
        <a href="/">Login</a>
        <a href="/">Register</a>
      </div>
    </nav>
  );
}

export default Navbar;
