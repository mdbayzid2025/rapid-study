import React from "react";

import { Calendar, FileText, BookOpen, Bell } from "lucide-react";
import Link from "next/link";

const HeroSection: React.FC = () => {
  const features = [
    { icon: Calendar, label: "Schedule", link: "/calendar", color: "bg-blue-500/10" },
    { icon: FileText, label: "Assignments", link: "/assignments", color: "bg-green-500/10" },
    { icon: BookOpen, label: "Subjects", link: "/classes", color: "bg-purple-500/10" },
    { icon: Bell, label: "Updates", link: "/notice", color: "bg-orange-500/10" },
  ];

  return (
    <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="flex items-center space-x-3 text-blue-200">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <img
                  src="/Prime_University.png"
                  alt="logo"
                  className="w-8 h-10 object-cover overflow-visible"
                />
              </div>
              <div className="">
                <p className="font-medium text-white text-xl">Prime University</p>
                <span className="text-blue-300 text-sm">Academic Excellence</span>
              </div>
            </div>

            <div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
                CSE 66th (E)
                <br />
                <span className="text-blue-200">Class Management Portal</span>                                
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed max-w-lg">
                Designed by students, for students. Streamline your academic
                journey with our intuitive class management system.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                href="/dashboard"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-200 shadow-lg"
              >
                Login to Dashboard
              </Link>
              <Link
                href="/login"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Right Content - Feature Grid */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link href={feature.link}
                  key={feature.label}
                  className={`${feature.color} bg-opacity-20 backdrop-blur-sm  border border-white border-opacity-20 rounded-2xl p-6 hover:bg-opacity-30 transition-all duration-300 transform hover:scale-105`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 bg-white/20 bg-opacity-20 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.label}
                  </h3>
                  <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
                    <div
                      className="bg-white h-2 rounded-full"
                      style={{ width: `${Math.random() * 40 + 60}%` }}
                    ></div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
