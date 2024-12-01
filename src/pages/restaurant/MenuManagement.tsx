import React, { useState } from 'react';
import { Plus, Trash2, Edit, Upload } from 'lucide-react';
import RestaurantNav from '../../components/restaurant/RestaurantNav';
import MenuForm from '../../components/restaurant/MenuForm';
import FileImport from '../../components/restaurant/FileImport';
import ImportGuide from '../../components/restaurant/ImportGuide';
import { Menu } from '../../types';
import { useRestaurant } from '../../contexts/RestaurantContext';

const MenuManagement = () => {
  const [showMenuForm, setShowMenuForm] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const { menus, addMenu } = useRestaurant();

  const handleFileImport = (content: string) => {
    try {
      const data = JSON.parse(content);
      if (!Array.isArray(data.menus)) {
        throw new Error('Invalid format: menus array not found');
      }
      
      data.menus.forEach((menu: Menu) => {
        addMenu(menu);
      });
      
      setShowImport(false);
    } catch (error) {
      alert('Error importing file. Please check the format and try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <RestaurantNav />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Menu Management</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setShowImport(true)}
              className="bg-white text-gray-600 px-4 py-2 rounded-md border hover:bg-gray-50 flex items-center"
            >
              <Upload className="w-5 h-5 mr-2" />
              Import Menus
            </button>
            <button
              onClick={() => setShowMenuForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create New Menu
            </button>
          </div>
        </div>

        {showImport && (
          <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <FileImport
              onFileSelect={handleFileImport}
              accept=".json"
              description="Upload your menu data in JSON format"
            />
            <ImportGuide type="menu" />
          </div>
        )}

        {showMenuForm && (
          <div className="mb-8">
            <MenuForm onClose={() => setShowMenuForm(false)} />
          </div>
        )}

        <div className="grid gap-6">
          {menus.map((menu) => (
            <div key={menu.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{menu.name}</h3>
                  <p className="text-gray-600">{menu.description}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-md">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded-md">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <span>Valid: {new Date(menu.startDate).toLocaleDateString()} - {new Date(menu.endDate).toLocaleDateString()}</span>
                <span className="flex items-center">
                  <span className="text-2xl font-bold text-blue-600">${menu.discountedPrice}</span>
                  <span className="text-gray-400 line-through ml-2">${menu.price}</span>
                </span>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Menu Items</h4>
                <div className="space-y-2">
                  {menu.items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span>{item.name}</span>
                      <span className="text-gray-600">${item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuManagement;