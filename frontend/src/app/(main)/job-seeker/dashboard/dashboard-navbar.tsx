"use client";

import {
  Album,
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
  Home,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { title: "Overview", path: "/job-seeker/dashboard", icon: Home },
  {
    title: "Profile",
    path: "/job-seeker/dashboard/profile",
    icon: User,
  },
  {
    title: "Application",
    path: "/job-seeker/dashboard/application",
    icon: BriefcaseBusiness,
  },
  {
    title: "Favorite Jobs",
    path: "/job-seeker/dashboard/favorite",
    icon: Album,
  },
];

export default function DashboardNavbar() {
  const [isMinimized, setIsMinimized] = useState(false);
  const pathname = usePathname().split("/");

  return (
    <nav
      className={`sticky top-10 h-full ${
        isMinimized ? "w-16" : "w-52"
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
          const getPathUrl = pathname.length > 3 ? pathname[3] : "dashboard";
          const getPathItem =
            item.path.split("/").length > 3
              ? item.path.split("/")[3]
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
          <p className="text-sm text-gray-400">© 2024 JobIlot</p>
        )}
      </div>
    </nav>
  );
}
