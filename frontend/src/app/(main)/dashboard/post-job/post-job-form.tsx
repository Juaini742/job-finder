"use client";

import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  SelectContent,
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JobShema, JobValeus } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import MultiSelect from "./MultiSelect";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useAddJobMutation } from "@/store/slices/useJobSlice";
import ButtonWithLoading from "@/components/ButtonWithLoading";
import { parseRupiah, rupiahFormatter } from "@/lib/rupiahFormatter";

const levels = [
  {
    label: "Junior",
    value: "JUNIOR",
  },
  {
    label: "Mid",
    value: "MID",
  },
  {
    label: "Senior",
    value: "SENIOR",
  },
  {
    label: "Lead",
    value: "LEAD",
  },
];

const jobtype = [
  {
    label: "Full-time",
    value: "FULL_TIME",
  },
  {
    label: "Part-time",
    value: "PART_TIME",
  },
  {
    label: "Remote",
    value: "REMOTE",
  },
  {
    label: "Freelance",
    value: "FREELANCE",
  },
];

const jobBenefits = [
  "Pay in Crypto",
  "Health Insurance",
  "Paid Time Off",
  "Work from Home",
  "Retirement Plan",
  "Stock Options",
  "Flexible Hours",
  "Life Insurance",
  "Bonuses",
  "Paid Sick Leave",
  "Professional Development",
  "Gym Membership",
  "Commuter Benefits",
  "Parental Leave",
  "Employee Assistance Program",
  "Education Reimbursement",
  "Employee Discounts",
  "Team Building Activities",
];
const educationLevels = [
  { label: "No Formal Education", value: "none" },
  { label: "Primary School", value: "primary" },
  { label: "Middle School", value: "middle" },
  { label: "High School Diploma", value: "high_school" },
  { label: "Vocational Training", value: "vocational" },
  { label: "Associate Degree", value: "associate" },
  { label: "Bachelor's Degree", value: "bachelor" },
  { label: "Master's Degree", value: "master" },
  { label: "Doctorate (PhD)", value: "phd" },
  { label: "Postdoctoral", value: "postdoc" },
];

const jobRoles = [
  { label: "Software Engineer", value: "software_engineer" },
  { label: "Data Scientist", value: "data_scientist" },
  { label: "Product Manager", value: "product_manager" },
  { label: "UX/UI Designer", value: "ux_ui_designer" },
  { label: "DevOps Engineer", value: "devops_engineer" },
  { label: "Marketing Specialist", value: "marketing_specialist" },
  { label: "HR Manager", value: "hr_manager" },
  { label: "Accountant", value: "accountant" },
];

export default function PostJoForm() {
  const { toast } = useToast();
  const [addJob, { isLoading }] = useAddJobMutation();
  const form = useForm<JobValeus>({
    resolver: zodResolver(JobShema),
    defaultValues: {
      title: "",
      tags: [],
      jobRole: "",
      minSalary: "",
      maxSalary: "",
      salaryType: "",
      education: "",
      experience: "",
      jobType: "",
      vacancies: "",
      expiredAt: new Date(),
      jobLevel: "",
      country: "",
      city: "",
      jobBenefits: [],
      description: "",
    },
  });

  const { setValue, watch } = form;
  const selectedBenefits = watch("jobBenefits");
  const descriptionEditor = watch("description");
  const dateValue = watch("expiredAt");

  const toggleBenefit = (value: string): void => {
    if (selectedBenefits.includes(value)) {
      const updatedData = selectedBenefits.filter((item) => item !== value);
      setValue("jobBenefits", updatedData);
    } else {
      const updatedData = [...selectedBenefits, value];
      setValue("jobBenefits", updatedData);
    }
  };

  const handleEditorChange = (value: string) => {
    setValue("description", value);
  };

  const onSubmit = async (data: JobValeus) => {
    try {
      const res = await addJob(data);

      if (res !== undefined) {
        toast({
          title: "Job created successfully",
          description: "Your job has been posted successfully",
        });
        form.reset();
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Job Posting Failed",
        description: "There is something wrong, Please try again",
      });
    }
  };

  return (
    <div className="">
      <h2 className="text-xl font-semibold mb-5">Post a Job</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter the Job Title" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-2">
            <div className="flex-1">
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags (Optional)</FormLabel>
                    <FormControl>
                      <MultiSelect
                        selectedValues={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-44 lg:w-56">
              <FormField
                control={form.control}
                name="jobRole"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Role</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a Job Role" />
                        </SelectTrigger>
                        <SelectContent>
                          {jobRoles.map((role) => (
                            <SelectItem key={role.value} value={role.value}>
                              {role.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="">
            <h5 className="font-semibold text-xl">Salery</h5>
            <div className="flex gap-2">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="minSalary"
                  render={({}) => (
                    <FormItem>
                      <FormLabel>Min (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter the min salary of this job"
                          value={rupiahFormatter(watch("minSalary"))}
                          onChange={(e) => {
                            setValue(
                              "minSalary",
                              String(parseRupiah(e.target.value))
                            );
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="maxSalary"
                  render={({}) => (
                    <FormItem>
                      <FormLabel>Max (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter the max salary of this job"
                          value={rupiahFormatter(watch("maxSalary"))}
                          onChange={(e) => {
                            setValue(
                              "maxSalary",
                              String(parseRupiah(e.target.value))
                            );
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="salaryType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select type of salary" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="HOURLY">Hourly</SelectItem>
                            <SelectItem value="MONTHLY">Mothly</SelectItem>
                            <SelectItem value="YEARLY">Yearly</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h5 className="font-semibold text-xl">Advance Information</h5>
            <div className="flex gap-2">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="education"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Education</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select the limit of education" />
                          </SelectTrigger>
                          <SelectContent>
                            {educationLevels.map((item, index) => (
                              <SelectItem key={index} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>experience</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          placeholder="Enter the required experience"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="jobType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Type</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select job type" />
                          </SelectTrigger>
                          <SelectContent>
                            {jobtype.map((item, index) => (
                              <SelectItem key={index} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="vacancies"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vacancies</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter the Job Title" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="expiredAt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiration Date</FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[280px] justify-start text-left font-normal",
                                !dateValue && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2" />
                              {dateValue ? (
                                format(dateValue, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(date) => {
                                field.onChange(date);
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="jobLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Level</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select level of this job" />
                          </SelectTrigger>
                          <SelectContent>
                            {levels.map((item, index) => (
                              <SelectItem key={index} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="">
            <h5 className="font-semibold text-xl">Location</h5>
            <div className="flex gap-2">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter the country" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter the city" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="">
            <h5 className="font-semibold text-xl mb-3">Job Benefits</h5>
            <div className="flex flex-wrap gap-2">
              {jobBenefits.map((benefit, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => toggleBenefit(benefit)}
                  className={`p-2 rounded-md text-sm
          ${
            selectedBenefits.includes(benefit)
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
                >
                  {benefit}
                </button>
              ))}
            </div>
          </div>

          <div className="">
            <h5 className="font-semibold text-xl mb-3">Job Description</h5>
            <div className="flex flex-wrap gap-2 mb-16 w-full">
              <ReactQuill
                onChange={handleEditorChange}
                value={descriptionEditor}
                theme="snow"
                className="w-full"
              />
            </div>
          </div>

          {/* <Button>
            Post Job
            <ChevronsRight />
          </Button> */}
          <ButtonWithLoading label="Post Job" isLoading={isLoading} />
        </form>
      </Form>
    </div>
  );
}
