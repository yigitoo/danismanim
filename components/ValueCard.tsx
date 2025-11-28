'use client';

import { motion } from 'framer-motion';
import { IconType } from 'react-icons';

interface ValueCardProps {
  icon: IconType;
  title: string;
  description: string;
  index: number;
}

export default function ValueCard({ icon: Icon, title, description, index }: ValueCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group relative p-8 bg-white rounded-2xl border border-gray-100 hover:border-primary/20 transition-all duration-300 hover:shadow-xl"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary-light/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative flex flex-col items-center text-center space-y-5">
        {/* Icon Container */}
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
          <div className="relative p-4 bg-gradient-to-br from-primary to-primary-light rounded-2xl shadow-lg shadow-primary/20 group-hover:shadow-xl group-hover:shadow-primary/30 transition-all duration-300">
            <Icon className="w-7 h-7 text-white" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed text-sm">
          {description}
        </p>

        {/* Decorative line */}
        <div className="w-12 h-1 bg-gradient-to-r from-primary to-primary-light rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </motion.div>
  );
}
