import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';
import Navbar from '../../components/Navbar';
import SearchFilters from './components/SearchFilters';
import SearchResults from './components/SearchResults';
import { SearchResult, FilterState } from './types';

const SearchPage = () => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<FilterState>({
    cuisine: [],
    priceRange: [],
    rating: 0,
    distance: 10,
    date: '',
    time: '',
    guests: 2,
    features: [],
    sortBy: 'recommended',
    searchQuery: ''
  });

  const [results, setResults] = useState<SearchResult[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  const handleSearch = (newFilters: FilterState) => {
    setFilters(newFilters);
    // In a real app, this would make an API call with the filters
    // For now, we'll just update the state
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder={t('search.cuisine')}
              value={filters.searchQuery}
              onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
              className="w-full p-4 pl-12 bg-white rounded-lg shadow focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <SearchFilters filters={filters} onFilterChange={handleSearch} />
          </div>
          
          <div className="lg:col-span-3">
            <SearchResults results={results} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;