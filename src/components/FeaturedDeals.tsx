import React from 'react';
import { Star, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FeaturedDeals = () => {
  const { t } = useTranslation();

  const deals = [
    {
      id: 1,
      restaurant: "La Maison D'Or",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070",
      cuisine: "French",
      rating: 4.8,
      price: 89,
      originalPrice: 150,
      description: "5-course tasting menu with wine pairing",
      guests: "2-4"
    },
    {
      id: 2,
      restaurant: "Sakura Sushi",
      image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2070",
      cuisine: "Japanese",
      rating: 4.9,
      price: 75,
      originalPrice: 120,
      description: "Premium omakase experience",
      guests: "2"
    },
    {
      id: 3,
      restaurant: "Tuscany",
      image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2074",
      cuisine: "Italian",
      rating: 4.7,
      price: 65,
      originalPrice: 110,
      description: "4-course authentic Italian dinner",
      guests: "2-6"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {deals.map((deal) => (
        <div key={deal.id} className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
          <div className="relative h-48">
            <img 
              src={deal.image} 
              alt={deal.restaurant} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full">
              {Math.round(((deal.originalPrice - deal.price) / deal.originalPrice) * 100)}{t('featured.off')}
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold">{deal.restaurant}</h3>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                <span>{deal.rating}</span>
              </div>
            </div>
            
            <p className="text-gray-600 mb-2">{deal.cuisine}</p>
            <p className="text-gray-800 mb-4">{deal.description}</p>
            
            <div className="flex items-center mb-4">
              <Users className="w-4 h-4 text-gray-400 mr-2" />
              <span className="text-gray-600">{deal.guests} {t('featured.guests')}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <span className="text-2xl font-bold text-blue-600">${deal.price}</span>
                <span className="text-gray-400 line-through ml-2">${deal.originalPrice}</span>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                {t('featured.bookNow')}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedDeals;