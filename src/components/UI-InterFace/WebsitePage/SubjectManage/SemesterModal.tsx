"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useCreateSemesterMutation } from "@/store/api/subjectApi";
import toast from "react-hot-toast";

interface Semester {
  id: string;
  title: string;
  status: "Active" | "Inactive" | "Upcoming";
}

const SemesterModal = ({
  openSemester,
  setOpenSemester,
  selectSemester,
  setSelectSemester,
}: any) => {
  const [formData, setFormData] = useState({
    title: "",
    status: "Active" as "Active" | "Inactive" | "Upcoming",
  });


const [createSemester, {isLoading}] = useCreateSemesterMutation()

  // ------------------------ Action --------------------------
  useEffect(() => {
    if (selectSemester) {
      setFormData({
        title: selectSemester.title,
        status: selectSemester.status,
      });
    } else {
      setFormData({
        title: "",
        status: "Active",
      });
    }
  }, [selectSemester]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      
      const res = await createSemester(formData);
      console.log("form data", res);

    } catch (error) {
      console.log("errpr", error)
      toast.error("Something wrong");
    }
    

    // setSelectSemester(null);
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

  const onClose = () => {
    setOpenSemester(false);
    setSelectSemester(null);
  };

  if (!openSemester) return null;

  // ------------- Modal close -----------------
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setOpenSemester(false);
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
            {selectSemester ? "Edit Semester" : "Add New Semester"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Semester Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Spring 2025"
            />
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
              className="cursor-pointer px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {selectSemester ? "Update Semester" : "Add Semester"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SemesterModal;
