"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  FilterIcon,
  Map,
  MapPin,
  SearchCheck,
} from "lucide-react";
import GoogleImg from "Img/g.png";
import Image from "next/image";
import { useGetJobQuery } from "@/store/slices/useJobSlice";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { useGetUserQuery } from "@/store/slices/useUserSlice";

export default function JobList() {
  const { data, isLoading } = useGetJobQuery();
  const { data: userData } = useGetUserQuery();
  const router = useRouter();
  const jobs = data?.data;
  const user = userData?.data.application;

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  console.log(data);
  return (
    <div>
      <form onSubmit={onSearch}>
        <Card className="mt-5 p-2 flex gap-1 ">
          <div className="flex items-center gap-2 flex-1">
            <SearchCheck className="size-7" />
            <input
              type="text"
              className="bg-transparent w-full h-full outline-none border-none"
              placeholder="Search By: Title"
            />
          </div>
          <div className="flex items-center gap-2 flex-2">
            <Map className="size-7" />
            <input
              type="text"
              className="bg-transparent w-full h-full outline-none border-none"
              placeholder="City"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" type="button">
              <FilterIcon />
              <span>Filter</span>
            </Button>
            <Button type="submit">Find</Button>
          </div>
        </Card>
      </form>

      <div className="mt-5">
        <div className="grid grid-cols-3 gap-3">
          {/* Jika loading, tampilkan skeleton */}
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <Card key={index} className="w-full">
                  <div className="cursor-pointer p-3">
                    <Skeleton className="h-6 w-3/4 mb-2" />{" "}
                    {/* Title Skeleton */}
                    <div className="flex gap-2 mt-3">
                      <Skeleton className="h-5 w-16 rounded-full" />{" "}
                      {/* Tag Skeleton */}
                      <Skeleton className="h-5 w-32" /> {/* Salary Skeleton */}
                    </div>
                    <div className="flex items-center gap-2 mt-5">
                      <Skeleton className="h-10 w-10 rounded-full" />{" "}
                      {/* Image Skeleton */}
                      <div className="flex flex-col gap-1 w-full">
                        <Skeleton className="h-4 w-1/2" />{" "}
                        {/* Company Name Skeleton */}
                        <Skeleton className="h-4 w-1/3" />{" "}
                        {/* Location Skeleton */}
                      </div>
                      <Skeleton className="h-5 w-5" /> {/* Bookmark Skeleton */}
                    </div>
                  </div>
                </Card>
              ))
            : jobs?.map((item, index) => (
                <Card
                  onClick={() => router.push(`job/${item.id}`)}
                  key={index}
                  className={`w-full ${
                    user?.find((app) => app.jobId === item.id)
                      ? "border-primary"
                      : ""
                  }`}
                  title={`${
                    user?.find((app) => app.jobId === item.id)
                      ? "You are already applied"
                      : "Apply"
                  }`}
                >
                  <div className="cursor-pointer p-3">
                    <h6 className="font-semibold mb-2 text-lg">{item.title}</h6>
                    <div className="flex gap-2">
                      <span className="text-xs block px-2 bg-green-100 text-green-500 rounded-full">
                        {item.jobType}
                      </span>
                      <span className="text-xs text-muted-foreground italic">
                        IDR: {item.minSalary} - {item.maxSalary}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-5">
                      <div>
                        <Image src={GoogleImg} className="w-11" alt="Image" />
                      </div>
                      <div className="w-full flex items-end justify-between">
                        <div>
                          <h6 className="font-semibold">Google Ic</h6>
                          <div className="flex gap-1">
                            <MapPin className="size-4" />
                            <span className="text-xs">Durka, Indonesia</span>
                          </div>
                        </div>
                        <div>
                          <button>
                            <Bookmark className="size-5 text-muted-foreground" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
        </div>

        {/* PAGINATION */}
        <div className="flex gap-4 justify-end py-2 mt-5">
          <div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <button className="mr-2 flex items-center gap-2">
                    <ChevronLeft className="size-4" />
                    <span className={`text-sm `}>Previous</span>
                  </button>
                </PaginationItem>
                {/* {Array.from({length: members?.pagination?.totalPages || 1}, (_, index) => (
                                    <PaginationItem key={index}>
                                        <PaginationLink
                                            href="#"
                                            onClick={() => handlePageChange(index + 1)}
                                            isActive={members?.pagination?.page === index}
                                        >
                                            {index + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))} */}
                <PaginationItem>
                  <PaginationLink href="#" isActive={false}>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <button className="ml-2 flex items-center gap-2">
                    <span className={`text-sm `}>Next</span>
                    <ChevronRight className="size-4" />
                  </button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
          <div className="mr-2">
            <Select defaultValue="5">
              <SelectTrigger className="w-[50px]">
                <SelectValue placeholder="Select a Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Size</SelectLabel>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        {/* END */}
      </div>
    </div>
  );
}
