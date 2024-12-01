import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Calendar, UtensilsCrossed, Settings } from 'lucide-react';
import RestaurantNav from './RestaurantNav';
import StatsOverview from './StatsOverview';
import UpcomingReservations from './UpcomingReservations';

const Dashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const quickActions = [
    {
      icon: <Calendar className="w-5 h-5 text-blue-600" />,
      label: t('restaurant.dashboard.quickActions.availability'),
      path: '/restaurant/availability',
      bgColor: 'bg-blue-50',
      hoverColor: 'hover:bg-blue-100'
    },
    {
      icon: <UtensilsCrossed className="w-5 h-5 text-green-600" />,
      label: t('restaurant.dashboard.quickActions.menus'),
      path: '/restaurant/menus',
      bgColor: 'bg-green-50',
      hoverColor: 'hover:bg-green-100'
    },
    {
      icon: <Settings className="w-5 h-5 text-purple-600" />,
      label: t('restaurant.dashboard.quickActions.settings'),
      path: '/restaurant/settings',
      bgColor: 'bg-purple-50',
      hoverColor: 'hover:bg-purple-100'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <RestaurantNav />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">{t('restaurant.dashboard.title')}</h1>
        
        <StatsOverview />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <UpcomingReservations />
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
              {t('restaurant.dashboard.quickActions.title')}
            </h2>
            <div className="space-y-4">
              {quickActions.map((action) => (
                <button
                  key={action.path}
                  onClick={() => navigate(action.path)}
                  className={`w-full flex items-center justify-between p-4 ${action.bgColor} rounded-lg ${action.hoverColor} transition-colors duration-200`}
                >
                  <span className="flex items-center">
                    {action.icon}
                    <span className="ml-3">{action.label}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;