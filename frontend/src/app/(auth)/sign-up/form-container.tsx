"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CandidateForm from "./candidate-form";
import EmployersForm from "./employers-form";
import { Building, User } from "lucide-react";
import AppLogo from "@/components/AppLogo";

export default function FormContainer() {
  return (
    <div className="w-full md:w-[60rem] lg:w-[70rem] flex flex-col border p-5 pt-10 rounded">
      <div className="mb-10">
        <AppLogo />
      </div>
      <Tabs defaultValue="candidate" className="flex-1 bg-transparent">
        <TabsList className="w-full bg-transparent">
          <div className="w-full pt-3 pb-1 bg-black rounded">
            <h2 className="text-center text-gray-400 text-xl">
              CREATE ACCOUNT AS A
            </h2>
            <div className="flex justify-center mt-5">
              <TabsTrigger
                value="candidate"
                className="w-40 flex items-center gap-2"
              >
                <User className="size-5" />
                Candidate
              </TabsTrigger>
              <TabsTrigger
                value="employers"
                className="w-40 flex items-center gap-2"
              >
                <Building className="size-5" />
                Employer
              </TabsTrigger>
            </div>
          </div>
        </TabsList>
        <div className="mt-10">
          <TabsContent value="candidate">
            <CandidateForm />
          </TabsContent>
          <TabsContent value="employers">
            <EmployersForm />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
