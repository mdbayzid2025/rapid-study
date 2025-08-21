"use client";

import React from "react";
import ClassInfo from "./ClassInfo";
import Container from "@/app/components/shared/Container/Container";
import { assignments, classNotesData, todoItems, upcomingEventsData } from "@/app/data/mockData";
import Assignment from "./Assignment";
import ClassAllNotes from "./ClassAllNotes";
import UpcomingEvents from "./UpcomingEvents";
import TodoList from "./TodoList";
import ClassNotifications from "./ClassNotifications";
import { useGetSubjectQuery } from "@/store/api/subjectApi";

const ClassManage = () => {
  const {data:subjectData, isLoading} = useGetSubjectQuery(undefined);

  console.log("subjectData", subjectData);
  
  return (
    <div>
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto p-6">
          <ClassInfo />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <ClassAllNotes notes={classNotesData} />
              {/* <Assignment assignments={subjectData?.assignments} /> */}
              <Assignment assignments={subjectData?.assignments} />
            </div>

            <div className="space-y-6">
              <UpcomingEvents upcomingEvents={subjectData?.events} events={upcomingEventsData} />
              <TodoList todos={subjectData?.todos} items={todoItems}/>
              <ClassNotifications />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassManage;




