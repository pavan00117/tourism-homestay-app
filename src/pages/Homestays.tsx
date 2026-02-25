import React, { useState } from 'react';
import { homestays } from '../data/mockData';
import ListingCard from '../components/ListingCard';
import { Search } from 'lucide-react';

const Homestays: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [maxPrice, setMaxPrice] = useState<number>(300);

    const filteredHomestays = homestays.filter(homestay => {
        const matchesSearch = homestay.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            homestay.location.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPrice = homestay.pricePerNight <= maxPrice;

        return matchesSearch && matchesPrice;
    });

    return (
        <div className="page-container animate-fade-in">
            <div className="page-header bg-gradient-secondary">
                <div className="container">
                    <h1 className="page-title text-white">Find Your Home Away From Home</h1>
                    <p className="page-subtitle text-white opacity-90">
                        Cozy, comfortable, and unique stays hosted by locals.
                    </p>
                </div>
            </div>

            <div className="container filter-container flex-row-mobile">
                <div className="search-bar flex-1">
                    <div className="input-group">
                        <Search className="input-icon" size={20} />
                        <input
                            type="text"
                            placeholder="Search homestays or locations..."
                            className="input-field"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="price-filter">
                    <label className="filter-label">Max Price: ${maxPrice}</label>
                    <input
                        type="range"
                        min="50"
                        max="500"
                        step="10"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                        className="price-slider"
                    />
                </div>
            </div>

            <div className="container pb-20">
                <div className="results-header">
                    <span>Showing {filteredHomestays.length} homestays</span>
                </div>

                {filteredHomestays.length > 0 ? (
                    <div className="grid grid-cols-3">
                        {filteredHomestays.map(homestay => (
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
                ) : (
                    <div className="empty-state">
                        <h3 className="empty-title">No homestays found</h3>
                        <p className="empty-subtitle">Try adjusting your budget or search terms.</p>
                        <button className="btn btn-primary" onClick={() => { setSearchQuery(''); setMaxPrice(300); }}>
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Homestays;
