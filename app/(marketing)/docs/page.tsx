import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { Book, Code2, Rocket, Bot } from 'lucide-react';
import Link from 'next/link';

export const metadata = { title: 'Документация' };

const sections = [
  {
    icon: Rocket,
    title: 'Быстрый старт',
    items: [
      { href: '#start', label: 'Открыть бота в Telegram' },
      { href: '#start', label: 'Написать первый промт' },
      { href: '#start', label: 'Получить сайт' },
    ],
  },
  {
    icon: Code2,
    title: 'API для разработчиков',
    items: [
      { href: '#api', label: 'POST /api/sites — создать сайт' },
      { href: '#api', label: 'GET /api/sites — список' },
      { href: '#api', label: 'OAuth flow' },
    ],
  },
  {
    icon: Bot,
    title: 'Telegram-бот',
    items: [
      { href: '#bot', label: 'Команды (/start, /site, /admin)' },
      { href: '#bot', label: 'FSM states' },
      { href: '#bot', label: 'Inline-кнопки и callback' },
    ],
  },
  {
    icon: Book,
    title: 'Платежи и тарифы',
    items: [
      { href: '#payments', label: 'ЮKassa webhook' },
      { href: '#payments', label: 'Telegram Stars' },
      { href: '#payments', label: 'Cryptobot USDT/TON' },
    ],
  },
];

export default function DocsPage() {
  return (
    <>
      <Header />
      <main className="py-20">
        <div className="container-narrow">
          <div className="badge mb-4">Документация</div>
          <h1 className="text-balance font-display text-5xl font-bold text-ocean-500">
            Всё что нужно знать
          </h1>
          <p className="mt-4 text-balance text-xl text-ocean-500/70">
            Краткие гайды для юзеров, разработчиков и интеграторов.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {sections.map((section) => (
              <div key={section.title} className="card">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-tide-500/10 text-tide-600">
                    <section.icon className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-semibold text-ocean-500">{section.title}</h2>
                </div>
                <ul className="mt-5 space-y-2.5">
                  {section.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="text-sm text-ocean-500/70 transition-colors hover:text-tide-600"
                      >
                        → {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-2xl border border-ocean-500/10 bg-white p-8 text-center">
            <p className="text-ocean-500/70">
              Полная документация в разработке. <br />
              Сейчас — лучший способ разобраться:{' '}
              <Link href="https://t.me/buildo_aibot" className="text-tide-600 hover:underline">
                написать в бот
              </Link>{' '}
              и спросить.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
