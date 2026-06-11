'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'Что такое Buildo?',
    a: 'Buildo — Telegram-бот + веб-платформа, которая генерирует сайты через ИИ. Пишете в боте, что хотите — получаете готовый сайт с хостингом.',
  },
  {
    q: 'Это аналог Lovable?',
    a: 'Да, но для РФ. У нас ЮKassa и СБП вместо Stripe, Layero вместо Vercel, и всё работает без VPN.',
  },
  {
    q: 'Какой ИИ вы используете?',
    a: 'MiniMax M3 — та же модель, что работает в Hermes Agent. Не OpenAI, не Claude — наша собственная LLM.',
  },
  {
    q: 'Я смогу редактировать сайт потом?',
    a: 'Да. В боте: «поменяй заголовок на 3 секции» или «добавь блок отзывов». На GitHub: правите код как обычно, мы перезадеплоим.',
  },
  {
    q: 'А мой сайт заблокируют в РФ?',
    a: 'Нет. Layero — российский хостинг с CDN в 3 регионах (Москва, СПб, Казань). Сайты открываются за 50-100мс из любой точки РФ.',
  },
  {
    q: 'Что входит в бесплатный тариф?',
    a: '1 активный сайт с поддоменом *.layero.app. SSL, GitHub-export, базовая поддержка. Без брендинга Buildo — только в Pro.',
  },
  {
    q: 'Когда я смогу купить домен?',
    a: 'В июле 2026 (Phase 1.5). Подключим reg.ru API — купите .ru прямо в боте за 199 ₽/год.',
  },
  {
    q: 'Что с ИИ-агентами для бизнеса?',
    a: 'Phase 2.0 (август 2026). Контент-агент, маркетинг, продажи, SMM ВК. Сейчас — лист ожидания.',
  },
];

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section id="faq" className="py-24">
      <div className="container-narrow">
        <div className="text-center">
          <div className="badge mb-4">Вопросы</div>
          <h2 className="text-balance font-display text-4xl font-bold text-ocean-500 sm:text-5xl">
            Частые вопросы
          </h2>
        </div>

        <div className="mt-12 space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={i} className="overflow-hidden rounded-xl border border-ocean-500/10 bg-white">
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-ocean-500/[0.02]"
                >
                  <span className="font-medium text-ocean-500">{faq.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-ocean-500/40 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="border-t border-ocean-500/5 bg-ocean-500/[0.02] px-6 py-5 text-ocean-500/80">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
