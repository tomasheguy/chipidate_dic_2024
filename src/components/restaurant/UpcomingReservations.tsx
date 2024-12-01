import React from 'react';
import { Clock, Users } from 'lucide-react';

const UpcomingReservations = () => {
  const reservations = [
    {
      id: 1,
      customerName: "John Smith",
      date: "2024-03-20",
      time: "19:00",
      guests: 4,
      menu: "5-Course Tasting Menu",
      status: "confirmed"
    },
    {
      id: 2,
      customerName: "Emma Johnson",
      date: "2024-03-20",
      time: "20:00",
      guests: 2,
      menu: "Premium Wine Pairing Dinner",
      status: "confirmed"
    },
    {
      id: 3,
      customerName: "Michael Brown",
      date: "2024-03-21",
      time: "18:30",
      guests: 6,
      menu: "Chef's Special Menu",
      status: "confirmed"
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold">Upcoming Reservations</h2>
      </div>
      
      <div className="divide-y">
        {reservations.map((reservation) => (
          <div key={reservation.id} className="p-6 hover:bg-gray-50">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold">{reservation.customerName}</h3>
                <p className="text-gray-600">{reservation.menu}</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                {reservation.status}
              </span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {new Date(`${reservation.date}T${reservation.time}`).toLocaleString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric'
                })}
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                {reservation.guests} guests
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingReservations;