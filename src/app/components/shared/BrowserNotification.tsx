"use client";
import { useGetProfileQuery } from "@/store/api/userApi";
import { connectSocket } from "@/utils/socketConnect";
import React, { useState, useEffect } from "react";

// @ts-ignore
import Notification from "react-web-notification";

export const BrowserNotification = () => {
  const [ignore, setIgnore] = useState(true);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [icon, setIcon] = useState("/logo.png");

  const { data: profileData } = useGetProfileQuery(undefined);
  
  const userId = profileData?.data?._id;
     const socket = userId ? connectSocket(userId) : null;


  const handlePermissionGranted = () => setIgnore(false);
  const handlePermissionDenied = () => setIgnore(true);
  const handleNotSupported = () => {
    alert("Your browser does not support notifications.");
    setIgnore(true);
  };
  const handleClick = (e: any) => {
    window.focus();
    e.target.close();
  };

  
    // @ts-ignore
    useEffect(() => {
      if (!socket || !userId) return;
  
      const event = `get-notification::${userId}`;
      socket.on(event, (data) => {
        setTitle(data?.title || "New Notification");
      setBody(data?.message || "You’ve received an update");
      setIcon(data?.icon || "/logo.png");
      });
  
      return () => socket.off(event);
    }, [socket, userId]);


  return (
    <Notification
      ignore={ignore}
      notSupported={handleNotSupported}
      onPermissionGranted={handlePermissionGranted}
      onPermissionDenied={handlePermissionDenied}
      onClick={handleClick}
      title={title}
      options={{
        body,
        icon,
        lang: "en",
        dir: "ltr",
      }}
    />
  );
};
