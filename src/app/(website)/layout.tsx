import React from "react";
import FooterLayout from "./FooterLayout";
import Navbar from "@/components/shared/Navbar/Navbar";
import LandingFooter from "@/components/UI-InterFace/Landing/LandingFooter";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className="pt-16">{children}</div>
      <div className="">
        <LandingFooter />
      </div>
    </div>
  );
};

export default layout;
