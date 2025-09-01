"use client";
import { useGetTasksQuery } from "@/store/api/taskApi";
import { useUpdateToDoMutation } from "@/store/api/todosApi";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import Container from "../shared/Container/Container";
import { Plus } from "lucide-react";
import { useState } from "react";
import AddTodoForm from "../ui/forms/AddTodoForm";

export const TaskList = () => {
  const { data: tasksData, refetch } = useGetTasksQuery(undefined);
  const [updateToDo, { isLoading }] = useUpdateToDoMutation();
  const [showAddForm, setShowAddForm] = useState(false);

  const changeStatus = async (id: string) => {
    try {
      const data = { status: "Done" };
      const res = await updateToDo({ id, data });

      toast.success(res?.data?.message);
      refetch();
    } catch (error) {
      console.log("error", error);
    }
  };


  return (
    <div>
      <Container>
        <div className="bg-white shadow-sm border border-gray-100 mb-5 min-h-[70vh] mt-10">
          <div className="p-6 border-b border-gray-100 mb-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Tasks
              </h2>
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center px-3 py-1 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add
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
            </div>
          </div>
        </div>
        <AddTodoForm
          isOpen={showAddForm}
          onClose={() => setShowAddForm(false)}
          refetch={refetch}
        />
      </Container>
    </div>
  );
};

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
