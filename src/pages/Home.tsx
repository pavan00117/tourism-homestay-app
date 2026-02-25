import React, { useState } from 'react';
import { places, homestays } from '../data/mockData';
import ListingCard from '../components/ListingCard';
import { Search, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/places?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    const featuredPlaces = places.slice(0, 3);
    const featuredHomestays = homestays.slice(0, 3);

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-overlay"></div>
                <img
                    src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=2000"
                    alt="Travel Hero"
                    className="hero-image"
                />
                <div className="container hero-content animate-fade-in">
                    <h1 className="hero-title">
                        Discover Your Next <br /> <span className="text-gradient">Great Adventure</span>
                    </h1>
                    <p className="hero-subtitle">
                        Find the perfect destination and the coziest homestay for your unforgettable journey.
                    </p>

                    <div className="search-container glass">
                        <form onSubmit={handleSearch} className="search-form">
                            <div className="input-group">
                                <MapPin className="input-icon" size={20} />
                                <input
                                    type="text"
                                    placeholder="Where do you want to go?"
                                    className="input-field"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary search-btn">
                                <Search size={20} />
                                <span>Search</span>
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Featured Places */}
            <section className="featured-section container delay-100 animate-fade-in">
                <div className="section-header">
                    <h2 className="section-title">Popular Destinations</h2>
                    <p className="section-subtitle">Explore the most loved places by our community</p>
                </div>

                <div className="grid grid-cols-3">
                    {featuredPlaces.map(place => (
                        <ListingCard
                            key={place.id}
                            id={place.id}
                            type="place"
                            name={place.name}
                            description={place.description}
                            location={place.location}
                            imageUrl={place.imageUrl}
                            rating={place.rating}
                            reviews={place.reviews}
                            category={place.category}
                        />
                    ))}
                </div>
            </section>

            {/* Featured Homestays */}
            <section className="featured-section container pb-20 delay-200 animate-fade-in">
                <div className="section-header">
                    <h2 className="section-title">Cozy Homestays</h2>
                    <p className="section-subtitle">Experience local hospitality at its finest</p>
                </div>

                <div className="grid grid-cols-3">
                    {featuredHomestays.map(homestay => (
                        <ListingCard
                            key={homestay.id}
                            id={homestay.id}
                            type="homestay"
                            name={homestay.name}
                            description={homestay.description}
                            location={homestay.location}
                            imageUrl={homestay.imageUrl}
                            rating={homestay.rating}
                            reviews={homestay.reviews}
                            price={homestay.pricePerNight}
                            hostName={homestay.hostName}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
