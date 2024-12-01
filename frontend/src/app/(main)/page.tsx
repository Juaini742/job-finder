import { Card } from "@/components/ui/card";
import InterviewImage from "Img/interview.svg";
import { BriefcaseBusiness, Building2, Users } from "lucide-react";
import Image from "next/image";

const cards = [
  {
    count: "1,32,53",
    icon: <BriefcaseBusiness />,
    name: "Live Job",
  },
  {
    count: "97,20",
    icon: <Building2 />,
    name: "Companies",
  },
  {
    count: "100,20",
    icon: <Users />,
    name: "Candidates",
  },
  {
    count: "97,20",
    icon: <BriefcaseBusiness />,
    name: "New Job",
  },
];
export default async function Home() {
  // const store = makeStore();
  // const result = await store.dispatch(userApi.endpoints.getUser.initiate());
  // console.log("RESULT ", result);
  return (
    <>
      <div className="container">
        <section className="h-[20rem] md:h-[35rem] flex flex-col justify-center">
          <div className="flex justify-between items-center">
            <div className="flex-1 flex flex-col gap-2">
              <h2 className="text-xl md:text-4xl font-bold md:w-[39rem]">
                Find a job that suits your interest and skills.
              </h2>
              <p className="text font-semibold">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. A,
                ipsum.
              </p>
              <p className="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </p>
            </div>
            <div className="">
              <Image
                src={InterviewImage}
                alt="interview"
                className="w-[15rem] md:w-[25rem]"
              />
            </div>
          </div>
          <div className="flex gap-2 w-full mt-5">
            {cards.map((item, index) => (
              <Card
                key={index}
                className="flex-1 flex gap-5 items-center px-4 py-2"
              >
                {item.icon}
                <div className="flex flex-col">
                  <span className="font-semibold">{item.count}</span>
                  <span className="text-sm">{item.name}</span>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
