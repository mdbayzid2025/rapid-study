import { Bell, BookOpen, Calendar, CheckSquare, Clock, FileText, Plus, TrendingUp, User } from 'lucide-react';

export function Dashboard() {
  const quickStats = [
    { label: "Today's Tasks", value: 5, color: 'text-blue-600' },
    { label: 'Completed', value: 12, color: 'text-green-600' },
    { label: 'Due Soon', value: 3, color: 'text-amber-600' },
  ];

  const todaysSchedule = [
    {
      title: 'Database Systems',
      time: '9:00 AM - 10:30 AM',
      color: 'bg-blue-500',
    },
    {
      title: 'Software Engineering',
      time: '2:00 PM - 3:30 PM',
      color: 'bg-green-500',
    },
  ];

  const upcomingDeadlines = [
    {
      title: 'ML Assignment',
      dueDate: 'Due in 2 days',
      priority: 'High',
      priorityColor: 'bg-red-100 text-red-800',
    },
    {
      title: 'Database Project',
      dueDate: 'Due in 5 days',
      priority: 'Medium',
      priorityColor: 'bg-amber-100 text-amber-800',
    },
  ];

  const progressItems = [
    { label: 'Weekly Goals', percentage: 75, color: 'bg-green-500' },
    { label: 'Assignments', percentage: 60, color: 'bg-blue-500' },
  ];

  const quickActions = [
    { icon: FileText, label: 'Add Note', color: 'bg-blue-50 text-blue-600 hover:bg-blue-100' },
    { icon: Calendar, label: 'New Event', color: 'bg-green-50 text-green-600 hover:bg-green-100' },
    { icon: CheckSquare, label: 'Add Task', color: 'bg-amber-50 text-amber-600 hover:bg-amber-100' },
    { icon: BookOpen, label: 'Assignment', color: 'bg-purple-50 text-purple-600 hover:bg-purple-100' },
  ];

  const recentNotes = [
    {
      title: 'Binary Search Trees',
      subject: 'Data Structures',
      timeAgo: '2 hours ago',
      preview: 'Implementation and complexity analysis of BST operations...',
      icon: FileText,
    },
    {
      title: 'Machine Learning Basics',
      subject: 'AI Course',
      timeAgo: 'Yesterday',
      preview: 'Supervised vs unsupervised learning concepts...',
      icon: FileText,
    },
  ];

  const upcomingTasks = [
    {
      title: 'Complete ML assignment',
      dueDate: 'Due: Tomorrow',
      priority: 'High',
      priorityColor: 'bg-red-100 text-red-800',
    },
    {
      title: 'Review database concepts',
      dueDate: 'Due: Friday',
      priority: 'Medium',
      priorityColor: 'bg-amber-100 text-amber-800',
    },
    {
      title: 'Prepare presentation',
      dueDate: 'Due: Next week',
      priority: 'Low',
      priorityColor: 'bg-green-100 text-green-800',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 mr-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                {quickStats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{stat.label}</span>
                    <span className={`text-xl font-bold ${stat.color}`}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Notes</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">Data Structures</h4>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Algorithms</h4>
                  <p className="text-sm text-gray-500">Yesterday</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Welcome Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Good morning, Alex!</h1>
                  <p className="text-gray-600 mt-1">Here's what's happening with your classes today</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="w-5 h-5" />
                  New Note
                </button>
              </div>
            </div>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Today's Schedule */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Today's Schedule</h3>
                </div>
                <div className="space-y-3">
                  {todaysSchedule.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                      <div>
                        <p className="font-medium text-gray-900">{item.title}</p>
                        <p className="text-sm text-gray-500">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Deadlines */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-amber-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Upcoming Deadlines</h3>
                </div>
                <div className="space-y-3">
                  {upcomingDeadlines.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{item.title}</p>
                        <p className="text-sm text-gray-500">{item.dueDate}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${item.priorityColor}`}>
                        {item.priority}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Progress</h3>
                </div>
                <div className="space-y-4">
                  {progressItems.map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">{item.label}</span>
                        <span className="text-sm font-bold text-gray-900">{item.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${item.color}`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={index}
                      className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-colors ${action.color}`}
                    >
                      <Icon className="w-6 h-6" />
                      <span className="text-sm font-medium">{action.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Notes */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Notes</h3>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View all
                  </button>
                </div>
                <div className="space-y-4">
                  {recentNotes.map((note, index) => {
                    const Icon = note.icon;
                    return (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900">{note.title}</h4>
                          <p className="text-sm text-blue-600">{note.subject} • {note.timeAgo}</p>
                          <p className="text-sm text-gray-500 mt-1 truncate">{note.preview}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Upcoming Tasks */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Upcoming Tasks</h3>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View all
                  </button>
                </div>
                <div className="space-y-3">
                  {upcomingTasks.map((task, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{task.title}</p>
                        <p className="text-sm text-gray-500">{task.dueDate}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${task.priorityColor}`}>
                        {task.priority}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}