import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

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
                <div className="desktop-nav">
                    <ul className="nav-links">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link to={link.path} className={`nav-link ${isActive(link.path)}`}>
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
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
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
