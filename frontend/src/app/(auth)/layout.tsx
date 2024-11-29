export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full flex flex-col justify-center overflow-hidden">
      <main className="container">{children}</main>
    </div>
  );
}
