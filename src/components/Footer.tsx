import React from 'react';
import { Compass, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <Link to="/" className="logo mb-4">
                            <Compass className="logo-icon" size={28} />
                            <span className="logo-text">Wander<span className="text-gradient">Nest</span></span>
                        </Link>
                        <p className="footer-desc">
                            Your ultimate companion for discovering beautiful places and cozy homestays. Travel made simple, memorable, and safe.
                        </p>
                        <div className="social-links">
                            <a href="#" className="social-link"><Facebook size={20} /></a>
                            <a href="#" className="social-link"><Twitter size={20} /></a>
                            <a href="#" className="social-link"><Instagram size={20} /></a>
                        </div>
                    </div>

                    <div className="footer-links">
                        <h3 className="footer-heading">Quick Links</h3>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/places">Explore Places</Link></li>
                            <li><Link to="/homestays">Find Homestays</Link></li>
                        </ul>
                    </div>

                    <div className="footer-contact">
                        <h3 className="footer-heading">Contact Us</h3>
                        <ul className="contact-info">
                            <li>
                                <MapPin size={18} />
                                <span>Vijayawada, Gunadala</span>
                            </li>
                            <li>
                                <Phone size={18} />
                                <span>9398244530</span>
                            </li>
                            <li>
                                <Mail size={18} />
                                <span>chintalasripavan40@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} WanderNest. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
