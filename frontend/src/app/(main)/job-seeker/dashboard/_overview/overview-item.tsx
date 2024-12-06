"use client";

import { Card } from "@/components/ui/card";
import { useGetUserQuery } from "@/store/slices/useUserSlice";
import {
  Bell,
  Bookmark,
  BriefcaseBusiness,
  CircleCheckBig,
  LoaderCircle,
  Repeat2,
  XCircle,
} from "lucide-react";
import GoogleImg from "Img/g.png";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useGetApplicatonByUserQuery } from "@/store/slices/useApplicationSlice";
import { formatDistanceToNow } from "date-fns";

export default function OverviewItem() {
  const { data } = useGetUserQuery();
  const { data: apps, refetch } = useGetApplicatonByUserQuery();
  const user = data?.data;
  const applications = apps?.data;

  console.log(apps);
  return (
    <div className="p-3">
      <div className="">
        <h3 className="font-semibold text-xl">{user?.fullName}</h3>
        <p className="text-sm text-muted-foreground">
          Here is your daily detail activities and job alert
        </p>
      </div>
      {/* HEADER */}
      <div className="flex gap-5 mt-5">
        <Card className="flex-1 flex justify-between items-center bg-indigo-100 p-5 border-none">
          <div className="">
            <h6 className="font-semibold text-xl">{applications?.length}</h6>
            <span className="text-sm text-muted-foreground">Applied</span>
          </div>
          <div className="p-4 rounded-md bg-white">
            <BriefcaseBusiness className="size-7 text-blue-500 " />
          </div>
        </Card>
        <Card className="flex-1 flex justify-between items-center bg-red-100 p-5 border-none">
          <div className="">
            <h6 className="font-semibold text-xl">20</h6>
            <span className="text-sm text-muted-foreground">Favorite Jobs</span>
          </div>
          <div className="p-4 rounded-md bg-white">
            <Bookmark className="size-7  text-pink-500" />
          </div>
        </Card>
        <Card className="flex-1 flex justify-between items-center bg-green-100 p-5 border-none">
          <div className="">
            <h6 className="font-semibold text-xl">10</h6>
            <span className="text-sm text-muted-foreground">Notification</span>
          </div>
          <div className="p-4 rounded-md bg-white">
            <Bell className="size-7  text-emerald-500" />
          </div>
        </Card>
      </div>

      {/* APPLICATION */}
      <div className="mt-5">
        <div className="flex justify-between items-center my-3">
          <h6 className="font-semibold text-lg mb-3">Applications</h6>
          <Button title="Refresh" onClick={() => refetch()}>
            <Repeat2 />
          </Button>
        </div>
        <Table>
          <TableCaption>List of applications for this job.</TableCaption>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead>NO</TableHead>
              <TableHead>JOB</TableHead>
              <TableHead>STATUS</TableHead>
              <TableHead>APPLIED DATE</TableHead>
              <TableHead>ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image
                      src={GoogleImg}
                      className="w-10 h-10 rounded-full"
                      alt="User Avatar"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="">{item.job.title}</p>
                        <span
                          className={`text-xs rounded-full px-2 ${
                            item.job.jobType === "FULL_TIME"
                              ? "bg-indigo-200 text-indigo-500"
                              : item.job.jobType === "PART_TIME"
                              ? "bg-emerald-200 text-emerald-500"
                              : item.job.jobType === "REMOTE"
                              ? "bg-red-200 text-red-500"
                              : "bg-yellow-200 text-yellow-500"
                          }`}
                        >
                          {item.job.jobType}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-muted-foreground">
                          {item.company.name}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          IDR. {item.job.minSalary} - {item.job.maxSalary}
                        </span>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {item.status === "ACCEPTED" ? (
                    <div className="flex items-center text-green-500 gap-2">
                      <CircleCheckBig className="size-5" />
                      {item.status}
                    </div>
                  ) : item.status === "REJECTED" ? (
                    <div className="flex items-center text-red-500 gap-2">
                      <XCircle className="size-5" />
                      {item.status}
                    </div>
                  ) : (
                    <div className="flex items-center text-blue-500 gap-2">
                      <LoaderCircle className="size-5" />
                      {item.status}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <p className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(item.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </TableCell>
                <TableCell className="text-right">
                  <Button className="w-full text-left">View Detail</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
