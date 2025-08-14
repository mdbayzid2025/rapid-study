"use client";

import { useState } from "react";
import ClassManage from "../ClassManage/ClassManage";
import { Dashboard } from "../Dashboard";
import Dashboard2 from "../../Dashboard2/Dashboard2";
import Container from "@/app/components/shared/Container/Container";
import TeacherManage from "../TeacherManage/TeacherManage";

export default function HomeMain() {
  const [active, setActive] = useState(false);

  return (
    <div>
      {/* <ClassManage /> */}
      {/* <Dashboard /> */}
      <Container>
      {/* <Dashboard2 /> */}
      <TeacherManage />
      </Container>
    </div>
  );
}
