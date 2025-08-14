"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Teacher } from "@/types";
import { useCreateTeacherMutation } from "@/store/api/teacherApi";
import toast from "react-hot-toast";
import { useUpdateTeacherMutation } from "@/store/api/teacherApi";

interface TeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacher?: Teacher | null;
  mode: "add" | "edit" | "view";
}

const TeacherAddModal: React.FC<TeacherModalProps> = ({
  isOpen,
  onClose,
  teacher,
  mode,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    designation: "",
    department: "",
    remarks: "",
    status: "Active" as "Active" | "Inactive",
    photo: "" as string | File,
  });

  const [createTeacher, { isLoading }] = useCreateTeacherMutation();
  const [updateTeacher, { isLoading: updating }] = useUpdateTeacherMutation();

  useEffect(() => {
    if (teacher) {
      setFormData({
        name: teacher?.name ?? "",
        email: teacher?.email ?? "",
        contact: teacher?.contact ?? "",
        designation: teacher?.designation ?? "",
        department: teacher?.department ?? "",
        remarks: teacher?.remarks ?? "",
        status: teacher?.status ?? "Active",
        photo: teacher?.photo ?? "",
      });
    } else {
      setFormData({
        name: "",
        email: "",
        contact: "",
        designation: "",
        department: "",
        remarks: "",
        status: "Active",
        photo: "",
      });
    }
  }, [teacher, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();

    // Append the fields to the FormData object
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("contact", formData.contact);
    data.append("designation", formData.designation);
    data.append("department", formData.department);
    data.append("remarks", formData.remarks);
    data.append("status", formData.status);

    // Check if the photo exists and append it
    if (formData.photo && typeof formData.photo !== "string") {
      data.append("photo", formData.photo);
    }

    try {
      if (teacher) {
        // Update teacher
        const res = await updateTeacher({ id: teacher?._id, data }).unwrap();
        console.log("Update response", res);
        if (res?.data) {
          toast.success("Teacher Updated");
          onClose();
        } else {
          toast.error("Something went wrong during update");
        }
      } else {
        // Create teacher
        const res = await createTeacher(data).unwrap();
        console.log("Create response", res);
        if (res?.data) {
          toast.success("Teacher Added");
          onClose();
        } else {
          toast.error("Something went wrong during creation");
        }
      }
    } catch (error) {
      toast.error("An error occurred");
      console.error(error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setFormData((prev) => ({
        ...prev,
        photo: file, // Store the file object
      }));
    }
  };

  if (!isOpen) return null;

  const isReadOnly = mode === "view";
  const title =
    mode === "add"
      ? "Add New Teacher"
      : mode === "edit"
      ? "Edit Teacher"
      : "Teacher Details";

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-xl w-full mx-4 overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 cursor-pointer hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 ">
          <div className="space-y-4 grid grid-cols-2 gap-x-5 ">
            {/* Photo Upload Field */}
            <div className="col-span-2">
              <label className="text-wrap  text-sm font-medium text-gray-700 mb-1">
                Upload Photo
              </label>
              {!formData.photo ? (
                <input
                  type="file"
                  name="photo"
                  onChange={handleFileChange}
                  disabled={isReadOnly}
                  className=" px-3 py-2 flex cursor-pointer mx-auto w-28 h-28 bg-slate-300 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50"
                />
              ) : (
                <div className="w-full h-full flex justify-center items-center">
                  <img
                    src={
                      typeof formData.photo === "string"
                        ? formData.photo
                        : URL.createObjectURL(formData.photo)
                    }
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-full"
                  />
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                readOnly={isReadOnly}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Designation
              </label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleInputChange}
                readOnly={isReadOnly}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                readOnly={isReadOnly}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact
              </label>
              <input
                type="number"
                minLength={11}
                maxLength={11}
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                readOnly={isReadOnly}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1 ">
                Remarks
              </label>
              <input
                type="text"
                name="remarks"
                value={formData.remarks}
                onChange={handleInputChange}
                readOnly={isReadOnly}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                disabled={isReadOnly}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50"
              >
                <option value="">Select Department</option>
                <option value="CSE">CSE</option>
                <option value="EEE">EEE</option>
                <option value="ETE">ETE</option>
                <option value="English">English</option>
                <option value="History">History</option>
                <option value="Bangla">Bangla</option>
                <option value="BA">BA</option>
              </select>
            </div>

            <div className="grid  gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  disabled={isReadOnly}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {!isReadOnly && (
            <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 cursor-pointer text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 cursor-pointer bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                {mode === "add" ? "Add Teacher" : "Save Changes"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default TeacherAddModal;
