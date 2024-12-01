import React from 'react';
import { Table, Availability } from '../../types';

interface TableListProps {
  tables: Table[];
  selectedDate: Date;
  availability: Availability[];
  onAvailabilityChange: (tableId: string, shift: 'lunch' | 'dinner', available: boolean) => void;
}

const TableList: React.FC<TableListProps> = ({
  tables,
  selectedDate,
  availability,
  onAvailabilityChange,
}) => {
  return (
    <div className="space-y-4">
      {tables.map((table) => {
        const tableAvailability = availability.find(
          (a) => 
            a.tableId === table.id && 
            new Date(a.date).toDateString() === selectedDate.toDateString()
        );

        return (
          <div key={table.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">Table {table.name}</h3>
              <span className="text-sm text-gray-600">{table.seats} seats</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {['lunch', 'dinner'].map((shift) => (
                <label
                  key={`${table.id}-${shift}`}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="checkbox"
                    checked={tableAvailability?.shifts.includes(shift as 'lunch' | 'dinner')}
                    onChange={(e) => 
                      onAvailabilityChange(table.id, shift as 'lunch' | 'dinner', e.target.checked)
                    }
                    className="rounded text-blue-600"
                  />
                  <span className="capitalize">{shift}</span>
                </label>
              ))}
            </div>
          </div>
        );
      })}

      {tables.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No tables added yet. Add tables to manage their availability.
        </div>
      )}
    </div>
  );
};

export default TableList;