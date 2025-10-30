import React from 'react';
import { X } from 'lucide-react';

interface DeleteSemesterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  semesterTitle: string;
}

const DeleteSemesterModal: React.FC<DeleteSemesterModalProps> = ({
  isOpen,
  onClose,
  onDelete,
  semesterTitle
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Delete Semester
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6">
          <p className="text-gray-700">
            Are you sure you want to delete <strong>{semesterTitle}</strong>?
            This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-3 pt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteSemesterModal;
