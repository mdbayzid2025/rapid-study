"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import {
  useCreateSubjectMutation,
  useGetSemesterQuery,
} from "@/store/api/subjectApi";
import { useGetTeachersQuery } from "@/store/api/teacherApi";
import toast from "react-hot-toast";

interface Subject {
  id: string;
  name: string;
  semester: string; // updated to string
  teacher: string; // teacher _id
  status: "Active" | "Inactive" | "Upcoming";
}

interface SubjectModalProps {
  isOpen: boolean;
  onClose: () => void;  
  subjectData: any | null;
}

const initialState: Omit<Subject, "id"> = {
  name: "",
  semester: "",
  teacher: "",
  status: "Active",
};

const SubjectModal: React.FC<SubjectModalProps> = ({
  isOpen,
  onClose,  
  subjectData,
}) => {
  const [formData, setFormData] = useState(initialState);

  const { data: semesterData } = useGetSemesterQuery(undefined);
  const { data: teachersData } = useGetTeachersQuery(undefined);
  const [createSubject, { isLoading }] = useCreateSubjectMutation();

  useEffect(() => {
    if (subjectData) {
      console.log("edit data", subjectData);
      setFormData({
        name: subjectData.name || "",
        semester: subjectData.semester?._id || "",
        teacher: subjectData.teacher?._id || "",
        status: subjectData.status || "Active",
      });
    } else {
      if (semesterData && teachersData) {
        setFormData({
          name: "",
          semester: semesterData[0]._id || "",
          teacher: teachersData[0]._id || "",
          status: "Active",
        });
      }
    }
  }, [subjectData, semesterData, teachersData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("data", formData);
    try {
      const res = await createSubject(formData);
      console.log("Subject", res);
      if (res?.data) {
        toast.success("Subject Added Successfully");
        onClose()
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Something wrong");
    }
    // onSave(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
      className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {subjectData ? "Edit Subject" : "Add New Subject"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Subject Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject Name *
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Subject Name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Semester */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Semester *
            </label>
            <select
              name="semester"
              value={formData.semester}              
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {semesterData?.map((sem: any) => (
                <option key={sem?._id} value={sem._id}>
                  {sem?.title}
                </option>
              ))}
            </select>
          </div>

          {/* Teacher */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Teacher *
            </label>
            <select
              name="teacher"
              value={formData.teacher}              
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {teachersData?.map((teacher: any) => (
                <option key={teacher?._id} value={teacher._id}>
                  {teacher?.name}, ({teacher?.department})
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Active">Active</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 cursor-pointer text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 cursor-pointer py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {subjectData ? "Update Subject" : "Add Subject"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubjectModal;
