"use client";

import { useState } from "react";
import ClassManage from "../ClassManage/ClassManage";
import { Dashboard } from "../Dashboard";
import Dashboard2 from "../../Dashboard/Dashboard";
import Container from "@/app/components/shared/Container/Container";
import TeacherManage from "../TeacherManage/TeacherManage";
import Notes from "../Notes/Notes";
import LandingPage from "../../Landing/LandingPage";


export default function HomeMain() {
  const [active, setActive] = useState(false);

  return (
    <div>
      {/* <ClassManage /> */}
      {/* <Dashboard /> */}
      {/* <Container> */}
      {/* <Dashboard2 /> */}
      {/* <TeacherManage /> */}
      {/* <Notes /> */}
      {/* </Container> */}
      <LandingPage />
    </div>
  );
}
