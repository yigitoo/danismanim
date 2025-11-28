'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiSave, FiArrowLeft, FiLoader } from 'react-icons/fi';
import Link from 'next/link';
import MarkdownEditor from '@/components/admin/MarkdownEditor';
import ImageUpload from '@/components/admin/ImageUpload';

export default function PostEditorPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;
  const isNew = postId === 'new';

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [bannerImage, setBannerImage] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
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

    if (!isNew) {
      fetchPost();
    }
  }, [postId, isNew, router]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/posts/${postId}`);
      const data = await response.json();

      if (data.post) {
        setTitle(data.post.title);
        setSlug(data.post.slug);
        setContent(data.post.content);
        setBannerImage(data.post.bannerImage || '');
        setStatus(data.post.status);
      }
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (isNew) {
      setSlug(generateSlug(value));
    }
  };

  const handleSave = async () => {
    if (!title || !slug || !content) {
      setMessage('Lütfen tüm alanları doldurun');
      return;
    }

    setIsSaving(true);
    setMessage('');

    try {
      const url = isNew ? '/api/posts' : `/api/posts/${postId}`;
      const method = isNew ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          slug,
          content,
          bannerImage,
          status,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Yazı başarıyla kaydedildi!');
        setTimeout(() => {
          router.push('/admin/dashboard');
        }, 1500);
      } else {
        setMessage(data.error || 'Bir hata oluştu');
      }
    } catch (error) {
      console.error('Error saving post:', error);
      setMessage('Bir hata oluştu');
    } finally {
      setIsSaving(false);
    }
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
            <div className="flex items-center space-x-4">
              <Link
                href="/admin/dashboard"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FiArrowLeft className="w-6 h-6 text-gray-600" />
              </Link>
              <h1 className="text-2xl font-bold text-foreground">
                {isNew ? 'Yeni Yazı' : 'Yazıyı Düzenle'}
              </h1>
            </div>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`flex items-center space-x-2 px-6 py-3 bg-linear-to-r from-primary to-primary-light text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 ${
                isSaving ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'
              }`}
            >
              {isSaving ? (
                <FiLoader className="w-5 h-5 animate-spin" />
              ) : (
                <FiSave className="w-5 h-5" />
              )}
              <span>{isSaving ? 'Kaydediliyor...' : 'Kaydet'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 space-y-6"
        >
          {message && (
            <div
              className={`p-4 rounded-lg ${
                message.includes('başarıyla')
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}
            >
              {message}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Başlık *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-lg"
              placeholder="Yazı başlığı..."
            />
          </div>

          <div>
            <ImageUpload
              value={bannerImage}
              onChange={setBannerImage}
              label="Banner Görseli"
              helperText="Önerilen boyut: 1200x630px (JPG, PNG, WebP, GIF - Max 5MB)"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug *
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="yazi-slug"
              />
              <p className="mt-1 text-sm text-gray-500">
                URL: /blog/{slug || 'yazi-slug'}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Durum
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white"
              >
                <option value="draft">Taslak</option>
                <option value="published">Yayında</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              İçerik *
            </label>
            <MarkdownEditor
              value={content}
              onChange={setContent}
              placeholder="Blog içeriğinizi buraya yazın..."
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
