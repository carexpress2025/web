import { siteMetadata } from '../metadata';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Auth',
  description: siteMetadata.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}
