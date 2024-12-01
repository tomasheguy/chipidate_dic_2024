import React from 'react';
import { Search, Calendar, CreditCard, UtensilsCrossed } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const HowItWorks = () => {
  const { t } = useTranslation();

  const steps = [
    {
      icon: <Search className="w-12 h-12 text-blue-600" />,
      title: t('howItWorks.steps.find.title'),
      description: t('howItWorks.steps.find.description')
    },
    {
      icon: <Calendar className="w-12 h-12 text-blue-600" />,
      title: t('howItWorks.steps.date.title'),
      description: t('howItWorks.steps.date.description')
    },
    {
      icon: <CreditCard className="w-12 h-12 text-blue-600" />,
      title: t('howItWorks.steps.pay.title'),
      description: t('howItWorks.steps.pay.description')
    },
    {
      icon: <UtensilsCrossed className="w-12 h-12 text-blue-600" />,
      title: t('howItWorks.steps.enjoy.title'),
      description: t('howItWorks.steps.enjoy.description')
    }
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">{t('howItWorks.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;