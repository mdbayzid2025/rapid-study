"use client";
import { useGetAssignmentsQuery } from "@/store/api/assignmentApi";
import dayjs from "dayjs";
import { PageLoader } from "../../shared/Loader/PageLoader";

export const Assignments = () => {
  const {
    data: assignments,
    isLoading,
    isError,
  } = useGetAssignmentsQuery(undefined);

  if (isError) {
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
            {isLoading ? (
              <PageLoader />
            ) : isError ? (
              <div className="flex justify-center items-center w-full min-h-[50vh] text-red-500">
                <p>There was an error loading the assignment. Please try again.</p>
              </div>
            ) : assignments?.length === 0 ? (
              <div className="flex justify-center items-center w-full min-h-[50vh] text-gray-500">
                <p>No assignments available. Start adding your assignments!</p>
              </div>
            ) : (
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
              ))  
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
