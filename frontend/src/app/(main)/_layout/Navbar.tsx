"use client";

import { PhoneCall } from "lucide-react";

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
    path: "/candidates",
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
  return (
    <nav className="w-full h-12 flex items-center bg-gray-50">
      <div className="container flex justify-between items-center">
        <ul className="flex gap-2">
          {navBars.map((item, index) => (
            <>{item.role === role && <li key={index}>{item.title}</li>}</>
          ))}
        </ul>
        <div className="md:flex gap-2 hidden">
          <p className="flex gap-2 items-center">
            <PhoneCall className="size-5" /> 023849299837
          </p>
          <p>country</p>
        </div>
      </div>
    </nav>
  );
}
