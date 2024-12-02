"use client";

import { useGetUserQuery } from "@/store/slices/useUserSlice";
import { useRouter } from "next/navigation";

export default function RoleValidate({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = useGetUserQuery();
  const navigate = useRouter();

  if (data === undefined) {
    navigate.push("/sign-in");
  }

  if (data?.data.role === "RECRUITER" || data?.data.role === "JOB_SEEKER") {
    navigate.push("/");
  }

  return <>{children}</>;
}
