"use client";

import React, { useState, useCallback } from "react";
import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useGetCalanderDataQuery } from "@/store/api/settingApi";

// JSON data for events
const eventData = [
  {
    title: "Team Meeting",
    start: new Date(2025, 8, 5, 10, 0),
    end: new Date(2025, 8, 5, 11, 0),
    allDay: false,
    color: "#f4a261",
  },
  {
    title: "Project Deadline",
    start: new Date(2025, 8, 10, 23, 59),
    end: new Date(2025, 8, 10, 23, 59),
    allDay: true,
    color: "#2a9d8f",
  },
  {
    title: "Client Call",
    start: new Date(2025, 8, 12, 15, 0),
    end: new Date(2025, 8, 12, 16, 0),
    allDay: false,
    color: "#e76f51",
  },
  {
    title: "Lunch Break",
    start: new Date(2025, 8, 15, 12, 0),
    end: new Date(2025, 8, 15, 13, 0),
    allDay: false,
    color: "#264653",
  },
];

// Main Calendar Component
const UserCalendar: React.FC = () => {
  const [events] = useState(eventData); // Use the demo JSON events
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [currentView, setCurrentView] = useState<View>(Views.MONTH);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const {data: calenderDara } = useGetCalanderDataQuery(undefined)

  console.log("calenderDara", calenderDara);
  

  // Setup localizer
  moment.locale("en-GB");
  const localizer = momentLocalizer(moment);

  // Handle event selection
  const handleSelectEvent = useCallback((event: any) => {
    setSelectedEvent(event);
    setShowModal(true); // Open modal on event selection
  }, []);

  // Handle view change
  const handleViewChange = useCallback((view: View) => {
    setCurrentView(view);
  }, []);

  // Handle navigation
  const handleNavigate = useCallback((date: Date) => {
    setCurrentDate(date);
  }, []);

  // Custom toolbar
  const CustomToolbar: React.FC<any> = ({ label, onNavigate, onView }) => {
    const navigate = (action: "PREV" | "NEXT" | "TODAY") => {
      onNavigate(action);
    };

    const viewNamesMap = {
      [Views.MONTH]: "Month",
      [Views.WEEK]: "Week",
      [Views.DAY]: "Day",
    };

    return (
      <div className="flex lg:flex-row flex-col justify-between items-center gap-3 mb-4 mt-20">
        <div className="flex items-center lg:justify-start justify-between space-x-4">
          <h2 className="lg:text-[32px] text-xl font-semibold text-gray-800 me-6">
            {label}
          </h2>
          <button
            onClick={() => navigate("PREV")}
            className=" lg:h-[46px] h-6  w-6 lg:w-[46px] lg:text-2xl text-xs bg-[#F6F7F8] rounded text-[#003877] flex items-center justify-center"
          >
            <IoIosArrowBack />
          </button>

          <button
            onClick={() => navigate("NEXT")}
            className=" lg:h-[46px] h-6  w-6 lg:w-[46px] lg:text-2xl text-xs bg-[#F6F7F8] rounded text-[#003877] flex items-center justify-center"
          >
            <IoIosArrowForward />
          </button>
          <button
            onClick={() => navigate("TODAY")}
            className="ml-4 px-3 py-1 bg-[#003877] text-white rounded hover:bg-blue-600 text-sm"
          >
            Today
          </button>
        </div>

        <div className="flex space-x-1 bg-[#F6F7F8] rounded-lg px-4 py-2 ">
          {Object.entries(viewNamesMap).map(([view, name]) => (
            <button
              key={view}
              onClick={() => onView(view)}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                currentView === view
                  ? "bg-white text-[#003877]"
                  : "bg-[#F6F7F8] text-[#C5D0D0] hover:bg-white hover:text-[#003877] border border-gray-50"
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Modal for event details
  const EventModal = ({ event }: { event: any }) => {
    if (!event) return null;

    return (
      <div
        className="fixed inset-0 bg-gray-800/20 bg-opacity-50 flex items-center justify-center z-50"
        onClick={() => setShowModal(false)}
      >
        <div
          className="bg-white p-6 rounded-lg shadow-lg w-[300px] md:w-[500px]"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-lg font-semibold">{event.title}</h3>
          <p className="mt-2">Start: {event.start.toString()}</p>
          <p className="mt-2">End: {event.end.toString()}</p>
          <p className="mt-2">All Day: {event.allDay ? "Yes" : "No"}</p>
          <p className="mt-2">Color: {event.color}</p>
          <button
            onClick={() => setShowModal(false)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-1">
      <div style={{ height: "calc(100vh - 155px)" }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          titleAccessor="title"
          allDayAccessor="allDay"
          resourceAccessor="resource"
          // Views and navigation
          views={[Views.MONTH, Views.WEEK, Views.DAY]}
          view={currentView}
          onView={handleViewChange}
          date={currentDate}
          onNavigate={handleNavigate}
          // Event handling
          onSelectEvent={handleSelectEvent}
          // Custom components
          components={{
            toolbar: CustomToolbar,
          }}
          // Styling
          eventPropGetter={(event: any) => ({
            style: {
              backgroundColor: event.color || "#3174ad",
              borderRadius: "5px",
              opacity: 0.8,
              color: "white",
              border: "0px",
              display: "block",
            },
          })}
          // Time settings
          step={60}
          timeslots={1}
          min={new Date(2025, 0, 1, 8, 0, 0)}
          max={new Date(2025, 0, 1, 18, 0, 0)}
          // Popup settings
          popup={true}
          popupOffset={30}
        />
      </div>

      {/* Event Modal */}
      {showModal && <EventModal event={selectedEvent} />}
    </div>
  );
};

export default UserCalendar;
