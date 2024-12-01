import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useRestaurant } from '../../contexts/RestaurantContext';
import { Table, DateAvailability, TimeSlot } from '../../types';
import DateAvailabilityForm from './DateAvailabilityForm';

interface TableFormProps {
  onClose: () => void;
  editTable?: Table;
}

const TableForm: React.FC<TableFormProps> = ({ onClose, editTable }) => {
  const { t } = useTranslation();
  const { addTable, updateTable } = useRestaurant();
  const [formData, setFormData] = useState({
    name: editTable?.name || '',
    seats: editTable?.seats || 2,
    minDiners: editTable?.minDiners || 1,
    maxDiners: editTable?.maxDiners || 2,
    location: editTable?.location || 'main',
    isPrivate: editTable?.isPrivate || false
  });

  const [dates, setDates] = useState<DateAvailability[]>(editTable?.availability || []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tableData = {
      id: editTable?.id || Date.now().toString(),
      ...formData,
      availability: dates
    };

    if (editTable) {
      updateTable(tableData);
    } else {
      addTable(tableData);
    }
    onClose();
  };

  const addDate = () => {
    setDates([...dates, { date: '', timeSlots: [] }]);
  };

  const updateDate = (index: number, field: keyof DateAvailability, value: any) => {
    const newDates = [...dates];
    newDates[index] = { ...newDates[index], [field]: value };
    setDates(newDates);
  };

  const removeDate = (index: number) => {
    setDates(dates.filter((_, i) => i !== index));
  };

  const addTimeSlot = (dateIndex: number) => {
    const newDates = [...dates];
    newDates[dateIndex].timeSlots.push({ start: '', end: '' });
    setDates(newDates);
  };

  const updateTimeSlot = (dateIndex: number, slotIndex: number, field: keyof TimeSlot, value: string) => {
    const newDates = [...dates];
    newDates[dateIndex].timeSlots[slotIndex] = {
      ...newDates[dateIndex].timeSlots[slotIndex],
      [field]: value
    };
    setDates(newDates);
  };

  const removeTimeSlot = (dateIndex: number, slotIndex: number) => {
    const newDates = [...dates];
    newDates[dateIndex].timeSlots = newDates[dateIndex].timeSlots.filter((_, i) => i !== slotIndex);
    setDates(newDates);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          {editTable ? t('restaurant.availability.editTable') : t('restaurant.availability.addTable')}
        </h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('restaurant.availability.tableDetails.name')}
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 border rounded-md"
              placeholder={t('restaurant.availability.tableDetails.namePlaceholder')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('restaurant.availability.tableDetails.location')}
            </label>
            <select
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value as Table['location'] })}
              className="w-full p-2 border rounded-md"
            >
              <option value="main">{t('restaurant.availability.locations.main')}</option>
              <option value="outdoor">{t('restaurant.availability.locations.outdoor')}</option>
              <option value="private">{t('restaurant.availability.locations.private')}</option>
              <option value="bar">{t('restaurant.availability.locations.bar')}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('restaurant.availability.tableDetails.minDiners')}
            </label>
            <input
              type="number"
              min="1"
              required
              value={formData.minDiners}
              onChange={(e) => setFormData({ ...formData, minDiners: parseInt(e.target.value) })}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('restaurant.availability.tableDetails.maxDiners')}
            </label>
            <input
              type="number"
              min="1"
              required
              value={formData.maxDiners}
              onChange={(e) => setFormData({ ...formData, maxDiners: parseInt(e.target.value) })}
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="isPrivate"
            checked={formData.isPrivate}
            onChange={(e) => setFormData({ ...formData, isPrivate: e.target.checked })}
            className="h-4 w-4 text-blue-600 rounded border-gray-300"
          />
          <label htmlFor="isPrivate" className="ml-2 text-sm text-gray-700">
            {t('restaurant.availability.tableDetails.isPrivate')}
          </label>
        </div>

        <div className="border-t pt-6">
          <DateAvailabilityForm
            dates={dates}
            onAdd={addDate}
            onUpdate={updateDate}
            onRemove={removeDate}
            onAddTimeSlot={addTimeSlot}
            onUpdateTimeSlot={updateTimeSlot}
            onRemoveTimeSlot={removeTimeSlot}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            {t('common.cancel')}
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {editTable ? t('common.update') : t('common.add')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TableForm;