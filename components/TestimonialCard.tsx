'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiStar } from 'react-icons/fi';
import { BiSolidQuoteLeft } from 'react-icons/bi';

interface TestimonialCardProps {
  name: string;
  testimonial: string;
  image: string;
  index: number;
}

export default function TestimonialCard({ name, testimonial, image, index }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-primary/20"
    >
      {/* Quote Icon */}
      <div className="absolute -top-4 -left-4 p-3 bg-gradient-to-br from-primary to-primary-light rounded-2xl shadow-lg shadow-primary/30">
        <BiSolidQuoteLeft className="w-5 h-5 text-white" />
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <FiStar key={i} className="w-4 h-4 text-secondary fill-secondary" />
        ))}
      </div>

      {/* Testimonial */}
      <p className="text-gray-600 leading-relaxed mb-6 line-clamp-5 group-hover:line-clamp-none transition-all duration-300">
        &ldquo;{testimonial}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
        <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-primary/20 ring-offset-2">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="font-bold text-foreground">{name}</h4>
          <p className="text-sm text-primary">Mezun Öğrenci</p>
        </div>
      </div>

      {/* Hover gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
}
