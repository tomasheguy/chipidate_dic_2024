import React from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import FeaturedDeals from '../components/FeaturedDeals';
import HowItWorks from '../components/HowItWorks';

function Home() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[70vh] bg-cover bg-center" style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2074")'
      }}>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-5xl font-bold mb-6 text-center">{t('hero.title')}</h1>
          <p className="text-xl mb-8 text-center max-w-2xl">{t('hero.subtitle')}</p>
          <SearchBar />
        </div>
      </div>

      {/* How It Works */}
      <div id="how-it-works">
        <HowItWorks />
      </div>

      {/* Featured Deals */}
      <section id="featured" className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">{t('featured.title')}</h2>
          <FeaturedDeals />
        </div>
      </section>
    </div>
  );
}

export default Home;