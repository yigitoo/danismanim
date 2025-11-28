'use client';

import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiClock, FiMessageCircle, FiSend } from 'react-icons/fi';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionWrapper from '@/components/SectionWrapper';
import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
  const contactInfo = [
    {
      icon: FiMapPin,
      title: 'Adres',
      content: 'Çukurcuma Caddesi, Firuzağa Mah. No:52, Beyoğlu, İstanbul',
      link: 'https://maps.google.com/?q=Çukurcuma+Caddesi+Firuzağa+Beyoğlu+İstanbul',
    },
    {
      icon: FiPhone,
      title: 'Telefon',
      content: '+90 545 279 7664',
      link: 'tel:+905452797664',
    },
    {
      icon: FiMail,
      title: 'E-posta',
      content: 'info@danismanim.co',
      link: 'mailto:info@danismanim.co',
    },
  ];

  const workingHours = [
    { day: 'Pazartesi - Cuma', hours: '09:00 - 18:00' },
    { day: 'Cumartesi', hours: '10:00 - 16:00' },
    { day: 'Pazar', hours: 'Kapalı' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="absolute top-20 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />

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
              Bize Ulaşın
            </motion.span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 leading-[1.1]">
              <span className="text-gradient">İletişim</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Yurtdışı eğitim planınızla ilgili aklınızdaki soruları birlikte
              netleştirelim. Aşağıdaki formu doldurarak veya doğrudan iletişim
              bilgilerimizden bize ulaşabilirsiniz.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTACT INFO CARDS */}
      <section className="relative z-10 pb-8">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactInfo.map((item, index) => (
              <motion.a
                key={index}
                href={item.link}
                target={item.icon === FiMapPin ? '_blank' : undefined}
                rel={item.icon === FiMapPin ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="group bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl hover:border-primary/20 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-primary to-primary-light rounded-xl shadow-lg shadow-primary/20 group-hover:shadow-xl group-hover:shadow-primary/30 transition-all">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm group-hover:text-primary transition-colors">
                      {item.content}
                    </p>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM & INFO SECTION */}
      <SectionWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Sidebar Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Why Contact Us */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-primary/10 rounded-xl">
                  <FiMessageCircle className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-foreground">
                  Neden Bize Ulaşmalısınız?
                </h2>
              </div>

              <div className="space-y-4">
                {[
                  { title: 'Ücretsiz Danışmanlık', desc: 'İlk görüşmemiz tamamen ücretsizdir' },
                  { title: 'Hızlı Yanıt', desc: '24 saat içinde size dönüş yapıyoruz' },
                  { title: 'Uzman Destek', desc: 'Deneyimli ekibimiz her adımda yanınızda' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <div>
                      <p className="font-medium text-foreground">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Working Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-primary to-primary-light rounded-2xl p-8 text-white"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-white/20 rounded-xl">
                  <FiClock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">Çalışma Saatleri</h3>
              </div>

              <div className="space-y-3">
                {workingHours.map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-white/10 last:border-0">
                    <span className="text-white/90">{item.day}</span>
                    <span className={`font-semibold ${item.hours === 'Kapalı' ? 'text-white/50' : ''}`}>
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-white/10 rounded-xl">
                <p className="text-sm text-white/80">
                  <FiSend className="inline-block w-4 h-4 mr-2" />
                  Acil durumlar için e-posta ile 7/24 ulaşabilirsiniz.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <ContactForm />
          </motion.div>
        </div>
      </SectionWrapper>

      {/* MAP SECTION */}
      <SectionWrapper gradient className="pb-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-sm font-semibold text-primary mb-4">
            Konum
          </span>
          <h2 className="section-title mb-4">
            Ofisimizi Ziyaret Edin
          </h2>
          <p className="section-subtitle">
            İstanbul Beyoğlu'ndaki ofisimizde yüz yüze görüşme için randevu alabilirsiniz
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-full h-96 bg-white rounded-t-3xl shadow-xl overflow-hidden border border-gray-100"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.546!2d28.9825!3d41.0325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDAyJzAwLjAiTiAyOMKwNTknMDAuMCJF!5e0!3m2!1str!2str!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale hover:grayscale-0 transition-all duration-500"
          />
        </motion.div>
      </SectionWrapper>

      <Footer />
    </div>
  );
}
