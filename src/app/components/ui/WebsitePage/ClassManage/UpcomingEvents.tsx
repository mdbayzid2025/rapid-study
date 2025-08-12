"use client"

import React from 'react';
import { Calendar, Clock, Plus } from 'lucide-react';
import AddEventForm from './AddEventForm';


interface UpcomingEventsProps {
  events: any[];
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events: initialEvents }) => {
  const [events, setEvents] = React.useState(initialEvents);
  const [showAddForm, setShowAddForm] = React.useState(false);

  const getEventColor = (type: any['type']) => {
    switch (type) {
      case 'exam':
        return 'border-red-200 bg-red-50 text-red-700';
      case 'discussion':
        return 'border-blue-200 bg-blue-50 text-blue-700';
      case 'office-hours':
        return 'border-green-200 bg-green-50 text-green-700';
      default:
        return 'border-gray-200 bg-gray-50 text-gray-700';
    }
  };

  const getEventLabel = (type: Event['type']) => {
    switch (type) {
      case 'exam':
        return 'Exam';
      case 'discussion':
        return 'Discussion';
      case 'office-hours':
        return 'Office Hours';
      default:
        return 'Event';
    }
  };

  const handleAddEvent = (newEvent: Event) => {
    setEvents(prev => [...prev, newEvent]);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Calendar className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add
          </button>
        </div>

        <div className="space-y-3">
          {events.map((event) => (
            <div key={event.id} className={`border-l-4 pl-4 py-3 ${getEventColor(event.type)}`}>
              <h4 className="font-medium text-gray-900">{event.title}</h4>
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <Clock className="w-4 h-4 mr-1" />
                {event.date} • {event.time}
              </div>
              <span className={`inline-block px-2 py-1 rounded text-xs font-medium mt-2 ${getEventColor(event.type)}`}>
                {getEventLabel(event.type)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <AddEventForm
        isOpen={showAddForm}
        onClose={() => setShowAddForm(false)}
        onSubmit={handleAddEvent}
      />
    </>
  );
};

export default UpcomingEvents;