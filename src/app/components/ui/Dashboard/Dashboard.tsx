"use client";
import React, { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Edit,
  FileText,
  Plus,
  Trash
} from "lucide-react";
import { AiTwotoneNotification } from "react-icons/ai";

import { Button } from "@/components/ui/button";

// import { Button } from "antd";
import {
  useCreateEventMutation,
  useGetEventsQuery,
  useGetStatsQuery,
} from "@/store/api/eventApi";

import { useGetAssignmentsQuery } from "@/store/api/assignmentApi";
import { useGetNotesQuery } from "@/store/api/noteApi";
import { useGetTasksQuery } from "@/store/api/taskApi";
import { getBaseUrl } from "@/urils/baseUrl";
import Link from "next/link";
import { io } from "socket.io-client";
import { NoteCard } from "../../shared/Notes/NoteCard";
import AddAssignmentForm from "../WebsitePage/ClassManage/AddAssignmentForm";
import AddEventForm from "../WebsitePage/ClassManage/AddEventForm";
import AddNoteModal from "../WebsitePage/Notes/AddNoteModal";
import { RecentTask } from "./RecentTask";

// import { mockTasks, mockAssignments, mockNotes, mockNotices } from '../data/mockData';

const Dashboard: React.FC = () => {
  const { data: statsData, refetch } = useGetStatsQuery(undefined);
  const { data: tasksData } = useGetTasksQuery(undefined);
  const { data: notesData, isLoading } = useGetNotesQuery(null);
  const { data: assignmentData } = useGetAssignmentsQuery(undefined);
  const { data: eventsData } = useGetEventsQuery(undefined);
  const [createEvent, { isLoading: addingEvents }] = useCreateEventMutation();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [showAddEventForm, setShowAddEventForm] = React.useState(false);
  const [showAddForm, setShowAddForm] = React.useState(false);
  // ------ Add events ------------


const socket = io(getBaseUrl());

socket.on("connect", () => {
  console.log("Connected with socket ID:", socket.id);
});

  const handleAddEvent = async (newEvent: Event) => {
    try {
      const res = createEvent(newEvent);
      console.log("res", res);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="flex-1 pt-6">
      <main className="">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* {stats.map((stat, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                                </div>
                                <div className={`p-3 rounded-lg ${stat.color}`}>
                                    <span className="text-2xl">{stat.icon}</span>
                                </div>
                            </div>
                        </div>
                    ))} */}

          {statsData &&
            statsData?.map((stat: any, index: any) => (
              <div
                key={index}
                className={`p-4 rounded-lg shadow-md ${stat.color}`}
              >
                <div className="text-3xl mb-2">{stat?.icon}</div>
                <div className="text-sm font-medium">{stat?.label}</div>
                <div className="text-xl font-bold">{stat?.value}</div>
              </div>
            ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Add Note */}
            <button
              onClick={() => setIsAddDialogOpen(true)}
              className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-colors bg-blue-50 text-blue-600 hover:bg-blue-100`}
            >
              <FileText className="w-6 h-6" />
              <span className="text-sm font-medium">Add Note</span>
            </button>

            {/* Add Event */}
            <button
              onClick={() => setShowAddEventForm(true)}
              className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-colors bg-green-50 text-green-600 hover:bg-green-100`}
            >
              <FileText className="w-6 h-6" />
              <span className="text-sm font-medium">New Event</span>
            </button>

            {/* Add Task */}
            <button
              onClick={() => setShowAddForm(true)}
              className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-colors bg-purple-50 text-purple-600 hover:bg-purple-100`}
            >
              <FileText className="w-6 h-6" />
              <span className="text-sm font-medium">Add Assignment</span>
            </button>

            {/* Add Task */}
            <button
              className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-colors bg-amber-50 text-amber-600 hover:bg-amber-100`}
            >
              <AiTwotoneNotification className="w-6 h-6" />
              <span className="text-sm font-medium">Notice</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Recent Tasks */}
          <div className="xl:col-span-2">
            <RecentTask tasksData={tasksData} refetch={refetch} />

            {/* Recent Notes */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Recent Notes
                  </h2>
                  <Link
                    href="/notes"
                    className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                  >
                    View All
                  </Link>
                </div>
              </div>
              <div className="p-6">
                {/* <div className="space-y-4">
                  {mockNotes.map((note: any) => (
                    <div
                      key={note.id}
                      className="p-4 border-l-4 border-green-500 bg-green-50 rounded-lg"
                    >
                      <h3 className="font-medium text-gray-900 mb-1">
                        {note.title}
                      </h3>
                      <p className="text-sm text-gray-600">{note.createdAt}</p>
                    </div>
                  ))}
                </div> */}

                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-2 gap-6">
                  {notesData &&
                    notesData?.slice(0, 4)?.map((note: any) => (
                      <div key={note?._id} className="relative bg-transparent">
                        <div className="absolute bg-transparent w-full px-5 top-2 right-2 z-10 flex justify-between gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7 bg-black/40 hover:bg-black/60 text-white"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-7 w-7 bg-black/40 hover:bg-black/60 text-white"
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Note</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete &quot;
                                  {note?.title}&quot;? This action cannot be
                                  undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                        <NoteCard
                          title={note?.title}
                          description={note?.description}
                          createdAt={note?.createdAt}
                          images={note?.images}
                          priority={note?.priority}
                          tags={note?.tags}
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            {/* Recent Notes */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {" "}
                    Recent Notices{" "}
                  </h2>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 12h14M12 5l7 7-7 7"
                      />
                    </svg>
                    <span>View All</span>
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-6">
                  {mockNotices.map((notice) => (
                    <div
                      key={notice?.id}
                      className="p-4 border-l-4 border-yellow-500 bg-yellow-50 rounded-lg shadow-sm"
                    >
                      <div className="flex items-start space-x-3">
                        {/* Notice Icon */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6 text-yellow-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 8v4m0 4h.01M5.22 19L5 19.22a8 8 0 1 0 13.16-13.16L19 5.22a8 8 0 1 0-13.16 13.16z"
                          />
                        </svg>

                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">
                            {notice?.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {notice?.createdAt}
                          </p>
                          <p className="mt-2 text-gray-700">
                            {notice?.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Upcoming Assignments */}
            {/* <UpcomingAssignments assignments={assignmentData} /> */}
            {/* Quick Add  +----------------  hidden */}
            <div className="hidden bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">
                  Quick Add
                </h2>
              </div>
              <div className="p-6 space-y-3">
                <button className="w-full flex items-center space-x-3 px-4 py-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Plus size={16} className="text-indigo-600" />
                  <span>Add Task</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Plus size={16} className="text-green-600" />
                  <span>Add Note</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Plus size={16} className="text-purple-600" />
                  <span>Add Notice</span>
                </button>
              </div>
            </div>
            {/* <UpcomingEvents upcomingEvents={eventsData} /> */}
            {/* Important Links */}
            {/* <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">
                  Important Links
                </h2>
              </div>
              <div className="p-6 space-y-3">
                <a
                  href="#"
                  className="flex items-center space-x-3 text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  <ExternalLink size={16} className="text-indigo-600" />
                  <span>School Portal</span>
                </a>
                <a
                  href="#"
                  className="flex items-center space-x-3 text-gray-700 hover:text-green-600 transition-colors"
                >
                  <ExternalLink size={16} className="text-green-600" />
                  <span>Online Library</span>
                </a>
                <a
                  href="#"
                  className="flex items-center space-x-3 text-gray-700 hover:text-purple-600 transition-colors"
                >
                  <ExternalLink size={16} className="text-purple-600" />
                  <span>Virtual Classroom</span>
                </a>
              </div>
            </div> */}
            <AddNoteModal
              isAddDialogOpen={isAddDialogOpen}
              setIsAddDialogOpen={setIsAddDialogOpen}
            />

            <AddEventForm
              isOpen={showAddEventForm}
              onClose={() => setShowAddEventForm(false)}
              onSubmit={handleAddEvent}
            />

            <AddAssignmentForm
              isOpen={showAddForm}
              onClose={() => setShowAddForm(false)}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

// +------------------------------ Data -----------------------

const mockNotices: any[] = [
  {
    id: "1",
    title: "Exam Schedule Updated",
    content: "Final exam schedules have been updated",
    createdAt: "3 hours ago",
    type: "info",
  },
  {
    id: "2",
    title: "New Assignment Posted",
    content: "Chemistry lab assignment is now available",
    createdAt: "1 day ago",
    type: "success",
  },
];
