import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Compass, Menu, X, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated, user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        setIsProfileOpen(false);
        navigate('/');
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Places', path: '/places' },
        { name: 'Homestays', path: '/homestays' }
    ];

    const isActive = (path: string) => {
        return location.pathname === path ? 'active-link' : '';
    };

    return (
        <nav className="navbar glass">
            <div className="container navbar-container">
                <Link to="/" className="logo">
                    <Compass className="logo-icon" size={28} />
                    <span className="logo-text">Wander<span className="text-gradient">Nest</span></span>
                </Link>

                {/* Desktop Nav */}
                <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center' }}>
                    <ul className="nav-links">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link to={link.path} className={`nav-link ${isActive(link.path)}`}>
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="nav-auth-buttons" style={{ display: 'flex', gap: '1rem', marginLeft: '2rem', alignItems: 'center' }}>
                        {isAuthenticated ? (
                            <div style={{ position: 'relative' }}>
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="text-muted"
                                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}
                                >
                                    <UserIcon size={18} /> {user?.name}
                                </button>

                                {isProfileOpen && (
                                    <div className="profile-dropdown glass animate-fade-in" style={{ position: 'absolute', top: '100%', right: 0, marginTop: '0.5rem', minWidth: '200px', padding: '1rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)', zIndex: 50, background: 'white', border: '1px solid var(--border)' }}>
                                        <div style={{ paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)', marginBottom: '0.75rem' }}>
                                            <p style={{ fontWeight: 600, color: 'var(--text-main)', margin: 0 }}>{user?.name}</p>
                                            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', margin: 0 }}>{user?.email}</p>
                                            {user?.role && (
                                                <span style={{ display: 'inline-block', marginTop: '0.25rem', padding: '0.1rem 0.5rem', fontSize: '0.75rem', background: '#EEF2FF', color: 'var(--primary)', borderRadius: '1rem', fontWeight: 600 }}>
                                                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                                </span>
                                            )}
                                        </div>
                                        <button onClick={handleLogout} className="btn btn-secondary w-full" style={{ padding: '0.5rem', justifyContent: 'center' }}>
                                            <LogOut size={16} /> Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link to="/login" className="btn btn-secondary">Login</Link>
                                <Link to="/register" className="btn btn-primary">Sign Up</Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="mobile-nav animate-fade-in">
                    <ul className="mobile-nav-links">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link
                                    to={link.path}
                                    className={`mobile-nav-link ${isActive(link.path)}`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                        {isAuthenticated ? (
                            <>
                                <li style={{ borderTop: '1px solid var(--border)', paddingTop: '0.5rem', marginTop: '0.5rem' }}>
                                    <span className="mobile-nav-link font-semibold text-muted" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <UserIcon size={18} /> {user?.name}
                                    </span>
                                </li>
                                <li>
                                    <button
                                        onClick={() => { handleLogout(); setIsOpen(false); }}
                                        className="mobile-nav-link text-primary font-semibold w-full"
                                        style={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                    >
                                        <LogOut size={18} /> Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li style={{ borderTop: '1px solid var(--border)', paddingTop: '0.5rem', marginTop: '0.5rem' }}>
                                    <Link to="/login" className="mobile-nav-link font-semibold" onClick={() => setIsOpen(false)}>Login</Link>
                                </li>
                                <li>
                                    <Link to="/register" className="mobile-nav-link text-primary font-semibold" onClick={() => setIsOpen(false)}>Sign Up</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
