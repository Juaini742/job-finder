"use client";

import { useGetJobByIdQuery } from "@/store/slices/useJobSlice";
import { useParams } from "next/navigation";

export default function Page() {
  const param = useParams<{ key: string; id: string }>();
  const { data } = useGetJobByIdQuery(param?.id);

  console.log(data);

  return <div>page detail job: {param?.id}</div>;
}
