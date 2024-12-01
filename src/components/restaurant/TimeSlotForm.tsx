import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { TimeSlot } from '../../types';

interface TimeSlotFormProps {
  timeSlots: TimeSlot[];
  onAdd: () => void;
  onUpdate: (index: number, field: keyof TimeSlot, value: string) => void;
  onRemove: (index: number) => void;
}

const TimeSlotForm: React.FC<TimeSlotFormProps> = ({
  timeSlots,
  onAdd,
  onUpdate,
  onRemove
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="font-medium">Time Slots</h4>
        <button
          type="button"
          onClick={onAdd}
          className="text-blue-600 hover:text-blue-700 flex items-center text-sm"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Time Slot
        </button>
      </div>

      {timeSlots.map((slot, index) => (
        <div key={index} className="flex items-center space-x-4">
          <input
            type="time"
            value={slot.start}
            onChange={(e) => onUpdate(index, 'start', e.target.value)}
            className="p-2 border rounded-md"
          />
          <span className="text-gray-500">to</span>
          <input
            type="time"
            value={slot.end}
            onChange={(e) => onUpdate(index, 'end', e.target.value)}
            className="p-2 border rounded-md"
          />
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}

      {timeSlots.length === 0 && (
        <p className="text-gray-500 text-sm">No time slots added yet</p>
      )}
    </div>
  );
};

export default TimeSlotForm;