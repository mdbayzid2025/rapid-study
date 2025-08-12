import React from 'react';
import { BookOpen, Plus } from 'lucide-react';
import AddAssignmentForm from './AddAssignmentForm';



interface AssignmentsProps {
  assignments: any[];
}

const Assignments: React.FC<AssignmentsProps> = ({ assignments: initialAssignments }) => {
  const [assignments, setAssignments] = React.useState(initialAssignments);
  const [showAddForm, setShowAddForm] = React.useState(false);

  const getStatusColor = (status: any['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
    }
  };

  const handleAddAssignment = (newAssignment: any) => {
    setAssignments(prev => [newAssignment, ...prev]);
  };
  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <BookOpen className="w-5 h-5 text-green-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Assignments & Deadlines</h3>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Assignment
        </button>
      </div>

      <div className="space-y-4">
        {assignments.map((assignment) => (
          <div key={assignment.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <h4 className="text-lg font-medium text-gray-900">{assignment.title}</h4>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(assignment.status)}`}>
                {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">Due: {assignment.dueDate}</p>
            <p className="text-gray-700">{assignment.description}</p>
          </div>
        ))}
      </div>
    </div>

      <AddAssignmentForm
        isOpen={showAddForm}
        onClose={() => setShowAddForm(false)}
        onSubmit={handleAddAssignment}
      />
    </>
  );
};

export default Assignments;