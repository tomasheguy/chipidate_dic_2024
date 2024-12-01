import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import RestaurantNav from '../../components/restaurant/RestaurantNav';
import { Mail, Phone, MapPin, Globe, Camera } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const RestaurantSettings = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

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

  const handleFeatureToggle = (feature: string) => {
    setSelectedFeatures(prev =>
      prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <RestaurantNav />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">{t('restaurant.settings.title')}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Information */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-6">{t('restaurant.settings.sections.basic.title')}</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('restaurant.settings.sections.basic.name')}
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.restaurantName}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('restaurant.settings.sections.basic.description')}
                  </label>
                  <textarea
                    rows={4}
                    className="w-full p-2 border rounded-md"
                    placeholder={t('restaurant.settings.sections.basic.description')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('restaurant.settings.sections.basic.cuisine')}
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    placeholder={t('restaurant.settings.sections.basic.cuisine')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('restaurant.settings.sections.basic.features')}
                  </label>
                  <p className="text-sm text-gray-500 mb-4">
                    {t('restaurant.settings.sections.basic.featuresDescription')}
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {features.map(feature => (
                      <label key={feature} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedFeatures.includes(feature)}
                          onChange={() => handleFeatureToggle(feature)}
                          className="rounded text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">
                          {t(`search.features.${feature}`)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-6">{t('restaurant.settings.sections.contact.title')}</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-gray-400 mr-2" />
                  <input
                    type="email"
                    defaultValue={user?.email}
                    className="w-full p-2 border rounded-md"
                    placeholder={t('restaurant.settings.sections.contact.email')}
                  />
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-gray-400 mr-2" />
                  <input
                    type="tel"
                    className="w-full p-2 border rounded-md"
                    placeholder={t('restaurant.settings.sections.contact.phone')}
                  />
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    placeholder={t('restaurant.settings.sections.contact.address')}
                  />
                </div>
                <div className="flex items-center">
                  <Globe className="w-5 h-5 text-gray-400 mr-2" />
                  <input
                    type="url"
                    className="w-full p-2 border rounded-md"
                    placeholder={t('restaurant.settings.sections.contact.website')}
                  />
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-6">{t('restaurant.settings.sections.hours.title')}</h2>
              {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
                <div key={day} className="flex items-center justify-between py-2">
                  <span className="w-32">{t(`restaurant.settings.sections.hours.days.${day}`)}</span>
                  <div className="flex items-center space-x-4">
                    <input type="time" className="p-2 border rounded-md" />
                    <span>to</span>
                    <input type="time" className="p-2 border rounded-md" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Photos and Media */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-6">{t('restaurant.settings.sections.photos.title')}</h2>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <div className="text-sm text-gray-600">
                    <label className="cursor-pointer text-blue-600 hover:text-blue-500">
                      {t('restaurant.settings.sections.photos.upload')}
                      <input type="file" className="hidden" accept="image/*" multiple />
                    </label>
                    <p className="mt-1">{t('restaurant.settings.sections.photos.dragDrop')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-6">{t('common.save')}</h2>
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                {t('common.save')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantSettings;