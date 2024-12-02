import DashboardNavbar from "./dashboard-navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-[calc(90vh-30px)]">
      {/* Sidebar */}
      <DashboardNavbar />

      {/* Main Content */}
      <main className="p-4 pl-5 border-l w-full">{children} </main>
    </div>
  );
}
