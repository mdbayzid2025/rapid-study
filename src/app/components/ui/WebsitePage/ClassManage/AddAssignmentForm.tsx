"use client";

import React, { useState } from "react";
import { X, Calendar, AlertCircle } from "lucide-react";
import { useGetSubjectsQuery } from "@/store/api/subjectApi";
import { useCreateAssignmentMutation } from "@/store/api/assignmentApi";

interface AddAssignmentFormProps {
  isOpen: boolean;
  onClose: () => void;  
}

const initialState = {
    title: "",
    submissionDate: "",
    subject: '',
    time: "",
    detailedInstructions: "",
  }

const AddAssignmentForm: React.FC<AddAssignmentFormProps> = ({
  isOpen,
  onClose,  
}) => {
  const [formData, setFormData] = useState(initialState);
  const { data: subjects, isLoading, isError } = useGetSubjectsQuery(undefined);
  const [createAssignment, {isLoading:adding}] = useCreateAssignmentMutation();
  

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

 const combinedDate = new Date(`${formData.submissionDate}T${formData.time}`);

  const assignment = {
    title: formData.title,
    subject: formData.subject,
    submissionDate: combinedDate,
    time: formData.time, 
    detailedInstructions: formData.detailedInstructions,    
  };


     try {
      const res = await createAssignment(assignment);
      console.log("assignment", res);
      
      onClose();
    } catch (error) {
      console.log("error", error)
    }               
  };

  if (!isOpen) return null;

      const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onClose();
        setFormData(initialState);
      }
    };

  return (
    <div onClick={handleOverlayClick} className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Add New Assignment
          </h2>
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
              Assignment Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter assignment title..."
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
                  setFormData((prev) => ({ ...prev, subject: e.target.value }))
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
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Due Date *
              </label>
              <input
                type="date"
                required
                value={formData.submissionDate}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    submissionDate: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Due Time
              </label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, time: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Detailed Instructions
            </label>
            <textarea
              rows={4}
              value={formData.detailedInstructions}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  detailedInstructions: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Enter detailed assignment instructions..."
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Add Assignment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAssignmentForm;
