"use client";

import { useState } from "react";
import ClassManage from "../ClassManage/ClassManage";
import { Dashboard } from "../Dashboard";

export default function HomeMain() {
  const [active, setActive] = useState(false);

  return (
    <div>
      {/* <ClassManage /> */}
      <Dashboard />
    </div>
  );
}
