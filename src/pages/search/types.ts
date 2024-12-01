export interface FilterState {
  cuisine: string[];
  priceRange: number[];
  rating: number;
  distance: number;
  date: string;
  time: string;
  guests: number;
  features: string[];
  sortBy: 'recommended' | 'rating' | 'price' | 'distance';
  searchQuery: string;
}

export interface SearchResult {
  id: string;
  name: string;
  cuisine: string[];
  priceRange: number;
  rating: number;
  distance: number;
  image: string;
  features: string[];
  availableTimes: string[];
  description: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}