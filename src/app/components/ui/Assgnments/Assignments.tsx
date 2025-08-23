"use client";
import { useGetAssignmentsQuery } from "@/store/api/assignmentApi";
import dayjs from "dayjs";
import Link from "next/link";
import React from "react";

export const Assignments = () => {
  const {
    data: assignments,
    isLoading,
    error,
  } = useGetAssignmentsQuery(undefined);

  if (error) {
    return <div>Error fetching assignments</div>;
  }

  return (
    <div>
      <div className="bg-white rounded-xlborder border-gray-100 mt-8 relative">
        <div className="p-6 border-b-2 border-gray-100 sticky -top-2 bg-white">
          <div className="flex items-center justify-between">
            <h2 className="text-[14px] font-semibold text-gray-900">
              Upcoming Assignments
            </h2>

          </div>
        </div>
        <div className="p-6">
          <div className="space-y-2 ">
            {assignments &&
              assignments?.map((assignment: any) => (
                <div
                  key={assignment?._id}
                  className="flex items-start space-x-4 p-4 border-l-4 border-red-500 bg-red-50 rounded-lg"
                >
                  <div className="flex-1">
                    <h3 className="font-bold text-sm text-gray-900">
                      {assignment?.title}
                    </h3>
                    <h3 className="font-medium text-[12px] text-gray-900">
                      {assignment?.title}
                    </h3>
                    <p className="text-[12px] text-red-700 font-medium">
                      Submission Date:{" "}
                      {dayjs(assignment?.submissionDate).format("DD/MM/YY")}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-medium text-red-600 bg-red-100 px-2 py-1 rounded-full">
                      {assignment?.subject?.name}
                    </span>
                  </div>
                </div>
              ))}            
          </div>
        </div>
      </div>
    </div>
  );
};
