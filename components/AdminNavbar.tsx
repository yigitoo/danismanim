'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiHome, FiCalendar, FiList, FiMessageCircle, FiLogOut, FiMenu, FiX, FiExternalLink } from 'react-icons/fi';

export default function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  const navItems = [
    { href: '/admin/dashboard', icon: FiHome, label: 'Ana Sayfa' },
    { href: '/admin/calendar', icon: FiCalendar, label: 'Takvim' },
    { href: '/admin/meetings', icon: FiList, label: 'Randevular' },
    { href: '/admin/chat', icon: FiMessageCircle, label: 'Canlı Destek' },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/admin/dashboard" className="flex items-center space-x-3">
            <div className="relative w-10 h-10 bg-gradient-to-br from-primary-dark to-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-2xl italic">D</span>
              <div className="absolute top-0 right-0 w-2 h-2 bg-white/20 rounded-bl-full" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Danışmanım</h1>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-muted hover:text-primary'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-primary transition-colors"
            >
              {sidebarOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>

            <Link
              href="/"
              target="_blank"
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-primary transition-colors"
            >
              <span className="text-sm">Siteyi Görüntüle</span>
            </Link>
            <button
              onClick={handleLogout}
              className="hidden md:flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <FiLogOut className="w-5 h-5" />
              <span>Çıkış</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`md:hidden fixed top-0 left-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10 bg-gradient-to-br from-primary-dark to-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-2xl italic">D</span>
                <div className="absolute top-0 right-0 w-2 h-2 bg-white/20 rounded-bl-full" />
              </div>
              <div>
                <h1 className="text-base font-bold text-foreground">Danışmanım</h1>
                <p className="text-xs text-gray-500">Admin Panel</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1 text-gray-500 hover:text-gray-700"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <div className="p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-muted hover:text-primary'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-muted rounded-lg transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <FiExternalLink className="w-5 h-5" />
            <span className="font-medium">Siteyi Görüntüle</span>
          </Link>
          <button
            onClick={() => {
              handleLogout();
              setSidebarOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <FiLogOut className="w-5 h-5" />
            <span className="font-medium">Çıkış</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
