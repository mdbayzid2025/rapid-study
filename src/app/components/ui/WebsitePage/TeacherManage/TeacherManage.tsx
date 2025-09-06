"use client";

import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Edit,
  Eye,
  Filter,
  Grid,
  List,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { mockTeachers } from "@/app/data/mockData"; // Import the mock data
import { Teacher } from "@/types";
import TeacherAddModal from "./AddTeacherModal";
import { useGetTeachersQuery } from "@/store/api/teacherApi";

const TeacherManage: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>(mockTeachers);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [currentPage, setCurrentPage] = useState(1);
  const [teachersPerPage] = useState(10);
  const {
    data: teachersData,
    isLoading,
    refetch,
  } = useGetTeachersQuery(undefined);  

  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: "add" as "add" | "edit" | "view",
    teacher: null as Teacher | null,
  });
  
  
// Filter teachers based on search and filters
const filteredTeachers = teachersData
  ? teachersData?.filter((teacher: any) => {
      const matchesSearch =
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher._id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDepartment =
        !departmentFilter || teacher?.department === departmentFilter;
      const matchesStatus = !statusFilter || teacher?.status === statusFilter;

      return matchesSearch && matchesDepartment && matchesStatus;
    })
  : [];


  // Pagination
  const indexOfLastTeacher = currentPage * teachersPerPage;
  const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
  const currentTeachers = filteredTeachers?.slice(
    indexOfFirstTeacher,
    indexOfLastTeacher
  );
  const totalPages = Math.ceil(filteredTeachers?.length / teachersPerPage);


  const handleDeleteTeacher = (teacherId: string) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      setTeachers(teachers.filter((t) => t._id !== teacherId));
    }
  };

  const openModal = (mode: "add" | "edit" | "view", teacher?: Teacher) => {
    setModalState({
      isOpen: true,
      mode,
      teacher: teacher || null,
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      mode: "add",
      teacher: null,
    });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setDepartmentFilter("");
    setStatusFilter("");
  };

  const getStatusBadgeColor = (status: string) => {
    return status === "Active"
      ? "bg-green-100 text-green-800"
      : "bg-yellow-100 text-yellow-800";
  };

  if(isLoading){
    return <p>Loading....</p>
  }
  return (
    <div className="flex-1">
      <main className="">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0"></div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Total Teachers: </span>
            <span className="font-semibold text-gray-900">
              {filteredTeachers?.length}
            </span>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search teachers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">All Departments</option>
              <option value="CSE">CSE</option>
              <option value="EEE">EEE</option>
              <option value="ETE">ETE</option>                            
              <option value="English">English</option>
              <option value="Bangla">Bangla</option>
              <option value="History">History</option>
              <option value="BA">BA</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="flex items-center justify-between mt-4">
            <button
              onClick={clearFilters}
              className="flex items-center space-x-2 px-3 py-1 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <Filter size={16} />
              <span>Clear</span>
            </button>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid"
                    ? "bg-indigo-100 text-indigo-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "list"
                    ? "bg-indigo-100 text-indigo-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Teachers List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Teacher List
            </h2>

            <button
              onClick={() => openModal("add")}
              className="cursor-pointer flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Plus size={16} />
              <span>Add Teacher</span>
            </button>
          </div>

          {viewMode === "list" ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Teacher
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Designation
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Remarks
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentTeachers?.map((teacher: any) => (
                    <tr
                      key={teacher?._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <img
                            src={teacher?.photo || "/placeholder.png"}
                            alt={teacher?.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <div className="font-medium text-gray-900">
                              {teacher?.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {teacher?.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                        {teacher?.contact}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                        {teacher?.designation}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                        {teacher?.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(
                            teacher?.status
                          )}`}
                        >
                          {teacher?.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(
                            teacher?.remarks
                          )}`}
                        >
                          {teacher?.remarks}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => openModal("view", teacher)}
                            className="p-1 text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => openModal("edit", teacher)}
                            className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteTeacher(teacher._id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentTeachers?.map((teacher: any) => (
                  <div
                    key={teacher._id}
                    className="bg-gray-50 p-6 rounded-lg border hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={
                          teacher.photo ||
                          "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop&crop=face"
                        }
                        alt={teacher.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {teacher.name}
                        </h3>
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Department:</span>
                        <span className="font-medium">
                          {teacher.department}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(
                            teacher.status
                          )}`}
                        >
                          {teacher.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => openModal("view", teacher)}
                          className="p-1 text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => openModal("edit", teacher)}
                          className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteTeacher(teacher._id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing {indexOfFirstTeacher + 1} to{" "}
                {Math.min(indexOfLastTeacher, filteredTeachers?.length)} of{" "}
                {filteredTeachers?.length} results
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={16} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(
                    (page) =>
                      page === 1 ||
                      page === totalPages ||
                      Math.abs(page - currentPage) <= 1
                  )
                  .map((page, index, array) => (
                    <React.Fragment key={page}>
                      {index > 0 && array[index - 1] < page - 1 && (
                        <span className="px-3 py-1 text-gray-500">...</span>
                      )}
                      <button
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 border rounded transition-colors ${
                          currentPage === page
                            ? "bg-indigo-600 text-white border-indigo-600"
                            : "border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {page}
                      </button>
                    </React.Fragment>
                  ))}

                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Teacher Modal */}
      <TeacherAddModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        teacher={modalState.teacher}
        mode={modalState.mode}
      />
    </div>
  );
};

export default TeacherManage;
