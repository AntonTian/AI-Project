import { useState, useEffect } from "react";
import "../css/navbar.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const [isLogged, setIsLogged] = useState(false);
  const BackendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const getSession = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLogged(false);
        return;
      }

      try {
        await axios.get(`${BackendUrl}/api/auth/session`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsLogged(true); // Only set true if session is valid
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Error:", error.response || error.message); // Log detailed error
        } else {
          console.error("Error:", error);
        }
        setIsLogged(false);
      }
    };
    getSession();
  }, [BackendUrl]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogged(false);
  }

  return (
    <nav>
      <div className="logo">SEBASTIFY</div>
      <div className="nav-items">
        <Link to="/">Home</Link>
        <Link to="/AboutUs">About Us</Link>
        {isLogged ? (
          <>
            <Link to="/">History</Link>
            <Link to="#" onClick={handleLogout}>Logout</Link>
          </>
        ) : (
          <>
            <Link to="/Login">Login</Link>
            <Link to="/Register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
