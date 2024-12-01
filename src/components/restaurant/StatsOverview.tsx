import React from 'react';
import { TrendingUp, Users, DollarSign, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const StatsOverview = () => {
  const { t } = useTranslation();

  const stats = [
    {
      icon: <Calendar className="w-8 h-8 text-blue-600" />,
      label: t('restaurant.dashboard.stats.reservations'),
      value: "12",
      trend: "+20%",
    },
    {
      icon: <DollarSign className="w-8 h-8 text-green-600" />,
      label: t('restaurant.dashboard.stats.revenue'),
      value: "$15,240",
      trend: "+12%",
    },
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      label: t('restaurant.dashboard.stats.guests'),
      value: "342",
      trend: "+8%",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-orange-600" />,
      label: t('restaurant.dashboard.stats.avgBooking'),
      value: "$127",
      trend: "+15%",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            {stat.icon}
            <span className="text-green-600 text-sm font-medium">{stat.trend}</span>
          </div>
          <h3 className="text-gray-600 text-sm mb-1">{stat.label}</h3>
          <p className="text-2xl font-bold">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;