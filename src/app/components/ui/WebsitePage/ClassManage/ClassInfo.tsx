import React from 'react';
import { Calendar, Clock, User } from 'lucide-react';

const ClassInfo: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-xl font-bold">
          ACS
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Advanced Computer Science</h2>
              <p className="text-gray-600 flex items-center">
                <User className="w-4 h-4 mr-1" />
                Dr. Sarah Johnson
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 mb-1">Class Times</p>
              <p className="font-semibold text-gray-900">Mon, Wed, Fri</p>
              <p className="text-sm text-gray-600">10:00 AM - 11:30 AM</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 mt-3">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              CS-401
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              Fall 2024
            </span>
          </div>
          <p className="text-gray-700 mt-4 leading-relaxed">
            This course covers advanced topics in computer science including algorithms, data structures, 
            machine learning fundamentals, and software engineering principles.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClassInfo;