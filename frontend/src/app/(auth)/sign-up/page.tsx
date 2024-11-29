import Image from "next/image";
import FormContainer from "./form-container";
import MeetingImage from "Img/meet.jpg";

export default function page() {
  return (
    <div className="flex justify-between items-center gap-10">
      <FormContainer />
      <div className="relative w-full overflow-hidden hidden md:block">
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-black/25 w-full" />
        <Image src={MeetingImage} alt="meeting" />
      </div>
    </div>
  );
}
