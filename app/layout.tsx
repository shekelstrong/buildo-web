import type { Metadata } from 'next';
import { Fraunces, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

// Fraunces не поддерживает cyrillic, поэтому fallback на латиницу + Inter (который поддерживает cyrillic)
const display = Fraunces({ subsets: ['latin'], variable: '--font-display' });
const body = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-body' });
const mono = JetBrains_Mono({ subsets: ['latin', 'cyrillic'], variable: '--font-mono' });

export const metadata: Metadata = {
  metadataBase: new URL('https://buildo.ru'),
  title: { default: 'Buildo — ИИ-разработка сайтов за 2 минуты', template: '%s | Buildo' },
  description:
    'Аналог Lovable для РФ. Генерируйте лендинги, визитки, портфолио и сайты для бизнеса через ИИ-агента в Telegram. Без кода, бесплатно для первого сайта.',
  keywords: ['ИИ сайты', 'Lovable РФ', 'генератор сайтов', 'Telegram бот', 'Buildo'],
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://buildo.ru',
    siteName: 'Buildo',
    title: 'Buildo — ИИ-разработка сайтов за 2 минуты',
    description: 'Telegram-бот + Web-платформа. Генерация сайтов через ИИ.',
  },
  twitter: { card: 'summary_large_image', title: 'Buildo', description: 'ИИ-разработка сайтов' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="bg-cream text-ocean-500 font-body antialiased">
        {children}
      </body>
    </html>
  );
}
