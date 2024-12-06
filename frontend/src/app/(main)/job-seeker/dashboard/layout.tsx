import DashboardNavbar from "./dashboard-navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <DashboardNavbar />
      {/* Main Content */}
      <main className="p-4 pl-5 border-l-2 w-full overflow-auto">
        {children}
      </main>
    </div>
  );
}
