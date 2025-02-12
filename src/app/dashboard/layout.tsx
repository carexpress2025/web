import Sidebar from '@/components/layout/sidebar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      {children}
    </div>
  );
}
