import React from 'react';
import { Plus, Eye, Edit, Trash2, ExternalLink } from 'lucide-react';
import { mockTasks, mockAssignments, mockNotes, mockNotices } from '../data/mockData';

const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Total Tasks', value: '24', color: 'bg-blue-50 text-blue-600', icon: '📋' },
    { label: 'Pending Assignments', value: '8', color: 'bg-orange-50 text-orange-600', icon: '📚' },
    { label: 'Notes Added', value: '15', color: 'bg-green-50 text-green-600', icon: '📝' },
    { label: 'Active Notices', value: '5', color: 'bg-purple-50 text-purple-600', icon: '🔔' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex-1 bg-gray-50">
      
      <main className="p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <span className="text-2xl">{stat.icon}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Recent Tasks */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Tasks</h2>
                  <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                    View All
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {mockTasks.map((task :any) => (
                    <div key={task.id} className="flex items-center space-x-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                      <input
                        type="checkbox"
                        checked={task.status === 'Completed'}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        readOnly
                      />
                      <div className="flex-1">
                        <h3 className={`font-medium ${task.status === 'Completed' ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                          {task.title}
                        </h3>
                        <p className="text-sm text-gray-600">Due: {task.dueDate}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Upcoming Assignments */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 mt-8">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Upcoming Assignments</h2>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    <Plus size={16} />
                    <span>Add Assignment</span>
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {mockAssignments.map((assignment :any) => (
                    <div key={assignment.id} className="flex items-center space-x-4 p-4 border-l-4 border-red-500 bg-red-50 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{assignment.title}</h3>
                        <p className="text-sm text-gray-600">Due: {assignment.dueDate}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-medium text-red-600 bg-red-100 px-2 py-1 rounded-full">
                          {assignment.priority}
                        </span>
                        <p className="text-sm text-gray-600 mt-1">{assignment.daysLeft} days left</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            {/* Quick Add */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Quick Add</h2>
              </div>
              <div className="p-6 space-y-3">
                <button className="w-full flex items-center space-x-3 px-4 py-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Plus size={16} className="text-indigo-600" />
                  <span>Add Task</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Plus size={16} className="text-green-600" />
                  <span>Add Note</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-4 py-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Plus size={16} className="text-purple-600" />
                  <span>Add Notice</span>
                </button>
              </div>
            </div>

            {/* Recent Notes */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Notes</h2>
                  <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                    View All
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {mockNotes.map((note :any) => (
                    <div key={note.id} className="p-4 border-l-4 border-green-500 bg-green-50 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-1">{note.title}</h3>
                      <p className="text-sm text-gray-600">{note.createdAt}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Important Links */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Important Links</h2>
              </div>
              <div className="p-6 space-y-3">
                <a href="#" className="flex items-center space-x-3 text-gray-700 hover:text-indigo-600 transition-colors">
                  <ExternalLink size={16} className="text-indigo-600" />
                  <span>School Portal</span>
                </a>
                <a href="#" className="flex items-center space-x-3 text-gray-700 hover:text-green-600 transition-colors">
                  <ExternalLink size={16} className="text-green-600" />
                  <span>Online Library</span>
                </a>
                <a href="#" className="flex items-center space-x-3 text-gray-700 hover:text-purple-600 transition-colors">
                  <ExternalLink size={16} className="text-purple-600" />
                  <span>Virtual Classroom</span>
                </a>
              </div>
            </div>

            {/* Latest Notices */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Latest Notices</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {mockNotices.map((notice :any) => (
                    <div key={notice.id} className="p-4 border border-gray-100 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-1">{notice.title}</h3>
                      <p className="text-sm text-gray-600">{notice.createdAt}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;