'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiGlobe,
  FiLogOut,
  FiLoader,
  FiExternalLink,
} from 'react-icons/fi';
import { BlogPost } from '@/types';

export default function AdminDashboard() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    setIsAuthenticated(true);
    setIsCheckingAuth(false);
    fetchPosts();
  }, [router]);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts');
      const data = await response.json();
      setPosts(data.posts || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu yazıyı silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPosts(posts.filter((post) => post._id !== id));
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleToggleStatus = async (post: BlogPost) => {
    try {
      const newStatus = post.status === 'published' ? 'draft' : 'published';
      const response = await fetch(`/api/posts/${post._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...post,
          status: newStatus,
        }),
      });

      if (response.ok) {
        fetchPosts();
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  // Show loading while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FiLoader className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  // Don't render anything if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FiGlobe className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Danışmanım
                </h1>
                <p className="text-sm text-gray-500">Admin Panel</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-primary transition-colors"
              >
                <FiExternalLink className="w-5 h-5" />
                <span className="hidden sm:inline">Siteyi Görüntüle</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-red-600 transition-colors"
              >
                <FiLogOut className="w-5 h-5" />
                <span>Çıkış</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground">
              Blog Yazıları
            </h2>
            <p className="text-gray-600 mt-1">
              Tüm blog yazılarınızı yönetin
            </p>
          </div>
          <Link
            href="/admin/posts/new"
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-primary-light text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            <FiPlus className="w-5 h-5" />
            <span>Yeni Yazı</span>
          </Link>
        </div>

        {/* Posts Table */}
        {isLoading ? (
          <div className="text-center py-12">
            <FiLoader className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
            <p className="text-gray-500">Yükleniyor...</p>
          </div>
        ) : posts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center"
          >
            <FiEdit2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Henüz yazı yok
            </h3>
            <p className="text-gray-500 mb-6">
              İlk blog yazınızı oluşturarak başlayın
            </p>
            <Link
              href="/admin/posts/new"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-primary-light text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
            >
              <FiPlus className="w-5 h-5" />
              <span>Yeni Yazı Oluştur</span>
            </Link>
          </motion.div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Başlık
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Durum
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Güncelleme
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {posts.map((post) => (
                  <tr key={post._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {post.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        /blog/{post.slug}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleStatus(post)}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          post.status === 'published'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {post.status === 'published' ? 'Yayında' : 'Taslak'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {post.updatedAt
                        ? new Date(post.updatedAt).toLocaleDateString('tr-TR')
                        : '-'}
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-3">
                        {post.status === 'published' && (
                          <Link
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            className="text-gray-400 hover:text-gray-600"
                            title="Yazıyı Görüntüle"
                          >
                            <FiExternalLink className="w-5 h-5" />
                          </Link>
                        )}
                        <Link
                          href={`/admin/posts/${post._id}`}
                          className="text-primary hover:text-primary-dark"
                          title="Düzenle"
                        >
                          <FiEdit2 className="w-5 h-5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(post._id!)}
                          className="text-red-600 hover:text-red-900"
                          title="Sil"
                        >
                          <FiTrash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
