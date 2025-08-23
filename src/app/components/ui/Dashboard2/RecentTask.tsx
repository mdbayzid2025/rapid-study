import React from "react";

import dayjs from "dayjs";
import { useUpdateToDoMutation } from "@/store/api/todosApi";
import toast from "react-hot-toast";

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-800";
    case "Medium":
      return "bg-yellow-100 text-yellow-800";
    case "Low":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

export const RecentTask = ({ tasksData, refetch }: any) => {

      const [updateToDo, {isLoading}] = useUpdateToDoMutation();
      
      
    
      const changeStatus = async (id: string) => {
        try {
          const data = {status: "Done"}
          const res = await updateToDo({id, data })
    
          toast.success(res?.data?.message)
          refetch()
        } catch (error) {
          console.log("error", error)
        }
      };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-5">
      <div className="p-6 border-b border-gray-100 mb-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Recent Tasks</h2>
          <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
            View All
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-2">
          {tasksData &&
            tasksData?.map((task: any) => (
              <div
               onClick={() => changeStatus(task?._id)}
                key={task.id}
                className="flex items-center space-x-4 p-2 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={task.status === "Done"}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  readOnly
                />
                <div className="flex-1">
                  <h3
                    className={`text-sm font-medium ${
                      task.status === "Done"
                        ? "line-through text-gray-500"
                        : "text-gray-900"
                    }`}
                  >
                    {task?.title}
                  </h3>
                  <p className="text-[12px] text-red-700 font-semibold">
                    End Date: {dayjs(task.endDate).format("DD MMMM, YY")}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(
                    task?.priority
                  )}`}
                >
                  {task?.priority}
                </span>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                    task?.status
                  )}`}
                >
                  {task?.status}
                </span>
              </div>
            ))}

          {/* {mockTasks.map((task: any) => (
                                 <div
                                   key={task.id}
                                   className="flex items-center space-x-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                                 >
                                   <input
                                     type="checkbox"
                                     checked={task.status === "Completed"}
                                     className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                     readOnly
                                   />
                                   <div className="flex-1">
                                     <h3
                                       className={`font-medium ${
                                         task.status === "Completed"
                                           ? "line-through text-gray-500"
                                           : "text-gray-900"
                                       }`}
                                     >
                                       {task.title}
                                     </h3>
                                     <p className="text-sm text-gray-600">
                                       Due: {task.dueDate}
                                     </p>
                                   </div>
                                   <span
                                     className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(
                                       task.priority
                                     )}`}
                                   >
                                     {task.priority}
                                   </span>
                                   <span
                                     className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                                       task.status
                                     )}`}
                                   >
                                     {task.status}
                                   </span>
                                 </div>
                               ))} */}
        </div>
      </div>
    </div>
  );
};
