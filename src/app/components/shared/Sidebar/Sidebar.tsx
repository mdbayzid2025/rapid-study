"use client";

import { BookOpen, LayoutDashboard, UserCheck, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
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
      icon: UserCheck,
    },
    { name: "Tasks", href: "/dashboard/task-list", icon: UserCheck },
    { name: "Profile", href: "/dashboard/profile", icon: UserCheck },
  ];

  return (
    <nav className="mt-7 w-72 flex-shrink-0 px-3">
      <ul>
        {navigation?.length > 0 &&
          navigation?.map((item) => {
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
                  <Icon className="icon" />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
      </ul>
    </nav>
  );
};

export default Sidebar;
