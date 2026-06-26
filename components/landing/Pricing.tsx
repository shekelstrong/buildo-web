'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';

type Tier = {
  name: string;
  monthlyPrice: number; // базовая цена в месяц при ежемесячной оплате
  description: string;
  cta: string;
  href: string;
  highlighted?: boolean;
  features: string[];
};

const TIERS: Tier[] = [
  {
    name: 'Free',
    monthlyPrice: 0,
    description: '1 сайт, базовые возможности',
    cta: 'Начать бесплатно',
    href: '/dashboard/sites/new',
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
    monthlyPrice: 990,
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
    monthlyPrice: 4990,
    description: 'Для студий и агентств',
    cta: 'Связаться с нами',
    href: '/auth/signin?plan=business',
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

type Period = 'month' | 'year';

// 20% скидка при оплате за год — стандарт SaaS.
const YEAR_DISCOUNT = 0.2;

function priceFor(price: number, period: 'month' | 'year') {
  if (price === 0) {
    return { display: '0', suffix: '₽', period: 'навсегда', full: '' };
  }
  if (period === 'month') {
    return {
      display: price.toLocaleString('ru-RU'),
      suffix: '₽',
      period: 'в месяц',
      full: `${(price * 12).toLocaleString('ru-RU')} ₽ за год`,
    };
  }
  const yearTotal = Math.round(price * 12 * (1 - YEAR_DISCOUNT));
  const perMonth = Math.round(yearTotal / 12);
  return {
    display: perMonth.toLocaleString('ru-RU'),
    suffix: '₽',
    period: 'в месяц',
    full: `${yearTotal.toLocaleString('ru-RU')} ₽ за год (скидка 20%)`,
  };
}

export function Pricing() {
  const [period, setPeriod] = useState<'month' | 'year'>('month');

  return (
    <section id="pricing" className="relative border-t border-ocean-500/5 bg-white py-24">
      <div className="container-wide">
        <div className="mx-auto max-w-2xl text-center">
          <div className="badge mb-4">Тарифы</div>
          <h2 className="text-balance font-display text-4xl font-bold text-ocean-500 sm:text-5xl">
            Прозрачно, без сюрпризов
          </h2>
          <p className="mt-4 text-balance text-lg text-ocean-500/70">
            Оплата рублями, СБП, криптой (Platega), Telegram Stars. Без подвоха.
          </p>

          {/* Period toggle */}
          <div className="mt-8 inline-flex items-center gap-1 rounded-full border border-ocean-500/10 bg-cream p-1">
            <button
              type="button"
              onClick={() => setPeriod('month')}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                period === 'month'
                  ? 'bg-tide-500 text-white shadow-sm'
                  : 'text-ocean-500/60 hover:text-ocean-500'
              }`}
            >
              Помесячно
            </button>
            <button
              type="button"
              onClick={() => setPeriod('year')}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                period === 'year'
                  ? 'bg-tide-500 text-white shadow-sm'
                  : 'text-ocean-500/60 hover:text-ocean-500'
              }`}
            >
              За год <span className="ml-1 text-xs opacity-80">−20%</span>
            </button>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {TIERS.map((tier) => {
            const price = priceFor(tier.monthlyPrice, period);
            return (
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

                <div className="mt-6">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-5xl font-bold text-ocean-500">{price.display}</span>
                    <span className="text-2xl font-semibold text-ocean-500">{price.suffix}</span>
                    <span className="text-ocean-500/50">/ {price.period}</span>
                  </div>
                  {price.full && (
                    <p className="mt-2 text-xs text-tide-600">{price.full}</p>
                  )}
                </div>

                <a
                  href={tier.href}
                  className={`mt-6 block w-full text-center ${
                    tier.highlighted ? 'btn-primary' : 'btn-secondary'
                  }`}
                >
                  {tier.cta}
                </a>

                <ul className="mt-8 space-y-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-ocean-500/80">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-tide-500" strokeWidth={3} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Пояснение под тарифами */}
        <p className="mt-12 text-center text-sm text-ocean-500/60">
          При оплате за год — скидка 20%. Продление по той же цене. Без скрытых платежей.
        </p>
      </div>
    </section>
  );
}