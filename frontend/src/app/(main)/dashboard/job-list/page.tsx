import React from "react";
import JobList from "./job-list";

export default function page() {
  return (
    <div className="w-full flex flex-col">
      <h2 className="text-xl mb-10">
        My Jobs<span className="text-muted-foreground text-base">(20)</span>
      </h2>
      <JobList />
    </div>
  );
}
