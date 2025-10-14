"use client";

import { useGetNotificationQuery } from "@/store/api/eventApi";
import { Bell, User, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Notification } from "../Notification/Notification";
import { FiMenu } from "react-icons/fi";
import { Dropdown, Menu } from "antd";
import Container from "../Container/Container";

// Connect to the Socket.io server
const socket = io("http://localhost:5000"); // Use your backend URL
socket.on("connect", () => {
  console.log(`you are connect with socket ${socket?.id}`);
});

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { data: notificationData } = useGetNotificationQuery(undefined);
const [isMenuOpen, setIsMenuOpen] = useState(false);


  const unRead = notificationData?.filter(
    (notification: any) => notification?.read === false
  );

  // useEffect(() => {
  //   const socket = io(); // Connects to the server on the same domain by default

  //   socket.on("connect", () => {
  //     console.log("Connected to the server!");
  //   });

  //   socket.on("disconnect", () => {
  //     console.log("Disconnected from the server");
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);
  
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

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
    <div className="bg-white shadow-sm border-b border-gray-200 fixed top-0 z-50 w-full">
      <Container>
        <div className="">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center gap-3 mr-2">
                <Link href="/">
                  <img
                    src="/Prime_University.png"
                    alt="logo"
                    className="w-8 h-10 object-cover overflow-visible"
                  />
                </Link>
                <span className="text-xl font-bold text-gray-900">
                  ClassHub
                </span>
              </div>

              <nav className="hidden md:flex items-center space-x-8">
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
                <Link
                  href="/events"
                  className="text-gray-500 hover:text-gray-700"
                >
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
                  href="/calendar"
                  className="text-gray-500 hover:text-gray-700"
                >
                  Calendar
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative cursor-pointer p-2 text-gray-400 hover:text-gray-500">
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
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden  p-2 text-gray-800 hover:text-gray-900"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <FiMenu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </Container>
      <Notification open={open} setOpen={setOpen} />
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 bg-white w-full border-t pl-4 border-gray-200 py-4">
          <nav className="flex flex-col space-y-4">
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-600 hover:text-gray-900 font-medium text-left transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/auth"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 w-fit"
            >
              Login
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Navbar;

  const navigationItems = [
    { label: "Teachers", href: "/teachers" },
    { label: "Classes", href: "/classes" },
    { label: "Notes", href: "/notes" },
    { label: "Events", href: "/events" },
    { label: "Assignments", href: "/assignments" },
    { label: "Calendar", href: "/calendar" },
  ];
