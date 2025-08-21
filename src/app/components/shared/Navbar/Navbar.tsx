import { Bell, BookOpen, User } from "lucide-react";
import React from "react";
import Link from "next/link";
import { io } from 'socket.io-client';
import { useGetNotificationQuery } from "@/store/api/eventApi";


// Connect to the Socket.io server
// const socket = io('http://localhost:5000'); // Use your backend URL

const Navbar = () => {

  const { data: notificationData } = useGetNotificationQuery(undefined);

  console.log("notificationData", notificationData);
  const unRead = notificationData?.filter((notification: any)=> notification?.read === false);

  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </Link>
            <span className="text-xl font-bold text-gray-900">ClassHub</span>
          </div>

          <nav className="flex items-center space-x-8">
            <Link href="/" className="text-blue-600 font-medium">
              Dashboard
            </Link>
            <Link href="/profile" className="text-gray-500 hover:text-gray-700">
              Profile
            </Link>
            <Link href="/teachers" className="text-gray-500 hover:text-gray-700">
              Teachers
            </Link>
            <Link href="/dashboard" className="text-gray-500 hover:text-gray-700">
              Dashboard
            </Link>
            <Link href="/students-manage" className="text-gray-500 hover:text-gray-700">
              Students Manage
            </Link>
            <Link href="/tasks" className="text-gray-500 hover:text-gray-700">
              Tasks
            </Link>
            <Link href="/assignments" className="text-gray-500 hover:text-gray-700">
              Assignments
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="notifications" className="relative p-2 text-gray-400 hover:text-gray-500">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {unRead?.length ?? 0}
              </span>
            </Link>
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <User className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
