import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Availability } from '../../types';

interface CalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  availability: Availability[];
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateSelect, availability }) => {
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const days = getDaysInMonth(selectedDate);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-semibold">
          {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h2>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
            {day}
          </div>
        ))}
        
        {days.map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} className="p-2" />;
          }

          const isSelected = date.toDateString() === selectedDate.toDateString();
          const hasAvailability = availability.some(
            (a) => new Date(a.date).toDateString() === date.toDateString() && a.available
          );

          return (
            <button
              key={date.toISOString()}
              onClick={() => onDateSelect(date)}
              className={`
                p-2 rounded-lg text-center
                ${isSelected ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}
                ${hasAvailability ? 'font-semibold' : 'text-gray-400'}
              `}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;