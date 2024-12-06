"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CvSchema, CvValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SkillInput from "./skill-input";
import ExperienceInput from "./experience-input";
import EducationInput from "./education-input";
import CertificationInput from "./ceritication-input";
import HobbyInput from "./hobby-input";
import LanguageInput from "./language-input";
import { useToast } from "@/hooks/use-toast";
import { useGetCvQuery, useUpdateCvMutation } from "@/store/slices/cvSlice";
import ButtonWithLoading from "@/components/ButtonWithLoading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, MoveLeft } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

export default function CvForm() {
  const { toast } = useToast();
  const router = useRouter();
  const { data } = useGetCvQuery();
  const [updateCv, { isLoading }] = useUpdateCvMutation();
  const cv = data?.data;
  const form = useForm<CvValues>({
    resolver: zodResolver(CvSchema),
    defaultValues: {
      fullName: cv?.fullName ?? "",
      birthDay: cv?.birthDay ? new Date(cv.birthDay) : new Date(),
      nationality: cv?.nationality ?? "",
      maritalStatus: cv?.maritalStatus ?? "",
      gender: cv?.gender ?? "",
      address: cv?.address ?? "",
      summary: cv?.summary ?? "",
      coverLetter: cv?.coverLetter ?? "",
      profilePictureUrl: cv?.profilePictureUrl ?? "",
      resumeUrl: cv?.resumeUrl ?? "",
      websiteUrl: cv?.websiteUrl ?? "",
      skills: cv?.skills ?? [],
      experience: cv?.experience ?? [],
      education: cv?.education ?? [],
      certifications: cv?.certifications ?? [],
      languages: cv?.languages ?? [],
    },
  });

  const { setValue, watch } = form;
  const birithDay = watch("birthDay");
  const summary = watch("summary");

  const handleEditorChangeSummary = (value: string): void => {
    setValue("summary", value);
  };

  const coverLetter = watch("coverLetter");
  const handleEditorChangeCoverLetter = (value: string): void => {
    setValue("coverLetter", value);
  };

  const onSubmit = async (value: CvValues) => {
    await updateCv(value)
      .unwrap()
      .then(() =>
        toast({
          title: "Added cv successfully",
          description: "Your CV has been added successfully",
        })
      )
      .catch(() =>
        toast({
          variant: "destructive",
          title: "Error adding cv",
          description: "Failed to add your CV",
        })
      );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 relative"
      >
        <Button
          type="button"
          onClick={() => router.back()}
          className="absolute top-0 right-0"
        >
          <MoveLeft className="size-6" />
          back
        </Button>
        {/* Personal Information Group */}
        <div className="card p-6 shadow-md rounded-lg">
          <h2 className="text-lg font-bold mb-4">Personal Information</h2>
          <p className="text-sm text-gray-600 mb-6">
            Please provide your personal details accurately.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              name="fullName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="birthDay"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Birth Day</FormLabel>
                  <FormControl>
                    <div className="w-full">
                      {/* <Input type="date" {...field} /> */}
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !birithDay && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2" />
                            {birithDay ? (
                              format(birithDay, "PPP")
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
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="nationality"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nationality</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your nationality" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="maritalStatus"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marital Status</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a Marital Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SINGLE">Single</SelectItem>
                        <SelectItem value="MARRIED">Merried</SelectItem>
                        <SelectItem value="DIVORCED">Divorced</SelectItem>
                        <SelectItem value="WIDOWeED">WIDOWeED</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="gender"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MALE">Male</SelectItem>
                        <SelectItem value="FEMALE">Female</SelectItem>
                        <SelectItem value="PREFER_NOT_TO_SAY">
                          Prefer Not To say
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="address"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Summary and Cover Letter Group */}
        <div className="card p-6 shadow-md rounded-lg">
          <h2 className="text-lg font-bold mb-4">Professional Summary</h2>
          <p className="text-sm text-gray-600 mb-6">
            Provide a brief summary about yourself and your cover letter.
          </p>

          <div className="space-y-6">
            <div className="">
              <Label>Summary</Label>
              <div className="flex flex-wrap gap-2 mb-16 w-full mt-3">
                <ReactQuill
                  onChange={handleEditorChangeSummary}
                  value={summary}
                  theme="snow"
                  className="w-full"
                />
              </div>
            </div>

            <div className="">
              <Label>Cover Letter</Label>
              <div className="flex flex-wrap gap-2 mb-16 w-full mt-3">
                <ReactQuill
                  onChange={handleEditorChangeCoverLetter}
                  value={coverLetter}
                  theme="snow"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* URLs Group */}
        <div className="card p-6 shadow-md rounded-lg">
          <h2 className="text-lg font-bold mb-4">Additional Information</h2>
          <p className="text-sm text-gray-600 mb-6">
            Provide any additional links related to your profile.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              name="profilePictureUrl"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Picture URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the URL of your profile picture"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="resumeUrl"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resume URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the URL of your resume"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="websiteUrl"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your personal or professional website URL"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* SKILL */}
        <SkillInput setValue={setValue} />
        <ExperienceInput />
        <EducationInput />
        <CertificationInput />
        <HobbyInput />
        <LanguageInput />

        {/* <Button>Submit</Button> */}
        <ButtonWithLoading label="Submit" isLoading={isLoading} />
      </form>
    </Form>
  );
}
