import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import { useRestaurant } from '../../contexts/RestaurantContext';

interface TimeSlot {
  start: string;
  end: string;
}

interface AvailabilityScheduleProps {
  selectedDate: Date;
  tableId: string;
}

const AvailabilitySchedule: React.FC<AvailabilityScheduleProps> = ({ selectedDate, tableId }) => {
  const { updateAvailability } = useRestaurant();
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    { start: '11:00', end: '13:00' },
    { start: '13:00', end: '15:00' },
    { start: '18:00', end: '20:00' },
    { start: '20:00', end: '22:00' }
  ]);

  const handleTimeSlotChange = (index: number, field: 'start' | 'end', value: string) => {
    const newTimeSlots = [...timeSlots];
    newTimeSlots[index] = { ...newTimeSlots[index], [field]: value };
    setTimeSlots(newTimeSlots);

    // Update availability in context
    updateAvailability({
      id: `${tableId}-${selectedDate.toISOString()}`,
      tableId,
      date: selectedDate.toISOString().split('T')[0],
      timeSlots: newTimeSlots,
      available: true
    });
  };

  const addTimeSlot = () => {
    setTimeSlots([...timeSlots, { start: '12:00', end: '14:00' }]);
  };

  const removeTimeSlot = (index: number) => {
    setTimeSlots(timeSlots.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium flex items-center">
          <Clock className="w-4 h-4 mr-2" />
          Time Slots
        </h3>
        <button
          onClick={addTimeSlot}
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          Add Time Slot
        </button>
      </div>

      {timeSlots.map((slot, index) => (
        <div key={index} className="flex items-center space-x-4">
          <input
            type="time"
            value={slot.start}
            onChange={(e) => handleTimeSlotChange(index, 'start', e.target.value)}
            className="p-2 border rounded-md"
          />
          <span>to</span>
          <input
            type="time"
            value={slot.end}
            onChange={(e) => handleTimeSlotChange(index, 'end', e.target.value)}
            className="p-2 border rounded-md"
          />
          <button
            onClick={() => removeTimeSlot(index)}
            className="text-red-600 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default AvailabilitySchedule;