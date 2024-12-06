"use client";

import { useGetJobByIdQuery } from "@/store/slices/useJobSlice";
import { useParams } from "next/navigation";
import GoogleImage from "Img/g.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Book,
  Calendar,
  CircleCheckBig,
  EllipsisVertical,
  Facebook,
  Linkedin,
  LoaderCircle,
  Timer,
  Twitter,
  XCircle,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { format, formatDistanceToNow } from "date-fns";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DropdownMenuCustom from "@/components/DropdownMenuCustom";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useUpdateStatusMutation } from "@/store/slices/useApplicationSlice";
import { useToast } from "@/hooks/use-toast";

export default function Page() {
  const { toast } = useToast();
  const param = useParams<{ key: string; id: string }>();
  const { data, refetch } = useGetJobByIdQuery(param?.id);
  const job = data?.data;
  const [updateStatus] = useUpdateStatusMutation();

  const onUpdateStatus = async (id: string, status: string) => {
    await updateStatus({ id, status })
      .unwrap()
      .then(() => {
        toast({
          title: "Status updated successfully",
          description: "Your job status has been updated successfully",
        });
        refetch();
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Status update failed",
          description: "There is something wrong, Please try again",
        });
      });
  };

  console.log(data);

  return (
    <div className="w-full mb-10">
      {/* HEADER */}
      <div className="w-full flex justify-between items-center mb-8">
        <div className="flex gap-4 items-end">
          <Image src={GoogleImage} className="w-20" alt="Logo" />
          <div>
            <h6 className="font-semibold text-3xl">{job?.title}</h6>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-lg font-medium text-muted-foreground">
                at Google
              </span>
              <span className="text-xs block px-3 py-1 bg-green-100 text-green-500 rounded-full">
                {job?.jobType}
              </span>
            </div>
          </div>
        </div>
        <Button className="bg-blue-500 text-white px-5 py-2 rounded-md">
          Edit Job
        </Button>
      </div>

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="col-span-2">
          {/* Job Details */}
          <Card className="p-6">
            <h6 className="text-lg font-semibold mb-4">Job Details</h6>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h6 className="text-sm font-medium text-muted-foreground">
                  Salary (IDR)
                </h6>
                <p className="text-sm text-blue-500 italic">
                  {job?.minSalary} - {job?.maxSalary}
                </p>
                <p className="text-xs">{job?.saleryType ?? "Monthly"}</p>
              </div>
              <div>
                <h6 className="text-sm font-medium text-muted-foreground">
                  Job Location
                </h6>
                <p className="text-sm text-muted-foreground">
                  Darkan, Indonesia
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6 mt-6">
              <div>
                <Calendar className="size-5 mb-2" />
                <p className="text-xs text-muted-foreground">JOB POSTED</p>
                <p className="text-sm">
                  {job?.sharedAt
                    ? format(new Date(job?.sharedAt), "dd, MMM, yyyy")
                    : "Unknown Date"}
                </p>
              </div>
              <div>
                <Timer className="size-5 mb-2" />
                <p className="text-xs text-muted-foreground">JOB EXPIRES IN</p>
                <p className="text-sm">
                  {job?.expiredAt
                    ? format(new Date(job?.expiredAt), "dd, MMM, yyyy")
                    : "Unknown Date"}
                </p>
              </div>
              <div>
                <Book className="size-5 mb-2" />
                <p className="text-xs text-muted-foreground">JOB LEVEL</p>
                <p className="text-sm">{job?.level}</p>
              </div>
            </div>
          </Card>

          {/* Job Description */}
          <Card className="p-6 mt-6">
            <h6 className="text-lg font-semibold mb-4">Job Description</h6>
            <div
              className="prose text-sm flex flex-col gap-5"
              dangerouslySetInnerHTML={{ __html: job?.description }}
            />
          </Card>
        </div>

        {/* Right Section */}
        <div>
          {/* Job Benefits */}
          <Card className="p-6">
            <h6 className="text-lg font-semibold mb-4">Job Benefits</h6>
            <div className="flex gap-2 flex-wrap">
              {job?.jobBenefits?.map((item, index) => (
                <span
                  key={index}
                  className="bg-indigo-100 text-sm px-4 py-2 rounded text-indigo-800"
                >
                  {item}
                </span>
              ))}
            </div>
          </Card>

          {/* Share Job */}
          <Card className="p-6 mt-6">
            <h6 className="text-lg font-semibold mb-4">Share this Job</h6>
            <div className="flex items-center gap-2">
              <Button>Copy Link</Button>
              <div className="flex gap-2">
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  className="w-10 h-10 flex items-center justify-center rounded-md bg-indigo-200 text-indigo-600"
                >
                  <Facebook size={18} />
                </Link>
                <Link
                  href="https://twitter.com"
                  target="_blank"
                  className="w-10 h-10 flex items-center justify-center rounded-md bg-indigo-200 text-indigo-600"
                >
                  <Twitter size={18} />
                </Link>
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  className="w-10 h-10 flex items-center justify-center rounded-md bg-indigo-200 text-indigo-600"
                >
                  <Linkedin size={18} />
                </Link>
              </div>
            </div>
          </Card>

          {/* Job Tags */}
          <Card className="p-6 mt-6">
            <h6 className="text-lg font-semibold mb-4">Job Tags</h6>
            <div className="flex flex-wrap gap-2">
              {job?.tags?.map((item, index) => (
                <span
                  key={index}
                  className="p-2 bg-gray-300 text-xs rounded-md"
                >
                  {item}
                </span>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/*  */}
      <div className="mt-5">
        <h6 className="font-semibold text-lg mb-3">Applications</h6>
        <Table>
          <TableCaption>List of applications for this job.</TableCaption>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead>NO</TableHead>
              <TableHead>APPLICANT NAME</TableHead>
              <TableHead>STATUS</TableHead>
              <TableHead>APPLIED DATE</TableHead>
              <TableHead>ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {job?.applications?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image
                      src={`https://via.placeholder.com/50`}
                      className="w-10 h-10 rounded-full"
                      alt="User Avatar"
                      width={10}
                      height={10}
                    />
                    <div>
                      <p className="font-semibold text-sm">
                        {item.cv.fullName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {item.company?.name}
                      </p>
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
                  <div className="flex gap-2 items-center justify-end">
                    <Button size="sm">View</Button>
                    <DropdownMenuCustom
                      label="Actions"
                      button={
                        <Button variant="secondary" size="sm">
                          <EllipsisVertical />
                        </Button>
                      }
                      content={
                        <>
                          <DropdownMenuItem
                            onClick={() => onUpdateStatus(item.id, "REJECTED")}
                          >
                            Reject
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onUpdateStatus(item.id, "INTERVIEW")}
                          >
                            Interview
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onUpdateStatus(item.id, "ACCEPTED")}
                          >
                            Accept
                          </DropdownMenuItem>
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
      {/*  */}
    </div>
  );
}
