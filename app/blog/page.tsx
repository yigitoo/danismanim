'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FiCalendar, FiClock, FiArrowRight, FiBookOpen } from 'react-icons/fi';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionWrapper from '@/components/SectionWrapper';
import { BlogPost } from '@/types';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts');
      const data = await response.json();
      // Only show published posts
      const publishedPosts = (data.posts || []).filter(
        (post: BlogPost) => post.status === 'published'
      );
      setPosts(publishedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
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

  const getExcerpt = (content: string, maxLength: number = 150) => {
    const plainText = content.replace(/<[^>]+>/g, '').replace(/[#*_`]/g, '');
    if (plainText.length <= maxLength) return plainText;
    return plainText.substring(0, maxLength).trim() + '...';
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-sm font-semibold text-primary mb-6"
            >
              Blog
            </motion.span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl text-center font-extrabold text-foreground mb-6 leading-[1.1]">
              Yurtdışı Eğitim{' '}
              <span className="text-primary">Rehberi</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Yurtdışı eğitim, vize süreçleri, ülke rehberleri ve daha fazlası
              hakkında güncel bilgiler ve ipuçları.
            </p>
          </motion.div>
        </div>
      </section>

      {/* BLOG POSTS */}
      <SectionWrapper>
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : posts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="inline-flex p-6 bg-primary/10 rounded-full mb-6">
              <FiBookOpen className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Henüz blog yazısı yok
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Yakında yurtdışı eğitim hakkında faydalı içerikler paylaşacağız.
              Takipte kalın!
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.article
                key={post._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-primary/20">
                    {/* Banner Image or Placeholder */}
                    <div className="relative h-48 overflow-hidden">
                      {post.bannerImage ? (
                        <Image
                          src={post.bannerImage}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="relative h-full bg-gradient-to-br from-primary via-primary-light to-secondary">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <FiBookOpen className="w-16 h-16 text-white/30" />
                          </div>
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-6 -mt-8 relative">
                      {/* Meta */}
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <span className="flex items-center gap-1">
                          <FiCalendar className="w-4 h-4" />
                          {post.createdAt && formatDate(post.createdAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <FiClock className="w-4 h-4" />
                          {getReadingTime(post.content)}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                        {getExcerpt(post.content)}
                      </p>

                      {/* Read More */}
                      <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                        <span>Devamını Oku</span>
                        <FiArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </SectionWrapper>

      {/* CTA Section */}
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
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-foreground rounded-full font-semibold hover:shadow-xl transition-all"
            >
              <span>Ücretsiz Danışmanlık</span>
              <FiArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>
      </SectionWrapper>

      <Footer />
    </div>
  );
}
