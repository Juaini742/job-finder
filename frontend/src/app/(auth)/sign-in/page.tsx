import Image from "next/image";
import MeetingImage from "Img/meet.jpg";
import SignInForm from "./sign-in-form";
import AppLogo from "@/components/AppLogo";

export default function page() {
  return (
    <div className="flex justify-between items-center gap-10">
      <div className="w-full md:w-[60rem] lg:w-[70rem] flex flex-col border p-5 pt-10 rounded">
        <AppLogo />
        <SignInForm />
      </div>

      <div className="relative w-full overflow-hidden hidden md:block">
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-black/25 w-full" />
        <Image src={MeetingImage} alt="meeting" />
      </div>
    </div>
  );
}
