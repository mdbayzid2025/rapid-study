import Sidebar from "@/app/components/shared/Sidebar/Sidebar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-5 ">
      <nav className=" ">
        <Sidebar /> {/* Sidebar should be rendered here */}
      </nav>
      <main className="flex-1 overflow-y-scroll">{children}</main> {/* Main content will be injected here */}
    </div>
  );
};

export default Layout;
