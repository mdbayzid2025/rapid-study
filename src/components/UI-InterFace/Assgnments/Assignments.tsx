    "use client";
    import { useGetAssignmentsQuery } from "@/store/api/assignmentApi";
    import dayjs from "dayjs";
    import { PageLoader } from "../../shared/Loader/PageLoader";
    import React from "react";
    import AddAssignmentForm from "../WebsitePage/ClassManage/AddAssignmentForm";
    import { Button } from "antd";

    export const Assignments = () => {
      const {
        data: assignments,
        isLoading,
        isError,
      } = useGetAssignmentsQuery({});
        const [showAddForm, setShowAddForm] = React.useState(false);

      if (isError) {
        return <div>Error fetching assignments</div>;
      }

      return (
        <div>
          <div className="bg-white rounded-xlborder border-gray-100 mt-8 relative mb-5">
            <div className="md:p-6 mb-5 pt-3 md:mt-0 md:mb-0  sticky -top-2 bg-white">
              <div className="flex items-center justify-between">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                  Upcoming Assignments
                </h2>

                <Button onClick={()=>setShowAddForm(true)} type="primary">Add </Button>
              </div>
            </div>
            <div className="">
              <div className="space-y-2 ">
                {isLoading ? (
                  <PageLoader />
                ) : isError ? (
                  <div className="flex justify-center items-center w-full min-h-[50vh] text-red-500">
                    <p>
                      There was an error loading the assignment. Please try again.
                    </p>
                  </div>
                ) : assignments?.length === 0 ? (
                  <div className="flex justify-center items-center w-full min-h-[50vh] text-gray-500">
                    <p>No assignments available. Start adding your assignments!</p>
                  </div>
                ) : (
                  assignments?.map((assignment: any) => (
                    <div
                      key={assignment?._id}
                      className="flex md:flex-row flex-col gap-2 items-start space-x-4 p-4 border-l-4 border-purple-500 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <h3 className="font-bold text-sm md:text-lg text-gray-900">
                          {assignment?.title}
                        </h3>
                        <h3 className="font-medium py-2 text-sm md:text-md text-gray-600">
                          {assignment?.detailedInstructions}
                        </h3>
                        <p className="text-[12px]  font-medium">
                          Submission Date:{" "}
                          <span className="text-red-700 font-semibold">
                            {" "}
                            {dayjs(assignment?.submissionDate).format("DD MMM, YY")}
                          </span>
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-[8px] md:text-[12px] font-medium text-purple-600 bg-gray-200 px-2 py-1 rounded-full">
                          {assignment?.subject?.name}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          <AddAssignmentForm
            isOpen={showAddForm}
            onClose={() => setShowAddForm(false)}
          />
        </div>
      );
    };
export default Assignments;
