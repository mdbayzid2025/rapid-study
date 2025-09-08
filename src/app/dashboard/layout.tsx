import React from "react";
import Navbar from "../components/shared/Navbar/Navbar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <nav>
        <Navbar />
      </nav>
      <div>{children}</div>
    </section>
  );
}
