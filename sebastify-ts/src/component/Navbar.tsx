import React from 'react';
import '../css/navbar.css';
import { Link, Links } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <div className="logo">
        <Link to='/' className=''>SEBASTIFY</Link>
      </div>
      <div className="nav-items">
        <Link to='/'>Home</Link>
        <Link to='/AboutUs'>About Us</Link>
        <Link to='/Login'>Login</Link>
        <Link to='/Register'>Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;
