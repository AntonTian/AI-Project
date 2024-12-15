import React from "react";
import "../css/Login.css";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Login: React.FC = () => {
  const BackendUrl = process.env.REACT_APP_BACKEND_URL;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.loading("Logging in...");
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    try {
      const response = await axios.post(`${BackendUrl}/api/auth/login`, {
        email,
        password,
      });
      toast.dismiss();
      toast.success(response.data.message);
      localStorage.setItem("token", response.data.token);
    } catch {
      toast.dismiss();
      toast.error("Invalid credentials");
    }
  };

  return (
    <div>
      <Navbar />
      <Toaster />
      <div className="login-page">
        <div className="login-container">
          <div className="login-tips">
            <h2>Login</h2>
            <div className="tips-box">
              <h3>Tips</h3>
              <p>
                For the best experience, please do sign in. If you didn’t have
                an account, please do sign up or register
              </p>
            </div>
          </div>
          <div className="login-form">
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
              <input type="email" name="email" placeholder="Email" required />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
              />
              <Link to="/">Forgot Password?</Link>
              <button type="submit">SIGN IN</button>
            </form>
            <p>
              Doesn't have an account? <Link to="/Register">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
