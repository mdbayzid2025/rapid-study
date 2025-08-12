import React, { useState } from 'react';
import { X, Flag } from 'lucide-react';

interface AddTodoFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (todo: any) => void;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    text: '',
    priority: 'medium' as 'high' | 'medium' | 'low',
    dueDate: '',
    category: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const todo = {
      id: Date.now().toString(),
      text: formData.text,
      priority: formData.priority,
      completed: false,
      dueDate: formData.dueDate,
      category: formData.category,
      notes: formData.notes,
      createdAt: new Date().toISOString()
    };
    onSubmit(todo);
    setFormData({
      text: '',
      priority: 'medium',
      dueDate: '',
      category: '',
      notes: ''
    });
    onClose();
  };

  const priorities = [
    { value: 'high', label: 'High Priority', color: 'text-red-600 bg-red-100' },
    { value: 'medium', label: 'Medium Priority', color: 'text-yellow-600 bg-yellow-100' },
    { value: 'low', label: 'Low Priority', color: 'text-green-600 bg-green-100' }
  ];

  const categories = [
    'Study',
    'Assignment',
    'Project',
    'Reading',
    'Research',
    'Exam Prep',
    'Other'
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
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
              value={formData.text}
              onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
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
                Due Date
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes
            </label>
            <textarea
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Add any additional notes..."
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Priority Preview</h4>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              priorities.find(p => p.value === formData.priority)?.color
            }`}>
              <Flag className="w-3 h-3 mr-1" />
              {priorities.find(p => p.value === formData.priority)?.label}
            </span>
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
              className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
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