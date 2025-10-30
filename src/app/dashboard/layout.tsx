import React from "react";
import Navbar from "../../components/shared/Navbar/Navbar";
import Sidebar from "../../components/shared/Sidebar/Sidebar";
import LandingFooter from "../../components/UI-InterFace/Landing/LandingFooter";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <nav>
        <Navbar />
      </nav>
      <div className="mt-16">
      <div className="flex items-start  !h-[calc-(100vh-64px)] overflow-hidden">
        <Sidebar />
      <div className="flex-1 h-[calc-(100vh-64px)] md:mt-0 mt-4 overflow-y-auto px-5">
        {children}
        </div>
        </div>
      </div>
      <LandingFooter />
    </section>
  );
}
