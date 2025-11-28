import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'İletişim | Danışmanım',
  description: 'Danışmanım ile iletişime geçin. Yurtdışı eğitim planınızla ilgili sorularınız için bize ulaşın.',
  openGraph: {
    title: 'İletişim | Danışmanım',
    description: 'Danışmanım ile iletişime geçin. Ücretsiz ön görüşme için bizimle iletişime geçin.',
    url: 'https://danismanim.co/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
