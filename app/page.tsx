'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  FiUser,
  FiGlobe,
  FiAward,
  FiCompass,
  FiCheckCircle,
  FiArrowRight,
  FiTarget,
  FiTrendingUp,
  FiUsers,
  FiBookOpen,
  FiStar,
} from 'react-icons/fi';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionWrapper from '@/components/SectionWrapper';
import ValueCard from '@/components/ValueCard';
import ContactForm from '@/components/ContactForm';
import TestimonialCard from '@/components/TestimonialCard';

export default function Home() {
  const values = [
    {
      icon: FiUser,
      title: 'Kişiye Özel Eğitim Planı',
      description:
        'Her öğrencinin hedefi farklıdır. Size özel hazırlanan eğitim planıyla doğru adımları atın.',
    },
    {
      icon: FiGlobe,
      title: 'Global Uzmanlık',
      description:
        'Yeni Zelanda ve Birleşik Krallık ağımız ile dünya çapında eğitim fırsatlarına erişin.',
    },
    {
      icon: FiAward,
      title: 'Yıllara Dayanan Tecrübe',
      description:
        'Eğitim sektöründe yıllarca kazanılmış deneyim ve uzmanlıkla size rehberlik ediyoruz.',
    },
    {
      icon: FiCompass,
      title: 'Tam Süreç Desteği',
      description:
        'Başvurudan vizeye, kayıttan yolculuğa kadar her adımda yanınızdayız.',
    },
  ];

  const countries = [
    { name: 'New Zealand', flag: '🇳🇿' },
    { name: 'United Kingdom', flag: '🇬🇧' },
    { name: 'Dubai', flag: '🇦🇪' },
    { name: 'Malta', flag: '🇲🇹' },
    { name: 'USA', flag: '🇺🇸' },
    { name: 'Germany', flag: '🇩🇪' },
    { name: 'Singapore', flag: '🇸🇬' },
  ];

  const stats = [
    { icon: FiUsers, value: '500+', label: 'Mutlu Öğrenci' },
    { icon: FiGlobe, value: '7', label: 'Ülke' },
    { icon: FiBookOpen, value: '50+', label: 'Partner Üniversite' },
    { icon: FiTrendingUp, value: '18+', label: 'Yıllık Tecrübe' },
  ];

  const universities = [
    { name: 'AUT University', logo: '/universities/Aut logo.avif' },
    { name: 'Hult International', logo: '/universities/hult_transparent_logo-aa069.avif' },
    { name: 'Lincoln University', logo: '/universities/Lincoln University logo.avif' },
    { name: 'Massey University', logo: '/universities/massey-university-logo.avif' },
    { name: 'NZLC', logo: '/universities/NZLC logo.avif' },
    { name: 'RBS', logo: '/universities/rbs logo.avif' },
    { name: 'SIU', logo: '/universities/siulogo.avif' },
    { name: 'University of Otago', logo: '/universities/University of Otago logo_edited_edited_p.avif' },
    { name: 'University of Waikato', logo: '/universities/university of waikato.avif' },
    { name: 'University of Auckland', logo: '/universities/Uni_auckland_logo_edited.avif' },
    { name: 'Victoria University', logo: '/universities/Victoria university wellington logo.avif' },
    { name: 'Worldwide School of English', logo: '/universities/Worldwide school of english logo.avif' },
  ];

  const testimonials = [
    {
      name: 'İsmet Kızılata',
      image: '/students/ismet-kizilata.avif',
      testimonial: 'Kartal Bey\'e ilk olarak dil okulu için mail yoluyla ulaştım. Kendisi iş için, Güney Amerika\'daydı ve iş gezisinde olmasına rağmen çok yardımcı oldu-hangi belgelerin gerekli olduğu konusunda çok detaylı bilgiler verdi. Sayesinde Yeni Zelanda vizesi, olması gerenden daha kısa sürede olumlu sonuçlandı. Yurtdışı eğitim için düşünenlere tavsiye ediyorum.',
    },
    {
      name: 'Nuran Bektaş',
      image: '/students/nuran-bektas.avif',
      testimonial: 'Yeni Zelanda\'dan Nuran ben. Buraya Kartal Bey\'in aracılığla geldim. Gerek öğrenci vizesi başvurusu sürecinde, gerek konaklama ve gerekse okul oryantasyon sürecinde Kartal Bey bir numaralı yardımcımdı. Süreci çok profesyonel bir şekilde gerek okulla olan iş birliği gerekse kendi güleryüzlü ve pozitif kişiliğiyle çok güzel ve sorunsuz bir şekilde yürüttü.',
    },
    {
      name: 'Tugay Canol',
      image: '/students/tugay-canol.avif',
      testimonial: 'Kartal Bey aklıma takılan tüm soruları en şeffaf bir şekilde cevapladı. İletişim kurduğumuz ilk günden bu yana, hep elinden gelenin fazlasını yaptığını hissettik. Hiç bir konuda endişe duymadım. Yeni Zelanda\'ya geldikten sonra da hep iletişim halinde olduk ve tüm sorunlarımızla birebir ilgilendi.',
    },
    {
      name: 'Burak Erdal',
      image: '/students/burak-erdal.avif',
      testimonial: 'Kartal Bey kelimenin tam anlamıyla bulunduğumuz durumda gerçekten samimi ve profesyonel olarak bütün sorunlarım ile ilgilendi. Benim için en doğru yolu haritasını çizdi ve kafamdaki bütün soru işaretlerini giderdi. Saat kaç olursa olsun bütün sorularıma cevap verdi.',
    },
    {
      name: 'Necip Fazıl Çoban',
      image: '/students/necip-fazil-coban.avif',
      testimonial: 'Kartal Bey bana verdiği tavsiyelerle benim için en iyi olacak seçeneği bulmam konusunda çok yardımcı oldu. Tecrübesi, samimiyeti ve bilgisi ile ön plana çıkan, her soruma cevap veren Kartal Bey bu alanda gönül rahatlığıyla beraber plan yapacağım danışman.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-background via-white to-muted pt-28">
        {/* Background Elements */}
        <div className="absolute inset-0 hero-pattern" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 right-1/4 hidden lg:block"
        >
          <div className="p-4 bg-white rounded-2xl shadow-xl border border-gray-100">
            <FiGlobe className="w-8 h-8 text-primary" />
          </div>
        </motion.div>
        <motion.div
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/3 right-1/3 hidden lg:block"
        >
          <div className="p-3 bg-white rounded-xl shadow-lg border border-gray-100">
            <FiAward className="w-6 h-6 text-secondary" />
          </div>
        </motion.div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-sm font-medium text-primary">
                  Yurtdışı Eğitim Uzmanınız
                </span>
              </motion.div>

              {/* Main Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-foreground leading-[1.1] tracking-tight">
                Yurtdışı eğitim
                <br />
                yolculuğunda{' '}
                <span className="relative">
                  <span className="text-gradient">yanındayız.</span>
                  <motion.svg
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 200 12"
                    fill="none"
                  >
                    <path
                      d="M2 8C50 2 150 2 198 8"
                      stroke="url(#underline-gradient)"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="underline-gradient" x1="0" y1="0" x2="200" y2="0">
                        <stop stopColor="var(--primary)" />
                        <stop offset="1" stopColor="var(--primary-light)" />
                      </linearGradient>
                    </defs>
                  </motion.svg>
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl">
                Danışmanım, Yeni Zelanda başta olmak üzere dünyanın farklı
                ülkelerinde lise, üniversite, dil okulu ve kariyer fırsatları için
                sana en doğru eğitim danışmanlığını sunar.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="#consultation"
                  className="group flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary-light text-white rounded-full font-semibold shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300"
                >
                  <span>Ücretsiz Görüşme Al</span>
                  <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.a>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/about"
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-gray-200 text-foreground rounded-full font-semibold hover:border-primary hover:text-primary transition-all duration-300"
                  >
                    <span>Hakkımızda</span>
                  </Link>
                </motion.div>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {['BCG', 'GN', 'KC'].map((initials, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white text-xs font-bold border-2 border-white"
                    >
                      {initials}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">500+ başarılı öğrenci</p>
                </div>
              </div>
            </motion.div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                {/* Main Card */}
                <div className="relative bg-gradient-to-br from-primary via-primary-light to-secondary rounded-3xl p-1 shadow-2xl">
                  <div className="bg-white rounded-[22px] p-8 space-y-6">
                    <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
                      <div className="p-3 bg-gradient-to-br from-primary to-primary-light rounded-2xl">
                        <FiTarget className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground text-lg">Eğitim Hedefleriniz</h3>
                        <p className="text-sm text-gray-500">Birlikte planlayalım</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {['Üniversite Seçimi', 'Vize Danışmanlığı', 'Dil Okulu Kaydı', 'Kariyer Planlaması'].map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                        >
                          <div className="p-1.5 bg-success/10 rounded-lg">
                            <FiCheckCircle className="w-4 h-4 text-success" />
                          </div>
                          <span className="text-gray-700 font-medium">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating Cards */}
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4 border border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-secondary/10 rounded-xl">
                      <FiAward className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground">18+ Yıl</p>
                      <p className="text-xs text-gray-500">Tecrübe</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [5, -5, 5] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-4 -left-8 bg-white rounded-2xl shadow-xl p-4 border border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-xl">
                      <FiGlobe className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground">7 Ülke</p>
                      <p className="text-xs text-gray-500">Global Ağ</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="relative z-10 py-16">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-10"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex p-3 bg-gradient-to-br from-primary/10 to-primary-light/10 rounded-2xl mb-4">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-3xl md:text-4xl font-extrabold text-foreground">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* VALUE PROPOSITION SECTION */}
      <SectionWrapper>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-sm font-semibold text-primary mb-4">
            Neden Biz?
          </span>
          <h2 className="section-title mb-4">
            Neden Danışmanım?
          </h2>
          <p className="section-subtitle">
            Yurtdışı eğitim yolculuğunuzda size özel çözümler sunuyoruz
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <ValueCard key={index} {...value} index={index} />
          ))}
        </div>
      </SectionWrapper>

      {/* GLOBAL PARTNERS SECTION */}
      <SectionWrapper gradient>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-sm font-semibold text-primary mb-4">
            Global Ağ
          </span>
          <h2 className="section-title mb-4">
            Dünyanın Dört Bir Yanında Güçlü İş Ortaklıkları
          </h2>
          <p className="section-subtitle">
            Global ağımızla sizlere en iyi eğitim fırsatlarını sunuyoruz
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-5 mb-16">
          {countries.map((country, index) => (
            <motion.div
              key={country.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -4 }}
              className="group px-6 py-3 bg-white rounded-full shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/30 cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <span className="text-xl">{country.flag}</span>
                <span className="font-medium text-foreground group-hover:text-primary transition-colors">{country.name}</span>
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-foreground mb-12">
            Partner Üniversitelerimiz
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {universities.map((uni, index) => (
              <motion.div
                key={uni.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/20 flex items-center justify-center min-h-[120px]"
              >
                <div className="relative w-full h-16">
                  <Image
                    src={uni.logo}
                    alt={uni.name}
                    fill
                    className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </SectionWrapper>

      {/* TESTIMONIALS SECTION - Mezun Öğrencilerimiz */}
      <SectionWrapper>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-secondary/10 rounded-full text-sm font-semibold text-secondary mb-4">
            Başarı Hikayeleri
          </span>
          <h2 className="section-title mb-4">
            Mezun Öğrencilerimiz
          </h2>
          <p className="section-subtitle">
            Hayallerine kavuşan öğrencilerimizin deneyimlerini dinleyin
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.name}
              {...testimonial}
              index={index}
            />
          ))}
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full">
            <div className="flex -space-x-2">
              {testimonials.slice(0, 4).map((t, i) => (
                <div key={i} className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                  <Image src={t.image} alt={t.name} fill className="object-cover" />
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} className="w-4 h-4 text-secondary fill-secondary" />
              ))}
            </div>
            <span className="font-semibold text-foreground">500+ Başarılı Öğrenci</span>
          </div>
        </motion.div>
      </SectionWrapper>

      {/* MISSION & VISION SECTION */}
      <SectionWrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -4 }}
            className="group relative p-10 bg-white rounded-3xl border border-gray-100 hover:border-primary/20 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-4 bg-gradient-to-br from-primary to-primary-light rounded-2xl shadow-lg shadow-primary/20">
                  <FiCheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  Misyonumuz
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                Yüksek motivasyonlu belirli hedefi olan öğrenci adaylarına en başarılı
                ve en isabetli danışmanlık hizmetini vermek.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -4 }}
            className="group relative p-10 bg-white rounded-3xl border border-gray-100 hover:border-secondary/20 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-4 bg-gradient-to-br from-secondary to-[var(--secondary-light)] rounded-2xl shadow-lg shadow-secondary/20">
                  <FiCompass className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  Vizyonumuz
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                Hedefimiz öğrencilerimize doğru danışmanlık ve kaliteli rehberlik ile
                daha iyi bir gelecek kazandırmak.
              </p>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* EXPERTISE TEASER SECTION */}
      <SectionWrapper dark>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-block px-4 py-1.5 bg-white/10 rounded-full text-sm font-semibold text-primary-light mb-6">
            Uzman Kadro
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Uzman Ekip, Global Tecrübe
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-10">
            Danışmanım'ın Yeni Zelanda ve Birleşik Krallık merkezli güçlü tecrübesi,
            geliştirilen metod ve sistemlerle öğrencilerin hedeflerine ulaşmalarını
            sağlamaktadır. 20'den fazla ülke ve kültürde çalışmış ekibimiz,
            yükseköğretim sektöründe 18 yıldan fazla deneyime sahiptir.
          </p>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-foreground rounded-full font-semibold hover:shadow-xl transition-all duration-300"
            >
              <span>Ekibimizi Tanıyın</span>
              <FiArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>
      </SectionWrapper>

      {/* HOMEPAGE CONTACT SECTION */}
      <SectionWrapper id="consultation" className="bg-mesh bg-muted">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-sm font-semibold text-primary mb-4">
            İletişim
          </span>
          <h2 className="section-title mb-4">
            Ücretsiz Ön Görüşme İçin Bizimle İletişime Geçin
          </h2>
          <p className="section-subtitle">
            Eğitim hedeflerinizi birlikte planlayalım
          </p>
        </motion.div>

        <ContactForm />
      </SectionWrapper>

      <Footer />
    </div>
  );
}
