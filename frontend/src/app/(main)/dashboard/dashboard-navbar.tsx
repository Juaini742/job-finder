"use client";

import {
  Briefcase,
  Building,
  ChevronLeft,
  ChevronRight,
  Home,
  PlusCircle,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { title: "Overview", path: "/dashboard", icon: Home },
  {
    title: "Profile",
    path: "/dashboard/profile",
    icon: User,
  },
  { title: "Company", path: "/dashboard/company", icon: Building },
  { title: "Job List", path: "/dashboard/job-list", icon: Briefcase },
  { title: "Post Job", path: "/dashboard/post-job", icon: PlusCircle },
];

export default function DashboardNavbar() {
  const [isMinimized, setIsMinimized] = useState(false);
  const pathname = usePathname().split("/");

  return (
    <nav
      className={`sticky top-4 h-[calc(90vh-30px)] ${
        isMinimized ? "w-16" : "w-44 min-w-44"
      } transition-all duration-300 flex flex-col justify-between`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between px-4 py-4">
        <span
          className={`text-lg font-bold ${
            isMinimized ? "hidden" : "block"
          } transition-all duration-300`}
        >
          Logo
        </span>
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="p-2 rounded-full"
        >
          {isMinimized ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      {/* Sidebar Navigation */}
      <ul className="flex-grow flex flex-col gap-2">
        {navItems.map((item, index) => {
          const getPathUrl = pathname.length > 2 ? pathname[2] : "dashboard";
          const getPathItem =
            item.path.split("/").length > 2
              ? item.path.split("/")[2]
              : "dashboard";

          const isActive = getPathUrl === getPathItem;
          return (
            <Link
              key={index}
              href={item.path}
              className={`hover:bg-blue-50 transition-all duration-300 flex items-center gap-4 px-4 py-3  ${
                isMinimized ? "justify-center" : ""
              } ${isActive ? "bg-indigo-50 border-l-2 border-primary" : ""}`}
            >
              <item.icon size={20} className={isActive ? "text-primary" : ""} />
              {!isMinimized && (
                <span className={`${isActive ? "text-primary" : ""} `}>
                  {item.title}
                </span>
              )}
            </Link>
          );
        })}
      </ul>
      {/* Sidebar Footer */}
      <div className="px-4 py-4">
        {!isMinimized && (
          <p className="text-sm text-gray-400">© 2024 YourApp</p>
        )}
      </div>
    </nav>
  );
}
