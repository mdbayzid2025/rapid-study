import React, { use } from 'react';
import { Calendar, Clock, User } from 'lucide-react';
import { PiChalkboardTeacherThin } from "react-icons/pi";
import { useParams } from 'next/navigation';


const ClassInfo: React.FC = ({data}:any) => {
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 md:p-6 mb-3 md:mb-6">
      <div className="flex items-start space-x-1 md:space-x-4">
        <div className="shrink-0 w-12 md:w-16 h-12 md:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-sm md:text-xl font-bold">
          ACS
        </div>
        <div className="flex-1">
          <div className="flex flex-col items-start md:flex-row justify-between">
            <div>
              <h2 className="text-2xl font-bold text-purple-900 mb-1">{data?.name}</h2>
              <p className="text-gray-600 flex items-center mb-1">
                <User className="w-6 h-6 mr-1" />
                <span className='text-md font-semibold'>{data?.teacher?.name}</span>
              </p>
              <p className="text-gray-600 flex items-center gap-2"> 
                <PiChalkboardTeacherThin className="w-4 h-4 mr-1" />
                <span>{data?.teacher?.designation}</span>              
                <span>({data?.teacher?.department})</span>
              </p>
            </div>
            <div className="text-center flex md:flex-col items-center gap-2">
              <p className="text-xs md:text-[12px] md:mb-2 w-full bg-purple-200  text-gray-700 font-semibold  rounded-md md:rounded-none px-1 md:px-3 py-1 md:py-2 whitespace-nowrap">{data?.semester?.title}</p>                
               <span className="px-2 md:px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs md:text-sm font-medium whitespace-nowrap">
              Course Code: <span className="font-semibold text-orange-600">{data?.subjectCode}</span>
            </span> 
            </div>
          </div>
          
          {/* <p className=" text-gray-700 mt-4 leading-relaxed">
            This course covers advanced topics in computer science including algorithms, data structures, 
            machine learning fundamentals, and software engineering principles.
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default ClassInfo;