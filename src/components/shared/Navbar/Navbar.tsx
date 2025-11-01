"use client";

import { useGetProfileQuery } from "@/store/api/userApi";
import { connectSocket } from "@/utils/socketConnect";
import { Button, Dropdown } from "antd";
import Cookie from "js-cookie";
import { Bell, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import Container from "../Container/Container";
import { NotificationCom } from "../NotificationCom/NotificationCom";
import { BrowserNotification } from "../BrowserNotification";
import { MobileMenu } from "./MobileMenu"; // ✅ new import

const Navbar = () => {
  const [open, setOpen] = useState(false); // for notifications
  const [mobileOpen, setMobileOpen] = useState(false); // ✅ for mobile menu
  const { data: profileData, refetch } = useGetProfileQuery(undefined);

  const userId = profileData?.data?._id;
  // const socket = userId ? connectSocket(userId) : null;
  const route = useRouter();

  // @ts-ignore
  // useEffect(() => {
  //   if (!socket?.connected || !userId) return;
  //   const event = `get-notification::${userId}`;
  //   socket.on(event, () => refetch());
  //   return () => socket.off(event);
  // }, [socket?.connected, userId]);

  // --- Logout ----
  const handleLogOut = () => {
    Cookie.remove("accessToken");
    route.push("/login");
    setTimeout(() => window?.location?.reload(), 300);
  };

  const items = [
    { key: "1", label: <p className="font-semibold">{profileData?.data?.name ?? "My Account"}</p> },
    { key: "2", label: <Link href="/dashboard">Dashboard</Link> },
    { type: "divider" as const },
    { key: "3", label: <Link href="/dashboard/profile">Profile</Link> },
    { key: "4", label: <Button size="middle" style={{ width: "100%" }} onClick={handleLogOut}>Logout</Button> },
  ];

  const hadnleReadAll = () => {};

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 fixed top-0 z-50 w-full">
      <Container>
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href="/">
              <img src="/Prime_University.png" alt="logo" className="w-8 h-10" />
            </Link>
            <span className="text-xl font-bold text-gray-900">ClassHub</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/teachers" className="text-gray-500 hover:text-gray-700">Teachers</Link>
            <Link href="/classes" className="text-gray-500 hover:text-gray-700">Classes</Link>
            <Link href="/notes" className="text-gray-500 hover:text-gray-700">Notes</Link>
            <Link href="/events" className="text-gray-500 hover:text-gray-700">Events</Link>
            <Link href="/assignments" className="text-gray-500 hover:text-gray-700">Assignments</Link>
            <Link href="/calendar" className="text-gray-500 hover:text-gray-700">Calendar</Link>
            <Link href="/notice" className="text-gray-500 hover:text-gray-700">Notice</Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Notification */}
            <button
              className="relative border border-1.5 rounded-full cursor-pointer p-2 text-gray-400 hover:text-gray-500"
              onClick={() => setOpen(true)}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {profileData?.data?.unReadMsg ?? 0}
              </span>
            </button>

            {/* User Dropdown */}
            <Dropdown menu={{ items }}>
              <button className="p-2 text-gray-400 hover:text-gray-500 cursor-pointer">
                <User className="w-7 h-7" />
              </button>
            </Dropdown>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 text-gray-800 hover:text-gray-900"
            >
              <FiMenu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </Container>

      {/* Components */}
      <NotificationCom open={open} setOpen={setOpen} hadnleReadAll={hadnleReadAll} />
      <BrowserNotification />
      <MobileMenu open={mobileOpen} setOpen={setMobileOpen} /> {/* ✅ New */}
    </div>
  );
};

export default Navbar;
