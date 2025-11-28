'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiGlobe, FiInstagram, FiLinkedin, FiArrowRight } from 'react-icons/fi';

export default function Footer() {
  const countries = [
    { name: 'New Zealand', flag: '🇳🇿' },
    { name: 'United Kingdom', flag: '🇬🇧' },
    { name: 'Dubai', flag: '🇦🇪' },
    { name: 'Malta', flag: '🇲🇹' },
    { name: 'USA', flag: '🇺🇸' },
    { name: 'Germany', flag: '🇩🇪' },
    { name: 'Singapore', flag: '🇸🇬' },
  ];

  const quickLinks = [
    { href: '/', label: 'Ana Sayfa' },
    { href: '/about', label: 'Hakkımızda' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'İletişim' },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      {/* Top CTA Section */}
      <div className="relative border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                Eğitim yolculuğunuza başlayın
              </h3>
              <p className="text-gray-400">
                Ücretsiz danışmanlık görüşmesi için hemen iletişime geçin.
              </p>
            </div>
            <Link
              href="/contact"
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary-light text-white rounded-full font-semibold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 hover:-translate-y-1"
            >
              <span>İletişime Geçin</span>
              <FiArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-gradient-to-br from-primary to-primary-light rounded-xl">
                <FiGlobe className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold">Danışmanım</span>
                <p className="text-xs text-gray-400 tracking-wider uppercase">Eğitim Danışmanlığı</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Yeni Zelanda başta olmak üzere dünyanın farklı ülkelerinde lise, üniversite ve dil okulu fırsatları için profesyonel eğitim danışmanlığı.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/kartalcihadgultekin/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/5 hover:bg-primary rounded-xl transition-all duration-300 group"
              >
                <FiInstagram className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://nz.linkedin.com/in/kartal-cihad-gultekin-66a72069"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/5 hover:bg-primary rounded-xl transition-all duration-300 group"
              >
                <FiLinkedin className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">İletişim</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-white/5 rounded-lg mt-0.5">
                  <FiMapPin className="w-4 h-4 text-primary-light" />
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Çukurcuma Caddesi, Firuzağa Mah. No:52,<br />
                  Beyoğlu, İstanbul
                </p>
              </div>
              <a
                href="tel:+905452797664"
                className="flex items-center space-x-3 group"
              >
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <FiPhone className="w-4 h-4 text-primary-light" />
                </div>
                <span className="text-sm text-gray-400 group-hover:text-white transition-colors">+90 545 279 7664</span>
              </a>
              <a
                href="mailto:info@danismanim.co"
                className="flex items-center space-x-3 group"
              >
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <FiMail className="w-4 h-4 text-primary-light" />
                </div>
                <span className="text-sm text-gray-400 group-hover:text-white transition-colors">info@danismanim.co</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Hızlı Erişim</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group"
                  >
                    <FiArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary-light" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Countries */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Çalıştığımız Ülkeler</h4>
            <div className="flex flex-wrap gap-2">
              {countries.map((country) => (
                <span
                  key={country.name}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-full text-xs font-medium text-gray-300 hover:bg-white/10 transition-colors cursor-default"
                >
                  <span>{country.flag}</span>
                  <span>{country.name}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Danışmanım. Tüm hakları saklıdır.
            </p>
            <p className="text-sm text-gray-500">
              Yurtdışı Eğitim Danışmanlık Hizmetleri
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
