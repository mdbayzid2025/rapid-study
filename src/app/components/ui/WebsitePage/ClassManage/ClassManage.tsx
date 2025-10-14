"use client";

import { classNotesData, todoItems } from "@/app/data/mockData";
import { useGetSubjectQuery } from "@/store/api/subjectApi";
import Assignment from "./Assignment";
import ClassAllNotes from "./ClassAllNotes";
import ClassInfo from "./ClassInfo";
import ClassNotifications from "./ClassNotifications";
import TodoList from "./TodoList";
import UpcomingEvents from "./UpcomingEvents";
import { useParams } from "next/navigation";

const ClassManage = () => {
  const {id} = useParams();
  const {data:subjectData, isLoading} = useGetSubjectQuery(id as string);

  console.log("subjectData", subjectData);
  
  return (
    <div>
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto p-6">
          {/* @ts-ignore */}
          <ClassInfo data={subjectData} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2 space-y-6 h-full">
              
              {/* <Assignment assignments={subjectData?.assignments} /> */}
              <Assignment assignments={subjectData?.assignments} />
            </div>

            <div className="space-y-6">
              <UpcomingEvents upcomingEvents={subjectData?.events} />
              <TodoList todos={subjectData?.todos} items={todoItems}/>
              {/* <ClassNotifications /> */}
            </div>
          </div>
          <ClassAllNotes notes={subjectData?.notes} />
        </div>
      </div>
    </div>
  );
};

export default ClassManage;




