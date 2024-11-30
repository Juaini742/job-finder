import React from "react";
import Navbar from "./_layout/Navbar";
import Header from "./_layout/Header";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ScrollArea className="h-screen">
      <Navbar />
      <main>
        <Header />
        <div className="container">{children}</div>
      </main>
    </ScrollArea>
  );
}
