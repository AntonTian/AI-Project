import React from "react";
import "../css/Register.css";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const RegisterPage: React.FC = () => {
    const BackendUrl = process.env.REACT_APP_BACKEND_URL;
    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast.loading("Registering...");
        const username = e.currentTarget.username.value;
        const email = e.currentTarget.email.value;
        const password = e.currentTarget.password.value;

        if (password.length < 8) {
            toast.dismiss();
            toast.error("Password must be at least 8 characters");
            return;
        }

        try {
            const response = await axios.post(`${BackendUrl}/api/auth/register`, {
                username,
                email,
                password,
            });
            toast.dismiss();
            toast.success(response.data.message);
            navigate("/");
        } catch (error) {
            toast.dismiss();
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data.error);
            } else {
                toast.error("An unexpected error occurred");
            }
        }
    };
    return (
        <div>
            <Toaster />
            <Navbar />
            <div className="register-page">
                <div className="register-container">
                    <div className="register-tips">
                        <h2>Register</h2>
                        <div className="tips-box">
                            <h3>Tips</h3>
                            <p>
                                For the best experience, please do sign in. If you didn't have
                                an account, please do sign up or register.
                            </p>
                        </div>
                    </div>
                    <div className="register-form">
                        <h2>Create Account</h2>
                        <form onSubmit={handleSubmit}>
                            <input type="text" name="username" placeholder="Name" required />
                            <input type="email" name="email" placeholder="Email" required />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                required
                            />
                            <button type="submit">SIGN UP</button>
                        </form>
                        <p>
                            Already have an account? <Link to="/Login">Login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
