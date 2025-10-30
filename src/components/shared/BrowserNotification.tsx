"use client";

import React, { useEffect } from "react";
import { useGetProfileQuery } from "@/store/api/userApi";
import { connectSocket } from "@/utils/socketConnect";

export const BrowserNotification = () => {
  const { data: profileData } = useGetProfileQuery(undefined);
  const userId = profileData?.data?._id;
  const socket = userId ? connectSocket(userId) : null;

  // 🔔 Request permission once
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  // 📡 Listen to socket events and show browser notification
  useEffect(() => {
    if (!socket || !userId || typeof window === "undefined") return;

    const event = `get-notification::${userId}`;

    socket.on(event, (data: any) => {
      if (Notification.permission === "granted") {
        const title = data?.title || "New Notification";
        const body = data?.message || "You’ve received an update";
        const icon = data?.icon || "/logo.png";

        const notification = new Notification(title, { body, icon });

        // Focus the tab when clicked
        notification.onclick = (e) => {
          e.preventDefault();
          window.focus();
          notification.close();
        };
      } else if (Notification.permission === "default") {
        Notification.requestPermission();
      }
    });

    return () => {
      socket.off(event);
    };
  }, [socket, userId]);

  return null; // no UI needed
};
