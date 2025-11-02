"use client";
import { useEffect, useState } from "react";
import { getBaseUrl } from "@/utils/baseUrl";
// import { connectSocket } from "@/utils/socketConnect";
import { useGetProfileQuery } from "@/store/api/userApi";

const PAGE_SIZE = 10;

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const { data: profileData } = useGetProfileQuery(undefined);
  const userId = profileData?.data?._id;

  // const socket = userId ? connectSocket(userId) : null;

  const fetchNotifications = async (pageNum = 1, reset = false) => {
    if (loading || (!hasMore && !reset)) return;
    setLoading(true);

    try {
      const response = await fetch(
        `${getBaseUrl()}/notifications?page=${pageNum}&limit=${PAGE_SIZE}`
      );
      const result = await response.json();

      const newData = result?.data ?? [];

      if (reset) {
        setNotifications(newData);
        setPage(2);
        setHasMore(result?.pagination?.totalPage > 1);
      } else if (newData.length > 0) {
        setNotifications((prev) => [...prev, ...newData]);
        setPage((prev) => prev + 1);
        setHasMore(result?.pagination?.totalPage >= pageNum + 1);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error fetching notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  const markAllAsRead = async () => {
    try {
      await fetch(`${getBaseUrl()}/notifications/${userId}/read-all`, { method: "PATCH" });
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, isRead: true }))
      );
    } catch (err) {
      console.error("Error marking all as read:", err);
    }
  };

  // 🔁 Socket listener for real-time updates 
  // @ts-ignore
  // useEffect(() => {
  //   if (!socket || !userId) return;

  //   const event = `get-notification::${userId}`;
  //   socket.on(event, () => fetchNotifications(1, true));

  //   return () => socket.off(event);
  // }, [socket, userId]);

  const unReadCount = notifications?.filter((n) => !n.isRead).length;

  console.log('isRead', notifications)
  return {
    notifications,
    fetchNotifications,
    markAllAsRead,
    hasMore,
    loading,
    page,
    unReadCount,
  };
};
