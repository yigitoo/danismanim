import type { Metadata } from 'next';
import AdminNavbar from '@/components/AdminNavbar';

export const metadata: Metadata = {
  title: 'Admin Panel | Danışmanım',
  description: 'Danışmanım Admin Panel',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <AdminNavbar />
      <main>{children}</main>
    </div>
  );
}
