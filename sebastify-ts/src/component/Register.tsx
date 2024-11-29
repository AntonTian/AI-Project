import React from 'react';
import '../css/Register.css';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const RegisterPage: React.FC = () => {
    return (
        <div>
            <Navbar />
            <div className="register-page">
                <div className="register-container">
                    <div className="register-tips">
                        <h2>Register</h2>
                        <div className="tips-box">
                            <h3>Tips</h3>
                            <p>
                                For the best experience, please do sign in. If you didn't have an
                                account, please do sign up or register.
                            </p>
                        </div>
                    </div>
                    <div className="register-form">
                        <h2>Create Account</h2>
                        <form>
                            <input type="text" placeholder="Name" required />
                            <input type="email" placeholder="Email" required />
                            <input type="password" placeholder="Password" required />
                            <button type="submit">SIGN UP</button>
                        </form>
                        <p>
                            Already have an account? <Link to='/Login'><a>Login</a></Link> 
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;