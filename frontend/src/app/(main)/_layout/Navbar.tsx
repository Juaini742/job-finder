"use client";

import { useGetUserQuery } from "@/store/slices/useUserSlice";
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
    role: "RECRUITER",
  },
  {
    title: "Dashboard",
    path: "/dashboard",
    role: "RECRUITER",
  },
  {
    title: "Recruiter",
    path: "/RECRUITER",
    role: "",
  },
  {
    title: "My Jobs",
    path: "/my-job",
    role: "RECRUITER",
  },
];

export default function Navbar() {
  const { data } = useGetUserQuery();
  const role = data?.data.role;
  const pathname = usePathname();

  console.log(data);

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
                      ? "border-b-2 border-primary text-primary pb-2"
                      : "text-gray-700"
                  } hover:text-primary`}
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
