"use client";

import { Bell, BookOpen, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { io } from "socket.io-client";
import { useGetNotificationQuery } from "@/store/api/eventApi";
import { Notification } from "../Notification/Notification";

import { MenuProps } from "antd";
import { Dropdown, Space } from 'antd';

// Connect to the Socket.io server
const socket = io('http://localhost:5000'); // Use your backend URL
socket.on("connect", ()=>{
  console.log(`you are connect with socket ${socket?.id}`);  
})

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { data: notificationData } = useGetNotificationQuery(undefined);

  console.log("notificationData", notificationData);
  const unRead = notificationData?.filter(
    (notification: any) => notification?.read === false
  );

   useEffect(() => {
    const socket = io();  // Connects to the server on the same domain by default

    socket.on('connect', () => {
      console.log('Connected to the server!');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from the server');
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  const items = [
    {
      key: "1",
      label: "My Account",
      disabled: true,
    },
    {
      key: "2",
      label: <Link href="/dashboard">Dashboard</Link>,
    },
    {
      type: "divider" as const,
    },
    {
      key: "3",
      label: <Link href="/profile">Profile</Link>,
      extra: "⌘P",
    },
    {
      key: "4",
      label: "Billing",
      extra: "⌘B",
    },
  ];
  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"
            >
              <BookOpen className="w-5 h-5 text-white" />
            </Link>
            <span className="text-xl font-bold text-gray-900">ClassHub</span>
          </div>

          <nav className="flex items-center space-x-8">          
            <Link
              href="/teachers"
              className="text-gray-500 hover:text-gray-700"
            >
              Teachers
            </Link>            
            <Link
              href="/classes"
              className="text-gray-500 hover:text-gray-700"
            >
              Classes
            </Link>            
            {/* <Link
              href="/students-manage"
              className="text-gray-500 hover:text-gray-700"
            >
              Students Manage
            </Link> */}
            <Link href="/tasks-list" className="text-gray-500 hover:text-gray-700">
              Tasks
            </Link>
            <Link href="/gallery" className="text-gray-500 hover:text-gray-700">
              Gallery
            </Link>
            <Link
              href="/assignments"
              className="text-gray-500 hover:text-gray-700"
            >
              Assignments
            </Link>
            <Link
              href="/calander"
              className="text-gray-500 hover:text-gray-700"
            >
              Calander
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="notifications"
              className="relative p-2 text-gray-400 hover:text-gray-500"
            >
              <Bell onClick={() => setOpen(true)} className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {unRead?.length ?? 0}
              </span>
            </Link>
            <Dropdown menu={{ items }}>
              <button className="p-2 text-gray-400 hover:text-gray-500 cursor-pointer">
                <User className="w-7 h-7" />
              </button>
            </Dropdown>            
          </div>
        </div>
      </div>
      <Notification open={open} setOpen={setOpen} />
    </div>
  );
};

export default Navbar;
