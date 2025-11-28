import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hakkımızda | Danışmanım',
  description: 'Danışmanım ekibi hakkında bilgi edinin. Yeni Zelanda ve Birleşik Krallık merkezli güçlü tecrübeyle öğrencilerin hedeflerine ulaşmalarına yardımcı oluyoruz.',
  openGraph: {
    title: 'Hakkımızda | Danışmanım',
    description: 'Danışmanım ekibi hakkında bilgi edinin. Global tecrübe ve uzmanlıkla size en iyi hizmeti sunuyoruz.',
    url: 'https://danismanim.co/about',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
