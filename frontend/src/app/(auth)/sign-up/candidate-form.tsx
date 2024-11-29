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
import { SignUpShema, SignUpValeus } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FbImg from "Img/fb.png";
import GoogleImg from "Img/g.png";
import Image from "next/image";
import Link from "next/link";

export default function CandidateForm() {
  const form = useForm<SignUpValeus>({
    resolver: zodResolver(SignUpShema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      role: "CANDIDATE",
    },
  });

  return (
    <div>
      <h3 className="mt-10 text-xl text-center">Candidate Form</h3>
      <Form {...form}>
        <form className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Full Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} placeholder="Email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} placeholder="******" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="text-xs">
            <span>Already have an account? </span>
            <Link href="/sign-in" className="hover:underline">
              click here to sign in
            </Link>
          </div>
          <Button>Sign Up Candidate</Button>
        </form>
      </Form>
      <div className="flex items-center gap-4 mt-5">
        <div className="bg-gray-600 h-[1px] w-full" />
        <p>OR</p>
        <div className="bg-gray-600 h-[1px] w-full" />
      </div>
      <div className="flex gap-3">
        <Button variant="outline" className="w-full">
          <Image src={FbImg} alt="facebook" className="w-5" />
          Sign Up with Facebook
        </Button>
        <Button variant="outline" className="w-full">
          <Image src={GoogleImg} alt="Google" className="w-5" />
          Sign Up with Google
        </Button>
      </div>
    </div>
  );
}
