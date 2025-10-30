"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useGetNotificationQuery } from "@/store/api/eventApi";
import { Bell, FileText, Megaphone } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { io } from "socket.io-client";

// Connect to the Socket.io server
const socket = io("http://localhost:5000");

type Notification = {
  id: number;
  title: string;
  message: string;
  read: boolean;
  type: "event" | "assignment" | "notice";
};

const Notification = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 15;

  const { data: notificationData } = useGetNotificationQuery({});

  //   useEffect(() => {
  //     socket.on("newNotification", (notification) => {
  //       alert(notification.message);
  //     });
  //     return () => {
  //       socket.off("newNotification");
  //     };
  //   }, []);

  console.log("currentNotifications", notificationData);

  const totalPages = Math.ceil(notificationData?.length / perPage);
  const start = (currentPage - 1) * perPage;
  const currentNotifications = notificationData?.slice(start, start + perPage);

  const getCardColors = (type: Notification["type"], read: boolean) => {
    if (read) return "bg-gray-100";
    switch (type) {
      case "event":
        return "bg-gradient-to-r from-blue-100 to-indigo-200";
      case "assignment":
        return "bg-gradient-to-r from-green-100 to-emerald-200";
      case "notice":
        return "bg-gradient-to-r from-yellow-100 to-orange-200";
      default:
        return "bg-white";
    }
  };

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "event":
        return <Bell className="w-5 h-5 text-indigo-600" />;
      case "assignment":
        return <FileText className="w-5 h-5 text-green-600" />;
      case "notice":
        return <Megaphone className="w-5 h-5 text-orange-600" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold flex items-center gap-2">
          <Bell className="text-indigo-500" /> Notifications
        </h1>
        <Button size="sm">Read All</Button>
      </div>

      {notificationData &&
        notificationData?.map((notification: any) => (
          <Card
            key={notification?._id}
            className={`border p-2.5 px-0 gap-3 my-3 rounded-xl shadow-md transition ${getCardColors(
              notification?.type,
              notification?.read
            )}`}
          >
            <div className="flex items-center gap-2 md:gap-3 md:pl-5 pl-2">
              <div
                className="w-9 h-9 flex items-center justify-center rounded-full border shadow-sm 
      bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shrink-0"
              >
                <Bell className="w-5 h-5 text-white" />
              </div>
              <div className="">
                <CardHeader className="flex flex-row px-0 items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getIcon(notification?.type)}
                    <CardTitle className="text-start text-md">
                      {notification?.title}
                    </CardTitle>
                  </div>
                </CardHeader>

                <CardContent className="p-0 pt-2">
                  <div className="text-gray-700 text-[12px]  pr-3 md:text-sm">
                    <ReactMarkdown>{notification?.message}</ReactMarkdown>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={currentPage === i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default Notification;
