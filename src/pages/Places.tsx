import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { places } from '../data/mockData';
import ListingCard from '../components/ListingCard';
import { Search, Filter } from 'lucide-react';

const Places: React.FC = () => {
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');

    const categories = ['All', 'Mountain', 'Beach', 'Forest', 'Desert', 'Heritage', 'Nature'];

    // Init search query from URL if visiting from home page search
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const searchParam = params.get('search');
        if (searchParam) {
            setSearchQuery(searchParam);
        }
    }, [location]);

    const filteredPlaces = places.filter(place => {
        const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            place.location.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = categoryFilter === 'All' || place.category === categoryFilter;

        return matchesSearch && matchesCategory;
    });

    return (
        <div className="page-container animate-fade-in">
            <div className="page-header bg-gradient">
                <div className="container">
                    <h1 className="page-title text-white">Explore Beautiful Places</h1>
                    <p className="page-subtitle text-white opacity-90">
                        Discover hand-picked destinations for your next adventure.
                    </p>
                </div>
            </div>

            <div className="container filter-container">
                <div className="search-bar">
                    <div className="input-group">
                        <Search className="input-icon" size={20} />
                        <input
                            type="text"
                            placeholder="Search by name or location..."
                            className="input-field"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="categories">
                    <Filter size={20} className="text-muted" />
                    <div className="category-pills">
                        {categories.map(category => (
                            <button
                                key={category}
                                className={`pill ${categoryFilter === category ? 'active' : ''}`}
                                onClick={() => setCategoryFilter(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container pb-20">
                <div className="results-header">
                    <span>Showing {filteredPlaces.length} places</span>
                </div>

                {filteredPlaces.length > 0 ? (
                    <div className="grid grid-cols-3">
                        {filteredPlaces.map(place => (
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
                ) : (
                    <div className="empty-state">
                        <h3 className="empty-title">No places found</h3>
                        <p className="empty-subtitle">Try adjusting your search or filters.</p>
                        <button className="btn btn-primary" onClick={() => { setSearchQuery(''); setCategoryFilter('All'); }}>
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Places;
