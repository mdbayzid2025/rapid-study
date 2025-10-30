"use client";
import {
  useCreateEventMutation,
  useGetEventsQuery,
} from "@/store/api/eventApi";
import React from "react";
import { PageLoader } from "../../shared/Loader/PageLoader";
import dayjs from "dayjs";
import Container from "../../shared/Container/Container";
import AddEventForm from "../WebsitePage/ClassManage/AddEventForm";
import { Button } from "antd";

const Events = () => {

  // @ts-ignore
  const { data: eventsData, isLoading, isError } = useGetEventsQuery({});
  const [showAddEventForm, setShowAddEventForm] = React.useState(false);
  const [createEvent, { isLoading: addingEvents }] = useCreateEventMutation();

  if (isError) {
    return (
      <div className="flex justify-center items-center w-full min-h-[50vh] text-red-500">
        <p>Error fetching events. Please try again.</p>
      </div>
    );
  }
  const handleAddEvent = async (newEvent: Event) => {
    try {
      const res = createEvent(newEvent);
      console.log("res", res);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <Container>
      <div>
        <div className="bg-white rounded-xl border border-gray-100 mt-8 relative">
          {/* Header */}
          <div className="p-6 border-b-2 border-gray-100 sticky -top-2 bg-white">
            <div className="flex items-center justify-between">
              <h2 className="text-[14px] font-semibold text-gray-900">
                Upcoming Events {eventsData?.length}
              </h2>
              <Button onClick={()=>setShowAddEventForm(true)} type="primary">Add Event</Button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <PageLoader />
        ) : eventsData?.length === 0 ? (
          <div className="flex justify-center items-center w-full min-h-[50vh] text-gray-500">
            <p>No events available. Stay tuned for upcoming events!</p>
          </div>
        ) : (
          eventsData?.map((event: any) => (
            <div
              key={event?._id}
              className="flex items-start space-x-4 p-4 mb-3 border-l-4 border-blue-500 bg-blue-50 rounded-lg"
            >
              <div className="flex-1">
                <h3 className="font-bold text-sm text-gray-900">
                  {event?.eventTitle}
                </h3>
                {event?.location && (
                  <p className="text-[12px] text-gray-700 font-medium">
                    Location: {event?.location}
                  </p>
                )}
                <p className="text-[12px] text-blue-700 font-medium">
                  Date: {dayjs(event?.date).format("DD/MM/YY")} | Time:{" "}
                  {event?.time}
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                  {event?.subject?.name}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
      <AddEventForm
        isOpen={showAddEventForm}
        onClose={() => setShowAddEventForm(false)}
        onSubmit={handleAddEvent}
      />
    </Container>
  );
};

export default Events;
