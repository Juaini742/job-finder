"use client";

import DropdownMenuCustom from "@/components/DropdownMenuCustom";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { calculateRemainingTime } from "@/lib/calculateRemainingTime";
import { extractJobType } from "@/lib/extractJobType";
import { useGetJobByUserQuery } from "@/store/slices/useJobSlice";
import { CircleCheckBig, EllipsisVertical, Users } from "lucide-react";
import Link from "next/link";

export default function JobList() {
  const { data } = useGetJobByUserQuery();

  console.log(data);

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead>NO</TableHead>
            <TableHead>JOBS</TableHead>
            <TableHead>STATUS</TableHead>
            <TableHead>APPLICATION</TableHead>
            <TableHead>ACTION</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <div className="flex flex-col gap-2 w-full">
                  <p>{item.title}</p>
                  <p className="text-sm text-muted-foreground">
                    <span>{extractJobType(item.jobType)} </span>
                    <span>
                      -{calculateRemainingTime(item.expiredAt)} remining
                    </span>
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-2 items-center text-green-500">
                  <CircleCheckBig className="size-5" />
                  Active
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-2 items-center text-muted-foreground">
                  <Users className="size-5" />
                  {item.applications?.length} Applications
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 items-center">
                  <Link href={`job-list/${item.id}`}>
                    <Button>View Application</Button>
                  </Link>

                  <DropdownMenuCustom
                    label="Job Menu"
                    button={
                      <Button variant="secondary">
                        <EllipsisVertical />
                      </Button>
                    }
                    content={
                      <>
                        <DropdownMenuItem>Promote Job</DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link href={`job-list/${item.id}`}>View Detail</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Mark as expired</DropdownMenuItem>
                      </>
                    }
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
