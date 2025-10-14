"use client";

import { useState } from "react";
import {
  BookOpen,
  LayoutDashboard,
  Menu,
  UserCheck,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu } from "react-icons/fi";

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Teacher Manage", href: "/dashboard/teacher-manage", icon: Users },
    {
      name: "Student Manage",
      href: "/dashboard/students-manage",
      icon: UserCheck,
    },
    {
      name: "Subject Manage",
      href: "/dashboard/subject-manage",
      icon: BookOpen,
    },
    { name: "Tasks", href: "/dashboard/task-list", icon: UserCheck },
    { name: "Profile", href: "/dashboard/profile", icon: UserCheck },
  ];

  return (
    <>
      {/* Mobile Header */}
      {/* <div className="md:hidden fixed flex items-center justify-between p-3 rounded-full border-b bg-blue-700/70 shadow-sm">        
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
        >
          <Menu className="w-6 h-6" />
          <span className="sr-only">Open menu</span>
        </button>
      </div> */}
      <div  onClick={() => setIsOpen(true)} className="md:hidden fixed flex items-center justify-between shadow-sm">
        <button       
          className="relative !z-[99999999] flex items-center gap-3 px-4 py-[2.8px] text-sm font-medium text-white bg-[#0d5287] hover:bg-[#0585e8] after:content-[''] after:absolute after:top-1/2 after:-translate-y-1/2 after:-right-[22px] after:border-[11px] after:border-transparent after:border-l-[#0d5287] hover:after:border-l-[#0585e8]"
        >
           <FiMenu className="w-6 h-6" /> Menu
        </button>
      </div>

      {/* Desktop Sidebar */}
      <nav className="hidden md:block mt-7 w-72 flex-shrink-0 px-3 h-[98vh]">
        <ul>
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`mb-3 flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={`fixed top-0 left-0 z-50 w-72 h-full bg-white shadow-lg transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Sidebar</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <ul className="p-3">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`mb-2 flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
