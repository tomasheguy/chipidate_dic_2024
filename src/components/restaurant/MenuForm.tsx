import React, { useState } from 'react';
import { X, Plus, Upload } from 'lucide-react';
import { MenuItem, Menu } from '../../types';
import { useRestaurant } from '../../contexts/RestaurantContext';

interface MenuFormProps {
  onClose: () => void;
  editMenu?: Menu;
}

const MenuForm: React.FC<MenuFormProps> = ({ onClose, editMenu }) => {
  const { addMenu, updateMenu } = useRestaurant();
  const [formData, setFormData] = useState({
    name: editMenu?.name || '',
    description: editMenu?.description || '',
    startDate: editMenu?.startDate || '',
    endDate: editMenu?.endDate || '',
    price: editMenu?.price?.toString() || '',
    discountedPrice: editMenu?.discountedPrice?.toString() || '',
  });

  const [items, setItems] = useState<MenuItem[]>(editMenu?.items || []);

  const handleImageUpload = async (file: File, itemIndex: number) => {
    const imageUrl = URL.createObjectURL(file);
    const updatedItems = [...items];
    updatedItems[itemIndex] = { ...updatedItems[itemIndex], imageUrl };
    setItems(updatedItems);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const menuData: Menu = {
      id: editMenu?.id || Date.now().toString(),
      ...formData,
      price: parseFloat(formData.price) || 0,
      discountedPrice: parseFloat(formData.discountedPrice) || 0,
      items
    };

    if (editMenu) {
      updateMenu(menuData);
    } else {
      addMenu(menuData);
    }
    onClose();
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        id: Date.now().toString(),
        name: '',
        description: '',
        type: 'starter',
        price: 0,
      }
    ]);
  };

  const updateItem = (index: number, field: keyof MenuItem, value: any) => {
    const updatedItems = [...items];
    if (field === 'price') {
      value = parseFloat(value) || 0;
    }
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setItems(updatedItems);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          {editMenu ? 'Edit Menu' : 'Create New Menu'}
        </h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Menu Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 border rounded-md"
              placeholder="e.g., Summer Tasting Menu"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2 border rounded-md"
              placeholder="Brief description of the menu"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <input
              type="date"
              required
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date
            </label>
            <input
              type="date"
              required
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Regular Price
            </label>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Discounted Price
            </label>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              value={formData.discountedPrice}
              onChange={(e) => setFormData({ ...formData, discountedPrice: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Menu Items</h3>
            <button
              type="button"
              onClick={addItem}
              className="text-blue-600 hover:text-blue-700 flex items-center"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Item
            </button>
          </div>

          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Item Name
                    </label>
                    <input
                      type="text"
                      required
                      value={item.name}
                      onChange={(e) => updateItem(index, 'name', e.target.value)}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type
                    </label>
                    <select
                      value={item.type}
                      onChange={(e) => updateItem(index, 'type', e.target.value)}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="starter">Starter</option>
                      <option value="main">Main Course</option>
                      <option value="dessert">Dessert</option>
                      <option value="beverage">Beverage</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => updateItem(index, 'description', e.target.value)}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={item.price}
                      onChange={(e) => updateItem(index, 'price', e.target.value)}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image
                    </label>
                    <div className="flex items-center space-x-4">
                      {item.imageUrl && (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                      <label className="cursor-pointer flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Image
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload(file, index);
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="mt-4 text-red-600 hover:text-red-700"
                >
                  Remove Item
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {editMenu ? 'Update Menu' : 'Create Menu'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MenuForm;