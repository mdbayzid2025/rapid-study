import React, { useState } from "react";
import { X, Flag } from "lucide-react";
import { useGetSubjectsQuery } from "@/store/api/subjectApi";
import { useCreateToDoMutation } from "@/store/api/todosApi";
import { useParams } from "next/navigation";

interface AddTodoFormProps {
  isOpen: boolean;
  onClose: () => void;
  subject?: string;
  refetch?: any;
}

const initialState = {
  title: "",
  startDate: "",
  endDate: "",
  subject: "",
  priority: "Medium" as "High" | "Medium" | "Low",
  status: "Pending",
};

const AddTodoForm: React.FC<AddTodoFormProps> = ({
  isOpen,
  onClose,
  subject,
  refetch,
}) => {
  const { data: subjects, isLoading, isError } = useGetSubjectsQuery(undefined);
  const [createTodo, { isLoading: adding }] = useCreateToDoMutation();
  const [formData, setFormData] = useState(initialState);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const todo = {
      title: formData?.title,
      startDate: formData?.startDate,
      endDate: formData?.endDate,
      subject: formData?.subject,
      priority: formData?.priority,
      status: formData?.status,
    };

    console.log("formdata", todo);
    try {
      const res = await createTodo(todo);
      console.log("s todfo", res);
      refetch();
      onClose();
      setFormData({
        title: "",
        startDate: "",
        endDate: "",
        subject: "",
        priority: "Medium",
        status: "Pending",
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const priorities = [
    { value: "High", label: "High Priority", color: "text-red-600 bg-red-100" },
    {
      value: "Medium",
      label: "Medium Priority",
      color: "text-yellow-600 bg-yellow-100",
    },
    {
      value: "Low",
      label: "Low Priority",
      color: "text-green-600 bg-green-100",
    },
  ];

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
      setFormData(initialState);
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-black/50 bg-opacity-50 mb-0 flex items-center justify-center z-99"
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Add New Task</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Task Description *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter task description..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Flag className="w-4 h-4 inline mr-1" />
                Priority *
              </label>
              <select
                required
                value={formData.priority}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    priority: e.target.value as any,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {priorities.map((priority) => (
                  <option key={priority.value} value={priority.value}>
                    {priority.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    startDate: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, endDate: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject *
              </label>
              {isLoading && <p>Loading subjects...</p>}
              {isError && (
                <p className="text-red-600">Failed to load subjects.</p>
              )}
              {!isLoading && !isError && subjects && (
                <select
                  required
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      subject: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select subject...</option>
                  {subjects.map((subject: { _id: string; name: string }) => (
                    <option key={subject._id} value={subject._id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="cursor-pointer px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTodoForm;
