"use client";

import { classNotesData, todoItems } from "@/app/data/mockData";
import { useGetSubjectQuery } from "@/store/api/subjectApi";
import Assignment from "./Assignment";
import ClassAllNotes from "./ClassAllNotes";
import ClassInfo from "./ClassInfo";
import ClassNotifications from "./ClassNotifications";
import TodoList from "./TodoList";
import UpcomingEvents from "./UpcomingEvents";

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
              <UpcomingEvents upcomingEvents={subjectData?.events} />
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




