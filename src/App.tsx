import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SearchPage from './pages/search/SearchPage';
import RestaurantDashboard from './pages/restaurant/Dashboard';
import TableAvailability from './pages/restaurant/TableAvailability';
import MenuManagement from './pages/restaurant/MenuManagement';
import RestaurantSettings from './pages/restaurant/Settings';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/restaurant" element={<RestaurantDashboard />} />
        <Route path="/restaurant/availability" element={<TableAvailability />} />
        <Route path="/restaurant/menus" element={<MenuManagement />} />
        <Route path="/restaurant/settings" element={<RestaurantSettings />} />
        <Route path="/restaurant/login" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;