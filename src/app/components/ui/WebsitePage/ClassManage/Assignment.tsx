"use client";

import React from "react";
import { BookOpen, ClipboardList, Plus } from "lucide-react";
import AddAssignmentForm from "./AddAssignmentForm";
import dayjs from "dayjs";

const Assignments = ({ assignments }: any) => {
  const [showAddForm, setShowAddForm] = React.useState(false);

  const getStatusColor = (status: any["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "overdue":
        return "bg-red-100 text-red-800";
    }
  };

  console.log("assignments", assignments);

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <BookOpen className="w-5 h-5 text-green-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">
              Assignments & Deadlines
            </h3>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Assignment
          </button>
        </div>      
        <div className="space-y-4">
          {assignments?.length > 0 ? (
            assignments?.map((assignment: any) => (
              <div
                key={assignment?.id}
                className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition 
             bg-gradient-to-r from-yellow-100 via-orange-100 to-pink-100 text-gray-900"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-lg font-medium">{assignment?.title}</h4>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium bg-white/70 backdrop-blur-sm`}
                  >
                    {dayjs(assignment?.createdAt).format("DD MMMM, YYYY")}
                  </span>
                </div>

                <p className="text-sm mb-2">
                  Submission Date:{" "}
                  <span className="font-semibold text-red-600">
                    {dayjs(assignment?.submissionDate).format("MMMM DD, YYYY")}
                  </span>
                </p>

                <span className="text-gray-800 text-sm font-semibold underline">
                  Time: {assignment?.time}
                </span>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-lg p-10 bg-gray-50">
              <ClipboardList className="w-12 h-12 text-gray-400 mb-3" />
              <p className="text-gray-600 font-medium">No assignments yet</p>
              <p className="text-sm text-gray-500">
                Check back later for new tasks
              </p>
            </div>
          )}
        </div>
      </div>

      <AddAssignmentForm
        isOpen={showAddForm}
        onClose={() => setShowAddForm(false)}
      />
    </>
  );
};

export default Assignments;
