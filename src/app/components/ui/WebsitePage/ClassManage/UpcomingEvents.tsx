"use client"

import React from 'react';
import { Calendar, Clock, Plus } from 'lucide-react';
import AddEventForm from './AddEventForm';
import dayjs from 'dayjs';
import { useCreateEventMutation } from '@/store/api/eventApi';




interface UpcomingEventsProps {
  upcomingEvents:any  
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({  upcomingEvents}: any) => {  
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [createEvent, {isLoading}] = useCreateEventMutation();

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

  const handleAddEvent = async (newEvent: Event) => {
    try {
      const res = createEvent(newEvent);

      console.log("res", res)
    } catch (error) {
      console.log("error", error)
    }    
  };

  return (
    <>
      <div className="bg-white  rounded-lg shadow-sm border border-gray-200 p-6">
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
                <div className="space-y-3 max-h-[300px] overflow-y-auto ">
          {upcomingEvents && upcomingEvents.map((event:any) => (
            <div key={event._id} className={`border-l-4 pl-4 py-3 border-green-200 bg-green-50 text-green-700`}>
              <h4 className="font-medium text-green-700">{event.eventTitle}</h4>
              <div className="flex items-center text-sm  mt-1 text-red-400 font-normal">
                <Clock className="w-4 h-4 mr-1 " />
                {dayjs(event.date).format("MMMM DD, YYYY")} &nbsp; <span className=''>{event.time}</span>
              </div>
              <span className={`inline-block  py-1 rounded text-sm font-semibold mt-2 border-green-200 bg-green-50 text-green-700`}>
                {getEventLabel(event.eventType)}
              </span>
            </div>
          ))}
        </div>

        {/* <div className="space-y-3">
          {events.map((event:any) => (
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
        </div> */}
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