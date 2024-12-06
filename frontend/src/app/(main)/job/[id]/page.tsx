"use client";

import { useGetJobByIdQuery } from "@/store/slices/useJobSlice";
import { useParams } from "next/navigation";
import GoogleImage from "Img/g.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Book,
  BookMarked,
  Calendar,
  Facebook,
  GraduationCap,
  Instagram,
  Linkedin,
  Map,
  SquareActivity,
  Timer,
  Twitter,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import Link from "next/link";
import DialogContainer from "@/components/DialogContainer";
import ApplyForm from "./apply-form";
import { useGetUserQuery } from "@/store/slices/useUserSlice";

export default function Page() {
  const param = useParams<{ key: string; id: string }>();
  const { data } = useGetJobByIdQuery(param?.id);

  const job = data?.data;
  const { data: userData } = useGetUserQuery();

  const isApplied = userData?.data?.application?.some(
    (app) => app.jobId === job?.id
  );

  console.log(data);

  return (
    <div>
      {/* HEADER */}
      <div className="w-full mb-10">
        <div className="w-full flex justify-between items-center">
          <div className="flex gap-2 items-end">
            <Image src={GoogleImage} className="w-20" alt="Logo" />
            <div className="">
              <h6 className="font-semibold text-2xl">{job?.title}</h6>
              <div className="flex items-center gap-2 mt-2">
                <span>at Google</span>
                <span className="text-xs block px-2 bg-green-100 text-green-500 rounded-full">
                  {job?.jobType}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <Button variant="secondary">
              <BookMarked />
            </Button>
            <DialogContainer
              title={`Applying to ${job?.title}`}
              content={<ApplyForm id={job?.id} />}
              button={
                <Button disabled={isApplied}>
                  {isApplied ? "Applied" : "Apply Now"}
                </Button>
              }
            />
          </div>
        </div>
        <div className="flex gap-2 mt-5">
          {/* LEFT */}
          <div className="flex-1">
            <div>
              <h6 className="font-semibold text-lg">Job Description</h6>
              <div
                className="flex flex-col gap-5"
                dangerouslySetInnerHTML={{ __html: job?.description }}
              />
            </div>
          </div>
          {/* RIGHT */}
          <div className="flex flex-col gap-3 w-1/3">
            <Card className="p-3 flex justify-center items-center">
              <div className="text-center flex-1">
                <h6 className="text-sm">Salery (IDR)</h6>
                <span className="text-xs text-blue-500 italic">
                  {job?.minSalary} - {job?.maxSalary}
                </span>
                <p className="text-xs">{job?.saleryType ?? "Mounthly"}</p>
              </div>
              <div className="flex-1 flex flex-col items-center text-center">
                <div className="">
                  <Map className="size-5" />
                </div>
                <p className="text-sm ">Job Location</p>
                <p className="text-sm text-muted-foreground">
                  Darkan, Indoensia
                </p>
              </div>
            </Card>
            <Card className="p-3">
              <h6>Job Benefit</h6>
              <div className="flex gap-2 flex-wrap mt-3">
                {job?.jobBenefits.map((item, index) => (
                  <div
                    key={index}
                    className="bg-indigo-100 text-sm p-2 rounded text-indigo-800"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-3">
              <h6>Oveview</h6>
              <div className="grid grid-cols-3 mt-2 gap-4 mb-5">
                <div className="">
                  <Calendar className="size-5" />
                  <div className="flex flex-col mt-1">
                    <span className="text-muted-foreground text-xs">
                      JOB POSTED
                    </span>
                    <span className="text-xs">
                      {job?.sharedAt
                        ? format(new Date(job?.sharedAt), "dd, MMM, yyyy")
                        : "Unknown Date"}
                    </span>
                  </div>
                </div>

                <div className="">
                  <Timer className="size-5" />
                  <div className="flex flex-col mt-1">
                    <span className="text-muted-foreground text-xs">
                      JOB EXPIRATE IN
                    </span>
                    <span className="text-xs">
                      {job?.sharedAt
                        ? format(new Date(job?.expiredAt), "dd, MMM, yyyy")
                        : "Unknown Date"}
                    </span>
                  </div>
                </div>

                <div className="">
                  <Book className="size-5" />
                  <div className="flex flex-col mt-1">
                    <span className="text-muted-foreground text-xs">
                      JOB LEVEL
                    </span>
                    <span className="text-xs">{job?.level}</span>
                  </div>
                </div>

                <div className="">
                  <SquareActivity className="size-5" />
                  <div className="flex flex-col mt-1">
                    <span className="text-muted-foreground text-xs">
                      EXPERIENCE
                    </span>
                    <span className="text-xs">{job?.experience}</span>
                  </div>
                </div>

                <div className="col-span-2">
                  <GraduationCap className="size-5" />
                  <div className="flex flex-col mt-1">
                    <span className="text-muted-foreground text-xs">
                      EDUCATION
                    </span>
                    <span className="text-xs">{job?.education}</span>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t">
                <h6 className="text-sm mb-3">Share this job</h6>
                <div className="flex items-center gap-2">
                  <Button>Copy Link</Button>
                  <div className="flex gap-4">
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
                    <Link
                      href="https://instagram.com"
                      target="_blank"
                      className="w-10 h-10 flex items-center justify-center rounded-md bg-indigo-200 text-indigo-600"
                    >
                      <Instagram size={18} />
                    </Link>
                  </div>
                </div>
                <h6 className="text-sm mt-3">Job Tags</h6>
                <div className="flex flex-wrap gap-2">
                  {job?.tags?.map((item, index) => (
                    <div
                      key={index}
                      className="p-2 bg-gray-300 text-xs rounded-md"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
