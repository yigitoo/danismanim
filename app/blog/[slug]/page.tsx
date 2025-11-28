'use client';

import { useState, useEffect, use } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  FiArrowLeft,
  FiCalendar,
  FiClock,
  FiShare2,
  FiBookOpen,
} from 'react-icons/fi';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionWrapper from '@/components/SectionWrapper';
import { BlogPost } from '@/types';
import ReactMarkdown from 'react-markdown';

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/posts/slug/${slug}`);
      if (response.status === 404) {
        setNotFound(true);
        setIsLoading(false);
        return;
      }
      const data = await response.json();
      setPost(data.post);
    } catch (error) {
      console.error('Error fetching post:', error);
      setNotFound(true);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} dk okuma`;
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link kopyalandı!');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-40 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex p-6 bg-primary/10 rounded-full mb-6">
              <FiBookOpen className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Yazı Bulunamadı
            </h1>
            <p className="text-gray-600 mb-8">
              Aradığınız blog yazısı mevcut değil veya kaldırılmış olabilir.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-colors"
            >
              <FiArrowLeft className="w-5 h-5" />
              <span>Bloga Dön</span>
            </Link>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-36 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
            >
              <FiArrowLeft className="w-5 h-5" />
              <span>Tüm Yazılar</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Meta */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500 mb-6">
              <span className="flex items-center gap-1.5">
                <FiCalendar className="w-4 h-4" />
                {post?.createdAt && formatDate(post.createdAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <FiClock className="w-4 h-4" />
                {post && getReadingTime(post.content)}
              </span>
            </div>

            {/* Title - Centered and Bold */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-8 leading-tight max-w-4xl mx-auto">
              {post?.title}
            </h1>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
            >
              <FiShare2 className="w-4 h-4" />
              <span>Paylaş</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* BANNER IMAGE */}
      {post?.bannerImage && (
        <section className="pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10"
          >
            <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={post.bannerImage}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                priority
              />
            </div>
          </motion.div>
        </section>
      )}

      {/* CONTENT - In a Card */}
      <section className="py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10"
        >
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 lg:p-16">
            <article className="prose prose-lg max-w-none prose-headings:text-foreground prose-headings:font-bold prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-primary prose-a:font-semibold prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-strong:font-bold prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:my-2 prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:py-3 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-code:text-primary prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-img:rounded-xl prose-img:shadow-lg">
              <ReactMarkdown>{post?.content || ''}</ReactMarkdown>
            </article>
          </div>
        </motion.div>
      </section>

      {/* Related Posts / CTA */}
      <SectionWrapper dark>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Yurtdışı eğitim planınız için yardıma mı ihtiyacınız var?
          </h2>
          <p className="text-gray-300 mb-8">
            Uzman danışmanlarımızla ücretsiz görüşme yapın ve eğitim hedeflerinizi
            birlikte planlayalım.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-foreground rounded-full font-semibold hover:shadow-xl transition-all"
              >
                <span>Ücretsiz Danışmanlık</span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white rounded-full font-semibold hover:bg-white/20 transition-all border border-white/20"
              >
                <span>Diğer Yazılar</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </SectionWrapper>

      <Footer />
    </div>
  );
}
