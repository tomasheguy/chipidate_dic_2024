import React from 'react';
import { LogOut } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitcher';

const RestaurantNav = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const navItems = [
    { path: '/restaurant', label: 'restaurant.dashboard.title' },
    { path: '/restaurant/availability', label: 'restaurant.availability.title' },
    { path: '/restaurant/menus', label: 'restaurant.menus.title' },
    { path: '/restaurant/settings', label: 'restaurant.settings.title' }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              {t('brand')}
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-gray-600 hover:text-gray-900 ${
                  location.pathname === item.path ? 'text-blue-600' : ''
                }`}
              >
                {t(item.label)}
              </Link>
            ))}
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <button 
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <LogOut className="w-5 h-5 mr-2" />
                <span>{t('nav.signOut')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default RestaurantNav;