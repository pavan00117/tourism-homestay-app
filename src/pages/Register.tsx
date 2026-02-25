import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Register: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('tourist');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock registration
        console.log('Registering with:', { name, email, password, role });
        login({ name, email, role });
        navigate('/');
    };

    return (
        <div className="auth-container">
            <div className="auth-card glass animate-fade-in">
                <div className="auth-header">
                    <h2>Create an Account</h2>
                    <p className="text-muted">Join WanderNest today</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Full Name</label>
                        <div className="input-group">
                            <User className="input-icon" size={20} />
                            <input
                                type="text"
                                className="input-field"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={{ paddingLeft: '3rem' }}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group mt-4">
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

                    <div className="form-group mt-4">
                        <label>Password</label>
                        <div className="input-group">
                            <Lock className="input-icon" size={20} />
                            <input
                                type="password"
                                className="input-field"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                                style={{ paddingLeft: '3rem' }}
                            />
                        </div>
                    </div>

                    <div className="form-group mt-4">
                        <label>I am a</label>
                        <select
                            className="input-field"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            style={{ paddingLeft: '1rem', width: '100%', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', padding: '0.75rem 1rem', background: 'white', marginTop: '0.5rem' }}
                        >
                            <option value="tourist">Tourist (Looking to book)</option>
                            <option value="host">Host (List my homestay)</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary w-full mt-4">
                        <UserPlus size={20} />
                        Sign Up
                    </button>
                </form>

                <div className="auth-footer text-center mt-4">
                    <p className="text-muted">
                        Already have an account? <Link to="/login" className="text-primary font-semibold">Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
