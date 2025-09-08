"use client";

import { useGetNotificationQuery } from "@/store/api/eventApi";
import { Bell, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Notification } from "../Notification/Notification";

import { Dropdown } from 'antd';
import Container from "../Container/Container";

// Connect to the Socket.io server
const socket = io('http://localhost:5000'); // Use your backend URL
socket.on("connect", ()=>{
  console.log(`you are connect with socket ${socket?.id}`);  
})

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { data: notificationData } = useGetNotificationQuery(undefined);
  
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
      label: <Link href="/dashboard/profile">Profile</Link>,
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
      <Container>
      <div className="">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <Link
              href="/"              
            >
              <img src="/Prime_University.png" alt="logo" className="w-8 h-10 object-cover overflow-visible" />
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
            <Link
              href="/notes"
              className="text-gray-500 hover:text-gray-700"
            >
              Notes
            </Link>            
            {/* <Link
              href="/students-manage"
              className="text-gray-500 hover:text-gray-700"
            >
              Students Manage
            </Link> */}
            <Link href="/events" className="text-gray-500 hover:text-gray-700">
              Events
            </Link>
            {/* <Link href="/gallery" className="text-gray-500 hover:text-gray-700">
              Gallery
            </Link> */}
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
            <button              
              className="relative cursor-pointer p-2 text-gray-400 hover:text-gray-500"
            >
              <Bell onClick={() => setOpen(true)} className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {unRead?.length ?? 0}
              </span>
            </button>
            <Dropdown menu={{ items }}>
              <button className="p-2 text-gray-400 hover:text-gray-500 cursor-pointer">
                <User className="w-7 h-7" />
              </button>
            </Dropdown>            
          </div>
        </div>
      </div>
      </Container>
      <Notification open={open} setOpen={setOpen} />
    </div>
  );
};

export default Navbar;
