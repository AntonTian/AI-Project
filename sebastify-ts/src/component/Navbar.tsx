import { useState, useEffect } from "react";
import "../css/navbar.css";
import { Link } from "react-router-dom";
import { getSession } from "../utils/getSession";

function Navbar() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    try {
      const session = async () => {
        await getSession();
        setIsLogged(true);
      };
      session();
    } catch {
      setIsLogged(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogged(false);
  };

  return (
    <nav>
      <div className="logo">SEBASTIFY</div>
      <div className="nav-items">
        <Link to="/">Home</Link>
        <Link to="/AboutUs">About Us</Link>
        {isLogged ? (
          <>
            <Link to="/">History</Link>
            <Link to="#" onClick={handleLogout}>
              Logout
            </Link>
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
