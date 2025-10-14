'use client';

import { useGetScheduleDataQuery } from '@/store/api/settingApi';
import dayjs from 'dayjs';
import { Calendar, FileText, Tag, X } from 'lucide-react';
import { HiOutlineSpeakerphone } from "react-icons/hi";
const ScheduleViewModal = ({
  event,
  setShowModal,
}: {
  event: any;
  setShowModal: (show: boolean) => void;
}) => {
  if (!event) return null;

  const { data, isLoading, error } = useGetScheduleDataQuery(event._id);

  if (isLoading)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/30">
        <div className="bg-white p-4 rounded-md shadow-md">Loading...</div>
      </div>
    );

  if (error)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/30">
        <div className="bg-white p-4 rounded-md shadow-md text-red-600">
          Failed to load schedule.
        </div>
      </div>
    );

  const schedule = data || {};
  const item = schedule.item || {};

  return (
    <div
      className="fixed inset-0 bg-gray-800/40 flex items-center justify-center z-50 px-3"
      onClick={() => setShowModal(false)}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-md md:max-w-lg p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="mb-4 border-b pb-3">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Tag className="text-blue-500" size={18} />
            {schedule?.title || 'Untitled Event'}
          </h2>
          {/* <p className="text-sm text-gray-500 mt-1 capitalize">
            Type: {schedule?.type}
          </p> */}
        </div>

        {/* Event Details */}
        <div className="space-y-3">
          <div className="bg-primary py-1.5 text-center text-gray-200 text-sm">
            <span>
                {item?.subject?.name}                
            </span>
          </div>

          <div className="flex items-center gap-2 text-gray-700">            
            <HiOutlineSpeakerphone size={20}/>
            <span className='font-semibold'>
               {item.title ?? item.eventTitle}
            </span>
          </div>

          <div className="flex items-center gap-2 text-gray-700">
            <Calendar className="text-green-500" size={18} />
            <span>
                {dayjs(schedule?.end).format('DD MMMM YYYY, hh:mm A')}
            </span>
          </div>

         
              <div className="flex flex-col items-start  text-gray-700">
                <span className={`font-semibold text-[${schedule?.color}]`}>Instruction :</span>
              
              <p className="text-sm leading-relaxed">
                {item.detailedInstructions ?? item.description}
              </p>
            </div>          
        </div>

        {/* Footer */}
        <div className="mt-0 flex justify-end">
          <button
            onClick={() => setShowModal(false)}
            className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleViewModal;
