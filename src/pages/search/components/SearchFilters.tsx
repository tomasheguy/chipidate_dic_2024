import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FilterState } from '../types';
import { Sliders, Star } from 'lucide-react';

interface SearchFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ filters, onFilterChange }) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState<string[]>(['basic']);

  const toggleSection = (section: string) => {
    setExpanded(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const cuisineTypes = [
    'italian',
    'japanese',
    'french',
    'chinese',
    'indian',
    'mexican',
    'mediterranean',
    'thai',
    'american',
    'spanish'
  ];

  const features = [
    'outdoorSeating',
    'privateRoom',
    'wheelchairAccessible',
    'liveMusic',
    'byob',
    'waterfront',
    'rooftop',
    'petFriendly',
    'valetParking',
    'wineList',
    'fullBar',
    'vegetarianOptions',
    'veganOptions',
    'glutenFreeOptions'
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-6">
        <Sliders className="w-5 h-5 mr-2" />
        <h2 className="text-lg font-semibold">{t('search.filters.title')}</h2>
      </div>

      <div className="space-y-6">
        {/* Date and Time */}
        <div className="border-b pb-4">
          <button
            className="flex items-center justify-between w-full mb-2"
            onClick={() => toggleSection('datetime')}
          >
            <span className="font-medium">{t('search.filters.date')}</span>
            <span>{expanded.includes('datetime') ? '−' : '+'}</span>
          </button>
          
          {expanded.includes('datetime') && (
            <div className="space-y-4">
              <div>
                <input
                  type="date"
                  value={filters.date}
                  onChange={(e) => onFilterChange({ ...filters, date: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <input
                  type="time"
                  value={filters.time}
                  onChange={(e) => onFilterChange({ ...filters, time: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>
          )}
        </div>

        {/* Guests */}
        <div className="border-b pb-4">
          <button
            className="flex items-center justify-between w-full mb-2"
            onClick={() => toggleSection('guests')}
          >
            <span className="font-medium">{t('search.filters.guests')}</span>
            <span>{expanded.includes('guests') ? '−' : '+'}</span>
          </button>
          
          {expanded.includes('guests') && (
            <input
              type="number"
              min="1"
              value={filters.guests}
              onChange={(e) => onFilterChange({ ...filters, guests: parseInt(e.target.value) })}
              className="w-full p-2 border rounded-md"
            />
          )}
        </div>

        {/* Price Category */}
        <div className="border-b pb-4">
          <button
            className="flex items-center justify-between w-full mb-2"
            onClick={() => toggleSection('price')}
          >
            <span className="font-medium">{t('search.filters.priceCategory')}</span>
            <span>{expanded.includes('price') ? '−' : '+'}</span>
          </button>
          
          {expanded.includes('price') && (
            <div className="space-y-2">
              {[1, 2, 3, 4].map(price => (
                <label key={price} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.priceRange.includes(price)}
                    onChange={() => {
                      const newPriceRange = filters.priceRange.includes(price)
                        ? filters.priceRange.filter(p => p !== price)
                        : [...filters.priceRange, price];
                      onFilterChange({ ...filters, priceRange: newPriceRange });
                    }}
                    className="mr-2"
                  />
                  {'$'.repeat(price)}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Cuisine Types */}
        <div className="border-b pb-4">
          <button
            className="flex items-center justify-between w-full mb-2"
            onClick={() => toggleSection('cuisine')}
          >
            <span className="font-medium">{t('search.filters.cuisineTypes')}</span>
            <span>{expanded.includes('cuisine') ? '−' : '+'}</span>
          </button>
          
          {expanded.includes('cuisine') && (
            <div className="space-y-2">
              {cuisineTypes.map(cuisine => (
                <label key={cuisine} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.cuisine.includes(cuisine)}
                    onChange={() => {
                      const newCuisine = filters.cuisine.includes(cuisine)
                        ? filters.cuisine.filter(c => c !== cuisine)
                        : [...filters.cuisine, cuisine];
                      onFilterChange({ ...filters, cuisine: newCuisine });
                    }}
                    className="mr-2"
                  />
                  {t(`search.cuisineTypes.${cuisine}`)}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Features */}
        <div className="border-b pb-4">
          <button
            className="flex items-center justify-between w-full mb-2"
            onClick={() => toggleSection('features')}
          >
            <span className="font-medium">{t('search.filters.features')}</span>
            <span>{expanded.includes('features') ? '−' : '+'}</span>
          </button>
          
          {expanded.includes('features') && (
            <div className="space-y-2">
              {features.map(feature => (
                <label key={feature} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.features.includes(feature)}
                    onChange={() => {
                      const newFeatures = filters.features.includes(feature)
                        ? filters.features.filter(f => f !== feature)
                        : [...filters.features, feature];
                      onFilterChange({ ...filters, features: newFeatures });
                    }}
                    className="mr-2"
                  />
                  {t(`search.features.${feature}`)}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Distance */}
        <div className="border-b pb-4">
          <button
            className="flex items-center justify-between w-full mb-2"
            onClick={() => toggleSection('distance')}
          >
            <span className="font-medium">{t('search.filters.distance')}</span>
            <span>{expanded.includes('distance') ? '−' : '+'}</span>
          </button>
          
          {expanded.includes('distance') && (
            <div>
              <input
                type="range"
                min="1"
                max="50"
                value={filters.distance}
                onChange={(e) => onFilterChange({ ...filters, distance: parseInt(e.target.value) })}
                className="w-full"
              />
              <div className="text-sm text-gray-600 mt-2">
                Within {filters.distance} km
              </div>
            </div>
          )}
        </div>

        {/* Rating */}
        <div className="border-b pb-4">
          <button
            className="flex items-center justify-between w-full mb-2"
            onClick={() => toggleSection('rating')}
          >
            <span className="font-medium">{t('search.filters.rating')}</span>
            <span>{expanded.includes('rating') ? '−' : '+'}</span>
          </button>
          
          {expanded.includes('rating') && (
            <div className="space-y-2">
              {[4, 3, 2, 1].map(rating => (
                <label key={rating} className="flex items-center">
                  <input
                    type="radio"
                    checked={filters.rating === rating}
                    onChange={() => onFilterChange({ ...filters, rating })}
                    className="mr-2"
                  />
                  <div className="flex items-center">
                    {Array.from({ length: rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                    <span className="ml-2">& up</span>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Sort By */}
        <div>
          <label className="block font-medium mb-2">
            {t('search.filters.sort.label')}
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value as FilterState['sortBy'] })}
            className="w-full p-2 border rounded-md"
          >
            <option value="recommended">{t('search.filters.sort.recommended')}</option>
            <option value="rating">{t('search.filters.sort.rating')}</option>
            <option value="price">{t('search.filters.sort.price')}</option>
            <option value="distance">{t('search.filters.sort.distance')}</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;