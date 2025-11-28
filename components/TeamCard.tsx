'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiInstagram, FiLinkedin, FiExternalLink } from 'react-icons/fi';

interface TeamMember {
  name: string;
  title: string;
  bio: string;
  instagram?: string;
  linkedin?: string;
  image?: string;
}

interface TeamCardProps {
  member: TeamMember;
  index: number;
}

export default function TeamCard({ member, index }: TeamCardProps) {
  const initials = member.name.split(' ').map(n => n[0]).join('');

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-primary/20 shadow-lg hover:shadow-2xl transition-all duration-500"
    >
      <div className="flex flex-col lg:flex-row">
        {/* Image/Avatar Section */}
        <div className="relative lg:w-2/5 h-80 lg:h-auto overflow-hidden flex-shrink-0">
          {member.image ? (
            <div className="relative w-full h-full">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-light to-secondary opacity-90" />

              {/* Pattern Overlay */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                  backgroundSize: '20px 20px'
                }} />
              </div>

              {/* Floating shapes */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-8 right-8 w-16 h-16 bg-white/10 rounded-2xl rotate-12"
              />
              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-12 left-8 w-12 h-12 bg-white/10 rounded-xl -rotate-12"
              />

              {/* Initials */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-xl scale-125" />
                  <div className="relative w-28 h-28 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
                    <span className="text-4xl font-bold text-white">{initials}</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Content Section */}
        <div className="relative flex-1 p-8 lg:p-10">
          {/* Name & Title */}
          <div className="mb-6">
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
              {member.name}
            </h3>
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full">
              <span className="text-sm font-semibold text-primary">
                {member.title}
              </span>
            </div>
          </div>

          {/* Bio - Full Text */}
          <div className="mb-8">
            <p className="text-gray-700 leading-relaxed text-base">
              {member.bio}
            </p>
          </div>

          {/* Social Links */}
          {(member.instagram || member.linkedin) && (
            <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-gray-100">
              {member.instagram && (
                <a
                  href={member.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 bg-gray-50 hover:bg-gradient-to-r hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F77737] rounded-xl text-gray-600 hover:text-white transition-all duration-300 group/link shadow-sm hover:shadow-md"
                >
                  <FiInstagram className="w-5 h-5" />
                  <span className="text-sm font-medium">Instagram</span>
                  <FiExternalLink className="w-4 h-4 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300" />
                </a>
              )}
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 bg-gray-50 hover:bg-[#0A66C2] rounded-xl text-gray-600 hover:text-white transition-all duration-300 group/link shadow-sm hover:shadow-md"
                >
                  <FiLinkedin className="w-5 h-5" />
                  <span className="text-sm font-medium">LinkedIn</span>
                  <FiExternalLink className="w-4 h-4 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
