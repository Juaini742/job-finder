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
import { SignInShema, SignInValeus } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FbImg from "Img/fb.png";
import GoogleImg from "Img/g.png";
import Image from "next/image";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useSignInMutation } from "@/store/slices/useUserSlice";

export default function SignInForm() {
  const { toast } = useToast();
  const [signIn, { isLoading }] = useSignInMutation();
  const form = useForm<SignInValeus>({
    resolver: zodResolver(SignInShema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInValeus) => {
    await signIn(data)
      .unwrap()
      .then(() => {
        toast({
          title: "Sign in success",
          description: "You can now access your account",
        });
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        toast({
          variant: "destructive",
          title: "Sign in Failure",
          description: "There was an error, please try again",
        });
      });
  };

  return (
    <div>
      <h3 className="mt-10 text-xl text-center">Sign In Form</h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
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
            <span>Dont have an account? </span>
            <Link href="/sign-up" className="hover:underline">
              click here to sign up
            </Link>
          </div>
          <Button disabled={isLoading}>Sign In</Button>
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
