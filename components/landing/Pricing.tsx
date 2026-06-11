import Link from 'next/link';
import { Check } from 'lucide-react';

const tiers = [
  {
    name: 'Free',
    price: '0 ₽',
    period: 'навсегда',
    description: '1 сайт, базовые возможности',
    cta: 'Начать бесплатно',
    href: '/dashboard/sites/new',
    highlighted: false,
    features: [
      '1 активный сайт',
      'Layero хостинг',
      'SSL из коробки',
      'GitHub export',
      'Telegram-бот поддержка',
    ],
  },
  {
    name: 'Pro',
    price: '990 ₽',
    period: 'в месяц',
    description: 'Для фрилансеров и малого бизнеса',
    cta: 'Попробовать 14 дней',
    href: '/auth/signin?plan=pro',
    highlighted: true,
    features: [
      'До 20 сайтов',
      'Кастомный домен (reg.ru)',
      'SEO-движок /articles',
      'Приоритетная поддержка',
      'Удаление брендинга Buildo',
      'Webhook-интеграции',
    ],
  },
  {
    name: 'Business',
    price: '4 990 ₽',
    period: 'в месяц',
    description: 'Для студий и агентств',
    cta: 'Связаться с нами',
    href: '/auth/signin?plan=business',
    highlighted: false,
    features: [
      'Безлимит сайтов',
      'White-label',
      'API для своих сервисов',
      '5 аккаунтов в команде',
      'SLA 99.5%',
      'Персональный менеджер',
    ],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="border-t border-ocean-500/5 bg-white py-24">
      <div className="container-wide">
        <div className="mx-auto max-w-2xl text-center">
          <div className="badge mb-4">Тарифы</div>
          <h2 className="text-balance font-display text-4xl font-bold text-ocean-500 sm:text-5xl">
            Прозрачно, без сюрпризов
          </h2>
          <p className="mt-4 text-balance text-lg text-ocean-500/70">
            Оплата рублями, СБП, криптой, Telegram Stars. Без подвоха.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl p-8 transition-all ${
                tier.highlighted
                  ? 'border-2 border-tide-500 bg-gradient-to-br from-tide-500/5 to-cream shadow-2xl shadow-tide-500/10 lg:scale-105'
                  : 'border border-ocean-500/10 bg-cream'
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-tide-500 px-3 py-1 text-xs font-medium text-white shadow-md">
                  Популярный
                </div>
              )}

              <h3 className="font-display text-2xl font-semibold text-ocean-500">{tier.name}</h3>
              <p className="mt-2 text-sm text-ocean-500/60">{tier.description}</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-5xl font-bold text-ocean-500">{tier.price}</span>
                <span className="text-ocean-500/50">/ {tier.period}</span>
              </div>

              <Link
                href={tier.href}
                className={`mt-6 block w-full text-center ${
                  tier.highlighted ? 'btn-primary' : 'btn-secondary'
                }`}
              >
                {tier.cta}
              </Link>

              <ul className="mt-8 space-y-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-ocean-500/80">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-tide-500" strokeWidth={3} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
