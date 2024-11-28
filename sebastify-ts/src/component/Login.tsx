import React from 'react';
import '../css/Login.css';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
    return (
        <div>
            <Navbar />
            <div className="login-page">
                <div className="login-container">
                    <div className="login-tips">
                        <h2>Login</h2>
                        <div className="tips-box">
                            <h3>Tips</h3>
                            <p>
                                For the best experience, please do sign in.
                                If you didn’t have an account,
                                please do sign up or register
                            </p>
                        </div>
                    </div>
                    <div className="login-form">
                        <h2>Sign In</h2>
                        <form>
                            <input type="email" placeholder="Email" required />
                            <input type="password" placeholder="Password" required />
                            <a href="/">Forgot Password?</a>
                            <button type="submit">SIGN IN</button>
                        </form>
                        <p>
                            Doesn't have an account? <Link to='/Register'>Register</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;