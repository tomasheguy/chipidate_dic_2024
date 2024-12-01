import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800 whitespace-nowrap">
              {t('brand')}
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/search" className="text-gray-600 hover:text-gray-900 whitespace-nowrap">
              {t('nav.searchDeals')}
            </Link>
            <Link to="/featured" className="text-gray-600 hover:text-gray-900 whitespace-nowrap">
              {t('nav.featured')}
            </Link>
            <Link to="/how-it-works" className="text-gray-600 hover:text-gray-900 whitespace-nowrap">
              {t('nav.howItWorks')}
            </Link>
            <Link to="/restaurant/login" className="text-gray-600 hover:text-gray-900 whitespace-nowrap">
              {t('nav.forRestaurants')}
            </Link>
            <LanguageSwitcher />
            <div className="flex items-center space-x-4">
              <Link to="/register" className="text-gray-600 hover:text-gray-900">
                {t('nav.register')}
              </Link>
              <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                {t('nav.signIn')}
              </Link>
            </div>
          </div>

          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <Link to="/search" className="text-gray-600 hover:text-gray-900">
                {t('nav.searchDeals')}
              </Link>
              <Link to="/featured" className="text-gray-600 hover:text-gray-900">
                {t('nav.featured')}
              </Link>
              <Link to="/how-it-works" className="text-gray-600 hover:text-gray-900">
                {t('nav.howItWorks')}
              </Link>
              <Link to="/restaurant/login" className="text-gray-600 hover:text-gray-900">
                {t('nav.forRestaurants')}
              </Link>
              <Link to="/register" className="text-gray-600 hover:text-gray-900">
                {t('nav.register')}
              </Link>
              <Link to="/login" className="text-gray-600 hover:text-gray-900">
                {t('nav.signIn')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;