"use client";

import { PhoneCall } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navBars = [
  {
    title: "Home",
    path: "/",
    role: "",
  },
  {
    title: "Find Job",
    path: "/job",
    role: "",
  },
  {
    title: "Find Candidate",
    path: "/candidate",
    role: "employers",
  },
  {
    title: "Dashboard",
    path: "/dashboard",
    role: "employers",
  },
  {
    title: "Employers",
    path: "/employers",
    role: "",
  },
  {
    title: "My Jobs",
    path: "/my-job",
    role: "employers",
  },
];

export default function Navbar() {
  const role = "employers";
  const pathname = usePathname();
  return (
    <nav className="w-full h-12 flex items-end bg-gray-50">
      <div className="container flex justify-between items-center">
        <ul className="flex gap-5">
          {navBars
            .filter((item) => item.role === "" || item.role === role)
            .map((item, index) => {
              const isActive =
                pathname === item.path || pathname.startsWith(`${item.path}/`);
              return (
                <Link
                  href={item.path}
                  key={index}
                  className={`${
                    isActive
                      ? "border-b-2 border-blue-500 text-blue-500 pb-2"
                      : "text-gray-700"
                  } hover:text-blue-500`}
                >
                  {item.title}
                </Link>
              );
            })}
        </ul>
        <div className="md:flex gap-2 hidden">
          <p className="font-semibold pb-2">Indonesia</p>
        </div>
      </div>
    </nav>
  );
}
