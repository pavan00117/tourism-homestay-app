import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock authentication
        console.log('Logging in with:', { email, password });
        login({ name: 'User', email });
        navigate('/');
    };

    return (
        <div className="auth-container">
            <div className="auth-card glass animate-fade-in">
                <div className="auth-header">
                    <h2>Welcome Back</h2>
                    <p className="text-muted">Sign in to your account</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Email Address</label>
                        <div className="input-group">
                            <Mail className="input-icon" size={20} />
                            <input
                                type="email"
                                className="input-field"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ paddingLeft: '3rem' }}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <div className="input-group">
                            <Lock className="input-icon" size={20} />
                            <input
                                type="password"
                                className="input-field"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ paddingLeft: '3rem' }}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary w-full mt-4">
                        <LogIn size={20} />
                        Sign In
                    </button>
                </form>

                <div className="auth-footer text-center mt-4">
                    <p className="text-muted">
                        Don't have an account? <Link to="/register" className="text-primary font-semibold">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
