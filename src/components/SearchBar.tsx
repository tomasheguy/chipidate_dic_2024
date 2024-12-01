import React from 'react';
import { Search, Calendar, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const SearchBar = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-lg shadow-xl p-4 w-full max-w-4xl flex flex-col md:flex-row gap-4">
      <div className="flex-1 flex items-center border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:pr-4">
        <Calendar className="text-gray-400 mr-2" size={20} />
        <input
          type="date"
          className="w-full outline-none"
          placeholder={t('search.date')}
        />
      </div>
      
      <div className="flex-1 flex items-center border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:pr-4">
        <Users className="text-gray-400 mr-2" size={20} />
        <select className="w-full outline-none bg-transparent">
          <option value="">{t('search.guests')}</option>
          <option value="2">{t('search.guestOptions.2')}</option>
          <option value="4">{t('search.guestOptions.4')}</option>
          <option value="6">{t('search.guestOptions.6')}</option>
          <option value="8">{t('search.guestOptions.8')}</option>
        </select>
      </div>

      <div className="flex-1 flex items-center">
        <Search className="text-gray-400 mr-2" size={20} />
        <input
          type="text"
          placeholder={t('search.cuisine')}
          className="w-full outline-none"
        />
      </div>

      <button className="bg-blue-600 text-white px-8 py-2 rounded-md hover:bg-blue-700 transition-colors">
        {t('search.search')}
      </button>
    </div>
  );
};

export default SearchBar;