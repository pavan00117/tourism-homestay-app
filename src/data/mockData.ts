export interface Place {
  id: string;
  name: string;
  description: string;
  location: string;
  imageUrl: string;
  rating: number;
  reviews: number;
  category: string;
}

export interface Homestay {
  id: string;
  name: string;
  description: string;
  location: string;
  pricePerNight: number;
  imageUrl: string;
  rating: number;
  reviews: number;
  amenities: string[];
  hostName: string;
}

export const places: Place[] = [
  {
    id: 'p1',
    name: 'Serene Mountain Peak',
    description: 'A breathtaking view from the top of the world. Perfect for hiking and nature lovers.',
    location: 'Himalayan Range, North',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 1245,
    category: 'Mountain'
  },
  {
    id: 'p2',
    name: 'Crystal Clear Bay',
    description: 'Pristine beaches with crystal clear water. Ideal for snorkeling and relaxation.',
    location: 'Emerald Coast, South',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: 890,
    category: 'Beach'
  },
  {
    id: 'p3',
    name: 'Ancient Temple Ruins',
    description: 'Explore the mysteries of ancient civilizations in this well-preserved temple complex.',
    location: 'Heritage Valley, East',
    imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviews: 2100,
    category: 'Heritage'
  },
  {
    id: 'p4',
    name: 'Mystic Pine Forest',
    description: 'Wander through tall, enchanting pine trees. A serene escape from city life.',
    location: 'Evergreen National Park',
    imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=800',
    rating: 4.6,
    reviews: 560,
    category: 'Forest'
  },
  {
    id: 'p5',
    name: 'Golden Desert Dunes',
    description: 'Experience the magic of rolling golden sand dunes under the starry night sky.',
    location: 'Western Frontiers',
    imageUrl: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: 420,
    category: 'Desert'
  },
  {
    id: 'p6',
    name: 'Thunder Waterfall',
    description: 'A majestic waterfall surrounded by lush green tropical forests.',
    location: 'Rainforest District, Central',
    imageUrl: 'https://images.unsplash.com/photo-1432889490240-84df33d47091?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 3150,
    category: 'Nature'
  }
];

export const homestays: Homestay[] = [
  {
    id: 'h1',
    name: 'Cozy Alpine Cabin',
    description: 'A warm, wooden cabin situated right at the foothills of the snowy peaks. Features a fireplace and outdoor hot tub.',
    location: 'Himalayan Range, North',
    pricePerNight: 120,
    imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 128,
    amenities: ['WiFi', 'Kitchen', 'Fireplace', 'Hot Tub'],
    hostName: 'Sarah Jenkins'
  },
  {
    id: 'h2',
    name: 'Oceanview Villa',
    description: 'Wake up to the sound of waves in this modern villa with direct beach access and a private infinity pool.',
    location: 'Emerald Coast, South',
    pricePerNight: 250,
    imageUrl: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: 245,
    amenities: ['WiFi', 'Pool', 'Air Conditioning', 'Beach Access'],
    hostName: 'David Chen'
  },
  {
    id: 'h3',
    name: 'Heritage Courtyard Home',
    description: 'Experience traditional architecture combined with modern luxury in this 100-year-old restored courtyard.',
    location: 'Heritage Valley, East',
    pricePerNight: 85,
    imageUrl: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviews: 89,
    amenities: ['WiFi', 'Breakfast Included', 'Garden', 'Library'],
    hostName: 'Aisha Rahman'
  },
  {
    id: 'h4',
    name: 'Forest Treehouse Retreat',
    description: 'Live among the birds in this luxurious treehouse, fully equipped with modern amenities and an observation deck.',
    location: 'Evergreen National Park',
    pricePerNight: 150,
    imageUrl: 'https://images.unsplash.com/photo-1488462237308-ecaa28b729d7?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 312,
    amenities: ['Kitchen', 'Balcony', 'Heating', 'Free Parking'],
    hostName: 'Michael Woods'
  },
  {
    id: 'h5',
    name: 'Desert Oasis Tent',
    description: 'Glamping at its finest. A luxury air-conditioned tent with a private deck to watch the desert sunset.',
    location: 'Western Frontiers',
    pricePerNight: 180,
    imageUrl: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviews: 156,
    amenities: ['Air Conditioning', 'Breakfast Included', 'Stargazing Kit', 'Transport'],
    hostName: 'Omar Farooq'
  },
  {
    id: 'h6',
    name: 'Riverside Cottage',
    description: 'A peaceful cottage right by the flowing river, perfect for fishing and relaxing reading weekends.',
    location: 'Rainforest District, Central',
    pricePerNight: 95,
    imageUrl: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80&w=800',
    rating: 4.6,
    reviews: 201,
    amenities: ['WiFi', 'Kitchen', 'Fishing Gear', 'BBQ Grill'],
    hostName: 'Elena Rostova'
  }
];
