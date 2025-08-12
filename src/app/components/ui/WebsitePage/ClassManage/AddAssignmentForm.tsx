"use client";

import React, { useState } from 'react';
import { X, Calendar, AlertCircle } from 'lucide-react';

interface AddAssignmentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (assignment: any) => void;
}

const AddAssignmentForm: React.FC<AddAssignmentFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    dueTime: '',
    status: 'pending' as 'pending' | 'completed' | 'overdue',
    priority: 'medium' as 'high' | 'medium' | 'low',
    points: '',
    category: '',
    instructions: '',
    submissionType: 'online' as 'online' | 'paper' | 'presentation'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const assignment = {
      id: Date.now().toString(),
      ...formData,
      dueDate: formData.dueTime 
        ? `${new Date(formData.dueDate).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          })} at ${formData.dueTime}`
        : new Date(formData.dueDate).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          }),
      createdAt: new Date().toISOString()
    };
    onSubmit(assignment);
    setFormData({
      title: '',
      description: '',
      dueDate: '',
      dueTime: '',
      status: 'pending',
      priority: 'medium',
      points: '',
      category: '',
      instructions: '',
      submissionType: 'online'
    });
    onClose();
  };

  const priorities = [
    { value: 'high', label: 'High Priority', color: 'text-red-600' },
    { value: 'medium', label: 'Medium Priority', color: 'text-yellow-600' },
    { value: 'low', label: 'Low Priority', color: 'text-green-600' }
  ];

  const categories = [
    'Programming',
    'Research',
    'Essay',
    'Project',
    'Lab Report',
    'Presentation',
    'Quiz',
    'Exam',
    'Other'
  ];

  const submissionTypes = [
    { value: 'online', label: 'Online Submission' },
    { value: 'paper', label: 'Paper Submission' },
    { value: 'presentation', label: 'Presentation' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Add New Assignment</h2>
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
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter assignment title..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Enter assignment description..."
            />
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
                value={formData.dueDate}
                onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Due Time
              </label>
              <input
                type="time"
                value={formData.dueTime}
                onChange={(e) => setFormData(prev => ({ ...prev, dueTime: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as any }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {priorities.map(priority => (
                  <option key={priority.value} value={priority.value}>
                    {priority.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Points/Grade
              </label>
              <input
                type="text"
                value={formData.points}
                onChange={(e) => setFormData(prev => ({ ...prev, points: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 100 pts"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select category...</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Submission Type
            </label>
            <select
              value={formData.submissionType}
              onChange={(e) => setFormData(prev => ({ ...prev, submissionType: e.target.value as any }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {submissionTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Detailed Instructions
            </label>
            <textarea
              rows={4}
              value={formData.instructions}
              onChange={(e) => setFormData(prev => ({ ...prev, instructions: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Enter detailed assignment instructions..."
            />
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 mr-2" />
              <div>
                <h4 className="text-sm font-medium text-yellow-800">Assignment Preview</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  {formData.title || 'Assignment Title'} • 
                  {formData.dueDate ? ` Due: ${new Date(formData.dueDate).toLocaleDateString()}` : ' No due date set'}
                  {formData.dueTime && ` at ${formData.dueTime}`}
                </p>
              </div>
            </div>
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