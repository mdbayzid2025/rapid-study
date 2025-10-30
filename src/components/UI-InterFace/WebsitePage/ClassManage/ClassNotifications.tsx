import React from 'react';
import { Bell, FileText, AlertTriangle } from 'lucide-react';

const ClassNotifications: React.FC = () => {
  const notifications = [
    {
      id: '1',
      type: 'info',
      title: 'New notes uploaded',
      message: '2 hours ago',
      icon: FileText
    },
    {
      id: '2',
      type: 'warning',
      title: 'Assignment due tomorrow',
      message: '1 day ago',
      icon: AlertTriangle
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center mb-4">
        <Bell className="w-5 h-5 text-red-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Recent Notifications</h3>
      </div>

      <div className="space-y-3">
        {notifications.map((notification) => (
          <div key={notification.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
            <notification.icon className={`w-5 h-5 mt-0.5 ${
              notification.type === 'warning' ? 'text-yellow-600' : 'text-blue-600'
            }`} />
            <div>
              <p className="text-sm font-medium text-gray-900">{notification.title}</p>
              <p className="text-xs text-gray-500">{notification.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassNotifications;