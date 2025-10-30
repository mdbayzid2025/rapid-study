'use client';
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { io } from "socket.io-client";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { useGetNotificationQuery } from "@/store/api/eventApi";


// Connect to the Socket.io server
const socket = io("http://localhost:5000");

const NotificationComponent = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const {data, isLoading} = useGetNotificationQuery(undefined);

  const toggleRead = (id: number) => {
    setNotifications((prev : any) =>
      prev.map((n :any) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  // useEffect(() => {
  //   socket.on("newNotification", (notification) => {
  //     alert(notification.message);
  //   });

  //   return () => {
  //     socket.off("newNotification");
  //   };
  // }, []);

  console.log("data", data);
  
  return  <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Notifications</h1>

      {notifications.map((notification) => (
        <Card
          key={notification.id}
          className={`border ${
            notification.read ? "bg-gray-50" : "bg-white shadow-md"
          }`}
        >
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">{notification.title}</CardTitle>
            <Badge variant={notification.read ? "secondary" : "default"}>
              {notification.read ? "Read" : "Unread"}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-gray-700">
              <ReactMarkdown>
                {notification.message}
              </ReactMarkdown>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => toggleRead(notification.id)}
            >
              Mark as {notification.read ? "Unread" : "Read"}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>;
};

export default NotificationComponent;


const initialNotifications = [
  {
    id: 1,
    title: "New Event Added",
    message:
      'New event "Midterm Exam - Data Structures" has been scheduled on **25 August, 2025** at **09:00 AM**.',
    read: false,
  },
  {
    id: 2,
    title: "New Assignment Added",
    message:
      'New assignment "Graph Implementation" has been created. Deadline: **12 April, 2025**',
    read: true,
  },
  {
    id: 3,
    title: "New Notice Published",
    message: 'Notice: "Holiday for Eid-ul-Adha" has been published.',
    read: false,
  },
];

