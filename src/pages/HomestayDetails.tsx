import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { homestays } from '../data/mockData';
import { MapPin, Star, User, Wifi, Coffee, Wind, Tv, ArrowLeft, Home, BookOpen } from 'lucide-react';

const HomestayDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const homestay = homestays.find(h => h.id === id);

    if (!homestay) {
        return (
            <div className="container py-20 text-center">
                <h2>Homestay Not Found</h2>
                <Link to="/homestays" className="btn btn-primary mt-4">Back to Homestays</Link>
            </div>
        );
    }

    const getIconForAmenity = (amenity: string) => {
        switch (amenity.toLowerCase()) {
            case 'wifi': return <Wifi size={20} />;
            case 'kitchen':
            case 'breakfast included': return <Coffee size={20} />;
            case 'air conditioning': return <Wind size={20} />;
            case 'tv': return <Tv size={20} />;
            default: return <Home size={20} />;
        }
    };

    return (
        <div className="detail-page animate-fade-in">
            <div className="container py-8">
                <Link to="/homestays" className="back-link">
                    <ArrowLeft size={20} />
                    <span>Back to Homestays</span>
                </Link>

                {/* Header Section */}
                <div className="detail-header">
                    <h1 className="detail-title">{homestay.name}</h1>
                    <div className="detail-meta">
                        <div className="meta-item">
                            <Star className="text-warning" size={18} fill="currentColor" />
                            <span className="font-semibold">{homestay.rating}</span>
                            <span className="text-muted">({homestay.reviews} reviews)</span>
                        </div>
                        <div className="meta-item">
                            <MapPin size={18} className="text-muted" />
                            <span>{homestay.location}</span>
                        </div>
                        <div className="meta-item">
                            <User size={18} className="text-muted" />
                            <span>Hosted by {homestay.hostName}</span>
                        </div>
                    </div>
                </div>

                {/* Hero Image */}
                <div className="detail-hero-image-container">
                    <img src={homestay.imageUrl} alt={homestay.name} className="detail-hero-image" />
                </div>

                {/* Content Section */}
                <div className="detail-content-grid">
                    <div className="detail-main">
                        <section className="detail-section">
                            <h2 className="section-title">About this space</h2>
                            <p className="detail-description">{homestay.description}</p>
                        </section>

                        <section className="detail-section">
                            <h2 className="section-title">What this place offers</h2>
                            <div className="amenities-grid">
                                {homestay.amenities.map(amenity => (
                                    <div key={amenity} className="amenity-item">
                                        {getIconForAmenity(amenity)}
                                        <span>{amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar / Booking Card */}
                    <div className="detail-sidebar">
                        <div className="booking-card glass sticky-top">
                            <div className="booking-price">
                                <span className="price-amount">${homestay.pricePerNight}</span>
                                <span className="price-label">/ night</span>
                            </div>

                            <div className="booking-form">
                                <div className="form-row">
                                    <div className="form-group w-full">
                                        <label>Check-in</label>
                                        <input type="date" className="input-field" />
                                    </div>
                                    <div className="form-group w-full">
                                        <label>Check-out</label>
                                        <input type="date" className="input-field" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Guests</label>
                                    <select className="input-field">
                                        <option>1 Guest</option>
                                        <option>2 Guests</option>
                                        <option>3 Guests</option>
                                        <option>4 Guests</option>
                                    </select>
                                </div>
                            </div>

                            <button className="btn btn-primary w-full booking-btn" onClick={() => alert('Booking flow simulated!')}>
                                Reserve Now
                            </button>

                            <p className="booking-note text-center text-muted text-sm mt-4">
                                You won't be charged yet. (Mock implementation)
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomestayDetails;
