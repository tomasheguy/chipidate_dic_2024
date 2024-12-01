import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import TimeSlotForm from './TimeSlotForm';
import { DateAvailability } from '../../types';

interface DateAvailabilityFormProps {
  dates: DateAvailability[];
  onAdd: () => void;
  onUpdate: (index: number, field: keyof DateAvailability, value: any) => void;
  onRemove: (index: number) => void;
  onAddTimeSlot: (dateIndex: number) => void;
  onUpdateTimeSlot: (dateIndex: number, slotIndex: number, field: 'start' | 'end', value: string) => void;
  onRemoveTimeSlot: (dateIndex: number, slotIndex: number) => void;
}

const DateAvailabilityForm: React.FC<DateAvailabilityFormProps> = ({
  dates,
  onAdd,
  onUpdate,
  onRemove,
  onAddTimeSlot,
  onUpdateTimeSlot,
  onRemoveTimeSlot
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Available Dates</h3>
        <button
          type="button"
          onClick={onAdd}
          className="text-blue-600 hover:text-blue-700 flex items-center"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Date
        </button>
      </div>

      {dates.map((date, dateIndex) => (
        <div key={dateIndex} className="border rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center">
            <input
              type="date"
              value={date.date}
              onChange={(e) => onUpdate(dateIndex, 'date', e.target.value)}
              className="p-2 border rounded-md"
            />
            <button
              type="button"
              onClick={() => onRemove(dateIndex)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <TimeSlotForm
            timeSlots={date.timeSlots}
            onAdd={() => onAddTimeSlot(dateIndex)}
            onUpdate={(slotIndex, field, value) => 
              onUpdateTimeSlot(dateIndex, slotIndex, field, value)
            }
            onRemove={(slotIndex) => onRemoveTimeSlot(dateIndex, slotIndex)}
          />
        </div>
      ))}

      {dates.length === 0 && (
        <p className="text-gray-500 text-center py-4">No dates added yet</p>
      )}
    </div>
  );
};

export default DateAvailabilityForm;