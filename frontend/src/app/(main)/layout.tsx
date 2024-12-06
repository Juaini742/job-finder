import React from "react";
import Navbar from "./_layout/Navbar";
import Header from "./_layout/Header";
import Footer from "./footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* Navbar */}
      <Navbar />
      {/* Main Content */}
      <main className="mt-14 h-full flex-1">
        <Header />
        <div className="container">{children}</div>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}
