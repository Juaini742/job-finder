import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BriefcaseBusiness, SearchIcon } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="h-20 flex items-center">
      <div className="container flex flex-col md:flex-row justify-between items-center">
        <div className="flex-1 flex flex-col md:flex-row items-center gap-3">
          <h1 className="flex-2 flex gap-2">
            <BriefcaseBusiness />
            <span className="font-semibold text-xl">Job FinderX</span>
          </h1>
          <Card className="flex-1 flex items-center gap-3 bg-none border-none shadow-none">
            <div className="flex items-center flex-1 gap-3 border px-2 py-1 rounded">
              <div className="font-semibold">Indonesia</div>
              <div className="flex-1 flex gap-2 items-center w-[20rem]">
                <SearchIcon className="size-5" />
                <input
                  className="w-full border-none outline-none py-1"
                  placeholder="Search title"
                />
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <Link href="/sign-up">
                <Button variant="outline">Sign Up</Button>
              </Link>
              <Link href="/sign-in">
                <Button>Sign In</Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </header>
  );
}
