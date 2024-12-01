import React from 'react';
import { Star, MapPin, DollarSign, Users, Clock } from 'lucide-react';
import { SearchResult } from '../types';

interface SearchResultsProps {
  results: SearchResult[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  // Sample data for demonstration
  const sampleResults: SearchResult[] = [
    {
      id: '1',
      name: 'La Maison D\'Or',
      cuisine: ['French', 'Contemporary'],
      priceRange: 3,
      rating: 4.8,
      distance: 2.5,
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070',
      features: ['Outdoor Seating', 'Wine List', 'Private Room'],
      availableTimes: ['18:00', '18:30', '19:00', '19:30'],
      description: 'Fine dining French restaurant with contemporary twists on classic dishes',
      address: '123 Gourmet Street, Culinary District',
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    {
      id: '2',
      name: 'Sakura Sushi',
      cuisine: ['Japanese', 'Sushi'],
      priceRange: 2,
      rating: 4.6,
      distance: 1.8,
      image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2070',
      features: ['Private Room', 'BYOB', 'Wheelchair Accessible'],
      availableTimes: ['17:30', '18:00', '20:00', '20:30'],
      description: 'Authentic Japanese sushi restaurant with fresh daily imports from Tsukiji market',
      address: '456 Sushi Lane, Downtown',
      coordinates: { lat: 40.7112, lng: -74.0055 }
    },
    {
      id: '3',
      name: 'Tuscany Garden',
      cuisine: ['Italian', 'Mediterranean'],
      priceRange: 2,
      rating: 4.7,
      distance: 3.2,
      image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2074',
      features: ['Outdoor Seating', 'Live Music', 'Waterfront'],
      availableTimes: ['17:00', '18:30', '19:00', '20:30'],
      description: 'Family-owned Italian restaurant with authentic recipes from Tuscany',
      address: '789 Mediterranean Ave, Waterfront',
      coordinates: { lat: 40.7120, lng: -74.0050 }
    }
  ];

  const displayResults = results.length > 0 ? results : sampleResults;

  return (
    <div className="space-y-6">
      {displayResults.map((result) => (
        <div key={result.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 relative">
              <img
                src={result.image}
                alt={result.name}
                className="w-full h-48 md:h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1 font-semibold">{result.rating}</span>
                </div>
              </div>
            </div>
            
            <div className="p-6 md:w-2/3">
              <div className="mb-4">
                <h3 className="text-xl font-bold mb-1">{result.name}</h3>
                <p className="text-gray-600">{result.description}</p>
              </div>

              <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {result.distance} km • {result.address}
                </div>
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-1" />
                  {'$'.repeat(result.priceRange)}
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  2-8 guests
                </div>
              </div>

              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {result.cuisine.map((type) => (
                    <span
                      key={type}
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                    >
                      {type}
                    </span>
                  ))}
                  {result.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2 flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Available Times
                </h4>
                <div className="flex flex-wrap gap-2">
                  {result.availableTimes.map((time) => (
                    <button
                      key={time}
                      className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition-colors"
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;