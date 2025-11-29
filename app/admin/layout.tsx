'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import AdminNavbar from '@/components/AdminNavbar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('adminToken');

    if (!token && !isLoginPage) {
      // Not authenticated and not on login page - redirect to login
      router.push('/admin/login');
    } else if (token && isLoginPage) {
      // Authenticated but on login page - redirect to dashboard
      router.push('/admin/dashboard');
    } else {
      setIsAuthenticated(true);
    }

    setIsLoading(false);
  }, [pathname, isLoginPage, router]);

  // Show loading or nothing while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Yükleniyor...</div>
      </div>
    );
  }

  // If not authenticated and not on login page, don't render anything
  // (will redirect in useEffect)
  if (!isAuthenticated && !isLoginPage) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {!isLoginPage && <AdminNavbar />}
      <main>{children}</main>
    </div>
  );
}
