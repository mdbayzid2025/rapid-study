"use client"

import React, { useState } from 'react';
import { Plus, Search, Eye, Edit3, Download, MoreHorizontal } from 'lucide-react';
import SubjectModal from './SubjectModal';
import SemesterModal from './SemesterModal';
import { useGetSemesterQuery } from '@/store/api/subjectApi';

interface Subject {
  id: string;
  name: string;
  semester: number;
  studentCount: number;
  capacity: number;
  status: 'Active' | 'Inactive' | 'Upcoming';
}

const Subjects: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([
    // Semester 1
    { id: '1', name: 'Subject A', semester: 1, studentCount: 35, capacity: 40, status: 'Active' },
    { id: '2', name: 'Subject B', semester: 1, studentCount: 32, capacity: 40, status: 'Active' },
    { id: '3', name: 'Subject C', semester: 1, studentCount: 28, capacity: 40, status: 'Active' },
    
    // Semester 2
    { id: '4', name: 'Subject A', semester: 2, studentCount: 33, capacity: 40, status: 'Active' },
    { id: '5', name: 'Subject B', semester: 2, studentCount: 30, capacity: 40, status: 'Active' },
    
    // Semester 3
    { id: '6', name: 'Subject A', semester: 3, studentCount: 0, capacity: 40, status: 'Upcoming' },
    { id: '7', name: 'Subject B', semester: 3, studentCount: 0, capacity: 40, status: 'Upcoming' },
    
    // Semester 4
    { id: '8', name: 'Subject A', semester: 4, studentCount: 0, capacity: 40, status: 'Upcoming' },
    
    // Semester 5
    { id: '9', name: 'Subject A', semester: 5, studentCount: 0, capacity: 40, status: 'Inactive' },
    
    // Semester 6
    { id: '10', name: 'Subject A', semester: 6, studentCount: 0, capacity: 40, status: 'Inactive' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [academicYear, setAcademicYear] = useState('Academic Year 2025');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);

  const [openSemester, setOpenSemester] = useState(false);
  const [selectSemester, setSelectSemester] = useState(null);

  const {data:semesterData, isLoading} = useGetSemesterQuery(undefined);


  if(isLoading) <p>Loading...</p>

  console.log("editingSubject", editingSubject);

  const academicYears = ['Academic Year 2025', 'Academic Year 2024', 'Academic Year 2023'];

  const filteredSubjects = semesterData?.subjects?.filter((subject :any) =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddSemester = () => {
    setEditingSubject(null);
    setOpenSemester(true);
  };

  const handleAddSubject = () => {
    setEditingSubject(null);
    setIsModalOpen(true);
  };

  const handleEditSubject = (subject: Subject) => {
    setEditingSubject(subject);
    setIsModalOpen(true);
  };

  const handleSaveSubject = (subjectData: Omit<Subject, 'id'>) => {
    if (editingSubject) {
      setSubjects(subjects.map(subject =>
        subject.id === editingSubject.id
          ? { ...subjectData, id: editingSubject.id }
          : subject
      ));
    } else {
      const newSubject: Subject = {
        ...subjectData,
        id: Date.now().toString(),
      };
      setSubjects([...subjects, newSubject]);
    }
    setIsModalOpen(false);
    setEditingSubject(null);
  };

  const totalSubjects = subjects.length;
  const activeStudents = subjects.filter(subject => subject.status === 'Active').reduce((sum, subject) => sum + subject.studentCount, 0);
  const totalCapacity = subjects.reduce((sum, subject) => sum + subject.capacity, 0);

  return (
    <div className="p-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        <span>Dashboard</span>
        <span>›</span>
        <span>Academic</span>
        <span>›</span>
        <span className="text-gray-900 font-medium">Subjects</span>
      </nav>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Subject Management</h1>
        <div className="flex items-center gap-5">
        <button
          onClick={handleAddSemester}
          className="flex items-center space-x-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Add Semester</span>
        </button>
        <button
          onClick={handleAddSubject}
          className="flex items-center space-x-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Add New Subject</span>
        </button>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Semester Wise Subject List</h2>
          <div className="flex items-center space-x-4">
            <select
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {academicYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <div className="relative">
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search subjects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Semesters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {semesterData && semesterData?.map((semester :any) => {
          
            return (
              <div key={semester?.title} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">{semester?.title}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(status)}`}>
                    {semester?.status}
                  </span>
                </div>

                <div className="space-y-3">
                  {semester?.subjects.length > 0 ? semester?.subjects.map((subject : any) => (
                    <div key={subject._id} className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-lg text-blue-500 font-semibold">{subject?.name}</p>
                          <div className="text-sm text-gray-600 flex items-center gap-2">
                            <img height={50} width={50} className='rounded-md' src={subject?.teacher?.photo ?? "/placeholder.png"} alt="" srcSet="" />
                            <div className="flex flex-col">
                           <span className='font-semibold'>{subject?.teacher?.name}</span> 
                           <span >{subject?.teacher?.department}</span>                               
                            </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <button
                            className="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors"
                            title="View Subject"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleEditSubject(subject)}
                            className="p-1 cursor-pointer text-gray-400 hover:text-gray-600 rounded transition-colors"
                            title="Edit Subject"
                          >
                            <Edit3 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
                      <p className="text-gray-500 text-sm">No subjects scheduled</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats and Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="text-sm text-gray-600">
            <span className="font-medium">Total Subjects:</span> {totalSubjects}
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-medium">Active Students:</span> {activeStudents}
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-medium">Total Capacity:</span> {totalCapacity}
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
            <MoreHorizontal className="h-4 w-4" />
            <span>Bulk Actions</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200 text-sm text-gray-500">
        <div>© 2025 Education Management System. All rights reserved.</div>
        <div className="flex items-center space-x-4">
          <span>Version 2.1.0</span>
          <span>Last updated: Jan 2025</span>
        </div>
      </div>

      {/* Subject Modal */}
      <SubjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}        
        subjectData={editingSubject}
      />

      {/* Semester Modal */}
      <SemesterModal openSemester={openSemester} setOpenSemester={setOpenSemester}  selectSemester={selectSemester} setSelectSemester={setSelectSemester}/>
    </div>
  );
};

export default Subjects;
