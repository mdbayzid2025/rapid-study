import React from 'react';
import { Calendar, FileText, BookOpen, Bell } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Calendar,
      title: 'Class Scheduling',
      description: 'Never miss a class with automated scheduling and smart reminders for all your courses.',
      color: 'blue',
    },
    {
      icon: FileText,
      title: 'Assignment & Notes',
      description: 'Share assignments and notes seamlessly with classmates and keep everything organized.',
      color: 'green',
    },
    {
      icon: BookOpen,
      title: 'Subject Management',
      description: 'Organize subjects and chapters efficiently with our intuitive management system.',
      color: 'purple',
    },
    {
      icon: Bell,
      title: 'Announcements',
      description: 'Stay updated with real-time announcements and important updates from faculty.',
      color: 'orange',
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-50 text-blue-600',
      green: 'bg-green-50 text-green-600',
      purple: 'bg-purple-50 text-purple-600',
      orange: 'bg-orange-50 text-orange-600',
    };
    return colorMap[color as keyof typeof colorMap] || 'bg-gray-50 text-gray-600';
  };

  return (
    <section id="features" className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to manage your academic life efficiently
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 ${getColorClasses(feature.color)} rounded-2xl flex items-center justify-center mb-6`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;