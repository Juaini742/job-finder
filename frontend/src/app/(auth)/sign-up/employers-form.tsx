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
import Image from "next/image";
import { useForm } from "react-hook-form";
import FbImg from "Img/fb.png";
import GoogleImg from "Img/g.png";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpShema, SignUpValeus } from "@/lib/validation";
import Link from "next/link";
import { useSignUpMutation } from "@/store/slices/useUserSlice";
import { useToast } from "@/hooks/use-toast";

export default function EmployersForm() {
  const { toast } = useToast();
  const [signUp, { isLoading }] = useSignUpMutation();
  const form = useForm<SignUpValeus>({
    resolver: zodResolver(SignUpShema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      password: "",
      role: "RECRUITER",
    },
  });

  const onSubmit = async (data: SignUpValeus) => {
    await signUp(data)
      .unwrap()
      .then(() => {
        toast({
          title: "Sign up success",
          description: "You can now access your account",
        });
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        toast({
          variant: "destructive",
          title: "Sign up Failure",
          description: "There was an error, please try again",
        });
      });
  };

  return (
    <div>
      <h3 className="mt-10 text-xl text-center">Employers Form</h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
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
          <Button disabled={isLoading}>Sign Up as Employers</Button>
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
