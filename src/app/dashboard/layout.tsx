import React from "react";
import Navbar from "../components/shared/Navbar/Navbar";
import Sidebar from "../components/shared/Sidebar/Sidebar";
import LandingFooter from "../components/ui/Landing/LandingFooter";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <nav>
        <Navbar />
      </nav>
      <div className="flex items-start  !h-screen overflow-hidden">
        <Sidebar />
      <div className="flex-1 h-screen overflow-y-auto px-5">
        {children}
        </div>
      </div>
      <LandingFooter />
    </section>
  );
}
