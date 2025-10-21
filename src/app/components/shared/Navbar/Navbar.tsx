"use client";

import { useEffect, useState } from "react";
import { Bell, User, X } from "lucide-react";
import { Dropdown } from "antd";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import Container from "../Container/Container";
import { connectSocket } from "@/utils/socketConnect";
import { useGetProfileQuery } from "@/store/api/userApi";
import { getBaseUrl } from "@/utils/baseUrl";
import { Notification } from "../Notification/Notification";
import Cookie from "js-cookie";


const PAGE_SIZE = 10;

const getNotifications = async(pageNum = 1, PAGE_SIZE = 10) =>{
const token = Cookie?.get("accessToken");

const res = await fetch(
  `${getBaseUrl()}/notifications?page=${pageNum}&limit=${PAGE_SIZE}`,
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // ✅ attach token here
    },
  }
);

return await res.json();
}

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const { data: profileData } = useGetProfileQuery(undefined);

  const [totalNotification, setTotalNotifications] = useState(0);
  const userId = profileData?.data?._id;
  const socket = userId ? connectSocket(userId) : null;

  // ✅ Load more notifications
  const loadMoreNotifications = async (pageNum: number) => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const newData = await getNotifications(page, PAGE_SIZE)

      setTotalNotifications(newData?.pagination?.total)

      if (!newData?.data?.length) {
        setHasMore(false);
      } else {
        setNotifications((prev) => [...prev, ...newData?.data]);
        setPage((prev) => prev + 1);
      }
    } catch (err) {
      console.error("Error loading notifications:", err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Re-fetch on drawer open
  useEffect(() => {
    if (open) {
      setNotifications([]);
      setPage(1);
      setHasMore(true);
      loadMoreNotifications(1);
    }
  }, [open]);

  // ✅ Real-time update via socket
  // @ts-ignore
  useEffect(() => {
    if (!socket || !userId) return;

    const event = `get-notification::${userId}`;
    socket.on(event, () => {
      setNotifications([]);
      setPage(1);
      setHasMore(true);
      loadMoreNotifications(1);
    });

    return () => socket.off(event);
  }, [socket, userId]);

// useEffect(() => {
//   const fetchNotifications = async () => {
//     try {
//       const response = await getNotifications();
//       console.log("Notifications:", response);
//     } catch (error) {
//       console.error("Failed to load notifications:", error);
//     }
//   };

//   fetchNotifications();
// }, [userId]);

  const items = [
    { key: "1", label: "My Account", disabled: true },
    { key: "2", label: <Link href="/dashboard">Dashboard</Link> },
    { type: "divider" as const },
    { key: "3", label: <Link href="/dashboard/profile">Profile</Link> },
    { key: "4", label: "Billing" },
  ];

  const hadnleReadAll = () => {
    localStorage.setItem('readNotification', totalNotification.toString())
  }



  return (
    <div className="bg-white shadow-sm border-b border-gray-200 fixed top-0 z-50 w-full">
      <Container>
        <div className="flex justify-between items-center h-16">
          {/* Logo + Nav */}
          <div className="flex items-center gap-3">
            <Link href="/">
              <img src="/Prime_University.png" alt="logo" className="w-8 h-10" />
            </Link>
            <span className="text-xl font-bold text-gray-900">ClassHub</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8"> <Link href="/teachers" className="text-gray-500 hover:text-gray-700" > Teachers </Link> <Link href="/classes" className="text-gray-500 hover:text-gray-700" > Classes </Link> <Link href="/notes" className="text-gray-500 hover:text-gray-700" > Notes </Link> {/* <Link href="/students-manage" className="text-gray-500 hover:text-gray-700" > Students Manage </Link> */} <Link href="/events" className="text-gray-500 hover:text-gray-700" > Events </Link> {/* <Link href="/gallery" className="text-gray-500 hover:text-gray-700"> Gallery </Link> */} <Link href="/assignments" className="text-gray-500 hover:text-gray-700" > Assignments </Link> <Link href="/calendar" className="text-gray-500 hover:text-gray-700" > Calendar </Link> <Link href="/notice" className="text-gray-500 hover:text-gray-700" > Notice </Link> </nav>
          <div className="flex items-center gap-3">
            {/* Notification Button */}
            <button className="relative cursor-pointer p-2 text-gray-400 hover:text-gray-500">
              <Bell onClick={() => setOpen(true)} className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {localStorage?.getItem('readNotification') ? (Number(localStorage?.getItem('readNotification')) - totalNotification) : 0}
              </span>
            </button>

            <Dropdown menu={{ items }}>
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <User className="w-7 h-7" />
              </button>
            </Dropdown>

            <button className="md:hidden p-2 text-gray-800 hover:text-gray-900">
              <FiMenu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </Container>

      {/* ✅ Pass notification props */}
      <Notification
        open={open}
        setOpen={setOpen}
        notifications={notifications}
        hasMore={hasMore}
        loadMore={loadMoreNotifications}
        page={page}
        loading={loading}
        hadnleReadAll={hadnleReadAll}
      />
    </div>
  );
};

export default Navbar;
