import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Student } from '@/types';



interface StudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (student: Omit<Student, 'id'>) => void;
  student?: Student | null;
  mode: 'add' | 'edit' | 'view';
}

const StudentAddModal: React.FC<StudentModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  student, 
  mode 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    studentId: '',
    grade: '',
    section: '',
    status: 'Active' as 'Active' | 'Inactive',
    enrollmentDate: ''
  });

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        email: student.email,
        studentId: student.studentId,
        grade: student.grade,
        section: student.section,
        status: student.status,
        enrollmentDate: student.enrollmentDate
      });
    } else {
      setFormData({
        name: '',
        email: '',
        studentId: '',
        grade: '',
        section: '',
        status: 'Active',
        enrollmentDate: new Date().toISOString().split('T')[0]
      });
    }
  }, [student, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  const isReadOnly = mode === 'view';
  const title = mode === 'add' ? 'Add New Student' : mode === 'edit' ? 'Edit Student' : 'Student Details';

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 cursor-pointer hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
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
                Student ID
              </label>
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleInputChange}
                readOnly={isReadOnly}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Grade
                </label>
                <select
                  name="grade"
                  value={formData.grade}
                  onChange={handleInputChange}
                  disabled={isReadOnly}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50"
                >
                  <option value="">Select Grade</option>
                  <option value="Grade 9">Grade 9</option>
                  <option value="Grade 10">Grade 10</option>
                  <option value="Grade 11">Grade 11</option>
                  <option value="Grade 12">Grade 12</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Section
                </label>
                <select
                  name="section"
                  value={formData.section}
                  onChange={handleInputChange}
                  disabled={isReadOnly}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50"
                >
                  <option value="">Select Section</option>
                  <option value="Section A">Section A</option>
                  <option value="Section B">Section B</option>
                  <option value="Section C">Section C</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enrollment Date
                </label>
                <input
                  type="date"
                  name="enrollmentDate"
                  value={formData.enrollmentDate}
                  onChange={handleInputChange}
                  readOnly={isReadOnly}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50"
                />
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
                {mode === 'add' ? 'Add Student' : 'Save Changes'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default StudentAddModal;