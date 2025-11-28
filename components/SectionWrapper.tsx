import { ReactNode } from 'react';

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  gradient?: boolean;
  dark?: boolean;
  id?: string;
}

export default function SectionWrapper({
  children,
  className = '',
  gradient = false,
  dark = false,
  id,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`relative py-16 md:py-20 lg:py-24 overflow-hidden ${
        dark
          ? 'bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white'
          : gradient
          ? 'bg-mesh bg-muted'
          : 'bg-background'
      } ${className}`}
    >
      {/* Decorative elements for gradient sections */}
      {gradient && !dark && (
        <>
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </>
      )}

      {dark && (
        <>
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-secondary/10 rounded-full blur-3xl" />
        </>
      )}

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        {children}
      </div>
    </section>
  );
}
