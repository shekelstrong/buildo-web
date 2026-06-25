import type { Metadata } from 'next';
import { Sparkles, Bot, Lock, Zap, Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { AIConfigurator, AIFAQ, DemoChat } from '@/components/landing/AIAgentConfigurator';

export const metadata: Metadata = {
  title: 'Buildo AI-агент под ключ — белый-лейбл за 5 дней',
  description:
    'Готовый AI-агент для продаж, поддержки и найма. White-label конфигуратор. Изолированная БЗ, без утечки секретов. От 5 000 ₽/мес.',
};

export default function AIAgentPage() {
  return (
    <main className="relative z-10">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-ocean-500/5 bg-cream py-20">
        <div className="pointer-events-none absolute -top-20 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-gradient-to-br from-tide-500/20 via-tide-400/10 to-transparent blur-3xl" />

        <div className="container-wide relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="badge mb-6">
              <Sparkles className="h-3 w-3" />
              Новый продукт · Бета
            </div>

            <h1 className="text-balance font-display text-5xl font-bold leading-[1.05] tracking-tight text-ocean-500 sm:text-6xl">
              AI-агент под ключ{' '}
              <span className="gradient-text">за 5 дней</span>
            </h1>

            <p className="mt-6 text-balance text-lg leading-relaxed text-ocean-500/70 sm:text-xl">
              Готовый клон нашего агента для твоего бизнеса. Продаёт, отвечает на вопросы, нанимает сотрудников.
              Ты настраиваешь тон, базу знаний, каналы. Мы деплоим, обслуживаем, пополняем БЗ.
              <br />
              <b>Без передачи своих ключей и секретов.</b>
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link href="#configurator" className="btn-primary px-8 py-4 text-lg shadow-lg shadow-tide-500/20">
                Открыть конфигуратор
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="#demo" className="btn-secondary px-8 py-4 text-lg">
                Посмотреть демо
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-ocean-500/50">
              <div>✓ Готов за 5 дней</div>
              <div>✓ Бесплатное демо за 1 день</div>
              <div>✓ Без доступа к твоим API-ключам</div>
              <div>✓ Поддержка и пополнение БЗ в тарифе</div>
            </div>
          </div>
        </div>
      </section>

      {/* Кому подходит */}
      <section className="py-20">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <div className="badge mb-4">Кому подходит</div>
            <h2 className="text-balance font-display text-4xl font-bold text-ocean-500 sm:text-5xl">
              Для любого бизнеса с потоком сообщений
            </h2>
            <p className="mt-4 text-lg text-ocean-500/70">
              Если твои клиенты пишут в мессенджеры — агент заберёт 80% рутины.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: '🛒', title: 'Интернет-магазины', desc: 'Карточки товаров, наличие, оформление заказов' },
              { icon: '💇', title: 'Салоны и услуги', desc: 'Запись, перенос, цены, отзывы' },
              { icon: '🏠', title: 'Недвижимость', desc: 'Подбор, показы, документы, ипотека' },
              { icon: '🎓', title: 'Образование', desc: 'Запись на курс, программа, оплата' },
              { icon: '🍔', title: 'HoReCa', desc: 'Бронь столика, меню, доставка' },
              { icon: '⚖️', title: 'Юристы и консультанты', desc: 'Первичная квалификация, документы' },
              { icon: '💼', title: 'B2B-услуги', desc: 'Лиды, КП, встречи, follow-up' },
              { icon: '🔧', title: 'Сервисы и ремонт', desc: 'Заявки, диагностика, статусы' },
            ].map((item, i) => (
              <div key={i} className="card text-center">
                <div className="text-4xl">{item.icon}</div>
                <h3 className="mt-3 font-display text-lg font-semibold text-ocean-500">{item.title}</h3>
                <p className="mt-1 text-sm text-ocean-500/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Демо чат */}
      <section id="demo" className="border-y border-ocean-500/5 bg-cream py-20">
        <div className="container-narrow">
          <div className="mb-10 text-center">
            <div className="badge mb-4">Живое демо</div>
            <h2 className="text-balance font-display text-4xl font-bold text-ocean-500 sm:text-5xl">
              Попробуй прямо сейчас
            </h2>
            <p className="mt-4 text-lg text-ocean-500/70">
              Это реальный агент с минимальной конфигурацией. Напиши ему — посмотри, как он ведёт диалог.
            </p>
          </div>
          <DemoChat />
          <p className="mt-4 text-center text-xs text-ocean-500/50">
            Демо с конфигурацией «салон красоты». В твоём агенте — твои данные и тон.
          </p>
        </div>
      </section>

      {/* Configurator */}
      <section id="configurator" className="py-20">
        <div className="container-wide">
          <div className="mb-10 mx-auto max-w-2xl text-center">
            <div className="badge mb-4">Конфигуратор</div>
            <h2 className="text-balance font-display text-4xl font-bold text-ocean-500 sm:text-5xl">
              Собери своего агента
            </h2>
            <p className="mt-4 text-lg text-ocean-500/70">
              Отметь нужные модули, каналы, тон — и увидишь финальную стоимость. Без регистрации.
            </p>
          </div>

          <AIConfigurator />
        </div>
      </section>

      {/* Архитектура / безопасность */}
      <section className="border-y border-ocean-500/5 bg-cream py-20">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <div className="badge mb-4">Архитектура</div>
            <h2 className="text-balance font-display text-4xl font-bold text-ocean-500 sm:text-5xl">
              Как мы изолируем ваши секреты
            </h2>
            <p className="mt-4 text-lg text-ocean-500/70">
              Multi-tenant архитектура с Row Level Security. Каждый клиент — отдельный контур.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {[
              {
                title: 'Наш security group',
                icon: Lock,
                color: 'ocean',
                items: [
                  'ЛЛМ-ключи (OpenRouter)',
                  'Оркестратор и пайплайны',
                  'Внутренние сервисы',
                  'Биллинг Buildo',
                ],
              },
              {
                title: 'Sandbox клиента',
                icon: Bot,
                color: 'tide',
                items: [
                  'Только своя БЗ (RAG)',
                  'Только свои каналы (токены)',
                  'Только свои настройки',
                  'Только своя аналитика',
                ],
              },
              {
                title: 'UI клиента',
                icon: Zap,
                color: 'amber',
                items: [
                  'Конфиг-панель (Next.js)',
                  'Загрузка документов в БЗ',
                  'Просмотр диалогов',
                  'Управление тоном и интеграциями',
                ],
              },
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <div key={i} className="card">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-${card.color}-500/10`}>
                      <Icon className={`h-5 w-5 text-${card.color}-500`} />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-ocean-500">{card.title}</h3>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm text-ocean-500/70">
                    {card.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-tide-500" strokeWidth={3} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container-narrow">
          <div className="mb-10 mx-auto max-w-2xl text-center">
            <div className="badge mb-4">FAQ</div>
            <h2 className="text-balance font-display text-4xl font-bold text-ocean-500 sm:text-5xl">
              Частые вопросы
            </h2>
          </div>
          <AIFAQ />
        </div>
      </section>

      {/* Финальный CTA */}
      <section className="py-20">
        <div className="container-narrow">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-ocean-500 via-ocean-600 to-ocean-700 p-12 text-center shadow-2xl shadow-ocean-500/30 sm:p-16">
            <div className="pointer-events-none absolute -top-20 -right-20 h-80 w-80 rounded-full bg-tide-500/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-amber/20 blur-3xl" />

            <div className="relative">
              <Bot className="mx-auto h-10 w-10 text-tide-400" />
              <h2 className="mt-6 font-display text-4xl font-bold text-white sm:text-5xl">
                Готов запустить своего агента?
              </h2>
              <p className="mt-4 text-lg text-white/80">
                Бесплатная демо-версия за 1 день. Если понравится — соберём полноценного агента за 5 дней.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/dashboard/sites/new?intent=ai-agent"
                  className="rounded-lg bg-tide-500 px-8 py-4 text-lg font-semibold text-white shadow-md transition-colors hover:bg-tide-600"
                >
                  Заказать демо бесплатно
                </Link>
                <Link
                  href="https://t.me/buildo_aibot"
                  className="rounded-lg border-2 border-white/20 bg-white/10 px-8 py-4 text-lg font-medium text-white backdrop-blur transition-colors hover:bg-white/20"
                >
                  Спросить в Telegram
                </Link>
              </div>
              <p className="mt-4 text-sm text-white/60">
                Оплата: Platega (USDT, 1% комиссия) · ЮKassa · СБП · Telegram Stars
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}