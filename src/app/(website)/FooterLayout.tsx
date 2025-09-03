"use client";
import React from "react";
import Navbar from "../components/shared/Navbar/Navbar";
import { ConfigProvider } from "antd";
import { usePathname } from "next/navigation";
import LandingFooter from "../components/ui/Landing/LandingFooter";

const FooterLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col">
      <div className="h-full">
        <Navbar />

        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#0f67b1",
            },
          }}
        >
          {children}
        </ConfigProvider>
      </div>
      {pathname === "/" ? "" : <LandingFooter />}
    </div>
  );
};

export default FooterLayout;

/*

https://propertydevelopmentltd.com/
https://nde.com.bd/

primary color: #0f67b1
Secondary color: #03457c
blue: #3197d6
black #333333

*/
