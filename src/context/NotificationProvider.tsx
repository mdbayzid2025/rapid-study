"use client";

import React, { createContext, useContext } from "react";
import { useNotifications } from "@/hooks/useNotifications";

const NotificationContext = createContext<any>(null);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const notification = useNotifications(); // ✅ hook is used here once globally
  return (
    <NotificationContext.Provider value={notification}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => useContext(NotificationContext);
