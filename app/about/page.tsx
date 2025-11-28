'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight, FiCheckCircle, FiGlobe, FiAward, FiUsers, FiTarget } from 'react-icons/fi';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionWrapper from '@/components/SectionWrapper';
import TeamCard from '@/components/TeamCard';

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Kartal Cihad Gültekin',
      title: 'Founder & Student Mentor',
      bio: 'Kartal Gültekin, yurtdışı serüvenine çok genç yaşta önce Kanada sonra Yeni Zelanda\'da lise eğitimi ile başladı. Sonrasında Business Management ve "Entrepreneurship and Innovation" alanında dünyanın en iyi 100 üniversitesinden biri olarak gösterilen AUT\'de eğitim aldı. Yeni Zelanda ve Birleşik Krallık\'ta sayılı üniversite, yüksek okul, dil okulu ve özel enstitülere yöneticilik ve danışmanlık yapmaktadır. Kariyerinde Yeni Zelanda Eğitim Bakanlığının uluslararası ve lokal olarak düzenlediği seminerlerde konuşmacı ve davetli misafir olarak katılmıştır. Başlıca Orta Doğu, Güney Amerika, Afrika, Asya bölgelerinde Yeni Zelanda hakkında seminerler vermiştir. Bugüne kadar geliştirdiği metod ve sistemler, dünyanın farklı ülkelerinden öğrencilerin hedeflerine ulaşmalarında yardımcı olmak için kullanılmaktadır. Senelerdir kazandığı öğrenimini ve tecrübelerini şimdi Danışmanım vasıtasıyla sizlere daha da ulaşılabilir hale getirdi.',
      image: '/team/kartal.avif',
      instagram: 'https://www.instagram.com/kartalcihadgultekin/',
      linkedin: 'https://nz.linkedin.com/in/kartal-cihad-gultekin-66a72069',
    },
    {
      name: 'Gamze Nakışlı',
      title: 'Business Development Manager & Public Relations',
      bio: 'Gamze Nakışlı, yurtdışı serüvenine 2007 yılında, genç yaşta Yeni Zelanda\'nın dünya çapında en büyük firmalarından biri olan Fisher&Paykel\'de yönetici olarak başladı. Bu firmayla birlikte Almanya, İtalya, İngiltere, Birleşik Arap Emirlikleri, Fransa ve birçok Avrupa ülkesinde sağlık eğitimi alarak ve vererek kullanıcı desteklerini sağladı. Yeni Zelanda ve Türkiye arasında ticaret yapan iş insanlarıyla birlikte derneklerde toplantılar ve eğitimlerle ilgili ticari ilişkilere katkıda bulundu. Yıllardır edindiği bilgi birikimi ve tecrübesini, Danışmanım aracılığıyla daha erişilebilir hale getirdi. Danışmanım ile Yeni Zelanda tecrübelerini sizlerle paylaşmanın mutluluğunu yaşamaktadır.',
      image: '/team/gamze.avif',
    },
    {
      name: 'Bharat Chawla',
      title: 'RBS Intellect – NZ Specialist',
      bio: 'Güçlü ilişkiler, olağanüstü müşteri hizmetleri ve en yüksek dürüstlüğü sergileme yoluyla iş kurmanın önemini her zaman tam olarak anlayarak 20\'den fazla ülke ve kültürde çalıştı. 18 yıldan fazla bir süredir yükseköğretim sağlayıcısı olarak çalışmış olan Yeni Zelanda eğitim sektörü, paydaş yönetimi, ürün geliştirme ve stratejik yol geliştirme hakkında derinlemesine bir anlayışa sahiptir.',
      image: '/team/bharat.avif',
    },
  ];

  const highlights = [
    { icon: FiGlobe, label: '7 Ülke', description: 'Global Ağ' },
    { icon: FiUsers, label: '500+', description: 'Mutlu Öğrenci' },
    { icon: FiAward, label: '18+ Yıl', description: 'Sektör Tecrübesi' },
    { icon: FiTarget, label: '%95', description: 'Başarı Oranı' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-36 pb-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-sm font-semibold text-primary mb-6"
            >
              Hakkımızda
            </motion.span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 leading-[1.1]">
              Danışmanım{' '}
              <span className="text-gradient">Nedir?</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Danışmanım, yurtdışı eğitim hedefi olan öğrenci ve profesyonellere,
              özellikle Yeni Zelanda ve Birleşik Krallık başta olmak üzere dünyanın
              farklı ülkelerinde eğitim, kariyer ve yaşam planları konusunda
              danışmanlık sunan bir yurtdışı eğitim danışmanlık firmasıdır.
            </p>
          </motion.div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="relative z-10 pb-16">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex p-3 bg-gradient-to-br from-primary/10 to-primary-light/10 rounded-2xl mb-3">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-2xl md:text-3xl font-bold text-foreground">{item.label}</p>
                  <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <SectionWrapper>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-sm font-semibold text-primary mb-4">
            Uzman Kadro
          </span>
          <h2 className="section-title mb-4">
            Ekibimiz
          </h2>
          <p className="section-subtitle">
            Global tecrübe ve uzmanlıkla size en iyi hizmeti sunuyoruz
          </p>
        </motion.div>

        <div className="space-y-12">
          {teamMembers.map((member, index) => (
            <TeamCard key={index} member={member} index={index} />
          ))}
        </div>
      </SectionWrapper>

      {/* VALUES SECTION */}
      <SectionWrapper gradient>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-sm font-semibold text-primary mb-4">
              Değerlerimiz
            </span>
            <h2 className="section-title mb-6">
              Neden Bize Güvenmelisiniz?
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              18 yılı aşkın sektör tecrübemiz ve 20'den fazla ülkede edindiğimiz
              global deneyimimizle, öğrencilerimizin hayallerine ulaşmaları için
              en doğru rehberliği sağlıyoruz.
            </p>

            <div className="space-y-4">
              {[
                'Kişiye özel eğitim planlaması',
                'Vize süreçlerinde tam destek',
                'Üniversite ve okul seçiminde uzman rehberlik',
                'Yurt dışı yaşam danışmanlığı',
                '7/24 iletişim ve destek',
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="p-1.5 bg-success/10 rounded-lg">
                    <FiCheckCircle className="w-5 h-5 text-success" />
                  </div>
                  <span className="text-gray-700 font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-primary to-primary-light rounded-3xl p-8 md:p-10 text-white">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl" />

              <div className="relative">
                <h3 className="text-2xl font-bold mb-6">
                  Başarı Hikayemiz
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-white/20 rounded-xl">
                      <FiGlobe className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">Global Ağ</p>
                      <p className="text-white/80 text-sm">7 farklı ülkede 50+ partner üniversite</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-white/20 rounded-xl">
                      <FiUsers className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">Mutlu Öğrenciler</p>
                      <p className="text-white/80 text-sm">500+ öğrencimiz hayallerine kavuştu</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-white/20 rounded-xl">
                      <FiAward className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">Sektör Liderliği</p>
                      <p className="text-white/80 text-sm">Yeni Zelanda eğitim sektöründe öncü</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* CTA SECTION */}
      <SectionWrapper dark>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Eğitim yolculuğunuza başlamaya hazır mısınız?
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-10">
            Ücretsiz ön görüşme için bizimle iletişime geçin ve eğitim
            hedeflerinizi birlikte planlayalım.
          </p>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-foreground rounded-full font-semibold hover:shadow-xl transition-all duration-300"
            >
              <span>İletişime Geçin</span>
              <FiArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>
      </SectionWrapper>

      <Footer />
    </div>
  );
}
