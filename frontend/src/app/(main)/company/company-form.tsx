"use client";

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CompanySchema, CompanyValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function CompantForm() {
  const form = useForm<CompanyValues>({
    resolver: zodResolver(CompanySchema),
    defaultValues: {
      name: "",
      description: "",
      location: "",
      industry: "",
      logo_url: "",
      founded_in: new Date(),
      organization_type: "PRIVATE",
      team_size: 0,
      website_url: "",
      phone: "",
      email: "",
    },
  });
  const { handleSubmit, control, watch, setValue } = form;
  const descriptionEditor = watch("description");

  const handleEditorChange = (value: string): void => {
    setValue("description", value);
  };

  const onSubmit = (data: CompanyValues): void => {
    console.log(data);
  };
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Company Registration Form
      </h1>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter company name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <div className="">
            <h5 className="font-semibold text-xl mb-3">Description</h5>
            <div className="flex flex-wrap gap-2 mb-16 w-full">
              <ReactQuill
                onChange={handleEditorChange}
                value={descriptionEditor}
                theme="snow"
                className="w-full"
              />
            </div>
          </div>

          {/* Location */}
          <FormField
            control={control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter company location" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Industry */}
          <FormField
            control={control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Industry</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter industry type" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Logo URL */}
          <FormField
            control={control}
            name="logo_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logo URL</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter logo URL" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Founded In */}
          <FormField
            control={control}
            name="founded_in"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Founded Date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    value={format(field.value || new Date(), "yyyy-MM-dd")}
                    onChange={(e) => field.onChange(new Date(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Organization Type */}
          <FormField
            control={control}
            name="organization_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization Type</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select organization type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PRIVATE">Private</SelectItem>
                      <SelectItem value="PUBLIC">Public</SelectItem>
                      <SelectItem value="GOVERNMENT">Government</SelectItem>
                      <SelectItem value="NGO">NGO</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Team Size */}
          <FormField
            control={control}
            name="team_size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Team Size</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder="Enter team size"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Website URL */}
          <FormField
            control={control}
            name="website_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website URL</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter website URL" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone */}
          <FormField
            control={control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter phone number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter email address" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <div className="mt-4">
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
