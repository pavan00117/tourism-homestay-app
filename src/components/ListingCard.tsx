import React from 'react';
import { MapPin, Star, User } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ListingCardProps {
    id: string;
    name: string;
    description: string;
    location: string;
    imageUrl: string;
    rating: number;
    reviews: number;
    type: 'place' | 'homestay';
    price?: number;
    hostName?: string;
    category?: string;
}

const ListingCard: React.FC<ListingCardProps> = ({
    id,
    name,
    description,
    location,
    imageUrl,
    rating,
    reviews,
    type,
    price,
    hostName,
    category
}) => {
    const isHomestay = type === 'homestay';
    const detailLink = isHomestay ? `/homestays/${id}` : '#'; // Places don't have detail pages per requirements, but could link to search

    return (
        <div className="card listing-card animate-fade-in">
            <div className="card-image-wrapper">
                <img src={imageUrl} alt={name} className="card-image" loading="lazy" />
                <div className="card-badges">
                    {category && <span className="badge category-badge">{category}</span>}
                    {price && <span className="badge price-badge">${price} / night</span>}
                </div>
            </div>

            <div className="card-content">
                <div className="card-header">
                    <h3 className="card-title">{name}</h3>
                    <div className="rating">
                        <Star className="star-icon" size={16} fill="currentColor" />
                        <span className="rating-score">{rating}</span>
                        <span className="rating-count">({reviews})</span>
                    </div>
                </div>

                <div className="location">
                    <MapPin size={16} className="text-muted" />
                    <span>{location}</span>
                </div>

                <p className="description line-clamp-2">{description}</p>

                <div className="card-footer">
                    {isHomestay && hostName && (
                        <div className="host">
                            <User size={16} className="text-muted" />
                            <span>Host: {hostName}</span>
                        </div>
                    )}

                    <Link to={detailLink} className="btn btn-primary w-full mt-4">
                        {isHomestay ? 'View Details' : 'Explore'}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ListingCard;
